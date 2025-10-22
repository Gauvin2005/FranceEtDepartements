import React, { useState } from 'react';
import { Department } from '../data/departments';

interface BonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
  onSubmitBonus: (prefecture: string) => boolean;
  // Timer
  timeRemaining?: number;
  timerActive?: boolean;
}

export const BonusModal: React.FC<BonusModalProps> = ({
  isOpen,
  onClose,
  department,
  onSubmitBonus,
  timeRemaining = 0,
  timerActive = false
}) => {
  const [prefectureGuess, setPrefectureGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  // Réinitialiser les états quand la modal s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setPrefectureGuess('');
      setShowResult(false);
      setIsCorrect(false);
      setHasPassed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitBonus = () => {
    const correct = onSubmitBonus(prefectureGuess);
    setIsCorrect(correct);
    setShowResult(true);
    
    // Fermer la modal après 3 secondes
    setTimeout(() => {
      setShowResult(false);
      setPrefectureGuess('');
      onClose();
    }, 3000);
  };

  const handleSkipBonus = () => {
    setHasPassed(true);
    setShowResult(true);
    
    // Fermer la modal après 3 secondes
    setTimeout(() => {
      setShowResult(false);
      setHasPassed(false);
      setPrefectureGuess('');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
      <div className="card-gaming max-w-md w-full mx-4 p-8 shadow-2xl animate-float">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="text-5xl animate-glow-pulse">🎁</div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent glow-text">
              QUESTION BONUS
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Timer */}
            {timerActive && (
              <div className={`px-3 py-1 rounded-lg font-bold text-lg transition-all ${
                timeRemaining <= 30 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                  : timeRemaining <= 60 
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                  : 'bg-gradient-to-r from-green-500 to-cyan-500'
              }`}>
                ⏰ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            )}
            <button
              onClick={handleSkipBonus}
              className="text-red-400 hover:text-red-300 text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl border-2 border-green-500/50 mb-6 animate-glow-pulse">
            <p className="text-white text-center text-lg font-bold">
              🎉 Félicitations ! Vous avez trouvé le département <span className="text-cyan-300 text-xl font-black">{department.name}</span>
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-500/50">
            <h3 className="font-black text-yellow-300 mb-4 text-xl text-center">
              💰 Question bonus
              <div className="text-sm text-yellow-200 mt-1">+1000 points / -500 points</div>
            </h3>
            <p className="text-white font-bold mb-4 text-center text-lg">
              🏛️ Connaissez-vous la préfecture de ce département ?
            </p>
            
            {!showResult ? (
              <>
                <input
                  type="text"
                  value={prefectureGuess}
                  onChange={(e) => setPrefectureGuess(e.target.value)}
                  placeholder="Nom de la préfecture..."
                  className="w-full px-4 py-3 border-2 border-yellow-500/50 rounded-xl bg-card/50 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors font-bold text-lg mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmitBonus}
                    disabled={!prefectureGuess.trim()}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                  >
                    ✓ Valider
                  </button>
                  <button
                    onClick={handleSkipBonus}
                    className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                  >
                    ⏭️ Passer
                  </button>
                </div>
              </>
            ) : (
              <div className={`p-6 rounded-xl border-2 animate-scale-in ${
                hasPassed 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500' 
                  : isCorrect 
                    ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-500 glow-effect-cyan' 
                    : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500 glow-effect'
              }`}>
                <p className={`font-black text-2xl text-center ${
                  hasPassed 
                    ? 'text-blue-300' 
                    : isCorrect 
                      ? 'text-green-300' 
                      : 'text-red-300'
                }`}>
                  {hasPassed 
                    ? `C'était ${department.prefecture}` 
                    : isCorrect 
                      ? '✅ PRÉFECTURE CORRECTE! +1000 points' 
                      : '❌ PRÉFECTURE INCORRECTE! -500 points'
                  }
                </p>
                {!hasPassed && !isCorrect && (
                  <p className="text-white font-bold mt-3 p-2 bg-purple-500/20 rounded-lg text-center">
                    La préfecture était: <span className="text-cyan-300">{department.prefecture}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusModal;
