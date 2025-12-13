import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Sub-Components ---

const AmbientBackground = memo(({ bgY }) => (
    <div className="absolute inset-0 pointer-events-none">
        {/* Cinematic Noise */}
        <div
            className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] md:opacity-[0.04] mix-blend-overlay z-10"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }}
        />

        {/* Subtle Grid */}
        <div
            className="absolute inset-0 opacity-0 sm:opacity-[0.015] md:opacity-[0.02] transition-opacity duration-500"
            style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }}
        />

        {/* Vertical Glowing Lines (Cyber Brackets) */}
        <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15], height: ["70%", "90%", "70%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute left-[8%] lg:left-[10%] top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        />
        <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15], height: ["70%", "90%", "70%"] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            className="hidden md:block absolute right-[8%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        />

        {/* Moving Light Source */}
        <motion.div
            style={{ y: bgY, willChange: 'transform' }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[500px] md:h-[250px] lg:w-[600px] lg:h-[300px] bg-cyan-500/5 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full mix-blend-screen"
        />

        {/* Ambient Particles */}
        <div className="hidden sm:block">
            {["01", "10", "11", "00"].map((bit, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -30, 0], opacity: [0, 0.25, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
                    className="absolute text-cyan-900/20 font-mono text-2xl sm:text-3xl md:text-4xl font-bold select-none"
                    style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 40}%`, willChange: 'transform, opacity' }}
                >
                    {bit}
                </motion.div>
            ))}
        </div>
    </div>
));
AmbientBackground.displayName = 'AmbientBackground';

const QuoteDivider = memo(() => (
    <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-3 sm:gap-4 opacity-50 sm:opacity-60">
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] w-8 sm:w-10 md:w-12 bg-gradient-to-l from-cyan-500 to-transparent"
            style={{ willChange: 'width' }}
        />
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] sm:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            style={{ willChange: 'transform' }}
        />
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] w-8 sm:w-10 md:w-12 bg-gradient-to-r from-cyan-500 to-transparent"
            style={{ willChange: 'width' }}
        />
    </div>
));
QuoteDivider.displayName = 'QuoteDivider';

const QuoteText = memo(({ textParallaxLeft, textParallaxRight }) => {
    // Check for desktop environment safely
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    return (
        <h2
            className="font-bold tracking-tighter leading-[0.95] sm:leading-[0.9]"
            style={{ fontSize: 'clamp(2.25rem, 10vw, 7rem)' }}
        >
            {/* First Line: Dark & Metallic */}
            <motion.span
                style={{ x: isDesktop ? textParallaxLeft : 0, willChange: 'transform' }}
                className="block relative mb-1 sm:mb-2"
            >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-600">
                    Code by night,
                </span>
                <span className="hidden sm:block absolute inset-0 text-zinc-800 blur-sm select-none z-0 translate-y-1 md:translate-y-2">
                    Code by night,
                </span>
            </motion.span>

            {/* Second Line: Glowing & Vibrant */}
            <motion.span
                style={{ x: isDesktop ? textParallaxRight : 0, willChange: 'transform' }}
                className="block relative"
            >
                <motion.span
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 sm:-inset-6 md:-inset-8 blur-2xl sm:blur-3xl bg-cyan-500/10 rounded-full"
                    style={{ willChange: 'opacity' }}
                />
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.25)] sm:drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] md:drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]">
                    optimize by day.
                </span>
            </motion.span>
        </h2>
    );
});
QuoteText.displayName = 'QuoteText';

const QuoteTransition = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.85, 1]);
    const y = useTransform(scrollYProgress, [0.1, 0.9], [80, -80]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const textParallaxLeft = useTransform(scrollYProgress, [0, 1], [-15, 15]);
    const textParallaxRight = useTransform(scrollYProgress, [0, 1], [15, -15]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] flex items-center justify-center bg-[#050a0f] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
        >
            <AmbientBackground bgY={bgY} />

            <motion.div
                style={{ opacity, scale, y, willChange: 'transform, opacity' }}
                className="relative z-20 text-center px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto w-full"
            >
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: 32 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="mx-auto mb-6 sm:mb-7 md:mb-8 lg:mb-10 w-[1px] h-8 sm:h-10 md:h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-40 sm:opacity-50"
                    style={{ willChange: 'height, opacity' }}
                />

                <QuoteText
                    textParallaxLeft={textParallaxLeft}
                    textParallaxRight={textParallaxRight}
                />

                <QuoteDivider />
            </motion.div>
        </section>
    );
};

export default QuoteTransition;
