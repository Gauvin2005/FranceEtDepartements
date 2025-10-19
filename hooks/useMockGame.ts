import { useState, useCallback } from 'react';

// Types pour le jeu mocké
export interface MockPlayer {
  id: number;
  userId?: number;
  guestPseudo: string;
  position: number;
  money: number;
  isEliminated: boolean;
  ownedCards: number[];
}

interface MockGameState {
  game: {
    id: number;
    code: string;
    hostId: number;
    status: 'lobby' | 'running' | 'finished';
    maxPlayers: number;
    turnIndex: number;
  };
  currentTurn: {
    playerId: number;
    indicesRevealed: number[];
  };
  players: MockPlayer[];
  availableCards: number[];
  spectators: string[];
}

// État initial du jeu
const initialGameState: MockGameState = {
  game: {
    id: 1,
    code: 'MOCK01',
    hostId: 1,
    status: 'lobby',
    maxPlayers: 2,
    turnIndex: 0,
  },
  currentTurn: {
    playerId: 1,
    indicesRevealed: [],
  },
  players: [
    {
      id: 1,
      userId: 1,
      guestPseudo: 'Gavin',
      position: 0,
      money: 5000,
      isEliminated: false,
      ownedCards: [],
    },
    {
      id: 2,
      userId: 2,
      guestPseudo: 'Invité',
      position: 0,
      money: 5000,
      isEliminated: false,
      ownedCards: [],
    },
  ],
  availableCards: Array.from({ length: 101 }, (_, i) => i + 1),
  spectators: [],
};

export const useMockGame = () => {
  const [gameState, setGameState] = useState<MockGameState>(initialGameState);
  const [currentPlayerId, setCurrentPlayerId] = useState<number>(1);

  // Simuler le lancement de dés
  const rollDice = useCallback(() => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    return { dice1, dice2, total: dice1 + dice2 };
  }, []);

  // Simuler la révélation d'indices
  const revealIndex = useCallback((index: number) => {
    setGameState(prev => ({
      ...prev,
      currentTurn: {
        ...prev.currentTurn,
        indicesRevealed: [...prev.currentTurn.indicesRevealed, index],
      },
    }));
  }, []);

  // Simuler le choix d'une composition
  const chooseComposition = useCallback((composition: string) => {
    const diceResult = rollDice();
    const points = Math.floor(Math.random() * 100) + 50; // Points simulés
    
    setGameState(prev => {
      const currentPlayer = prev.players.find(p => p.id === prev.currentTurn.playerId);
      if (!currentPlayer) return prev;

      const updatedPlayers = prev.players.map(p => 
        p.id === currentPlayer.id 
          ? { 
              ...p, 
              money: p.money + points,
              position: Math.min(p.position + diceResult.total, 100)
            }
          : p
      );

      return {
        ...prev,
        players: updatedPlayers,
        currentTurn: {
          playerId: prev.currentTurn.playerId,
          indicesRevealed: [],
        },
      };
    });

    // Passer au tour suivant après un délai
    setTimeout(() => {
      nextTurn();
    }, 1000);
  }, [rollDice]);

  // Passer au tour suivant
  const nextTurn = useCallback(() => {
    setGameState(prev => {
      const activePlayers = prev.players.filter(p => !p.isEliminated);
      const nextTurnIndex = (prev.game.turnIndex + 1) % activePlayers.length;
      const nextPlayer = activePlayers[nextTurnIndex];

      return {
        ...prev,
        game: {
          ...prev.game,
          turnIndex: nextTurnIndex,
        },
        currentTurn: {
          playerId: nextPlayer.id,
          indicesRevealed: [],
        },
      };
    });

    // Mettre à jour le joueur actuel pour l'affichage
    setCurrentPlayerId(prev => {
      const activePlayers = gameState.players.filter(p => !p.isEliminated);
      const nextTurnIndex = (gameState.game.turnIndex + 1) % activePlayers.length;
      return activePlayers[nextTurnIndex].id;
    });
  }, [gameState.players, gameState.game.turnIndex]);

  // Démarrer la partie
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        status: 'running',
      },
      currentTurn: {
        playerId: prev.players[0].id,
        indicesRevealed: [],
      },
    }));
    setCurrentPlayerId(gameState.players[0].id);
  }, [gameState.players]);

  // Ajouter un joueur
  const addPlayer = useCallback((pseudo: string) => {
    if (gameState.players.length >= gameState.game.maxPlayers) return;

    const newPlayer: MockPlayer = {
      id: gameState.players.length + 1,
      guestPseudo: pseudo,
      position: 0,
      money: 5000,
      isEliminated: false,
      ownedCards: [],
    };

    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));
  }, [gameState.players.length, gameState.game.maxPlayers]);

  // Vérifier si c'est le tour du joueur actuel
  const isMyTurn = useCallback((playerId: number) => {
    return gameState.currentTurn.playerId === playerId;
  }, [gameState.currentTurn.playerId]);

  // Obtenir le joueur actuel
  const getCurrentPlayer = useCallback(() => {
    return gameState.players.find(p => p.id === gameState.currentTurn.playerId);
  }, [gameState.players, gameState.currentTurn.playerId]);

  return {
    gameState,
    currentPlayerId,
    rollDice,
    revealIndex,
    chooseComposition,
    nextTurn,
    startGame,
    addPlayer,
    isMyTurn,
    getCurrentPlayer,
  };
};
