import React, { Suspense } from 'react';
import Loader from '../components/common/Loader';
import Home from '../sections/Home';

// Lazy load below-the-fold sections for performance
const Contact = React.lazy(() => import('../sections/Contact'));
const Skills = React.lazy(() => import('../sections/Skills'));
const Projects = React.lazy(() => import('../sections/Projects'));
const Qualification = React.lazy(() => import('../sections/Qualification'));
const Experience = React.lazy(() => import('../sections/Experience'));
const CodingAchievements = React.lazy(() => import('../sections/CodingAchievements'));
const Blog = React.lazy(() => import('../sections/Blog'));

const Portfolio = () => {
    return (
        <>
            <Home />
            <Suspense fallback={<Loader />}>
                <Skills />
                <Projects />
                <Experience />
                <Qualification />
                <CodingAchievements />
                <Blog />
                <Contact />
            </Suspense>
        </>
    );
};

export default Portfolio;
