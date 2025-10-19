import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice } from '@/components/Dice';
import { CompositionsList } from '@/components/CompositionsList';
import { PlayersPanel } from '@/components/PlayersPanel';
import { IndicesPanel } from '@/components/IndicesPanel';
import { useSocket } from '@/hooks/useSocket';
import { useGameStore } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import type { Department } from '@/types';

export default function GamePage() {
  const router = useRouter();
  const { code } = router.query;
  const { user } = useAuthStore();

  const {
    gameState,
    currentDice,
    currentCompositions,
    indicesRevealed,
    isSpectator,
    setGameState,
    updateGameState,
    setCurrentDice,
    setCurrentCompositions,
    addRevealedIndex,
    resetCurrentTurn,
    setIsSpectator,
  } = useGameStore();

  const [isRolling, setIsRolling] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pseudo, setPseudo] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const { isConnected, joinGame, startGame, rollDice, revealIndex, chooseComposition, saveGame } =
    useSocket({
      onStateUpdate: (state) => {
        console.log('État de la partie reçu:', state);
        console.log('HostId:', state.game?.hostId, 'User ID:', user?.id);
        if (state.game) {
          setGameState(state as any);
          setLoading(false);
        } else {
          updateGameState(state);
        }
      },
      onDiceRolled: (dice) => {
        setCurrentDice(dice);
        setIsRolling(false);
      },
      onCompositionsList: (compositions) => {
        setCurrentCompositions(compositions);
      },
      onIndicesReveal: (data) => {
        addRevealedIndex(data.indexNumber);
      },
      onRoundResult: (result) => {
        resetCurrentTurn();
        setSelectedDepartment(null);
      },
      onTurnStarted: (playerId) => {
        resetCurrentTurn();
        setSelectedDepartment(null);
      },
      onError: (message) => {
        console.error('Socket error:', message);
        setError(message);
        setConnectionError(message);
        setTimeout(() => {
          setError(null);
          setConnectionError(null);
        }, 5000);
      },
      onGameFinished: (data) => {
        alert(`Partie terminée! Gagnant: ${data.winner.user?.pseudo || data.winner.guestPseudo}`);
      },
      onGameSaved: (data) => {
        alert(data.message);
      },
      onSpectatorMode: (isSpec) => {
        setIsSpectator(isSpec);
      },
    });

  useEffect(() => {
    if (code && typeof code === 'string' && isConnected && !hasJoined) {
      const playerPseudo = user?.pseudo || pseudo;
      if (playerPseudo) {
        console.log('Joining game:', code, 'with pseudo:', playerPseudo);
        joinGame(code, playerPseudo);
        setHasJoined(true);
        
        const timeout = setTimeout(() => {
          setLoading(false);
          setConnectionError('Timeout: Impossible de rejoindre la partie');
        }, 10000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [code, isConnected, hasJoined, user?.pseudo, pseudo, joinGame]);

  // Timeout général pour éviter le chargement infini
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && !isConnected) {
        setLoading(false);
        setConnectionError('Impossible de se connecter au serveur');
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [loading, isConnected]);

  const handleRollDice = () => {
    if (code && typeof code === 'string') {
      setIsRolling(true);
      rollDice(code);
    }
  };

  const handleRevealIndex = (index: number) => {
    if (code && typeof code === 'string') {
      revealIndex(code, index);
    }
  };

  const handleSelectComposition = async (value: number) => {
    const departments = await fetchDepartmentByCardNumber(value);
    if (departments && departments.length > 0) {
      setSelectedDepartment(departments[0]);
    }
  };

  const handleConfirmChoice = () => {
    if (code && typeof code === 'string' && selectedDepartment) {
      const cardNumber = parseInt(selectedDepartment.numero);
      chooseComposition(code, cardNumber);
    }
  };

  const handleStartGame = () => {
    if (code && typeof code === 'string') {
      startGame(code);
    }
  };

  const handleSaveGame = () => {
    if (code && typeof code === 'string') {
      saveGame(code);
    }
  };

  const fetchDepartmentByCardNumber = async (cardNumber: number) => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      if (data.success) {
        return data.departments.filter((d: any) => d.card?.cardNumber === cardNumber);
      }
    } catch (error) {
      console.error('Erreur fetch departments:', error);
    }
    return null;
  };

  if (!code || typeof code !== 'string') {
    return <div className="min-h-screen flex items-center justify-center">Code invalide</div>;
  }

  if (!hasJoined && !user && !pseudo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Rejoindre la partie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Votre pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <Button 
              className="w-full" 
              onClick={() => {
                if (pseudo.trim()) {
                  setPseudo(pseudo.trim());
                }
              }} 
              disabled={!pseudo.trim()}
            >
              Rejoindre
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || !gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Connexion à la partie...</p>
          {connectionError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
              {connectionError}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentPlayer = gameState.game.players.find(
    (p) => p.id === gameState.currentTurn?.playerId
  );
  const isMyTurn =
    currentPlayer?.userId === user?.id || currentPlayer?.guestPseudo === pseudo;
  const isLobby = gameState.game.status === 'lobby';

  return (
    <>
      <Head>
        <title>Partie {code} - La France et ses 101 départements</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quitter
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-900">Partie: {code}</h1>
              <p className="text-sm text-gray-600">
                Statut: {gameState.game.status === 'lobby' ? 'En attente' : 'En cours'}
                {isSpectator && ' (Spectateur)'}
              </p>
            </div>
            <Button variant="outline" onClick={handleSaveGame}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
              {error}
            </div>
          )}

          {isLobby ? (
            <div className="text-center py-12">
              <Card className="inline-block">
                <CardHeader>
                  <CardTitle>En attente de joueurs...</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    {gameState.game.players.length} / {gameState.game.maxPlayers} joueurs
                  </p>
                  {gameState.game.hostId === user?.id && (
                    <Button
                      onClick={handleStartGame}
                      disabled={gameState.game.players.length < 2}
                    >
                      Démarrer la partie
                    </Button>
                  )}
                </CardContent>
              </Card>
              <div className="mt-6">
                <PlayersPanel
                  players={gameState.game.players}
                  currentPlayerId={gameState.currentTurn?.playerId || 0}
                />
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isMyTurn ? 'Votre tour!' : `Tour de ${currentPlayer?.user?.pseudo || currentPlayer?.guestPseudo || 'Joueur'}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Dés</h3>
                      <Dice dice={currentDice} isRolling={isRolling} />
                      {isMyTurn && !currentDice && (
                        <Button className="w-full mt-4" onClick={handleRollDice}>
                          Lancer les dés
                        </Button>
                      )}
                    </div>

                    {currentCompositions.length > 0 && (
                      <CompositionsList
                        compositions={currentCompositions}
                        onSelect={handleSelectComposition}
                        disabled={!isMyTurn || isSpectator}
                      />
                    )}

                    {selectedDepartment && (
                      <div className="p-4 bg-green-50 border border-green-300 rounded">
                        <h4 className="font-semibold mb-2">Département sélectionné:</h4>
                        <p>
                          {selectedDepartment.numero} - {selectedDepartment.nom}
                        </p>
                        <p className="text-sm text-gray-600">{selectedDepartment.prefecture}</p>
                        {isMyTurn && (
                          <Button className="mt-4 w-full" onClick={handleConfirmChoice}>
                            Confirmer le choix
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedDepartment && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Indices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IndicesPanel
                        department={selectedDepartment}
                        revealedIndices={indicesRevealed}
                        onRevealIndex={handleRevealIndex}
                        disabled={!isMyTurn || isSpectator}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <PlayersPanel
                  players={gameState.game.players}
                  currentPlayerId={gameState.currentTurn?.playerId || 0}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}


