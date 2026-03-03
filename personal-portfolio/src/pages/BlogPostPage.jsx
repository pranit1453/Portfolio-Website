import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { blogData } from '../data/blog';
import { cardVariants } from '../constants/animations';

const BlogPostPage = () => {
    const { id } = useParams();
    const post = useMemo(() => blogData.find(p => p.id === parseInt(id, 10)), [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl font-bold text-text mb-4">Post Not Found</h2>
                <Link to="/#blog" className="text-primary hover:underline">
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
            <Link to="/#blog" className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest mb-10 hover:opacity-80 transition-opacity">
                <span className="mr-2 transform transition-transform group-hover:-translate-x-1">&larr;</span> Back to Portfolio
            </Link>

            <header className="mb-12 border-b border-glass-border pb-10">
                <div className="flex items-center mb-6 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    <span>{post.date}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            <div className="prose prose-lg prose-slate max-w-none text-muted leading-relaxed prose-headings:text-text prose-headings:font-bold prose-strong:text-text prose-a:text-primary prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </motion.article>
    );
};

export default BlogPostPage;
