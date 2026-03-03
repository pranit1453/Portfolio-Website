import javaFundamentals from './markdown/java-fundamentals.md?raw';
import reactPerformance from './markdown/react-performance.md?raw';
import cleanArchitecture from './markdown/clean-architecture.md?raw';

export const blogData = [
    {
        id: 1,
        title: "Java Fundamentals",
        excerpt: "A complete guide to Java fundamentals, Object-Oriented Programming concepts, and SOLID principles for writing clean and maintainable code.",
        date: "Sep 01, 2025",
        tags: ["Java", "OOP", "SOLID"],
        content: javaFundamentals,
        link: "#" // Replace with actual article/video link
    },
    {
        id: 2,
        title: "Optimizing React Application Performance",
        excerpt: "Learn how to significantly reduce re-renders and boost your React application's speed using memoization, lazy loading, and custom hooks.",
        date: "Nov 05, 2024",
        tags: ["React", "Performance", "Frontend"],
        content: reactPerformance,
        link: "#" // Replace with actual article/video link
    },
    {
        id: 3,
        title: "The Power of Clean Architecture in Backend Systems",
        excerpt: "Exploring the principles of Clean Architecture and how separating concerns leads to highly maintainable, testable, and robust enterprise applications.",
        date: "Dec 20, 2024",
        tags: ["Architecture", "System Design", "Backend"],
        content: cleanArchitecture,
        link: "#" // Replace with actual article/video link
    }
];
