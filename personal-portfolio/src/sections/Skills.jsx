import React from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { skillsData } from '../data/skills';

// eslint-disable-next-line react/prop-types
const SkillCategory = ({ title, skills }) => (
    <div className="mb-10 text-center">
        <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-wide">
            {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {skills.map((skill) => (
                <div key={skill.name} className="p-4 glass-card flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
                    {skill.icon ? (
                        <div className="mb-2">{skill.icon}</div>
                    ) : (
                        <img src={skill.image} alt={skill.name} className="w-12 h-12 mb-2 object-contain" />
                    )}
                    <h4 className="text-sm font-bold text-text text-center">{skill.name}</h4>
                    <p className="text-xs text-muted">{skill.level}</p>
                </div>
            ))}
        </div>
    </div>
);

const Skills = () => {
    const categories = [
        {
            mainTitle: 'Core & Languages',
            items: [
                { title: 'Technologies', skills: skillsData.technologies },
                { title: 'Core Concepts', skills: skillsData.coreConcepts },
            ],
        },
        {
            mainTitle: 'Web & Frameworks',
            items: [
                { title: 'Frontend Technologies', skills: skillsData.webTechnologies },
                { title: 'Frameworks & Backend Technologies', skills: skillsData.frameworksAndBackend },
            ],
        },
        {
            mainTitle: 'Data & Tools',
            items: [
                { title: 'Databases', skills: skillsData.databases },
                { title: 'Deployment Tools', skills: skillsData.deploymentTools },
                { title: 'Developer Tools', skills: skillsData.developerTools },
            ],
        },
    ];

    return (
        <SectionWrapper id="skills">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-text">
                    Skills
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {categories.map((group, idx) => (
                        <div key={idx} className="space-y-8">
                            <h2 className="text-xl font-bold text-text border-b-2 border-primary/30 pb-2 mb-8 uppercase tracking-widest text-center">
                                {group.mainTitle}
                            </h2>
                            {group.items.map((cat, catIdx) => (
                                <SkillCategory key={catIdx} title={cat.title} skills={cat.skills} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Skills;
