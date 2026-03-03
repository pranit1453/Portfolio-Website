import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../constants/animations';
import PropTypes from 'prop-types';

/**
 * ScrollReveal HOC abstracts away Framer Motion dependency from 
 * standard presentation components, enforcing the Dependency Inversion Principle.
 */
const ScrollReveal = React.memo(({ children, className = "", delay = 0 }) => {
    // If a delay is needed at the section level, we can inject it via custom variants
    const customVariants = delay ? {
        ...sectionVariants,
        visible: {
            ...sectionVariants.visible,
            transition: { ...sectionVariants.visible.transition, delay }
        }
    } : sectionVariants;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={customVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
});

ScrollReveal.displayName = 'ScrollReveal';

ScrollReveal.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delay: PropTypes.number
};

export default ScrollReveal;
