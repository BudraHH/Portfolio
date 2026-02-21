import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, type Variants } from 'framer-motion';
import {
    Database, Layout, Command,
    Brain, Code,
    Activity, Cpu as Processor
} from 'lucide-react';
import { STACK_DATA } from '../utils/stack';
import { SECTIONS } from '../utils/constants';

const categoryIcons: Record<string, any> = {
    "Language Layer": Code,
    "System Architecture": Processor,
    "Persistence & Cloud": Database,
    "Interactive Layer": Layout,
    "Intelligence Strata": Brain,
};
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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

// --- Sub-components for the Dashboard View ---


const CategoryDisplay = ({ data, index }: { data: typeof STACK_DATA[0], index: number }) => {
    return (
        <div className="flex flex-col h-full w-full p-8 bg-white dark:bg-accent/50 rounded shadow-sm border border-border/50">
            {/* Header: Identity */}
            <div className="2xl:mb-10 mb-4 2xl:space-y-4 space-y-2">
                <h4 className="text-4xl 2xl:text-5xl font-black uppercase tracking-tighter leading-none italic">
                    {data.category.split(' ')[0]} <span className="text-muted-foreground font-thin not-italic">{data.category.split(' ').slice(1).join(' ')}</span>
                </h4>
                <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">
                    A comprehensive suite of systems engineered for horizontal scalability, performance optimization, and industrial-grade reliability.
                </p>
            </div>

            {/* Content: Ingestion Stream */}
            <div className="flex-1 bg-muted/5 border border-border/40 rounded-xl overflow-hidden flex flex-col min-h-0">
                <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-muted/5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#111827] dark:text-white">Active Technology Stream</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Observing</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                    {data.items.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-accent/15 dark:bg-accent/40 p-4 rounded-lg border border-border/30 flex items-center justify-between group cursor-default"
                        >
                            <span className="text-[12px] font-medium text-foreground/90 group-hover:text-primary transition-colors">{item.name}</span>
                            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest px-3 py-1 bg-muted/10 rounded-sm">
                                {item.detail.split(' ')[0]}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export const Stack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lockedByClick, setLockedByClick] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 64px", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (lockedByClick) return;
        if (typeof window !== "undefined" && window.innerWidth < 1024) return;

        const index = Math.min(
            STACK_DATA.length - 1,
            Math.floor(v * STACK_DATA.length)
        );

        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const handleTabClick = useCallback((index: number) => {
        if (!containerRef.current) return;

        setLockedByClick(true);
        setActiveIndex(index);

        // Calculate the scroll position for this index
        // Each category takes up an equal slice of the total scrollable range
        const rect = containerRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const sectionTop = absoluteTop - 64; // adjust for navbar
        const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
        // Target the middle of the category's scroll slice for stability
        const targetScroll = sectionTop + (index / STACK_DATA.length) * totalHeight + (totalHeight / STACK_DATA.length / 2);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        setTimeout(() => setLockedByClick(false), 800);
    }, []);

    return (
        <section
            id={SECTIONS.STACK}
            ref={containerRef}
            className="relative h-auto lg:h-[300vh] bg-background"
        >
            <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden w-full">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="relative z-10 space-y-6 xl:space-y-8 2xl:space-y-12 w-full "
                >

                    {/* ─── Header Area ────────────────────────────────────────────── */}
                    <motion.h2 variants={fadeInUp} className="text-4xl xl:text-6xl 2xl:text-7xl font-black uppercase tracking-tighter leading-none">
                        Here is what <span className="text-muted-foreground font-regular italic group">He uses<span className="group-hover:text-red-800">.</span></span>
                    </motion.h2>

                    {/* ─── Dashboard Grid ─────────────────────────────────────────── */}
                    <motion.div variants={fadeInUp} className="flex flex-row items-stretch  w-full gap-8 lg:gap-12 max-h-[calc(60vh-4rem)] xl:max-h-[calc(65vh-4rem)] 2xl:max-h-[calc(70vh-4rem)] mx-auto ">

                        {/* LEFT: System Navigation Panels */}
                        <div className="flex flex-col gap-4 w-72 xl:w-96 shrink-0 ">
                            {STACK_DATA.map((group, idx) => {
                                const NavIcon = categoryIcons[group.category] || Command;
                                const isActive = activeIndex === idx;

                                return (
                                    <div key={group.category} className="flex flex-col relative">
                                        {/* Left Accent Bar for Active State */}
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A1F2B] dark:bg-primary rounded-l-md z-20" />
                                        )}

                                        <button
                                            onClick={() => handleTabClick(idx)}
                                            className={`group relative cursor-pointer rounded flex items-start gap-4 p-5 transition-all duration-300 text-left overflow-hidden ${isActive
                                                ? 'bg-white dark:bg-accent shadow-xl shadow-[#000]/5 text-[#111827] dark:text-white'
                                                : 'text-muted-foreground/60 hover:text-foreground'
                                                }`}
                                        >


                                            <div className="flex-1 min-w-0 pr-12">
                                                <h3 className={`text-sm xl:text-base font-bold tracking-tight mb-1 transition-colors ${isActive ? 'text-[#111827] dark:text-white' : ''}`}>
                                                    {group.category}
                                                </h3>

                                            </div>

                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Vertical Progress Divider (Desktop) */}
                        <div className="hidden lg:flex justify-center p self-stretch relative z-20">
                            <div className="w-[2px] h-full bg-primary/20 relative">
                                <motion.div
                                    style={{ scaleY }}
                                    className="absolute inset-x-0 top-0 h-full bg-primary origin-top will-change-transform"
                                />
                            </div>
                        </div>
                        {/* RIGHT: Active Module Viewport (Desktop) */}
                        <div className="hidden lg:flex flex-1 w-full min-h-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="h-full w-full"
                                >
                                    <CategoryDisplay data={STACK_DATA[activeIndex]} index={activeIndex} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* ─── Continuous Learning Message ────────────────────────────── */}
                    <motion.div variants={fadeInUp} className="2xl:pt-8 pt-4 border-t border-border/10">
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
                            Constantly learning and adapting to <span className="text-primary/80">new technologies</span> and <span className="text-primary/80">industrial trends</span>.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
