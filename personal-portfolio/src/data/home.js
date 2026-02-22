import {
    FcApproval,
    FcCommandLine,
    FcBusiness
} from "react-icons/fc";
import leetcodeIcon from "../assets/icons/leetcode.png";
import hackerrankIcon from "../assets/icons/hackerrank.png";
import gfgIcon from "../assets/icons/gfg.png";

export const homeData = {
    typedStrings: ['Java Developer', 'Problem Solver', 'Tech Enthusiast'],
    about: {
        title: 'About',
        text: 'I am a passionate backend developer specializing in Java and Spring Boot, with strong expertise in building scalable RESTful APIs. I focus on writing clean, maintainable, and production-ready code following SOLID principles and clean architecture. I continuously sharpen my problem-solving skills through Data Structures and Algorithms to design efficient backend systems. Currently, I am also exploring AI agents and modern backend technologies to stay aligned with evolving industry trends.'
    },
    professionalStats: [
        { label: 'Completed Projects', value: 3, icon: FcApproval },
        { label: 'Industry Projects', value: 0, icon: FcCommandLine },
        { label: 'Companies Worked', value: 0, icon: FcBusiness },
    ],
    codingStats: [
        { label: 'LeetCode Solved', value: 20, icon: leetcodeIcon },
        { label: 'HackerRank Solved', value: 20, icon: hackerrankIcon },
        { label: 'GFG Solved', value: 20, icon: gfgIcon },
    ]
};
