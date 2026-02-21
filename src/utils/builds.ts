export interface ProjectBuild {
    id: string;
    title: string;
    tagline: string;
    description: string;
    detail_points: string[];
    reason: string;
    impact?: string;
    stack: {
        [key: string]: string[];
    };
    agent_stack?: {
        [key: string]: string[];
    };
    link?: string;
    github?: string;
}

export const BUILDS_DATA: ProjectBuild[] = [
    {
        id: "applyvortex",
        title: "ApplyVortex",
        tagline: "Distributed Automation Ecosystem",
        description: "A fault-tolerant agent-server architecture designed to orchestrate high-concurrency browser automation and real-time data processing.",
        detail_points: ["Built on a stealth-first Playwright framework integrated with local LLM (Qwen 2.5) nodes for low-latency text generation.",
            " It automates the end-to-end job application lifecycle by dynamically tailoring resumes to match specific role requirements."],
        reason: "He faced the same draining manual job search everyone else does, so he built this to help himself and others automate the repetitive grind.",
        impact: "Achieved sub-second resume matching and 99.9% uptime during high-concurrency job application cycles.",
        stack: {
            "languages": ["PYTHON", "JAVASCRIPT"],
            "frontend": ["REACT", "TAILWIND CSS"],
            "backend": ["FASTAPI", "CELERY"],
            "databases": ["POSTGRESQL", "REDIS"],
            "devops & tools": ["DOCKER", "DOCKER COMPOSE", "GIT"],

        },
        agent_stack: {
            "frontend": ["React", "Tailwind css", "PLAYWRIGHT"],
            "backend": ["PYTHONWebview", "PYTHON"],
            "llms": ["QWEN 2.5"],
        },
        link: "https://apply-vortex.vercel.app/",
        github: "https://github.com/BudraHH/ApplyVortex/",
    },
    {
        id: "clouddrive",
        title: "CloudDrive",
        tagline: "AWS-Powered Storage Platform",
        description: "A secure cloud storage solution utilizing serverless protocols to optimize file transfer traffic and storage scalability.",
        detail_points: ["Utilizes AWS S3 pre-signed URLs and a custom parent-child indexing schema for efficient directory tree management.",
            " It offloads all file transfer traffic directly to the cloud while maintaining high-speed retrieval for deeply nested file structures."],
        reason: "Faced with a GUVI hackathon quest to recreate Google Drive, he engineered this blueprint to simplify cloud storage for the community.",
        impact: "Offloaded 100% of file transfer traffic to AWS S3 and improved directory traversal speeds by 35%.",
        stack: {
            "languages": ["JAVASCRIPT", "PYTHON"],
            "frontend": ["REACT", "TAILWIND CSS"],
            "backend": ["NODE.JS", "EXPRESS.JS"],
            "databases": ["MONGODB"],
            "devops & tools": ["AWS S3", "GIT"],
        },
        link: "https://clouddrive-red.vercel.app/",
        github: "https://github.com/BudraHH/CloudDrive",
    },
    {
        id: "measureco",
        title: "MeasureCo",
        tagline: "Serverless Assessment SaaS",
        description: "An adaptive evaluation platform designed to execute and grade student-submitted scripts in isolated, secure environments.",
        detail_points: ["Engineered using AWS Lambda microservices to create a serverless, high-concurrency code execution engine.",
            "It automates technical assessment grading by isolating script execution, ensuring fraud-proof results and real-time performance reporting."],
        reason: "Fed up with his institution's broken testing UX, he built this platform to deliver a fairer, smoother experience for fellow students.",
        impact: "Automated grading workflows for 100+ concurrent test cases, reducing manual reporting time by 30%.",
        stack: {
            "languages": ["JAVASCRIPT", "PYTHON"],
            "frontend": ["REACT", "TAILWIND CSS"],
            "backend": ["NODE.JS", "EXPRESS.JS", "FASTAPI"],
            "databases": ["MONGODB", "POSTGRESQL", "REDIS"],
            "devops & tools": ["AWS LAMBDA", "GIT"],
        },
        github: "https://github.com/BudraHH/TestCo",
    },
    {
        id: "autointell",
        title: "AutoIntell",
        tagline: "Predictive Intelligence System",
        description: "A predictive maintenance platform focused on forecasting mechanical failures through large-scale telemetry data analysis.",
        detail_points: ["Developed with a TensorFlow-driven modeling layer and a PostgreSQL schema optimized for high-volume relational telemetry data.",
            "It processes fleet sensor data to predict potential engine failures, allowing for preemptive maintenance scheduling."],
        reason: "He saw firsthand how machines fail without warning, so he engineered this for Volkswagen Mobiliton to catch industrial problems at the very start.",
        impact: "Achieved 80% failure prediction accuracy and reduced real-time analytics query response times by 35%.",
        stack: {
            "languages": ["PYTHON"],
            "frontend": ["REACT", "TAILWIND CSS"],
            "backend": ["DJANGO", "TENSORFLOW"],
            "databases": ["POSTGRESQL"],
            "devops & tools": ["GIT"],
        },
        github: "https://github.com/BudraHH/AutoIntell_BS",
    }
];