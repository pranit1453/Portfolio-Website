import { useState, useEffect, useCallback, useMemo } from 'react';

export const useCarousel = (items) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Update items per page based on window size
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Pagination logic
    const paginate = useCallback((newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const nextIndex = prev + newDirection;
            if (nextIndex < 0) return items.length - 1;
            if (nextIndex >= items.length) return 0;
            return nextIndex;
        });
    }, [items.length]);

    // Handle direct dot navigation
    const navigateTo = useCallback((index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    // Dynamic Circular Slicing
    const visibleItems = useMemo(() => {
        const visible = [];
        for (let i = 0; i < itemsPerPage; i++) {
            visible.push(items[(currentIndex + i) % items.length]);
        }
        return visible;
    }, [currentIndex, itemsPerPage, items]);

    return {
        currentIndex,
        direction,
        itemsPerPage,
        visibleItems,
        paginate,
        navigateTo
    };
};
