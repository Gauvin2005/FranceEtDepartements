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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
      <div className="card-gaming max-w-md w-full mx-4 p-8 shadow-2xl animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent glow-text">
            🎯 Devinez le département
          </h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl border-2 border-purple-500/50">
          <p className="text-white text-center text-lg">
            Département numéro <span className="font-black text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{department.numero}</span>
          </p>
        </div>

        {/* Boutons d'indices */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-purple-300 mb-4">
            💡 Choisissez vos indices
          </h3>
          
          {hintsUsed > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-xl">
              <p className="text-sm text-orange-300 font-bold text-center">
                ⚠️ Une fois votre choix fait, vous ne pouvez plus revenir en arrière pour éviter la triche !
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => onUseHint(0)}
              disabled={hintsUsed > 0}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                hintsUsed === 0 
                  ? 'bg-gradient-to-r from-green-600 to-cyan-600 text-white shadow-xl border-2 border-green-400 glow-effect-cyan' 
                  : hintsUsed > 0
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-2 border-gray-600/50'
                    : 'bg-purple-600/50 text-white hover:bg-purple-600 border-2 border-purple-400/50 hover:scale-105'
              }`}
            >
              Aucun indice
              <div className="text-sm font-black text-green-300">±5000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(1)}
              disabled={hintsUsed > 1}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                hintsUsed === 1 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl border-2 border-cyan-400 glow-effect-cyan' 
                  : hintsUsed > 1
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-2 border-gray-600/50'
                    : 'bg-purple-600/50 text-white hover:bg-purple-600 border-2 border-purple-400/50 hover:scale-105'
              }`}
            >
              1 indice
              <div className="text-sm font-black text-cyan-300">±2000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(2)}
              disabled={hintsUsed > 2}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                hintsUsed === 2 
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-xl border-2 border-yellow-400 glow-effect' 
                  : hintsUsed > 2
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-2 border-gray-600/50'
                    : 'bg-purple-600/50 text-white hover:bg-purple-600 border-2 border-purple-400/50 hover:scale-105'
              }`}
            >
              2 indices
              <div className="text-sm font-black text-yellow-300">±1000 pts</div>
            </button>
            
            <button
              onClick={() => onUseHint(3)}
              disabled={hintsUsed > 3}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                hintsUsed === 3 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl border-2 border-orange-400 glow-effect' 
                  : hintsUsed > 3
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-2 border-gray-600/50'
                    : 'bg-purple-600/50 text-white hover:bg-purple-600 border-2 border-purple-400/50 hover:scale-105'
              }`}
            >
              3 indices
              <div className="text-sm font-black text-red-300">±100 pts</div>
            </button>
          </div>
        </div>

        {/* Affichage des indices */}
        {hintsUsed > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border-2 border-cyan-500/50">
            <h4 className="font-bold text-cyan-300 mb-3 flex items-center gap-2">
              💡 Indices révélés:
            </h4>
            <ul className="space-y-2">
              {department.hints.slice(0, hintsUsed).map((hint, index) => (
                <li key={index} className="text-white font-semibold p-2 bg-cyan-500/10 rounded-lg">
                  • {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Champ de devinette */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-purple-300 mb-3">
            ✍️ Votre réponse:
          </label>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Nom du département..."
            className="w-full px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors font-bold text-lg"
            disabled={showResult}
          />
        </div>

        {/* Résultat */}
        {showResult && (
          <div className={`mb-6 p-6 rounded-xl border-2 animate-scale-in ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-500 glow-effect-cyan' 
              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500 glow-effect'
          }`}>
            <p className={`font-black text-2xl mb-2 ${
              isCorrect 
                ? 'text-green-300' 
                : 'text-red-300'
            }`}>
              {isCorrect ? '✅ CORRECT!' : '❌ INCORRECT!'}
            </p>
            <p className={`text-lg font-bold ${
              isCorrect 
                ? 'text-green-200' 
                : 'text-red-200'
            }`}>
              {isCorrect 
                ? `+${getPointsForHints(hintsUsed)} points` 
                : `-${getPointsForHints(hintsUsed)} points`
              }
            </p>
            {!isCorrect && (
              <p className="text-sm text-white mt-2 p-2 bg-purple-500/20 rounded-lg">
                La réponse était: <span className="font-bold text-cyan-300">{department.name}</span>
              </p>
            )}
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex space-x-3">
          <button
            onClick={handleSubmitGuess}
            disabled={!guess.trim() || showResult}
            className="flex-1 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
          >
            ✓ Valider
          </button>
          
          <button
            onClick={handlePassTurn}
            disabled={showResult}
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
          >
            ⏭️ Passer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;