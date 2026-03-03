import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../components/common/SectionWrapper';
import ScrollReveal from '../components/common/ScrollReveal';
import { experienceData } from '../data/experience';
import SectionHeader from '../components/common/SectionHeader';
import ExperienceCard from '../components/experience/ExperienceCard';

const Experience = () => {
    const navigate = useNavigate();

    return (
        <SectionWrapper id="experience">
            <ScrollReveal className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <SectionHeader title="Experience" subtitle="My Professional Journey" />

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12">
                    {experienceData.map((exp) => (
                        <ExperienceCard
                            key={exp.id}
                            exp={exp}
                            onClick={() => navigate(`/experience/${exp.id}`)}
                        />
                    ))}
                </div>
            </ScrollReveal>
        </SectionWrapper>
    );
};

export default Experience;
