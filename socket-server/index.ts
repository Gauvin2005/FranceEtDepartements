import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const app = express();
const httpServer = createServer(app);

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const prisma = new PrismaClient();

// Game engine functions
function rollDice() {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function calculateCompositions(dice: number[]) {
  const [d1, d2] = dice;
  const compositions = [];
  
  compositions.push({ value: d1, description: `${d1}` });
  compositions.push({ value: d2, description: `${d2}` });
  compositions.push({ value: d1 + d2, description: `${d1} + ${d2} = ${d1 + d2}` });
  compositions.push({ value: d1 * d2, description: `${d1} × ${d2} = ${d1 * d2}` });
  
  return compositions;
}

function calculateScore(indicesUsed: number, isPrefecture: boolean, isCorrect: boolean) {
  if (!isCorrect) return { totalPoints: 0 };
  
  let basePoints = 100;
  if (isPrefecture) basePoints = 200;
  
  const bonusPoints = indicesUsed * 50;
  return { totalPoints: basePoints + bonusPoints };
}

function shouldCreateChampionCard(souvenirCount: number) {
  return souvenirCount >= 3;
}

function isPlayerEliminated(money: number, souvenirCount: number) {
  return money < 0 && souvenirCount < 2;
}

function calculateSouvenirCardsCount(ownedCards: any[]) {
  return ownedCards.filter(card => card.card.type === 'souvenir').length;
}

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      // Accepter localhost et toutes les IPs locales
      if (!origin || 
          origin.includes('localhost:3401') || 
          origin.includes('192.168.') ||
          origin.includes('127.0.0.1:3401')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'socket-server' });
});

interface GameStateCache {
  [gameCode: string]: any;
}

const gameStates: GameStateCache = {};

async function getGameState(gameCode: string) {
  if (gameStates[gameCode]) {
    return gameStates[gameCode];
  }

  const cached = await redis.get(`game:${gameCode}:state`);
  if (cached) {
    gameStates[gameCode] = JSON.parse(cached);
    return gameStates[gameCode];
  }

  return null;
}

async function setGameState(gameCode: string, state: any) {
  gameStates[gameCode] = state;
  await redis.setex(`game:${gameCode}:state`, 3600 * 24, JSON.stringify(state));
}

async function loadGameFromDB(gameCode: string) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: {
      players: {
        include: {
          user: true,
          ownedCards: {
            include: {
              card: {
                include: {
                  department: true,
                },
              },
            },
          },
        },
        orderBy: {
          playerOrder: 'asc',
        },
      },
    },
  });

  if (!game) return null;

  const allCards = await prisma.card.findMany({
    where: { type: 'souvenir' },
  });

  const usedCardIds = game.players.flatMap((p: any) =>
    p.ownedCards.map((oc: any) => oc.card.cardNumber)
  );
  const availableCards = allCards
    .filter((c) => !usedCardIds.includes(c.cardNumber))
    .map((c) => c.cardNumber);

  const gameState = {
    game,
    currentTurn: {
      playerId: (game as any).players[game.turnIndex]?.id || (game as any).players[0].id,
      indicesRevealed: [],
    },
    availableCards,
    spectators: [],
  };

  await setGameState(gameCode, gameState);
  return gameState;
}

