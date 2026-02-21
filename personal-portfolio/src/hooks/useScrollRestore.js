import { useEffect } from 'react';


export const useScrollRestore = () => {
    // If using react-router, we can use useLocation. 
    // For a single page portfolio with sections, this might handle scroll-to-top on refresh or manual restoration.

    useEffect(() => {
        // Simple restore to top on refresh if desired, or handle hash links
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);
};
