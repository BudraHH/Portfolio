import React, { useMemo, useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SKILL_CATEGORIES } from '../../constants/skills';
import { NORMAL_ROUTES } from '../../constants/routes';

// --- Constants & Variants ---

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.2
        }
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

const SKILL_ITEM_VARIANTS = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    }
};

const CAROUSEL_VARIANTS = {
    enter: (direction) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
    })
};

// --- Data Preparation (Static) ---

const ALL_SKILLS = SKILL_CATEGORIES
    .filter(cat => cat.type === 'content')
    .flatMap(cat => cat.skills);

const CATEGORIES_METADATA = SKILL_CATEGORIES
    .filter(cat => cat.type === 'content')
    .map(cat => ({
        id: cat.skills[0]?.category || cat.id,
        label: cat.title,
        count: cat.skills.length
    }));

// --- Sub-Components ---

const SkillChip = memo(({ skill }) => (
    <motion.div
        variants={SKILL_ITEM_VARIANTS}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
        style={{ willChange: 'transform' }}
    >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-500/5 rounded-xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

        {/* Main Chip */}
        <div className="relative flex items-center gap-2.5 px-3.5 py-3 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-default overflow-hidden">
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* Icon */}
            <div className="relative z-10 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-cyan-400 text-base group-hover:text-cyan-300 transition-colors">
                    {skill.icon}
                </span>
            </div>

            {/* Name */}
            <span className="relative z-10 text-white font-medium text-sm truncate group-hover:text-cyan-100 transition-colors">
                {skill.name}
            </span>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    </motion.div>
));
SkillChip.displayName = 'SkillChip';

const SkillsHeader = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="mb-10 sm:mb-12"
    >
        {/* Badge */}
        <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-4 sm:mb-5"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                Skill Arsenal
            </span>
        </motion.div>

        {/* Title */}
        <motion.h2
            variants={ITEM_VARIANTS}
            className="font-bold text-white tracking-tighter leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(2rem, 10vw, 3rem)' }}
        >
            Tech{" "}
            <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                    Stack
                    <span className="text-cyan-500">.</span>
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

        {/* Description */}
        <motion.p
            variants={ITEM_VARIANTS}
            className="text-zinc-400 leading-relaxed font-light mb-6"
            style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}
        >
            A curated collection of <span className="text-cyan-400 font-medium">modern technologies</span> I leverage to build exceptional digital experiences.
        </motion.p>
    </motion.div>
));
SkillsHeader.displayName = 'SkillsHeader';

const CategoryHeader = memo(({ currentCategory, onPrev, onNext }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-cyan-400 text-sm font-bold">
                {currentCategory.label}
            </span>
            <span className="text-cyan-600 text-xs font-mono">
                {currentCategory.count}
            </span>
        </div>

        <div className="flex items-center gap-2">
            <motion.button
                onClick={onPrev}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 transition-all duration-300 active:scale-95 touch-manipulation"
            >
                <FaChevronLeft size={14} />
            </motion.button>
            <motion.button
                onClick={onNext}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 transition-all duration-300 active:scale-95 touch-manipulation"
            >
                <FaChevronRight size={14} />
            </motion.button>
        </div>
    </div>
));
CategoryHeader.displayName = 'CategoryHeader';

const SkillsCarousel = memo(({ activeIndex, currentCategory, direction }) => (
    <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={activeIndex}
                custom={direction}
                variants={CAROUSEL_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative bg-gradient-to-b from-white/[0.03] via-white/[0.01] to-transparent rounded-2xl border border-white/10 p-4 sm:p-5 backdrop-blur-sm shadow-2xl shadow-cyan-500/5"
            >
                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />

                {/* Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {currentCategory.skills.map((skill, index) => (
                        <SkillChip key={index} skill={skill} />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
));
SkillsCarousel.displayName = 'SkillsCarousel';

const CarouselIndicators = memo(({ activeIndex, count, onSelect }) => (
    <div className="flex items-center justify-center gap-2 mt-6">
        {[...Array(count)].map((_, index) => (
            <button
                key={index}
                onClick={() => onSelect(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-cyan-400' : 'w-1.5 bg-cyan-500/20 hover:bg-cyan-500/40'}`}
            />
        ))}
    </div>
));
CarouselIndicators.displayName = 'CarouselIndicators';

const SkillsMobile = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const groupedSkills = useMemo(() => {
        return CATEGORIES_METADATA.map(category => ({
            ...category,
            skills: ALL_SKILLS.filter(skill => skill.category === category.id)
        }));
    }, []);

    const goToPrevious = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev === 0 ? groupedSkills.length - 1 : prev - 1));
    }, [groupedSkills.length]);

    const goToNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev === groupedSkills.length - 1 ? 0 : prev + 1));
    }, [groupedSkills.length]);

    const handleSelect = useCallback((index) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    }, [activeIndex]);

    const currentCategory = groupedSkills[activeIndex];

    return (
        <div className="md:hidden">
            <section
                id={NORMAL_ROUTES.SECTIONS.SKILLS}
                className="relative py-16 sm:py-20 bg-[#050a0f] h-screen flex justify-center items-center overflow-hidden"
            >
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
                    />
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/3 rounded-full blur-[80px] sm:blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <SkillsHeader />

                    <div className="relative">
                        <CategoryHeader
                            currentCategory={currentCategory}
                            onPrev={goToPrevious}
                            onNext={goToNext}
                        />

                        <SkillsCarousel
                            activeIndex={activeIndex}
                            currentCategory={currentCategory}
                            direction={direction}
                        />

                        <CarouselIndicators
                            activeIndex={activeIndex}
                            count={groupedSkills.length}
                            onSelect={handleSelect}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-zinc-500 text-xs font-light">
                            Continuously expanding expertise across the full stack
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SkillsMobile;
