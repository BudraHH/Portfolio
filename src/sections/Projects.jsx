import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import DetailView from "../components/DetailView.jsx";

const spinnerFrames = ["|", "/", "-", "\\"];

const PROJECTS = [
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

// Memoized terminal line component
const TerminalLine = memo(({ line }) => {
    if (!line || typeof line !== "string") return null;

    if (line.startsWith("$")) {
        return <div className="text-cyan-300 font-mono">{line}</div>;
    }
    if (line.startsWith("✓")) {
        return <div className="text-green-400">{line}</div>;
    }
    return <div className="text-cyan-200">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

// Memoized project card component
const ProjectCard = memo(({ project, index, onClick }) => (
    <div
        onClick={() => onClick(index)}
        className="border border-cyan-500/20 rounded-lg p-3 xs:p-4
            bg-[#0c2230]/50 hover:border-cyan-500/50
            cursor-pointer transition touch-manipulation"
        title="Click for details"
    >
        <div className="flex items-center justify-between mb-1 gap-2">
            <span className="text-cyan-300 font-semibold text-sm xs:text-base truncate">
                {project.name}
            </span>
            <a
                href={project.github}
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-cyan-400 underline underline-offset-2 hover:text-cyan-200 transition duration-150 flex-shrink-0"
                target="_blank"
                rel="noopener noreferrer"
            >
                [GitHub]
            </a>
        </div>
        <div className="text-cyan-100 mb-2 text-xs xs:text-sm leading-relaxed">
            {project.description}
        </div>
        <div className="flex flex-wrap gap-1.5 xs:gap-2 text-xs">
            {project.tech.map((t, i) => (
                <span key={i} className="bg-cyan-800/50 text-cyan-200 px-2 py-0.5 rounded whitespace-nowrap">
                    {t}
                </span>
            ))}
        </div>
    </div>
));

ProjectCard.displayName = 'ProjectCard';

export default function Projects({ scrollProgress, sectionScrollRange, pid }) {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [openDetails, setOpenDetails] = useState([]);

    const terminalLines = useMemo(() => [
        "$ bash projects.sh",
        "Starting child process...",
        `PID: ${pid}`,
        "[1/4] Fetching metadata...",
        "[2/4] Installing dependencies...",
        "[3/4] Building projects...",
        "[4/4] Running post-build checks...",
        `✓ Successfully loaded ${PROJECTS.length} projects`,
        "Rendering components...",
        "",
    ], []);

    const handleClickProject = useCallback((idx) => {
        const newPid = 6000 + Math.floor(Math.random() * 999);

        setOpenDetails((prev) => {
            const newDetail = { id: Date.now(), index: idx, pid: newPid };
            const alreadyOpen = prev.some(d => d.index === idx);

            if (alreadyOpen) return prev;
            if (prev.length >= 1) return [...prev.slice(1), newDetail];
            return [...prev, newDetail];
        });
    }, []);

    const handleCloseDetail = useCallback((id) => {
        setOpenDetails(prev => prev.filter(d => d.id !== id));
    }, []);

    // Spinner effect
    useEffect(() => {
        if (!isLoading) return;
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % 4), 70);
        return () => clearInterval(spinner);
    }, [isLoading]);

    // Terminal output animation
    useEffect(() => {
        let index = 0;
        setOutput([]);
        setIsLoading(true);

        const interval = setInterval(() => {
            setOutput(prev => [...prev, terminalLines[index]]);
            index++;
            if (index === terminalLines.length) {
                setIsLoading(false);
                clearInterval(interval);
            }
        }, 260);

        return () => clearInterval(interval);
    }, [terminalLines]);

    const scrollRef = useRef(null);

    // Sync internal scroll with global scroll progress
    useEffect(() => {
        if (!scrollProgress || !sectionScrollRange || !scrollRef.current) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            const [sectionStart, sectionEnd] = sectionScrollRange;
            if (latest >= sectionStart && latest <= sectionEnd) {
                const localProgress = (latest - sectionStart) / (sectionEnd - sectionStart);
                const scrollableElement = scrollRef.current.querySelector('[data-scrollable-content]');
                if (scrollableElement) {
                    const maxScroll = scrollableElement.scrollHeight - scrollableElement.clientHeight;
                    if (maxScroll > 0) {
                        scrollableElement.dataset.syncing = 'true';
                        scrollableElement.scrollTop = localProgress * maxScroll;
                        setTimeout(() => {
                            if (scrollableElement) {
                                scrollableElement.dataset.syncing = 'false';
                            }
                        }, 50);
                    }
                }
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, sectionScrollRange]);

    return (
        <section className="w-full h-full flex flex-col justify-center items-start
            relative "
            ref={scrollRef}>

            <div className="relative w-full h-full
                rounded-lg xs:rounded-xl sm:rounded-2xl
                overflow-hidden font-mono text-white
                bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                border border-cyan-500/20
                transition-transform duration-500">

                {/* Header */}
                <div className="flex items-center
                    px-2 xs:px-3 sm:px-4
                    py-2 xs:py-2.5 sm:py-3
                    bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                    border-b border-cyan-500/20">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] ml-1.5 xs:ml-2" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)] ml-1.5 xs:ml-2" />
                    <span className="ml-2 xs:ml-3 text-[10px] xs:text-xs sm:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                        projects.jsx - child process [PID: {pid}]
                    </span>
                </div>

                {/* Terminal Output */}
                <div 
                    data-scrollable-content
                    className="relative z-10
                    px-3 xs:px-4 sm:px-5
                    py-3 xs:py-3.5 sm:py-4
                    text-xs xs:text-sm
                    leading-relaxed text-cyan-100/75
                    overflow-y-auto
                    h-[calc(100%-2.5rem)] xs:h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]
                    bg-transparent">

                    {output.map((line, idx) => (
                        <TerminalLine key={idx} line={line} />
                    ))}

                    {!isLoading && (
                        <div className="mt-6 xs:mt-7 sm:mt-8">
                            <div className="mb-3 xs:mb-4 text-cyan-300 font-bold uppercase text-xs xs:text-sm">
                                Projects:
                            </div>
                            <div className="space-y-3 xs:space-y-4">
                                {PROJECTS.map((project, idx) => (
                                    <ProjectCard
                                        key={idx}
                                        project={project}
                                        index={idx}
                                        onClick={handleClickProject}
                                    />
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 xs:mt-7 sm:mt-8
                                flex flex-col xs:flex-row items-start xs:items-center justify-between
                                border-t pt-3 xs:pt-4
                                border-cyan-500/20
                                text-[10px] xs:text-xs font-mono
                                gap-2 xs:gap-0">
                                <span className="text-green-400 flex items-center gap-2">
                                    <span className="inline-block w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-400 animate-pulse" />
                                    Process completed successfully (exit code 0)
                                </span>
                                <span className="text-cyan-300/80">Elapsed time: 1.4s</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Overlays - Combined */}
                <div className="absolute inset-0 pointer-events-none
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                    ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                    rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30" />
                <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
            </div>

            {/* Detail Views */}
            {openDetails.map(({ id, index, pid }) => (
                <DetailView
                    key={id}
                    project={PROJECTS[index]}
                    pid={pid}
                    close={() => handleCloseDetail(id)}
                />
            ))}
        </section>
    );
}
