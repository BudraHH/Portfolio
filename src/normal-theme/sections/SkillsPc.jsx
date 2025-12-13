import React, { useRef, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCodeBranch } from 'react-icons/fa';
import { SKILL_CATEGORIES } from '../../constants/skills';
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

// --- Sub-Components ---

const AmbientBackground = memo(({ yBg }) => (
    <div className="absolute inset-0 pointer-events-none">
        <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
        />
        <motion.div
            style={{ y: yBg, willChange: 'transform' }}
            className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]"
        />
    </div>
));
AmbientBackground.displayName = 'AmbientBackground';

const SkillsHeader = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="mb-16 lg:mb-20"
    >
        <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-6"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                Skill Arsenal
            </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-6">
            <motion.h2
                variants={ITEM_VARIANTS}
                className="font-bold text-white tracking-tighter leading-[0.9]"
                style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
            >
                Skills{" "}
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
                        style={{ willChange: 'transform' }}
                    />
                </span>
            </motion.h2>
            <motion.p
                variants={ITEM_VARIANTS}
                className="text-zinc-400 max-w-xl leading-relaxed font-light"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
            >
                An indexed record of the <span className="text-cyan-400 font-medium">technologies I've mastered</span> across projects and systems.
            </motion.p>
        </div>
    </motion.div>
));
SkillsHeader.displayName = 'SkillsHeader';

const NarrativeText = memo(({ introOpacity, outroOpacity }) => (
    <div className="hidden lg:block absolute right-0 lg:right-32 xl:right-52 z-0 w-1/4 h-full pointer-events-none">
        <div className="flex items-center h-full">
            <motion.div
                style={{ opacity: introOpacity, willChange: 'opacity' }}
                className="absolute text-white font-light italic leading-relaxed text-sm xl:text-base"
            >
                " Hey there, curious mind! Before you dive in, know this — inside this book lies the secrets of advanced tech. Turn the pages, and each scroll will reveal skills, systems, and knowledge waiting just for you. "
                <br /> <span className="text-zinc-400">- Budra</span>
            </motion.div>

            <motion.div
                style={{ opacity: outroOpacity, willChange: 'opacity' }}
                className="absolute text-cyan-400 font-light italic leading-relaxed text-sm xl:text-base"
            >
                " Well done, explorer! You've navigated through every page and absorbed the tech wisdom within. Keep these insights close — they'll guide you on your next journey into the world of innovation. "
                <br /> <span className="text-zinc-400">- Budra</span>
            </motion.div>
        </div>
    </div>
));
NarrativeText.displayName = 'NarrativeText';

const SkillItem = memo(({ skill }) => (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-md sm:rounded-lg border border-white/5 hover:bg-white/10 transition-colors duration-300">
        <span className="text-zinc-400 text-base sm:text-lg md:text-xl flex-shrink-0">
            {skill.icon}
        </span>
        <span className="text-zinc-200 font-medium truncate" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
            {skill.name}
        </span>
    </div>
));
SkillItem.displayName = 'SkillItem';

const CoverContent = memo(({ title, subtitle }) => (
    <div className="flex flex-col items-center justify-center text-center border-2 sm:border-4 border-double border-cyan-900/30 p-3 sm:p-4 m-1 sm:m-2 min-h-[calc(100%-1rem)]">
        <FaCodeBranch className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan-400 mb-4 sm:mb-6" />
        <h2 className="font-bold text-white mb-1 sm:mb-2 tracking-tighter" style={{ fontSize: 'clamp(1.25rem, 4vw, 3rem)' }}>
            {title}
        </h2>
        <p className="text-cyan-500 font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12" style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
            {subtitle}
        </p>
        <div className="mt-auto mb-6 sm:mb-8 font-mono text-zinc-500" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.625rem)' }}>
            VOLUME 1 // BD-PF
        </div>
        <div className="text-white/30 animate-pulse" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
            SCROLL TO OPEN
        </div>
    </div>
));
CoverContent.displayName = 'CoverContent';

const BackCoverContent = memo(() => (
    <div className="flex flex-col items-center justify-center text-center min-h-full">
        <h3 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            END OF ARCHIVE
        </h3>
        <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-cyan-500/50 mb-4 sm:mb-6 rounded-full" />
        <p className="text-zinc-400 max-w-xs leading-relaxed mb-6 sm:mb-8" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
            All modules loaded successfully. Proceed to the next sector for contact protocols.
        </p>
        <div className="font-mono text-cyan-500 animate-pulse" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.625rem)' }}>
            SYSTEM STANDBY...
        </div>
    </div>
));
BackCoverContent.displayName = 'BackCoverContent';

const SynopsisContent = memo(({ title, description }) => (
    <div className="flex flex-col justify-center py-4">
        <div className="mb-3 sm:mb-4 font-mono text-cyan-500 uppercase tracking-widest" style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
            Foreword
        </div>
        <h3 className="font-bold text-white mb-4 sm:mb-6" style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)' }}>
            {title}
        </h3>
        <p className="text-zinc-300 font-serif italic leading-relaxed opacity-90 mb-6 sm:mb-8" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}>
            "{description}"
        </p>
        <div className="h-[1px] w-1/3 bg-cyan-500/50 mb-6 sm:mb-8" />
    </div>
));
SynopsisContent.displayName = 'SynopsisContent';

