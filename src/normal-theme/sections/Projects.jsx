import React, { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { motion, useSpring, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { REPOSITORIES } from '../../constants/projects';

/**
 * 3D Tilt Card Component
 */
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const transform = useMotionTemplate`rotateX(${x}deg) rotateY(${y}deg)`;
    const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.1), transparent 80%)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        // Only apply tilt on desktop
        if (window.innerWidth < 768) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(yPct * -5);
        y.set(xPct * 5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform }}
            className={className}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{ background: spotlight }}
            />
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};

const getPreviewType = (name) => {
    const n = name.toLowerCase();
    if (n.includes('neural') || n.includes('ai') || n.includes('chat') || n.includes('gpt')) return 'ai';
    if (n.includes('task') || n.includes('tracker') || n.includes('manager') || n.includes('list')) return 'task';
    return 'code';
};

const ProjectCardPreview = ({ repo }) => {
    const type = getPreviewType(repo.name);

    if (type === 'code') {
        return (
            <div className="w-full h-36 sm:h-40 md:h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-3 sm:p-4 border-b border-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-white opacity-50" />
                <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="w-1/3 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-zinc-800 to-zinc-900/50 rounded-md sm:rounded-lg animate-pulse border border-white/5" style={{ animationDelay: '0ms' }} />
                    <div className="w-1/3 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-zinc-800 to-zinc-900/50 rounded-md sm:rounded-lg animate-pulse border border-white/5" style={{ animationDelay: '100ms' }} />
                    <div className="w-1/3 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-zinc-800 to-zinc-900/50 rounded-md sm:rounded-lg animate-pulse border border-white/5" style={{ animationDelay: '200ms' }} />
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2/3 h-3 sm:h-4 bg-zinc-800/50 rounded-md" />
                    <div className="w-1/3 h-3 sm:h-4 bg-cyan-500/20 rounded-md" />
                </div>
            </div>
        );
    }
    if (type === 'task') {
        return (
            <div className="w-full h-36 sm:h-40 md:h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-3 sm:p-4 border-b border-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-200 opacity-50" />
                <div className="flex gap-2 sm:gap-3 h-full">
                    <div className="w-1/3 h-full bg-white/5 rounded-md sm:rounded-lg p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 border border-white/5">
                        <div className="w-full h-1.5 sm:h-2 bg-zinc-700/50 rounded-full" />
                        <div className="w-full h-4 sm:h-5 md:h-6 bg-zinc-700/30 rounded" />
                        <div className="w-full h-4 sm:h-5 md:h-6 bg-zinc-700/30 rounded" />
                    </div>
                    <div className="w-1/3 h-full bg-cyan-500/5 rounded-md sm:rounded-lg p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 border border-cyan-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                        <div className="w-full h-1.5 sm:h-2 bg-cyan-500/40 rounded-full relative z-10" />
                        <div className="w-full h-8 sm:h-10 md:h-12 bg-cyan-500/10 rounded border-l-2 border-cyan-500/50 relative z-10" />
                    </div>
                    <div className="w-1/3 h-full bg-white/5 rounded-md sm:rounded-lg p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 border border-white/5">
                        <div className="w-full h-1.5 sm:h-2 bg-zinc-700/50 rounded-full" />
                        <div className="w-full h-4 sm:h-5 md:h-6 bg-zinc-700/30 rounded" />
                        <div className="w-full h-4 sm:h-5 md:h-6 bg-zinc-700/30 rounded" />
                    </div>
                </div>
            </div>
        );
    }
    // AI / Chat style
    return (
        <div className="w-full h-36 sm:h-40 md:h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-3 sm:p-4 border-b border-white/5 flex flex-col justify-end gap-1.5 sm:gap-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white to-cyan-500 opacity-50" />
            <div className="self-end bg-gradient-to-br from-zinc-800 to-zinc-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tr-sm max-w-[80%] border border-white/5">
                <div className="w-16 sm:w-20 md:w-24 h-1.5 sm:h-2 bg-zinc-600/50 rounded-full" />
            </div>
            <div className="self-start bg-gradient-to-br from-cyan-950/30 to-cyan-900/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tl-sm max-w-[80%] border border-cyan-500/20 backdrop-blur-sm">
                <div className="w-20 sm:w-28 md:w-32 h-1.5 sm:h-2 bg-cyan-400/40 rounded-full mb-1" />
                <div className="w-14 sm:w-16 md:w-20 h-1.5 sm:h-2 bg-cyan-400/40 rounded-full" />
            </div>
        </div>
    );
};

