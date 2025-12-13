import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws, FaFigma,
    FaVuejs, FaLinux, FaCodeBranch
} from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiRedux, SiGraphql } from 'react-icons/si';

// Note: dev-theme will likely use 'name' and ignore 'icon'
// normal-theme uses 'icon' for the 3D book

export const SKILL_CATEGORIES = [
    {
        id: "cover",
        type: "cover",
        title: "SYSTEM ARCHITECTURE",
        subtitle: "A Handbook of Competencies",
        bgGradient: "from-cyan-950 to-slate-950",
        skills: []
    },
    {
        id: "synopsis",
        type: "synopsis",
        title: "Synopsis",
        description: "This archive contains a comprehensive breakdown of the technical capabilities utilized to engineer scalable, high-performance digital solutions. Proceed to inspect individual modules.",
        bgGradient: "from-zinc-900 to-zinc-950",
        skills: []
    },
    {
        id: "frontend",
        type: "content",
        title: "Frontend Engineering",
        description: "Crafting fully responsive, interactive, and high-performance user interfaces.",
        bgGradient: "from-cyan-900/20 to-blue-900/20",
        skills: [
            { name: "React", icon: <FaReact />, category: "Frontend" },
            { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
            { name: "TypeScript", icon: <SiTypescript />, category: "Frontend" },
            { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Frontend" },
            { name: "Vue.js", icon: <FaVuejs />, category: "Frontend" },
            { name: "Redux", icon: <SiRedux />, category: "Frontend" },
            { name: "Framer Motion", icon: <span className="font-bold font-serif italic">f</span>, category: "Frontend" }
        ]
    },
    {
        id: "backend",
        type: "content",
        title: "Backend Architecture",
        description: "Building robust server-side systems, scalable APIs, and secure database architectures.",
        bgGradient: "from-purple-900/20 to-pink-900/20",
        skills: [
            { name: "Node.js", icon: <FaNodeJs />, category: "Backend" },
            { name: "Python", icon: <FaPython />, category: "Backend" },
            { name: "PostgreSQL", icon: <SiPostgresql />, category: "Backend" },
            { name: "MongoDB", icon: <SiMongodb />, category: "Backend" },
            { name: "GraphQL", icon: <SiGraphql />, category: "Backend" },
            { name: "API Design", icon: <FaCodeBranch />, category: "Backend" }
        ]
    },
    {
        id: "devops",
        type: "content",
        title: "DevOps & Cloud",
        description: "Streamlining deployment pipelines, containerization, and managing cloud infrastructure.",
        bgGradient: "from-emerald-900/20 to-teal-900/20",
        skills: [
            { name: "Docker", icon: <FaDocker />, category: "DevOps" },
            { name: "AWS", icon: <FaAws />, category: "DevOps" },
            { name: "Git", icon: <FaGitAlt />, category: "DevOps" },
            { name: "Linux", icon: <FaLinux />, category: "DevOps" },
            { name: "Figma", icon: <FaFigma />, category: "DevOps" },
            { name: "Firebase", icon: <SiFirebase />, category: "DevOps" }
        ]
    },
    {
        id: "back-cover",
        type: "back_cover",
        title: "END OF ARCHIVE",
        subtitle: "System Shutdown",
        bgGradient: "from-slate-950 to-cyan-950",
        skills: []
    }
];
