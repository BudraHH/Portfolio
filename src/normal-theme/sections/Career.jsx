import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';

/**
 * 3D Tilt Card Component for extra interactivity
 */
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const [hover, setHover] = useState(false);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const transform = useMotionTemplate`rotateX(${x}deg) rotateY(${y}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(yPct * -5); // Gentle tilt
        y.set(xPct * 5);
    };

    const handleMouseLeave = () => {
        setHover(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const TimelineCard = ({ data, index }) => {
    const isEven = index % 2 === 0;
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Reveal Animations
    const yYear = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const opacityYear = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.8, 0]);

    // Auto-draw connector line
    const lineScale = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

    // Center Dot Pulse
    const scaleDot = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [1, 2, 1]);
    const glowDot = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0]);

    return (
        <div ref={cardRef} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${isEven ? 'md:flex-row-reverse' : ''} perspective-1000`}>

            {/* 1. Date/Meta Side */}
            <div className={`w-full md:w-1/2 flex items-center ${isEven ? 'justify-start md:pl-24' : 'justify-end md:pr-24'}`}>
                <div className={`relative flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>

                    {/* Parallax Year - Smoother & Larger */}
                    <motion.span
                        style={{ y: yYear, opacity: opacityYear }}
                        className="text-9xl md:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/[0.08] to-transparent font-mono select-none absolute top-1/2 -translate-y-1/2 z-0 origin-center pointer-events-none tracking-tighter"
                    >
                        {data.year}
                    </motion.span>

                    <div className="relative z-10 flex flex-col gap-2">
                        <motion.div
                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className={`flex items-center gap-3 text-3xl font-bold text-white ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            {data.type === 'education' ? <FaGraduationCap className="text-cyan-200" /> : <FaBriefcase className="text-cyan-400" />}
                            <span className="tracking-tight drop-shadow-lg">{data.period}</span>
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`text-sm text-cyan-400 font-mono tracking-[0.3em] uppercase ${isEven ? 'text-left' : 'text-right'}`}
                        >
                            {/* Animated Type Indicator */}
                            <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse" />
                            {data.type}
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* 2. Center Timeline Node */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                {/* Ripple Effect */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    style={{ scale: scaleDot, opacity: (opacityYear/4) * 3 }}
                    className="absolute w-24 h-24 rounded-full border border-cyan-500/30"
                />
                <motion.div
                    style={{ opacity: glowDot }}
                    className="absolute w-12 h-12 rounded-full bg-cyan-400/20 blur-md"
                />

                <div className="w-4 h-4 rounded-full bg-[#050a0f] border-[3px] border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] relative z-20" />

                {/* Animated Horizontal Connectors */}
                <motion.div
                    style={{ scaleX: lineScale }}
                    className="hidden md:block absolute top-1/2 left-4 w-14 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent origin-left"
                />
                <motion.div
                    style={{ scaleX: lineScale }}
                    className="hidden md:block absolute top-1/2 right-4 w-14 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent origin-right "
                />
            </div>

            {/* 3. Content Card Side */}
            <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-24' : 'md:pl-24'}`}>
                <TiltCard className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-cyan-500/40 transition-all duration-500 cursor-default">

                    {/* Animated Border Shimmer */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shine-slow" />
                    </div>

                    {/* HUD Elements */}
                    <div className="absolute top-4 right-4 flex gap-1">
                        <div className="w-1 h-1 bg-cyan-500/50 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-500/10 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 transform-gpu translate-z-10">
                        <div className="flex flex-col gap-2 mb-6">
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">
                                {data.role}
                            </h3>
                            <div className="flex items-center gap-3 text-sm font-mono border-b border-white/5 pb-4">
                                <span className="text-cyan-100">{data.company}</span>
                                <span className="text-cyan-500">::</span>
                                <span className="text-zinc-400">{data.location}</span>
                            </div>
                        </div>

                        <p className="text-zinc-300/80 leading-relaxed mb-6 font-light">
                            {data.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {data.tech.map((t, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(6,182,212,0.15)" }}
                                    className="text-[10px] font-bold font-mono text-cyan-300 px-3 py-1.5 bg-cyan-950/20 rounded border border-cyan-500/20 shadow-sm transition-all flex items-center gap-1"
                                >
                                    <FaCode size={8} className="opacity-50" />
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </div>
        </div>
    );
};

const Career = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Laser Line Animation
    const LineHeight = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

    const timelineData = [
        {
            type: 'work',
            year: "2023",
            role: "Senior Full Stack Dev",
            company: "Tech Solutions Inc.",
            location: "Remote",
            period: "2023 - Present",
            description: "Architecting scale-ready enterprise dashboards using React 18 concurrencies. Orchestrating microservices with Node.js and Docker for high-availability systems.",
            tech: ["REACT", "NEXT.JS", "NODE", "AWS", "DOCKER"]
        },
        {
            type: 'work',
            year: "2021",
            role: "Web Developer",
            company: "Digital Agency",
            location: "Los Angeles",
            period: "2021 - 2023",
            description: "Led the frontend migration of legacy sites to modern Jamstack architectures. Achieved a consistent 40% reduction in TTI (Time to Interactive).",
            tech: ["VUE", "JS", "SCSS", "FIREBASE"]
        },
        {
            type: 'education',
            year: "2017",
            role: "B.Tech Comp. Science",
            company: "University of Technology",
            location: "India",
            period: "2017 - 2021",
            description: "Specialized in High-Performance Computing and Web Technologies. Captained the University Code Warriors team to nationals.",
            tech: ["DSA", "ALGORITHMS", "JAVA", "PYTHON"]
        }
    ];

    return (
        <section
            id="career"
            ref={sectionRef}
            className="relative py-48 bg-[#050a0f] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header with Reveal */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative text-center group"
                    >
                        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight relative z-10 mix-blend-overlay">
                            Career <span className="text-cyan-500">&</span> Education
                        </h2>

                        {/* Glowing Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                        />

                        {/* Huge Background Text - Fixed Position style */}
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold text-transparent stroke-cyan-500/10 whitespace-nowrap -z-10 select-none opacity-20 blur-sm">
                            JOURNEY
                        </span>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Static Guide Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/[0.03]" />

                    {/* Animated Laser Beam */}
                    <motion.div
                        style={{ height: LineHeight }}
                        className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)] origin-top z-10 rounded-full"
                    >
                        {/* Laser Head */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
                    </motion.div>

                    <div className="space-y-20">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={index} data={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Career;
