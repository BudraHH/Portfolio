export const LANGUAGE_COLORS = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    SQL: "bg-indigo-500",
    Rust: "bg-orange-600",
    Css: "bg-purple-500",
    Go: "bg-cyan-500",
    Docker: "bg-sky-500",
};


export const REPOSITORIES = [
    {
        name: "ApplyForge",
        description:
            "An end-to-end automated job application platform designed to handle large-scale job scraping and intelligent resume matching. Built with a distributed architecture to process thousands of concurrent job listings across multiple platforms with fault tolerance and sub-second matching performance.",
        languages: ["Python", "SQL"],
        techStack: [
            "FastAPI",
            "PostgreSQL",
            "Docker",
            "Redis",
            "Celery",
            "JWT Auth",
            "Async Workers"
        ],
        github: "https://github.com/BudraHH/ApplyForge",
        website: null,
        stars: 0,
        forks: 0,
        updated: "Active Development"
    },
    {
        name: "AutoIntell",
        description:
            "A predictive maintenance system delivering real-time insights through Django REST APIs and TensorFlow inference pipelines. Optimized database queries and inference workflows to achieve consistent sub-200ms response times in production scenarios.",
        languages: ["Python", "SQL"],
        techStack: [
            "Django REST",
            "TensorFlow",
            "PostgreSQL",
            "ORM Optimization",
            "Model Inference"
        ],
        github: "https://github.com/BudraHH/AutoIntell",
        website: null,
        stars: 0,
        forks: 0,
        updated: "Completed"
    },
    {
        name: "TestCo",
        description:
            "A scalable test management and evaluation platform built on a serverless architecture. Securely executes concurrent code submissions using Docker-based sandboxing while ensuring performance isolation and platform stability.",
        languages: ["JavaScript"],
        techStack: [
            "Node.js",
            "AWS Lambda",
            "Docker",
            "CloudWatch",
            "REST APIs"
        ],
        github: "https://github.com/BudraHH/TestCo",
        website: null,
        stars: 0,
        forks: 0,
        updated: "Completed"
    },
    {
        name: "CVE Management System",
        description:
            "A vulnerability ingestion and analytics platform that continuously synchronizes threat intelligence from the NVD API. Optimized MongoDB schemas and indexing strategies to handle over 200K vulnerability records with sub-100ms query performance.",
        languages: ["Python"],
        techStack: [
            "Flask",
            "MongoDB",
            "NVD API",
            "Indexing",
            "Security Analytics"
        ],
        github: "https://github.com/BudraHH/CVE-Management-System",
        website: null,
        stars: 0,
        forks: 0,
        updated: "Completed"
    }
];
