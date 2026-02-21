import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, type Variants } from 'framer-motion';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { CAREER_DATA } from '../utils/career';
import { SECTIONS } from '../utils/constants';

const WORK_MISSIONS = CAREER_DATA.map(exp => ({ ...exp, type: 'EXPERIENCE' as const }));

export function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.min(WORK_MISSIONS.length - 1, Math.floor(v * WORK_MISSIONS.length));
        if (index !== activeIndex) setActiveIndex(index);
    });

    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(WORK_MISSIONS.length - 1) * 100}%`]
    );

    const activeMission = WORK_MISSIONS[activeIndex];



    return (
        <section className="relative bg-background">
            <div ref={sectionRef} style={{ height: `${WORK_MISSIONS.length * 100}vh` }} className="relative">
                <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-b border-border/10">
                    <div className="flex flex-col lg:flex-row h-full">
                        {/* ─── LEFT SIDE: Sticky Narrator Hub ─────────────────────────── */}
                        <div className="lg:w-1/3 h-full py-8 lg:py-12 2xl:py-20 3xl:py-32 pr-10 border-b  flex flex-col justify-between overflow-hidden">
                            <motion.div
                                className="space-y-12 relative z-10 h-full"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={leftPanelVariants}
                            >
                                <div className="space-y-6 justify-between flex flex-col h-full">
                                   <motion.h2
                                        variants={headerVariants}
                                        className="text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase tracking-tighter leading-none italic "
                                    >
                                        <span className="text-muted-foreground font-regular not-italic">His </span>Professional <span className="group not-italic">Path<span className="group-hover:800">.</span></span>
                                    </motion.h2>


                                    <motion.div variants={narrationVariants} className="">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeIndex}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                className=""
                                            >
                                                <p className="text-xs xl:text-base text-foreground font-medium italic leading-relaxed">
                                                    " {activeMission.summary} "
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ─── RIGHT SIDE: Scrolling Mission Stream ─────────────────────── */}
                        <div className="lg:w-2/3 h-full overflow-hidden ">
                            <motion.div style={{ y: yTransform }} className="h-full will-change-transform">
                                {WORK_MISSIONS.map((mission, idx) => (
                                    <div key={mission.id} className="h-full ">
                                        <MissionLogEntry mission={mission} index={idx} idPrefix="work-mission" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Left Panel: header first, then narration ───────────────────────────
const leftPanelVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4
        }
    }
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

const narrationVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

// ─── Right Panel: mission entry stagger (delayed to match narration) ────
const entryVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2,
            duration: 0.6,
            ease: "easeOut" as const,
            delay: 0.4
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

const MissionLogEntry = ({
    mission,
    index,
    idPrefix
}: {
    mission: any;
    index: number;
    idPrefix: string;
}) => {
    return (
        <div
            id={`${idPrefix}-${index}`}
            className="h-full flex flex-col justify-start p-8 lg:p-12 2xl:p-20 3xl:p-32 relative border-l border-b"
        >
            <motion.div
                className="relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={entryVariants}
            >
                {/* Header info */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="space-y-1">
                            <h3 className="text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl font-black uppercase tracking-tighter italic">
                                {mission.company}
                            </h3>
                        </div>
                    </div>
                </motion.div>

                {/* Role & Location */}
                <motion.div variants={itemVariants} className="flex flex-row justify-between gap-8 items-center border-t border-b border-border/10 py-6">
                    <div className="space-y-1">
                        <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Identity</p>
                        <p className="text-sm xl:text-xl font-black uppercase text-primary tracking-tight">{mission.role}</p>
                    </div>
                    <div className="h-8 w-[1px] bg-border/10 hidden sm:block" />
                    <div className="space-y-1">
                        <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                        <p className="text-sm xl:text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            {mission.location}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Time_Stamp</p>
                        <p className="text-sm xl:text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            {mission.period}
                        </p>
                    </div>
                </motion.div>

                {/* Narrative Details */}
                <motion.div variants={itemVariants} className="space-y-4 2xl:space-y-8 group ">
                    {mission.description.map((line: string, i: number) => (
                        <p key={i} className="text-xs xl:text-lg 2xl:text-2xl text-muted-foreground font-medium leading-relaxed">
                            {line}
                        </p>
                    ))}
                </motion.div>

                {/* Tech Matrix */}
                <motion.div variants={itemVariants} className="pt-12 flex flex-wrap gap-3">
                    {mission.technologies.map((tech: string) => (
                        <div
                            key={tech}
                            className="flex items-center gap-2 pl-2 pr-4 py-2 bg-accent/30 border border-border/20 rounded group/tech hover:border-primary/40 transition-all cursor-default"
                        >
                            <ArrowUpRight size={12} className="text-primary/40 group-hover:tech:text-primary transition-colors" />
                            <span className="text-[8px] xl:text-[11px] font-mono font-black text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};
