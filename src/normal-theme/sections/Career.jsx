import React, { useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import { EXPERIENCE_DATA } from '../../constants/experience';

// Move static animation variants outside component
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

/**
 * Memoized 3D Tilt Card Component
 */
const TiltCard = React.memo(({ children, className }) => {
    const ref = useRef(null);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const transform = useMotionTemplate`rotateX(${x}deg) rotateY(${y}deg)`;

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        // Only apply tilt on desktop
        if (window.innerWidth < 768) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(yPct * -5);
        y.set(xPct * 5);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform, willChange: 'transform' }}
            className={className}
        >
            {children}
        </motion.div>
    );
});

TiltCard.displayName = 'TiltCard';

// Memoized TechBadge component
const TechBadge = React.memo(({ tech }) => (
    <motion.span
        whileHover={{ scale: 1.05, backgroundColor: "rgba(6,182,212,0.15)" }}
        whileTap={{ scale: 0.95 }}
        className="font-bold font-mono text-cyan-300 
                   px-2 sm:px-2.5 md:px-3 
                   py-1 sm:py-1.5 
                   bg-cyan-950/20 
                   rounded 
                   border border-cyan-500/20 
                   shadow-sm 
                   transition-all 
                   flex items-center gap-1
                   min-h-[32px]
                   touch-manipulation"
        style={{
            fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
            willChange: 'transform'
        }}
    >
        <FaCode size={8} className="opacity-50 flex-shrink-0" />
        {tech}
    </motion.span>
));

TechBadge.displayName = 'TechBadge';

