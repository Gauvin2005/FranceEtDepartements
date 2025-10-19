import React from 'react';
import { MockPlayer } from '../hooks/useMockGame';

interface GameBoardProps {
  players: MockPlayer[];
  currentPlayerId: number;
  currentTurnPlayerId: number;
  availableCards: number[];
  gameStatus: 'lobby' | 'running' | 'finished';
  onStartGame: () => void;
  onNextTurn: () => void;
  onRevealCard: (index: number) => void;
  onChooseComposition: (composition: string) => void;
  isMyTurn: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  players,
  currentPlayerId,
  currentTurnPlayerId,
  availableCards,
  gameStatus,
  onStartGame,
  onNextTurn,
  onRevealCard,
  onChooseComposition,
  isMyTurn,
}) => {
  const currentPlayer = players.find(p => p.id === currentTurnPlayerId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de la partie */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            La France et ses 101 départements
          </h1>
          
          <div className="flex justify-between items-center">
            <div className="text-lg text-gray-700 dark:text-gray-300">
              Statut: <span className="font-semibold capitalize">{gameStatus}</span>
            </div>
            
            {gameStatus === 'lobby' && (
              <button
                onClick={onStartGame}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Démarrer la partie
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des joueurs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Joueurs ({players.length})
            </h2>
            
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    player.id === currentTurnPlayerId
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {player.guestPseudo}
                        {player.id === currentTurnPlayerId && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            (Tour actuel)
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Position: {player.position} | Argent: {player.money}€
                      </div>
                    </div>
                    
                    {player.isEliminated && (
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        Éliminé
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions du joueur */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Actions
            </h2>
            
            {gameStatus === 'running' && currentPlayer && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-semibold text-blue-900 dark:text-blue-100">
                    Tour de: {currentPlayer.guestPseudo}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Position: {currentPlayer.position} | Argent: {currentPlayer.money}€
                  </div>
                </div>

                {isMyTurn && (
                  <div className="space-y-3">
                    <button
                      onClick={onNextTurn}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Passer le tour
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onChooseComposition('composition1')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Composition 1
                      </button>
                      <button
                        onClick={() => onChooseComposition('composition2')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Composition 2
                      </button>
                    </div>
                  </div>
                )}

                {!isMyTurn && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                    <div className="text-gray-600 dark:text-gray-400">
                      En attente du tour de {currentPlayer.guestPseudo}
                    </div>
                  </div>
                )}
              </div>
            )}

            {gameStatus === 'lobby' && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                <div className="text-yellow-800 dark:text-yellow-200">
                  En attente du démarrage de la partie
                </div>
              </div>
            )}
          </div>

          {/* Cartes disponibles */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Cartes disponibles ({availableCards.length})
            </h2>
            
            <div className="grid grid-cols-10 gap-1 max-h-96 overflow-y-auto">
              {availableCards.map((cardNumber) => (
                <button
                  key={cardNumber}
                  onClick={() => onRevealCard(cardNumber)}
                  className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded transition-colors"
                >
                  {cardNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
