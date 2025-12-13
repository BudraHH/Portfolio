import React, { useCallback, useMemo, memo, useEffect } from 'react';
import { FaArrowRight, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../assets/image_color.png';
import { PROFILE } from '../../constants/profile';
import { SOCIAL_LINKS } from '../../constants/socials';
import { NORMAL_ROUTES } from '../../constants/routes';

// --- Constants & Configuration ---

const SPRING_CONFIG = { damping: 25, stiffness: 120, mass: 0.5 };
const TECH_STACK = ['React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'AWS', 'Docker'];

const SOCIAL_DATA = [
    { icon: FaGithub, href: SOCIAL_LINKS.GITHUB, label: 'GitHub' },
    { icon: FaLinkedin, href: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    { icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' }
];

const ANIMATION_VARIANTS = {
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    },
    slideUp: {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    },
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" }
        }
    }
};

// --- Sub-Components ---

const NoiseOverlay = memo(() => (
    <div
        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none z-[1]"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
    />
));
NoiseOverlay.displayName = 'NoiseOverlay';

const Spotlight = memo(({ x, y, colorRGB, inverted = false }) => {
    const xPos = useTransform(x, val => inverted ? `${100 - val}%` : `${val}%`);
    const yPos = useTransform(y, val => inverted ? `${100 - val}%` : `${val}%`);

    return (
        <motion.div
            className="absolute z-0 pointer-events-none mix-blend-screen"
            style={{
                top: 0, left: 0,
                x: xPos, y: yPos,
                width: '100vmax', height: '100vmax',
                translateX: '-50%', translateY: '-50%',
                background: `radial-gradient(circle closest-side, rgba(${colorRGB}, 0.15) 0%, transparent 40%)`,
                willChange: 'transform'
            }}
        />
    );
});
Spotlight.displayName = 'Spotlight';

const BackgroundBlobs = memo(() => (
    <>
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[-15%] sm:top-[-10%] right-[-20%] sm:right-[-15%] md:right-[-10%] lg:right-[-5%] 
                       w-[250px] h-[250px] xs:w-[280px] xs:h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px] 
                       bg-gradient-to-br from-cyan-500/5 to-purple-500/5 
                       rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] 
                       animate-pulse-slow"
            style={{ willChange: 'transform, opacity' }}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-[-15%] sm:bottom-[-10%] left-[-20%] sm:left-[-15%] md:left-[-10%] lg:left-[-5%] 
                       w-[250px] h-[250px] xs:w-[280px] xs:h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px] 
                       bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 
                       rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] 
                       animate-pulse-slow"
            style={{ animationDelay: '2s', willChange: 'transform, opacity' }}
        />
    </>
));
BackgroundBlobs.displayName = 'BackgroundBlobs';

const GridPattern = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 hidden sm:block"
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
        }}
    />
));
GridPattern.displayName = 'GridPattern';

const BackgroundLines = memo(() => (
    <div className="absolute inset-0 overflow-hidden opacity-15 md:opacity-20 pointer-events-none hidden md:block">
        {[10, 30, 50, 70, 90].map((left, i) => (
            <div
                key={left}
                className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down"
                style={{
                    left: `${left}%`,
                    animationDuration: `${[8, 12, 10, 14, 9][i]}s`,
                    animationDelay: `${[0, 2, 4, 1, 3][i]}s`,
                    willChange: 'transform'
                }}
            />
        ))}
    </div>
));
BackgroundLines.displayName = 'BackgroundLines';

const SocialIcon = memo(({ social, variants }) => (
    <motion.a
        variants={variants}
        whileHover={{ color: "#22d3ee" }}
        whileTap={{ scale: 0.9 }}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="text-zinc-500 hover:text-cyan-400 transition-all text-2xl sm:text-2xl md:text-3xl p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
        style={{ willChange: 'transform' }}
    >
        <social.icon />
    </motion.a>
));
SocialIcon.displayName = 'SocialIcon';

const StatusBadge = memo(() => (
    <motion.div
        variants={ANIMATION_VARIANTS.fadeInUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 w-fit rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)] sm:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] sm:hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-default mb-5 sm:mb-6"
        style={{ willChange: 'transform' }}
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        </span>
        <span className="text-cyan-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Available for projects
        </span>
    </motion.div>
));
StatusBadge.displayName = 'StatusBadge';

