import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CAREER_DATA, EDUCATION_DATA } from '../utils/career';
import { SECTIONS } from '../utils/constants';

// ─── Animation Variants ─────────────────────────────────────────────────
const sectionHeaderVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

const entryVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.15,
            staggerChildren: 0.15,
            duration: 0.5,
            ease: "easeOut" as const
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const }
    }
};

// ─── Hook: below md breakpoint (768px) ──────────────────────────────────
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);
    return isMobile;
}

export const CareerMobile = () => {
    const isMobile = useIsMobile();

    return (
        <section id={SECTIONS.CAREER} className="py-10">
            {/* Experience: lock & scroll on xs/sm, normal scroll on md */}
            {isMobile ? <ExperienceLockScroll /> : <ExperienceNormalScroll />}

            {/* ═══════════════════════════════════════════════════════════
                ACADEMIC BACKGROUND — Always Normal Scroll
               ═══════════════════════════════════════════════════════════ */}
            <div className="pt-10 md:pt-20">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionHeaderVariants}
                    className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none italic mb-5"
                >
                    <span className="text-muted-foreground font-normal not-italic">His </span>Academic <span className="group not-italic">Background<span className="group-hover:text-red-800">.</span></span>
                </motion.h2>

                <div className="space-y-20">
                    {EDUCATION_DATA.map((edu) => (
                        <motion.div
                            key={edu.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={entryVariants}
                            className="space-y-6"
                        >
                            <motion.div variants={itemVariants}>
                                <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
                                    {edu.institution}
                                </h3>
                            </motion.div>

                            <motion.div variants={itemVariants} className="border-t border-b border-border/10 py-4 space-y-3">
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                                        UnderGraduation <span className="text-primary">{edu.degree}</span>
                                    </p>
                                    <p className="text-xs font-black uppercase text-primary tracking-tight">{edu.specialization}</p>
                                    <p className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest">{edu.score}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                                        <p className="text-xs font-black uppercase tracking-tight">{edu.location}</p>
                                    </div>
                                    <div className="space-y-0.5 text-right">
                                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Time_Stamp</p>
                                        <p className="text-xs font-black uppercase tracking-tight">{edu.period}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-4">
                                {edu.details.map((detail, idx) => (
                                    <p key={idx} className="text-xs text-muted-foreground font-medium leading-relaxed">
                                        {detail}
                                    </p>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ═══════════════════════════════════════════════════════════════════════════
// xs/sm: Lock & Scroll Experience
// ═══════════════════════════════════════════════════════════════════════════
const ExperienceLockScroll = () => {
    const experienceRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: experienceRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.min(CAREER_DATA.length - 1, Math.floor(v * CAREER_DATA.length));
        if (index !== activeIndex) setActiveIndex(index);
    });

    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(CAREER_DATA.length - 1) * 100}%`]
    );

    const activeMission = CAREER_DATA[activeIndex];

    return (
        <div
            ref={experienceRef}
            style={{ height: `${CAREER_DATA.length * 80}vh` }}
            className="relative "
        >
            <div className="sticky top-16 h-[calc(80vh-4rem)] flex flex-col">
                {/* Sticky Header + Narration — solid bg, above entries */}
                <div className="relative z-10 bg-background pb-4 space-y-3 border-b border-border/10 shrink-0">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionHeaderVariants}
                        className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none italic border-b border-border pb-5 pt-5"
                    >
                        <span className="text-muted-foreground font-normal not-italic">His </span>Professional <span className="group not-italic">Path<span className="group-hover:text-red-800">.</span></span>
                    </motion.h2>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    <motion.div style={{ y: yTransform }} className="h-full will-change-transform">
                        {CAREER_DATA.map((exp) => (
                            <div key={exp.id} className="h-full overflow-y-auto py-6">
                                <ExperienceEntry exp={exp} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════
// md: Normal Scroll Experience
// ═══════════════════════════════════════════════════════════════════════════
const ExperienceNormalScroll = () => {
    return (
        <div className="">
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionHeaderVariants}
                className="text-4xl font-black uppercase tracking-tighter leading-none italic pb-5 mb-10 border-b"
            >
                <span className="text-muted-foreground font-normal not-italic">His </span>Professional <span className="group not-italic">Path<span className="group-hover:text-red-800">.</span></span>
            </motion.h2>

            <div className="space-y-20">
                {CAREER_DATA.map((exp) => (
                    <ExperienceEntry key={exp.id} exp={exp} />
                ))}
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════
// Shared Experience Entry Card
// ═══════════════════════════════════════════════════════════════════════════
const ExperienceEntry = ({ exp }: { exp: typeof CAREER_DATA[number] }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            variants={entryVariants}
            className="space-y-6"
        >
            {/* Company Name */}
            <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
                    {exp.company}
                </h3>
            </motion.div>

            {/* Identity / Location / Timestamp */}
            <motion.div variants={itemVariants} className="border-t border-b border-border/10 py-4 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Identity</p>
                        <p className="text-xs font-black uppercase text-primary tracking-tight">{exp.role}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                        <p className="text-xs font-black uppercase tracking-tight">{exp.location}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Time_Stamp</p>
                        <p className="text-xs font-black uppercase tracking-tight">{exp.period}</p>
                    </div>
                </div>
            </motion.div>

            {/* Narration */}
            <motion.div variants={itemVariants}>
                <p className="text-xs text-foreground font-medium italic leading-relaxed">
                    " {exp.summary} "
                </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-4">
                {exp.description.map((line, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground font-medium leading-relaxed">
                        {line}
                    </p>
                ))}
            </motion.div>

            {/* Tech Matrix */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                    <div
                        key={tech}
                        className="flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 bg-accent/30 border border-border/20 rounded group/tech hover:border-primary/40 transition-all cursor-default"
                    >
                        <ArrowUpRight size={10} className="text-primary/40" />
                        <span className="text-[7px] font-mono font-black text-muted-foreground uppercase tracking-widest">
                            {tech}
                        </span>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};
