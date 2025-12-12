import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaExclamationTriangle, FaCode, FaSearch } from 'react-icons/fa';

const NotFound = () => {
    const navigate = useNavigate();
    const [glitchActive, setGlitchActive] = useState(false);
    const [scanlinePosition, setScanlinePosition] = useState(0);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 3000);
        return () => clearInterval(glitchInterval);
    }, []);

    useEffect(() => {
        const scanlineInterval = setInterval(() => {
            setScanlinePosition((prev) => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(scanlineInterval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full 
                        bg-[#050a0f] 
                        overflow-hidden 
                        flex flex-col items-center justify-center 
                        font-sans antialiased 
                        selection:bg-cyan-500/30 
                        p-4 sm:p-6 md:p-8">

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] md:opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        animation: 'gridPulse 4s ease-in-out infinite'
                    }}
                />

                {/* Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Animated Scanline */}
                <div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm"
                    style={{
                        top: `${scanlinePosition}%`,
                        transition: 'top 0.05s linear'
                    }}
                />

                {/* Multiple Glow Effects */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 
                                w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 
                                bg-red-500/10 
                                rounded-full 
                                blur-[100px] sm:blur-[120px] md:blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 right-1/4 
                                w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 
                                bg-cyan-500/10 
                                rounded-full 
                                blur-[100px] sm:blur-[120px] md:blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-96 h-96 sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem]
                                bg-purple-500/5 
                                rounded-full 
                                blur-[120px] sm:blur-[140px] md:blur-[160px]"
                />

                {/* Vignette */}
                <div className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(5,10,15,0.6) 100%)'
                    }}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-5xl 
                           flex flex-col items-center 
                           text-center 
                           space-y-6 sm:space-y-8 md:space-y-10"
            >
                {/* Status Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 
                               px-3 sm:px-4 py-1.5 sm:py-2 
                               rounded-full 
                               bg-red-500/10 
                               border border-red-500/30 
                               backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-red-400"
                    />
                    <span className="text-red-400 font-mono uppercase tracking-wider"
                        style={{
                            fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                        }}
                    >
                        System Error
                    </span>
                </motion.div>


                {/* Enhanced 404 Text with Glitch Effect */}
                <motion.div
                    variants={itemVariants}
                    className="relative"
                >
                    <h1 className={`font-bold 
                                   text-transparent bg-clip-text 
                                   bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 
                                   tracking-tighter leading-none
                                   drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]
                                   ${glitchActive ? 'animate-glitch' : ''}`}
                        style={{
                            fontSize: 'clamp(5rem, 18vw, 12rem)',
                            fontWeight: 900,
                        }}
                    >
                        404
                    </h1>
                    {glitchActive && (
                        <>
                            <h1 className="absolute top-0 left-0 w-full 
                                          font-bold 
                                          text-transparent bg-clip-text 
                                          bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 
                                          tracking-tighter leading-none
                                          opacity-70"
                                style={{
                                    fontSize: 'clamp(5rem, 18vw, 12rem)',
                                    fontWeight: 900,
                                    transform: 'translate(-3px, 3px)',
                                    filter: 'blur(2px)',
                                    mixBlendMode: 'screen',
                                }}
                            >
                                404
                            </h1>
                            <h1 className="absolute top-0 left-0 w-full 
                                          font-bold 
                                          text-transparent bg-clip-text 
                                          bg-gradient-to-r from-cyan-400 via-cyan-300 to-red-400 
                                          tracking-tighter leading-none
                                          opacity-70"
                                style={{
                                    fontSize: 'clamp(5rem, 18vw, 12rem)',
                                    fontWeight: 900,
                                    transform: 'translate(3px, -3px)',
                                    filter: 'blur(2px)',
                                    mixBlendMode: 'screen',
                                }}
                            >
                                404
                            </h1>
                        </>
                    )}
                </motion.div>

                {/* Error Message */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-3 sm:space-y-4"
                >
                    <h2 className="font-bold text-white"
                        style={{
                            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        }}
                    >
                        Page Not Found
                    </h2>
                    <p className="text-zinc-400 
                                  leading-relaxed 
                                  max-w-2xl mx-auto
                                  px-4"
                        style={{
                            fontSize: 'clamp(0.9375rem, 2.5vw, 1.125rem)',
                        }}
                    >
                        The page you're looking for doesn't exist or has been moved.
                        It might have been deleted, or the URL might be incorrect.
                    </p>
                </motion.div>

                {/* Enhanced Terminal-style Error Code */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-3xl 
                               bg-gradient-to-br from-[#0a1520]/80 to-[#0a1520]/60 
                               backdrop-blur-xl 
                               border border-red-500/30 
                               rounded-xl sm:rounded-2xl 
                               p-5 sm:p-6 md:p-7 
                               font-mono
                               shadow-[0_0_50px_rgba(239,68,68,0.1)]
                               relative
                               overflow-hidden"
                >
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                rotate: 360
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -inset-[100%] bg-gradient-to-r from-red-500/20 via-transparent to-cyan-500/20"
                        />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex gap-1.5 sm:gap-2">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                </div>
                                <span className="text-zinc-500 flex items-center gap-1.5"
                                    style={{
                                        fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                    }}
                                >
                                    <FaCode className="text-red-400" />
                                    error.log
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-red-400"
                                style={{
                                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                }}
                            >
                                <motion.div
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 rounded-full bg-red-400"
                                />
                                LIVE
                            </div>
                        </div>
                        <div className="text-red-400 space-y-2 sm:space-y-2.5"
                            style={{
                                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            }}
                        >
                            <div className="flex items-start gap-2 sm:gap-3">
                                <span className="text-red-500 flex-shrink-0 font-bold">×</span>
                                <span className="break-all">
                                    <span className="text-zinc-500">[ERROR]</span> Resource not found at path <span className="text-cyan-400">"{window.location.pathname}"</span>
                                </span>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3">
                                <span className="text-yellow-500 flex-shrink-0 font-bold">!</span>
                                <span>
                                    <span className="text-zinc-500">[WARN]</span> HTTP Status Code: <span className="text-yellow-400">404</span>
                                </span>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3">
                                <span className="text-cyan-500 flex-shrink-0 font-bold">→</span>
                                <span className="text-cyan-400">
                                    <span className="text-zinc-500">[INFO]</span> Awaiting user navigation...
                                </span>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3 pt-2 border-t border-white/5">
                                <FaSearch className="text-zinc-500 flex-shrink-0 mt-1" />
                                <span className="text-zinc-500">
                                    Suggestion: Check the URL or return to the homepage
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col xs:flex-row 
                               gap-3 sm:gap-4 
                               w-full max-w-lg
                               px-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/')}
                        className="flex-1
                                   relative
                                   flex items-center justify-center gap-2 sm:gap-3
                                   px-6 sm:px-7 py-3.5 sm:py-4
                                   bg-gradient-to-r from-cyan-500/20 to-cyan-600/20
                                   border border-cyan-500/40
                                   rounded-xl sm:rounded-2xl
                                   text-cyan-400
                                   hover:border-cyan-400
                                   transition-all duration-300
                                   font-semibold
                                   min-h-[52px]
                                   touch-manipulation
                                   group
                                   overflow-hidden
                                   shadow-[0_0_20px_rgba(6,182,212,0.1)]
                                   hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                        style={{
                            fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 
                                        translate-x-[-100%] group-hover:translate-x-[100%] 
                                        transition-transform duration-700" />
                        <FaHome className="group-hover:scale-110 transition-transform relative z-10" />
                        <span className="relative z-10">Return Home</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(-1)}
                        className="flex-1
                                   relative
                                   flex items-center justify-center gap-2 sm:gap-3
                                   px-6 sm:px-7 py-3.5 sm:py-4
                                   bg-white/5
                                   border border-white/10
                                   rounded-xl sm:rounded-2xl
                                   text-zinc-400
                                   hover:bg-white/10
                                   hover:text-white
                                   hover:border-white/20
                                   transition-all duration-300
                                   font-semibold
                                   min-h-[52px]
                                   touch-manipulation
                                   group
                                   overflow-hidden"
                        style={{
                            fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
                        }}
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </motion.button>
                </motion.div>

                {/* Enhanced Footer Info */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4
                               text-zinc-600 
                               font-mono 
                               tracking-wider
                               pt-4 sm:pt-6"
                    style={{
                        fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                        <span>ERROR CODE: 404</span>
                    </div>
                    <span className="hidden sm:inline text-zinc-700">|</span>
                    <span>NOT_FOUND</span>
                    <span className="hidden sm:inline text-zinc-700">|</span>
                    <span className="text-zinc-700">TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
