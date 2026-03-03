import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { cardVariants, badgeVariants } from '../../constants/animations';

const ExperienceCard = ({ exp, onClick }) => {
    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            onClick={onClick}
            className="w-full glass-card p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer"
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
                            ul: ({ ...props }) => <ul className="space-y-3 list-none m-0 p-0" {...props} />,
                            li: ({ ...props }) => (
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

            {/* View Details Link */}
            <div className="mt-6 pt-4 flex justify-between items-center w-full border-t border-glass-border">
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:opacity-80 transition-opacity">
                    View Details
                    <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </span>
            </div>
        </motion.div>
    );
};

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;
