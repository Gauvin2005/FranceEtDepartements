import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useGameStore } from '../store/gameStore';
import { DiceRoll } from '../components/Dice';
import CompositionChoices from '../components/CompositionChoices';
import HintModal from '../components/HintModal';
import { BonusModal } from '../components/BonusModal';
import { TimeoutModal } from '../components/TimeoutModal';
import { Marquee } from '../components/Marquee';
import ScoreBoard from '../components/ScoreBoard';
import { FranceMapStyled } from '../components/FranceMapStyled';
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
    // Timer
    timeRemaining,
    timerActive,
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
    resetGame,
    stopTimer
  } = useGameStore();

  const [isRolling, setIsRolling] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
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

  // Surveiller le timer pour déclencher le timeout
  useEffect(() => {
    if (timerActive && timeRemaining <= 0) {
      setShowTimeoutModal(true);
      stopTimer();
    }
  }, [timerActive, timeRemaining, stopTimer]);

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

  const handleSelectComposition = (numero: string) => {
    selectComposition(numero);
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
    
    // Attendre que React mette à jour l'état avant d'afficher le marquee
    setTimeout(() => {
      const newPlayerIndex = useGameStore.getState().currentPlayerIndex;
      const updatedPlayers = useGameStore.getState().players;
      const nextPlayer = updatedPlayers[newPlayerIndex];
      setMarqueeText(`Tour de ${nextPlayer.name} - Score: ${nextPlayer.score} points`);
      setShowMarquee(true);
    }, 100);
  };

  const handlePassTurn = () => {
    nextTurn();
    setShowHintModal(false);
    setShowCompositions(false);
    
    // Attendre que React mette à jour l'état avant d'afficher le marquee
    setTimeout(() => {
      const newPlayerIndex = useGameStore.getState().currentPlayerIndex;
      const updatedPlayers = useGameStore.getState().players;
      const nextPlayer = updatedPlayers[newPlayerIndex];
      setMarqueeText(`Tour de ${nextPlayer.name} - Score: ${nextPlayer.score} points`);
      setShowMarquee(true);
    }, 100);
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

  const handleTimeoutClose = () => {
    setShowTimeoutModal(false);
    // Passer automatiquement au tour suivant
    handlePassTurn();
  };

  return (
    <>
      <Head>
        <title>La France et ses 101 départements - Jeu</title>
        <meta name="description" content="Jouez à La France et ses 101 départements" />
      </Head>

      <div className="min-h-screen">
        {/* En-tête Gaming */}
        <div className="relative border-b border-white/10 backdrop-blur-xl bg-card/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text animate-neon-flicker">
                  La France et ses 101 départements
                </h1>
                <p className="text-purple-300/80 font-semibold mt-1">
                  {gameStarted ? `⚡ Tour de ${currentPlayer.name}` : '🎮 Configuration de la partie'}
                </p>
                {/* Timer */}
                {gameStarted && !gameEnded && timerActive && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-lg font-bold text-lg transition-all ${
                      timeRemaining <= 30 
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                        : timeRemaining <= 60 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                        : 'bg-gradient-to-r from-green-500 to-cyan-500'
                    }`}>
                      ⏰ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </div>
                    {timeRemaining <= 30 && (
                      <span className="text-red-300 text-sm font-semibold animate-pulse">
                        ⚠️ Temps limité !
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                {gameStarted && !gameEnded && (
                  <button
                    onClick={() => setShowEndGameConfirm(true)}
                    className="btn-gaming px-6 py-3 text-white rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>🏆</span>
                    Fin du jeu
                  </button>
                )}
                {!gameStarted && (
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg font-bold transition-all shadow-lg glow-effect"
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
            <div className="space-y-6 animate-scale-in">
              <div className="card-gaming p-8 shadow-2xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                  ⚙️ Configuration des joueurs
                </h2>
                
                <div className="space-y-4">
                  {/* Liste des joueurs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
                      >
                        {editingPlayerId === player.id ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="flex-1 px-3 py-2 border border-purple-500/50 rounded-lg bg-card/50 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit();
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-bold text-white text-lg">
                              {player.name}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStartEditing(player.id, player.name)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105"
                              >
                                ✏️
                              </button>
                              {players.length > 1 && (
                                <button
                                  onClick={() => removePlayer(player.id)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105"
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
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        placeholder="Nom du nouveau joueur"
                        className="flex-1 px-4 py-3 border border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                      />
                      <button
                        onClick={handleAddPlayer}
                        disabled={!newPlayerName.trim()}
                        className="px-6 py-3 btn-gaming text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        Ajouter
                      </button>
                    </div>
                  )}

                  {/* Bouton démarrer */}
                  <div className="pt-6">
                    <button
                      onClick={handleStartGame}
                      disabled={players.length < 1}
                      className="w-full btn-gaming text-white px-8 py-4 rounded-xl font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl animate-glow-pulse"
                    >
                      {players.length < 1 ? 'Ajoutez au moins 1 joueur' : '🎮 Démarrer la partie'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : gameEnded ? (
            /* Fin de partie */
            <div className="text-center space-y-6 animate-scale-in">
              <div className="card-gaming p-10 shadow-2xl animate-float">
                <div className="mb-6 animate-glow-pulse">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent glow-text mb-6">
                    PARTIE TERMINÉE !
                  </h2>
                </div>
                {winner && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-500/50">
                    <div className="text-3xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-3">
                      {winner.name} GAGNE !
                    </div>
                    <div className="text-2xl font-bold text-white">
                      Score final: <span className="text-cyan-400">{winner.score.toLocaleString()}</span> points
                    </div>
                  </div>
                )}
                <button
                  onClick={resetGame}
                  className="btn-gaming px-10 py-4 text-white rounded-xl font-bold text-xl transition-all shadow-2xl animate-glow-pulse"
                >
                  🎮 Nouvelle partie
                </button>
              </div>
            </div>
          ) : (
            /* Jeu en cours */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                <div className="card-gaming p-8 shadow-2xl animate-slide-in-left">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    🎲 Dés
                  </h3>
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
                        className="btn-gaming px-10 py-4 text-white rounded-xl font-bold text-xl transition-all disabled:opacity-50 shadow-2xl"
                      >
                        {isRolling ? '🎲 Lancement...' : '🎲 Lancer les dés'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Compositions */}
                {phase === 'choosing' && compositions.length > 0 && showCompositions && (
                  <div className="card-gaming p-8 shadow-2xl animate-scale-in">
                    <CompositionChoices
                      compositions={compositions}
                      availableDepartments={availableDepartments}
                      onSelectComposition={handleSelectComposition}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="card-gaming p-6 shadow-2xl">
                  <div className="text-center">
                    <button
                      onClick={handlePassTurn}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                    >
                      ⏭️ Tour du joueur suivant
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone droite - Carte de France */}
              <div className="lg:col-span-1">
                <FranceMapStyled 
                  currentDepartmentNumber={currentDepartment?.numero}
                  highlightedDepartments={players[currentPlayerIndex]?.souvenirCards.map(id => {
                    const dept = getDepartmentById(id);
                    return dept?.numero || '';
                  }).filter(Boolean) || []}
                  searchedDepartments={compositions}
                  showControls={true}
                  timeRemaining={timeRemaining}
                  timerActive={timerActive}
                />
                {currentDepartment && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border-2 border-cyan-500/50 animate-glow-pulse">
                    <p className="text-white font-bold text-center text-sm">
                      🎯 Département recherché : <span className="text-2xl text-cyan-300">{currentDepartment.numero}</span>
                    </p>
                  </div>
                )}
                {players[currentPlayerIndex]?.souvenirCards.length > 0 && (
                  <div className="mt-3 p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/50">
                    <p className="text-green-300 font-bold text-xs text-center">
                      💳 {players[currentPlayerIndex].souvenirCards.length} département(s) gagné(s)
                    </p>
                  </div>
                )}
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
              timeRemaining={timeRemaining}
              timerActive={timerActive}
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
            timeRemaining={timeRemaining}
            timerActive={timerActive}
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
            <div className="card-gaming p-8 max-w-md mx-4 shadow-2xl animate-float">
              <div className="mb-6 text-center">
                <div className="text-6xl mb-4 animate-glow-pulse">⚠️</div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent glow-text">
                  Terminer la partie ?
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-white text-lg text-center">
                  Êtes-vous sûr de vouloir terminer cette partie ? Cette action mettra fin au jeu et affichera les scores finaux.
                </p>
                <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border-2 border-red-500/50">
                  <p className="text-red-300 font-bold text-center">
                    ⚠️ Toute progression sera perdue et la partie ne pourra pas être reprise.
                  </p>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <button
                    onClick={() => setShowEndGameConfirm(false)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleEndGame}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105 animate-glow-pulse"
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-scale-in">
            <div className="card-gaming max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-float">
              <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 p-8 rounded-t-xl border-b-2 border-yellow-500/50">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-glow-pulse">🏆</div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent glow-text">
                    SCORES FINAUX
                  </h2>
                </div>
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
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                          index === 0 
                            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500 glow-effect animate-glow-pulse' 
                            : 'bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {index === 0 && (
                              <span className="text-5xl animate-glow-pulse">🏆</span>
                            )}
                            <div>
                              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                                {index + 1}. {player.name}
                              </h3>
                              {index === 0 && (
                                <span className="text-sm font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent glow-text">
                                  VAINQUEUR !
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              {player.score.toLocaleString()}
                            </div>
                            <div className="text-sm text-cyan-300">points</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                              <span className="font-bold text-white">💳 Cartes Souvenir:</span>
                              <span className="text-xl font-bold text-purple-300">{player.souvenirCards.length}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded-lg">
                              <span className="font-bold text-white">🏆 Cartes Champion:</span>
                              <span className="text-xl font-bold text-cyan-300">{player.championCards}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-pink-500/10 rounded-lg">
                              <span className="font-bold text-white">📍 Départements gagnés:</span>
                              <span className="text-xl font-bold text-pink-300">{departments.length}</span>
                            </div>
                          </div>

                          {departments.length > 0 && (
                            <div className="p-3 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/30">
                              <p className="font-bold mb-2 text-purple-300">Départements:</p>
                              <div className="text-sm space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                                {departments.map((dept) => dept && (
                                  <div key={dept.id} className="text-white p-1 hover:bg-purple-500/20 rounded transition-colors">
                                    <span className="font-bold text-cyan-300">{dept.numero}</span> - {dept.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleNewGame}
                    className="btn-gaming px-10 py-4 text-white rounded-xl font-bold text-xl transition-all shadow-2xl animate-glow-pulse"
                  >
                    🎮 Nouvelle Partie
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de timeout */}
        <TimeoutModal
          isOpen={showTimeoutModal}
          onClose={handleTimeoutClose}
          playerName={currentPlayer?.name || 'Joueur'}
        />
      </div>
    </>
  );
};

export default GamePage;