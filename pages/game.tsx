import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useGameStore } from '../store/gameStore';
import { DiceRoll } from '../components/Dice';
import CompositionChoices from '../components/CompositionChoices';
import HintModal from '../components/HintModal';
import { BonusModal } from '../components/BonusModal';
import { Marquee } from '../components/Marquee';
import ScoreBoard from '../components/ScoreBoard';
import { Department, getDepartmentById } from '../data/departments';

const GamePage: React.FC = () => {
  const {
    players,
    currentPlayerIndex,
    diceResults,
    availableDepartments,
    compositions,
    hintsUsed,
    currentDepartment,
    phase,
    gameStarted,
    gameEnded,
    winner,
    rollDice,
    selectComposition,
    setHintCount,
    submitGuess,
    submitBonusQuestion,
    finishTurn,
    nextTurn,
    sellChampionCard,
    startGame,
    addPlayer,
    removePlayer,
    updatePlayerName,
    saveGame,
    loadGame,
    resetGame
  } = useGameStore();

  const [isRolling, setIsRolling] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showCompositions, setShowCompositions] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [marqueeText, setMarqueeText] = useState('');
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showFinalScores, setShowFinalScores] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  // Charger la partie sauvegardée au montage
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Sauvegarder automatiquement quand l'état change
  useEffect(() => {
    if (gameStarted) {
      saveGame();
    }
  }, [players, currentPlayerIndex, availableDepartments, gameStarted, saveGame]);

  const handleRollDice = () => {
    setIsRolling(true);
    setShowCompositions(false);
    rollDice();
    
    // Arrêter l'animation après 1.5 secondes et montrer les compositions
    setTimeout(() => {
      setIsRolling(false);
      setShowCompositions(true);
    }, 1500);
  };

  const handleSelectComposition = (departmentId: number) => {
    selectComposition(departmentId);
    setShowHintModal(true);
  };

  const handleUseHint = (hintCount: number) => {
    setHintCount(hintCount);
  };

  const handleSubmitGuess = (guess: string) => {
    const isCorrect = submitGuess(guess);
    return isCorrect;
  };

  const handleCorrectAnswer = () => {
    setShowBonusModal(true);
  };

  const handleBonusQuestion = (prefecture: string) => {
    const isCorrect = submitBonusQuestion(prefecture);
    return isCorrect;
  };

  const handleFinishTurn = () => {
    finishTurn();
    nextTurn();
    setShowBonusModal(false);
    
    // Afficher le marquee pour le tour suivant
    const nextPlayer = players[(currentPlayerIndex + 1) % players.length];
    setMarqueeText(`Tour de ${nextPlayer.name} - Score: ${nextPlayer.score} points`);
    setShowMarquee(true);
  };

  const handlePassTurn = () => {
    nextTurn();
    setShowHintModal(false);
    setShowCompositions(false);
    
    // Afficher le marquee pour le tour suivant
    const nextPlayer = players[(currentPlayerIndex + 1) % players.length];
    setMarqueeText(`Tour de ${nextPlayer.name} - Score: ${nextPlayer.score} points`);
    setShowMarquee(true);
  };

  const handleSellChampionCard = (playerId: number) => {
    sellChampionCard();
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < 4) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 1) {
      startGame();
      
      // Afficher le marquee pour le premier joueur
      const firstPlayer = players[0];
      setMarqueeText(`Début de la partie - Tour de ${firstPlayer.name}`);
      setShowMarquee(true);
    }
  };

  const handleCloseHintModal = () => {
    setShowHintModal(false);
    setShowCompositions(false);
  };

  const handleStartEditing = (playerId: number, currentName: string) => {
    setEditingPlayerId(playerId);
    setEditingName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingPlayerId && editingName.trim()) {
      updatePlayerName(editingPlayerId, editingName.trim());
      setEditingPlayerId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayerId(null);
    setEditingName('');
  };

  const handleEndGame = () => {
    setShowEndGameConfirm(false);
    setShowFinalScores(true);
  };

  const handleNewGame = () => {
    setShowFinalScores(false);
    resetGame();
  };

  return (
    <>
      <Head>
        <title>La France et ses 101 départements - Jeu</title>
        <meta name="description" content="Jouez à La France et ses 101 départements" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  La France et ses 101 départements
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {gameStarted ? `Tour de ${currentPlayer.name}` : 'Configuration de la partie'}
                </p>
              </div>
              
              <div className="flex space-x-2">
                {gameStarted && !gameEnded && (
                  <button
                    onClick={() => setShowEndGameConfirm(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <span>🏆</span>
                    Fin du jeu
                  </button>
                )}
                {!gameStarted && (
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Nouvelle partie
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {!gameStarted ? (
            /* Configuration de la partie */
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Configuration des joueurs
                </h2>
                
                <div className="space-y-4">
                  {/* Liste des joueurs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        {editingPlayerId === player.id ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit();
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-600 hover:text-green-700 font-semibold text-sm"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-red-600 hover:text-red-700 font-semibold text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {player.name}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStartEditing(player.id, player.name)}
                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                              >
                                ✏️
                              </button>
                              {players.length > 1 && (
                                <button
                                  onClick={() => removePlayer(player.id)}
                                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Ajouter un joueur */}
                  {players.length < 4 && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        placeholder="Nom du nouveau joueur"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                      />
                      <button
                        onClick={handleAddPlayer}
                        disabled={!newPlayerName.trim()}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                  )}

                  {/* Bouton démarrer */}
                  <div className="pt-4">
                    <button
                      onClick={handleStartGame}
                      disabled={players.length < 1}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {players.length < 1 ? 'Ajoutez au moins 1 joueur' : 'Démarrer la partie'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : gameEnded ? (
            /* Fin de partie */
            <div className="text-center space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Partie terminée !
                </h2>
                {winner && (
                  <div className="mb-6">
                    <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                      🏆 {winner.name} gagne !
                    </div>
                    <div className="text-xl text-gray-700 dark:text-gray-300">
                      Score final: {winner.score.toLocaleString()} points
                    </div>
                  </div>
                )}
                <button
                  onClick={resetGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Nouvelle partie
                </button>
              </div>
            </div>
          ) : (
            /* Jeu en cours */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Zone gauche - Scores */}
              <div className="lg:col-span-1">
                <ScoreBoard
                  players={players}
                  currentPlayerIndex={currentPlayerIndex}
                  onSellChampionCard={handleSellChampionCard}
                  onUpdatePlayerName={updatePlayerName}
                />
              </div>

              {/* Zone centrale - Jeu */}
              <div className="lg:col-span-2 space-y-6">
                {/* Dés */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <DiceRoll
                    diceResults={diceResults}
                    isRolling={isRolling}
                    onRollComplete={() => {}}
                  />
                  
                  {phase === 'rolling' && !showHintModal && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleRollDice}
                        disabled={isRolling}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                      >
                        {isRolling ? 'Lancement...' : 'Lancer les dés'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Compositions */}
                {phase === 'choosing' && compositions.length > 0 && showCompositions && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <CompositionChoices
                      compositions={compositions}
                      availableDepartments={availableDepartments}
                      onSelectComposition={handleSelectComposition}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="text-center">
                    <button
                      onClick={handlePassTurn}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Tour du joueur suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal d'indices */}
          {currentDepartment && (
            <HintModal
              isOpen={showHintModal}
              onClose={handleCloseHintModal}
              department={currentDepartment}
              hintsUsed={hintsUsed}
              onUseHint={handleUseHint}
              onSubmitGuess={handleSubmitGuess}
              onPassTurn={handlePassTurn}
              onCorrectAnswer={handleCorrectAnswer}
            />
          )}
        </div>

        {/* Bonus Modal */}
        {currentDepartment && (
          <BonusModal
            isOpen={showBonusModal}
            onClose={handleFinishTurn}
            department={currentDepartment}
            onSubmitBonus={handleBonusQuestion}
          />
        )}

        {/* Marquee */}
        <Marquee
          text={marqueeText}
          isVisible={showMarquee}
          onComplete={() => setShowMarquee(false)}
        />

        {/* Modal de confirmation de fin de jeu */}
        {showEndGameConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md mx-4">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  <span>⚠️</span>
                  Terminer la partie ?
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Êtes-vous sûr de vouloir terminer cette partie ? Cette action mettra fin au jeu et affichera les scores finaux.
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                  ⚠️ Toute progression sera perdue et la partie ne pourra pas être reprise.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowEndGameConfirm(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleEndGame}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Oui, terminer la partie
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal des scores finaux */}
        {showFinalScores && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>🏆</span>
                  Scores Finaux
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {players
                  .slice()
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => {
                    const departments = player.souvenirCards.map(id => getDepartmentById(id)).filter(Boolean);
                    
                    return (
                      <div 
                        key={player.id} 
                        className={`p-4 rounded-lg border-2 ${
                          index === 0 
                            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400' 
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {index === 0 && (
                              <span className="text-4xl">🏆</span>
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {index + 1}. {player.name}
                              </h3>
                              {index === 0 && (
                                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                                  Vainqueur !
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {player.score.toLocaleString()} pts
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">💳 Cartes Souvenir:</span>
                              <span className="text-lg text-gray-700 dark:text-gray-300">{player.souvenirCards.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">🏆 Cartes Champion:</span>
                              <span className="text-lg text-gray-700 dark:text-gray-300">{player.championCards}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">📍 Départements gagnés:</span>
                              <span className="text-lg text-gray-700 dark:text-gray-300">{departments.length}</span>
                            </div>
                          </div>

                          {departments.length > 0 && (
                            <div>
                              <p className="font-semibold mb-2 text-gray-900 dark:text-white">Départements:</p>
                              <div className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {departments.map((dept) => dept && (
                                  <div key={dept.id} className="text-gray-700 dark:text-gray-300">
                                    {dept.id.toString().padStart(2, '0')} - {dept.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleNewGame}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-lg transition-colors"
                  >
                    Nouvelle Partie
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePage;