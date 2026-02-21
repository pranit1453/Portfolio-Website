import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return 'dark';
        }
    }

    return 'light'; // Default theme
};

const initialState = {
    value: getInitialTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === 'dark' ? 'light' : 'dark';
            localStorage.setItem('color-theme', state.value);
        },
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('color-theme', action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.value;

export default themeSlice.reducer;
