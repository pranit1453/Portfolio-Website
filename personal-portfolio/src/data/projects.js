export const projectsData = [
    {
        id: 1,
        title: "Portfolio Website",
        category: "Web Development",
        description: "A professional personal portfolio built with React and Tailwind CSS, featuring glassmorphism design and smooth animations.",
        techStack: ["React", "Tailwind CSS", "Framer Motion"],
        features: [
            "Glassmorphism UI Design",
            "Responsive across all devices",
            "Smooth Framer Motion animations",
            "Decoupled data architecture (SOLID)"
        ],
        // You can link your project assets here (must be placed in the public/ folder)

        demoLink: "#"
    },
    {
        id: 2,
        title: "Habit Tracker Website",
        category: "Full Stack Web Development",
        description: "A scalable full-stack Habit Tracker application built with Spring Boot, Hibernate, and React, enabling users to build and maintain productive daily habits with real-time progress tracking and secure authentication.",
        techStack: ["React", "Spring Boot", "Hibernate (JPA)", "MySQL", "JWT Authentication"],
        features: [
            "User Authentication & Authorization (JWT-based)",
            "Create, Update, Delete Daily/Weekly Habits",
            "Real-time Habit Progress Tracking",
            "RESTful APIs with layered architecture (Controller-Service-Repository)",
            "Secure role-based access control",
            "Responsive UI with modern dashboard design"
        ],
        // Add your assets for this project here

        demoLink: "#"
    },
    {
        id: 3,
        title: "IoT-Based Smart Floor Cleaning Robot",
        category: "IoT",
        description: "Developed an IoT-based smart floor cleaning robot using ESP32 microcontroller and ultrasonic sensors for real-time obstacle detection and navigation. Integrated ESP32-CAM module for live video streaming and remote monitoring. Implemented mobile-based control using Blynk application, enabling wireless operation and real-time device management.",
        techStack: ["ESP32", "ESP32-CAM", "Ultrasonic Sensor", "Motor Driver", "Blynk"],
        features: [
            "Real-time obstacle detection using ultrasonic sensor",
            "Live video streaming via ESP32-CAM",
            "Wireless control using Blynk IoT platform",
            "Autonomous navigation with motor driver integration",
            "WiFi-based communication system"
        ],
        demoAssets: {
            video: "/SFCB.mp4",
            document: "/SFCB.pdf",
            image: "/SFCB.jpeg"
        }
    }
];
