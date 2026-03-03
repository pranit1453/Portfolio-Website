import React, { useCallback } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { useCarousel } from '../hooks/useCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { projectsData } from '../data/projects';
import ScrollReveal from '../components/common/ScrollReveal';
import {
    slideVariants,
    cardVariants,
    badgeVariants
} from '../constants/animations';
import SectionHeader from '../components/common/SectionHeader';

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
                                    <motion.div
                                        key={`${currentIndex}-${idx}`} /* Unique key for animation */
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            y: -8,
                                            scale: 1.02,
                                            transition: { type: "spring", stiffness: 400, damping: 10 }
                                        }}
                                        onClick={(e) => handleOpenAsset(e, project)}
                                        className="glass-card flex flex-col items-stretch overflow-hidden h-[450px] transition-shadow duration-300 hover:shadow-glass-purple relative group cursor-pointer"
                                    >
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar relative z-10">
                                            <h4 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
                                                {project.category}
                                            </h4>
                                            <h3 className="text-2xl font-bold text-text mb-4">{project.title}</h3>
                                            <p className="text-muted text-sm leading-relaxed mb-6">
                                                {project.description}
                                            </p>

                                            {project.features && (
                                                <div className="mb-6">
                                                    <h5 className="text-xs font-bold text-text mb-3 uppercase tracking-tighter opacity-70">Key Features:</h5>
                                                    <ul className="space-y-2">
                                                        {project.features.map((feature, i) => (
                                                            <li key={i} className="text-xs text-muted flex items-start gap-2">
                                                                <span className="text-primary mt-1">•</span>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <motion.div
                                                className="flex flex-wrap gap-2 mb-4"
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: { transition: { staggerChildren: 0.05 } }
                                                }}
                                            >
                                                {project.techStack.map((tech, i) => (
                                                    <motion.span
                                                        key={i}
                                                        variants={badgeVariants}
                                                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </motion.div>

                                            {/* Read More Link (Similar to Blog) */}
                                            <div className="mt-8 pt-4 flex justify-between items-center w-full border-t border-glass-border">
                                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:opacity-80 transition-opacity">
                                                    View Details
                                                    <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>


                                    </motion.div>
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
