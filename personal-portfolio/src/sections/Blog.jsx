import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SectionWrapper from '../components/common/SectionWrapper';
import ScrollReveal from '../components/common/ScrollReveal';
import { blogData } from '../data/blog';
import SectionHeader from '../components/common/SectionHeader';
import BlogCard from '../components/blog/BlogCard';

const Blog = () => {
    const navigate = useNavigate();

    const handleReadArticle = useCallback((e, post) => {
        e.preventDefault();
        if (post.content) {
            navigate(`/blog/${post.id}`);
        } else if (post.link && post.link !== '#') {
            window.open(post.link, '_blank');
        } else {
            toast.info("This article will be available soon!", {
                position: "bottom-center",
                theme: "dark",
            });
        }
    }, [navigate]);

    return (
        <SectionWrapper id="blog">
            <ScrollReveal className="container mx-auto px-6 max-w-6xl relative">
                <SectionHeader title="Blog" subtitle="Latest Articles & Technical Writing" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12 items-start">
                    {blogData.map((post) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            onClick={handleReadArticle}
                        />
                    ))}
                </div>
            </ScrollReveal>
        </SectionWrapper>
    );
};

export default Blog;
