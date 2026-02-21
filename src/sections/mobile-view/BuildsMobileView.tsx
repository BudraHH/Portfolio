import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronRight, Github as GithubIcon, LinkIcon } from 'lucide-react';
import { SECTIONS } from '../../utils/constants';
import { BUILDS_DATA } from '../../utils/builds';

const TechnologyBadge = ({ items, label }: { items: string[]; label: string }) => (
    <div className="space-y-1.5 text-left">
        <p className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">{label}</p>
        <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
                <span key={item} className="px-2 py-0.5 border border-primary/5 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary/70 rounded-sm">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

export function BuildsMobileView() {

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * BUILDS_DATA.length),
            BUILDS_DATA.length - 1
        );
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const currentBuild = BUILDS_DATA[activeIndex];

    return (
        <section
            id={SECTIONS.BUILDS}
            ref={containerRef}
            className="lg:hidden relative h-[400vh] bg-background"
        >
            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex flex-col py-10 overflow-hidden">
                {/* ── Section Header ── */}
                <div className="space-y-4 relative mb-10 shrink-0">

                    <div className="flex items-end justify-between">
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                            Here is what <span className="text-muted-foreground font-regular italic group transition-colors duration-300">He engineered<span className="group-hover:text-red-800 transition-colors duration-300">.</span></span>
                        </h2>
                    </div>

                </div>

                {/* ── Active Build Content ── */}
                <div className="flex-1 relative flex flex-col overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentBuild.id}
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex- flex flex-col md:gap-6 overflow-y-auto pb-8 scrollbar-hide"
                        >
                            {/* Record Header */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none italic">
                                        {currentBuild.title}
                                    </h3>
                                    <p className="text-sm font-bold text-primary/60 italic tracking-tight uppercase">
                                        "{currentBuild.tagline}"
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Description */}
                            <div className="space-y-6">
                                <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                                    {currentBuild.description}
                                </p>

                                {/* Strategic Origin */}
                                <div className="hidden md:block p-4 border-l-2 border-primary/20 bg-primary/5 space-y-2">
                                    <span className="text-[9px] font-mono font-black text-primary/40 uppercase tracking-[0.4em]">Strategic_Origin</span>
                                    <p className="text-[11px] font-mono text-primary/80 leading-relaxed uppercase tracking-wider italic font-bold">
                                        {currentBuild.reason}
                                    </p>
                                </div>
                            </div>

                            {/* Technology Matrix */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-primary/5">
                                <div className='space-y-2'>
                                    {Object.entries(currentBuild.stack).map(([key, items]) => (
                                        <TechnologyBadge key={key} label={key} items={items} />
                                    ))}
                                </div>
                                <div className="hidden md:block">
                                    {currentBuild.detail_points.map((point, index) => (
                                        <p key={index} className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                                            {point}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Connection Protocols */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-4">
                                {currentBuild.link ? (
                                    <a href={currentBuild.link} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-between p-3 border border-primary/20 bg-primary/10 transition-all rounded"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LinkIcon size={14} className="text-primary" />
                                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em]">ACCESS_LIVE_ENV</span>
                                        </div>
                                        <ChevronRight size={12} className="text-primary" />
                                    </a>
                                ) : (
                                    <div className="flex items-center justify-between p-3 border border-orange-500/20 bg-orange-500/5 rounded">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                            <span className="text-[9px] font-mono font-black text-orange-500 uppercase tracking-[0.2em]">AWAITING_OPS</span>
                                        </div>
                                        <span className="text-[9px] font-mono font-black text-orange-500/40 uppercase tracking-widest italic font-bold">LOCAL_ONLY</span>
                                    </div>
                                )}

                                {currentBuild.github && (
                                    <a href={currentBuild.github} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-between p-3 border border-primary/5 bg-background transition-all rounded"
                                    >
                                        <div className="flex items-center gap-3">
                                            <GithubIcon size={14} className="text-primary/60" />
                                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-muted-foreground">SOURCE_PROTOCOL</span>
                                        </div>
                                        <ChevronRight size={12} className="text-muted-foreground" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Scroll Navigator HUD ── */}
                <div className="hidden md:block shrink-0 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        {BUILDS_DATA.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col items-end overflow-hidden">
                        <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest">Protocol_Syncing</span>
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-[1px] w-24 bg-primary origin-left mt-1"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
