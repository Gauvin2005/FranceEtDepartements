import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeStore } from '../stores/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  const themes = [
    {
      id: 'neon' as const,
      name: 'Néon',
      icon: '✨',
      description: 'Thème néon actuel',
    },
    {
      id: 'space' as const,
      name: 'Spatial',
      icon: '🚀',
      description: 'Thème spatial immersif',
    },
  ];

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg font-bold transition-all shadow-lg flex items-center gap-2"
          title="Basculer de thème"
        >
          <span>🎨</span>
          <span className="hidden sm:inline">Thème</span>
        </button>
      </div>

      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed w-64 bg-card/95 backdrop-blur-xl border-2 border-white/10 rounded-xl shadow-2xl overflow-hidden"
              style={{
                top: `${menuPosition.top}px`,
                right: `${menuPosition.right}px`,
                zIndex: 99999,
              }}
            >
              <div className="p-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      theme === t.id
                        ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-2 border-purple-500/50'
                        : 'hover:bg-white/5 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-white/60">{t.description}</div>
                    </div>
                    {theme === t.id && (
                      <span className="text-green-400 font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

