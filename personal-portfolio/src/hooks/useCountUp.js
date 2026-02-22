import { useState, useEffect } from 'react';

/**
 * Custom hook for count-up animation.
 * 
 * @param {number} target - The number to count up to.
 * @param {number} duration - Duration of the animation in milliseconds.
 * @param {boolean} active - Whether the animation should be active (e.g., when visible).
 */
export const useCountUp = (target, duration = 2000, active = true) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [target, duration, active]);

    return count;
};
