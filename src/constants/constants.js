import {FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt} from "react-icons/fa";

export const ABOUT_ME_HEADER = {
    title: "Info Me",
    subtitle: "Full-Stack Developer · Problem Solver",
    bioParagraphs: [
        `I am a passionate software developer dedicated to building scalable and elegant web applications.
         With expertise in React, Node.js, and robust backend systems, I focus on delivering high-quality user experiences and efficient solutions.`,
        `My journey has also led me to explore machine learning concepts and data visualization projects.
         I thrive on learning new technologies and solving complex problems with clean, maintainable code.`
    ],
    footerQuote: "Always eager to learn, collaborate, and contribute to exciting projects and open source"
};

export const CONTACTS = [
    { icon: FaEnvelope, text: 'hariharabudra@gmail.com', href: 'mailto:hariharabudra@gmail.com' },
    { icon: FaMapMarkerAlt, text: 'Chennai,Tamil Nadu', href: null },
    { icon: FaGithub, text: 'github.com/BudraHH', href: 'https://github.com/BudraHH' },
    { icon: FaLinkedin, text: 'linkedin.com/in/hari-hara-budra', href: 'https://linkedin.com/in/hari-hara-budra/' }
];