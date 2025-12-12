import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws, FaFigma,
    FaVuejs, FaLinux, FaCodeBranch
} from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiRedux, SiGraphql } from 'react-icons/si';

import { SKILL_CATEGORIES } from '../../constants/skills';

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

const skillCategories = [
    {
        id: "cover",
        type: "cover",
        title: "SYSTEM ARCHITECTURE",
        subtitle: "A Handbook of Competencies",
        bgGradient: "from-cyan-950 to-slate-950",
        skills: []
    },
    {
        id: "synopsis",
        type: "synopsis",
        title: "Synopsis",
        description: "This archive contains a comprehensive breakdown of the technical capabilities utilized to engineer scalable, high-performance digital solutions. Proceed to inspect individual modules.",
        bgGradient: "from-zinc-900 to-zinc-950",
        skills: []
    },
    {
        id: "frontend",
        type: "content",
        title: "Frontend Engineering",
        description: "Crafting fully responsive, interactive, and high-performance user interfaces.",
        bgGradient: "from-cyan-900/20 to-blue-900/20",
        skills: [
            { name: "React", icon: <FaReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
            { name: "Vue.js", icon: <FaVuejs /> },
            { name: "Redux", icon: <SiRedux /> },
            { name: "Framer Motion", icon: <span className="font-bold font-serif italic">f</span> }
        ]
    },
    {
        id: "backend",
        type: "content",
        title: "Backend Architecture",
        description: "Building robust server-side systems, scalable APIs, and secure database architectures.",
        bgGradient: "from-purple-900/20 to-pink-900/20",
        skills: [
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "Python", icon: <FaPython /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "GraphQL", icon: <SiGraphql /> },
            { name: "API Design", icon: <FaCodeBranch /> }
        ]
    },
    {
        id: "devops",
        type: "content",
        title: "DevOps & Cloud",
        description: "Streamlining deployment pipelines, containerization, and managing cloud infrastructure.",
        bgGradient: "from-emerald-900/20 to-teal-900/20",
        skills: [
            { name: "Docker", icon: <FaDocker /> },
            { name: "AWS", icon: <FaAws /> },
            { name: "Git", icon: <FaGitAlt /> },
            { name: "Linux", icon: <FaLinux /> },
            { name: "Figma", icon: <FaFigma /> },
            { name: "Firebase", icon: <SiFirebase /> }
        ]
    },
    {
        id: "back-cover",
        type: "back_cover",
        title: "END OF ARCHIVE",
        subtitle: "System Shutdown",
        bgGradient: "from-slate-950 to-cyan-950",
        skills: []
    }
];

