import { useEffect, useState } from "react";
import DetailView from "../components/DetailView.jsx";

const spinnerFrames = ["|", "/", "-", "\\"];

export default function Projects() {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);

    const [openDetails, setOpenDetails] = useState([]); // stores up to 2 detail views

    const handleClickProject = (idx) => {
        const newPid = 6000 + Math.floor(Math.random() * 999);

        setOpenDetails((prev) => {
            // Create new detail object
            const newDetail = { id: Date.now(), index: idx, pid: newPid };

            // If already open → ignore re-open
            const alreadyOpen = prev.some(d => d.index === idx);
            if (alreadyOpen) return prev;

            // If 2 are already open → remove the oldest (first)
            if (prev.length >= 1) {
                return [...prev.slice(1), newDetail];
            }

            // Otherwise just add
            return [...prev, newDetail];
        });
    };


    const projects = [
        {
            name: "Portfolio Website",
            description: "A personal portfolio to showcase projects and skills using React and Tailwind CSS.",
            tech: ["React", "Tailwind CSS", "JavaScript"],
            github: "https://github.com/yourusername/portfolio-website",
        },
        {
            name: "E-commerce Platform",
            description: "An online store supporting product management, payments, and order tracking, built with Node.js and MongoDB.",
            tech: ["Node.js", "Express", "MongoDB", "Stripe"],
            github: "https://github.com/yourusername/ecommerce-platform",
        },
        {
            name: "Blog CMS",
            description: "A content management system emphasizing markdown-based blogging with Next.js and Prisma.",
            tech: ["Next.js", "Prisma", "Markdown", "TypeScript"],
            github: "https://github.com/yourusername/blog-cms",
        },
        {
            name: "Chat Application",
            description: "Real-time chat app with rooms and private messaging using Socket.io and Redis.",
            tech: ["React", "Socket.io", "Redis", "Node.js"],
            github: "https://github.com/yourusername/chat-application",
        },
    ];

    // Spinner effect for main process
    useEffect(() => {
        if (!isLoading) return;
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % spinnerFrames.length), 70);
        return () => clearInterval(spinner);
    }, [isLoading]);

    // Main staged terminal output (with animation and spinner, warnings, etc.)
    useEffect(() => {
        const lines = [
            "$ bash projects.sh",
            "Starting child process...",
            "PID: 4821",
            "[1/4] Fetching metadata...",
            "[2/4] Installing dependencies...",
            "[3/4] Building projects...",
            "[4/4] Running post-build checks...",
            `✓ Successfully loaded ${projects.length} projects`,
            "Rendering components...",
            "",
        ];
        let index = -1;
        setOutput([]);
        setIsLoading(true);

        const interval = setInterval(() => {
            setOutput(prev => [...prev, lines[index]]);
            index++;
            if (index === lines.length) {
                setIsLoading(false);
                clearInterval(interval);
            }
        }, 260);
        return () => clearInterval(interval);
    }, [projects.length]);

    return (
        <section className="p-16 w-full  h-full flex flex-col justify-center items-start relative z-10 min-h-screen bg-[#08141b]">

            <div className="relative w-full ma h-[40rem] rounded-2xl overflow-hidden font-mono text-white
                bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75 border border-cyan-500/20

                transition-transform duration-500"
            >
                {/* Header */}
                <div className="flex flex-row justify-between items-center bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6] border-b border-cyan-500/20">
                    <div className="flex items-center gap-2 px-4 py-3">
                        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]"></span>
                        <span className="ml-3 text-sm text-cyan-400/70 select-none tracking-wide">
                            projects.jsx - child process [PID: 4821]
                        </span>
                    </div>
                </div>
                {/* Terminal Output */}
                <div className="relative z-10 px-5 py-4 text-sm leading-relaxed text-cyan-100/75 overflow-y-auto max-h-[calc(100%-4rem)] bg-transparent">
                    {output.map((line, idx) => {
                        if (typeof line !== "string") return null;
                        
                        // Style command lines that start with "$"
                        if (line.startsWith("$")) {
                            return <div key={idx} className="whitespace-pre text-cyan-300 font-mono">{line}</div>;
                        }
                        
                        // Style success messages
                        if (line.startsWith("✓")) {
                            return <div key={idx} className="whitespace-pre text-green-400">{line}</div>;
                        }
                        
                        // Default styling
                        return <div key={idx} className="whitespace-pre text-cyan-200">{line}</div>;
                    })}
                    {!isLoading && (
                        <div>
                            <div className="mt-8 mb-2 text-cyan-300 font-bold uppercase">Projects:</div>
                            <div className="space-y-4">
                                {projects.map((project, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleClickProject(idx)}
                                        className="border border-cyan-500/20 rounded-lg p-4 bg-[#0c2230]/50 mb-2 hover:border-cyan-500/50 cursor-pointer transition"
                                        title="Click for details"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-cyan-300 font-semibold">{project.name}</span>
                                            <a
                                                href={project.github}
                                                className="text-xs text-cyan-400 underline underline-offset-2 hover:text-cyan-200 transition duration-150"
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                [GitHub]
                                            </a>
                                        </div>
                                        <div className="text-cyan-100 mb-2">{project.description}</div>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="bg-cyan-800/50 text-cyan-200 px-2 py-0.5 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center justify-between border-t pt-4 border-cyan-500/20 text-xs font-mono">
                                <span className="text-green-400 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Process completed successfully (exit code 0)
                                </span>
                                <span className="text-cyan-300/80">Elapsed time: 1.4s</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0)_60%)] pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none" />
                <div className="absolute -inset-1 rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
            </div>

            {openDetails.map(({ id, index, pid }) => (
                <DetailView
                    key={id}   // <-- use stable unique id here to identify the instance
                    project={projects[index]}
                    pid={pid}
                    close={() => setOpenDetails(prev => prev.filter(d => d.id !== id))}
                />
            ))}

        </section>
    );
}
