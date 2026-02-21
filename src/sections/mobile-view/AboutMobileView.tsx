import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { SECTIONS } from '../../utils/constants';
import { Download } from "lucide-react";
import { Button } from '../../components/shared/Button';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
};

export const AboutMobileView = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id={SECTIONS.ABOUT} className="w-full bg-background selection:bg-primary selection:text-white py-10 md:py-16">
            <div className="flex flex-col w-full space-y-20 py-16">
                {/* Section 1: Identity */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px", amount: 0.25 }}
                    variants={container}
                    className="space-y-10"
                >
                    <div className="space-y-6">
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.85]">
                                Who <span className="text-muted-foreground italic font-regular">actually </span>is
                                <br />This <span className="group">Guy <span className="active:text-red-800 focus:text-red-800 transition-colors duration-300">?</span></span>
                            </h2>
                        </motion.div>

                        <div className="pl-1 space-x-3 flex items-stretch">
                            <motion.div
                                variants={fadeInLeft}
                                className='w-1 self-stretch bg-primary shrink-0'
                            />
                            <motion.p
                                variants={fadeInUp}
                                className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium"
                            >
                                A maker obsessed with the <span className="text-primary italic font-bold">" why "</span>—the kind of engineer who builds solutions that prevent issues from returning.
                            </motion.p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <motion.div variants={fadeInUp}>
                            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                Early career professional
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                with Established Internship Depth
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                AI & Data Science Graduate
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Academic Milestone Class of 2025
                            </p>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className='w-full flex flex-col justify-start border-t border-border/30 pt-8'>

                        <div className="space-x-1 w-full flex flex-row justify-between items-baseline text-right">
                            <p className="text-[12px] md:text-sm uppercase  font-black text-primary/60 font-mono">
                                Based In
                            </p>
                            <p className="text-sm md:text-base font-black uppercase tracking-tighter text-primary/90">
                                Chennai, India
                            </p>
                        </div>
                        <div className="space-x-1 w-full flex flex-row justify-between items-baseline text-right">
                            <p className="text-[12px] md:text-sm uppercase font-black text-primary/60 font-mono">
                                Local Time (IST)
                            </p>
                            <p className="text-sm md:text-base font-black uppercase tracking-tighter text-primary/90 tabular-nums">
                                {time.toLocaleTimeString('en-US', {
                                    timeZone: 'Asia/Kolkata',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Section 2: Capability */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={container}
                    className="space-y-10"
                >
                    <div className="space-y-6">
                        <motion.div variants={fadeInUp}
                            viewport={{ once: true, amount: 0.5 }}>
                            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.85]">
                                What <span className="text-muted-foreground italic font-regular">actually </span>
                                <br />can he do<span className="active:text-red-800 focus:text-red-800 transition-colors duration-300">?</span>
                            </h2>
                        </motion.div>

                        <div className="pl-1 space-x-3 flex items-stretch">
                            <motion.div
                                variants={fadeInLeft}
                                viewport={{ once: true, amount: 0.5 }}
                                className='w-1 self-stretch bg-primary shrink-0'
                            />
                            <motion.p
                                variants={fadeInUp}
                                viewport={{ once: true, amount: 0.5 }}
                                className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium"
                            >
                                He turns <span className="text-primary italic font-bold">technical concepts</span> into production code. He builds reliable systems to solve everyday bottlenecks.
                            </motion.p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <motion.div variants={fadeInUp}
                            viewport={{ once: true, amount: 0.5 }}>
                            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                Absolute Ownership
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Treating every project as a long-term asset, not just a task.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}
                            viewport={{ once: true, amount: 0.5 }}>
                            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                Practical Work Style
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Keeping things simple and building tools that are easy to use.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="pt-8 border-t border-border/30"
                        viewport={{ once: true, amount: 0.5 }}>
                        <Button
                            onClick={() => window.open('/HariHaraBudra_Resume.pdf', '_blank')}
                            size="sm"
                            className="w-full font-bold uppercase tracking-widest gap-2 px-2"
                            leftIcon={<Download size={14} />}
                        >
                            Download Resume
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
