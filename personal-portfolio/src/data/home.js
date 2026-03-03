import {
    FcApproval,
    FcCommandLine,
    FcBusiness
} from "react-icons/fc";
// Imports used in Home

import { codingAchievementsData } from "./achievements";

export const homeData = {
    typedStrings: [
        'Java',
        'Spring Boot Developer',
        'AI Application Builder',
        'Generative AI Explorer',
        'Backend Systems Engineer',
        'Problem Solver',
        'Tech Enthusiast'
    ],
    about: {
        title: 'About',
        text: 'Backend Developer specializing in Java and Spring Boot, building scalable, secure, and production-ready RESTful APIs. I apply Clean Architecture, SOLID principles, and strong system design to create efficient and maintainable backend solutions. I’m also exploring AI agents and intelligent systems to develop smarter, future-ready applications.'
    },
    professionalStats: [
        { label: 'Completed Projects', value: 3, icon: FcApproval },
        { label: 'Industry Projects', value: 0, icon: FcCommandLine },
        { label: 'Companies Worked', value: 1, icon: FcBusiness },
    ],
    codingStats: codingAchievementsData.map(achievement => ({
        label: `${achievement.platform} Solved`,
        value: achievement.count,
        icon: achievement.icon,
        link: achievement.link
    }))
};
