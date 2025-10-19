import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { setUserSession } from '@/lib/redis';

const loginSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { login, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ pseudo: login }, { email: login }],
      },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    if (!user.isConfirmed) {
      return res.status(403).json({
        error: 'Compte non confirmé. Veuillez vérifier votre email.',
      });
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      pseudo: user.pseudo,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      pseudo: user.pseudo,
      role: user.role,
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        jwtRefresh: refreshToken,
      },
    });

    await setUserSession(user.id, {
      userId: user.id,
      pseudo: user.pseudo,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données invalides' });
    }
    return res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
}

