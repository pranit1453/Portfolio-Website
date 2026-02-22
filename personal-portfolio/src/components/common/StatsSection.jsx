import React, { useRef, useState, useEffect } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

const StatCard = ({ label, value, isActive, icon: Icon }) => {
    const count = useCountUp(value, 2000, isActive);

    return (
        <div className="glass-card p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:scale-105 hover:border-primary/40 group">
            {Icon && (
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {typeof Icon === 'string' ? (
                        <img src={Icon} alt={label} className="w-12 h-12 object-contain" />
                    ) : (
                        <Icon className="w-12 h-12" />
                    )}
                </div>
            )}
            <div className="flex flex-col items-center gap-1">
                <h2 className="text-gray-800 text-5xl font-bold transition-colors">
                    {count}
                </h2>
                <span className="text-xs md:text-sm font-bold text-muted uppercase tracking-[0.2em] text-center">
                    {label}
                </span>
            </div>
        </div>
    );
};

const StatsSection = ({ title, stats }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="w-full max-w-5xl mx-auto mt-16 mb-8 px-6">
            {title && (
                <h3 className="text-xl font-bold text-text mb-8 text-center md:text-left opacity-80 uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        isActive={isVisible}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default StatsSection;
