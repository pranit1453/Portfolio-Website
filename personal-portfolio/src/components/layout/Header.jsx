import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu, closeMobileMenu, selectIsMobileMenuOpen } from '../../features/nav/navSlice';
import { useOutsideAction } from '../../hooks/useOutsideAction';
import { navLinks } from '../../data/navigation';

const Header = () => {
    const dispatch = useDispatch();
    const isMobileOpen = useSelector(selectIsMobileMenuOpen);
    const [scroll, setScroll] = useState(false);
    const headerRef = useRef(null);

    // Custom hook to close navbar on outside click or scroll
    useOutsideAction(headerRef, isMobileOpen, () => {
        dispatch(closeMobileMenu());
    });

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className={`glass-nav transition-all duration-300 ${scroll ? 'py-3 px-8' : 'py-4 px-10'} flex items-center justify-between gap-8`}>
                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="text-muted hover:text-primary font-medium transition-colors text-sm tracking-wide"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Resume Links (Right Side for balance) */}
                <div className="hidden md:flex items-center gap-4 pl-4 border-l border-glass-border">
                    <a href="/Pranit Bhangale.pdf" target="_blank" className="text-muted hover:text-primary text-sm font-medium transition-colors">
                        View Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text p-2"
                    onClick={() => dispatch(toggleMobileMenu())}
                    aria-label="Toggle Menu"
                >
                    {isMobileOpen ? '✖️' : '☰'}
                </button>
            </nav>

            {/* Mobile Nav Overlay */}
            {isMobileOpen && (
                <div className="absolute top-full mt-4 w-[90%] glass-panel md:hidden p-6 flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg text-text hover:text-primary font-medium"
                            onClick={() => dispatch(toggleMobileMenu())}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
