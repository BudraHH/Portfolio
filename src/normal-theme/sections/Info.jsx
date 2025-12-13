import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCopy, FaArrowRight } from 'react-icons/fa';
import { PROFILE } from '../../constants/profile';
import { NORMAL_ROUTES } from '../../constants/routes';

// --- Constants & Variants ---

const STAGGER_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const FADE_IN_UP = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const SLIDE_IN_LEFT = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

// --- Sub-Components ---

const NoiseOverlay = memo(() => (
    <div
        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
        }}
    />
));
NoiseOverlay.displayName = 'NoiseOverlay';

const GridPattern = memo(() => (
    <div
        className="absolute inset-0 opacity-0 sm:opacity-[0.015] md:opacity-[0.02] pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
        }}
    />
));
GridPattern.displayName = 'GridPattern';

const AmbientGlow = memo(() => (
    <>
        <motion.div
            animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute top-1/4 right-0 
                       w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] xl:w-[700px] xl:h-[700px] 
                       bg-cyan-500/8 rounded-full blur-[100px] sm:blur-[120px] md:blur-[140px] lg:blur-[150px] mix-blend-screen pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
        />
        <motion.div
            animate={{
                scale: [1.15, 1, 1.15],
                opacity: [0.15, 0.35, 0.15]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }}
            className="absolute bottom-1/3 left-0 
                       w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 
                       bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] mix-blend-screen pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
        />
    </>
));
AmbientGlow.displayName = 'AmbientGlow';

const SectionBadge = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-5 sm:mb-6 md:mb-7 lg:mb-8 hover:border-cyan-500/40 transition-colors duration-300"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
            Info about me
        </span>
    </motion.div>
));
SectionBadge.displayName = 'SectionBadge';

const DetailCard = memo(({ icon, label, value, isLink, href }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = useCallback((e) => {
        if (isLink) {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [isLink, value]);

    const handleEnter = useCallback(() => setIsHovered(true), []);
    const handleLeave = useCallback(() => setIsHovered(false), []);

    const content = (
        <div
            className="relative group h-full mx-4 md:mx-0"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Gradient Border */}
            <div className={`absolute -inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 via-cyan-500/5 to-transparent transition-all duration-700 ${isHovered ? 'from-cyan-500/40 via-cyan-500/10 to-transparent' : 'opacity-100'}`} />

            {/* Card Body */}
            <div className={`relative h-full p-2 sm:p-5 rounded-xl sm:rounded-2xl bg-[#050a0f]/90 backdrop-blur-xl border-t border-white/5 shadow-2xl transition-all duration-500 ${isHovered ? 'bg-[#050a0f]/70' : ''}`}>

                {/* Radial Glow */}
                <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08) 0%, transparent 70%)' }}
                />

                <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover:text-cyan-400/70 transition-colors duration-300">
                        {label}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isLink && (
                            <motion.button
                                onClick={handleCopy}
                                whileTap={{ scale: 0.9 }}
                                className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono transition-all duration-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md hover:bg-cyan-500/10 min-w-[32px] min-h-[32px] flex items-center justify-center touch-manipulation"
                                style={{ willChange: 'transform' }}
                            >
                                <span className={`transition-all duration-300 ${copied ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-cyan-500'}`}>
                                    {copied ? 'COPIED' : <FaCopy className="text-xs" />}
                                </span>
                            </motion.button>
                        )}
                        <div className={`text-base sm:text-lg md:text-xl transition-colors duration-300 ${copied ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-cyan-400'}`}>
                            {icon}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-zinc-300 font-light group-hover:text-white transition-colors duration-300 leading-relaxed break-words text-sm sm:text-base 2xl:text-lg">
                    {value}
                </div>

                {/* Bottom Accent */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent origin-center transition-transform duration-500 transform ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
                />
            </div>
        </div>
    );

    return isLink && href ? <a href={href} className="block">{content}</a> : content;
});
DetailCard.displayName = 'DetailCard';

const MainHeading = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={STAGGER_CONTAINER}
        className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-10 relative"
    >
        <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute -top-8 sm:-top-10 -left-6 sm:-left-8 md:-left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none"
            style={{ willChange: 'transform' }}
        />

        <motion.h2
            variants={FADE_IN_UP}
            className="font-bold text-white mb-4 sm:mb-5 md:mb-5 tracking-tighter leading-[0.9] sm:leading-[0.95]"
            style={{ fontSize: 'clamp(1.675rem, 5vw, 5rem)' }}
        >
            Beyond the{" "}
            <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                    Code.
                </span>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[2px] sm:h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                    style={{ willChange: 'transform' }}
                />
            </span>
        </motion.h2>

        <motion.p
            variants={FADE_IN_UP}
            className="text-zinc-400 max-w-xl xl:max-w-2xl 2xl:max-w-3xl leading-relaxed font-light"
            style={{ fontSize: 'clamp(0.6rem, 2.25vw, 1.25rem)' }}
        >
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 font-medium">logic dances with creativity</span>—building digital experiences that don't just function, but <span className="text-zinc-200 font-normal">resonate</span>.
        </motion.p>
    </motion.div>
));
MainHeading.displayName = 'MainHeading';

