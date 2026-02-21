import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, className = '' }) => {
    return (
        <section id={id} className={`py-24 container mx-auto px-4 ${className}`}>
            <motion.div
                className="glass-panel p-8 md:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Optional: Add decorative subtle gradient orb inside */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
