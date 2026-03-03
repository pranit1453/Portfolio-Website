import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

const AnimatedCounter = ({
    value,
    direction = "up",
    delay = 0,
    className = "",
    duration = 2000 // duration in ms
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    // The motion value that will actually animate
    const motionValue = useMotionValue(direction === "down" ? value : 0);

    // Smooth the motion value with a spring
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 20,
        mass: 1,
        restDelta: 0.5
    });

    useEffect(() => {
        if (inView) {
            // Wait for any specified stagger delay
            const timeout = setTimeout(() => {
                motionValue.set(direction === "down" ? 0 : value);
            }, delay * 1000); // convert delay to ms

            return () => clearTimeout(timeout);
        }
    }, [inView, value, direction, delay, motionValue]);

    useEffect(() => {
        // Update the DOM node directly when the spring value changes for maximum performance
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                // Formatting logically for whole numbers
                ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0));
            }
        });

        return () => unsubscribe();
    }, [springValue]);

    return (
        <motion.span ref={ref} className={className}>
            {/* Fallback starting value before JS kicks in */}
            {direction === "down" ? value : 0}
        </motion.span>
    );
};

export default AnimatedCounter;
