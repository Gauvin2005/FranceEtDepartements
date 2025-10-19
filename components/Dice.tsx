import React, { useState, useEffect } from 'react';

interface DiceProps {
  value: number;
  isRolling?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'd10' | 'd6';
}

const Dice: React.FC<DiceProps> = ({ 
  value, 
  isRolling = false, 
  size = 'md', 
  type = 'd10' 
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setIsAnimating(true);
      
      // Animation de roulement
      const rollInterval = setInterval(() => {
        const randomValue = type === 'd6' 
          ? Math.floor(Math.random() * 6) + 1
          : Math.floor(Math.random() * 10);
        setDisplayValue(randomValue);
      }, 100);

      // Arrêter l'animation après 1.5 secondes
      setTimeout(() => {
        clearInterval(rollInterval);
        setDisplayValue(value);
        setIsAnimating(false);
      }, 1500);

      return () => clearInterval(rollInterval);
    } else {
      setDisplayValue(value);
    }
  }, [isRolling, value, type]);

  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl'
  };

  const diceClasses = `
    ${sizeClasses[size]}
    bg-white dark:bg-gray-800
    border-2 border-gray-300 dark:border-gray-600
    rounded-lg shadow-lg
    flex items-center justify-center
    font-bold text-gray-800 dark:text-gray-200
    transition-all duration-300
    ${isAnimating ? 'animate-pulse scale-110' : ''}
    ${isRolling ? 'animate-spin' : ''}
  `;

  return (
    <div className={diceClasses}>
      <span className={isAnimating ? 'opacity-50' : 'opacity-100'}>
        {displayValue}
      </span>
    </div>
  );
};

interface DiceRollProps {
  diceResults: number[];
  isRolling: boolean;
  onRollComplete?: () => void;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ 
  diceResults, 
  isRolling, 
  onRollComplete 
}) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setShowResults(false);
    } else if (diceResults.length === 3) {
      setShowResults(true);
      onRollComplete?.();
    }
  }, [isRolling, diceResults, onRollComplete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Résultat des dés
      </h3>
      
      <div className="flex space-x-4">
        {/* Premier dé (0-9) */}
        <div className="flex flex-col items-center space-y-2">
          <Dice 
            value={diceResults[0] || 0} 
            isRolling={isRolling}
            size="lg"
            type="d10"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Dé 1 (0-9)
          </span>
        </div>

        {/* Deuxième dé (0-9) */}
        <div className="flex flex-col items-center space-y-2">
          <Dice 
            value={diceResults[1] || 0} 
            isRolling={isRolling}
            size="lg"
            type="d10"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Dé 2 (0-9)
          </span>
        </div>

        {/* Troisième dé (1-6) */}
        <div className="flex flex-col items-center space-y-2">
          <Dice 
            value={diceResults[2] || 1} 
            isRolling={isRolling}
            size="lg"
            type="d6"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Dé 3 (1-6)
          </span>
        </div>
      </div>

      {showResults && diceResults.length === 3 && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-center text-blue-800 dark:text-blue-200 font-semibold">
            Résultat: {diceResults[0]} - {diceResults[1]} - {diceResults[2]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dice;