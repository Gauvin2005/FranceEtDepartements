import { useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, setUser, setTokens, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (pseudo: string, email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pseudo, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de l\'inscription');
        }

        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (login: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la connexion');
        }

        setUser(data.user);
        setTokens(data.accessToken, data.refreshToken);

        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setUser, setTokens]
  );

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) {
      throw new Error('Pas de refresh token');
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du refresh');
      }

      setTokens(data.accessToken, refreshToken);

      return data.accessToken;
    } catch (err) {
      clearAuth();
      throw err;
    }
  }, [setTokens, clearAuth]);

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    refreshAccessToken,
  };
}

