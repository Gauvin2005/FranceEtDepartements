import React from 'react';
import { motion } from 'framer-motion';

interface MascotProps {
  show?: boolean;
  variant?: 'idle' | 'excited' | 'thinking';
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'right' | 'center';
}

export const Mascot: React.FC<MascotProps> = ({
  show = true,
  variant = 'idle',
  size = 'medium',
  position = 'right',
}) => {
  if (!show) return null;

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const positionClasses = {
    left: 'left-4',
    right: 'right-4',
    center: 'left-1/2 -translate-x-1/2',
  };

  const animations = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    excited: {
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: 2,
        ease: 'easeInOut',
      },
    },
    thinking: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 1,
        repeat: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className={`absolute bottom-4 ${positionClasses[position]} ${sizeClasses[size]} z-40`}
      animate={animations[variant]}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f7ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3d3bff" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="visorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f7ff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Corps */}
        <ellipse
          cx="50"
          cy="65"
          rx="20"
          ry="15"
          fill="#e0e7ff"
          opacity="0.9"
        />
        
        {/* Casque */}
        <ellipse
          cx="50"
          cy="40"
          rx="22"
          ry="25"
          fill="url(#helmetGradient)"
          stroke="#00f7ff"
          strokeWidth="1.5"
        />
        
        {/* Visière */}
        <path
          d="M 30 40 Q 50 30 70 40 Q 50 50 30 40"
          fill="url(#visorGradient)"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Yeux */}
        <circle cx="42" cy="38" r="3" fill="#0b0f26" />
        <circle cx="58" cy="38" r="3" fill="#0b0f26" />
        {variant === 'excited' && (
          <>
            <ellipse cx="42" cy="38" rx="2" ry="1" fill="#00f7ff" />
            <ellipse cx="58" cy="38" rx="2" ry="1" fill="#00f7ff" />
          </>
        )}
        
        {/* Antenne */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="15"
          stroke="#00f7ff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="15" r="2" fill="#00f7ff" />
        
        {/* Bras gauche */}
        <ellipse
          cx="28"
          cy="60"
          rx="6"
          ry="12"
          fill="#e0e7ff"
          opacity="0.9"
          transform="rotate(-20 28 60)"
        />
        
        {/* Bras droit */}
        <ellipse
          cx="72"
          cy="60"
          rx="6"
          ry="12"
          fill="#e0e7ff"
          opacity="0.9"
          transform="rotate(20 72 60)"
        />
        
        {/* Détails lumineux */}
        <circle cx="50" cy="32" r="2" fill="#00f7ff" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );
};

