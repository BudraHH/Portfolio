import React, { useMemo, useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { EXPERIENCE_DATA } from '../../constants/experience';

// --- Constants & Variants ---

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 }
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

const TechBadge = memo(({ tech }) => (
    <span className="font-mono text-cyan-300 px-2 py-1 bg-cyan-950/20 rounded border border-cyan-500/20 text-[9px] inline-block">
        {tech}
    </span>
));
TechBadge.displayName = 'TechBadge';

const CompactExperienceCard = memo(({ data, index }) => {
    const isEducation = data.type === 'education';
    const IconComponent = isEducation ? FaGraduationCap : FaBriefcase;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 p-4 hover:border-cyan-500/20 transition-all duration-300 group"
            style={{ willChange: 'transform, opacity' }}
        >
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <IconComponent size={18} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base mb-1 truncate group-hover:text-cyan-400 transition-colors">
                        {data.role}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-100 text-xs mb-1">
                        <FaBuilding size={10} className="opacity-60 flex-shrink-0" />
                        <span className="truncate">{data.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
                        <FaCalendarAlt size={9} className="opacity-60 flex-shrink-0" />
                        <span>{data.period}</span>
                    </div>
                </div>
            </div>

            <p className="relative z-10 text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-2">
                {data.description}
            </p>

            <div className="relative z-10 flex flex-wrap gap-1">
                {data.tech.slice(0, 4).map((t, i) => (
                    <TechBadge key={i} tech={t} />
                ))}
                {data.tech.length > 4 && (
                    <span className="text-zinc-600 text-[9px] font-mono px-2 py-1">
                        +{data.tech.length - 4}
                    </span>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
        </motion.div>
    );
});
CompactExperienceCard.displayName = 'CompactExperienceCard';

const TabSelector = memo(({ icon: Icon, label, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${isActive
                ? 'bg-cyan-800/20 border-cyan-500/50 text-white'
                : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:border-white/10'
            }`}
    >
        <div className={`w-10 h-10 rounded-lg bg-cyan-500/10 border-cyan-500/30 text-cyan-400 border flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-102' : ''}`}>
            <Icon size={18} />
        </div>
        <div className="flex-1 text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider">
                {label}
            </div>
        </div>
        {isActive && (
            <motion.div
                layoutId="activeTab"
                className="w-2 h-2 rounded-full bg-cyan-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        )}
    </motion.button>
));
TabSelector.displayName = 'TabSelector';

const CareerHeader = memo(({ activeFilter, onFilterChange, stats }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="mb-8"
    >
        <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-4 sm:mb-5"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                My Journey
            </span>
        </motion.div>

        <motion.h2
            variants={ITEM_VARIANTS}
            className="font-bold text-white tracking-tighter leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(2rem, 10vw, 3rem)' }}
        >
            Forging{" "}
            <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                    Paths.
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
            className="text-zinc-400 leading-relaxed font-light mb-6"
            style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}
        >
            From university projects to <span className="text-cyan-400 font-medium">production full-stack systems</span> -- a timeline of growing skills, evolving mindset, and delivering real impact.
        </motion.p>

        <motion.div variants={ITEM_VARIANTS} className="grid grid-cols-2 gap-3">
            <TabSelector
                icon={FaBriefcase}
                label="Experience"
                isActive={activeFilter === 'work'}
                onClick={() => onFilterChange('work')}
            />
            <TabSelector
                icon={FaGraduationCap}
                label="Education"
                isActive={activeFilter === 'education'}
                onClick={() => onFilterChange('education')}
            />
        </motion.div>
    </motion.div>
));
CareerHeader.displayName = 'CareerHeader';

const ExpandButton = memo(({ isShowingAll, onClick }) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className="w-full py-3 mt-4 bg-white/[0.03] hover:bg-cyan-500/10 rounded-xl border border-white/10 hover:border-cyan-500/30 text-cyan-400 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
    >
        <span>{isShowingAll ? 'Show Less' : 'See More'}</span>
        <motion.svg
            animate={{ rotate: isShowingAll ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
    </motion.button>
));
ExpandButton.displayName = 'ExpandButton';

const CareerMobile = () => {
    const [activeFilter, setActiveFilter] = useState('work');
    const [showAllExperience, setShowAllExperience] = useState(false);
    const [showAllEducation, setShowAllEducation] = useState(false);

    // Calculate stats rarely changes, but keep memo just in case
    const stats = useMemo(() => {
        const education = EXPERIENCE_DATA.filter(item => item.type === 'education').length;
        const experience = EXPERIENCE_DATA.filter(item => item.type === 'work').length;
        const maxCount = Math.max(education, experience);
        return { education, experience, total: EXPERIENCE_DATA.length, maxCount };
    }, []);

    const filteredData = useMemo(() => {
        const isWork = activeFilter === 'work';
        const data = EXPERIENCE_DATA.filter(item => item.type === (isWork ? 'work' : 'education'));
        const showAll = isWork ? showAllExperience : showAllEducation;
        return showAll ? data : data.slice(0, 3);
    }, [activeFilter, showAllExperience, showAllEducation]);

    const hasMoreItems = useMemo(() => {
        const type = activeFilter === 'work' ? 'work' : 'education';
        return EXPERIENCE_DATA.filter(item => item.type === type).length > 3;
    }, [activeFilter]);

    const isShowingAll = activeFilter === 'work' ? showAllExperience : showAllEducation;

    const toggleShowAll = useCallback(() => {
        if (activeFilter === 'work') {
            setShowAllExperience(prev => !prev);
        } else {
            setShowAllEducation(prev => !prev);
        }
    }, [activeFilter]);

    const handleFilterChange = useCallback((filter) => {
        setActiveFilter(filter);
    }, []);

    return (
        <div className="md:hidden">
            <section id="career" className="relative py-16 sm:py-20 bg-[#050a0f] h-screen flex justify-center items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
                    <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <CareerHeader
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterChange}
                        stats={stats}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={CONTAINER_VARIANTS}
                    >
                        <div className="relative" style={{ minHeight: `${stats.maxCount * 120}px` }}> {/* Optimized min-height estimate */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFilter}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10 space-y-3"
                                >
                                    {filteredData.map((item, index) => (
                                        <CompactExperienceCard
                                            key={`${item.type}-${item.role}-${index}`}
                                            data={item}
                                            index={index}
                                        />
                                    ))}

                                    {hasMoreItems && (
                                        <ExpandButton
                                            isShowingAll={isShowingAll}
                                            onClick={toggleShowAll}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CareerMobile;
