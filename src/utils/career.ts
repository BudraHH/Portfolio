export interface Experience {
    id: string;
    company: string;
    location: string;
    role: string;
    period: string;
    description: string[];
    technologies: string[];
    summary: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    specialization: string;
    location: string;
    period: string;
    score: string;
    details: string[];
    summary: string;
}
export const CAREER_DATA: Experience[] = [
    {
        id: "systitsoft-2025",
        company: "Syst It Soft Solutions",
        location: "Coimbatore, TN",
        role: "Software Developer Intern",
        period: "JUL 2025 — DEC 2025",
        description: [
            "Engineered core full-stack interfaces using React and FastAPI, implementing state-optimization protocols that resulted in a 30% increase in application throughput.",
            "Replaced legacy logic with high-efficiency engines, transforming standard data views into production-grade industrial dashboards with reactive state management.",
            "Standardized Git workflows and CI/CD protocols across the development cycle, securing the release pipeline for rapid deployment without compromising system stability."
        ],
        technologies: ["React.js", "JavaScript", "FastAPI", "Python", "Git"],
        summary: "Architected reliability into the system core, achieving a 30% boost in overall throughput during this deployment phase."
    },
    {
        id: "zoho-2025",
        company: "Zoho Corporation ",
        location: "Chennai, TN",
        role: "Software Developer Intern",
        period: "APR 2025 — JUN 2025",
        description: [
            "Developed robust Java backend layers for PostgreSQL clusters, eliminating manual data-entry failures through automated error-suppression protocols.",
            "Optimized relational protocols and transaction logic for high-load modules, successfully reducing query latency by 40% across distributed services.",
            "Identified and resolved critical architectural bottlenecks in multi-tier environments, ensuring absolute data consistency during high-concurrency windows."
        ],
        technologies: ["Java", "PostgreSQL", "OOP", "Database Design", "Documentation"],
        summary: "Focused on error-suppression and latency reduction—successfully slashing query times by 40% for high-load modules."
    }
];

export const EDUCATION_DATA: Education[] = [
    {
        id: "rathinam-btech",
        institution: "Rathinam Technical Campus",
        degree: "Bachelor of Technology in",
        specialization: "Artificial Intelligence & Data Science",
        location: "Coimbatore, India",
        period: "2021 — 2025",
        score: "7.87 CGPA",
       details: [
    "Specialized in Neural Architectures, bridging NLP and Computer Vision heuristics with distributed system design and algorithmic theory.",
    "Proven capability to execute under high-pressure scenarios, securing a Runner-up finish at PSG iTech Hackfest and a Global Top 15 ranking in the Volkswagen iMobilithon."
],
        summary: "The foundation of His technical prowess. The academic protocols here were executed with nearly perfect fidelity, specializing in Neural Architectures."
    }
];