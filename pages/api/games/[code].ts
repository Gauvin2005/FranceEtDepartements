import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getGameState } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Code de partie manquant' });
    }

    const cachedState = await getGameState(code);
    if (cachedState) {
      return res.status(200).json({ success: true, gameState: cachedState });
    }

    const game = await prisma.game.findUnique({
      where: { code },
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

    if (!game) {
      return res.status(404).json({ error: 'Partie non trouvée' });
    }

    const allCards = await prisma.card.findMany({
      where: { type: 'souvenir' },
    });

    const usedCardIds = game.players.flatMap((p) => p.ownedCards.map((oc) => oc.card.cardNumber));
    const availableCards = allCards
      .filter((c) => !usedCardIds.includes(c.cardNumber))
      .map((c) => c.cardNumber);

    const gameState = {
      game,
      currentTurn: {
        playerId: game.players[game.turnIndex]?.id || game.players[0].id,
        indicesRevealed: [],
      },
      availableCards,
      spectators: [],
    };

    return res.status(200).json({ success: true, gameState });
  } catch (error) {
    console.error('Erreur lors de la récupération de la partie:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération de la partie' });
  }
}

