import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaTerminal, FaLaptopCode, FaArrowRight } from 'react-icons/fa';

// Throttle utility for performance optimization
const throttle = (func, delay) => {
    let timeoutId;
    let lastRan;
    return function (...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if ((Date.now() - lastRan) >= delay) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, delay - (Date.now() - lastRan));
        }
    };
};

// Memoized ThemeCard component to prevent unnecessary re-renders
const ThemeCard = React.memo(({
    theme,
    isHovered,
    onHover,
    onLeave,
    onClick,
    icon: Icon,
    title,
    description,
    actionText,
    colorScheme
}) => {
    const isActive = isHovered === theme;

    const cardClassName = `group relative 
                           p-5 sm:p-6 md:p-7 lg:p-8 
                           rounded-xl sm:rounded-2xl md:rounded-3xl 
                           text-left 
                           transition-all duration-500 
                           border
                           min-h-[280px] sm:min-h-[320px]
                           flex flex-col
                           touch-manipulation
                           ${isActive
            ? `bg-[#0a1520] border-${colorScheme}-500/50 shadow-[0_0_30px_rgba(${colorScheme === 'cyan' ? '6,182,212' : '59,130,246'},0.12)] sm:shadow-[0_0_40px_rgba(${colorScheme === 'cyan' ? '6,182,212' : '59,130,246'},0.15)] scale-[1.01] sm:scale-[1.02]`
            : 'bg-[#0a1520]/60 border-white/5 hover:border-white/10'
        }`;

    const cardStyle = useMemo(() => ({
        willChange: isActive ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)' // Force GPU layer
    }), [isActive]);

    return (
        <button
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={cardClassName}
            style={cardStyle}
        >
            <div className={`absolute inset-0 
                            bg-gradient-to-br from-${colorScheme}-500/10 to-transparent 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 
                            rounded-xl sm:rounded-2xl md:rounded-3xl`} />

            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 
                                rounded-lg sm:rounded-xl md:rounded-2xl 
                                bg-${colorScheme}-500/10 
                                flex items-center justify-center 
                                mb-4 sm:mb-5 md:mb-6 
                                group-hover:bg-${colorScheme}-500/20 
                                transition-colors`}>
                    <Icon className={`text-${colorScheme}-400`}
                        style={{
                            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                        }} />
                </div>

                <h3 className={`font-bold text-white 
                              mb-2 
                              group-hover:text-${colorScheme}-200 
                              transition-colors`}
                    style={{
                        fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                    }}
                >
                    {title}
                </h3>
                <p className="text-zinc-400
                             leading-relaxed
                             mb-5 sm:mb-6 md:mb-8
                             flex-1"
                    style={{
                        fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                    }}
                >
                    {description}
                </p>

                <div className={`flex items-center 
                               text-${colorScheme}-400 
                               font-medium 
                               group-hover:translate-x-1 
                               transition-transform`}
                    style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    }}
                >
                    {actionText} <FaArrowRight className="ml-2 text-xs sm:text-sm" />
                </div>
            </div>
        </button>
    );
});

ThemeCard.displayName = 'ThemeCard';

const Welcome = ({ onSelectTheme }) => {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(null);

    // Throttled mouse move handler - limits updates to ~60fps
    const handleMouseMove = useCallback(
        throttle((e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        }, 16), // 16ms = ~60fps
        []
    );

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Memoized background gradient style
    const backgroundStyle = useMemo(() => ({
        background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6,182,212,0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(59,130,246,0.1) 0%, transparent 50%)
        `
    }), [mousePosition.x, mousePosition.y]);

    // Memoized event handlers
    const handleDevClick = useCallback(() => onSelectTheme('dev'), [onSelectTheme]);
    const handleNormalClick = useCallback(() => onSelectTheme('normal'), [onSelectTheme]);
    const handleDevHover = useCallback(() => setIsHovered('dev'), []);
    const handleNormalHover = useCallback(() => setIsHovered('normal'), []);
    const handleMouseLeave = useCallback(() => setIsHovered(null), []);

    return (
        <div className="relative min-h-screen w-full
                        bg-[#050a0f]
                        overflow-hidden
                        flex flex-col items-center justify-center
                        font-sans antialiased
                        selection:bg-cyan-500/30
                        py-8 sm:py-12 md:py-0
                        px-4 sm:px-6">
            {/* Dynamic Background - Optimized with memoized style */}
            <div
                className="absolute inset-0 pointer-events-none
                           opacity-30 sm:opacity-35 md:opacity-40
                           transition-opacity duration-1000"
                style={backgroundStyle}
            />

            {/* Grid Pattern - Static, no re-render needed */}
            <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] md:opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content Container - Flattened structure */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

                {/* Header / Greeting */}
                <div className="text-center
                                mb-8 sm:mb-10 md:mb-12 lg:mb-16
                                space-y-3 sm:space-y-4
                                animate-fadeInUp
                                w-full">
                    <div className="inline-flex items-center
                                    gap-1.5 sm:gap-2
                                    px-2.5 sm:px-3 py-1 sm:py-1.5
                                    rounded-full
                                    bg-cyan-500/10
                                    border border-cyan-500/20
                                    text-cyan-400
                                    font-medium tracking-wider uppercase
                                    mb-2 sm:mb-3 md:mb-4"
                        style={{
                            fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        System Ready
                    </div>
                    <h1 className="font-bold
                                   text-transparent bg-clip-text
                                   bg-gradient-to-r from-white via-cyan-100 to-cyan-200
                                   tracking-tight leading-tight
                                   px-2"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                        }}
                    >
                        Hello, I'm <span className="text-cyan-400">Budra</span>
                    </h1>
                    <p className="text-zinc-400
                                  leading-relaxed
                                  max-w-xl md:max-w-2xl
                                  mx-auto
                                  px-2 sm:px-4"
                        style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                        }}
                    >
                        I craft digital experiences. Choose your preferred interface to explore my portfolio.
                    </p>
                </div>

                {/* Theme Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2
                                gap-4 sm:gap-5 md:gap-6 lg:gap-8
                                w-full
                                max-w-sm sm:max-w-xl md:max-w-4xl
                                mx-auto">

                    <ThemeCard
                        theme="dev"
                        isHovered={isHovered}
                        onHover={handleDevHover}
                        onLeave={handleMouseLeave}
                        onClick={handleDevClick}
                        icon={FaTerminal}
                        title="Developer OS"
                        description="An immersive, terminal-inspired desktop environment. Experience my work through key commands, file systems, and window management."
                        actionText="Enter System"
                        colorScheme="cyan"
                    />

                    <ThemeCard
                        theme="normal"
                        isHovered={isHovered}
                        onHover={handleNormalHover}
                        onLeave={handleMouseLeave}
                        onClick={handleNormalClick}
                        icon={FaLaptopCode}
                        title="Standard View"
                        description="A clean, modern single-page portfolio layout. Straightforward and content-focused for a classic browsing experience."
                        actionText="Browse Standard"
                        colorScheme="blue"
                    />

                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 sm:bottom-8
                            text-zinc-600
                            font-medium tracking-wide
                            text-center
                            px-4"
                style={{
                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                }}
            >
                DESIGNED & DEVELOPED BY HARI HARA BUDRA
            </div>
        </div>
    );
};

export default Welcome;
