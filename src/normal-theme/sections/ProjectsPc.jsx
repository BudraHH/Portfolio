import React, { useRef, useCallback, useMemo, memo } from 'react';
import { motion, useSpring, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { REPOSITORIES } from '../../constants/projects.js';
import { NORMAL_ROUTES } from '../../constants/routes';

// --- Constants & Variants ---

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const ITEM_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// --- Helper Functions ---

const getPreviewType = (name) => {
    const n = name.toLowerCase();
    if (n.includes('neural') || n.includes('ai') || n.includes('chat') || n.includes('gpt')) return 'ai';
    if (n.includes('task') || n.includes('tracker') || n.includes('manager') || n.includes('list')) return 'task';
    return 'code';
};

// --- Sub-Components ---

const AmbientBackground = memo(() => (
    <div className="absolute inset-0 pointer-events-none">

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
            className="absolute top-1/4 right-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] bg-cyan-500/5 rounded-full blur-[100px] sm:blur-[120px] md:blur-[140px] lg:blur-[150px] mix-blend-screen"
            style={{ willChange: 'transform, opacity' }}
        />
    </div>
));
AmbientBackground.displayName = 'AmbientBackground';

const TiltCard = memo(({ children, className }) => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const transform = useMotionTemplate`rotateX(${x}deg) rotateY(${y}deg)`;
    const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.1), transparent 80%)`;

    const handleMouseMove = useCallback((e) => {
        if (!ref.current || window.innerWidth < 768) return;

        const rect = ref.current.getBoundingClientRect();
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);

        const xPct = mouseXVal / rect.width - 0.5;
        const yPct = mouseYVal / rect.height - 0.5;
        x.set(yPct * -5);
        y.set(xPct * 5);
    }, [x, y, mouseX, mouseY]);

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
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{ background: spotlight, willChange: 'opacity' }}
            />
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
});
TiltCard.displayName = 'TiltCard';

const ProjectCardPreview = memo(({ repo }) => {
    const type = useMemo(() => getPreviewType(repo.name), [repo.name]);

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
});
ProjectCardPreview.displayName = 'ProjectCardPreview';

const ProjectCard = memo(({ repo, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[400px] xl:w-[450px] snap-center"
    >
        <TiltCard className="group relative h-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-cyan-500/40 transition-all duration-500 cursor-default overflow-hidden flex flex-col">
            <ProjectCardPreview repo={repo} />

            <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors flex-1 pr-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                        {repo.name}
                    </h3>
                    <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                        {repo.github && (
                            <a href={repo.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors p-1" aria-label="View on GitHub">
                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        )}
                        {repo.website && (
                            <a href={repo.website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors p-1" aria-label="View Live Demo">
                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mb-4 sm:mb-5 font-light flex-1" style={{ fontSize: 'clamp(0.8125rem, 2vw, 0.9375rem)' }}>
                    {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {repo.techStack && repo.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 sm:px-2.5 py-1 bg-cyan-950/20 text-cyan-300 rounded border border-cyan-500/20 font-mono font-medium" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
                            {tech}
                        </span>
                    ))}
                    {repo.techStack && repo.techStack.length > 4 && (
                        <span className="px-2 sm:px-2.5 py-1 text-zinc-500 font-mono" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
                            +{repo.techStack.length - 4}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4 sm:gap-5 text-zinc-500 pt-3 sm:pt-4 border-t border-white/5" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                    {repo.stars !== undefined && (
                        <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500/70" />
                            <span>{repo.stars}</span>
                        </div>
                    )}
                    {repo.forks !== undefined && (
                        <div className="flex items-center gap-1.5">
                            <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500/70" />
                            <span>{repo.forks}</span>
                        </div>
                    )}
                </div>
            </div>
        </TiltCard>
    </motion.div>
));
ProjectCard.displayName = 'ProjectCard';

const ProjectsHeader = memo(() => (
    <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-10 sm:mb-12 md:mb-14 lg:mb-16"
    >
        <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-4 sm:mb-5 md:mb-6"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                Featured Work
            </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
            <motion.h2
                variants={ITEM_VARIANTS}
                className="font-bold text-white tracking-tighter leading-[0.9]"
                style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
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
                        className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[2px] sm:h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                        style={{ willChange: 'transform' }}
                    />
                </span>
            </motion.h2>
            <motion.p
                variants={ITEM_VARIANTS}
                className="text-zinc-400 max-w-xl leading-relaxed font-light"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
            >
                A curated showcase of <span className="text-cyan-400 font-medium">real-world applications</span> I've built—from concept to deployment.
            </motion.p>
        </div>
    </motion.div>
));
ProjectsHeader.displayName = 'ProjectsHeader';

const ProjectsPc = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const xLg = useTransform(scrollYProgress, [0, 1], ["0%", "-108%"]);
    const leftOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const rightOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    return (
        <div className="hidden md:block">
            <section id={NORMAL_ROUTES.SECTIONS.PROJECTS} ref={targetRef} className="relative h-[300vh] bg-[#050a0f]">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                    <AmbientBackground />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full relative z-10">
                        <ProjectsHeader />

                        <div className="relative overflow-hidden">
                            <motion.div
                                style={{ opacity: leftOpacity }}
                                className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-r from-[#050a0f] to-transparent"
                            />
                            <motion.div
                                style={{ opacity: rightOpacity }}
                                className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-l from-[#050a0f] to-transparent"
                            />

                            <motion.div
                                style={{ x: xLg, willChange: 'transform' }}
                                className="relative flex gap-8 pb-4"
                            >
                                {REPOSITORIES.map((repo, index) => (
                                    <ProjectCard key={index} repo={repo} index={index} />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPc;