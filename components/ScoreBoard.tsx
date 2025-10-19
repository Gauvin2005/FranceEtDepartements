import React from 'react';
import { Player } from '../store/gameStore';
import { getDepartmentById } from '../data/departments';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  onSellChampionCard: (playerId: number) => void;
  onUpdatePlayerName?: (playerId: number, newName: string) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  currentPlayerIndex,
  onSellChampionCard,
  onUpdatePlayerName
}) => {
  const currentPlayer = players[currentPlayerIndex];
  const [editingPlayerId, setEditingPlayerId] = React.useState<number | null>(null);
  const [editingName, setEditingName] = React.useState('');

  const handleStartEditing = (playerId: number, currentName: string) => {
    setEditingPlayerId(playerId);
    setEditingName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingPlayerId && editingName.trim() && onUpdatePlayerName) {
      onUpdatePlayerName(editingPlayerId, editingName.trim());
      setEditingPlayerId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayerId(null);
    setEditingName('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Tableau des scores
      </h2>
      
      <div className="space-y-3">
        {players.map((player, index) => {
          const isCurrentPlayer = index === currentPlayerIndex;
          const souvenirCount = player.souvenirCards.length;
          const championCount = player.championCards;
          
          return (
            <div
              key={player.id}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                ${isCurrentPlayer 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  {editingPlayerId === player.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-bold text-lg"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-bold text-lg ${
                        isCurrentPlayer 
                          ? 'text-blue-900 dark:text-blue-100' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {player.name}
                      </h3>
                      {onUpdatePlayerName && (
                        <button
                          onClick={() => handleStartEditing(player.id, player.name)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          ✏️
                        </button>
                      )}
                      {isCurrentPlayer && (
                        <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                          Tour actuel
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {player.score.toLocaleString()} pts
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cartes Souvenir
                  </div>
                  <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    {souvenirCount}
                  </div>
                </div>
              </div>

              {/* Cartes Souvenir */}
              {souvenirCount > 0 && (
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Départements gagnés:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {player.souvenirCards.map((deptId) => {
                      const department = getDepartmentById(deptId);
                      return (
                        <span
                          key={deptId}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                        >
                          {department?.name || deptId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cartes Champion */}
              {championCount > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cartes Champion: {championCount}
                    </div>
                    <button
                      onClick={() => onSellChampionCard(player.id)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded-lg font-semibold transition-colors"
                    >
                      Vendre (-5000 +2000)
                    </button>
                  </div>
                </div>
              )}

              {/* Progression vers la prochaine carte Champion */}
              <div className="mt-3">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Prochaine carte Champion dans {10 - (souvenirCount % 10)} souvenirs
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(souvenirCount % 10) * 10}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistiques globales */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Statistiques
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total souvenirs:</span>
            <span className="ml-2 font-semibold text-purple-600 dark:text-purple-400">
              {players.reduce((sum, p) => sum + p.souvenirCards.length, 0)}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total champions:</span>
            <span className="ml-2 font-semibold text-yellow-600 dark:text-yellow-400">
              {players.reduce((sum, p) => sum + p.championCards, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
