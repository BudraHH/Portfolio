import React, { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

// --- Sub-Components ---

const ProjectTags = memo(({ tags }) => (
    <div className="flex flex-wrap gap-2">
        {tags?.map((tech, i) => (
            <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-md border border-cyan-500/20 text-xs font-medium cursor-default transition-colors duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/40"
                style={{ willChange: 'transform' }}
            >
                {tech}
            </motion.span>
        ))}
    </div>
));
ProjectTags.displayName = 'ProjectTags';

const ProjectCard = memo(({ project }) => {
    return (
        <motion.div
            variants={CARD_VARIANTS}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
            style={{ willChange: 'transform' }}
        >
            <motion.div
                className="relative bg-white/[0.03] rounded-xl border border-white/10 transition-all duration-300 p-5 cursor-pointer overflow-hidden"
                whileHover={{
                    borderColor: "rgba(34, 211, 238, 0.3)",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
                }}
            >
                {/* Animated background glow on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{
                        opacity: 1,
                        background: "linear-gradient(to bottom right, rgba(34, 211, 238, 0.05), transparent)"
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: 'opacity' }}
                />

                <div className="space-y-4 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-base mb-1">
                                {project.name}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <ProjectTags tags={project.techStack} />

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-4">
                            {project.stars !== undefined && (
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <Star className="w-4 h-4 text-yellow-500/70" />
                                    <span className="text-sm">{project.stars}</span>
                                </div>
                            )}
                            {project.forks !== undefined && (
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <GitFork className="w-4 h-4 text-cyan-500/70" />
                                    <span className="text-sm">{project.forks}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 flex items-center justify-center text-zinc-400 hover:text-cyan-400 transition-all duration-300"
                                    style={{ willChange: 'transform' }}
                                >
                                    <Github className="w-4 h-4" />
                                </motion.a>
                            )}
                            {project.website && (
                                <motion.a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 flex items-center justify-center text-zinc-400 hover:text-cyan-400 transition-all duration-300"
                                    style={{ willChange: 'transform' }}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});
ProjectCard.displayName = 'ProjectCard';

const ProjectsHeader = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="mb-6 flex-shrink-0"
    >
        <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-cyan-400 text-xs font-medium uppercase tracking-wider">
                Projects
            </span>
        </motion.div>

        <motion.h2
            variants={ITEM_VARIANTS}
            className="font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.75rem, 8vw, 2.5rem)' }}
        >
            Featured{" "}
            <span className="text-cyan-400">
                Work.
            </span>
        </motion.h2>

        <motion.p
            variants={ITEM_VARIANTS}
            className="text-zinc-400 text-sm"
        >
            A curated showcase of <span className="text-cyan-400 font-medium">real-world applications</span> I've built—from concept to deployment.
        </motion.p>
    </motion.div>
));
ProjectsHeader.displayName = 'ProjectsHeader';

const ShowMoreButton = memo(({ showAll, onClick }) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className="w-full py-3 bg-white/[0.03] hover:bg-cyan-500/10 rounded-xl border border-white/10 hover:border-cyan-500/30 text-cyan-400 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
        style={{ willChange: 'transform, opacity' }}
    >
        <span>{showAll ? 'Show Less' : 'See More Projects'}</span>
        <motion.svg
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ willChange: 'transform' }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
    </motion.button>
));
ShowMoreButton.displayName = 'ShowMoreButton';

const ProjectsMobile = () => {
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = useMemo(() =>
        showAll ? REPOSITORIES : REPOSITORIES.slice(0, 3)
        , [showAll]);

    const hasMore = REPOSITORIES.length > 3;

    const toggleShowAll = useCallback(() => {
        setShowAll(prev => !prev);
    }, []);

    return (
        <div className="md:hidden">
            <section id={NORMAL_ROUTES.SECTIONS.PROJECTS} className="relative py-16 sm:py-20 bg-[#050a0f]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <ProjectsHeader />

                    <div className="space-y-4">
                        <AnimatePresence mode="sync">
                            {visibleProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.name}
                                    project={project}
                                />
                            ))}
                        </AnimatePresence>

                        {hasMore && (
                            <ShowMoreButton showAll={showAll} onClick={toggleShowAll} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsMobile;