const DefaultContent = memo(({ title, description, skills, index }) => (
    <div className="py-4">
        <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="font-bold text-white/10" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
                    {`0${index - 1}`}
                </span>
                <div className="h-[1px] flex-grow bg-white/10" />
                <span className="font-mono text-cyan-400 uppercase tracking-widest" style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                    System_Module
                </span>
            </div>
            <h3 className="font-bold text-white mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>
                {title}
            </h3>
            <p className="text-zinc-400 font-light leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>
                {description}
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pb-4">
            {skills.map((skill, idx) => (
                <SkillItem key={idx} skill={skill} />
            ))}
        </div>
    </div>
));
DefaultContent.displayName = 'DefaultContent';

const BookPage = memo(({ category, index, totalPages, scrollIndex }) => {
    const flipProgress = useTransform(scrollIndex, [index, index + 1], [0, 1]);
    const rotateY = useTransform(flipProgress, [0, 1], [0, -180]);
    // Optimization: Calculate zIndex conditional without complex transform if possible, but useTransform is safest for smoothness
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
                willChange: 'transform'
            }}
            className="absolute top-0 right-0 w-[50%] h-full [perspective:3000px]"
        >
            {/* FRONT FACE */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-[#0A1016] border-r border-t border-b border-white/10 rounded-r-lg sm:rounded-r-xl md:rounded-r-2xl overflow-y-auto md:overflow-hidden shadow-xl md:shadow-2xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20 hover:scrollbar-thumb-cyan-500/40 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/40">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50 pointer-events-none`} />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] sm:w-[2px] bg-white/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 min-h-full md:h-full md:overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20 hover:scrollbar-thumb-cyan-500/40 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/40">
                    <div className="min-h-full flex flex-col justify-center">
                        {category.type === 'cover' ? <CoverContent title={category.title} subtitle={category.subtitle} /> :
                            category.type === 'back_cover' ? <BackCoverContent /> :
                                category.type === 'synopsis' ? <SynopsisContent title={category.title} description={category.description} /> :
                                    <DefaultContent title={category.title} description={category.description} skills={category.skills} index={index} />
                        }
                    </div>
                </div>
            </div>

            {/* BACK FACE */}
            <div
                className="absolute inset-0 [backface-visibility:hidden] bg-[#080c11] border-l border-t border-b border-white/5 rounded-l-lg sm:rounded-l-xl md:rounded-l-2xl overflow-hidden shadow-xl md:shadow-2xl"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/5 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] sm:w-[2px] bg-white/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none" />

                {category.type === 'back_cover' ? (
                    <div className="relative z-10 w-full h-full border-2 sm:border-4 border-double border-cyan-900/30 p-3 sm:p-4 m-1 sm:m-2 flex flex-col items-center justify-center bg-[#05080c]">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-cyan-900/50 flex items-center justify-center mb-3 sm:mb-4">
                            <div className="w-2 h-2 bg-cyan-900 rounded-full" />
                        </div>
                        <div className="font-mono text-cyan-900 tracking-[0.3em] sm:tracking-[0.5em] uppercase" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.625rem)' }}>
                            BudraHH // PF
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 w-full h-full p-8 sm:p-12 flex flex-col items-center justify-center opacity-30">
                        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
                            <div className="w-18 sm:w-24 h-18 sm:h-24 rounded-full border border-dashed border-cyan-500/50" />
                        </div>
                        <div className="mt-6 sm:mt-8 font-mono text-center text-cyan-500" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
                            MODULE // COMPLETED<br />
                            {category.title.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});
BookPage.displayName = 'BookPage';

const SkillsPc = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const totalPages = useMemo(() => SKILL_CATEGORIES.length, []);
    const scrollIndex = useTransform(scrollYProgress, [0.25, 1], [0, totalPages + 0.5]);

    // Book Slide-In Animation
    const bookX = useTransform(scrollYProgress, [0.05, 0.2], ["-50%", "0%"]);
    const bookOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Text Opacities
    const introOpacity = useTransform(scrollIndex, [0, 1], [1, 0]);
    const outroOpacity = useTransform(scrollIndex, [totalPages - 1, totalPages], [0, 1]);

    return (
        <div className="hidden md:block">
            <section
                id={NORMAL_ROUTES.SECTIONS.SKILLS}
                ref={sectionRef}
                className="h-[500vh] bg-[#050a0f] relative"
            >
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                    <AmbientBackground yBg={yBg} />

                    <div className="max-w-7xl w-full mx-auto px-8 lg:px-10 relative z-10 flex flex-col h-auto">
                        <SkillsHeader />

                        <div className="relative flex flex-col items-center flex-1">
                            <motion.div
                                style={{ x: bookX, opacity: bookOpacity, willChange: 'transform, opacity' }}
                                className="relative z-10 w-full max-w-4xl lg:max-w-5xl h-[550px] lg:h-[600px] xl:h-[650px] flex justify-center [perspective:2000px]"
                            >
                                <div className="relative w-full h-full flex [transform-style:preserve-3d]">
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

                            <NarrativeText introOpacity={introOpacity} outroOpacity={outroOpacity} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SkillsPc;
