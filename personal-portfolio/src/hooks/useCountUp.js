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
            setTimeout(() => setCount(0), 0);
            return;
        }

        if (target === 0 || duration === 0) {
            setTimeout(() => setCount(target), 0);
            return;
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            if (progress < 1) {
                setCount(Math.floor(progress * target));
                window.requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        window.requestAnimationFrame(step);
    }, [target, duration, active]);

    return count;
};
