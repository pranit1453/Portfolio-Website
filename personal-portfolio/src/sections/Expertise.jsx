import { useState } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { expertiseData } from '../data/expertise';

const Expertise = () => {
    const expertise = expertiseData;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === expertise.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? expertise.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <SectionWrapper id="expertise">
            <div className="container mx-auto px-6 max-w-6xl relative">
                <h2 className="text-3xl font-bold text-center mb-2 text-text">Expertise</h2>
                <div className="text-center text-muted mb-16">Fields I've worked in</div>

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
                                    {[0, 1].map((offset) => {
                                        const itemIndex = (currentIndex + offset) % expertise.length;
                                        const exp = expertise[itemIndex];
                                        return (
                                            <div key={`${currentIndex}-${offset}`} className="glass-card p-10 flex flex-col items-center text-center group/card min-h-[320px] justify-center hover:-translate-y-2 transition-transform duration-300">
                                                <exp.icon className="text-primary text-5xl mb-6 transform group-hover/card:scale-110 transition-transform duration-300" />
                                                <h3 className="text-2xl font-bold text-text mb-4">{exp.title}</h3>
                                                <p className="text-muted leading-relaxed text-sm">
                                                    {exp.description}
                                                </p>
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
                    {expertise.map((_, index) => (
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

export default Expertise;
