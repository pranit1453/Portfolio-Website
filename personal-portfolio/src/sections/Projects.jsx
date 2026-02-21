import { useState } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { projectsData } from '../data/projects';

const Projects = () => {
    const projects = projectsData;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <SectionWrapper id="portfolio">
            <div className="container mx-auto px-6 max-w-6xl relative">
                <h2 className="text-3xl font-bold text-center mb-2 text-text">Projects</h2>
                <div className="text-center text-muted mb-16">Most recent Work</div>

                <div className="relative group">
                    {/* Arrow Left */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 text-text hover:text-primary transition-colors"
                    >
                        <BiChevronLeft size={48} />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden px-4">
                        <div className="flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full"
                                >
                                    {/* Displaying 2 items at a time logic could be complex with just index. 
                                        For now, mirroring the image which seems to show 2 items.
                                        Let's show 2 items per view if possible, or 1 item for simplicity then expand.
                                        The user image shows 2 items. 
                                        To make it simple with the current array structure, let's just show 2 items starting from currentIndex.
                                    */}
                                    {[0, 1].map((offset) => {
                                        const itemIndex = (currentIndex + offset) % projects.length;
                                        const project = projects[itemIndex];
                                        return (
                                            <div key={`${currentIndex}-${offset}`} className="glass-card p-8 transition-all duration-300 group/card min-h-[350px] flex flex-col">
                                                <h4 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{project.category}</h4>
                                                <h3 className="text-2xl font-bold text-text mb-4">{project.title}</h3>
                                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.techStack.map((tech, i) => (
                                                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <a
                                                    href={project.demoLink}
                                                    className="inline-flex items-center gap-2 text-sm text-text font-bold hover:text-primary transition-colors group/link w-fit"
                                                >
                                                    View demo <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Arrow Right */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 text-text hover:text-primary transition-colors"
                    >
                        <BiChevronRight size={48} />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-text scale-110' : 'bg-muted/40 hover:bg-muted/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Projects;
