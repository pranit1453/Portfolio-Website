import React, { useEffect, useRef } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import Typed from 'typed.js';

const Home = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Java Developer', 'Problem Solver', 'Tech Enthusiast'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <SectionWrapper id="home" className="min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-text">
                    Hi, I'm <span className="text-primary">Pranit</span>
                </h1>
                <h3 className="text-2xl md:text-3xl text-muted mb-12">
                    <span ref={el} className="text-primary border-r-2 border-primary pr-1"></span>
                </h3>

                {/* About Section matching screenshot */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
                    <div className="md:w-1/2 text-left space-y-4">
                        <h2 className="text-3xl font-bold text-text mb-6">About</h2>
                        <p className="text-lg text-muted leading-relaxed">
I am a passionate backend developer exploring Java, Spring Boot, and RESTful APIs, with a strong focus on writing clean, maintainable, and scalable code. I continuously strengthen my problem-solving skills through Data Structures and Algorithms to build efficient backend logic. While developing applications, I follow SOLID principles and clean architecture practices to design structured and reliable systems. I am also exploring AI agents and modern backend technologies to stay aligned with evolving industry trends.                        </p>
                    </div>
                    {/* Placeholder for image - user can replace src */}
                    <div className="md:w-1/3">
                        <div className="relative w-64 h-64 mx-auto glass-card p-2 rounded-full overflow-hidden flex items-center justify-center animate-float">
                            {/* Use a technology image or placeholder */}
                            <img src="https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop" alt="Java Technology" className="w-full h-full object-cover rounded-full opacity-90" />
                            <div className="absolute inset-0 bg-primary/10 rounded-full mix-blend-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Home;
