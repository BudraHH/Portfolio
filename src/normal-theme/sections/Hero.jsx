import React from 'react';
import { FaArrowRight, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../assets/yes_color.png';
import { PROFILE } from '../../constants/profile';
import { SOCIAL_LINKS } from '../../constants/socials';

const Hero = () => {
    const navigate = useNavigate();

    // === Animation Variants ===
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const slideUp = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" }
        }
    };



    // Mouse Parallax Logic for Image Decor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set(clientX - centerX);
        mouseY.set(clientY - centerY);
    };

    // Parallax Transforms
    const layer1X = useTransform(mouseX, [-500, 500], [15, -15]);
    const layer1Y = useTransform(mouseY, [-500, 500], [15, -15]);
    const layer2X = useTransform(mouseX, [-500, 500], [-30, 30]);
    const layer2Y = useTransform(mouseY, [-500, 500], [-30, 30]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050a0f]"
            style={{ position: 'relative' }}
            onMouseMove={handleMouseMove}
        >
            {/* === Cinematic Noise Overlay === */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* === Dynamic Parallax Background Layer === */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ position: 'absolute' }}>
                {/* Blobs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-[120px] animate-pulse-slow"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow"
                    style={{ animationDelay: '2s' }}
                />

                {/* Grid Pattern */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.03 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />






                {/* Subtle Moving Background Lines */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '8s' }} />
                    <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '12s', animationDelay: '2s' }} />
                    <div className="absolute top-0 left-[50%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '10s', animationDelay: '4s' }} />
                    <div className="absolute top-0 left-[70%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '14s', animationDelay: '1s' }} />
                    <div className="absolute top-0 left-[90%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '9s', animationDelay: '3s' }} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* === Text Content === */}
                    <div className="flex flex-col gap-8 flex-1 lg:max-w-3xl pt-10 lg:pt-0">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Status Badge */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 w-fit rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.15)] group hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-default mb-6"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                                </span>
                                <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Available for new projects</span>
                            </motion.div>

                            {/* Main Headline with Masked Reveal */}
                            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                                <div className="overflow-hidden">
                                    <motion.span variants={slideUp} className="block">
                                        Designing the
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden relative">
                                    <motion.span
                                        variants={slideUp}
                                        className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-cyan-200 to-zinc-400 animate-gradient-x"
                                    >
                                        Future.
                                    </motion.span>

                                    {/* Animated Underline */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
                                        className="absolute bottom-2 left-0 w-full h-1 md:h-2 bg-cyan-500/50 blur-[5px] origin-left opacity-50"
                                    />
                                </div>
                            </h1>

                            {/* Bio Text */}
                            <motion.div
                                variants={fadeInUp}
                                className="text-base xs:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light mt-8"
                            >
                                I'm <span className="text-cyan-50 font-semibold">{PROFILE.NAME.split(' ')[0]} {PROFILE.NAME.split(' ')[1]}</span> <span className="text-cyan-200 font-semibold">{PROFILE.NAME.split(' ')[2]}</span>, {PROFILE.BIO.short.toLowerCase().replace("full stack developer | ", "a full-stack developer ")}
                            </motion.div>

                            {/* Buttons and Socials */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.6 // Wait for bio
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-wrap items-center gap-6 mt-8"
                            >
                                <motion.button
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/normal-theme/contact')}
                                    className="relative overflow-hidden px-8 py-4 bg-white backdrop-blur-md  text-cyan-950 text-sm font-bold rounded-xl hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start a Project
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform text-cyan-400" />
                                    </span>
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine-fast" />
                                </motion.button>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 1 },
                                        visible: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                    className="flex items-center gap-6 px-6 border-l border-white/10"
                                >
                                    {[
                                        { icon: FaGithub, href: SOCIAL_LINKS.GITHUB },
                                        { icon: FaLinkedin, href: SOCIAL_LINKS.LINKEDIN },
                                        { icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM }
                                    ].map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            variants={fadeInUp}
                                            whileHover={{ y: -5, color: "#22d3ee" }}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-500 transition-all text-2xl"
                                        >
                                            <social.icon />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* === Image Layer === */}
                    <div className="hidden lg:block relative flex-1 max-w-[500px]">
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="relative w-full aspect-[7/10] perspective-1000"
                        >
                            {/* Abstract decorative elements behind */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-[2rem] blur-xl opacity-50" />

                            {/* Image Container */}
                            <motion.div
                                className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm group"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Cyan Tint Overlay */}
                                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />

                                <img
                                    src={ProfileImage}
                                    alt="Hari Hara Budra"
                                    className="w-full h-full object-cover object-center contrast-125 transition-all duration-700 ease-in-out group-hover:contrast-100"
                                />

                                {/* Overlay reflection/glare */}
                                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                            </motion.div>

                            {/* Floating decorative elements - Parallax Layer 2 */}

                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Tech Stack Ticker - Desktop Only */}
            <div className="absolute bottom-12 left-0 w-full hidden lg:flex justify-center mix-blend-plus-lighter opacity-50 pointer-events-none overflow-hidden">
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
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...Array(3)].map((_, idx) => (
                        <React.Fragment key={idx}>
                            {['React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'AWS', 'Docker'].map((tech, i) => (
                                <span key={`${idx}-${i}`} className="text-sm font-mono text-cyan-500/40 uppercase tracking-widest">{tech}</span>
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator - Mobile Only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 lg:hidden"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
