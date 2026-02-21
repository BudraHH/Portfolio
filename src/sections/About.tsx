import { SECTIONS } from '../utils/constants';
import { Download } from "lucide-react";

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '../components/shared/Button';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
};

export function About({ manualY }: { manualY?: number }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);





    return (
        <section id={SECTIONS.ABOUT} className="w-full relative">
            <motion.div
                style={manualY ? { y: manualY } : {}}
                className="flex flex-col w-full selection:bg-primary selection:text-white will-change-transform"
            >
                {/* Screen 1: The Identity & Narrative */}
                <div className="w-full h-[calc(100vh-4rem)] flex flex-col bg-background pl-8  xl:p-16 justify-center relative border-b border-border">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.75 }}
                        variants={container}
                        className="space-y-6 xl:space-y-8 2xl:space-y-12"
                    >


                        {/* Question Section */}
                        <div className="space-y-6">
                            <motion.div variants={fadeInUp} className="space-y-4">
                                <h2 className="text-2xl xl:text-5xl 2xl:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                                    Who <span className="text-muted-foreground italic font-regular">actually </span>is
                                    This <span className="group">Guy <span className="group-hover:text-red-800 transition-colors duration-300">?</span></span>
                                </h2>
                            </motion.div>

                            <div className="pl-2 space-x-3 xl:space-x-4 flex items-stretch">
                                <motion.div
                                    variants={fadeInLeft}
                                    className='w-1 2xl:w-1.5 3xl:w-2 self-stretch bg-primary shrink-0'
                                />
                                <motion.p
                                    variants={fadeInUp}
                                    className="ml-2 text-base 2xl:text-lg text-muted-foreground 2xl:leading-relaxed font-medium"
                                >
                                    A maker obsessed with the <span className="text-primary italic font-bold">" why "</span>—the kind of engineer who builds solutions that prevent issues from returning while delivering wonderful user experiences.
                                </motion.p>
                            </div>
                        </div>

                        <motion.div variants={fadeInUp}>
                            <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors">
                                Early career professional
                            </p>
                            <p className="text-[10px] 2xl:text-base uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                with Established Internship Depth
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className="text-xl lg:text-2xl 3xl:text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors">
                                AI & Data Science Graduate
                            </p>
                            <p className="text-[10px] 2xl:text-base uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Academic Milestone Class of 2025
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className='w-full flex flex-row justify-between items-center border-t border-border/30 pt-8 mt-12'>
                            <div className="2xl:space-y-1 group/info cursor-default">
                                <p className="text-[12px] 2xl:text-base uppercase  font-black text-primary/60 font-mono">
                                    Based In
                                </p>
                                <p className="text-base 2xl:text-lg 3xl:text-xl font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground transition-colors">
                                    Chennai, India
                                </p>
                            </div>
                            <div className="2xl:space-y-1 group/info cursor-default text-right">
                                <p className="text-[12px] 2xl:text-base uppercase font-black text-primary/60 font-mono">
                                    Local Time (IST)
                                </p>
                                <p className="text-base 2xl:text-lg 3xl:text-xl font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground transition-colors tabular-nums">
                                    {time.toLocaleTimeString('en-US', {
                                        timeZone: 'Asia/Kolkata',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true
                                    })}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Screen 2: Value Delivery & Resume */}
                <div className="w-full h-[calc(100vh-4rem)] flex flex-col bg-background pl-8  xl:p-16 justify-center relative border-b border-border">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={container}
                        className="space-y-6 xl:space-y-8 2xl:space-y-12"
                    >


                        {/* Question Section */}
                        <div className="space-y-6">
                            <motion.div variants={fadeInUp} className="space-y-4">
                                <h2 className="text-2xl xl:text-5xl 2xl:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                                    What <span className="text-muted-foreground italic font-regular">actually </span>
                                    <span className="group">can he do<span className="group-hover:text-red-800 transition-colors duration-300">?</span></span>
                                </h2>
                            </motion.div>

                            <div className="pl-2 space-x-3 xl:space-x-4 flex items-stretch">
                                <motion.div
                                    variants={fadeInLeft}
                                    className='w-1 2xl:w-1.5 3xl:w-2 self-stretch bg-primary shrink-0'
                                />
                                <motion.p
                                    variants={fadeInUp}
                                    className="ml-2 text-base 2xl:text-lg text-muted-foreground leading-tight 2xl:leading-relaxed font-medium"
                                >He turns <span className="text-primary italic font-bold">technical concepts</span> into production code. Backed by two internships' experiences, he builds reliable systems to solve everyday bottlenecks.
                                </motion.p>
                            </div>
                        </div>
                        <motion.div variants={fadeInUp}>
                            <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors">
                                Absolute Ownership
                            </p>
                            <p className="text-[10px] 2xl:text-base uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Treating every project as a long-term asset, not just a task.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-black uppercase tracking-tighter group-hover:text-secondary transition-colors">
                                Practical Work Style
                            </p>
                            <p className="text-[10px] 2xl:text-base uppercase tracking-[0.3em] font-bold text-muted-foreground/60 font-mono">
                                Keeping things simple and building tools that are easy to use and maintain.
                            </p>
                        </motion.div>

                        {/* Resume / CTA */}
                        <motion.div variants={fadeInUp} className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center gap-8">

                            <Button
                                onClick={() => window.open('/HariHaraBudra_Resume.pdf', '_blank')}
                                size="sm"
                                className="w-full font-bold uppercase hover:bg-primary/80  transition-colors tracking-widest gap-2 px-2"
                                leftIcon={<Download size={14} />}
                            >
                                Download Resume
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}