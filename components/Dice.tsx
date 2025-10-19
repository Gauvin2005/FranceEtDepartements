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
    sm: 'w-14 h-14 text-xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl'
  };

  const diceClasses = `
    ${sizeClasses[size]}
    bg-gradient-to-br from-purple-600 to-cyan-600
    border-2 border-purple-400/50
    rounded-xl shadow-2xl
    flex items-center justify-center
    font-black text-white
    transition-all duration-300
    ${isAnimating ? 'animate-glow-pulse scale-110 glow-effect' : ''}
    ${isRolling ? 'animate-spin' : ''}
    hover:scale-105 hover:shadow-purple-500/50
  `;

  return (
    <div className={diceClasses}>
      <span className={isAnimating ? 'opacity-70' : 'opacity-100 glow-text'}>
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
    <div className="flex flex-col items-center space-y-6">
      <div className="flex space-x-6">
        {/* Premier dé (0-9) */}
        <div className="flex flex-col items-center space-y-3 animate-scale-in">
          <Dice 
            value={diceResults[0] || 0} 
            isRolling={isRolling}
            size="lg"
            type="d10"
          />
          <span className="text-sm text-purple-300 font-bold px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/50">
            D10 (0-9)
          </span>
        </div>

        {/* Deuxième dé (0-9) */}
        <div className="flex flex-col items-center space-y-3 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <Dice 
            value={diceResults[1] || 0} 
            isRolling={isRolling}
            size="lg"
            type="d10"
          />
          <span className="text-sm text-cyan-300 font-bold px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/50">
            D10 (0-9)
          </span>
        </div>

        {/* Troisième dé (1-6) */}
        <div className="flex flex-col items-center space-y-3 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <Dice 
            value={diceResults[2] || 1} 
            isRolling={isRolling}
            size="lg"
            type="d6"
          />
          <span className="text-sm text-pink-300 font-bold px-3 py-1 bg-pink-500/20 rounded-full border border-pink-500/50">
            D6 (1-6)
          </span>
        </div>
      </div>

      {showResults && diceResults.length === 3 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl border-2 border-purple-500/50 animate-scale-in">
          <p className="text-center text-white font-black text-lg">
            Résultat: <span className="text-purple-300">{diceResults[0]}</span> - <span className="text-cyan-300">{diceResults[1]}</span> - <span className="text-pink-300">{diceResults[2]}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dice;