import React, { useEffect, useState } from 'react';

interface TimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
}

export const TimeoutModal: React.FC<TimeoutModalProps> = ({
  isOpen,
  onClose,
  playerName
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
      <div className="card-gaming p-8 max-w-md mx-4 shadow-2xl animate-float">
        <div className="mb-6 text-center">
          <div className="text-6xl mb-4 animate-glow-pulse">⏰</div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent glow-text">
            Temps écoulé !
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border-2 border-red-500/50">
            <p className="text-white text-lg text-center">
              Le temps de réflexion de <span className="font-bold text-red-300">{playerName}</span> est terminé.
            </p>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/30">
            <p className="text-purple-300 text-center font-semibold">
              ⚡ Le tour passe automatiquement au joueur suivant
            </p>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105 animate-glow-pulse"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
