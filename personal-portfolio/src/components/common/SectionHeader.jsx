import React from 'react';

const SectionHeader = ({ title, subtitle, className = "" }) => {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-text to-text/60 bg-clip-text text-transparent inline-block">
                {title}
            </h2>
            <div className="text-muted">{subtitle}</div>
        </div>
    );
};

export default React.memo(SectionHeader);
