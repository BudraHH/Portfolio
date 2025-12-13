import React, { useState, useEffect, useCallback, memo } from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform
} from 'framer-motion';
import { FaTerminal, FaLaptopCode, FaArrowRight } from 'react-icons/fa';

// --- Constants & Variants ---

const PAGE_TRANSITION = { duration: 0.6, ease: "easeOut" };
const STAGGER_CHILDREN = 0.15;
const SPRING_CONFIG = { damping: 25, stiffness: 120, mass: 0.5 }; // Lightweight spring for smoothness

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: PAGE_TRANSITION
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.4 }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_CHILDREN,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced distance for less layout shift
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } // Custom bezier
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

// --- Optimized Components ---

// Static Grid Pattern - prevent re-renders
const GridPattern = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            willChange: 'opacity'
        }}
    />
));

GridPattern.displayName = 'GridPattern';

// Hardware Accelerated Spotlight - Uses transform instead of background-position paint
const Spotlight = memo(({ x, y, colorRGB, inverted = false }) => {
    // Transform percentage coordinates to window-relative movement
    // We map 0-100 input range to position styles
    // inverted handles the secondary light

    // Note: We use massive dimensions to cover screen, translated by percentage
    // This allows the browser to simply move a texture around (Composite layer)

    // x and y are MotionValues (0-100)

    const xPos = useTransform(x, val => inverted ? `${100 - val}%` : `${val}%`);
    const yPos = useTransform(y, val => inverted ? `${100 - val}%` : `${val}%`);

    return (
        <motion.div
            className="absolute z-0 pointer-events-none mix-blend-screen"
            style={{
                top: 0,
                left: 0,
                x: xPos,
                y: yPos,
                width: '100vmax', // Ensure it covers enough area
                height: '100vmax',
                translateX: '-50%', // Center the radial gradient on the coordinate
                translateY: '-50%',
                background: `radial-gradient(circle closest-side, rgba(${colorRGB}, 0.15) 0%, transparent 100%)`,
                willChange: 'transform' // Force GPU layer
            }}
        />
    );
});

Spotlight.displayName = 'Spotlight';

// Memoized ThemeCard component
const ThemeCard = memo(({
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
    // Determine static classes vs dynamic ones to help engine
    const borderColor = colorScheme === 'cyan' ? 'border-cyan-500/50' : 'border-blue-500/50';
    const shadowColor = colorScheme === 'cyan' ? 'rgba(6,182,212,0.15)' : 'rgba(59,130,246,0.15)';
    const hoverBg = `group-hover:bg-${colorScheme}-500/20`;
    // Note: Tailwind arbitrary values in template literals only work if safelisted or pre-compiled. 
    // Assuming 'cyan' and 'blue' are safe.

    const activeClass = isActive
        ? `bg-[#0a1520] ${borderColor} shadow-[0_0_30px_${shadowColor}]`
        : 'bg-[#0a1520]/60 border-white/5 hover:border-white/10';

    return (
        <motion.button
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }} // Reduced movement for faster paint
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`group relative p-6 md:p-8 rounded-2xl flex flex-col text-left 
                       border min-h-[280px] sm:min-h-[320px] transition-all duration-300 
                       will-change-transform ${activeClass}`}
        >
            {/* Optimized Glow - fade in/out opacity instead of expensive layout changes */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${colorScheme}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-${colorScheme}-500/10 
                               flex items-center justify-center mb-6 
                               ${hoverBg} transition-colors duration-300`}>
                    <Icon className={`text-${colorScheme}-400 text-xl md:text-2xl`} />
                </div>

                <h3 className={`font-bold text-xl md:text-2xl text-white mb-3 group-hover:text-${colorScheme}-200 transition-colors duration-300`}>
                    {title}
                </h3>

                <p className="text-zinc-400 leading-relaxed mb-6 flex-1 text-sm md:text-base">
                    {description}
                </p>

                <div className={`flex items-center text-${colorScheme}-400 font-medium text-sm md:text-base group-hover:translate-x-1 transition-transform duration-300`}>
                    {actionText}
                    <FaArrowRight className="ml-2 text-xs" />
                </div>
            </div>
        </motion.button>
    );
});

ThemeCard.displayName = 'ThemeCard';

const Welcome = ({ onSelectTheme }) => {
    // Use MotionValues for high-performance mouse tracking (bypasses React render cycle)
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Smooth out the movement with a spring
    const smoothX = useSpring(mouseX, SPRING_CONFIG);
    const smoothY = useSpring(mouseY, SPRING_CONFIG);

    const [isHovered, setIsHovered] = useState(null);

    // Optimized Event Handler
    const handleMouseMove = useCallback((e) => {
        // Calculate percentage directly
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        mouseX.set(xPercent);
        mouseY.set(yPercent);
    }, [mouseX, mouseY]);

    // Passive event listener for scrolling performance
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Stable Handlers
    const handleDevClick = useCallback(() => onSelectTheme('dev'), [onSelectTheme]);
    const handleNormalClick = useCallback(() => onSelectTheme('normal'), [onSelectTheme]);
    const handleDevHover = useCallback(() => setIsHovered('dev'), []);
    const handleNormalHover = useCallback(() => setIsHovered('normal'), []);
    const handleLeave = useCallback(() => setIsHovered(null), []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="welcome"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative min-h-screen w-full bg-[#050a0f] overflow-hidden flex flex-col items-center justify-center font-sans antialiased selection:bg-cyan-500/30 px-4 sm:px-6"
            >
                {/* Performance Optimized Backgrounds */}
                <Spotlight x={smoothX} y={smoothY} colorRGB="6,182,212" /> {/* Cyan */}
                <Spotlight x={smoothX} y={smoothY} colorRGB="59,130,246" inverted /> {/* Blue */}
                <GridPattern />

                {/* Main Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 w-full max-w-7xl flex flex-col items-center"
                >
                    {/* Header */}
                    <div className="text-center mb-12 lg:mb-16 w-full max-w-2xl mx-auto">
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            System Ready
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-200 tracking-tight leading-tight mb-4"
                        >
                            Hello, I'm <span className="text-cyan-400">Budra</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-zinc-400 text-lg md:text-xl leading-relaxed"
                        >
                            I craft digital experiences. Choose your preferred interface.
                        </motion.p>
                    </div>

                    {/* Cards Container */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto"
                    >
                        <ThemeCard
                            theme="normal"
                            isHovered={isHovered}
                            onHover={handleNormalHover}
                            onLeave={handleLeave}
                            onClick={handleNormalClick}
                            icon={FaLaptopCode}
                            title="Standard View"
                            description="A clean, modern single-page portfolio layout. Straightforward and content-focused for a classic browsing experience."
                            actionText="Browse Standard"
                            colorScheme="blue"
                        />
                        <ThemeCard
                            theme="dev"
                            isHovered={isHovered}
                            onHover={handleDevHover}
                            onLeave={handleLeave}
                            onClick={handleDevClick}
                            icon={FaTerminal}
                            title="Developer OS"
                            description="An immersive, terminal-inspired desktop environment. Experience my work through key commands and window management."
                            actionText="Enter System"
                            colorScheme="cyan"
                        />
                    </motion.div>
                </motion.div>

                {/* Simplified Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-6 text-zinc-600 text-xs font-medium tracking-wide"
                >
                    DESIGNED & DEVELOPED BY HARI HARA BUDRA
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Welcome;
