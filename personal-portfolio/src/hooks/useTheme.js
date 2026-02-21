import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/themeSlice';

export const useTheme = () => {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);

    }, [theme]);

    return theme;
};
