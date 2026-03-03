import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import { useTheme } from './hooks/useTheme';
import { useScrollRestore } from './hooks/useScrollRestore';

// Lazy load pages
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const ProjectDetailsPage = React.lazy(() => import('./pages/ProjectDetailsPage'));
const ExperienceDetailsPage = React.lazy(() => import('./pages/ExperienceDetailsPage'));

function App() {
    useTheme(); // Initialize theme
    useScrollRestore(); // Handle scroll restoration

    return (
        <div className="bg-background min-h-screen flex flex-col font-sans text-text transition-colors duration-300">
            <ToastContainer />
            <Header />

            <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header */}
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Portfolio />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                        <Route path="/project/:id" element={<ProjectDetailsPage />} />
                        <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
                    </Routes>
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}

export default App;
