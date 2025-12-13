import profile_image from "../../assets/image_color.png";
import TypedText from "../components/TypedText.jsx";
import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Hero = memo(function Hero({ onClose, onMinimize, onMaximize, pid, launchParams }) {
    const displayPid = launchParams?.pid || pid || '1337';
    const [showSecondTyped, setShowSecondTyped] = useState(false);
    const [showThirdTyped, setShowThirdTyped] = useState(false);
    const [showFourthTyped, setShowFourthTyped] = useState(false);
    const [showFirstTyped, setShowFirstTyped] = useState(false);

    const handleWhoamiTypedComplete = useCallback(() => setShowFirstTyped(true), []);
    const handleFirstTypedComplete = useCallback(() => setShowSecondTyped(true), []);
    const handleSecondTypedComplete = useCallback(() => setShowThirdTyped(true), []);
    const handleThirdTypedComplete = useCallback(() => setShowFourthTyped(true), []);

    // Memoize strings to prevent re-renders
    const whoamiStrings = useMemo(() => ["whoami"], []);
    const introStrings = useMemo(() => ["Hey there, I am"], []);
    const firstNameStrings = useMemo(() => ["Hari"], []);
    const middleNameStrings = useMemo(() => ["Hara"], []);
    const lastNameStrings = useMemo(() => ["Budra"], []);

    // Mouse parallax effect - only on desktop
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 80 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 80 });

    useEffect(() => {
        // Skip parallax on mobile/tablet for performance
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) / 50);
            mouseY.set((clientY - innerHeight / 2) / 50);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Loading simulation for image data
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        let interval;
        // Start loading simulation slightly delayed or immediately
        const startLoading = () => {
            interval = setInterval(() => {
                setLoadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Random increment for realistic 'data chunk' loading effect
                    return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
                });
            }, 50); // Speed of loading
        };

        const timer = setTimeout(startLoading, 500); // Initial delay before load starts

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section className="relative h-full w-full bg-[#0a0f14] font-mono overflow-hidden flex flex-col">
            {/* Terminal Header */}
            <div className="window-drag-handle flex items-center justify-between px-4 py-2 bg-[#1a1f24] border-b border-cyan-800/50 text-xs sm:text-sm select-none shrink-0 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-4">
                    {/* Traffic Lights */}
                    <div className="flex gap-2 group/controls" onMouseDown={(e) => e.stopPropagation()}>
                        <button
                            onClick={onClose}
                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                        >
                            <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-red-900">×</span>
                        </button>
                        <button
                            onClick={onMinimize}
                            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
                        >
                            <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-yellow-900">−</span>
                        </button>
                        <button
                            onClick={onMaximize}
                            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                        >
                            <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-green-900">+</span>
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 border-l border-cyan-800/30 pl-4">
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-500 font-bold">SCRIPT:</span>
                            <span className="text-cyan-300/80">profile_init.sh</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-cyan-500 font-bold">PID:</span>
                            <span className="text-cyan-300/80">{displayPid}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-2 py-0.5 rounded bg-cyan-900/20 border border-cyan-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 font-bold tracking-wider">RUNNING</span>
                    </span>
                </div>
            </div>

            {/* Main Terminal Area */}
            <div className="relative flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">

                {/* Background Grid & Effects */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: 'center'
                    }}
                />
                {/* Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] mix-blend-overlay z-0" />


                <div className="relative z-10 flex flex-row justify-between items-center h-full ">

                    {/* Left: Script Output Log */}
                    <div className="flex flex-col space-y-6 flex-1 pr-8">
                        {/* Line 01 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-cyan-600/50 text-sm">
                                <span>[00:00:01]</span>
                                <span>INFO</span>
                                <span>Initializing user context...</span>
                            </div>
                            <div className="pl-4 border-l-2 border-cyan-800/30">
                                <div className="text-xl sm:text-2xl text-cyan-300 flex items-center gap-2">
                                    <span className="text-cyan-500">$</span>
                                    <TypedText
                                        strings={whoamiStrings}
                                        showCursor={false}
                                        loop={false}
                                        startDelay={200}
                                        onComplete={handleWhoamiTypedComplete}
                                        typeSpeed={50}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Line 02 */}
                        {showFirstTyped && (
                            <div className="space-y-2 animate-fadeIn">
                                <div className="flex items-center gap-3 text-cyan-600/50 text-sm">
                                    <span>[00:00:02]</span>
                                    <span>SUCCESS</span>
                                    <span>Identity verified.</span>
                                </div>
                                <div className="pl-4 border-l-2 border-cyan-800/30">
                                    <div className="text-2xl sm:text-3xl text-gray-200 font-light">
                                        <TypedText
                                            strings={introStrings}
                                            showCursor={false}
                                            loop={false}
                                            startDelay={200}
                                            onComplete={handleFirstTypedComplete}
                                            typeSpeed={40}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Line 03: Name Block */}
                        <div className="flex flex-wrap items-end gap-x-4 gap-y-2 py-4">
                            {showSecondTyped && (
                                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-slideRn">
                                    <TypedText
                                        strings={firstNameStrings}
                                        startDelay={0}
                                        loop={false}
                                        showCursor={false}
                                        onComplete={handleSecondTypedComplete}
                                        typeSpeed={80} // Faster name
                                    />
                                </div>
                            )}
                            {showThirdTyped && (
                                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-slideIn">
                                    <TypedText
                                        strings={middleNameStrings}
                                        startDelay={0}
                                        loop={false}
                                        showCursor={false}
                                        onComplete={handleThirdTypedComplete}
                                        typeSpeed={80}
                                    />
                                </div>
                            )}
                            {showFourthTyped && (
                                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cyan-400 animate-slideIn drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                    <TypedText
                                        strings={lastNameStrings}
                                        showCursor={false}
                                        startDelay={0}
                                        loop={false}
                                        typeSpeed={80}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Line 04: Badges */}
                        {showFourthTyped && (
                            <div className="space-y-3 pt-4 border-t border-cyan-800/30 animate-fadeIn">
                                <div className="flex items-center gap-2 text-cyan-400/80 font-mono text-sm sm:text-base">
                                    <span className="text-green-500">✓</span>
                                    <span>Role:</span>
                                    <span className="bg-cyan-900/30 px-2 py-0.5 rounded text-cyan-200">Full-Stack Developer</span>
                                </div>
                                <div className="flex items-center gap-2 text-cyan-400/80 font-mono text-sm sm:text-base">
                                    <span className="text-green-500">✓</span>
                                    <span>Status:</span>
                                    <span className="bg-cyan-900/30 px-2 py-0.5 rounded text-cyan-200">Available for Opportunities</span>
                                </div>
                            </div>
                        )}
                    </div>




                    {/* Right: Asset Loading Simulation */}
                    <div className="relative group w-[40%] max-w-[50%] shrink-0">
                        {/* Decor elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl" />

                        {/* Image Frame */}
                        <div className="relative border border-cyan-800/50 bg-black/40 backdrop-blur-sm p-2 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            {/* Overlay Graph/Noise */}
                            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                            <motion.div
                                className={`relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-lg overflow-hidden transition-all duration-700 ${loadProgress < 100 ? 'bg-cyan-900/10' : ''}`}
                                style={{ x: smoothMouseX, y: smoothMouseY }}
                            >
                                {/* Tint Overlay */}
                                {loadProgress === 100 && (
                                    <div className="absolute inset-0 bg-cyan-700/60 mix-blend-color z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
                                )}
                                {loadProgress < 100 ? (
                                    // Loading State Visuals
                                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 font-mono text-cyan-500 text-xs">
                                        <div className="w-16 h-1 bg-cyan-900/50 rounded overflow-hidden">
                                            <div
                                                className="h-full bg-cyan-400 Transition-all duration-100 ease-linear"
                                                style={{ width: `${loadProgress}%` }}
                                            />
                                        </div>
                                        <div className="animate-pulse">DOWNLOADING_ASSET...</div>
                                    </div>
                                ) : (
                                    // Loaded Image
                                    <>
                                        <img
                                            src={profile_image}
                                            alt="Hari Hara Budra"
                                            className="w-full h-full object-cover object-top animate-fadeIn"
                                            loading="eager"
                                        />
                                        {/* Scanning line effect only after load */}
                                        <div className="absolute inset-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-scan-fast pointer-events-none z-30" />
                                    </>
                                )}
                            </motion.div>

                            {/* Data overlay */}
                            <div className="absolute bottom-4 left-4 right-4 z-30 flex justify-between text-[10px] text-cyan-500 font-mono bg-black/80 backdrop-blur px-3 py-2 rounded border border-cyan-900/50">
                                <span>IMG_DATA_LOADED</span>
                                <span>{loadProgress}%</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Terminal Footer */}
            <div className="h-6 bg-[#1a1f24] border-t border-cyan-800/50 flex items-center px-4 text-[10px] text-cyan-600/60 shrink-0">
                <span>session_id: 0x8F2A33</span> <span className="mx-2">|</span> <span>mem_usage: 42MB</span>
            </div>
        </section>
    );
});

export default Hero;
