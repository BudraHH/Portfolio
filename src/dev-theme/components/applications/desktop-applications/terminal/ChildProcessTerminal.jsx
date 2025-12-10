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
                    }

                }, delay);
            });

            // Initial message
            setHistory([{ type: 'output', content: "Initializing automated task..." }]);
        }
    }, [launchParams]);

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

    // Theme consts (CYAN)
    const borderColor = "border-cyan-500/30";
    const headerFrom = "from-[#0a1520]";
    const headerTo = "to-[#0f1c29]";
    const iconColor = "text-cyan-500";
    const textColor = "text-cyan-400";

    return (
        <div
            className={`w-full h-full flex flex-col font-mono text-sm bg-[#050a0f] rounded-lg overflow-hidden border ${borderColor} shadow-[0_0_20px_rgba(34,211,238,0.1)] relative transition-colors duration-300`}
        >
            {/* CRT/Scanline Overlay (Cyan tint) */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(34,211,238,0.03),rgba(0,0,0,0.02),rgba(34,211,238,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />

            {/* Header / Title Bar */}
            <div className={`window-drag-handle h-10 flex items-center px-3 bg-gradient-to-r ${headerFrom} ${headerTo} border-b ${borderColor} select-none shrink-0 z-30 justify-between`}>
                <div className="flex gap-2 group/controls" onMouseDown={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-black/50">×</span>
                    </button>
                    <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-black/50">−</span>
                    </button>
                    <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-black/50">+</span>
                    </button>
                </div>

                {/* Center Title with Spinner/Check */}
                <div className={`flex items-center gap-2 ${textColor} text-xs font-bold tracking-wide opacity-90`}>
                    {!isComplete ? (
                        <span className="text-cyan-400 animate-pulse">{spinnerFrames[spinnerStep]}</span>
                    ) : (
                        <FaCheckCircle className="text-cyan-400" />
                    )}
                    <span>PACKAGE MANAGED</span>
                </div>

                {/* PID */}
                <div className="text-[10px] text-cyan-600 font-mono">
                    PID:{launchParams?.pid || pid || '0000'}
                </div>
            </div>

            {/* Progress Bar (Cyan) */}
            {!isComplete && (
                <div className="h-[2px] w-full bg-cyan-900/30">
                    <div
                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

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
