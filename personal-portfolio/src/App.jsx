import React, { Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import { useTheme } from './hooks/useTheme';
import { useScrollRestore } from './hooks/useScrollRestore';

// Lazy load sections for performance
const Home = React.lazy(() => import('./sections/Home'));
const Contact = React.lazy(() => import('./sections/Contact'));
const Skills = React.lazy(() => import('./sections/Skills'));
const Projects = React.lazy(() => import('./sections/Projects'));
const Qualification = React.lazy(() => import('./sections/Qualification'));
const Expertise = React.lazy(() => import('./sections/Expertise'));

function App() {
    useTheme(); // Initialize theme
    useScrollRestore(); // Handle scroll restoration

    return (
        <div className="bg-background min-h-screen flex flex-col font-sans text-text transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header */}
                <Suspense fallback={<Loader />}>
                    <Home />
                    <Skills />
                    <Qualification />
                    <Expertise />
                    <Projects />
                    <Contact />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}

export default App;
