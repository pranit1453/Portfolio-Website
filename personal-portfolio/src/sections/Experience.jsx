import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/common/SectionWrapper';
import ScrollReveal from '../components/common/ScrollReveal';
import { cardVariants, badgeVariants } from '../constants/animations';
import { experienceData } from '../data/experience';
import SectionHeader from '../components/common/SectionHeader';

const Experience = () => {

    return (
        <SectionWrapper id="experience">
            <ScrollReveal className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <SectionHeader title="Experience" subtitle="My Professional Journey" />

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12">
                    {experienceData.map((exp) => (
                        <motion.div
                            key={exp.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="w-full glass-card p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 relative group flex flex-col justify-between"
                        >
                            {/* Hover lift & glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"
                                variants={{
                                    hover: { scale: 1.02 }
                                }}
                            />

                            <div className="relative z-10 flex-grow">
                                <div className="mb-4">
                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-1 xl:gap-4 mb-2">
                                        <h3 className="text-xl sm:text-2xl font-bold text-primary">{exp.company}</h3>
                                        <span className="text-primary/70 font-mono text-xs tracking-wider whitespace-nowrap">{exp.period}</span>
                                    </div>
                                    <span className="font-semibold text-text/90 block">{exp.role}</span>
                                </div>

                                <div className="mt-6 text-sm sm:text-base text-muted/90">
                                    <ReactMarkdown
                                        components={{
                                            ul: ({ node, ...props }) => <ul className="space-y-3 list-none m-0 p-0" {...props} />,
                                            li: ({ node, ...props }) => (
                                                <li className="flex items-start gap-3">
                                                    <span className="text-primary mt-1.5 text-[10px]">▹</span>
                                                    <span className="leading-relaxed">{props.children}</span>
                                                </li>
                                            )
                                        }}
                                    >
                                        {exp.description}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Tech Stack Pills at bottom */}
                            <div className="relative z-10 flex flex-wrap gap-2 pt-8 mt-auto">
                                {exp.techStack.map((tech, i) => (
                                    <motion.span
                                        key={i}
                                        variants={badgeVariants}
                                        className="px-4 py-1.5 bg-primary/15 text-primary rounded-full text-xs font-bold tracking-wide"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </ScrollReveal>
        </SectionWrapper>
    );
};

export default Experience;
