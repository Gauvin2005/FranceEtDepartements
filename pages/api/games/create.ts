import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generateGameCode } from '@/lib/gameEngine';
import { setGameState } from '@/lib/redis';
import { withAuth, AuthenticatedRequest } from '@/lib/withAuth';

const createGameSchema = z.object({
  maxPlayers: z.number().min(2).max(6),
  maxTurns: z.number().optional(),
  timeLimitSec: z.number().optional(),
});

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { maxPlayers, maxTurns, timeLimitSec } = createGameSchema.parse(req.body);

    const code = generateGameCode();

    const game = await prisma.game.create({
      data: {
        code,
        hostId: req.user.userId,
        maxPlayers,
        maxTurns,
        timeLimitSec,
        status: 'lobby',
        turnIndex: 0,
        players: {
          create: {
            userId: req.user.userId,
            playerOrder: 0,
            position: 0,
            money: 5000,
          },
        },
      },
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
        },
      },
    });

    const allCards = await prisma.card.findMany({
      where: { type: 'souvenir' },
    });

    const gameState = {
      game,
      currentTurn: {
        playerId: game.players[0].id,
        indicesRevealed: [],
      },
      availableCards: allCards.map((c) => c.cardNumber),
      spectators: [],
    };

    await setGameState(code, gameState);

    console.log('Partie créée avec succès:', code);

    return res.status(201).json({
      success: true,
      game,
    });
  } catch (error) {
    console.error('Erreur lors de la création de la partie:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données invalides', details: error.errors });
    }
    return res.status(500).json({ error: 'Erreur lors de la création de la partie' });
  }
}

export default withAuth(handler);

