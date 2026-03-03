import React from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { skillsData } from '../data/skills';
import SectionHeader from '../components/common/SectionHeader';

// eslint-disable-next-line react/prop-types
const SkillCategory = React.memo(({ title, skills }) => (
    <div className="mb-8 sm:mb-10 text-center">
        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-primary uppercase tracking-wide">
            {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill) => (
                <div key={skill.name} className="p-3 sm:p-4 glass-card flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
                    {skill.icon ? (
                        <div className="mb-2">{skill.icon}</div>
                    ) : (
                        <img src={skill.image} alt={skill.name} className="w-10 h-10 sm:w-12 sm:h-12 mb-2 object-contain" />
                    )}
                    <h4 className="text-xs sm:text-sm font-bold text-text text-center">{skill.name}</h4>
                    <p className="text-[10px] sm:text-xs text-muted mt-1">{skill.level}</p>
                </div>
            ))}
        </div>
    </div>
));

const Skills = () => {
    const categories = [
        { title: 'Core Technologies', skills: skillsData.coreTechnologies },
        { title: 'Frontend', skills: skillsData.frontend },
        { title: 'Backend', skills: skillsData.backend },
        { title: 'Database', skills: skillsData.database },
        { title: 'DevOps', skills: skillsData.devops },
        { title: 'Tools', skills: skillsData.tools },
    ];

    return (
        <SectionWrapper id="skills">
            <div className="container mx-auto px-6">
                <SectionHeader title="Tech Stack" subtitle="Technical Proficiency" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                    {categories.map((cat, idx) => (
                        <SkillCategory key={idx} title={cat.title} skills={cat.skills} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Skills;
