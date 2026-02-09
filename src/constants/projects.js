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
        languages: ["JavaScript", "Python", "SQL"],
        techStack: [
            "React.js",
            "FastAPI",
            "PostgreSQL",
            "Docker",
            "Redis",
            "Celery",
            "JWT Auth",
            "Async Workers"
        ],
        github: "https://github.com/BudraHH/ApplyForge",
        website: "https://apply-vortex.vercel.app/",
        stars: 0,
        forks: 0,
        updated: "Active Development"
    },
    {
        name: "CloudDrive",
        description:
            "An AWS-powered cloud storage platform delivering secure, high-speed file transfers with 100% binary data integrity through AWS S3 pre-signed URLs. Features optimized directory traversal with 35% faster API response times via nested parent-child MongoDB indexing, and enhanced security through two-step verification and JWT-based session management.",
        languages: ["JavaScript"],
        techStack: [
            "React.js",
            "Express.js",
            "Node.js",
            "AWS S3",
            "MongoDB",
            "JWT Auth",
            "Pre-signed URLs",
            "Two-Step Verification"
        ],
        github: "https://github.com/BudraHH/CloudDrive",
        website: "https://clouddrive-red.vercel.app/",
        stars: 0,
        forks: 0,
        updated: "Completed"
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
            "React.js",
            "Express.js",
            "Node.js",
            "MongoDB",
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
];
