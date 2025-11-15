import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';

const spinnerFrames = ["|", "/", "-", "\\"];

const TERMINAL_LINES = [
    "$ ./portfolio-session.sh --close",
    "Closing portfolio session...",
    "PID: 9999",
    "[1/3] Saving session data...",
    "[2/3] Cleaning up resources...",
    "[3/3] Generating summary...",
    "✓ Portfolio session completed successfully",
    "",
];

const SOCIAL_LINKS = [
    {
        href: "https://github.com/yourusername",
        Icon: FaGithub,
        title: "GitHub",
        subtitle: "View my code",
        gradient: "from-cyan-400/30 to-cyan-600/20",
        borderColor: "border-cyan-400/40"
    },
    {
        href: "https://linkedin.com/in/yourusername",
        Icon: FaLinkedin,
        title: "LinkedIn",
        subtitle: "Let's connect",
        gradient: "from-blue-400/30 to-blue-600/20",
        borderColor: "border-blue-400/40"
    },
    {
        href: "mailto:your.email@example.com",
        Icon: FaEnvelope,
        title: "Email",
        subtitle: "Send a message",
        gradient: "from-green-400/30 to-green-600/20",
        borderColor: "border-green-400/40"
    }
];

// Memoized Terminal Line
const TerminalLine = memo(({ line, spinnerFrame }) => {
    if (!line || typeof line !== "string") return null;

    if (line.startsWith("$")) return <div className="text-cyan-300 mb-1">{line}</div>;
    if (line.startsWith("✓")) return <div className="text-green-400 mb-1">{line}</div>;
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

// Memoized Social Link
const SocialLink = memo(({ href, Icon, title, subtitle, gradient, borderColor, delay }) => (
    <motion.a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 xs:gap-3
            p-2.5 xs:p-3 sm:p-4
            bg-cyan-500/10 border border-cyan-500/20
            rounded-lg xs:rounded-xl
            hover:bg-cyan-500/20 hover:border-cyan-400/40
            transition-all touch-manipulation"
    >
        <div className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 
            rounded-lg bg-gradient-to-br ${gradient} 
            flex items-center justify-center border ${borderColor} 
            group-hover:scale-110 transition-transform flex-shrink-0`}>
            <Icon className="text-cyan-300 text-base xs:text-lg sm:text-xl" />
        </div>
        <div className="min-w-0">
            <h3 className="text-cyan-100 font-semibold text-xs xs:text-sm truncate">{title}</h3>
            <p className="text-cyan-400/70 text-[9px] xs:text-[10px] sm:text-xs truncate">{subtitle}</p>
        </div>
    </motion.a>
));

SocialLink.displayName = 'SocialLink';

export default function Closing({ onSessionEnd }) {
    const [output, setOutput] = useState([]);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [typedCommand, setTypedCommand] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isKilling, setIsKilling] = useState(false);
    const [showComponent, setShowComponent] = useState(true);

    const killCommand = useMemo(() => 'kill -9 9999', []);
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    const spinnerFrame = useMemo(() => spinnerFrames[spinnerStep], [spinnerStep]);

    // Spinner effect
    useEffect(() => {
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % 4), 70);
        return () => clearInterval(spinner);
    }, []);

    // Terminal output animation
    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => {
            setOutput(prev => [...prev, TERMINAL_LINES[idx]]);
            idx++;
            if (idx === TERMINAL_LINES.length) {
                clearInterval(interval);
                setTimeout(() => setShowContent(true), 400);
            }
        }, 250);

        return () => clearInterval(interval);
    }, []);

    // Auto-type kill command
    useEffect(() => {
        if (!showContent) return;

        const startTypingTimeout = setTimeout(() => {
            setIsTyping(true);
            let idx = 0;

            const typingInterval = setInterval(() => {
                if (idx < killCommand.length) {
                    setTypedCommand(killCommand.substring(0, idx + 1));
                    idx++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        setIsKilling(true);
                        setTimeout(() => {
                            setShowComponent(false);
                            onSessionEnd?.();
                        }, 1500);
                    }, 200);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }, 3500);

        return () => clearTimeout(startTypingTimeout);
    }, [showContent, killCommand, onSessionEnd]);

    const containerVariants = useMemo(() => ({
        initial: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 1.5 } }
    }), []);

    const terminalVariants = useMemo(() => ({
        animate: {
            scale: isKilling ? 0.95 : 1,
            opacity: isKilling ? 0 : 1,
            transition: { duration: 1.5 }
        }
    }), [isKilling]);

    return (
        <AnimatePresence>
            {showComponent && (
                <motion.section
                    variants={containerVariants}
                    initial="initial"
                    exit="exit"
                    className="w-full h-full flex flex-col justify-center items-center
                        relative "
                >
                    <motion.div
                        variants={terminalVariants}
                        animate="animate"
                        className="relative w-full
                            max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-[70rem]
                            rounded-lg xs:rounded-xl sm:rounded-2xl
                            overflow-hidden font-mono text-white
                            bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                            backdrop-blur-[24px] backdrop-brightness-75
                            border border-cyan-500/20
                            shadow-[0_0_40px_rgba(0,255,255,0.15)]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-1.5 xs:gap-2
                            px-2 xs:px-3 sm:px-4
                            py-1.5 xs:py-2 sm:py-3
                            bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                            border-b border-cyan-500/20">
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                            <span className="ml-1.5 xs:ml-2 sm:ml-3 text-[10px] xs:text-xs sm:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                                portfolio-session.sh - closing [PID: 9999]
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8">
                            {/* Terminal Output */}
                            <div className="mb-3 xs:mb-4 sm:mb-6 text-[10px] xs:text-xs sm:text-sm leading-relaxed text-cyan-100/75">
                                {output.map((line, idx) => (
                                    <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                                ))}
                            </div>

                            {/* Main Content */}
                            {showContent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8"
                                >
                                    {/* Closing Message */}
                                    <div className="text-center space-y-2 xs:space-y-3 sm:space-y-4
                                        py-4 xs:py-5 sm:py-6 md:py-8
                                        border-y border-cyan-500/20">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 text-cyan-300"
                                        >
                                            <FaTerminal className="text-lg xs:text-xl sm:text-2xl md:text-3xl" />
                                            <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold">
                                                Thanks for Visiting!
                                            </span>
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-cyan-200/80 text-xs xs:text-sm sm:text-base
                                                max-w-2xl mx-auto leading-relaxed px-2 xs:px-3 sm:px-4"
                                        >
                                            I appreciate you taking the time to explore my portfolio.
                                            If you'd like to collaborate, discuss opportunities, or just say hi,
                                            feel free to reach out through any of the channels below.
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex flex-wrap items-center justify-center gap-1 xs:gap-1.5 sm:gap-2
                                                text-cyan-400/70 text-[10px] xs:text-xs sm:text-sm px-2"
                                        >
                                            <span>Built with</span>
                                            <FaHeart className="text-red-400 animate-pulse" />
                                            <span>using React, Framer Motion & Tailwind CSS</span>
                                        </motion.div>
                                    </div>

                                    {/* Quick Links */}
                                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                                        {SOCIAL_LINKS.map((link, idx) => (
                                            <SocialLink key={link.title} {...link} delay={0.8 + idx * 0.1} />
                                        ))}
                                    </div>

                                    {/* Terminal Command Prompt */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.0 }}
                                        className="pt-3 xs:pt-4 sm:pt-6 border-t border-cyan-500/20"
                                    >
                                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm font-mono">
                                            <span className="text-cyan-400 flex-shrink-0">visitor@portfolio:~$</span>
                                            <div className="flex items-center text-cyan-300 min-w-0">
                                                <span className="truncate">{typedCommand}</span>
                                                {isTyping && !isKilling && (
                                                    <motion.span
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{ duration: 1, repeat: Infinity }}
                                                        className="inline-block w-1.5 xs:w-2 sm:w-2.5
                                                            h-3 xs:h-3.5 sm:h-4
                                                            bg-cyan-400 ml-0.5 xs:ml-1
                                                            shadow-[0_0_8px_rgba(34,211,238,0.6)] flex-shrink-0"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {isKilling && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-1.5 xs:mt-2 text-red-400 text-[9px] xs:text-[10px] sm:text-xs"
                                            >
                                                [1]  + 9999 terminated  portfolio-session.sh
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Copyright */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="text-center text-cyan-400/50 text-[9px] xs:text-[10px] sm:text-xs space-y-0.5 xs:space-y-1"
                                    >
                                        <p>© {currentYear} Hari Hara Budra. All rights reserved.</p>
                                        <p>Designed & Developed with passion in India 🇮🇳</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>

                        {/* Visual overlays - Combined */}
                        <div className="absolute inset-0 pointer-events-none
                            bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                            ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                            rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30"
                        />
                        <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
