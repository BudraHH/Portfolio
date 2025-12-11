import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const QuoteTransition = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Opacity effects
    const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0.1, 0.9], [100, -100]);

    // Background parallax
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={containerRef}
            className="relative h-[60vh] flex items-center justify-center bg-[#050a0f] overflow-hidden"
        >
            {/* === Background Atmosphere === */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Cinematic Noise */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />

                {/* Vertical Glowing Lines (Cyber Brackets) */}
                <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2], height: ["80%", "100%", "80%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                />
                <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2], height: ["80%", "100%", "80%"] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                />

                {/* Moving Light Source */}
                <motion.div
                    style={{ y: bgY }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full mix-blend-screen"
                />

                {/* Ambient Particles */}
                {["01", "10", "11", "00"].map((bit, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "easeInOut"
                        }}
                        className="absolute text-cyan-900/20 font-mono text-4xl font-bold select-none"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + (i % 2) * 40}%`
                        }}
                    >
                        {bit}
                    </motion.div>
                ))}
            </div>

            {/* === Main Content === */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-20 text-center px-6"
            >
                {/* Decorative Top Icon */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: 48 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="mx-auto mb-8 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"
                />

                <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
                    {/* First Line: Dark & Metallic */}
                    <motion.span
                        style={{ x: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
                        className="block relative"
                    >
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-600">
                            Code by night,
                        </span>
                        {/* Subtle text shadow duplication for depth */}
                        <span className="absolute inset-0 text-zinc-800 blur-sm select-none z-0 translate-y-2">
                            Code by night,
                        </span>
                    </motion.span>

                    {/* Second Line: Glowing & Vibrant */}
                    <motion.span
                        style={{ x: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
                        className="block mt-2 relative"
                    >
                        <motion.span
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -inset-8 blur-3xl bg-cyan-500/10 rounded-full"
                        />
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            optimize by day.
                        </span>
                    </motion.span>
                </h2>

                {/* Enhanced Decorative Divider */}
                <div className="mt-12 flex items-center justify-center gap-4 opacity-60">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[1px] bg-gradient-to-l from-cyan-500 to-transparent"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                        className="w-2 h-2 rounded-full border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default QuoteTransition;
