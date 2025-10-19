import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { verifyConfirmationToken } from '@/lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token manquant' });
    }

    const payload = verifyConfirmationToken(token);

    if (!payload) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (user.isConfirmed) {
      return res.redirect(302, `${process.env.NEXT_PUBLIC_APP_URL}/?already_confirmed=true`);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isConfirmed: true },
    });

    return res.redirect(302, `${process.env.NEXT_PUBLIC_APP_URL}/?confirmed=true`);
  } catch (error) {
    console.error('Erreur lors de la confirmation:', error);
    return res.status(500).json({ error: 'Erreur lors de la confirmation' });
  }
}

