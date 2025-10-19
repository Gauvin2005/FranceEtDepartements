import React, { useState } from 'react';
import { Department } from '../data/departments';

interface BonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
  onSubmitBonus: (prefecture: string) => boolean;
}

export const BonusModal: React.FC<BonusModalProps> = ({
  isOpen,
  onClose,
  department,
  onSubmitBonus
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Question bonus
          </h2>
          <button
            onClick={handleSkipBonus}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Félicitations ! Vous avez trouvé le département <span className="font-bold text-blue-600 dark:text-blue-400">{department.name}</span>
          </p>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              Question bonus (+1000 points / -500 points)
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-3">
              Connaissez-vous la préfecture de ce département ?
            </p>
            
            {!showResult ? (
              <>
                <input
                  type="text"
                  value={prefectureGuess}
                  onChange={(e) => setPrefectureGuess(e.target.value)}
                  placeholder="Nom de la préfecture..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent mb-3"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmitBonus}
                    disabled={!prefectureGuess.trim()}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Valider
                  </button>
                  <button
                    onClick={handleSkipBonus}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Passer
                  </button>
                </div>
              </>
            ) : (
              <div className={`p-4 rounded-lg ${
                hasPassed 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                <p className={`font-semibold ${
                  hasPassed 
                    ? 'text-blue-800 dark:text-blue-200' 
                    : isCorrect 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                }`}>
                  {hasPassed 
                    ? `C'était ${department.prefecture}` 
                    : isCorrect 
                      ? 'Préfecture correcte! +1000 points' 
                      : 'Préfecture incorrecte! -500 points'
                  }
                </p>
                {!hasPassed && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    La préfecture était: {department.prefecture}
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
