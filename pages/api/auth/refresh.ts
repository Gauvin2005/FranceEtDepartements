import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { generateAccessToken, verifyRefreshToken } from '@/lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token manquant' });
    }

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return res.status(401).json({ error: 'Refresh token invalide' });
    }

    const session = await prisma.session.findFirst({
      where: {
        userId: payload.userId,
        jwtRefresh: refreshToken,
      },
    });

    if (!session) {
      return res.status(401).json({ error: 'Session invalide' });
    }

    const accessToken = generateAccessToken({
      userId: payload.userId,
      pseudo: payload.pseudo,
      role: payload.role,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error('Erreur lors du refresh:', error);
    return res.status(500).json({ error: 'Erreur lors du refresh' });
  }
}

