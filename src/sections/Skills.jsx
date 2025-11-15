import { useEffect, useState, useMemo, memo, useRef } from "react";
import {
    FaPython, FaJava, FaReact, FaHtml5, FaCss3, FaNodeJs,
    FaWrench, FaGitAlt, FaDocker, FaLinux, FaBrain
} from "react-icons/fa";
import {
    SiJavascript, SiTailwindcss, SiDjango, SiFlask, SiExpress,
    SiPostgresql, SiMongodb, SiGithubactions, SiPostman,
    SiTensorflow, SiPytorch, SiScikitlearn, SiKeras, SiNumpy,
    SiPandas, SiJupyter
} from "react-icons/si";

const spinnerFrames = ["|", "/", "-", "\\"];

const SKILLS = [
    {
        id: "languages",
        title: "Languages",
        technologies: [
            { name: "Python", icon: FaPython },
            { name: "Java", icon: FaJava },
            { name: "JavaScript (ES6+)", icon: SiJavascript },
        ],
    },
    {
        id: "frontend",
        title: "Frontend Development",
        technologies: [
            { name: "React.js", icon: FaReact },
            { name: "HTML5", icon: FaHtml5 },
            { name: "CSS", icon: FaCss3 },
            { name: "Tailwind CSS", icon: SiTailwindcss },
        ],
    },
    {
        id: "backend",
        title: "Backend Development",
        technologies: [
            { name: "Node.js", icon: FaNodeJs },
            { name: "Django", icon: SiDjango },
            { name: "Flask", icon: SiFlask },
            { name: "Express.js", icon: SiExpress },
        ],
    },
    {
        id: "aiml",
        title: "AI & Machine Learning",
        technologies: [
            { name: "TensorFlow", icon: SiTensorflow },
            { name: "PyTorch", icon: SiPytorch },
            { name: "Scikit-learn", icon: SiScikitlearn },
            { name: "Keras", icon: SiKeras },
            { name: "NumPy", icon: SiNumpy },
            { name: "Pandas", icon: SiPandas },
            { name: "Jupyter", icon: SiJupyter },
        ],
    },
    {
        id: "database",
        title: "Database Management",
        technologies: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MongoDB", icon: SiMongodb },
        ],
    },
    {
        id: "api",
        title: "API & Architecture",
        technologies: [
            { name: "REST APIs" },
            { name: "WebSockets" },
            { name: "JSON" },
            { name: "MVC Pattern" },
            { name: "JWT" },
        ],
    },
    {
        id: "devtools",
        title: "DevOps & Tools",
        technologies: [
            { name: "Git", icon: FaGitAlt },
            { name: "GitHub Actions", icon: SiGithubactions },
            { name: "Docker", icon: FaDocker },
            { name: "Linux", icon: FaLinux },
            { name: "Postman", icon: SiPostman },
        ],
    },
];

