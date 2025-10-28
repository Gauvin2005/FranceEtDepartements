import { useEffect } from 'react';

/**
 * Hook pour bloquer le scroll du body quand une modale est ouverte
 * Restaure le scroll à la fermeture de la modale
 */
export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Bloquer le scroll
      document.body.style.overflow = 'hidden';

      // Compenser la perte de la scrollbar pour éviter le décalage
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restaurer le scroll quand la modale se ferme
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup : restaurer le scroll quand le composant se démonte
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}

