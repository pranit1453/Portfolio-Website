import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export const useTypewriter = (strings, options = {}) => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings,
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
            ...options
        });

        return () => {
            typed.destroy();
        };
    }, [strings, options]);

    return el;
};
