import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, type Variants } from 'framer-motion';
import { EDUCATION_DATA, type Education } from '../utils/career';

export function Education() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.min(EDUCATION_DATA.length - 1, Math.floor(v * EDUCATION_DATA.length));
        if (index !== activeIndex) setActiveIndex(index);
    });

    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(EDUCATION_DATA.length - 1) * 100}%`]
    );


    return (
        <section className="relative bg-background h-full">
            <div ref={sectionRef} className="relative h-full">
                <div className="overflow-hidden border-b border-border/10 h-full">
                    <div className="flex flex-col lg:flex-row h-full">
                        {/* ─── LEFT SIDE: Sticky Narrator Hub ─────────────────────────── */}
                        <div className="lg:w-1/3 h-full py-8 lg:py-12 2xl:py-20 3xl:py-32 pr-10 border- border-primary/10  flex flex-col justify-between overflow-hidden">
                            <motion.div
                                className="space-y-12 relative z-10 h-full"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={leftPanelVariants}
                            >
                                <div className="space-y-6">
                                    <motion.h2
                                        variants={headerVariants}
                                        className="text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase tracking-tighter leading-none italic "
                                    >
                                        <span className="text-muted-foreground font-regular not-italic">His </span>Academic <span className="group not-italic">Background<span className="group-hover:text-red-800">.</span></span>
                                    </motion.h2>


                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/3 h-full overflow-hidden">
                            <motion.div style={{ y: yTransform }} className="h-full will-change-transform">
                                {EDUCATION_DATA.map((edu, idx) => (
                                    <div key={edu.id} className="h-full">
                                        <EducationLogEntry education={edu} index={idx} idPrefix="edu-mission" />
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


// ─── Right Panel: education entry stagger (delayed to match narration) ──
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

const EducationLogEntry = ({
    education,
    index,
    idPrefix
}: {
    education: Education;
    index: number;
    idPrefix: string;
}) => {
    return (
        <div
            id={`${idPrefix}-${index}`}
            className="h-full flex flex-col justify-start p-8 lg:p-12 2xl:p-20 3xl:p-32 relative border-l"
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
                                {education.institution}
                            </h3>
                        </div>
                    </div>
                </motion.div>

                {/* Role & Location */}
                <motion.div variants={itemVariants} className="flex flex-row justify-between gap-8 items-center border-t border-b border-border/10 py-6">
                    <div className="space-y-1">
                        <div className='flex flex-row justify-between items-center w-full gap-4'>
                            <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">UnderGraduation <span className="text-primary">{education.degree}</span></p>
                            <p className="text-sm xl:text-xl font-black uppercase text-primary tracking-tight">{education.score}</p>
                        </div>
                        <p className="text-xl font-black uppercase text-primary tracking-tight">{education.specialization}</p>

                    </div>
                    <div className="h-8 w-[1px] bg-border/10 hidden sm:block" />
                    <div className="space-y-1">
                        <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                        <p className="text-sm xl:text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            {education.location}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Time_Stamp</p>
                        <p className="text-sm xl:text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            {education.period}
                        </p>
                    </div>
                </motion.div>

                {/* Narrative Details */}
                <motion.div variants={itemVariants} className="space-y-4 2xl:space-y-8 group mt-4">
                    {education.details.map((line: string, i: number) => (
                        <div key={i} className="flex gap-8 group/item">
                            <p className="text-lg 2xl:text-2xl text-muted-foreground font-medium leading-relaxed">
                                {line}
                            </p>
                        </div>
                    ))}
                </motion.div>

            </motion.div>
        </div>
    );
};

