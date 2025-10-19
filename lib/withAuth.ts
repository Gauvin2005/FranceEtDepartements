import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccessToken, JwtPayload } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextApiRequest {
  user: JwtPayload;
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.log('JWT Error: Authorization header manquant');
        return res.status(401).json({ error: 'Token manquant' });
      }

      const token = authHeader.replace('Bearer ', '');
      console.log('Token reçu:', token.substring(0, 20) + '...');
      
      const payload = verifyAccessToken(token);
      if (!payload) {
        console.log('JWT Error: Token invalide ou expiré');
        return res.status(401).json({ error: 'Token invalide ou expiré' });
      }

      console.log('JWT Validé pour utilisateur:', payload.userId);

      // Ajouter l'utilisateur à la requête
      (req as AuthenticatedRequest).user = payload;
      
      // Appeler le handler original
      return handler(req as AuthenticatedRequest, res);
    } catch (error) {
      console.error('Erreur middleware auth:', error);
      return res.status(500).json({ error: 'Erreur d\'authentification' });
    }
  };
}

