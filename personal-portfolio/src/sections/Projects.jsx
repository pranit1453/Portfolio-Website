import React, { useCallback } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { useCarousel } from '../hooks/useCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { projectsData } from '../data/projects';
import ScrollReveal from '../components/common/ScrollReveal';
import { slideVariants } from '../constants/animations';
import SectionHeader from '../components/common/SectionHeader';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
    const projects = projectsData;
    const navigate = useNavigate();

    // Delegate presentation logic (pagination, state, slicing) to custom hook
    const {
        currentIndex,
        direction,
        visibleItems: visibleProjects,
        paginate,
        navigateTo
    } = useCarousel(projects);

    const handleOpenAsset = useCallback((e, project) => {
        e.preventDefault();
        // Always navigate to the detailed project view instead of opening assets in a new tab
        navigate(`/project/${project.id}`);
    }, [navigate]);

    return (
        <SectionWrapper id="portfolio">
            <ScrollReveal className="container mx-auto px-6 max-w-6xl relative">
                {/* Header */}
                <SectionHeader title="Projects" subtitle="Most recent Work" />

                <div className="relative group/carousel">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-2 text-text/60 hover:text-primary transition-all duration-300 md:opacity-40 group-hover/carousel:opacity-100 hidden md:block"
                        aria-label="Previous project"
                    >
                        <BiChevronLeft size={48} />
                    </button>

                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-2 text-text/60 hover:text-primary transition-all duration-300 md:opacity-40 group-hover/carousel:opacity-100 hidden md:block"
                        aria-label="Next project"
                    >
                        <BiChevronRight size={48} />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden min-h-[500px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                            >
                                {visibleProjects.map((project, idx) => (
                                    <ProjectCard
                                        key={`${currentIndex}-${idx}`} /* Unique key for animation */
                                        project={project}
                                        isActive={currentIndex === idx}
                                        onClick={handleOpenAsset}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-3 mt-12">
                    {projects.map((_, index) => {
                        const isActive = currentIndex === index;
                        return (
                            <button
                                key={index}
                                onClick={() => navigateTo(index)}
                                className="relative py-2 px-1 focus:outline-none group/dot"
                                aria-label={`Go to project ${index + 1}`}
                            >
                                <motion.div
                                    animate={{
                                        width: isActive ? 40 : 10,
                                        backgroundColor: isActive ? "var(--primary)" : "rgba(255, 255, 255, 0.4)",
                                        boxShadow: isActive ? "0 0 20px rgba(var(--primary-rgb), 0.4)" : "none"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="h-2.5 rounded-full"
                                />
                            </button>
                        );
                    })}
                </div>
            </ScrollReveal>
        </SectionWrapper>
    );
};

export default Projects;