const Projects = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal scroll calculation - Responsive based on card sizes
    // Mobile (85vw cards): Need ~150% to show all 6 projects
    // SM (75vw cards): Need ~130%
    // MD (65vw cards): Need ~115%
    // LG+ (400px cards): Need ~108%
    const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const xSm = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);
    const xMd = useTransform(scrollYProgress, [0, 1], ["0%", "-115%"]);
    const xLg = useTransform(scrollYProgress, [0, 1], ["0%", "-108%"]);

    const leftOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const rightOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    // Standard Animation Variants
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

    // Ambient floating animation
    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.1, 1],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section
            ref={targetRef}
            id="projects"
            className="relative
                       h-[250vh] sm:h-[275vh] md:h-[300vh]
                       bg-cyan-950/5"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Background (Fixed to sticky container) */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='1'/%3E%3C/svg%3E")`
                        }}
                    />
                    <motion.div
                        variants={floatingVariant}
                        animate="animate"
                        className="absolute top-0 left-[-10%] 
                                   w-[300px] h-[300px] 
                                   sm:w-[400px] sm:h-[400px] 
                                   md:w-[500px] md:h-[500px] 
                                   lg:w-[600px] lg:h-[600px] 
                                   bg-cyan-500/5 
                                   rounded-full 
                                   blur-[80px] sm:blur-[100px] md:blur-[120px] 
                                   pointer-events-none"
                    />
                </div>

                <div className="max-w-7xl w-full mx-auto 
                                px-4 sm:px-6 md:px-8 lg:px-10 
                                relative z-10">
                    {/* Header Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={containerVariants}
                        className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
                    >
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
                                Showcase
                            </span>
                        </motion.div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 md:gap-6">
                            <motion.h2
                                variants={itemVariants}
                                className="font-bold text-white tracking-tighter leading-[0.9]"
                                style={{
                                    fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                                }}
                            >
                                Featured{" "}
                                <span className="relative inline-block mt-1 sm:mt-2">
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                        Builds.
                                    </span>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.25 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 
                                                   h-[2px] sm:h-0.5 
                                                   bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent 
                                                   origin-left"
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
                                Where <span className="text-cyan-400 font-medium">curiosity meets compilation</span>. Exploring new technologies through practical projects and open-source contributions.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className="relative w-full group/carousel overflow-hidden">

                        {/* Side Gradients */}
                        <motion.div
                            style={{ opacity: leftOpacity }}
                            className="absolute left-0 top-0 bottom-0 
                                       w-24 sm:w-32 lg:w-40 
                                       bg-gradient-to-r from-[#050a0f] to-transparent 
                                       z-20 pointer-events-none"
                        />

                        <motion.div
                            style={{ opacity: rightOpacity }}
                            className="absolute right-0 top-0 bottom-0 
                                       w-24 sm:w-32 lg:w-40 
                                       bg-gradient-to-l from-[#050a0f] to-transparent 
                                       z-20 pointer-events-none"
                        />

                        {/* Scrollable Track - Responsive horizontal scroll */}
                        {/* Mobile version (< 640px) - 150% scroll */}
                        <motion.div
                            style={{ x: xMobile }}
                            className="flex flex-row sm:hidden
                                       gap-6 
                                       items-stretch 
                                       pt-4 pb-8 
                                       px-0"
                        >
                            {REPOSITORIES.map((repo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="min-w-[85vw] snap-center"
                                >
                                    <TiltCard
                                        className="group relative flex flex-col h-full 
                                                   bg-white/[0.02] 
                                                   backdrop-blur-sm 
                                                   rounded-xl sm:rounded-2xl 
                                                   border border-white/5 
                                                   hover:border-cyan-500/40 
                                                   hover:bg-white/[0.04] 
                                                   hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
                                                   transition-all duration-500"
                                    >
                                        {/* Smart Visual Preview */}
                                        <div className="relative z-10 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-20 pointer-events-none" />
                                            <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                            <ProjectCardPreview repo={repo} />
                                        </div>

                                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors"
                                                    style={{
                                                        fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                                                    }}
                                                >
                                                    {repo.name}
                                                </h3>
                                                <div className="flex gap-2 sm:gap-3 text-zinc-500">
                                                    {repo.website && (
                                                        <a
                                                            href={repo.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="hover:text-cyan-400 hover:scale-110 transition-all 
                                                                       min-w-[32px] min-h-[32px] 
                                                                       flex items-center justify-center
                                                                       touch-manipulation"
                                                        >
                                                            <FaExternalLinkAlt size={14} className="sm:w-4 sm:h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={repo.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:text-white hover:scale-110 transition-all
                                                                   min-w-[32px] min-h-[32px] 
                                                                   flex items-center justify-center
                                                                   touch-manipulation"
                                                    >
                                                        <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    </a>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-grow font-light"
                                                style={{
                                                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                                                }}
                                            >
                                                {repo.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                                                {repo.techStack.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 
                                                                   uppercase tracking-wider 
                                                                   font-mono text-cyan-300 
                                                                   bg-cyan-500/5 
                                                                   backdrop-blur-md 
                                                                   rounded 
                                                                   border border-cyan-500/10 
                                                                   group-hover:border-cyan-500/30 
                                                                   group-hover:bg-cyan-500/10 
                                                                   transition-all duration-300 
                                                                   shadow-[0_0_10px_rgba(34,211,238,0)] 
                                                                   group-hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                                        style={{
                                                            fontSize: 'clamp(0.5625rem, 1.5vw, 0.625rem)',
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between 
                                                            gap-2 xs:gap-0 
                                                            pt-3 sm:pt-4 
                                                            border-t border-white/5 
                                                            font-mono text-zinc-500"
                                                style={{
                                                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    {repo.languages.map((language, i) => (
                                                        <span key={i}>{language}{i < repo.languages.length - 1 ? " | " : ""}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3 sm:gap-4">
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaStar className="flex-shrink-0" /> {repo.stars}
                                                    </span>
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaCodeBranch className="flex-shrink-0" /> {repo.forks}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* SM version (640px - 767px) - 130% scroll */}
                        <motion.div
                            style={{ x: xSm }}
                            className="hidden sm:flex md:hidden
                                       flex-row 
                                       gap-8 
                                       items-stretch 
                                       pt-4 pb-10 
                                       px-0"
                        >
                            {REPOSITORIES.map((repo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="min-w-[75vw] snap-center"
                                >
                                    <TiltCard
                                        className="group relative flex flex-col h-full 
                                                   bg-white/[0.02] 
                                                   backdrop-blur-sm 
                                                   rounded-xl sm:rounded-2xl 
                                                   border border-white/5 
                                                   hover:border-cyan-500/40 
                                                   hover:bg-white/[0.04] 
                                                   hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
                                                   transition-all duration-500"
                                    >
                                        {/* Smart Visual Preview */}
                                        <div className="relative z-10 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-20 pointer-events-none" />
                                            <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                            <ProjectCardPreview repo={repo} />
                                        </div>

                                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors"
                                                    style={{
                                                        fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                                                    }}
                                                >
                                                    {repo.name}
                                                </h3>
                                                <div className="flex gap-2 sm:gap-3 text-zinc-500">
                                                    {repo.website && (
                                                        <a
                                                            href={repo.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="hover:text-cyan-400 hover:scale-110 transition-all 
                                                                       min-w-[32px] min-h-[32px] 
                                                                       flex items-center justify-center
                                                                       touch-manipulation"
                                                        >
                                                            <FaExternalLinkAlt size={14} className="sm:w-4 sm:h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={repo.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:text-white hover:scale-110 transition-all
                                                                   min-w-[32px] min-h-[32px] 
                                                                   flex items-center justify-center
                                                                   touch-manipulation"
                                                    >
                                                        <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    </a>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-grow font-light"
                                                style={{
                                                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                                                }}
                                            >
                                                {repo.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                                                {repo.techStack.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 
                                                                   uppercase tracking-wider 
                                                                   font-mono text-cyan-300 
                                                                   bg-cyan-500/5 
                                                                   backdrop-blur-md 
                                                                   rounded 
                                                                   border border-cyan-500/10 
                                                                   group-hover:border-cyan-500/30 
                                                                   group-hover:bg-cyan-500/10 
                                                                   transition-all duration-300 
                                                                   shadow-[0_0_10px_rgba(34,211,238,0)] 
                                                                   group-hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                                        style={{
                                                            fontSize: 'clamp(0.5625rem, 1.5vw, 0.625rem)',
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between 
                                                            gap-2 xs:gap-0 
                                                            pt-3 sm:pt-4 
                                                            border-t border-white/5 
                                                            font-mono text-zinc-500"
                                                style={{
                                                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    {repo.languages.map((language, i) => (
                                                        <span key={i}>{language}{i < repo.languages.length - 1 ? " | " : ""}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3 sm:gap-4">
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaStar className="flex-shrink-0" /> {repo.stars}
                                                    </span>
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaCodeBranch className="flex-shrink-0" /> {repo.forks}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* MD version (768px - 1023px) - 115% scroll */}
                        <motion.div
                            style={{ x: xMd }}
                            className="hidden md:flex lg:hidden
                                       flex-row 
                                       gap-8 
                                       items-stretch 
                                       pt-4 pb-12 
                                       px-0"
                        >
                            {REPOSITORIES.map((repo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="min-w-[65vw] snap-center"
                                >
                                    <TiltCard
                                        className="group relative flex flex-col h-full 
                                                   bg-white/[0.02] 
                                                   backdrop-blur-sm 
                                                   rounded-xl sm:rounded-2xl 
                                                   border border-white/5 
                                                   hover:border-cyan-500/40 
                                                   hover:bg-white/[0.04] 
                                                   hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
                                                   transition-all duration-500"
                                    >
                                        {/* Smart Visual Preview */}
                                        <div className="relative z-10 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-20 pointer-events-none" />
                                            <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                            <ProjectCardPreview repo={repo} />
                                        </div>

                                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors"
                                                    style={{
                                                        fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                                                    }}
                                                >
                                                    {repo.name}
                                                </h3>
                                                <div className="flex gap-2 sm:gap-3 text-zinc-500">
                                                    {repo.website && (
                                                        <a
                                                            href={repo.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="hover:text-cyan-400 hover:scale-110 transition-all 
                                                                       min-w-[32px] min-h-[32px] 
                                                                       flex items-center justify-center
                                                                       touch-manipulation"
                                                        >
                                                            <FaExternalLinkAlt size={14} className="sm:w-4 sm:h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={repo.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:text-white hover:scale-110 transition-all
                                                                   min-w-[32px] min-h-[32px] 
                                                                   flex items-center justify-center
                                                                   touch-manipulation"
                                                    >
                                                        <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    </a>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-grow font-light"
                                                style={{
                                                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                                                }}
                                            >
                                                {repo.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                                                {repo.techStack.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 
                                                                   uppercase tracking-wider 
                                                                   font-mono text-cyan-300 
                                                                   bg-cyan-500/5 
                                                                   backdrop-blur-md 
                                                                   rounded 
                                                                   border border-cyan-500/10 
                                                                   group-hover:border-cyan-500/30 
                                                                   group-hover:bg-cyan-500/10 
                                                                   transition-all duration-300 
                                                                   shadow-[0_0_10px_rgba(34,211,238,0)] 
                                                                   group-hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                                        style={{
                                                            fontSize: 'clamp(0.5625rem, 1.5vw, 0.625rem)',
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between 
                                                            gap-2 xs:gap-0 
                                                            pt-3 sm:pt-4 
                                                            border-t border-white/5 
                                                            font-mono text-zinc-500"
                                                style={{
                                                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    {repo.languages.map((language, i) => (
                                                        <span key={i}>{language}{i < repo.languages.length - 1 ? " | " : ""}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3 sm:gap-4">
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaStar className="flex-shrink-0" /> {repo.stars}
                                                    </span>
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaCodeBranch className="flex-shrink-0" /> {repo.forks}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* LG+ version (1024px+) - 108% scroll */}
                        <motion.div
                            style={{ x: xLg }}
                            className="hidden lg:flex
                                       flex-row 
                                       gap-8 
                                       items-stretch 
                                       pt-4 pb-12 
                                       px-0"
                        >
                            {REPOSITORIES.map((repo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="min-w-[400px] snap-center"
                                >
                                    <TiltCard
                                        className="group relative flex flex-col h-full 
                                                   bg-white/[0.02] 
                                                   backdrop-blur-sm 
                                                   rounded-xl sm:rounded-2xl 
                                                   border border-white/5 
                                                   hover:border-cyan-500/40 
                                                   hover:bg-white/[0.04] 
                                                   hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
                                                   transition-all duration-500"
                                    >
                                        {/* Smart Visual Preview */}
                                        <div className="relative z-10 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-20 pointer-events-none" />
                                            <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                            <ProjectCardPreview repo={repo} />
                                        </div>

                                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-10">
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors"
                                                    style={{
                                                        fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                                                    }}
                                                >
                                                    {repo.name}
                                                </h3>
                                                <div className="flex gap-2 sm:gap-3 text-zinc-500">
                                                    {repo.website && (
                                                        <a
                                                            href={repo.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="hover:text-cyan-400 hover:scale-110 transition-all 
                                                                       min-w-[32px] min-h-[32px] 
                                                                       flex items-center justify-center
                                                                       touch-manipulation"
                                                        >
                                                            <FaExternalLinkAlt size={14} className="sm:w-4 sm:h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={repo.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:text-white hover:scale-110 transition-all
                                                                   min-w-[32px] min-h-[32px] 
                                                                   flex items-center justify-center
                                                                   touch-manipulation"
                                                    >
                                                        <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                    </a>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-grow font-light"
                                                style={{
                                                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                                                }}
                                            >
                                                {repo.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                                                {repo.techStack.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 
                                                                   uppercase tracking-wider 
                                                                   font-mono text-cyan-300 
                                                                   bg-cyan-500/5 
                                                                   backdrop-blur-md 
                                                                   rounded 
                                                                   border border-cyan-500/10 
                                                                   group-hover:border-cyan-500/30 
                                                                   group-hover:bg-cyan-500/10 
                                                                   transition-all duration-300 
                                                                   shadow-[0_0_10px_rgba(34,211,238,0)] 
                                                                   group-hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                                        style={{
                                                            fontSize: 'clamp(0.5625rem, 1.5vw, 0.625rem)',
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between 
                                                            gap-2 xs:gap-0 
                                                            pt-3 sm:pt-4 
                                                            border-t border-white/5 
                                                            font-mono text-zinc-500"
                                                style={{
                                                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    {repo.languages.map((language, i) => (
                                                        <span key={i}>{language}{i < repo.languages.length - 1 ? " | " : ""}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3 sm:gap-4">
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaStar className="flex-shrink-0" /> {repo.stars}
                                                    </span>
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                                        <FaCodeBranch className="flex-shrink-0" /> {repo.forks}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="w-full h-0.5 bg-cyan-950 rounded-full my-4 sm:my-5 blur-[2.55px]"></div>

                    {/* View More Button */}
                    <div className="flex justify-center">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            href="https://github.com/BudraHH"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative 
                                       px-6 sm:px-8 py-2.5 sm:py-3 
                                       rounded-xl 
                                       bg-cyan-950/30 
                                       overflow-hidden 
                                       transition-all duration-300 
                                       hover:scale-105 
                                       hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] 
                                       border border-cyan-500/30
                                       min-h-[48px]
                                       flex items-center justify-center
                                       touch-manipulation"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <span className="relative font-mono text-cyan-400 group-hover:text-cyan-300 font-bold tracking-wide"
                                style={{
                                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                }}
                            >
                                View Full Archive on GitHub
                            </span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