const TechTicker = memo(() => (
    <div className="absolute bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-16 left-0 w-full hidden lg:flex justify-center mix-blend-plus-lighter opacity-40 lg:opacity-50 pointer-events-none overflow-hidden">
        <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            }}
            className="flex gap-14 lg:gap-16 xl:gap-20 whitespace-nowrap"
            style={{ willChange: 'transform' }}
        >
            {[...Array(3)].map((_, idx) => (
                <React.Fragment key={idx}>
                    {TECH_STACK.map((tech, i) => (
                        <span
                            key={`${idx}-${i}`}
                            className="text-xs lg:text-sm font-mono text-cyan-500/40 uppercase tracking-widest"
                        >
                            {tech}
                        </span>
                    ))}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
));
TechTicker.displayName = 'TechTicker';

const ProfileSection = memo(() => (
    <div className="relative flex-1 w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[500px] order-1 lg:order-2">
        <motion.div
            variants={ANIMATION_VARIANTS.scaleIn}
            initial="hidden"
            animate="visible"
            className="relative w-full aspect-[7/10] perspective-1000"
        >
            {/* Glow Effect */}
            <div className="absolute -inset-3 sm:-inset-4 md:-inset-5 bg-gradient-to-tr from-cyan-500/10 via-cyan-500/5 to-transparent rounded-[1.5rem] sm:rounded-[2rem] blur-xl sm:blur-2xl opacity-40 sm:opacity-50" />

            {/* Image Container */}
            <motion.div
                className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm group shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ willChange: 'transform' }}
            >
                {/* Overlays */}
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <img
                    src={ProfileImage}
                    alt="Hari Hara Budra"
                    className="w-full h-full object-cover object-center contrast-125 transition-all duration-700 ease-in-out group-hover:contrast-100 group-hover:scale-105"
                    loading="eager"
                />
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </motion.div>
        </motion.div>
    </div>
));
ProfileSection.displayName = 'ProfileSection';

// --- Main Hero Component ---

const Hero = () => {
    const navigate = useNavigate();

    // Mouse Tracking Logic (Off-main-thread)
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const smoothX = useSpring(mouseX, SPRING_CONFIG);
    const smoothY = useSpring(mouseY, SPRING_CONFIG);

    const handleMouseMove = useCallback((e) => {
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        mouseX.set(xPercent);
        mouseY.set(yPercent);
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        // Clean up
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const handleContactClick = useCallback(() => navigate(`${NORMAL_ROUTES.ROOT}/${NORMAL_ROUTES.SECTIONS.CONTACT}`), [navigate]);

    // Data Memoization
    const nameParts = useMemo(() => {
        const parts = PROFILE.NAME.split(' ');
        return { firstName: parts[0], middleName: parts[1], lastName: parts[2] };
    }, []);

    const bioText = useMemo(() =>
        PROFILE.BIO.short.toLowerCase().replace("full stack developer | ", "a full-stack developer "),
        []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-20 pb-20 sm:pb-24 md:pb-28 overflow-hidden bg-[#050a0f]"
        >
            <Spotlight x={smoothX} y={smoothY} colorRGB="6,182,212" /> {/* Cyan Only */}
            <NoiseOverlay />

            <div className="absolute inset-0 pointer-events-none z-0">
                <BackgroundBlobs />
                <GridPattern />
                <BackgroundLines />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20">

                    {/* Text Content */}
                    <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 flex-1 lg:max-w-3xl w-full text-center lg:text-left order-2 lg:order-1">
                        <motion.div
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-center lg:items-start"
                        >
                            <StatusBadge />

                            {/* Headline */}
                            <h1 className="font-bold tracking-tight text-white leading-[1.05] sm:leading-[1.1] drop-shadow-2xl mb-1 sm:mb-2" style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}>
                                <div className="overflow-hidden">
                                    <motion.span variants={ANIMATION_VARIANTS.slideUp} className="block">Designing the</motion.span>
                                </div>
                                <div className="overflow-hidden relative">
                                    <motion.span
                                        variants={ANIMATION_VARIANTS.slideUp}
                                        className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-cyan-200 to-zinc-400 animate-gradient-x"
                                        style={{ backgroundSize: '200% auto' }}
                                    >
                                        Future.
                                    </motion.span>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
                                        className="absolute bottom-0.5 sm:bottom-1 md:bottom-2 left-0 w-full h-[2px] sm:h-[3px] md:h-1 lg:h-2 bg-cyan-500/50 blur-[2px] sm:blur-[3px] md:blur-[4px] lg:blur-[5px] origin-left opacity-50"
                                        style={{ willChange: 'transform' }}
                                    />
                                </div>
                            </h1>

                            {/* Bio */}
                            <motion.div
                                variants={ANIMATION_VARIANTS.fadeInUp}
                                className="text-zinc-400 max-w-2xl leading-relaxed font-light mt-5 sm:mt-6 md:mt-7 lg:mt-8 px-1 sm:px-0"
                                style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}
                            >
                                I'm <span className="text-cyan-50 font-semibold">{nameParts.firstName} {nameParts.middleName}</span> <span className="text-cyan-200 font-semibold">{nameParts.lastName}</span>, {bioText}
                            </motion.div>

                            {/* CTA & Socials */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.6 }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-6 mt-7 sm:mt-8 md:mt-9 lg:mt-10 w-full sm:w-auto"
                            >
                                <motion.button
                                    variants={ANIMATION_VARIANTS.fadeInUp}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleContactClick}
                                    className="relative overflow-hidden px-7 py-3.5 sm:px-8 sm:py-4 bg-white backdrop-blur-md text-cyan-950 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full sm:w-auto min-h-[48px] touch-manipulation"
                                    style={{ willChange: 'transform' }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start a Project
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform text-cyan-400 text-sm sm:text-base" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine-fast" />
                                </motion.button>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 1 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                    }}
                                    className="flex flex-row justify-center items-center"
                                >
                                    {SOCIAL_DATA.map((social, idx) => (
                                        <SocialIcon key={idx} social={social} variants={ANIMATION_VARIANTS.fadeInUp} />
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <ProfileSection />
                </div>
            </div>

            <TechTicker />
        </section>
    );
};

export default Hero;
