import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { projectsData } from '../data/projects';
import { cardVariants } from '../constants/animations';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = useMemo(() => projectsData.find(p => p.id === parseInt(id, 10)), [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl font-bold text-text mb-4">Project Not Found</h2>
                <Link to="/#portfolio" className="text-primary hover:underline">
                    &larr; Back to Portfolio
                </Link>
            </div>
        );
    }

    // Function to render assets if they exist
    const renderAssets = () => {
        if (!project.demoAssets) return null;

        return (
            <div className="mt-12 space-y-8">
                {project.demoAssets.video && (
                    <div className="glass-panel p-2 overflow-hidden">
                        <video
                            src={project.demoAssets.video}
                            controls
                            className="w-full h-auto rounded-xl shadow-lg border border-glass-border"
                            style={{ maxHeight: '70vh' }}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Demo Video</p>
                    </div>
                )}

                {project.demoAssets.document && (
                    <div className="glass-panel p-2 overflow-hidden h-[80vh] min-h-[600px] flex flex-col">
                        <div className="flex-grow rounded-xl overflow-hidden border border-glass-border relative">
                            <iframe
                                src={`${project.demoAssets.document}#toolbar=0`}
                                title="Project Document"
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Documentation (PDF)</p>
                    </div>
                )}

                {project.demoAssets.image && (
                    <div className="glass-panel p-2 overflow-hidden">
                        <img
                            src={project.demoAssets.image}
                            alt={`${project.title} screenshot`}
                            className="w-full h-auto rounded-xl shadow-lg border border-glass-border object-contain"
                            style={{ maxHeight: '70vh' }}
                        />
                        <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Architecture / Screenshot</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <motion.article
            className="container mx-auto px-6 max-w-5xl py-24"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            <Link to="/#portfolio" className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest mb-10 hover:opacity-80 transition-opacity group">
                <span className="mr-2 transform transition-transform group-hover:-translate-x-1">&larr;</span> Back to Portfolio
            </Link>

            <header className="mb-10 text-center md:text-left">
                <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-primary/20">
                    {project.category}
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text to-primary mb-6 leading-tight pb-2">
                    {project.title}
                </h1>

                <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                    {project.description}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-glass-border pt-10">
                {/* Features */}
                {project.features && project.features.length > 0 && (
                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold text-text mb-6">Key Features</h3>
                        <ul className="space-y-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </span>
                                    <span className="text-muted leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Tech Stack & Links */}
                <div className="flex flex-col gap-8">
                    <div className="glass-card p-8 flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-text mb-6">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/5 text-text text-sm font-medium rounded-lg border border-glass-border hover:border-primary/50 transition-colors shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* View Web Application Link */}
                        {!!project.demoLink && (
                            <div className="mt-auto pt-6 border-t border-glass-border">
                                <a
                                    href={project.demoLink || '#'}
                                    target={project.demoLink && project.demoLink !== '#' ? "_blank" : undefined}
                                    rel={project.demoLink && project.demoLink !== '#' ? "noopener noreferrer" : undefined}
                                    onClick={(e) => {
                                        if (!project.demoLink || project.demoLink === '#') {
                                            e.preventDefault();
                                            toast.info("Live link will be available soon!", {
                                                position: "bottom-center",
                                                theme: "dark",
                                            });
                                        }
                                    }}
                                    className="w-full inline-flex justify-center items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 group"
                                >
                                    View Web Application
                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Render any associated media assets */}
            {renderAssets()}

        </motion.article>
    );
};

export default ProjectDetailsPage;
