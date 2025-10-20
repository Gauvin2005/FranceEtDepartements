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
      <div className="card-gaming p-6 shadow-2xl animate-slide-in-right">
        <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text mb-6">
          🏆 SCORES
        </h2>
      
        <div className="space-y-4">
          {players.map((player, index) => {
            const isCurrentPlayer = index === currentPlayerIndex;
            const souvenirCount = player.souvenirCards.length;
            const championCount = player.championCards;
            
            return (
              <div
                key={player.id}
                className={`
                  p-5 rounded-xl border-2 transition-all duration-300
                  ${isCurrentPlayer 
                    ? 'border-cyan-500 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 shadow-xl glow-effect-cyan animate-glow-pulse' 
                    : 'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:border-purple-500/50'
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
                        className="px-3 py-2 border-2 border-purple-500 rounded-lg bg-card/50 text-white font-bold text-lg focus:border-cyan-500 focus:outline-none transition-colors"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-400 hover:text-green-300 font-bold text-xl transition-colors"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-400 hover:text-red-300 font-bold text-xl transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className={`font-black text-xl ${
                        isCurrentPlayer 
                          ? 'bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent' 
                          : 'text-white'
                      }`}>
                        {player.name}
                      </h3>
                      {onUpdatePlayerName && (
                        <button
                          onClick={() => handleStartEditing(player.id, player.name)}
                          className="text-purple-400 hover:text-purple-300 font-semibold text-lg transition-colors"
                        >
                          ✏️
                        </button>
                      )}
                      {isCurrentPlayer && (
                        <span className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full font-bold animate-glow-pulse">
                          ▶ Tour actuel
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                    {player.score.toLocaleString()} pts
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-purple-300 font-semibold">
                    Cartes Souvenir
                  </div>
                  <div className="text-2xl font-black text-purple-400">
                    💳 {souvenirCount}
                  </div>
                </div>
              </div>

              {/* Cartes Souvenir */}
              {souvenirCount > 0 && (
                <div className="mb-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-sm font-bold text-purple-300 mb-2">
                    📍 Départements gagnés:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {player.souvenirCards.map((deptId) => {
                      const department = getDepartmentById(deptId);
                      return (
                        <span
                          key={deptId}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white text-xs rounded-full font-bold border border-purple-400/50 hover:border-purple-300 transition-colors"
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
                <div className="mb-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-yellow-300 flex items-center gap-2">
                      🏆 Cartes Champion: <span className="text-xl">{championCount}</span>
                    </div>
                    <button
                      onClick={() => onSellChampionCard(player.id)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white text-xs rounded-lg font-bold transition-all shadow-lg hover:scale-105"
                    >
                      💰 Vendre (+25000 pts)
                    </button>
                  </div>
                </div>
              )}

              {/* Progression vers la prochaine carte Champion */}
              <div className="mt-3 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <div className="text-xs text-cyan-300 mb-2 font-bold">
                  🎯 Prochaine carte Champion dans {10 - (souvenirCount % 10)} souvenirs
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden border border-cyan-500/30">
                  <div
                    className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-300 animate-glow-pulse"
                    style={{ width: `${(souvenirCount % 10) * 10}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

        {/* Statistiques globales */}
        <div className="mt-4 p-4 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-xl border border-pink-500/30">
          <h3 className="font-black text-pink-300 mb-3 flex items-center gap-2">
            📊 STATISTIQUES
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-xs text-purple-300 font-bold">Total souvenirs</div>
              <div className="text-2xl font-black text-purple-400">
                💳 {players.reduce((sum, p) => sum + p.souvenirCards.length, 0)}
              </div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="text-xs text-yellow-300 font-bold">Total champions</div>
              <div className="text-2xl font-black text-yellow-400">
                🏆 {players.reduce((sum, p) => sum + p.championCards, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
