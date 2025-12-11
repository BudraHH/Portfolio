import React, { useState } from 'react';
import {FaArrowRight, FaGithub, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../assets/yes_color.png';

const Hero = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section
            id="hero"
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050a0f]"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Grid Pattern with Moving Lines */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
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

                    {/* Text Content */}
                    <div className="flex flex-col gap-8 flex-1 lg:max-w-3xl pt-10 lg:pt-0">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 w-fit rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.15)] group hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-default"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                            </span>
                            <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Available for new projects</span>
                        </motion.div>

                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
                        >
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    Designing the
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden relative">
                                <motion.span
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-cyan-200 to-zinc-400 animate-gradient-x"
                                >
                                    Future.
                                </motion.span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
                                    className="absolute bottom-2 left-0 w-full h-1 md:h-2 bg-cyan-500/50 blur-[5px] origin-left opacity-50 "
                                />
                            </span>
                        </motion.h1>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base xs:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light"
                        >
                            I'm <span className="text-cyan-50 font-semibold">Hari Hara</span> <span className="text-cyan-200 font-semibold">Budra</span>, a full-stack developer crafting meaningful digital experiences where design meets precise engineering.
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-6 mt-4"
                        >
                            <button
                                onClick={() => navigate('/normal-theme/contact')}
                                className="px-8 py-4 bg-white backdrop-blur-md  text-cyan-950 text-sm font-bold rounded-xl hover:bg-white/90 hover:border-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                            >
                                Start a Project
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-cyan-400" />
                            </button>

                            <div className="flex items-center gap-6 px-6 border-l border-white/10">
                                {[
                                    { icon: FaGithub, href: 'https://github.com/BudraHH' },
                                    { icon: FaLinkedin, href: 'https://linkedin.com' },
                                    { icon: FaInstagram, href: 'https://twitter.com' }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-zinc-500 hover:text-cyan-400 hover:scale-110 transition-all text-2xl"
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Subtle Image Placement */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="hidden lg:block relative flex-1 max-w-[500px]"
                    >
                        <div className="relative w-full aspect-[7/10] perspective-1000">
                            {/* Abstract decorative elements behind */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-[2rem] blur-xl opacity-50" />

                            {/* Image Container */}
                            <motion.div
                                className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm group"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* The Image - styled to be subtle and blend in */}
                                {/*<div className="absolute inset-0 bg-gradient-to-t from-[#050a0f] via-transparent to-transparent z-10 opacity-0" /> /!* Bottom fade *!/*/}

                                {/* Cyan Tint Overlay */}
                                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />

                                <img
                                    src={ProfileImage}
                                    alt="Hari Hara Budra"
                                    className="w-full h-full object-cover object-center  contrast-125 transition-all duration-700 ease-in-out  group-hover:contrast-100"
                                />

                                {/* Overlay reflection/glare */}
                                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                            </motion.div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-8 top-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-transparent backdrop-blur-md rounded-2xl border border-white/10"
                            />
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-4 bottom-1/4 w-12 h-12 bg-zinc-800/50 backdrop-blur-md rounded-full border border-white/5"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Tech Stack Ticker - Desktop Only */}
            <div className="absolute bottom-12 left-0 w-full hidden lg:flex justify-center mix-blend-plus-lighter opacity-50 pointer-events-none">
                <div className="flex gap-16 animate-scroll-left">
                    {['React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'AWS', 'Docker'].map((tech, i) => (
                        <span key={i} className="text-sm font-mono text-cyan-500/40 uppercase tracking-widest">{tech}</span>
                    ))}
                    {['React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'AWS', 'Docker'].map((tech, i) => (
                        <span key={`dup-${i}`} className="text-sm font-mono text-cyan-500/40 uppercase tracking-widest">{tech}</span>
                    ))}
                </div>
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
