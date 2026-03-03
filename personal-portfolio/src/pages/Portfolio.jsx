import React, { Suspense } from 'react';
import Loader from '../components/common/Loader';

// Lazy load sections for performance
const Home = React.lazy(() => import('../sections/Home'));
const Contact = React.lazy(() => import('../sections/Contact'));
const Skills = React.lazy(() => import('../sections/Skills'));
const Projects = React.lazy(() => import('../sections/Projects'));
const Qualification = React.lazy(() => import('../sections/Qualification'));
const Experience = React.lazy(() => import('../sections/Experience'));
const CodingAchievements = React.lazy(() => import('../sections/CodingAchievements'));
const Blog = React.lazy(() => import('../sections/Blog'));

const Portfolio = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Home />
            <Skills />
            <Projects />
            <Experience />
            <Qualification />
            <CodingAchievements />
            <Blog />
            <Contact />
        </Suspense>
    );
};

export default Portfolio;
