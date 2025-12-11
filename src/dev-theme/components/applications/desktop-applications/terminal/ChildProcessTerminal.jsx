import React, { useEffect, useState, useRef } from "react";
import { FaTerminal, FaCogs, FaCheckCircle, FaCube } from "react-icons/fa";
import TerminalLine from "./TerminalLine.jsx";

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function ChildProcessTerminal({ pid, launchParams, onClose, onMinimize, onMaximize }) {
    const [history, setHistory] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [spinnerStep, setSpinnerStep] = useState(0);

    const scrollRef = useRef(null);
    const hasRunScript = useRef(false);

    // Initial setup from params if script provided
    useEffect(() => {
        if (launchParams && launchParams.script) {
            if (hasRunScript.current) return;
            hasRunScript.current = true;

            const lines = launchParams.script.split('\n').filter(Boolean);
            const totalSteps = lines.length;

            let delay = 0;
            // Track processed steps to determine completion
            let processedSteps = 0;

            lines.forEach((line) => {
                // Parse sleep markers to adjust timing dynamically
                if (line.startsWith('sleep ')) {
                    const sleepTime = parseInt(line.split(' ')[1]);
                    delay += (isNaN(sleepTime) ? 200 : sleepTime);
                    // Don't count sleep as a step for output
                    return;
                }

                // Handle download command
                if (line.startsWith('download ')) {
                    const stepDelay = 150;
                    delay += stepDelay;

                    setTimeout(() => {
                        const parts = line.split(' ');
                        const url = parts[1];
                        const filename = parts[2] || url.split('/').pop();

                        // Trigger actual browser download
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Don't add to history, just trigger download silently
                    }, delay);
                    return;
                }

                // Heuristic for delay
                const stepDelay = line.startsWith("echo") || line.startsWith("#") ? 150 : 600;
                delay += stepDelay;

                setTimeout(() => {
                    let rawOutput = line;
                    processedSteps++;

                    // Update progress based on valid output steps roughly matches lines.length
                    // Since sleep lines are skipped in loop but exist in totalSteps, we might reach >100% or stall
                    // Better approach: calculate total executable steps beforehand or just cap at 100

                    const progressValue = Math.min(100, (processedSteps / (totalSteps * 0.6)) * 100); // 0.6 factor to account for sleep/hidden lines
                    setProgress(progressValue);

                    // Clean up echo commands for display
                    if (rawOutput.startsWith('echo "')) {
                        rawOutput = rawOutput.substring(6, rawOutput.length - 1);
                    } else if (rawOutput.startsWith('echo ')) {
                        rawOutput = rawOutput.substring(5);
                    } else if (rawOutput.startsWith('#')) {
                        // Skip comments for cleaner UI, or render them as dimmed
                        if (rawOutput.startsWith('# ===')) return;
                    }

                    // Rich Text Formatting for "Installer" Look (CYAN THEME)
                    let formattedContent = rawOutput;

                    // 1. Highlight Categories [CATEGORY]
                    if (rawOutput.includes('┌── [')) {
                        const match = rawOutput.match(/\[(.*?)\]/);
                        if (match) {
                            formattedContent = (
                                <span>
                                    <span className="text-cyan-700">┌── </span>
                                    <span className="text-cyan-400 font-bold uppercase tracking-wider">[{match[1]}]</span>
                                </span>
                            );
                        }
                    }
                    // 2. Highlight Tree Items (Skills)
                    else if (rawOutput.includes('├──') || rawOutput.includes('└──')) {
                        const parts = rawOutput.split(/([├──|└──])/);
                        if (parts.length >= 3) {
                            const indent = parts[0];
                            const symbol = parts[1];
                            const rest = parts.slice(2).join('');
                            const [skillName, version] = rest.split('@');

                            formattedContent = (
                                <span>
                                    <span className="text-cyan-900">{indent}</span>
                                    <span className="text-cyan-600">{symbol}</span>
                                    <span className="text-gray-100 font-medium">{skillName}</span>
                                    {version && <span className="text-cyan-500/80 text-xs ml-1">v{version}</span>}
                                </span>
                            );
                        }
                    }
                    // 3. Highlight Metadata/Badges
                    else if (rawOutput.startsWith('[INSTALLER]')) {
                        formattedContent = (
                            <span className="flex items-center gap-2">
                                <span className="bg-cyan-900/40 text-cyan-400 px-1.5 py-0.5 rounded text-[10px] font-bold">INSTALLER</span>
                                <span className="text-cyan-200/80">{rawOutput.replace('[INSTALLER]', '').trim()}</span>
                            </span>
                        );
                    }

                    setHistory(prev => [...prev, { type: 'output', content: formattedContent }]);

                    // Check for end of script content
                    if (rawOutput.includes("System ready")) {
                        setIsComplete(true);
                        setProgress(100);
                        // Don't auto-close for skills installer
                    } else if (rawOutput.includes("Check your browser's Downloads folder")) {
                        setIsComplete(true);
                        setProgress(100);

                        // Auto-close only for resume download after 2 seconds
                        setTimeout(() => {
                            onClose();
                        }, 2000);
                    }

                }, delay);
            });

            // Initial message
            setHistory([{ type: 'output', content: "Initializing automated task..." }]);
        }
    }, [launchParams, onClose]);

    // Spinner animation
    useEffect(() => {
        if (isComplete) return;
        const interval = setInterval(() => {
            setSpinnerStep(prev => (prev + 1) % spinnerFrames.length);
        }, 80);
        return () => clearInterval(interval);
    }, [isComplete]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div
            className={`w-full h-full flex flex-col font-mono text-sm 
                bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                rounded-lg overflow-hidden border border-cyan-500/20 
                shadow-[0_0_20px_rgba(0,0,0,0.5)] relative transition-colors duration-300`}
        >
            {/* Visual overlays */}
            <div className="absolute inset-0 pointer-events-none
                bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                rounded-lg mix-blend-overlay opacity-30 z-0" />
            <div className="absolute -inset-1 rounded-lg bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none z-0" />

            {/* Header / Title Bar */}
            <div className={`window-drag-handle h-10 flex items-center px-3 
                bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                border-b border-cyan-500/20 select-none shrink-0 z-30 cursor-grab active:cursor-grabbing justify-between`}>
                <div className="flex gap-2 group/controls" onMouseDown={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)] hover:bg-red-600 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-red-900">×</span>
                    </button>
                    <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] hover:bg-yellow-500 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-yellow-900">−</span>
                    </button>
                    <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)] hover:bg-green-600 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-green-900">+</span>
                    </button>
                </div>

                {/* Center Title with Spinner/Check */}
                <div className={`flex items-center gap-2 text-cyan-400/70 text-xs font-bold tracking-wide`}>
                    {!isComplete ? (
                        <span className="text-cyan-400 animate-pulse">{spinnerFrames[spinnerStep]}</span>
                    ) : (
                        <FaCheckCircle className="text-cyan-400" />
                    )}
                    <span>{launchParams?.title || 'PROCESS MANAGER'}</span>
                </div>

                {/* PID */}
                <div className="text-[10px] text-cyan-400/60 font-mono">
                    PID:{launchParams?.pid || pid || '0000'}
                </div>
            </div>

            {/* Progress Bar (Cyan) */}
            {!isComplete && (
                <div className="h-[2px] w-full bg-cyan-900/30 relative z-10">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 ease-out"
                        style={{
                            width: `${progress}%`,
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s infinite linear'
                        }}
                    />
                </div>
            )}

            {/* Shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto custom-scrollbar scroll-smooth relative z-10 font-mono leading-relaxed"
            >
                {/* Output History */}
                <div className="flex flex-col gap-0.5">
                    {history.map((item, i) => (
                        <TerminalLine key={i} item={item} />
                    ))}
                </div>

                {isComplete && (
                    <div className="mt-6 flex flex-col items-center justify-center text-cyan-500/80 animate-fade-in-up">
                        <FaCube className="text-4xl mb-2 opacity-50" />
                        <span className="text-xs tracking-[0.2em] font-bold">INSTALLATION COMPLETE</span>
                    </div>
                )}

                {/* Scroll Anchor */}
                <div className="h-4" />
            </div>

            {/* Status Bar (Cyan) */}
            <div className="h-6 bg-[#03080c] border-t border-cyan-900/30 flex items-center px-3 text-[10px] text-cyan-600/70 select-none z-30 justify-between font-medium">
                <div className="flex items-center gap-3">
                    <span className="bg-cyan-900/20 px-1 rounded text-cyan-500/90">v2.4.0</span>
                    <span className="tracking-wider">SECURE_CONNECTION</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-cyan-500' : 'bg-cyan-500 animate-pulse'}`} />
                    <span>{isComplete ? 'Online' : 'Installing...'}</span>
                </div>
            </div>
        </div>
    );
}
