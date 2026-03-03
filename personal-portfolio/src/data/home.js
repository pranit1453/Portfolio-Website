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
        text: 'Backend Developer specializing in Java and Spring Boot, with a strong focus on building scalable, secure, and production-ready RESTful APIs. I emphasize clean architecture, SOLID principles, and efficient system design to create maintainable backend solutions. Alongside core backend development, I am actively exploring AI agents and modern intelligent systems to build smarter, future-oriented applications.'
    },
    professionalStats: [
        { label: 'Completed Projects', value: 3, icon: FcApproval },
        { label: 'Industry Projects', value: 0, icon: FcCommandLine },
        { label: 'Companies Worked', value: 0, icon: FcBusiness },
    ],
    codingStats: codingAchievementsData.map(achievement => ({
        label: `${achievement.platform} Solved`,
        value: achievement.count,
        icon: achievement.icon,
        link: achievement.link
    }))
};
