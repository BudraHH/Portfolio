import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// User info
export const user_name = "dev@budraPortfolio";

// Portfolio sections info
export const sections = [
    { name: "info", file: "info.jsx", size: "4096", date: "Jan 01 12:34" },
    { name: "skills", file: "skills.jsx", size: "3072", date: "Feb 14 08:22" },
    { name: "education", file: "education.jsx", size: "2560", date: "Mar 22 11:15" },
    { name: "projects", file: "projects.jsx", size: "8192", date: "Apr 18 14:20" },
    { name: "contact", file: "contact.jsx", size: "1024", date: "May 03 10:10" },
    { name: "resume", file: "resume.jsx", size: "5120", date: "Jun 05 09:00" },
];

// Projects list
export const projects = [
    {
        name: "Data Dashboard",
        description:
            "Built a live analytics dashboard using React and D3.js. Real-time updates and customizable views.",
        tech: ["React", "D3.js", "WebSocket"],
    },
    {
        name: "SaaS API Platform",
        description:
            "Designed REST APIs and microservices for a SaaS platform with 10K+ daily users.",
        tech: ["Node.js", "Express", "MongoDB"],
    },
    {
        name: "Collaboration Tool",
        description:
            "Created real-time collaboration features using Firebase and WebSocket.",
        tech: ["Firebase", "WebSocket", "React"],
    },
];

// About Me section content and contacts data
export const ABOUT_ME_HEADER = {
    title: "About Me",
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


import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

export const CAREER_JOURNEY = [
    {
        type: 'education',
        icon: FaGraduationCap,
        title: 'Bachelor of Technology in Computer Science',
        organization: 'Your University',
        location: 'City, Country',
        period: '2018 - 2022',
        description: [
            'Graduated with First Class Honors',
            'Specialized in Web Development and Machine Learning',
            'Led university coding club with 100+ members',
            'Published research paper on AI applications'
        ]
    },
    {
        type: 'work',
        icon: FaBriefcase,
        title: 'Software Development Intern',
        organization: 'Tech Company XYZ',
        location: 'Remote',
        period: 'Jun 2021 - Aug 2021',
        description: [
            'Developed REST APIs using Node.js and Express',
            'Implemented responsive UI components with React',
            'Collaborated with senior developers on production features',
            'Reduced page load time by 40% through optimization'
        ]
    },
    {
        type: 'work',
        icon: FaBriefcase,
        title: 'Junior Full Stack Developer',
        organization: 'Startup ABC',
        location: 'City, Country',
        period: 'Jan 2022 - Present',
        description: [
            'Built scalable web applications using MERN stack',
            'Designed and implemented RESTful APIs',
            'Mentored 2 junior developers',
            'Improved code quality through code reviews and testing'
        ]
    }
];
