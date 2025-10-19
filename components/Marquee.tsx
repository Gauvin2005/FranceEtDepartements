import React, { useState, useEffect } from 'react';

interface MarqueeProps {
  text: string;
  isVisible: boolean;
  onComplete?: () => void;
  speed?: 'slow' | 'medium' | 'fast';
}

export const Marquee: React.FC<MarqueeProps> = ({
  text,
  isVisible,
  onComplete,
  speed = 'medium'
}) => {
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'display' | 'exit'>('enter');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setCurrentIndex(0);
      setAnimationPhase('enter');
      return;
    }

    // Phase d'entrée - texte apparaît rapidement
    if (animationPhase === 'enter') {
      const enterInterval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= text.length) {
            setAnimationPhase('display');
            clearInterval(enterInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 30); // Rapide pour l'entrée

      return () => clearInterval(enterInterval);
    }

    // Phase d'affichage - pause pour lire
    if (animationPhase === 'display') {
      const displayTimeout = setTimeout(() => {
        setAnimationPhase('exit');
      }, 2000); // 2 secondes pour lire

      return () => clearTimeout(displayTimeout);
    }

    // Phase de sortie - texte disparaît rapidement
    if (animationPhase === 'exit') {
      const exitInterval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev <= 0) {
            clearInterval(exitInterval);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 20); // Très rapide pour la sortie

      return () => clearInterval(exitInterval);
    }
  }, [isVisible, animationPhase, text, onComplete]);

  useEffect(() => {
    setDisplayText(text.slice(0, currentIndex));
  }, [currentIndex, text]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold tracking-wide">
            {displayText}
            {animationPhase === 'display' && currentIndex === text.length && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
