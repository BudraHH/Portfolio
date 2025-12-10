import React, { useState, useEffect, useMemo } from 'react';

const DevWelcome = ({ onComplete, setShowGUI }) => {
    const [visibleLines, setVisibleLines] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showSpinner, setShowSpinner] = useState(true);
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [bootMode, setBootMode] = useState(null); // 'manual' or 'automatic'

    const bootMessages = useMemo(() => [
        '',
        '    >>> Setting things up for you...',
        '    >>> Getting to know your screen...',
        '    >>> Preparing a smooth experience...',
        '    >>> Loading about me...',
        '    >>> Loading projects I\'ve built...',
        '    >>> Loading the technologies I work with...',
        '    >>> Loading my experience...',
        '    >>> Connecting to GitHub...',
        '    >>> Getting contact options ready...',
        '    >>> Adding final visual touches...',
        '    >>> Almost there...',
        '',
        '    ✓ Everything is ready!',
        '    ✓ Enjoy exploring my portfolio.',
        '',
    ], []);

    const PAUSE_INDEX = 13; // Index of the first Checkmark message (empty line before it is 12)

    // Detect low-power mode or mobile devices
    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setIsLowPowerMode(isMobile || isReducedMotion);
    }, []);

    useEffect(() => {
        // Pause before showing the success messages
        if (visibleLines === PAUSE_INDEX && !bootMode && !isPaused) {
            setIsPaused(true);
            return;
        }

        if (isPaused) return;

        if (visibleLines < bootMessages.length) {
            const timer = setTimeout(() => {
                setVisibleLines(visibleLines + 1);
                setProgress(Math.min(100, (visibleLines / bootMessages.length) * 100));
            }, 60);
            return () => clearTimeout(timer);
        } else {
            setShowSpinner(false);
            const fadeTimer = setTimeout(() => {
                setFadeOut(true);
                setShowGUI(true)
            }, 1000);

            const completeTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1800);

            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(completeTimer);
            };
        }
    }, [visibleLines, bootMessages.length, onComplete, isPaused, bootMode]);

    const handleContinue = (mode) => {
        setBootMode(mode);
        setIsPaused(false);
    };

    const getLineStyle = (message) => {
        if (message.includes('✓')) {
            return 'text-emerald-400 font-bold';
        }
        if (message.includes('>>>')) {
            return 'text-cyan-500';
        }
        return 'text-cyan-500/80';
    };

    return (
        <div
            className={`fixed inset-0 bg-black font-mono overflow-hidden z-[9999] transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Optimized background - reduced particle count and removed expensive effects on mobile */}
            {!isLowPowerMode && (
                <>
                    <div className="absolute inset-0 opacity-20">
                        {/* Reduced floating particles from 40 to 12 */}
                        <div className="absolute w-full h-full">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: '2px',
                                        height: '2px',
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        background: '#06b6d4',
                                        opacity: 0.6,
                                        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                        animationDelay: `${Math.random() * 5}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Simplified scanline - removed blur for performance */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                        <div
                            className="absolute w-full h-1 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-scan"
                            style={{ animationDuration: '6s' }}
                        />
                    </div>
                </>
            )}

            {/* Static grid pattern - more performant than animated particles */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Vignette effect */}
            <div className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
                }}
            />

            {/* Main content */}
            <div className="relative flex items-center justify-center min-h-screen p-4 sm:p-8">
                <div className="w-full max-w-4xl">
                    {/* Enhanced acrylic card */}
                    <div className="backdrop-blur-2xl bg-black/40 rounded-3xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] p-6 sm:p-10 transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_80px_rgba(6,182,212,0.3)] min-h-[500px] flex flex-col">
                        {/* Logo or header animation */}
                        <div className="flex justify-center mb-6 shrink-0">
                            <div className="relative">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping absolute"></div>
                                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Boot messages */}
                        <div className="text-sm sm:text-base leading-relaxed space-y-1.5 overflow-y-auto custom-scrollbar flex-1">
                            {bootMessages.slice(0, visibleLines).map((message, index) => (
                                <div
                                    key={index}
                                    className={`whitespace-pre animate-slideIn ${getLineStyle(message)} transition-all duration-300`}
                                    style={{ animationDelay: `${index * 0.03}s` }}
                                >
                                    {message}
                                </div>
                            ))}

                            {/* Typing cursor */}
                            {visibleLines < bootMessages.length && !isPaused && (
                                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-blink shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                            )}
                        </div>

                        {/* User Interaction Breakpoint */}
                        {isPaused && (
                            <div className="flex flex-col items-center justify-center gap-6 my-8 animate-fadeIn">
                                <h3 className="text-cyan-300 text-lg font-bold tracking-wide">Select Boot Mode</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleContinue('manual')}
                                        className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all duration-300 font-mono text-sm group"
                                    >
                                        <span className="w-2 h-2 inline-block bg-cyan-400 rounded-full mr-2 group-hover:animate-pulse"></span>
                                        Manual Mode
                                    </button>
                                    <button
                                        onClick={() => handleContinue('automatic')}
                                        className="px-6 py-3 bg-transparent border border-cyan-500/30 rounded-xl text-cyan-500/80 hover:bg-cyan-500/5 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 font-mono text-sm"
                                    >
                                        Automatic Mode
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Enhanced spinning dots loader */}
                        {showSpinner && !isPaused && visibleLines < bootMessages.length && (
                            <div className="flex justify-center items-center mt-8 mb-4 shrink-0">
                                <div className="flex space-x-2.5">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-3 h-3 bg-cyan-400 rounded-full animate-winDot shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                                            style={{
                                                animationDelay: `${i * 0.15}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Enhanced progress bar */}
                        {visibleLines < bootMessages.length && (
                            <div className="mt-8 space-y-3 shrink-0">
                                <div className="flex justify-between text-xs sm:text-sm text-cyan-400 font-semibold">
                                    <span className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 bg-cyan-400 rounded-full ${!isPaused ? 'animate-pulse' : ''}`}></span>
                                        {isPaused ? 'Paused' : 'Loading...'}
                                    </span>
                                    <span className="tabular-nums">{Math.floor(progress)}%</span>
                                </div>
                                <div className="relative h-2 bg-black/60 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-900/40 shadow-inner">
                                    <div
                                        className="absolute inset-0 h-full bg-cyan-400 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                                        style={{ width: `${progress}%` }}
                                    >
                                        {!isPaused && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-shimmer" />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Completion message */}
                        {visibleLines === bootMessages.length && !showSpinner && (
                            <div className="mt-6 text-center animate-fadeInUp shrink-0">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-400/30">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                    <span className="text-cyan-300 text-sm font-semibold">System Ready</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced corner HUD elements */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 space-y-2 animate-slideInLeft">
                <div className="backdrop-blur-xl bg-black/60 px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <div className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                        PORTFOLIO
                    </div>
                    <div className="text-cyan-600 text-[10px] sm:text-xs mt-0.5">v2.5.0</div>
                </div>
            </div>

            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 animate-slideInRight">
                <div className="backdrop-blur-xl bg-black/60 px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center gap-2">
                    <div className="relative">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-cyan-400 text-xs sm:text-sm font-semibold">ONLINE</span>
                </div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
                <div className="backdrop-blur-xl bg-black/60 px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <div className="text-cyan-400 text-[10px] sm:text-xs space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-500">▸</span>
                            <span>React + Tailwind</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
                <div className="backdrop-blur-xl bg-black/60 px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs">
                        <span className="font-semibold">CONNECTION</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-0.5 bg-cyan-400 rounded-sm animate-pulse"
                                    style={{
                                        height: `${i * 2.5}px`,
                                        animationDelay: `${i * 0.1}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevWelcome;
