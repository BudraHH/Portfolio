import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaFileDownload } from 'react-icons/fa';
import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { CAREER_JOURNEY } from "../utils/constants.js";
import ResumeDownloadTerminal from '../components/ResumeDownloadTerminal.jsx';

const spinnerFrames = ["|", "/", "-", "\\"];

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

// Memoized Timeline Entry Component
const TimelineEntry = memo(({ item, idx, isSelected, onClick }) => {
    const Icon = item.icon;
    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={onClick}
            className={`w-full text-left p-2 xs:p-3 rounded-lg transition-all ${
                isSelected
                    ? 'bg-cyan-500/20 border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/10 hover:border-cyan-500/20'
            }`}
        >
            <div className="flex items-center gap-2 mb-1">
                <Icon className={`text-xs ${
                    item.type === 'education' ? 'text-blue-300' : 'text-cyan-300'
                }`} />
                <span className="text-cyan-100 text-xs font-semibold truncate">
                    {item.title}
                </span>
            </div>
            <p className="text-cyan-400/70 text-[10px] ml-5 truncate">{item.period}</p>
        </motion.button>
    );
});

TimelineEntry.displayName = 'TimelineEntry';

export default function CareerJourney({
                                          scrollProgress,
                                          sectionScrollRange,
                                          onScrollProgressChange // ✅ NEW: Add callback to update global scroll
                                      }) {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [showTimeline, setShowTimeline] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [showDownloadTerminal, setShowDownloadTerminal] = useState(false);

    const scrollRef = useRef(null);

    const selectedItem = useMemo(() => CAREER_JOURNEY[selectedIdx], [selectedIdx]);
    const spinnerFrame = useMemo(() => spinnerFrames[spinnerStep], [spinnerStep]);

    const terminalLines = useMemo(() => [
        "$ bash career-journey.sh --timeline",
        "Initializing timeline loader...",
        "PID: 3912",
        "[1/4] Fetching career data...",
        "[2/4] Parsing timeline entries...",
        "[3/4] Validating dates...",
        "[4/4] Rendering timeline...",
        `✓ Successfully loaded ${CAREER_JOURNEY.length} timeline entries`,
        "",
    ], []);

    const handleDownload = useCallback((e) => {
        e.preventDefault();
        setShowDownloadTerminal(true);
    }, []);

    const handleEntryClick = useCallback((idx) => {
        setSelectedIdx(idx);
    }, []);

    // ✅ NEW: Handle internal scroll and sync with global scroll
    const handleInternalScroll = useCallback((e) => {
        if (!scrollRef.current || !onScrollProgressChange || !sectionScrollRange) return;

        // Check if this scroll was triggered by global sync
        if (scrollRef.current.dataset.syncing === 'true') return;

        const scrollTop = scrollRef.current.scrollTop;
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;

        // Calculate local scroll progress (0 to 1)
        const maxScroll = scrollHeight - clientHeight;
        const localProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        // Map to global scroll range
        const [sectionStart, sectionEnd] = sectionScrollRange;
        const globalProgress = sectionStart + (localProgress * (sectionEnd - sectionStart));

        onScrollProgressChange(globalProgress);
    }, [onScrollProgressChange, sectionScrollRange]);

    // Spinner effect
    useEffect(() => {
        if (!isLoading) return;
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % 4), 70);
        return () => clearInterval(spinner);
    }, [isLoading]);

    // Terminal output animation
    useEffect(() => {
        let idx = 0;
        setOutput([]);
        setIsLoading(true);

        const interval = setInterval(() => {
            setOutput(prev => [...prev, terminalLines[idx]]);
            idx++;
            if (idx === terminalLines.length) {
                setTimeout(() => {
                    setIsLoading(false);
                    setShowTimeline(true);
                }, 400);
                clearInterval(interval);
            }
        }, 250);

        return () => clearInterval(interval);
    }, [terminalLines]);

    // Sync internal scroll with global scroll progress
    useEffect(() => {
        if (!scrollProgress || !sectionScrollRange || !scrollRef.current) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            const [sectionStart, sectionEnd] = sectionScrollRange;
            if (latest >= sectionStart && latest <= sectionEnd) {
                const localProgress = (latest - sectionStart) / (sectionEnd - sectionStart);
                const maxScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
                if (maxScroll > 0) {
                    scrollRef.current.dataset.syncing = 'true';
                    scrollRef.current.scrollTop = localProgress * maxScroll;
                    setTimeout(() => {
                        if (scrollRef.current) {
                            scrollRef.current.dataset.syncing = 'false';
                        }
                    }, 50);
                }
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, sectionScrollRange]);

    return (
        <section className="w-full h-full flex flex-col justify-center items-center
            relative ">

            <div className="relative w-full h-full
                rounded-lg xs:rounded-xl sm:rounded-2xl
                overflow-hidden font-mono text-white
                bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                border border-cyan-500/20">

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
                        career-journey.sh - timeline [PID: 3912]
                    </span>
                </div>

                {/* Content Area - ✅ ADD SCROLL HANDLER */}
                <div
                    ref={scrollRef}
                    onScroll={handleInternalScroll}
                    data-scrollable-content
                    data-syncing="false"
                    className="relative z-10 h-[calc(100%-2.5rem)] xs:h-[calc(100%-3rem)] sm:h-[calc(100%-3.5rem)]
                        overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
                >
                    {/* Terminal Output */}
                    <div className="px-3 xs:px-4 sm:px-5
                        py-3 xs:py-3.5 sm:py-4
                        text-xs xs:text-sm leading-relaxed text-cyan-100/75">
                        {output.map((line, idx) => (
                            <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                        ))}
                    </div>

                    {/* Timeline Section */}
                    {showTimeline && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="border-t border-cyan-500/20
                                py-3 xs:py-4 sm:py-5
                                px-3 xs:px-4 sm:px-5"
                        >
                            {/* Resume Download Button */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-3 xs:mb-4"
                            >
                                <button
                                    onClick={handleDownload}
                                    disabled={showDownloadTerminal}
                                    className="w-full group"
                                >
                                    <div className={`px-3 xs:px-4 sm:px-5 
                                        py-2.5 xs:py-3 
                                        bg-gradient-to-r from-cyan-800/15 to-blue-500/10 
                                        border border-cyan-600/40 
                                        rounded-lg xs:rounded-xl 
                                        transition-all shadow-lg
                                        ${showDownloadTerminal ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-500/60'}`}>
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 xs:gap-3 min-w-0">
                                                <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11
                                                    rounded-lg xs:rounded-xl flex-shrink-0
                                                    bg-gradient-to-br from-cyan-400/30 to-cyan-600/20
                                                    flex items-center justify-center
                                                    border border-cyan-400/40 transition-transform">
                                                    <FaFileDownload className={`text-cyan-300 text-base xs:text-lg ${!showDownloadTerminal && 'group-hover:animate-bounce'}`} />
                                                </div>
                                                <div className="flex flex-col justify-center items-start min-w-0">
                                                    <h3 className="text-cyan-100 font-bold text-xs xs:text-sm truncate w-full">Download Resume</h3>
                                                    <p className="text-cyan-400/70 text-[10px] xs:text-xs truncate w-full">PDF • Updated Nov 2025 • 2 pages</p>
                                                </div>
                                            </div>
                                            <div className="text-cyan-300 text-lg xs:text-xl group-hover:translate-x-1 transition-transform flex-shrink-0">
                                                →
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>

                            {/* Timeline Navigator Header */}
                            <div className="mb-3 xs:mb-4
                                px-3 xs:px-4 sm:px-5
                                py-2 xs:py-2.5 sm:py-3
                                bg-gradient-to-r from-[#08141b]/30 to-[#08141b]/20
                                rounded-lg xs:rounded-xl
                                border border-cyan-500/30 shadow-lg">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="text-cyan-300 font-bold text-xs xs:text-sm uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                                            <span className="truncate">Timeline Navigator</span>
                                        </div>
                                        <p className="text-cyan-500/70 text-[10px] xs:text-xs mt-1">{CAREER_JOURNEY.length} entries • Interactive view</p>
                                    </div>
                                    <div className="text-[10px] xs:text-xs text-cyan-400/60 font-mono flex-shrink-0">
                                        {selectedIdx + 1} / {CAREER_JOURNEY.length}
                                    </div>
                                </div>
                            </div>

                            {/* Split View */}
                            <div className="flex flex-col md:flex-row
                                rounded-lg xs:rounded-xl sm:rounded-2xl
                                mb-6 xs:mb-8 sm:mb-10
                                border border-cyan-500/20
                                min-h-[400px] xs:min-h-[450px] sm:min-h-[500px]">

                                {/* Left Sidebar */}
                                <div className="w-full md:w-60 lg:w-72
                                    border-b md:border-b-0 md:border-r border-cyan-500/20
                                    bg-[#08141b]/30
                                    rounded-t-lg md:rounded-t-none md:rounded-l-xl sm:rounded-l-2xl
                                    max-h-48 md:max-h-full overflow-y-auto">
                                    <div className="p-2 xs:p-3 space-y-1.5 xs:space-y-2">
                                        {CAREER_JOURNEY.map((item, idx) => (
                                            <TimelineEntry
                                                key={idx}
                                                item={item}
                                                idx={idx}
                                                isSelected={selectedIdx === idx}
                                                onClick={() => handleEntryClick(idx)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div className="flex-1 bg-[#08141b]/10 overflow-y-auto">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedIdx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="p-4 xs:p-5 sm:p-6 md:p-8"
                                        >
                                            <div className="flex flex-col xs:flex-row items-start justify-between gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6">
                                                <div className={`w-12 h-12 xs:w-14 xs:h-14 rounded-lg xs:rounded-xl flex items-center justify-center border-2 shadow-lg flex-shrink-0
                                                    ${selectedItem.type === 'education'
                                                    ? 'bg-blue-500/10 border-blue-400/50 shadow-blue-400/20'
                                                    : 'bg-cyan-500/10 border-cyan-400/50 shadow-cyan-400/20'
                                                }`}>
                                                    <selectedItem.icon className={`text-xl xs:text-2xl ${
                                                        selectedItem.type === 'education' ? 'text-blue-300' : 'text-cyan-300'
                                                    }`} />
                                                </div>
                                                <div className="flex items-center gap-2 text-cyan-300/80 text-[10px] xs:text-xs bg-cyan-500/10
                                                    px-2.5 xs:px-3 py-1.5 rounded-full border border-cyan-500/20 flex-shrink-0">
                                                    <FaCalendar className="text-[10px]" />
                                                    <span className="whitespace-nowrap">{selectedItem.period}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-cyan-100 mb-1.5 xs:mb-2 leading-tight">
                                                {selectedItem.title}
                                            </h2>
                                            <p className="text-cyan-300 text-base xs:text-lg font-medium mb-1">
                                                {selectedItem.organization}
                                            </p>
                                            <p className="text-cyan-400/70 text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6">
                                                {selectedItem.location}
                                            </p>

                                            <div className="h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent mb-4 xs:mb-5 sm:mb-6" />

                                            <h3 className="text-cyan-300 font-semibold mb-3 xs:mb-4 text-xs uppercase tracking-wider">
                                                Key Highlights
                                            </h3>
                                            <ul className="space-y-2 xs:space-y-3">
                                                {selectedItem.description.map((point, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="text-cyan-100/90 flex items-start gap-2 xs:gap-3 group"
                                                    >
                                                        <span className="text-cyan-400 text-xs xs:text-sm mt-0.5 group-hover:text-cyan-300 transition-colors flex-shrink-0">
                                                            ▸
                                                        </span>
                                                        <span className="leading-relaxed text-xs xs:text-sm group-hover:text-cyan-100 transition-colors">
                                                            {point}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Visual overlays - Combined */}
                <div className="absolute inset-0 pointer-events-none
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                    ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                    rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30" />
                <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
            </div>

            {/* Resume Download Terminal */}
            <ResumeDownloadTerminal
                isVisible={showDownloadTerminal}
                onClose={() => setShowDownloadTerminal(false)}
            />
        </section>
    );
}
