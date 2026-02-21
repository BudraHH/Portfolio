import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, type Variants } from 'framer-motion';
import { Code, Database, Layout, Brain, Cpu as Processor, Command } from 'lucide-react';
import { STACK_DATA } from '../../utils/stack';
import { SECTIONS } from '../../utils/constants';

const categoryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    "Language Layer": Code,
    "System Architecture": Processor,
    "Persistence & Cloud": Database,
    "Interactive Layer": Layout,
    "Intelligence Strata": Brain,
};
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.1
        }
    }
};

export const StackMobileView = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.min(
            STACK_DATA.length - 1,
            Math.floor(v * STACK_DATA.length)
        );
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const activeData = STACK_DATA[activeIndex];
    const Icon = categoryIcons[activeData.category] || Command;

    return (
        <section
            id={SECTIONS.STACK}
            ref={sectionRef}
            className="relative lg:hidden bg-background h-[500vh]"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col  pt-16 overflow-hidden"
            >
                {/* Section Header */}
                <motion.div variants={fadeInUp} className="mb-10 space-y-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                        Here is what <span className="text-muted-foreground font-regular italic group">He uses<span className="group-hover:text-red-800 not-italic">.</span></span>
                    </h2>

                </motion.div>

                {/* Dashboard Viewport */}
                <motion.div variants={fadeInUp} className='w-full flex flex-row gap-2 overflow-hidden items-stretch'>
                    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-accent/30 rounded border border-border/40 shadow-sm overflow-hidden ">
                        {/* Viewport Header */}
                        <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between bg-accent/5">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-primary rounded text-white italic">
                                    <Icon size={14} />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                                    {activeData.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Live</span>
                            </div>
                        </div>

                        {/* Content Stream */}
                        <div className="flex-1 overflow-hidden p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-3 h-full overflow-y-auto no-scrollbar"
                                >
                                    <div className="bg-muted/10 p-4 rounded-xl mb-4 border border-border/10">
                                        <p className="text-[11px] leading-relaxed text-muted-foreground/80 font-medium italic">
                                            "Engineered for high-performance system delivery and industrial reliability."
                                        </p>
                                    </div>

                                    {activeData.items.map((item, i) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 + 0.1 }}
                                            className="bg-white dark:bg-white/5 p-4 rounded-xl border border-border/20 flex items-center justify-between"
                                        >
                                            <span className="text-[12px] font-bold text-foreground/90">{item.name}</span>
                                            <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                                                {item.detail.split(' ')[0]}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* Vertical Progress Bar (Mobile) */}

                    </div>
                    <div className="relative w-[2px] h-full max-h-[calc(100vh-4rem)] bg-primary/10 rounded-full overflow-hidden shrink-0">
                        <motion.div
                            style={{ scaleY }}
                            className="absolute inset-x-0 top-0 h-full bg-primary origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        />
                    </div>

                </motion.div>

                {/* Footer Sync Notification */}
                <motion.div variants={fadeInUp} className="pt-8 border-t border-border/10">
                    <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
                        Constantly learning and adapting to <span className="text-primary/80">new technologies</span> and <span className="text-primary/80">industrial trends</span>.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};