const WhoAmISection = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={STAGGER_CONTAINER}
        className="mb-8 sm:mb-10 md:mb-12 relative"
    >
        <motion.h3
            variants={SLIDE_IN_LEFT}
            className="font-bold mb-6 sm:mb-7 md:mb-8 lg:mb-10 tracking-tight relative inline-block"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
        >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-400">
                Who am I?
            </span>
            <span className="hidden sm:block absolute inset-0 blur-lg bg-gradient-to-r from-cyan-500/10 to-transparent -z-10" />
        </motion.h3>

        <motion.div variants={FADE_IN_UP} className="relative pl-6 sm:pl-7 md:pl-8">
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-[2px] sm:w-0.5 bg-gradient-to-b from-cyan-500/60 via-cyan-500/20 to-transparent rounded-full"
                style={{ willChange: 'height' }}
            />

            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[-2px] top-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] sm:shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-[-2px] top-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] sm:shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />

            <div className="space-y-4 sm:space-y-5 text-zinc-300 leading-relaxed max-w-2xl xl:max-w-3xl 2xl:max-w-4xl" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                <p className="font-light relative pl-3 sm:pl-4">
                    <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                    A curious mind at the intersection of design and development, I thrive on transforming abstract ideas into <span className="text-cyan-100/90 font-medium">intuitive, pixel-perfect realities</span>. Every challenge is an opportunity to learn, iterate, and craft something exceptional.
                </p>
                <p className="font-light relative pl-3 sm:pl-4">
                    <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                    I believe great products are born from <span className="text-cyan-100/90 font-medium">empathy and experimentation</span>—understanding users deeply, then fearlessly exploring solutions until the complex becomes elegantly simple.
                </p>
                <p className="font-light relative pl-3 sm:pl-4">
                    <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                    Collaboration fuels my process. Whether bridging the gap between designers and engineers or diving into uncharted technologies, I bring <span className="text-cyan-100/90 font-medium">passion, precision</span>, and a relentless drive to create meaningful impact.
                </p>
            </div>
        </motion.div>
    </motion.div>
));
WhoAmISection.displayName = 'WhoAmISection';

const ResumeButton = memo(() => (
    <motion.div variants={FADE_IN_UP} className="mt-2 sm:mt-3 md:mt-4 mx-4 md:mx-0">
        <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="block p-3.5 sm:p-4 md:p-5 rounded-xl text-center border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 text-cyan-400 font-medium tracking-wide transition-all duration-300 group min-h-[48px] flex items-center justify-center touch-manipulation"
        >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                View Full Resume
                <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
            </span>
        </a>
    </motion.div>
));
ResumeButton.displayName = 'ResumeButton';

const Info = () => {
    // Memoized static values
    const languagesText = useMemo(() => PROFILE.LANGUAGES_SPOKEN.join(", "), []);
    const phoneHref = useMemo(() => `tel:${PROFILE.CONTACT.phone.replace(/ /g, '')}`, []);
    const emailHref = useMemo(() => `mailto:${PROFILE.CONTACT.email}`, []);

    // Memoize Details Data to prevent re-renders
    const details = useMemo(() => [
        { key: 'loc', icon: <FaMapMarkerAlt />, label: "Location", value: "Chennai, Tamil Nadu", isLink: false },
        { key: 'lang', icon: <FaGlobe />, label: "Languages", value: languagesText, isLink: false },
        { key: 'email', icon: <FaEnvelope />, label: "Email", value: PROFILE.CONTACT.email, isLink: true, href: emailHref },
        { key: 'phone', icon: <FaPhone />, label: "Phone", value: PROFILE.CONTACT.phone, isLink: true, href: phoneHref }
    ], [languagesText, emailHref, phoneHref]);

    return (
        <section
            id={NORMAL_ROUTES.SECTIONS.INFO}
            className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 2xl:py-44 bg-cyan-950/5 overflow-hidden"
        >
            {/* Background Layers */}
            <div className="absolute inset-0 pointer-events-none">
                <NoiseOverlay />
                <GridPattern />
                <AmbientGlow />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050a0f_100%)] opacity-50 sm:opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 w-full relative z-10">
                <SectionBadge />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-14 items-start">

                    {/* Left Column */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
                        <MainHeading />
                        <WhoAmISection />
                    </div>

                    {/* Right Column */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={STAGGER_CONTAINER}
                        className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 md:gap-6 relative"
                    >
                        {/* Decorative Floating Element */}
                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [-5, 5, -5] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden md:block absolute -top-12 md:-top-14 lg:-top-16 -right-8 md:-right-10 w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-2xl md:blur-3xl pointer-events-none"
                            style={{ willChange: 'transform' }}
                        />

                        {details.map((item) => (
                            <motion.div key={item.key} variants={FADE_IN_UP}>
                                <DetailCard
                                    icon={item.icon}
                                    label={item.label}
                                    value={item.value}
                                    isLink={item.isLink}
                                    href={item.href}
                                />
                            </motion.div>
                        ))}

                        <ResumeButton />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Info;