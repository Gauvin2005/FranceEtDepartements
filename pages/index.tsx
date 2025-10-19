import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { Users, Play, LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, login, register, logout } = useAuth();
  const authenticatedFetch = useAuthenticatedFetch();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [gameCode, setGameCode] = useState('');

  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ pseudo: '', email: '', password: '' });
  const [createGamePlayers, setCreateGamePlayers] = useState(4);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (router.query.confirmed === 'true') {
      setMessage('Votre compte a été confirmé avec succès! Vous pouvez maintenant vous connecter.');
    } else if (router.query.already_confirmed === 'true') {
      setMessage('Ce compte est déjà confirmé.');
    }
  }, [router.query]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.login, loginForm.password);
      setShowLogin(false);
      setMessage('Connexion réussie!');
    } catch (error) {
      setMessage('Erreur de connexion');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm.pseudo, registerForm.email, registerForm.password);
      setShowRegister(false);
      setMessage('Inscription réussie! Vérifiez votre email pour confirmer votre compte.');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription');
    }
  };

  const handleCreateGame = async () => {
    if (!user) {
      setMessage('Vous devez être connecté pour créer une partie');
      return;
    }

    try {
      const response = await authenticatedFetch('/api/games/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ maxPlayers: createGamePlayers }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/game/${data.game.code}`);
      } else {
        setMessage(data.error || 'Erreur lors de la création de la partie');
      }
    } catch (error: any) {
      console.error('Erreur création partie:', error);
      setMessage(error.message || 'Erreur lors de la création de la partie');
    }
  };

  const handleJoinGame = () => {
    if (gameCode) {
      router.push(`/game/${gameCode.toUpperCase()}`);
    }
  };

  return (
    <>
      <Head>
        <title>La France et ses 101 départements</title>
        <meta
          name="description"
          content="Jeu éducatif et ludique sur les départements français"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">
              La France et ses 101 départements
            </h1>
            <p className="text-xl text-gray-700">
              Un jeu éducatif et ludique pour découvrir les départements français
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {!user ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogIn className="w-5 h-5" />
                      Connexion
                    </CardTitle>
                    <CardDescription>Connectez-vous pour jouer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showLogin ? (
                      <Button className="w-full" onClick={() => setShowLogin(true)}>
                        Se connecter
                      </Button>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                          placeholder="Pseudo ou email"
                          value={loginForm.login}
                          onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })}
                          required
                        />
                        <Input
                          type="password"
                          placeholder="Mot de passe"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, password: e.target.value })
                          }
                          required
                        />
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            Connexion
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowLogin(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Inscription
                    </CardTitle>
                    <CardDescription>Créez un compte pour commencer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showRegister ? (
                      <Button className="w-full" onClick={() => setShowRegister(true)}>
                        S&apos;inscrire
                      </Button>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <Input
                          placeholder="Pseudo"
                          value={registerForm.pseudo}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, pseudo: e.target.value })
                          }
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, email: e.target.value })
                          }
                          required
                        />
                        <Input
                          type="password"
                          placeholder="Mot de passe"
                          value={registerForm.password}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, password: e.target.value })
                          }
                          required
                        />
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            S&apos;inscrire
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowRegister(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Bienvenue, {user.pseudo}!</CardTitle>
                  <CardDescription>Créez ou rejoignez une partie</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={logout}>
                    Déconnexion
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Créer une partie
                </CardTitle>
                <CardDescription>
                  Créez une nouvelle partie et invitez vos amis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre de joueurs maximum
                  </label>
                  <Input
                    type="number"
                    min={2}
                    max={6}
                    value={createGamePlayers}
                    onChange={(e) => setCreateGamePlayers(parseInt(e.target.value))}
                  />
                </div>
                <Button className="w-full" onClick={handleCreateGame} disabled={!user}>
                  <Play className="w-4 h-4 mr-2" />
                  Créer une partie
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Rejoindre une partie
                </CardTitle>
                <CardDescription>Entrez le code de la partie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Code de la partie (ex: ABC123)"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
                <Button className="w-full" onClick={handleJoinGame} disabled={!gameCode}>
                  Rejoindre
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Comment jouer?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Lancez les dés</h3>
                <p className="text-sm text-gray-600">
                  Lancez 2 dés D10 et 1 dé D6 pour obtenir des nombres
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Composez votre nombre</h3>
                <p className="text-sm text-gray-600">
                  Utilisez les dés pour former un nombre entre 1 et 101
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Trouvez le département</h3>
                <p className="text-sm text-gray-600">
                  Identifiez le département correspondant et collectez des points
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