const TimelineCard = React.memo(({ data, index }) => {
    const isEven = index % 2 === 0;
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Reveal Animations
    const yYear = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityYear = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.8, 0]);

    // Auto-draw connector line
    const lineScale = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

    // Center Dot Pulse
    const scaleDot = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [1, 2, 1]);
    const glowDot = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0]);

    // Memoized year parallax style
    const yearStyle = useMemo(() => ({
        fontSize: 'clamp(4rem, 15vw, 10rem)',
    }), []);

    // Memoized icon component
    const IconComponent = useMemo(() =>
        data.type === 'education' ? FaGraduationCap : FaBriefcase
        , [data.type]);

    const iconColor = useMemo(() =>
        data.type === 'education' ? 'text-cyan-200' : 'text-cyan-400'
        , [data.type]);

    return (
        <div ref={cardRef} className={`relative flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-0 items-center ${isEven ? 'md:flex-row-reverse' : ''} perspective-1000`}>

            {/* 1. Date/Meta Side */}
            <div className={`w-full md:w-1/2 flex items-center ${isEven ? 'justify-start md:pl-16 lg:pl-20 xl:pl-24' : 'justify-end md:pr-16 lg:pr-20 xl:pr-24'}`}>
                <div className={`relative flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>

                    {/* Parallax Year */}
                    <motion.span
                        style={{
                            y: typeof window !== 'undefined' && window.innerWidth >= 768 ? yYear : 0,
                            opacity: opacityYear,
                            ...yearStyle,
                            willChange: 'transform, opacity'
                        }}
                        className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/[0.08] to-transparent font-mono select-none absolute top-1/2 -translate-y-1/2 z-0 origin-center pointer-events-none tracking-tighter"
                    >
                        {data.year}
                    </motion.span>

                    <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2">
                        <motion.div
                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className={`flex items-center gap-2 sm:gap-3 font-bold text-white ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                            style={{
                                fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
                            }}
                        >
                            <IconComponent className={`${iconColor} text-xl sm:text-2xl md:text-3xl flex-shrink-0`} />
                            <span className="tracking-tight drop-shadow-lg">{data.period}</span>
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`text-cyan-400 font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase ${isEven ? 'text-left' : 'text-right'}`}
                            style={{
                                fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)',
                            }}
                        >
                            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full mr-1.5 sm:mr-2 animate-pulse" />
                            {data.type}
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* 2. Center Timeline Node */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center z-20">
                {/* Ripple Effect */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    style={{ scale: scaleDot, opacity: (opacityYear / 4) * 3, willChange: 'transform, opacity' }}
                    className="absolute w-20 lg:w-24 h-20 lg:h-24 rounded-full border border-cyan-500/30"
                />
                <motion.div
                    style={{ opacity: glowDot, willChange: 'opacity' }}
                    className="absolute w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-cyan-400/20 blur-md"
                />

                <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#050a0f] border-[2px] lg:border-[3px] border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] relative z-20" />

                {/* Animated Horizontal Connectors */}
                <motion.div
                    style={{ scaleX: lineScale, willChange: 'transform' }}
                    className="absolute top-1/2 left-3 lg:left-4 w-12 lg:w-14 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent origin-left"
                />
                <motion.div
                    style={{ scaleX: lineScale, willChange: 'transform' }}
                    className="absolute top-1/2 right-3 lg:right-4 w-12 lg:w-14 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent origin-right"
                />
            </div>

            {/* 3. Content Card Side */}
            <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 lg:pr-20 xl:pr-24' : 'md:pl-16 lg:pl-20 xl:pl-24'}`}>
                <TiltCard className="group relative 
                                     p-5 sm:p-6 md:p-7 lg:p-8 
                                     rounded-xl sm:rounded-2xl 
                                     bg-gradient-to-b from-white/[0.04] to-transparent 
                                     border border-white/5 
                                     hover:border-cyan-500/40 
                                     transition-all duration-500 
                                     cursor-default">

                    {/* Animated Border Shimmer */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shine-slow" />
                    </div>

                    {/* HUD Elements */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1">
                        <div className="w-1 h-1 bg-cyan-500/50 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-500/10 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 transform-gpu translate-z-10">
                        <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-md"
                                style={{
                                    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                                }}
                            >
                                {data.role}
                            </h3>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 font-mono border-b border-white/5 pb-3 sm:pb-4"
                                style={{
                                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                }}
                            >
                                <span className="text-cyan-100">{data.company}</span>
                                <span className="hidden xs:inline text-cyan-500">::</span>
                                <span className="text-zinc-400">{data.location}</span>
                            </div>
                        </div>

                        <p className="text-zinc-300/80 leading-relaxed mb-4 sm:mb-5 md:mb-6 font-light"
                            style={{
                                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            }}
                        >
                            {data.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {data.tech.map((t, i) => (
                                <TechBadge key={i} tech={t} />
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </div>
        </div>
    );
});

TimelineCard.displayName = 'TimelineCard';

const Career = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Laser Line Animation
    const LineHeight = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

    // Memoized timeline data
    const timelineData = useMemo(() => EXPERIENCE_DATA, []);

    return (
        <section
            id="career"
            ref={sectionRef}
            className="relative 
                       py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 2xl:py-48 
                       bg-[#050a0f] 
                       overflow-hidden"
        >
            {/* Background Ambient Layers */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Cinematic Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Multi-Layer Breathing Ambient Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.08, 0.18, 0.08]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-0 
                               w-[400px] h-[400px] 
                               sm:w-[500px] sm:h-[500px] 
                               md:w-[600px] md:h-[600px] 
                               lg:w-[700px] lg:h-[700px] 
                               xl:w-[800px] xl:h-[800px] 
                               bg-cyan-500/5 
                               rounded-full 
                               blur-[100px] sm:blur-[120px] md:blur-[140px] lg:blur-[150px] 
                               mix-blend-screen"
                    style={{ willChange: 'transform, opacity' }}
                />
            </div>

            <div className="max-w-7xl mx-auto 
                            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 
                            relative z-10">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
                >
                    {/* Decorative Tag */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center 
                                   gap-1.5 sm:gap-2 
                                   px-2.5 sm:px-3 py-1 sm:py-1.5 
                                   rounded-full 
                                   bg-cyan-950/30 
                                   border border-cyan-500/20 
                                   backdrop-blur-sm 
                                   mb-4 sm:mb-5 md:mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                            My Journey
                        </span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
                        <motion.h2
                            variants={itemVariants}
                            className="font-bold text-white tracking-tighter leading-[0.9]"
                            style={{
                                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                            }}
                        >
                            Forging{" "}
                            <span className="relative inline-block mt-1 sm:mt-2">
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                    Paths.
                                </span>
                                {/* Underline Accent */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 
                                               h-[2px] sm:h-0.5 
                                               bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent 
                                               origin-left"
                                    style={{ willChange: 'transform' }}
                                />
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-zinc-400 max-w-xl leading-relaxed font-light"
                            style={{
                                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                            }}
                        >
                            From university projects to <span className="text-cyan-400 font-medium">production full-stack systems</span> -- a timeline of growing skills, evolving mindset, and delivering real impact.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative"
                >
                    {/* Static Guideline */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/[0.03]" />

                    {/* Animated Laser Beam */}
                    <motion.div
                        style={{ height: LineHeight, willChange: 'height' }}
                        className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)] origin-top z-10 rounded-full"
                    >
                        {/* Laser Head */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
                    </motion.div>

                    <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={index} data={item} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Career;
