import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { cardVariants } from '../constants/animations';

const ExperienceDetailsPage = () => {
    const { id } = useParams();
    const experience = useMemo(() => experienceData.find(e => e.id === parseInt(id, 10)), [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!experience) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl font-bold text-text mb-4">Experience Not Found</h2>
                <Link to="/#experience" className="text-primary hover:underline">
                    &larr; Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <motion.article
            className="container mx-auto px-6 max-w-4xl py-24"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            <Link to="/#experience" className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest mb-10 hover:opacity-80 transition-opacity">
                <span className="mr-2 transform transition-transform group-hover:-translate-x-1">&larr;</span> Back to Portfolio
            </Link>

            <header className="mb-12 border-b border-glass-border pb-10">
                <div className="flex items-center mb-6 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    <span>{experience.period}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
                    {experience.company}
                </h1>

                <h2 className="text-2xl font-semibold text-text/80 mb-6">
                    {experience.role}
                </h2>

                <div className="flex flex-wrap gap-3">
                    {experience.techStack.map((tech, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </header>

            <div className="prose prose-lg prose-slate max-w-none text-muted leading-relaxed prose-headings:text-text prose-headings:font-bold prose-strong:text-text prose-a:text-primary prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
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
                    {experience.description}
                </ReactMarkdown>
            </div>
        </motion.article>
    );
};

export default ExperienceDetailsPage;
