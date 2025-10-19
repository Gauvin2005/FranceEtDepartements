import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const departments = await prisma.department.findMany({
      include: {
        card: true,
      },
      orderBy: {
        numero: 'asc',
      },
    });

    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des départements:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des départements' });
  }
}

