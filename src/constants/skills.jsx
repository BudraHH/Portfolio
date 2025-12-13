import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws,
    FaHtml5, FaCss3Alt, FaLinux, FaCodeBranch
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiTailwindcss,
    SiMongodb, SiPostgresql, SiRedux
} from 'react-icons/si';

// Resume-aligned, portfolio-enhanced skill archive

export const SKILL_CATEGORIES = [
    {
        id: "cover",
        type: "cover",
        title: "ENGINEERING SKILLS",
        subtitle: "A Technical Reference",
        bgGradient: "from-cyan-950 to-slate-950",
        skills: []
    },
    {
        id: "synopsis",
        type: "synopsis",
        title: "Preface",
        description:
            "This section documents the core technologies and engineering practices I apply when building production-grade software. Each chapter reflects practical experience gained from real-world systems, with an emphasis on scalability, reliability, and maintainable design.",
        bgGradient: "from-zinc-900 to-zinc-950",
        skills: []
    },

    /* ================= FRONTEND ================= */
    {
        id: "frontend",
        type: "content",
        title: "Frontend Engineering",
        description:
            "Designing responsive, accessible, and high-performance user interfaces with a strong focus on component architecture and user experience.",
        bgGradient: "from-cyan-900/20 to-blue-900/20",
       skills: [
    { name: "React.js", icon: <FaReact />, category: "Frontend" },
    { name: "JavaScript (ES6+)", icon: <FaCodeBranch />, category: "Frontend" },
    { name: "HTML5", icon: <FaHtml5 />, category: "Frontend" },
    { name: "CSS3", icon: <FaCss3Alt />, category: "Frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Frontend" },
    { name: "Redux", icon: <SiRedux />, category: "Frontend" }
]

    },

    /* ================= BACKEND ================= */
    {
        id: "backend",
        type: "content",
        title: "Backend Architecture",
        description:
            "Building secure, scalable backend systems and APIs with a focus on performance, data integrity, and maintainability.",
        bgGradient: "from-purple-900/20 to-pink-900/20",
        skills: [
            { name: "Node.js", icon: <FaNodeJs />, category: "Backend" },
            { name: "Python", icon: <FaPython />, category: "Backend" },
            { name: "FastAPI", icon: <FaCodeBranch />, category: "Backend" },
            { name: "Django REST", icon: <FaCodeBranch />, category: "Backend" },
            { name: "REST API Design", icon: <FaCodeBranch />, category: "Backend" },
            { name: "System Debugging", icon: <FaCodeBranch />, category: "Backend" }
        ]
    },

    /* ================= DATABASES ================= */
    {
        id: "databases",
        type: "content",
        title: "Data & Persistence",
        description:
            "Designing efficient data models and optimizing queries to support high-throughput, low-latency systems.",
        bgGradient: "from-amber-900/20 to-orange-900/20",
        skills: [
            { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database" },
            { name: "MongoDB", icon: <SiMongodb />, category: "Database" },
            { name: "Redis", icon: <FaCodeBranch />, category: "Database" },
            { name: "SQL Optimization", icon: <FaCodeBranch />, category: "Database" }
        ]
    },

    /* ================= DEVOPS ================= */
    {
        id: "devops",
        type: "content",
        title: "DevOps & Cloud",
        description:
            "Streamlining development workflows, containerized deployments, and cloud-based execution environments.",
        bgGradient: "from-emerald-900/20 to-teal-900/20",
        skills: [
            { name: "Docker", icon: <FaDocker />, category: "DevOps" },
            { name: "AWS Lambda", icon: <FaAws />, category: "DevOps" },
            { name: "Git & GitHub", icon: <FaGitAlt />, category: "DevOps" },
            { name: "GitHub Actions", icon: <FaCodeBranch />, category: "DevOps" },
            { name: "Linux", icon: <FaLinux />, category: "DevOps" }
        ]
    },
    {
        id: "synopsis",
        type: "synopsis",
        title: "Preface",
        description:
            "This section documents the core technologies and engineering practices I apply when building production-grade software. Each chapter reflects practical experience gained from real-world systems, with an emphasis on scalability, reliability, and maintainable design.",
        bgGradient: "from-zinc-900 to-zinc-950",
        skills: []
    }

];
