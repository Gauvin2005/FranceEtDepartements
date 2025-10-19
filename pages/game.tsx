import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useGameStore } from '../store/gameStore';
import { DiceRoll } from '../components/Dice';
import CompositionChoices from '../components/CompositionChoices';
import HintModal from '../components/HintModal';
import { BonusModal } from '../components/BonusModal';
import { Marquee } from '../components/Marquee';
import ScoreBoard from '../components/ScoreBoard';

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
    if (players.length >= 2) {
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
                <button
                  onClick={saveGame}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Nouvelle partie
                </button>
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
                        <span className="font-medium text-gray-900 dark:text-white">
                          {player.name}
                        </span>
                        {players.length > 2 && (
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="text-red-600 hover:text-red-700 font-semibold"
                          >
                            Supprimer
                          </button>
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
                      disabled={players.length < 2}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {players.length < 2 ? 'Ajoutez au moins 2 joueurs' : 'Démarrer la partie'}
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
      </div>
    </>
  );
};

export default GamePage;