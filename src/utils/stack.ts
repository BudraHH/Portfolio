export interface TechItem {
    name: string;
    category: string;
    icon?: string;
    detail: string;
}

export const STACK_DATA = [
    {
        category: "Language Layer",
        items: [
            { name: "Python", detail: "Primary logic & AI automation" },
            { name: "JavaScript / TypeScript", detail: "Fullstack behavior & ES6+" },
            { name: "Java", detail: "Enterprise scale systems" },
            { name: "SQL", detail: "Relational data modeling" },
        ]
    },
    {
        category: "System Architecture",
        items: [
            { name: "FastAPI / Node", detail: "High-performance API engines" },
            { name: "Django / Express", detail: "Robust web framework logic" },
            { name: "Redis / Celery", detail: "Caching & Distributed tasks" },
            { name: "Sytem Design", detail: "Scalable architecture patterns" },
        ]
    },
    {
        category: "Persistence & Cloud",
        items: [
            { name: "PostgreSQL", detail: "Relational data vault" },
            { name: "MongoDB", detail: "Document / NoSQL storage" },
            { name: "AWS S3 / Lambda", detail: "Cloud compute & Assets" },
            { name: "Docker", detail: "Containerized deployment" },
        ]
    },
    {
        category: "Interactive Layer",
        items: [
            { name: "React.js / React.ts", detail: "Production interface logic" },
            { name: "Tailwind CSS", detail: "Utility-first design systems" },
            { name: "State_MGMT", detail: "Dynamic client-side logic" },
            { name: "Design Eng", detail: "Modular & Responsive systems" },
        ]
    },
    {
        category: "Intelligence Strata",
        items: [
            { name: "Pandas / NumPy", detail: "Data manipulation & Math" },
            { name: "Scikit-Learn", detail: "Machine learning models" },
            { name: "Matplotlib", detail: "Statistical visualization" },
            { name: "AI Automation", detail: "Agentic & LLM logic" },
        ]
    }
];
