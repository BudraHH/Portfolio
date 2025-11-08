import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spinnerFrames = ["|", "/", "-", "\\"];

export default function DetailView({ id, project, close, pid }) {
    const [detailOutput, setDetailOutput] = useState([]);
    const [detailIsLoading, setDetailIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);

    const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const initialX = randRange(100, 250);
    const initialY = randRange(50, 80);

    // Terminal lines to simulate
    const detailLines = [
        "$ bash project-details.sh " ,
        "Starting child process...",
        `PID: ${pid}`,
        "[1/3] Parsing metadata...",
        "[2/3] Building project...",
        "[3/3] Running post-build checks...",
        "Warning: 1 unused variable in /src/utils/" + project.name.toLowerCase().split(" ")[0] + ".js",
        "✓ All checks passed.",
        "",
    ];

    useEffect(() => {
        let idx = -1;
        setDetailIsLoading(true);
        setDetailOutput([]);

        const timer = setInterval(() => {
            setSpinnerStep(s => (s + 1) % spinnerFrames.length);
            if (idx < detailLines.length) {
                setDetailOutput(prev => [...prev, detailLines[idx]]);
                idx++;
            } else {
                setDetailIsLoading(false);
                clearInterval(timer);
            }
        }, 250);

        return () => clearInterval(timer);
    }, [project, pid]);

    // Dragging Logic
    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);
    const springX = useSpring(x, { stiffness: 150, damping: 25 });
    const springY = useSpring(y, { stiffness: 150, damping: 25 });

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: initialX, y: initialY });

    useEffect(() => {
        const handleMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            x.set(offset.x + dx);
            y.set(offset.y + dy);
        };

        const handleUp = () => {
            setIsDragging(false);
            setOffset({ x: x.get(), y: y.get() });
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("mouseup", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [isDragging, startPos, offset, x, y]);

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        setStartPos({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
    };

    return (
        <motion.div
            key={id}
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                className="pointer-events-auto relative w-full max-w-lg rounded-2xl overflow-hidden font-mono text-white
    bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.97)_100%)]"
            >
                <div className="flex items-center gap-1 px-4 py-3 bg-gradient-to-r from-[#101a1c] to-[#0f2124] border-b border-cyan-400/20 select-none">
                    <span onClick={close} className="w-3 h-3 rounded-full bg-red-500 mr-1 cursor-pointer"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="ml-2 text-sm text-cyan-300/80">
            project-details.sh — child process [PID: {pid}]
          </span>
                </div>

                <div className="p-6 min-h-[22rem] overflow-auto max-h-[60vh] bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.97)_100%)] text-sm">
                    {detailOutput.map((line, idx) => {
                        if (typeof line !== "string" || !line) return null;

                        if (line.trim().startsWith("$"))
                            return (
                                <div key={idx} className="text-cyan-300 font-mono whitespace-pre">
                                    {line}
                                </div>
                            );
                        if (line.startsWith("Warning:"))
                            return (
                                <div key={idx} className="text-yellow-400">
                                    {line}
                                </div>
                            );
                        if (line.startsWith("✓"))
                            return (
                                <div key={idx} className="text-green-400">
                                    {line}
                                </div>
                            );
                        if (/\[\d\/\d\]/.test(line))
                            return (
                                <div key={idx} className="text-cyan-400 flex items-center gap-1">
                                    <span className="inline-block">{spinnerFrames[spinnerStep]}</span>
                                    {line}
                                </div>
                            );

                        return <div key={idx} className="text-cyan-200">{line}</div>;
                    })}

                    {!detailIsLoading && (
                        <>
                            <div className="mb-2 mt-4 text-cyan-300 font-bold text-base">
                                {project.name}
                            </div>
                            <div className="text-cyan-100 mb-2">{project.description}</div>
                            <div className="flex flex-wrap gap-2 text-xs mb-3">
                                {project.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="bg-cyan-800/50 text-cyan-200 px-2 py-0.5 rounded"
                                    >
                    {t}
                  </span>
                                ))}
                            </div>
                            <a
                                href={project.github}
                                className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                [GitHub Repository]
                            </a>

                            <div className="mt-6 flex items-center justify-between border-t pt-3 border-cyan-500/20 text-xs font-mono">
                <span className="text-green-400 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Process completed successfully (exit code 0)
                </span>
                                <span className="text-cyan-300/80">Elapsed time: 0.4s</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0)_60%)] pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-25 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}
