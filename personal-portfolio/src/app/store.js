import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import navReducer from '../features/nav/navSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        nav: navReducer,
    },
});
