import { useState, useRef } from 'react';

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, Github as GithubIcon, LinkIcon } from 'lucide-react';
import { SECTIONS } from '../utils/constants';
import { BUILDS_DATA, type ProjectBuild } from '../utils/builds';
import { BuildsMobileView } from './mobile-view/BuildsMobileView';

const ProjectHUD = ({ build, active, index }: { build: ProjectBuild; active: boolean; index: number }) => {
    return (
        <div className={`flex items-center gap-4 transition-all duration-500 ${active ? 'opacity-100 translate-x-2' : 'opacity-20 translate-x-0'}`}>
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary">0{index + 1}</span>
            <div className={`h-1 w-8 rounded-full transition-all duration-500 ${active ? 'bg-primary w-12' : 'bg-muted-foreground/30 w-8'}`} />
            <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                {build.title}
            </span>
        </div>
    );
};

const TechnologyBadge = ({ items, label }: { items: string[]; label: string }) => (
    <div className="space-y-1">
        <p className="text-xs font-mono font-bold text-muted-foreground/60 uppercase ">{label}</p>
        <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
                <span key={item} className="px-1.5 py-0.5 border border-primary/5 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary/70 rounded">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

export function Builds() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map 0-1 progress to index
        const index = Math.min(
            Math.floor(latest * BUILDS_DATA.length),
            BUILDS_DATA.length - 1
        );
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const currentBuild = BUILDS_DATA[activeIndex];

    // Background parallax calculations
    const bgY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
    const bgTextY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            id={SECTIONS.BUILDS}
            ref={containerRef}
            className="relative h-[500vh] bg-background border-y border-primary/5"
        >
            {/* Sticky Container */}
            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex overflow-hidden ">

                {/* ── Background Noise & HUD Elements ── */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <motion.div
                        style={{ y: bgY }}
                        className="absolute inset-0 bg-[radial-gradient(#00d1ff_1px,transparent_1px)] [background-size:40px_40px]"
                    />
                    <motion.div
                        style={{ y: bgTextY }}
                        className="absolute top-20 right-[-10%] text-[40vh] font-black uppercase tracking-tight text-primary leading-none select-none"
                    >

                    </motion.div>
                </div>

                {/* ── Left Sidebar: Navigation HUD ── */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden lg:flex flex-col justify-between w-[250px] xl:w-[400px] 2xl:w-[460px] border-r border-primary/10 py-20 pr-10 relative z-20 bg-background/50 backdrop-blur-sm"
                >
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl xl:text-5xl  2xl:text-6xl  font-black uppercase tracking-tighter leading-none">
                                Here is what <span className="text-muted-foreground font-regular italic group transition-colors duration-300">He engineered<span className="group-hover:text-red-800 transition-colors duration-300">.</span></span>
                            </h2>
                            <p className="pr-2 text-[10px] xl:text-xs 2xl:text-sm  font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                                Highlighting projects where he focused on clean code and reliable performance.
                            </p>
                        </div>

                        <div className="space-y-4 xl:space-y-6">
                            {BUILDS_DATA.map((build, i) => (
                                <ProjectHUD
                                    key={build.id}
                                    build={build}
                                    index={i}
                                    active={activeIndex === i}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Main Content Display ── */}
                <div className="flex-1 relative w-full z-10 flex items-center justify-center p-6 xl:p-10 overflow-hidden">
                    {/* Top Scanline Pulse */}
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            top: ['0%', '100%', '0%']
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-px bg-primary/20 pointer-events-none z-30"
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentBuild.id}
                            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full  flex flex-col gap-2 xl:gap-6 2xl:gap-12 items-start  justify-start"
                        >
                            {/* Visual/ID Frame */}
                            <div className="flex relative group w-full ">
                                {/* <div className="absolute -inset-4 border border-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                                <div className=" space-y-4 2xl:space-y-8 w-full">
                                    <div className="hidden 2xl:block space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em]">Build_ID</span>
                                            <span className="h-px flex-1 bg-primary/10" />
                                        </div>
                                        <h3 className="text-2xl 2xl:text-4xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                                            {String(activeIndex + 1).padStart(2, '0')}
                                        </h3>
                                    </div>

                                    <div className="flex flex-row w-full items-center justify-between gap-6">
                                        <div className="space-y-1 2xl:space-y-4">
                                            <div className="flex flex-col xl:gap-1">
                                                <span className="hidden xl:block text-xs font-mono font-bold text-primary uppercase tracking-widest">Build_Name</span>
                                                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                                                    {currentBuild.title}
                                                </h4>
                                            </div>

                                            <div className="hidden xl:block pl-4 border-l border-primary/30 py-1">
                                                <p className="text-sm 2xl:text-lg font-medium text-muted-foreground leading-tight italic">
                                                    {currentBuild.tagline}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="max-w-xl hidden xl:block">
                                            <div className="space-y-3 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <div className="h-px w-8 bg-primary/20" />
                                                    <span className="text-[8px] 2xl:text-xs font-mono font-black text-primary/50 uppercase tracking-[0.4em]">Strategic_Origin</span>
                                                </div>
                                                <div className="relative pr-4 border-r-2 border-primary/20">
                                                    <p className="text-[10px] 2xl:text-sm font-mono text-primary/80 leading-relaxed uppercase tracking-wider">
                                                        {currentBuild.reason}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Spec Column */}
                            <div className="flex flex-col space-y-4 2xl:space-y-10 pl-4 2xl:pl-12 lg:border-l lg:border-primary/10 ">
                                <div className="space-y-2 xl:space-y-6">
                                    <p className="text-sm xl:text-base 2xl:text-xl font-bold text-foreground leading-relaxed tracking-tight">
                                        {currentBuild.description}
                                    </p>
                                    <div className="hidden xl:block xl:space-y-2 2xl:space-y-4 border-l-2 border-primary/20 pl-4 2xl:pl-6">
                                        {currentBuild.detail_points.map((point, i) => (
                                            <p key={i} className="text-xs xl:text-sm 2xl:text-base font-medium text-muted-foreground/80 leading-relaxed">
                                                {point}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="xl:hidden border-l-2 border-primary/20 pl-4">
                                        {currentBuild.detail_points.slice(0, 1).map((point, i) => (
                                            <p key={i} className="text-xs font-medium text-muted-foreground/80 leading-relaxed">
                                                {point}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 2xl:pt-8 border-t border-primary/5">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            {Object.entries(currentBuild.stack).map(([key, items]) => (
                                                <TechnologyBadge key={key} label={key} items={items} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end gap-6">
                                        <div className="w-full space-y-2 2xl:space-y-4">
                                            {currentBuild.link && (
                                                <a href={currentBuild.link} target="_blank" rel="noreferrer"
                                                    className="flex items-center justify-between p-2 2xl:p-4 border border-primary/10 bg-background hover:bg-primary/5 hover:border-primary/50 transition-all group/link rounded">
                                                    <div className="flex items-center gap-3">
                                                        <LinkIcon size={18} className="text-primary" />
                                                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Access Live Env</span>
                                                    </div>
                                                    <ChevronRight size={16} className="text-muted-foreground group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                            {currentBuild.github && (
                                                <a href={currentBuild.github} target="_blank" rel="noreferrer"
                                                    className="flex items-center justify-between p-2 2xl:p-4 border border-primary/10 bg-background hover:bg-primary/5 hover:border-primary/50 transition-all group/link rounded">
                                                    <div className="flex items-center gap-3">
                                                        <GithubIcon size={18} className="text-primary" />
                                                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Source Code</span>
                                                    </div>
                                                    <ChevronRight size={16} className="text-muted-foreground group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                            {!currentBuild.link && (
                                                <div className="flex items-center justify-between p-2 2xl:p-4 border border-orange-500/20 bg-orange-500/5 rounded group/status">
                                                    <div className="flex items-center gap-3">
                                                        <LinkIcon size={18} className="text-primary" />
                                                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Deployment Status</span>
                                                    </div>
                                                    <span className="text-[10px] font-mono font-black text-orange-500/60 uppercase tracking-widest">Local_Only</span>
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            {/* Mobile View - Separate Component for sm, xs, md */}
            <BuildsMobileView />
        </section>
    );
}
