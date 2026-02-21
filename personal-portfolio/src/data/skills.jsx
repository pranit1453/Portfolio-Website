import React from 'react';
import { FaJs, FaJava, FaGitAlt, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaAws, FaPython, FaBrain, FaCube, FaCode, FaGithub } from 'react-icons/fa';
import { SiCplusplus, SiSpring, SiSpringboot, SiHibernate, SiMysql, SiPostgresql, SiMongodb, SiTailwindcss, SiPostman, SiIntellijidea } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export const skillsData = {
    technologies: [
        { name: 'Java', level: 'Intermediate', icon: <FaJava className="text-red-500 text-5xl mb-2" /> },
        { name: 'JavaScript', level: 'Basic', icon: <FaJs className="text-yellow-400 text-5xl mb-2" /> },
        { name: 'C/C++', level: 'Basic', icon: <SiCplusplus className="text-blue-600 text-5xl mb-2" /> },
    ],
    frameworksAndBackend: [
        { name: 'Spring Boot', level: 'Intermediate', icon: <SiSpringboot className="text-green-500 text-5xl mb-2" /> },
        { name: 'Spring', level: 'Intermediate', icon: <SiSpring className="text-green-500 text-5xl mb-2" /> },
        { name: 'Hibernate', level: 'Basic', icon: <SiHibernate className="text-gray-400 text-5xl mb-2" /> },
    ],
    webTechnologies: [
        { name: 'React', level: 'Intermediate', icon: <FaReact className="text-cyan-400 text-5xl mb-2" /> },
    ],
    databases: [
        { name: 'MySQL', level: 'Intermediate', icon: <SiMysql className="text-blue-500 text-5xl mb-2" /> },
        { name: 'PostgreSQL', level: 'Basic', icon: <SiPostgresql className="text-blue-400 text-5xl mb-2" /> },
    ],
    coreConcepts: [
        { name: 'Data Structure', level: 'Basic', image: '/hierarchy-structure.png' },
        { name: 'Algorithms', level: 'Basic', icon: <FaBrain className="text-purple-500 text-5xl mb-2" /> },
        { name: 'OOPs', level: 'Intermediate', icon: <FaCube className="text-yellow-600 text-5xl mb-2" /> },
    ],
    deploymentTools: [
        { name: 'Docker', level: 'Basic', icon: <FaDocker className="text-blue-500 text-5xl mb-2" /> },
        { name: 'AWS', level: 'Basic', icon: <FaAws className="text-orange-400 text-5xl mb-2" /> },
        { name: 'GitHub', level: 'Basic', icon: <FaGithub className="text-black text-5xl mb-2" /> },
    ],
    developerTools: [
        { name: 'Git', level: 'Intermediate', icon: <FaGitAlt className="text-red-500 text-5xl mb-2" /> },
        { name: 'Postman', level: 'Intermediate', icon: <SiPostman className="text-orange-600 text-5xl mb-2" /> },
        { name: 'IntelliJ IDEA', level: 'Intermediate', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Icon.svg' },
        { name: 'VS Code', level: 'Advanced', icon: <VscVscode className="text-blue-500 text-5xl mb-2" /> },
    ],
};
