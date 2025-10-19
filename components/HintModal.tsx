import React, { useState } from 'react';
import { Department } from '../data/departments';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
  hintsUsed: number;
  onUseHint: (hintCount: number) => void;
  onSubmitGuess: (guess: string) => boolean;
  onPassTurn: () => void;
  onCorrectAnswer: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  department,
  hintsUsed,
  onUseHint,
  onSubmitGuess,
  onPassTurn,
  onCorrectAnswer
}) => {
  const [guess, setGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen) return null;

  const handleSubmitGuess = () => {
    const correct = onSubmitGuess(guess);
    console.log('Réponse soumise:', guess, 'Correct:', correct);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      // Si correct, fermer cette modal et ouvrir la modal bonus
      setTimeout(() => {
        setShowResult(false);
        setGuess('');
        onClose();
        onCorrectAnswer();
      }, 2000);
    } else {
      // Si incorrect, fermer après 2 secondes
      console.log('Réponse incorrecte, fermeture dans 2 secondes');
      setTimeout(() => {
        setShowResult(false);
        setGuess('');
        onClose();
      }, 2000);
    }
  };

  const handlePassTurn = () => {
    onPassTurn();
    onClose();
  };

  const getPointsForHints = (hintCount: number) => {
    switch (hintCount) {
      case 0: return 5000;
      case 1: return 2000;
      case 2: return 1000;
      case 3: return 100;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Devinez le département
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Département numéro <span className="font-bold text-blue-600 dark:text-blue-400">{department.id}</span>
          </p>
        </div>

        {/* Boutons d'indices */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Choisissez vos indices
          </h3>
          
          {hintsUsed > 0 && (
            <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Une fois votre choix fait, vous ne pouvez plus revenir en arrière pour éviter la triche !
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => onUseHint(0)}
              disabled={hintsUsed > 0}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                hintsUsed === 0 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : hintsUsed > 0
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Aucun indice
              <div className="text-xs">±5000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(1)}
              disabled={hintsUsed > 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                hintsUsed === 1 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : hintsUsed > 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              1 indice
              <div className="text-xs">±2000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(2)}
              disabled={hintsUsed > 2}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                hintsUsed === 2 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : hintsUsed > 2
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              2 indices
              <div className="text-xs">±1000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(3)}
              disabled={hintsUsed > 3}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                hintsUsed === 3 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : hintsUsed > 3
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              3 indices
              <div className="text-xs">±100 pts</div>
            </button>
          </div>
        </div>

        {/* Affichage des indices */}
        {hintsUsed > 0 && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Indices révélés:
            </h4>
            <ul className="space-y-1">
              {department.hints.slice(0, hintsUsed).map((hint, index) => (
                <li key={index} className="text-blue-700 dark:text-blue-300 text-sm">
                  • {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Champ de devinette */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre réponse:
          </label>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Nom du département..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={showResult}
          />
        </div>

        {/* Résultat */}
        {showResult && (
          <div className={`mb-4 p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            <p className={`font-semibold ${
              isCorrect 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
            <p className={`text-sm ${
              isCorrect 
                ? 'text-green-700 dark:text-green-300' 
                : 'text-red-700 dark:text-red-300'
            }`}>
              {isCorrect 
                ? `+${getPointsForHints(hintsUsed)} points` 
                : `-${getPointsForHints(hintsUsed)} points`
              }
            </p>
            {!isCorrect && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                La réponse était: {department.name}
              </p>
            )}
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex space-x-3">
          <button
            onClick={handleSubmitGuess}
            disabled={!guess.trim() || showResult}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Valider
          </button>
          
          <button
            onClick={handlePassTurn}
            disabled={showResult}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Tour du joueur suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;