import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WELCOME_TEXT = `<Welcome to My Digital Canvas />`;
const TYPING_SPEED = 80;
const INITIAL_DELAY = 200;
const EXIT_DELAY = 2500;
const PROGRESS_DURATION = 2000; // 2 seconds for progress bar

export default function Welcome({ onComplete }) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleComplete = useCallback(() => {
        setTimeout(() => onComplete?.(), 800);
    }, [onComplete]);

    // Typing animation
    useEffect(() => {
        let index = 0;

        const initialTimer = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (index <= WELCOME_TEXT.length) {
                    setDisplayText(WELCOME_TEXT.slice(0, index));
                    index++;
                } else {
                    clearInterval(typingInterval);
                    setShowCursor(false);

                    // Trigger exit after delay
                    setTimeout(() => {
                        setIsExiting(true);
                        handleComplete();
                    }, EXIT_DELAY);
                }
            }, TYPING_SPEED);

            return () => clearInterval(typingInterval);
        }, INITIAL_DELAY);

        return () => clearTimeout(initialTimer);
    }, [handleComplete]);

    // Progress bar animation
    useEffect(() => {
        if (displayText.length !== WELCOME_TEXT.length) return;

        let startTime = null;
        let animationFrame = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const newProgress = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        // Start animation after a short delay
        const timer = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, 500);

        return () => {
            clearTimeout(timer);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [displayText.length]);

    const containerVariants = useMemo(() => ({
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    }), []);

    // Generate progress bar display
    const progressBar = useMemo(() => {
        const totalBlocks = 24;
        const filledBlocks = Math.floor((progress / 100) * totalBlocks);
        const filled = '█'.repeat(filledBlocks);
        const empty = '░'.repeat(totalBlocks - filledBlocks);
        return `[${filled}${empty}] ${Math.floor(progress)}%`;
    }, [progress]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center
                        p-8 md:p-16"
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                             style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Main content container */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative z-10
                            w-full h-full flex flex-col justify-center items-center
                            rounded-lg xs:rounded-xl sm:rounded-2xl
                            overflow-hidden
                            bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)]
                            backdrop-blur-[24px] backdrop-brightness-75
                            border border-cyan-500/20
                            shadow-[0_0_10px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.05)]
                            "
                    >
                        {/* Content area */}
                        <div className="relative p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16
                            flex flex-col items-center justify-center
                            min-h-[50vh] xs:min-h-[45vh] sm:min-h-[40vh] md:min-h-[35vh]">

                            {/* Welcome text with typing effect */}
                            <div className="relative inline-block mb-4 xs:mb-6 sm:mb-8">
                                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                                    font-mono font-bold text-cyan-400 text-center
                                    drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]
                                    tracking-tight xs:tracking-normal leading-none">
                                    {displayText}
                                    {showCursor && (
                                        <motion.span
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                                            className="inline-block ml-[0.1em]
                                                w-[0.5em] h-[1em]
                                                bg-cyan-400
                                                shadow-[0_0_10px_rgba(34,211,238,0.6)]
                                                align-baseline"
                                        />
                                    )}
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: displayText.length === WELCOME_TEXT.length ? 1 : 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] xs:text-xs sm:text-sm md:text-base
                                    text-cyan-300/70 font-mono tracking-wide mb-6 xs:mb-8 sm:mb-10"
                            >
                                $ Initializing portfolio experience...
                            </motion.p>

                            {/* Loading indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: displayText.length === WELCOME_TEXT.length ? 1 : 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="flex items-center gap-2 xs:gap-3"
                            >
                                {[0, 0.15, 0.3].map((delay, idx) => (
                                    <motion.div
                                        key={idx}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay,
                                            ease: "easeInOut"
                                        }}
                                        className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                                    />
                                ))}
                            </motion.div>

                            {/* Animated Terminal-style progress */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: displayText.length === WELCOME_TEXT.length ? 1 : 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="mt-8 xs:mt-10 sm:mt-12 text-[9px] xs:text-[10px] sm:text-xs font-mono"
                            >
                                <span className={progress < 100 ? "text-cyan-400/70" : "text-green-600/50"}>
                                    {progressBar}
                                </span>
                            </motion.div>
                        </div>

                        {/* Visual overlays - Combined */}
                        <div className="absolute inset-0 pointer-events-none
                            bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                            ring-1 ring-cyan-400/10
                            shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                            rounded-lg xs:rounded-xl sm:rounded-2xl
                            mix-blend-overlay opacity-30" />
                        <div className="absolute inset-0
                        bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)]
                        bg-[size:40px_40px] xs:bg-[size:50px_50px] sm:bg-[size:60px_60px] md:bg-[size:80px_80px]
                        pointer-events-none" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
