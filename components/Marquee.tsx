import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

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
  const { theme } = useThemeStore();
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
      }, 15); // Plus rapide pour l'entrée

      return () => clearInterval(enterInterval);
    }

    // Phase d'affichage - pause pour lire
    if (animationPhase === 'display') {
      const displayTimeout = setTimeout(() => {
        setAnimationPhase('exit');
      }, 1200); // 1.2 secondes pour lire

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
      }, 10); // Très rapide pour la sortie

      return () => clearInterval(exitInterval);
    }
  }, [isVisible, animationPhase, text, onComplete]);

  useEffect(() => {
    setDisplayText(text.slice(0, currentIndex));
  }, [currentIndex, text]);

  if (!isVisible) return null;

  const isSpaceTheme = theme === 'space';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
      <div className={`relative text-white px-10 py-8 rounded-2xl shadow-2xl backdrop-blur-xl border-2 max-w-3xl mx-4 pointer-events-none animate-glow-pulse ${
        isSpaceTheme
          ? 'bg-gradient-to-r from-[#3d3bff] via-[#1a1a66] to-[#00f7ff] border-[#00f7ff]/30'
          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 border-white/30 glow-effect'
      }`}>
        <div className={`absolute inset-0 rounded-2xl blur-xl ${
          isSpaceTheme
            ? 'bg-gradient-to-r from-[#3d3bff]/50 via-[#1a1a66]/50 to-[#00f7ff]/50'
            : 'bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-cyan-600/50'
        }`}></div>
        <div className="text-center relative z-10">
          <div className={`text-4xl font-black tracking-wide mb-3 ${
            isSpaceTheme ? 'text-[#e0e7ff]' : 'glow-text'
          }`}>
            {displayText}
            {animationPhase === 'display' && currentIndex === text.length && (
              <span className={`animate-pulse ${isSpaceTheme ? 'text-[#00f7ff]' : 'text-yellow-300'}`}>|</span>
            )}
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full rounded-full transition-all duration-300 shadow-lg ${
              isSpaceTheme
                ? 'bg-gradient-to-r from-[#00f7ff] via-[#3d3bff] to-[#00f7ff]'
                : 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400'
            } ${
              animationPhase === 'enter' ? 'animate-pulse' : 
              animationPhase === 'display' ? 'w-full' : 'w-0'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