// Memoized Terminal Line Component
const TerminalLine = memo(({ line, spinnerFrame }) => {
    if (!line || typeof line !== "string") return null;

    if (line.startsWith("$")) {
        return <div className="text-cyan-300 mb-1">{line}</div>;
    }
    if (line.startsWith("✓")) {
        return <div className="text-green-400 mb-1">{line}</div>;
    }
    if (line.startsWith("[")) {
        return (
            <div className="text-cyan-400 flex items-center gap-2 mb-1">
                <span>{spinnerFrame}</span>
                {line}
            </div>
        );
    }
    return <div className="text-cyan-200 mb-1">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

// Memoized Skill Category Component
const SkillCategory = memo(({ category, isLast }) => (
    <>
        <div>
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-2 xs:mb-3">
                <span className="text-cyan-300 font-bold text-xs xs:text-sm uppercase tracking-wider">
                    📦 {category.title}
                </span>
                <span className="text-cyan-500/50 text-[10px] xs:text-xs">
                    ({category.technologies.length} packages)
                </span>
            </div>

            {/* Technologies List */}
            <div className="space-y-1 ml-2 xs:ml-4">
                {category.technologies.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-2 xs:gap-3 text-cyan-100 hover:bg-cyan-900/5 px-2 xs:px-3 py-1.5 xs:py-2 rounded transition-colors group"
                        >
                            <span className="text-green-400 text-xs">●</span>
                            {Icon && (
                                <Icon className="text-cyan-300 text-base xs:text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                            )}
                            <span className="flex-1 text-xs xs:text-sm text-cyan-100 group-hover:text-cyan-200 truncate">
                                {tech.name}
                            </span>
                            <span className="text-[10px] xs:text-xs text-gray-400 flex-shrink-0 hidden xs:inline">
                                [installed]
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
        {!isLast && <hr className="border-cyan-500/10 my-1" />}
    </>
));

SkillCategory.displayName = 'SkillCategory';

export default function Skills({ scrollProgress, sectionScrollRange, pid }) {
    // ========================================
    // REFS
    // ========================================
    const scrollRef = useRef(null);

    // ========================================
    // STATE
    // ========================================
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [startDisplay, setStartDisplay] = useState(false);

    // ========================================
    // MEMOIZED VALUES
    // ========================================
    const totalTech = useMemo(
        () => SKILLS.reduce((sum, skill) => sum + skill.technologies.length, 0),
        []
    );

    const spinnerFrame = useMemo(
        () => spinnerFrames[spinnerStep],
        [spinnerStep]
    );

    const terminalLines = useMemo(
        () => [
            "$ bash skills-manager.sh --fork",
            "Loading skill packages...",
            `PID: ${pid}`,
            "[1/4] Scanning installed packages...",
            "[2/4] Checking dependencies...",
            "[3/4] Verifying versions...",
            "[4/4] Building package tree...",
            `✓ Found ${totalTech} installed packages across ${SKILLS.length} categories`,
            "",
        ],
        [pid, totalTech]
    );

    // ========================================
    // EFFECTS
    // ========================================

    // Initial display delay
    useEffect(() => {
        const timer = setTimeout(() => setStartDisplay(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Terminal output animation
    useEffect(() => {
        let index = 0;
        setOutput([]);
        setIsLoading(true);

        const interval = setInterval(() => {
            if (index < terminalLines.length) {
                setOutput(prev => [...prev, terminalLines[index]]);
                index++;
            } else {
                setIsLoading(false);
                clearInterval(interval);
            }
        }, 220);

        return () => clearInterval(interval);
    }, [terminalLines]);

    // Spinner animation
    useEffect(() => {
        if (!isLoading) return;

        const spinner = setInterval(
            () => setSpinnerStep(s => (s + 1) % 4),
            70
        );

        return () => clearInterval(spinner);
    }, [isLoading]);

    // Scroll synchronization
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
                bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                border border-cyan-500/20
                transition-transform duration-500">

                {/* Header */}
                <div className="flex items-center gap-1.5 xs:gap-2
                    px-2 xs:px-3 sm:px-4
                    py-2 xs:py-2.5 sm:py-3
                    bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                    border-b border-cyan-500/20">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                    <span className="ml-2 xs:ml-3 text-[10px] xs:text-xs sm:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                        skills-manager.sh - package manager [PID: {pid}]
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
                    h-[calc(100%-3rem)] xs:h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]">

                    {startDisplay && (
                        <>
                            {output.map((line, idx) => (
                                <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                            ))}

                            {!isLoading && (
                                <div className="space-y-4 xs:space-y-5 sm:space-y-6 mt-4 xs:mt-5 sm:mt-6">
                                    {SKILLS.map((category, idx) => (
                                        <SkillCategory
                                            key={category.id}
                                            category={category}
                                            isLast={idx === SKILLS.length - 1}
                                        />
                                    ))}

                                    {/* Summary Footer */}
                                    <div className="mt-6 xs:mt-7 sm:mt-8
                                pt-3 xs:pt-3.5 sm:pt-4
                                border-t border-cyan-500/20
                                text-[10px] xs:text-xs font-mono">
                                        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0">
                                    <span className="text-green-400 flex items-center gap-2">
                                        <span className="inline-block w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-400 animate-pulse" />
                                        All packages verified
                                    </span>
                                            <span className="text-cyan-300/80">
                                        Total: {totalTech} packages
                                    </span>
                                        </div>
                                        <div className="text-cyan-300/60 mt-2 text-[10px] xs:text-xs">
                                            Package manager: npm • Registry: registry.npmjs.org
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Visual Overlays - Combined for performance */}
                <div className="absolute inset-0 pointer-events-none
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                    ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                    rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30" />
                <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
            </div>
        </section>
    );
}
