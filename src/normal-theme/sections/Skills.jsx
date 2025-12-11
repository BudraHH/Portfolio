import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws, FaFigma,
    FaVuejs, FaLinux, FaArrowRight, FaArrowLeft, FaCodeBranch
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
    // Current Page Flip Progress relative to this specific page index
    // We want the page to start flipping when scrollIndex crosses 'index'.
    // And finish flipping when scrollIndex approaches 'index + 1'.

    // Transform range [index, index + 1] to [0, 1] (flipped state)
    // Actually, let's allow overlapping flips slightly if desired, or sequential.
    // Sequential: range [index, index+1]
    const flipProgress = useTransform(scrollIndex, [index, index + 1], [0, 1]);

    // Rotation: 0 to -180
    const rotateY = useTransform(flipProgress, [0, 1], [0, -180]);

    // Z-Index:
    // When progress < 0.5 (Front side visible): High Z (on top of right stack)
    // When progress > 0.5 (Back side visible): High Z (on top of left stack)
    // We need a step function for Z.
    // Right stack order: Lower index is higher.
    // Left stack order: Higher index is higher.
    // So:
    // If progress < 0.5: zIndex = totalPages - index
    // If progress >= 0.5: zIndex = index + totalPages (to be safe above everything? Or just index.)
    // Let's rely on standard logic:
    // Default zIndex = totalPages - index.
    // Flipped zIndex = index  (+ some offset to be on top?)

    // We can use a transform that jumps.
    // NOTE: Framer Motion uses interpolation. For discrete steps, use a very steep curve or tiny interval.
    const zIndex = useTransform(flipProgress, [0.49, 0.51], [totalPages - index, index]);

    // Skew Logic for "Paper Bend"
    // Cover and Back Cover don't bend.
    const isCover = category.type === 'cover' || category.type === 'back_cover';
    // Inner pages bend during the flip (around 0.5 progress)
    // 0 -> 0, 0.5 -> Skew, 1 -> 0.
    const skewY = useTransform(
        flipProgress,
        [0, 0.5, 1],
        isCover ? [0, 0, 0] : [0, 3, 0] // 3deg skew
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
                className="absolute inset-0 [backface-visibility:hidden] bg-[#0A1016] border-r border-t border-b border-white/10 rounded-r-2xl overflow-hidden shadow-2xl"
            >
                {/* Paper Texture/Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50`} />
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5" /> {/* Spine crease */}

                {/* Lighting Gradient representing curvature */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                    {/* Render Content Based on Type */}
                    {category.type === 'cover' ? (
                        <div className="flex flex-col items-center justify-center text-center h-full border-4 border-double border-cyan-900/30 p-4 m-2">
                            <FaCodeBranch className="text-6xl text-cyan-400 mb-6" />
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">{category.title}</h2>
                            <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] mb-12">{category.subtitle}</p>

                            <div className="mt-auto mb-8 font-mono text-[10px] text-zinc-500">
                                VOLUME 1 // BD-PF
                            </div>

                            <div className="text-xs text-white/30 animate-pulse">
                                SCROLL TO OPEN
                            </div>
                        </div>
                    ) : category.type === 'back_cover' ? (
                        <div className="flex flex-col items-center justify-center text-center h-full">
                            <h3 className="text-2xl font-bold text-white mb-2">END OF ARCHIVE</h3>
                            <div className="w-16 h-1 bg-cyan-500/50 mb-6 rounded-full" />
                            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed mb-8">
                                All modules loaded successfully. Proceed to the next sector for contact protocols.
                            </p>
                            <div className="text-[10px] font-mono text-cyan-500 animate-pulse">
                                SYSTEM STANDBY...
                            </div>
                        </div>
                    ) : category.type === 'synopsis' ? (
                        <div className="flex flex-col h-full justify-center">
                            <div className="mb-4 font-mono text-cyan-500 text-xs uppercase tracking-widest">
                                Foreword
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">{category.title}</h3>
                            <p className="text-zinc-300 font-serif italic text-xl leading-relaxed opacity-90 mb-8">
                                "{category.description}"
                            </p>
                            <div className="h-[1px] w-1/3 bg-cyan-500/50 mb-8" />
                        </div>
                    ) : (
                        <>
                            {/* Standard Content Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl md:text-5xl font-bold text-white/10">{`0${index - 1}`}</span>
                                    <div className="h-[1px] flex-grow bg-white/10" />
                                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">System_Module</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">{category.title}</h3>
                                <p className="text-zinc-400 font-light leading-relaxed">{category.description}</p>
                            </div>

                            {/* Standard Content Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-zinc-400 text-lg">{skill.icon}</span>
                                        <span className="text-zinc-200 text-sm font-medium">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* === BACK FACE (Left Side - When Flipped) === */}
            <div
                className="absolute inset-0 [backface-visibility:hidden] bg-[#080c11] border-l border-t border-b border-white/5 rounded-l-2xl overflow-hidden shadow-2xl"
                style={{
                    transform: 'rotateY(180deg)' // Pre-rotate backface so it shows correctly when parent is -180
                }}
            >
                {/* Paper Texture */}
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/5 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/5" /> {/* Spine crease */}

                {/* Lighting for Back Face */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none" />

                {/* Decorative Tech Pattern for "Back of Page" */}
                {category.type === 'back_cover' ? (
                    <div className="relative z-10 w-full h-full border-4 border-double border-cyan-900/30 p-4 m-2 flex flex-col items-center justify-center bg-[#05080c]">
                        <div className="w-20 h-20 rounded-full border-2 border-cyan-900/50 flex items-center justify-center mb-4">
                            <div className="w-2 h-2 bg-cyan-900 rounded-full" />
                        </div>
                        <div className="font-mono text-[10px] text-cyan-900 tracking-[0.5em] uppercase">
                            BudraHH // PF
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 w-full h-full p-12 flex flex-col items-center justify-center opacity-30">
                        <div className="w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
                            <div className="w-24 h-24 rounded-full border border-dashed border-cyan-500/50" />
                        </div>
                        <div className="mt-8 font-mono text-xs text-center text-cyan-500">
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

    // Create a tall scrolling track
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Map Scroll Progress (0..1) to Page Index (0..Total)
    // We add a little buffer at end.
    const totalPages = SKILL_CATEGORIES.length;
    // Map Scroll Progress to Page Index (0..Total)
    // Start opening ONLY after the book slides in (approx 0.2 progress)
    const scrollIndex = useTransform(scrollYProgress, [0.25, 1], [0, totalPages + 0.5]);



    // Book Slide-In Animation
    // Initially positioned to the left (negative X).
    // As we scroll into the section (up to a certain point), it slides to center (0).
    const bookX = useTransform(scrollYProgress, [0.05, 0.2], ["-50%", "0%"]);

    // Also fade in the book container
    const bookOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);

    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Text Opacities
    const introOpacity = useTransform(scrollIndex, [0, 1], [1, 0]);
    const outroOpacity = useTransform(scrollIndex, [totalPages - 1, totalPages], [0, 1]);

    return (
        <section id="skills" ref={sectionRef} className="h-[500vh] bg-[#050a0f] relative">

            {/* Sticky Container for the Content */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                {/* === Ambient Background === */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
                    />
                    <motion.div
                        style={{ y: yBg }}
                        className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"
                    />
                </div>

                <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex flex-col ">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={containerVariants}
                        className="mb-20 "
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Skill Arsenal</span>
                        </motion.div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                            <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-[0.9]">
                                Skills {" "}
                                <span className="relative inline-block mt-2">
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                        Directory
                                        <span className="text-cyan-500">.</span>
                                    </span>

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.25 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                                    />
                                </span>
                            </motion.h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-zinc-400 max-w-xl leading-relaxed font-light"
                            >
                                An indexed record of the <span className="text-cyan-400 font-medium">technologies I’ve mastered</span> across projects and systems.
                            </motion.p>

                        </div>
                    </motion.div>

                    <div className="relative flex flex-col md:flex-row md:justify-between md:items-center ">
                        <motion.div
                            style={{ x: bookX, opacity: bookOpacity }}
                            className="relative z-10 w-full max-w-5xl h-[550px] md:h-[650px] flex justify-center [perspective:2000px]"
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

                        {/* Dynamic Status Text */}
                        <div className="absolute right-0 md:right-32 lg:right-52 z-0 w-full md:w-1/4 h-full flex items-center pointer-events-none">
                            <motion.div
                                style={{ opacity: introOpacity }}
                                className="absolute text-white font-light italic leading-relaxed"
                            >
                                " Hey there, curious mind! Before you dive in, know this — inside this book lies the secrets of advanced tech. Turn the pages, and each scroll will reveal skills, systems, and knowledge waiting just for you. "
                                <br /> <span className="text-zinc-400">- Budra</span>
                            </motion.div>

                            <motion.div
                                style={{ opacity: outroOpacity }}
                                className="absolute text-cyan-400 font-light italic leading-relaxed"
                            >
                                " Well done, explorer! You’ve navigated through every page and absorbed the tech wisdom within. Keep these insights close — they’ll guide you on your next journey into the world of innovation. "
                                <br /> <span className="text-zinc-400">- Budra</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
