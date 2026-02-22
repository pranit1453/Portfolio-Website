import React from 'react';
import { motion } from 'framer-motion';

/**
 * TypewriterText Component
 * Animates text word-by-word to prevent layout shifting and word-breaking.
 * 
 * @param {string} text - The content to animate
 * @param {number} speed - Delay between words (stagger)
 * @param {boolean} showCursor - Whether to show the blinking cursor
 */
const TypewriterText = ({
    text,
    speed = 0.08, // Slightly slower for word-by-word transition
    showCursor = true,
    className = ""
}) => {
    // Split text by spaces to create words
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
                delayChildren: 0.3,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    return (
        <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-lg text-muted leading-relaxed whitespace-normal break-normal ${className}`}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]" // Use em for consistent word spacing
                >
                    {word}
                </motion.span>
            ))}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[1.5px] h-[1.1em] bg-primary/40 ml-0.5 align-middle"
                />
            )}
        </motion.p>
    );
};

export default TypewriterText;
