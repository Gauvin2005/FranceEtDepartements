import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { Users, Play, LogIn, UserPlus } from 'lucide-react';
import { FranceMapStyled } from '@/components/FranceMapStyled';

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

      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-scale-in">
            <div className="mb-6 text-7xl animate-float">🇫🇷</div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text mb-6 animate-neon-flicker">
              LA FRANCE ET SES 101 DÉPARTEMENTS
            </h1>
            <p className="text-2xl text-white font-bold">
              Un jeu éducatif et ludique pour découvrir les départements français ⚡
            </p>
          </div>

          {message && (
            <div className="mb-8 p-6 card-gaming border-cyan-500/50 text-center animate-scale-in">
              <p className="text-cyan-300 font-bold text-lg">{message}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {!user ? (
              <>
                <div className="card-gaming p-8 shadow-2xl animate-slide-in-left">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-cyan-400 flex items-center gap-3 mb-2">
                      <LogIn className="w-8 h-8" />
                      CONNEXION
                    </h3>
                    <p className="text-purple-300 font-semibold">Connectez-vous pour jouer</p>
                  </div>
                  <div>
                    {!showLogin ? (
                      <button className="btn-gaming w-full px-6 py-3 text-white rounded-xl font-bold text-lg transition-all shadow-2xl animate-glow-pulse" onClick={() => setShowLogin(true)}>
                        Se connecter
                      </button>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <input
                          type="text"
                          placeholder="Pseudo ou email"
                          value={loginForm.login}
                          onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })}
                          required
                          className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold"
                        />
                        <input
                          type="password"
                          placeholder="Mot de passe"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, password: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold"
                        />
                        <div className="flex gap-3">
                          <button type="submit" className="flex-1 btn-gaming px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105">
                            Connexion
                          </button>
                          <button
                            type="button"
                            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                            onClick={() => setShowLogin(false)}
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                <div className="card-gaming p-8 shadow-2xl animate-slide-in-right">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-pink-400 flex items-center gap-3 mb-2">
                      <UserPlus className="w-8 h-8" />
                      INSCRIPTION
                    </h3>
                    <p className="text-purple-300 font-semibold">Créez un compte pour commencer</p>
                  </div>
                  <div>
                    {!showRegister ? (
                      <button className="btn-gaming w-full px-6 py-3 text-white rounded-xl font-bold text-lg transition-all shadow-2xl animate-glow-pulse" onClick={() => setShowRegister(true)}>
                        S&apos;inscrire
                      </button>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <input
                          type="text"
                          placeholder="Pseudo"
                          value={registerForm.pseudo}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, pseudo: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, email: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold"
                        />
                        <input
                          type="password"
                          placeholder="Mot de passe"
                          value={registerForm.password}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, password: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold"
                        />
                        <div className="flex gap-3">
                          <button type="submit" className="flex-1 btn-gaming px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105">
                            S&apos;inscrire
                          </button>
                          <button
                            type="button"
                            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                            onClick={() => setShowRegister(false)}
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="md:col-span-2 card-gaming p-8 shadow-2xl animate-scale-in">
                <div className="mb-4">
                  <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Bienvenue, {user.pseudo}! 👋
                  </h3>
                  <p className="text-purple-300 font-semibold">Créez ou rejoignez une partie</p>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105" onClick={logout}>
                    🚪 Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-gaming p-8 shadow-2xl animate-scale-in">
              <div className="mb-6">
                <h3 className="text-3xl font-black text-yellow-400 flex items-center gap-3 mb-2">
                  <Play className="w-8 h-8" />
                  JEU SOLO
                </h3>
                <p className="text-purple-300 font-semibold">
                  Jouez seul pour vous entraîner
                </p>
              </div>
              <div>
                <button className="btn-gaming w-full px-6 py-3 text-white rounded-xl font-bold text-lg transition-all shadow-2xl animate-glow-pulse flex items-center justify-center gap-2" onClick={() => router.push('/game')}>
                  <Play className="w-5 h-5" />
                  Jouer en solo
                </button>
              </div>
            </div>
          
            <div className="card-gaming p-8 shadow-2xl animate-slide-in-left">
              <div className="mb-6">
                <h3 className="text-3xl font-black text-green-400 flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8" />
                  CRÉER UNE PARTIE
                </h3>
                <p className="text-purple-300 font-semibold">
                  Créez une nouvelle partie et invitez vos amis
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-bold text-purple-300 mb-3">
                    Nombre de joueurs maximum
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={6}
                    value={createGamePlayers}
                    onChange={(e) => setCreateGamePlayers(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white focus:border-cyan-500 focus:outline-none transition-colors font-bold text-lg"
                  />
                </div>
                <button className="btn-gaming w-full px-6 py-3 text-white rounded-xl font-bold text-lg transition-all shadow-2xl animate-glow-pulse flex items-center justify-center gap-2" onClick={handleCreateGame} disabled={!user}>
                  <Play className="w-5 h-5" />
                  Créer une partie
                </button>
              </div>
            </div>

            <div className="card-gaming p-8 shadow-2xl animate-slide-in-right">
              <div className="mb-6">
                <h3 className="text-3xl font-black text-cyan-400 flex items-center gap-3 mb-2">
                  <Play className="w-8 h-8" />
                  REJOINDRE
                </h3>
                <p className="text-purple-300 font-semibold">Entrez le code de la partie</p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Code de la partie (ex: ABC123)"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold text-lg"
                />
                <button className="btn-gaming w-full px-6 py-3 text-white rounded-xl font-bold text-lg transition-all shadow-2xl animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleJoinGame} disabled={!gameCode}>
                  Rejoindre
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 card-gaming p-10 shadow-2xl animate-scale-in">
            <h2 className="text-4xl font-black text-center mb-10 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent glow-text">
              ❓ COMMENT JOUER ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border-2 border-purple-500/50 hover:border-cyan-500 transition-all hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 glow-effect animate-glow-pulse">
                  1
                </div>
                <h3 className="font-black text-xl text-cyan-400 mb-3">🎲 Lancez les dés</h3>
                <p className="text-white font-semibold">
                  Lancez 2 dés D10 et 1 dé D6 pour obtenir des nombres
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border-2 border-pink-500/50 hover:border-purple-500 transition-all hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 glow-effect animate-glow-pulse">
                  2
                </div>
                <h3 className="font-black text-xl text-pink-400 mb-3">🔢 Composez votre nombre</h3>
                <p className="text-white font-semibold">
                  Utilisez les dés pour former un nombre entre 1 et 101
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border-2 border-yellow-500/50 hover:border-orange-500 transition-all hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 glow-effect animate-glow-pulse">
                  3
                </div>
                <h3 className="font-black text-xl text-yellow-400 mb-3">🗺️ Trouvez le département</h3>
                <p className="text-white font-semibold">
                  Identifiez le département correspondant et collectez des points
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 card-gaming p-8 shadow-2xl animate-scale-in">
            <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent glow-text">
              🗺️ EXPLOREZ LA FRANCE
            </h2>
            <p className="text-center text-purple-300 font-semibold mb-8 text-lg">
              101 départements à découvrir, 22 anciennes régions à explorer
            </p>
            <FranceMapStyled showControls={true} />
            <div className="mt-6 text-center">
              <p className="text-cyan-300 font-bold text-sm animate-pulse">
                💡 Cliquez sur le bouton <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded">⛶</span> pour voir la carte en plein écran !
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

