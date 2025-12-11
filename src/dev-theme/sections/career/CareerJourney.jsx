import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaCalendar } from "react-icons/fa";

// Career Journey Data
const CAREER_JOURNEY = [
    {
        type: 'experience',
        icon: FaBriefcase,
        title: 'Software Engineer',
        organization: 'Movate Technologies',
        location: 'Chennai, India',
        period: 'Jan 2023 - Present',
        duration: '2 years',
        description: [
            'Architected scalable microservices handling 1M+ requests/day',
            'Reduced deployment time by 60% through CI/CD automation',
            'Mentored 3 junior developers on React best practices',
            'Improved system performance by 40% through optimization'
        ]
    },
    {
        type: 'education',
        icon: FaGraduationCap,
        title: 'Bachelor of Technology in Computer Science',
        organization: 'University Name',
        location: 'City, Country',
        period: 'Aug 2019 - May 2023',
        duration: '4 years',
        description: [
            'Graduated with First Class Honors',
            'Led university tech club with 100+ members',
            'Published research paper on Machine Learning applications'
        ]
    }
];

const TimelineEntry = ({ item, idx, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-2.5 xs:px-3 py-2 xs:py-2.5 rounded-lg xs:rounded-xl transition-all
                ${isSelected
                    ? 'bg-cyan-500/20 border-l-2 border-cyan-400 shadow-lg'
                    : 'hover:bg-cyan-500/10 border-l-2 border-transparent'
                }`}
        >
            <div className="flex items-start gap-2">
                <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${item.type === 'education'
                        ? 'bg-blue-500/10 border border-blue-400/30'
                        : 'bg-cyan-500/10 border border-cyan-400/30'
                    }`}>
                    <item.icon className={`text-xs xs:text-sm ${item.type === 'education' ? 'text-blue-300' : 'text-cyan-300'
                        }`} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-[10px] xs:text-xs truncate
                        ${isSelected ? 'text-cyan-100' : 'text-cyan-300'}`}>
                        {item.title}
                    </h4>
                    <p className="text-cyan-400/70 text-[9px] xs:text-[10px] truncate">
                        {item.organization}
                    </p>
                    <p className="text-cyan-500/60 text-[8px] xs:text-[9px] mt-0.5">
                        {item.period}
                    </p>
                </div>
            </div>
        </button>
    );
};

const TerminalLine = ({ line, spinnerFrame }) => {
    if (line.type === 'spinner') {
        return (
            <div className="flex items-center gap-2 text-cyan-400">
                <span className="animate-spin">{spinnerFrame}</span>
                <span>{line.text}</span>
            </div>
        );
    }
    return <div className="text-cyan-100/75">{line.text}</div>;
};

export default function CareerJourney({ onClose, onMinimize, onMaximize, pid, launchParams }) {
    const displayPid = launchParams?.pid || pid || '5432';
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [showTimeline, setShowTimeline] = useState(false);
    const [output, setOutput] = useState([]);
    const [spinnerFrame, setSpinnerFrame] = useState('⠋');
    const [loadProgress, setLoadProgress] = useState(0);

    const scrollRef = useRef(null);

    const selectedItem = CAREER_JOURNEY[selectedIdx];
    const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

    useEffect(() => {
        // Track all timeouts for cleanup
        const timeoutIds = [];

        // Spinner animation
        const spinnerInterval = setInterval(() => {
            setSpinnerFrame(prev => {
                const idx = spinnerFrames.indexOf(prev);
                return spinnerFrames[(idx + 1) % spinnerFrames.length];
            });
        }, 80);

        // Loading progress simulation
        let progressInterval;
        const startLoading = () => {
            progressInterval = setInterval(() => {
                setLoadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    // Random increment for realistic 'data chunk' loading effect
                    return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
                });
            }, 50); // Speed of loading
        };

        const loadTimer = setTimeout(startLoading, 300); // Initial delay before load starts
        timeoutIds.push(loadTimer);

        // Terminal output sequence
        const sequence = [
            { delay: 0, line: { type: 'text', text: '$ ./career-journey.sh' } },
            { delay: 300, line: { type: 'text', text: '[INFO] Initializing career timeline...' } },
            { delay: 600, line: { type: 'spinner', text: 'Loading experience and education data...' } },
            { delay: 1200, line: { type: 'text', text: `[SUCCESS] Loaded ${CAREER_JOURNEY.length} timeline entries` } },
            { delay: 1500, line: { type: 'text', text: '[INFO] Rendering interactive timeline viewer...' } },
            { delay: 1800, line: { type: 'text', text: '✓ Timeline ready' } }
        ];

        sequence.forEach(({ delay, line }) => {
            const timeoutId = setTimeout(() => {
                setOutput(prev => [...prev, line]);
            }, delay);
            timeoutIds.push(timeoutId);
        });

        const timelineTimeout = setTimeout(() => {
            setShowTimeline(true);
        }, 2000);
        timeoutIds.push(timelineTimeout);

        return () => {
            clearInterval(spinnerInterval);
            clearInterval(progressInterval);
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    const handleEntryClick = (idx) => {
        setSelectedIdx(idx);
    };

    const handleInternalScroll = () => {
        // Scroll handler placeholder
    };



    return (
        <div className="relative h-full w-full
            rounded-lg xs:rounded-xl sm:rounded-2xl
            overflow-hidden font-mono text-white
            bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
            backdrop-blur-[24px] backdrop-brightness-75
            border border-cyan-500/20 flex flex-col">

            {/* Header */}
            <div className="window-drag-handle flex items-center gap-1.5 xs:gap-2
                px-2 xs:px-3 sm:px-4
                py-2 xs:py-2.5 sm:py-3
                bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                border-b border-cyan-500/20 cursor-grab active:cursor-grabbing shrink-0">
                <div className="flex gap-2 group/controls" onMouseDown={(e) => e.stopPropagation()}>
                    <button
                        onClick={onClose}
                        className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)] hover:bg-red-600 transition-colors"
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-red-900">×</span>
                    </button>
                    <button
                        onClick={onMinimize}
                        className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] hover:bg-yellow-500 transition-colors"
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-yellow-900">−</span>
                    </button>
                    <button
                        onClick={onMaximize}
                        className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)] hover:bg-green-600 transition-colors"
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-green-900">+</span>
                    </button>
                </div>
                <span className="ml-2 xs:ml-3 text-[10px] xs:text-xs sm:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                    career-journey.sh - timeline [PID: {displayPid}]
                </span>
            </div>

            {/* Content Area */}
            <div
                ref={scrollRef}
                onScroll={handleInternalScroll}
                data-scrollable-content
                data-syncing="false"
                className="relative z-10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
            >
                {/* Terminal Output */}
                <div className="px-3 xs:px-4 sm:px-5
                    py-3 xs:py-3.5 sm:py-4
                    text-xs xs:text-sm leading-relaxed text-cyan-100/75">
                    {output.map((line, idx) => (
                        <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                    ))}

                    {/* Loading Progress Bar */}
                    {loadProgress < 100 && (
                        <div className="mt-4 space-y-2">
                            <div className="text-cyan-400/70 text-xs font-mono">
                                Loading data... {loadProgress}%
                            </div>
                            <div className="w-full max-w-md bg-gray-800/50 rounded-full h-2 overflow-hidden border border-cyan-500/30">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadProgress}%` }}
                                    transition={{ duration: 0.1 }}
                                    style={{
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 2s infinite linear'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Shimmer animation */}
                <style jsx>{`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>

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
                                                <selectedItem.icon className={`text-xl xs:text-2xl ${selectedItem.type === 'education' ? 'text-blue-300' : 'text-cyan-300'
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

            {/* Terminal Footer */}
            <div className="h-6 bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6] border-t border-cyan-500/20 flex items-center px-4 text-[10px] text-cyan-400/60 shrink-0">
                <span>session_id: 0x{displayPid}</span> <span className="mx-2">|</span> <span>entries: {CAREER_JOURNEY.length}</span>
            </div>

            {/* Visual overlays */}
            <div className="absolute inset-0 pointer-events-none
                bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30" />
            <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
        </div>
    );
}

