import { useEffect } from 'react';

type TUseClose = {
  isOpen: boolean;
  onClose: () => void;
  rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const { target } = e;
      const arrowButton = document.querySelector('[aria-label="Открыть/Закрыть форму параметров статьи"]');
      
      if (
        target instanceof Node && 
        rootRef.current && 
        !rootRef.current.contains(target) && 
        arrowButton && 
        !arrowButton.contains(target)
      ) {
        onClose();
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, rootRef]);
}