import { useState, useEffect } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { expertiseData } from '../data/expertise';
import {
    sectionVariants,
    slideVariants,
    cardVariants
} from '../constants/animations';

const Expertise = () => {
    const expertise = expertiseData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Responsive items per page logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
            } else {
                setItemsPerPage(2);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 4. Icon Micro-animation

    // 4. Icon Micro-animation
    const iconVariants = {
        hidden: { scale: 0, rotate: -20 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 12,
                delay: 0.2
            }
        },
        hover: {
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    // --- Logic ---

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const nextIndex = prev + newDirection;
            if (nextIndex < 0) return expertise.length - 1;
            if (nextIndex >= expertise.length) return 0;
            return nextIndex;
        });
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Dynamic Circular Slicing
    const visibleItems = [];
    for (let i = 0; i < itemsPerPage; i++) {
        visibleItems.push(expertise[(currentIndex + i) % expertise.length]);
    }

    return (
        <SectionWrapper id="expertise">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
                className="container mx-auto px-6 max-w-6xl relative"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-2 text-text">Expertise</h2>
                    <div className="text-muted">Fields I've worked in</div>
                </div>

                <div className="relative group/carousel">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-2 text-text/60 hover:text-primary transition-all duration-300 hidden md:block hover:scale-110 active:scale-95 opacity-40 hover:opacity-100"
                        aria-label="Previous expertise"
                    >
                        <BiChevronLeft size={64} />
                    </button>

                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-2 text-text/60 hover:text-primary transition-all duration-300 hidden md:block hover:scale-110 active:scale-95 opacity-40 hover:opacity-100"
                        aria-label="Next expertise"
                    >
                        <BiChevronRight size={64} />
                    </button>

                    {/* Carousel Content */}
                    <div className="overflow-hidden min-h-[400px] px-2">
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
                                {visibleItems.map((exp, idx) => (
                                    <motion.div
                                        key={`${currentIndex}-${idx}`} /* Dynamic key for smooth transitions */
                                        variants={cardVariants}
                                        whileHover="hover"
                                        initial="hidden"
                                        animate="visible"
                                        className="glass-card p-10 flex flex-col items-center text-center relative group/card min-h-[350px] justify-center transition-all duration-300 hover:shadow-glass-purple border border-white/5 hover:border-primary/20 rounded-[2.5rem]"
                                    >
                                        {/* Hover Lift & Glow Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"
                                            variants={{
                                                hover: { y: -8 }
                                            }}
                                        />

                                        <div className="relative z-10">
                                            {/* Icon with Pop & Hover Float */}
                                            <motion.div
                                                variants={iconVariants}
                                                className="mb-8 p-6 rounded-3xl bg-primary/5 text-primary shadow-lg shadow-primary/5 inline-block"
                                            >
                                                <exp.icon size={48} />
                                            </motion.div>

                                            {/* Text Content with Staggered Fade */}
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
                                                }}
                                            >
                                                <h3 className="text-2xl font-bold text-text mb-4 tracking-tight">{exp.title}</h3>
                                                <p className="text-muted leading-relaxed text-sm max-w-[280px] mx-auto opacity-80">
                                                    {exp.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Pagination Dots with Active Animation */}
                <div className="flex justify-center gap-3 mt-12">
                    {expertise.map((_, index) => {
                        const isActive = currentIndex === index;
                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="relative py-2 px-1 focus:outline-none group/dot"
                                aria-label={`Go to expertise field ${index + 1}`}
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
        </SectionWrapper>
    );
};

export default Expertise;
