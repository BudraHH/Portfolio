import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spinnerFrames = ["|", "/", "-", "\\"];

// Memoized terminal line component
const TerminalLine = memo(({ line, spinnerFrame }) => {
    if (!line || typeof line !== "string") return null;

    if (line.trim().startsWith("$")) {
        return <div className="text-cyan-300 font-mono whitespace-pre">{line}</div>;
    }
    if (line.startsWith("Warning:")) {
        return <div className="text-yellow-400">{line}</div>;
    }
    if (line.startsWith("✓")) {
        return <div className="text-green-400">{line}</div>;
    }
    if (/\[\d\/\d\]/.test(line)) {
        return (
            <div className="text-cyan-400 flex items-center gap-1">
                <span>{spinnerFrame}</span>
                {line}
            </div>
        );
    }
    return <div className="text-cyan-200">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

export default function DetailView({ id, project, close, pid }) {
    const [detailOutput, setDetailOutput] = useState([]);
    const [detailIsLoading, setDetailIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const isMobile = useMemo(() => window.innerWidth < 768, []);

    // Random initial position with mobile constraints
    const initialPosition = useMemo(() => {
        const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        if (isMobile) {
            const padding = 16;
            const maxX = Math.max(padding, window.innerWidth - 320 - padding);
            const maxY = Math.max(padding, window.innerHeight - 400 - padding);

            return {
                x: randRange(padding, maxX),
                y: randRange(padding, maxY)
            };
        } else {
            return {
                x: randRange(100, 250),
                y: randRange(50, 80)
            };
        }
    }, [isMobile]);

    // Motion values with spring
    const x = useMotionValue(initialPosition.x);
    const y = useMotionValue(initialPosition.y);
    const springX = useSpring(x, { stiffness: 150, damping: 25 });
    const springY = useSpring(y, { stiffness: 150, damping: 25 });

    const spinnerFrame = useMemo(() => spinnerFrames[spinnerStep], [spinnerStep]);

    // Terminal lines
    const detailLines = useMemo(() => [
        "$ bash project-details.sh",
        "Starting child process...",
        `PID: ${pid}`,
        "[1/3] Parsing metadata...",
        "[2/3] Building project...",
        "[3/3] Running post-build checks...",
        `Warning: 1 unused variable in /src/utils/${project.name.toLowerCase().split(" ")[0]}.js`,
        "✓ All checks passed.",
        "",
    ], [project.name, pid]);

    // Set initial offset
    useEffect(() => {
        setOffset(initialPosition);
    }, [initialPosition]);

    // Terminal animation
    useEffect(() => {
        let idx = 0;
        setDetailIsLoading(true);
        setDetailOutput([]);

        const timer = setInterval(() => {
            setSpinnerStep(s => (s + 1) % 4);
            if (idx < detailLines.length) {
                setDetailOutput(prev => [...prev, detailLines[idx]]);
                idx++;
            } else {
                setDetailIsLoading(false);
                clearInterval(timer);
            }
        }, 250);

        return () => clearInterval(timer);
    }, [detailLines]);

    // Backdrop click handler (mobile only)
    const handleBackdropClick = useCallback((e) => {
        if (isMobile && e.target === e.currentTarget) {
            close();
        }
    }, [isMobile, close]);

    // Dragging handlers with boundary constraints
    const handleMouseDown = useCallback((e) => {
        if (e.button !== 0) return;
        setStartPos({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
    }, []);

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            let newX = offset.x + dx;
            let newY = offset.y + dy;

            if (isMobile) {
                const padding = 16;
                const maxX = window.innerWidth - 320 - padding;
                const maxY = window.innerHeight - 400 - padding;

                newX = Math.max(padding, Math.min(newX, maxX));
                newY = Math.max(padding, Math.min(newY, maxY));
            }

            x.set(newX);
            y.set(newY);
        };

        const handleUp = () => {
            setIsDragging(false);
            setOffset({ x: x.get(), y: y.get() });
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [isDragging, startPos, offset, x, y, isMobile]);

    return (
        <motion.div
            key={id}
            className={`fixed inset-0 z-50 ${isMobile ? 'pointer-events-auto' : 'pointer-events-none'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBackdropClick}
        >
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    zIndex: 60 + pid,
                }}
                onMouseDown={handleMouseDown}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="pointer-events-auto relative
                    w-[calc(100%-2rem)] xs:w-[calc(100%-4rem)] sm:w-full
                    max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg
                    rounded-lg xs:rounded-xl sm:rounded-2xl
                    overflow-hidden font-mono text-white
                    bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.97)_100%)]"
            >
                {/* Header */}
                <div className="flex items-center gap-1
                    px-2 xs:px-3 sm:px-4
                    py-2 xs:py-2.5 sm:py-3
                    bg-gradient-to-r from-[#101a1c] to-[#0f2124]
                    border-b border-cyan-400/20 select-none cursor-move">
                    <span
                        onClick={close}
                        className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-red-500 mr-1 cursor-pointer hover:bg-red-400 transition-colors"
                    />
                    <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-yellow-400 mr-1" />
                    <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-green-500" />
                    <span className="ml-1.5 xs:ml-2 text-[10px] xs:text-xs sm:text-sm text-cyan-300/80 truncate">
                        project-details.sh — child [PID: {pid}]
                    </span>
                </div>

                {/* Content */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6
                    min-h-[18rem] xs:min-h-[20rem] sm:min-h-[22rem]
                    overflow-auto
                    max-h-[50vh] xs:max-h-[55vh] sm:max-h-[60vh]
                    bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.97)_100%)]
                    text-xs xs:text-sm">

                    {detailOutput.map((line, idx) => (
                        <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                    ))}

                    {!detailIsLoading && (
                        <>
                            <div className="mb-2 mt-3 xs:mt-4 text-cyan-300 font-bold text-sm xs:text-base">
                                {project.name}
                            </div>
                            <div className="text-cyan-100 mb-2 text-xs xs:text-sm leading-relaxed">
                                {project.description}
                            </div>
                            <div className="flex flex-wrap gap-1.5 xs:gap-2 text-[10px] xs:text-xs mb-3">
                                {project.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="bg-cyan-800/50 text-cyan-200 px-2 py-0.5 rounded whitespace-nowrap"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={project.github}
                                onClick={(e) => e.stopPropagation()}
                                className="text-cyan-400 text-xs xs:text-sm underline underline-offset-2 hover:text-cyan-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                [GitHub Repository]
                            </a>

                            {/* Footer */}
                            <div className="mt-4 xs:mt-5 sm:mt-6
                                flex flex-col xs:flex-row items-start xs:items-center justify-between
                                border-t pt-2 xs:pt-3
                                border-cyan-500/20
                                text-[10px] xs:text-xs font-mono
                                gap-2 xs:gap-0">
                                <span className="text-green-400 flex items-center gap-2">
                                    <span className="inline-block w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-400 animate-pulse" />
                                    Process completed (exit 0)
                                </span>
                                <span className="text-cyan-300/80">Elapsed: 0.4s</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Visual overlays - Combined */}
                <div className="absolute inset-0 pointer-events-none
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                    ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                    rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-25" />
            </motion.div>
        </motion.div>
    );
}
