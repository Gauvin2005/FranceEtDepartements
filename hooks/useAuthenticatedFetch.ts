import { useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuthenticatedFetch() {
  const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore();

  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!accessToken) {
        throw new Error('Pas de token d\'accès disponible');
      }

      // Première tentative avec le token actuel
      let response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Si le token est expiré (401), essayer de le rafraîchir
      if (response.status === 401 && refreshToken) {
        console.log('Token expiré, tentative de refresh...');
        
        try {
          const refreshResponse = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setTokens(refreshData.accessToken, refreshToken);
            
            console.log('Token rafraîchi avec succès');
            
            // Retry la requête originale avec le nouveau token
            response = await fetch(url, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${refreshData.accessToken}`,
              },
            });
          } else {
            console.log('Échec du refresh, déconnexion');
            clearAuth();
            throw new Error('Session expirée, veuillez vous reconnecter');
          }
        } catch (error) {
          console.error('Erreur lors du refresh:', error);
          clearAuth();
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
      }

      return response;
    },
    [accessToken, refreshToken, setTokens, clearAuth]
  );

  return authenticatedFetch;
}