const BookPage = ({ category, index, totalPages, scrollIndex }) => {
    const flipProgress = useTransform(scrollIndex, [index, index + 1], [0, 1]);
    const rotateY = useTransform(flipProgress, [0, 1], [0, -180]);
    const zIndex = useTransform(flipProgress, [0.49, 0.51], [totalPages - index, index]);

    const isCover = category.type === 'cover' || category.type === 'back_cover';
    const skewY = useTransform(
        flipProgress,
        [0, 0.5, 1],
        isCover ? [0, 0, 0] : [0, 3, 0]
    );

    return (
        <motion.div
            style={{
                zIndex,
                rotateY,
                skewY,
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
            }}
            className="absolute top-0 right-0 w-[50%] h-full [perspective:3000px]"
        >
            {/* === FRONT FACE (Right Side Content) === */}
            <div
                className="absolute inset-0 [backface-visibility:hidden] 
                           bg-[#0A1016] 
                           border-r border-t border-b border-white/10 
                           rounded-r-lg sm:rounded-r-xl md:rounded-r-2xl 
                           overflow-y-auto md:overflow-hidden 
                           shadow-xl md:shadow-2xl
                           scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20 hover:scrollbar-thumb-cyan-500/40
                           [&::-webkit-scrollbar]:w-1
                           [&::-webkit-scrollbar-track]:bg-transparent
                           [&::-webkit-scrollbar-thumb]:bg-cyan-500/20
                           [&::-webkit-scrollbar-thumb]:rounded-full
                           hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/40"
            >
                {/* Paper Texture/Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50 pointer-events-none`} />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] sm:w-[2px] bg-white/5 pointer-events-none" /> {/* Spine crease */}

                {/* Lighting Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 
                                p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 
                                min-h-full 
                                md:h-full md:overflow-y-auto
                                scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20 hover:scrollbar-thumb-cyan-500/40
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-cyan-500/20
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/40">
                    <div className="min-h-full flex flex-col justify-center">
                        {/* Render Content Based on Type */}
                        {category.type === 'cover' ? (
                            <div className="flex flex-col items-center justify-center text-center 
                                            border-2 sm:border-4 border-double border-cyan-900/30 
                                            p-3 sm:p-4 m-1 sm:m-2
                                            min-h-[calc(100%-1rem)]">
                                <FaCodeBranch className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan-400 mb-4 sm:mb-6" />
                                <h2 className="font-bold text-white mb-1 sm:mb-2 tracking-tighter"
                                    style={{
                                        fontSize: 'clamp(1.25rem, 4vw, 3rem)',
                                    }}
                                >
                                    {category.title}
                                </h2>
                                <p className="text-cyan-500 font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12"
                                    style={{
                                        fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                    }}
                                >
                                    {category.subtitle}
                                </p>

                                <div className="mt-auto mb-6 sm:mb-8 font-mono text-zinc-500"
                                    style={{
                                        fontSize: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    }}
                                >
                                    VOLUME 1 // BD-PF
                                </div>

                                <div className="text-white/30 animate-pulse"
                                    style={{
                                        fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                    }}
                                >
                                    SCROLL TO OPEN
                                </div>
                            </div>
                        ) : category.type === 'back_cover' ? (
                            <div className="flex flex-col items-center justify-center text-center min-h-full">
                                <h3 className="font-bold text-white mb-2"
                                    style={{
                                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                    }}
                                >
                                    END OF ARCHIVE
                                </h3>
                                <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-cyan-500/50 mb-4 sm:mb-6 rounded-full" />
                                <p className="text-zinc-400 max-w-xs leading-relaxed mb-6 sm:mb-8"
                                    style={{
                                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                    }}
                                >
                                    All modules loaded successfully. Proceed to the next sector for contact protocols.
                                </p>
                                <div className="font-mono text-cyan-500 animate-pulse"
                                    style={{
                                        fontSize: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    }}
                                >
                                    SYSTEM STANDBY...
                                </div>
                            </div>
                        ) : category.type === 'synopsis' ? (
                            <div className="flex flex-col justify-center py-4">
                                <div className="mb-3 sm:mb-4 font-mono text-cyan-500 uppercase tracking-widest"
                                    style={{
                                        fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                    }}
                                >
                                    Foreword
                                </div>
                                <h3 className="font-bold text-white mb-4 sm:mb-6"
                                    style={{
                                        fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                                    }}
                                >
                                    {category.title}
                                </h3>
                                <p className="text-zinc-300 font-serif italic leading-relaxed opacity-90 mb-6 sm:mb-8"
                                    style={{
                                        fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                                    }}
                                >
                                    "{category.description}"
                                </p>
                                <div className="h-[1px] w-1/3 bg-cyan-500/50 mb-6 sm:mb-8" />
                            </div>
                        ) : (
                            <div className="py-4">
                                {/* Standard Content Header */}
                                <div className="mb-6 sm:mb-8">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                        <span className="font-bold text-white/10"
                                            style={{
                                                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                                            }}
                                        >
                                            {`0${index - 1}`}
                                        </span>
                                        <div className="h-[1px] flex-grow bg-white/10" />
                                        <span className="font-mono text-cyan-400 uppercase tracking-widest"
                                            style={{
                                                fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                            }}
                                        >
                                            System_Module
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-white mb-3 sm:mb-4"
                                        style={{
                                            fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
                                        }}
                                    >
                                        {category.title}
                                    </h3>
                                    <p className="text-zinc-400 font-light leading-relaxed"
                                        style={{
                                            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                                        }}
                                    >
                                        {category.description}
                                    </p>
                                </div>

                                {/* Standard Content Grid - Responsive */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pb-4">
                                    {category.skills.map((skill, idx) => (
                                        <div key={idx}
                                            className="flex items-center gap-2 sm:gap-3 
                                                        p-2 sm:p-3 
                                                        bg-white/5 
                                                        rounded-md sm:rounded-lg 
                                                        border border-white/5
                                                        hover:bg-white/10
                                                        transition-colors duration-300">
                                            <span className="text-zinc-400 text-base sm:text-lg md:text-xl flex-shrink-0">
                                                {skill.icon}
                                            </span>
                                            <span className="text-zinc-200 font-medium truncate"
                                                style={{
                                                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                                }}
                                            >
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* === BACK FACE (Left Side - When Flipped) === */}
            <div
                className="absolute inset-0 [backface-visibility:hidden] 
                           bg-[#080c11] 
                           border-l border-t border-b border-white/5 
                           rounded-l-lg sm:rounded-l-xl md:rounded-l-2xl 
                           overflow-hidden 
                           shadow-xl md:shadow-2xl"
                style={{
                    transform: 'rotateY(180deg)'
                }}
            >
                {/* Paper Texture */}
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/5 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] sm:w-[2px] bg-white/5" />

                {/* Lighting for Back Face */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none" />

                {/* Decorative Tech Pattern for "Back of Page" */}
                {category.type === 'back_cover' ? (
                    <div className="relative z-10 w-full h-full 
                                    border-2 sm:border-4 border-double border-cyan-900/30 
                                    p-3 sm:p-4 m-1 sm:m-2 
                                    flex flex-col items-center justify-center 
                                    bg-[#05080c]">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 
                                        rounded-full 
                                        border-2 border-cyan-900/50 
                                        flex items-center justify-center 
                                        mb-3 sm:mb-4">
                            <div className="w-2 h-2 bg-cyan-900 rounded-full" />
                        </div>
                        <div className="font-mono text-cyan-900 tracking-[0.3em] sm:tracking-[0.5em] uppercase"
                            style={{
                                fontSize: 'clamp(0.5rem, 1vw, 0.625rem)',
                            }}
                        >
                            BudraHH // PF
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 w-full h-full 
                                    p-8 sm:p-12 
                                    flex flex-col items-center justify-center 
                                    opacity-30">
                        <div className="w-24 sm:w-32 h-24 sm:h-32 
                                        rounded-full 
                                        border border-cyan-500/30 
                                        flex items-center justify-center 
                                        animate-spin-slow">
                            <div className="w-18 sm:w-24 h-18 sm:h-24 
                                            rounded-full 
                                            border border-dashed border-cyan-500/50" />
                        </div>
                        <div className="mt-6 sm:mt-8 font-mono text-center text-cyan-500"
                            style={{
                                fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                            }}
                        >
                            MODULE // COMPLETED<br />
                            {category.title.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const totalPages = SKILL_CATEGORIES.length;
    const scrollIndex = useTransform(scrollYProgress, [0.25, 1], [0, totalPages + 0.5]);

    // Book Slide-In Animation - Responsive
    const bookX = useTransform(scrollYProgress, [0.05, 0.2], ["-50%", "0%"]);
    const bookOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Text Opacities
    const introOpacity = useTransform(scrollIndex, [0, 1], [1, 0]);
    const outroOpacity = useTransform(scrollIndex, [totalPages - 1, totalPages], [0, 1]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="h-[400vh] sm:h-[450vh] md:h-[500vh] bg-[#050a0f] relative"
        >
            {/* Sticky Container for the Content */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                {/* === Ambient Background === */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] md:opacity-[0.04] mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
                    />
                    <motion.div
                        style={{ y: yBg }}
                        className="absolute top-0 right-[-10%] 
                                   w-[400px] h-[400px] 
                                   sm:w-[600px] sm:h-[600px] 
                                   md:w-[800px] md:h-[800px] 
                                   bg-cyan-500/5 
                                   rounded-full 
                                   blur-[80px] sm:blur-[100px] md:blur-[120px] 
                                   pointer-events-none"
                    />
                </div>

                <div className="max-w-7xl w-full mx-auto 
                                px-4 sm:px-6 md:px-8 lg:px-10 
                                relative z-10 flex flex-col
                                min-h-screen md:h-auto
                                py-8 md:py-0">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={containerVariants}
                        className="mb-10 sm:mb-12 md:mb-16 lg:mb-20"
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
                                Skill Arsenal
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
                                Skills{" "}
                                <span className="relative inline-block mt-1 sm:mt-2">
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                        Directory
                                        <span className="text-cyan-500">.</span>
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
                                An indexed record of the <span className="text-cyan-400 font-medium">technologies I've mastered</span> across projects and systems.
                            </motion.p>
                        </div>
                    </motion.div>

                    <div className="relative flex flex-col items-center flex-1 md:flex-initial">
                        <motion.div
                            style={{ x: bookX, opacity: bookOpacity }}
                            className="relative z-10 w-full 
                                       max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl 
                                       min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] 
                                       md:h-[550px] lg:h-[600px] xl:h-[650px] 
                                       flex justify-center 
                                       [perspective:2000px]"
                        >
                            {/* The Book "Spine/Base" */}
                            <div className="relative w-full h-full flex [transform-style:preserve-3d]">
                                {/* === THE PAGES === */}
                                {SKILL_CATEGORIES.map((category, index) => (
                                    <BookPage
                                        key={index}
                                        category={category}
                                        index={index}
                                        totalPages={SKILL_CATEGORIES.length}
                                        scrollIndex={scrollIndex}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Dynamic Status Text - Hidden on mobile */}
                        <div className="hidden lg:block absolute right-0 lg:right-32 xl:right-52 z-0 w-1/4 h-full pointer-events-none">
                            <div className="flex items-center h-full">
                                <motion.div
                                    style={{ opacity: introOpacity }}
                                    className="absolute text-white font-light italic leading-relaxed text-sm xl:text-base"
                                >
                                    " Hey there, curious mind! Before you dive in, know this — inside this book lies the secrets of advanced tech. Turn the pages, and each scroll will reveal skills, systems, and knowledge waiting just for you. "
                                    <br /> <span className="text-zinc-400">- Budra</span>
                                </motion.div>

                                <motion.div
                                    style={{ opacity: outroOpacity }}
                                    className="absolute text-cyan-400 font-light italic leading-relaxed text-sm xl:text-base"
                                >
                                    " Well done, explorer! You've navigated through every page and absorbed the tech wisdom within. Keep these insights close — they'll guide you on your next journey into the world of innovation. "
                                    <br /> <span className="text-zinc-400">- Budra</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