io.on('connection', (socket) => {
  console.log(`Client connecté: ${socket.id}`);

  socket.on('game:join', async ({ code, pseudo, token }) => {
    try {
      console.log(`Tentative de connexion à la partie ${code} avec le pseudo ${pseudo}`);
      let gameState = await getGameState(code);
      if (!gameState) {
        console.log(`État de la partie ${code} non trouvé dans Redis, chargement depuis la DB...`);
        gameState = await loadGameFromDB(code);
        if (gameState) {
          console.log(`État de la partie ${code} chargé depuis la DB`);
        } else {
          console.log(`Partie ${code} non trouvée dans la DB`);
        }
      } else {
        console.log(`État de la partie ${code} trouvé dans Redis`);
      }

      if (!gameState) {
        socket.emit('server:error', 'Partie non trouvée');
        return;
      }

      socket.join(code);

      let isSpectator = false;
      const existingPlayer = gameState.game.players.find(
        (p: any) => p.user?.pseudo === pseudo || p.guestPseudo === pseudo
      );

      // Si le joueur existe déjà, il reste un joueur même si la partie est en cours
      if (existingPlayer) {
        isSpectator = false;
        // Mettre à jour le userId si le joueur est maintenant connecté
        if (token && existingPlayer.userId === null) {
          try {
            const jwt = require('jsonwebtoken');
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            await prisma.gamePlayer.update({
              where: { id: existingPlayer.id },
              data: { userId: payload.userId }
            });
            existingPlayer.userId = payload.userId;
            console.log(`Joueur ${existingPlayer.id} associé à l'utilisateur ${payload.userId}`);
          } catch (error) {
            console.log('Token invalide pour association userId');
          }
        }
      } else if (gameState.game.status !== 'lobby') {
        // Nouveau joueur qui rejoint une partie en cours = spectateur
        isSpectator = true;
        if (!gameState.spectators) {
          gameState.spectators = [];
        }
        gameState.spectators.push(socket.id);
        await setGameState(code, gameState);
      } else {
        // Partie en lobby
        if (gameState.game.players.length >= gameState.game.maxPlayers) {
          isSpectator = true;
          if (!gameState.spectators) {
            gameState.spectators = [];
          }
          gameState.spectators.push(socket.id);
          await setGameState(code, gameState);
        } else {
          // Déterminer le userId si le joueur est connecté
          let userId = null;
          if (token) {
            try {
              const jwt = require('jsonwebtoken');
              const payload = jwt.verify(token, process.env.JWT_SECRET);
              userId = payload.userId;
              console.log(`Nouveau joueur connecté: ${pseudo} -> userId: ${userId}`);
            } catch (error) {
              console.log('Token invalide pour nouveau joueur');
            }
          }

          const newPlayer = await prisma.gamePlayer.create({
            data: {
              gameId: gameState.game.id,
              userId: userId,
              guestPseudo: userId ? null : pseudo,
              playerOrder: gameState.game.players.length,
              position: 0,
              money: 5000,
            },
            include: {
              user: true,
              ownedCards: {
                include: {
                  card: {
                    include: {
                      department: true,
                    },
                  },
                },
              },
            },
          });

          gameState.game.players.push(newPlayer);
          await setGameState(code, gameState);

          io.to(code).emit('game:player:joined', newPlayer);
        }
      }

      console.log(`Envoi de l'état de la partie ${code} au client ${socket.id}`);
      socket.emit('game:state:update', gameState);

      if (isSpectator) {
        console.log(`Client ${socket.id} en mode spectateur pour la partie ${code}`);
        socket.emit('game:spectator:mode', true);
      }
    } catch (error) {
      console.error('Erreur game:join:', error);
      socket.emit('server:error', 'Erreur lors de la connexion à la partie');
    }
  });

  socket.on('game:start', async ({ code }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState) {
        socket.emit('server:error', 'Partie non trouvée');
        return;
      }

      if (gameState.game.players.length < 2) {
        socket.emit('error', 'Au moins 2 joueurs requis');
        return;
      }

      await prisma.game.update({
        where: { id: gameState.game.id },
        data: { status: 'running' },
      });

      gameState.game.status = 'running';
      await setGameState(code, gameState);

      io.to(code).emit('game:state:update', gameState);
      io.to(code).emit('game:turn:started', gameState.currentTurn.playerId);
    } catch (error) {
      console.error('Erreur game:start:', error);
      socket.emit('error', 'Erreur lors du démarrage de la partie');
    }
  });

  socket.on('game:roll:dice', async ({ code }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState) {
        socket.emit('server:error', 'Partie non trouvée');
        return;
      }

      if (gameState.game.status !== 'running') {
        socket.emit('error', 'La partie n\'est pas en cours');
        return;
      }

      const dice = rollDice();
      const compositions = calculateCompositions(dice);

      gameState.currentTurn.diceRoll = dice;
      gameState.currentTurn.compositions = compositions;
      gameState.currentTurn.indicesRevealed = [];

      await setGameState(code, gameState);

      io.to(code).emit('game:dice:rolled', dice);
      io.to(code).emit('game:compositions:list', compositions);
    } catch (error) {
      console.error('Erreur game:roll:dice:', error);
      socket.emit('error', 'Erreur lors du lancer de dés');
    }
  });

  socket.on('game:use:index', async ({ code, indexNumber }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState || !gameState.currentTurn.diceRoll) {
        socket.emit('error', 'Aucun lancer de dés en cours');
        return;
      }

      if (indexNumber < 0 || indexNumber > 2) {
        socket.emit('error', 'Index invalide');
        return;
      }

      if (gameState.currentTurn.indicesRevealed.includes(indexNumber)) {
        socket.emit('error', 'Indice déjà révélé');
        return;
      }

      gameState.currentTurn.indicesRevealed.push(indexNumber);
      await setGameState(code, gameState);

      io.to(code).emit('game:indices:reveal', {
        indexNumber,
        indicesRevealed: gameState.currentTurn.indicesRevealed,
      });
    } catch (error) {
      console.error('Erreur game:use:index:', error);
      socket.emit('error', 'Erreur lors de l\'utilisation de l\'indice');
    }
  });

  socket.on('game:choose:composition', async ({ code, compositionValue }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState || !gameState.currentTurn.diceRoll) {
        socket.emit('error', 'Aucun lancer de dés en cours');
        return;
      }

      if (!gameState.availableCards.includes(compositionValue)) {
        socket.emit('error', 'Cette carte n\'est pas disponible');
        return;
      }

      const currentPlayer = gameState.game.players.find(
        (p: any) => p.id === gameState.currentTurn.playerId
      );

      if (!currentPlayer) {
        socket.emit('error', 'Joueur non trouvé');
        return;
      }

      const card = await prisma.card.findFirst({
        where: { cardNumber: compositionValue },
        include: {
          department: true,
        },
      });

      if (!card) {
        socket.emit('error', 'Carte non trouvée');
        return;
      }

      const isPrefecture = false;
      const score = calculateScore(
        gameState.currentTurn.indicesRevealed.length,
        isPrefecture,
        true
      );

      const newMoney = currentPlayer.money + score.totalPoints;
      const newPosition = currentPlayer.position + 1;

      await prisma.gamePlayer.update({
        where: { id: currentPlayer.id },
        data: {
          money: newMoney,
          position: newPosition,
        },
      });

      const ownedCard = await prisma.ownedCard.create({
        data: {
          gamePlayerId: currentPlayer.id,
          cardId: card.id,
          isFaceUp: false,
        },
        include: {
          card: {
            include: {
              department: true,
            },
          },
        },
      });

      currentPlayer.money = newMoney;
      currentPlayer.position = newPosition;
      currentPlayer.ownedCards.push(ownedCard);

      gameState.availableCards = gameState.availableCards.filter(
        (c: number) => c !== compositionValue
      );

      await prisma.round.create({
        data: {
          gameId: gameState.game.id,
          playerId: currentPlayer.id,
          diceValues: JSON.stringify(gameState.currentTurn.diceRoll),
          compositions: JSON.stringify(gameState.currentTurn.compositions),
          chosenNumber: compositionValue,
          chosenDepartmentId: card.departmentId,
          indicesUsed: gameState.currentTurn.indicesRevealed.length,
          wonPoints: score.totalPoints,
        },
      });

      const souvenirCount = calculateSouvenirCardsCount(currentPlayer.ownedCards);
      if (shouldCreateChampionCard(souvenirCount)) {
        console.log(`Création d'une carte Champion pour le joueur ${currentPlayer.id}`);
      }

      if (isPlayerEliminated(currentPlayer.money, souvenirCount)) {
        await prisma.gamePlayer.update({
          where: { id: currentPlayer.id },
          data: { isEliminated: true },
        });
        currentPlayer.isEliminated = true;
      }

      io.to(code).emit('game:round:result', {
        playerId: currentPlayer.id,
        departmentChosen: card.department,
        isCorrect: true,
        pointsEarned: score.totalPoints,
        cardReceived: card,
        newMoney,
        newPosition,
      });

      const activePlayers = gameState.game.players.filter((p: any) => !p.isEliminated);

      if (activePlayers.length === 1) {
        gameState.game.status = 'finished';
        await prisma.game.update({
          where: { id: gameState.game.id },
          data: { status: 'finished' },
        });
        io.to(code).emit('game:finished', { winner: activePlayers[0] });
      } else {
        gameState.game.turnIndex = (gameState.game.turnIndex + 1) % gameState.game.players.length;
        let nextPlayer = gameState.game.players[gameState.game.turnIndex];

        while (nextPlayer.isEliminated) {
          gameState.game.turnIndex =
            (gameState.game.turnIndex + 1) % gameState.game.players.length;
          nextPlayer = gameState.game.players[gameState.game.turnIndex];
        }

        gameState.currentTurn = {
          playerId: nextPlayer.id,
          indicesRevealed: [],
        };

        console.log(`Tour suivant: joueur ${nextPlayer.id} (${nextPlayer.user?.pseudo || nextPlayer.guestPseudo}) - userId: ${nextPlayer.userId}`);
        console.log('GameState currentTurn mis à jour:', gameState.currentTurn);

        await prisma.game.update({
          where: { id: gameState.game.id },
          data: { turnIndex: gameState.game.turnIndex },
        });

        io.to(code).emit('game:turn:started', nextPlayer.id);
      }

      await setGameState(code, gameState);
      io.to(code).emit('game:state:update', gameState);
    } catch (error) {
      console.error('Erreur game:choose:composition:', error);
      socket.emit('error', 'Erreur lors du choix de la composition');
    }
  });

  socket.on('game:save', async ({ code }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState) {
        socket.emit('server:error', 'Partie non trouvée');
        return;
      }

      gameState.game.status = 'paused';
      await prisma.game.update({
        where: { id: gameState.game.id },
        data: {
          status: 'paused',
          updatedAt: new Date(),
        },
      });

      await setGameState(code, gameState);

      io.to(code).emit('game:saved', { message: 'Partie sauvegardée' });
    } catch (error) {
      console.error('Erreur game:save:', error);
      socket.emit('error', 'Erreur lors de la sauvegarde');
    }
  });

  socket.on('game:sell:souvenirs', async ({ code, playerId }) => {
    try {
      const gameState = await getGameState(code);
      if (!gameState) {
        socket.emit('server:error', 'Partie non trouvée');
        return;
      }

      const player = gameState.game.players.find((p: any) => p.id === playerId);
      if (!player) {
        socket.emit('error', 'Joueur non trouvé');
        return;
      }

      const souvenirCards = player.ownedCards.filter(
        (oc: any) => oc.card.type === 'souvenir' && !oc.isFaceUp
      );

      if (souvenirCards.length < 2) {
        socket.emit('error', 'Pas assez de cartes Souvenir');
        return;
      }

      await prisma.ownedCard.deleteMany({
        where: {
          id: {
            in: [souvenirCards[0].id, souvenirCards[1].id],
          },
        },
      });

      const newMoney = player.money + 1000;
      await prisma.gamePlayer.update({
        where: { id: playerId },
        data: { money: newMoney },
      });

      player.money = newMoney;
      player.ownedCards = player.ownedCards.filter(
        (oc: any) => oc.id !== souvenirCards[0].id && oc.id !== souvenirCards[1].id
      );

      gameState.availableCards.push(souvenirCards[0].card.cardNumber);
      gameState.availableCards.push(souvenirCards[1].card.cardNumber);
      gameState.availableCards.sort((a: number, b: number) => a - b);

      await setGameState(code, gameState);

      io.to(code).emit('game:cards:sold', {
        playerId,
        newMoney,
        cardsReturned: [souvenirCards[0].card.cardNumber, souvenirCards[1].card.cardNumber],
      });

      io.to(code).emit('game:state:update', gameState);
    } catch (error) {
      console.error('Erreur game:sell:souvenirs:', error);
      socket.emit('error', 'Erreur lors de la revente');
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client déconnecté: ${socket.id}`);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Serveur Socket.IO démarré sur le port ${PORT}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM reçu, fermeture gracieuse...');
  await prisma.$disconnect();
  await redis.quit();
  httpServer.close(() => {
    console.log('Serveur fermé');
    process.exit(0);
  });
});

