import { useEffect } from 'react';

/**
 * Custom hook to detect clicks/touches outside a specified ref and window scroll events.
 * 
 * @param {Object} ref - React ref of the element to monitor.
 * @param {boolean} isOpen - Boolean flag to enable/disable listeners.
 * @param {Function} onClose - Callback function to execute when an outside action is detected.
 */
export const useOutsideAction = (ref, isOpen, onClose) => {
    useEffect(() => {
        // Optimized: Only attach listeners if the menu is actually open
        if (!isOpen) return;

        /**
         * Closes the menu if the user clicks or touches outside the ref's element.
         */
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        /**
         * Closes the menu when the user scrolls the window.
         * Useful for mobile UX where scrolling should dismiss overlays.
         */
        const handleScroll = () => {
            onClose();
        };

        // Attach listeners
        // 'touchstart' for mobile sensitivity
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup: Important to remove listeners to prevent memory leaks
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ref, isOpen, onClose]);
};
