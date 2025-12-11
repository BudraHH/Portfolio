import React, { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaBolt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { REPOSITORIES, LANGUAGE_COLORS } from '../../constants/projects';

/**
 * 3D Tilt Card Component
 */
const TiltCard = ({ children, className, initial, whileInView, viewport, transition }) => {
    const ref = useRef(null);
    const [hover, setHover] = useState(false);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const transform = useMotionTemplate`rotateX(${x}deg) rotateY(${y}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(yPct * -5); // Gentle tilt
        y.set(xPct * 5);
    };

    const handleMouseLeave = () => {
        setHover(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform }}
            className={className}
            initial={initial}
            whileInView={whileInView}
            viewport={viewport}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};

// Helper to determine visual style based on project keywords
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
            <div className="w-full h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-4 border-b border-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-white opacity-50" />
                <div className="flex gap-2 mb-3">
                    <div className="w-1/3 h-24 bg-zinc-800 rounded-lg animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-1/3 h-24 bg-zinc-800 rounded-lg animate-pulse" style={{ animationDelay: '100ms' }} />
                    <div className="w-1/3 h-24 bg-zinc-800 rounded-lg animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
                <div className="flex gap-2">
                    <div className="w-2/3 h-4 bg-zinc-800 rounded-md" />
                    <div className="w-1/3 h-4 bg-cyan-500/20 rounded-md" />
                </div>
            </div>
        );
    }
    if (type === 'task') {
        return (
            <div className="w-full h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-4 border-b border-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-200 opacity-50" />
                <div className="flex gap-3 h-full">
                    <div className="w-1/3 h-full bg-zinc-800/50 rounded-lg p-2 flex flex-col gap-2">
                        <div className="w-full h-2 bg-zinc-700 rounded-full" />
                        <div className="w-full h-6 bg-zinc-700/50 rounded" />
                        <div className="w-full h-6 bg-zinc-700/50 rounded" />
                    </div>
                    <div className="w-1/3 h-full bg-zinc-800/50 rounded-lg p-2 flex flex-col gap-2">
                        <div className="w-full h-2 bg-cyan-500/50 rounded-full" />
                        <div className="w-full h-12 bg-zinc-700/50 rounded border-l-2 border-cyan-500" />
                    </div>
                    <div className="w-1/3 h-full bg-zinc-800/50 rounded-lg p-2 flex flex-col gap-2">
                        <div className="w-full h-2 bg-zinc-700 rounded-full" />
                        <div className="w-full h-6 bg-zinc-700/50 rounded" />
                        <div className="w-full h-6 bg-zinc-700/50 rounded" />
                    </div>
                </div>
            </div>
        );
    }
    // AI / Chat style
    return (
        <div className="w-full h-48 bg-zinc-900/50 rounded-t-xl overflow-hidden relative transition-transform duration-500 p-4 border-b border-white/5 flex flex-col justify-end gap-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white to-cyan-500 opacity-50" />
            <div className="self-end bg-zinc-800 px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                <div className="w-24 h-2 bg-zinc-600 rounded-full" />
            </div>
            <div className="self-start bg-cyan-500/10 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] border border-cyan-500/20">
                <div className="w-32 h-2 bg-cyan-400/40 rounded-full mb-1" />
                <div className="w-20 h-2 bg-cyan-400/40 rounded-full" />
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-32 md:py-48 bg-cyan-950/5 relative overflow-hidden">

            {/* Background & Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Grid Pattern */}


                {/* Subtle Moving Lines */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '10s' }} />
                    <div className="absolute top-0 left-[50%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '12s', animationDelay: '1s' }} />
                    <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '15s', animationDelay: '2s' }} />
                </div>

                {/* Blob Glows */}
                <div className="absolute top-0 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative text-center group"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight relative z-10 mix-blend-overlay">
                            Featured <span className="text-cyan-500">Works</span>
                        </h2>

                        {/* Glowing Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                        />

                        {/* Huge Background Text */}
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] font-bold text-transparent stroke-cyan-500/10 whitespace-nowrap -z-10 select-none opacity-20 blur-sm">
                            PROJECTS
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {REPOSITORIES.map((repo, index) => (
                        <TiltCard
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300"
                        >
                            {/* Animated Border Shimmer */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine-slow" />
                            </div>

                            {/* Smart Visual Preview */}
                            <div className="relative z-10">
                                <ProjectCardPreview repo={repo} />
                            </div>

                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {repo.name}
                                    </h3>
                                    <div className="flex gap-3 text-zinc-500">
                                        {repo.website && (
                                            <a href={repo.website} target="_blank" rel="noreferrer" className="hover:text-cyan-400 hover:scale-110 transition-all">
                                                <FaExternalLinkAlt size={16} />
                                            </a>
                                        )}
                                        <a href={repo.github} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all">
                                            <FaGithub size={18} />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow font-light">
                                    {repo.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {repo.techStack.map((t, i) => (
                                        <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-cyan-300 bg-cyan-950/20 rounded border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        {repo.languages.map((language, i) => (
                                            <span>{language}{i % 2 !== 0 ? "" : " | "}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                            <FaStar /> {repo.stars}
                                        </span>
                                        <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                            <FaCodeBranch /> {repo.forks}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* View More Button */}
                <div className="flex justify-center">
                    <a
                        href="https://github.com/BudraHH"
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-3 rounded-xl border border-cyan-500/30 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 hover:border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
                    >
                        View Full Archive on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
