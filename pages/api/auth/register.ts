import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generateConfirmationToken } from '@/lib/jwt';
import { sendConfirmationEmail } from '@/lib/email';

const registerSchema = z.object({
  pseudo: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { pseudo, email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ pseudo }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.pseudo === pseudo
          ? 'Ce pseudo est déjà utilisé'
          : 'Cet email est déjà utilisé',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        pseudo,
        email,
        passwordHash,
        role: 'player',
        isConfirmed: false,
      },
    });

    const confirmationToken = generateConfirmationToken(user.id, user.email);
    await sendConfirmationEmail(email, pseudo, confirmationToken);

    return res.status(201).json({
      success: true,
      message: 'Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.',
      userId: user.id,
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données invalides', details: error.errors });
    }
    return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
}

