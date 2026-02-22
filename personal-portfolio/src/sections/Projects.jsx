import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { projectsData } from '../data/projects';
import MediaModal from '../components/common/MediaModal';
import {
    sectionVariants,
    slideVariants,
    cardVariants,
    badgeVariants
} from '../constants/animations';

const Projects = () => {
    const projects = projectsData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Update items per page based on window size
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Logic ---

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const nextIndex = prev + newDirection;
            if (nextIndex < 0) return projects.length - 1;
            if (nextIndex >= projects.length) return 0;
            return nextIndex;
        });
    };

    const handleOpenModal = (e, project) => {
        e.preventDefault();
        setActiveProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedAsset(null);
            setActiveProject(null);
        }, 300);
    };

    // Dynamic Circular Slicing
    const visibleProjects = [];
    for (let i = 0; i < itemsPerPage; i++) {
        visibleProjects.push(projects[(currentIndex + i) % projects.length]);
    }

    return (
        <SectionWrapper id="portfolio">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
                className="container mx-auto px-6 max-w-6xl relative"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-2 text-text">Projects</h2>
                    <div className="text-muted">Most recent Work</div>
                </div>

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
                                        className="glass-card flex flex-col items-stretch overflow-hidden h-[450px] transition-shadow duration-300 hover:shadow-glass-purple relative group"
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
                                        </div>

                                        {/* Footer / Demo Button */}
                                        <div className="px-8 py-5 border-t border-glass-border bg-white/5 backdrop-blur-sm relative z-10">
                                            <motion.button
                                                onClick={(e) => project.demoAssets ? handleOpenModal(e, project) : window.open(project.demoLink, '_blank')}
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center gap-2 text-sm text-text font-bold hover:text-primary transition-colors group/link"
                                            >
                                                View demo <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                                            </motion.button>
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
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
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
            </motion.div>

            <MediaModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                asset={selectedAsset}
                availableAssets={activeProject?.demoAssets}
                onSelectAsset={(type, src, title) => type ? setSelectedAsset({ type, src, title }) : setSelectedAsset(null)}
            />
        </SectionWrapper>
    );
};

export default Projects;
