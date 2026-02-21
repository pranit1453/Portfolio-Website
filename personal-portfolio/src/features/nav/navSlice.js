import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobileMenuOpen: false,
    activeSection: 'home',
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
    },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveSection } = navSlice.actions;

export const selectIsMobileMenuOpen = (state) => state.nav.isMobileMenuOpen;
export const selectActiveSection = (state) => state.nav.activeSection;

export default navSlice.reducer;
