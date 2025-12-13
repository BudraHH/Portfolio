import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Wrench, Briefcase, FolderGit2, Mail, Code2 } from 'lucide-react';

// Mock navigation functions for demo
const mockNavigate = (path) => console.log('Navigate to:', path);
const mockLocation = { pathname: '/' };
const mockParams = { sectionId: '' };

const DEV_ROUTES = { FULL_WELCOME: '/dev' };
const NORMAL_ROUTES = { ROOT: '/' };

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = mockNavigate;
    const location = mockLocation;
    const { sectionId } = mockParams;

    const activeId = sectionId || '';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [activeId, location.pathname]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const scrollToSection = useCallback((id) => {
        setMobileMenuOpen(false);
        console.log('Scroll to:', id || 'home');
    }, []);

    const navItems = [
        { label: 'Home', id: '', icon: Home },
        { label: 'Info', id: 'info', icon: Info },
        { label: 'Skills', id: 'skills', icon: Wrench },
        { label: 'Career', id: 'career', icon: Briefcase },
        { label: 'Projects', id: 'projects', icon: FolderGit2 },
        { label: 'Contact', id: 'contact', icon: Mail },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 
                           ${scrolled
                    ? 'bg-[#050a0f]/80 backdrop-blur-md border-b border-white/5 py-3 sm:py-4'
                    : 'bg-transparent py-4 sm:py-5 md:py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto
                                px-4 sm:px-6 md:px-8 lg:px-10
                                flex justify-between items-center">

                    {/* === Logo === */}
                    <div
                        onClick={() => scrollToSection('')}
                        className="font-bold tracking-wider cursor-pointer group
                                   flex items-center gap-0.5 sm:gap-1
                                   touch-manipulation
                                   min-h-[44px]"
                        style={{
                            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                        }}
                    >
                        <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                            BUDRA
                        </span>
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-cyan-400"
                        >
                            .
                        </motion.span>
                    </div>

                    {/* === Desktop Nav === */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6">
                        <div className="flex items-center
                                        bg-white/5
                                        rounded-full
                                        px-1.5 lg:px-2 py-1
                                        border border-white/5
                                        backdrop-blur-sm">
                            {navItems.map((item) => {
                                const isActive = item.id === activeId || (item.id === '' && activeId === undefined);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative 
                                                   px-3 lg:px-4 py-1.5 
                                                   font-medium 
                                                   transition-colors 
                                                   z-10
                                                   min-h-[36px]
                                                   ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                                        style={{
                                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                        }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Dev Mode Button - Desktop */}
                        <button
                            onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                            className="flex items-center
                                       gap-1.5 sm:gap-2
                                       px-3 lg:px-4 py-2
                                       border border-cyan-500/20
                                       rounded-full
                                       text-cyan-400
                                       hover:bg-cyan-500/10
                                       hover:border-cyan-400
                                       transition-all
                                       group
                                       font-bold
                                       min-h-[36px]"
                            style={{
                                fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                            <span className="hidden lg:inline">DEV_MODE</span>
                            <span className="lg:hidden">DEV</span>
                        </button>
                    </div>

                    {/* === Mobile Toggle === */}
                    <button
                        className="md:hidden text-white
                                   p-2
                                   min-w-[44px] min-h-[44px]
                                   flex items-center justify-center
                                   touch-manipulation
                                   relative z-50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 flex flex-col items-end gap-1.5">
                            <motion.span
                                animate={{
                                    rotate: mobileMenuOpen ? 45 : 0,
                                    y: mobileMenuOpen ? 6 : 0
                                }}
                                className="w-full h-0.5 bg-white origin-center transition-all"
                            />
                            <motion.span
                                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                                className="w-4 h-0.5 bg-cyan-400 transition-all"
                            />
                            <motion.span
                                animate={{
                                    rotate: mobileMenuOpen ? -45 : 0,
                                    y: mobileMenuOpen ? -6 : 0
                                }}
                                className="w-full h-0.5 bg-white origin-center transition-all"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* === Enhanced Mobile Menu Overlay === */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ backdropFilter: 'blur(0px)' }}
                            animate={{ backdropFilter: 'blur(24px)' }}
                            exit={{ backdropFilter: 'blur(0px)' }}
                            className="absolute inset-0 bg-[#050a0f]/90"
                        />

                        {/* Background Effects */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {/* Animated Grid */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                 style={{
                                     backgroundImage: `
                                        linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                                    `,
                                     backgroundSize: '50px 50px'
                                 }}
                            />

                            {/* Noise Texture */}
                            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                                 style={{
                                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                                 }}
                            />

                            {/* Multiple Glows */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.15, 0.1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-1/4 left-1/4
                                            w-72 h-72
                                            bg-cyan-500/20
                                            rounded-full
                                            blur-[100px]"
                            />
                            <motion.div
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.05, 0.1, 0.05]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="absolute bottom-1/4 right-1/4
                                            w-64 h-64
                                            bg-cyan-400/10
                                            rounded-full
                                            blur-[80px]"
                            />
                        </div>

                        {/* Content Container */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative z-10 h-full
                                       flex flex-col
                                       pt-24 pb-8
                                       px-6
                                       overflow-y-auto"
                        >
                            {/* Header Section */}
                            <div className="mb-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2
                                               px-3 py-1.5
                                               rounded-full
                                               bg-cyan-950/30
                                               border border-cyan-500/30
                                               backdrop-blur-sm
                                               mb-4"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
                                        Navigation
                                    </span>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-4xl font-bold text-white mb-2"
                                >
                                    Explore
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-zinc-500 text-sm"
                                >
                                    Navigate through the sections
                                </motion.p>
                            </div>

                            {/* Navigation Grid */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                                {navItems.map((item, idx) => {
                                    const isActive = item.id === activeId || (item.id === '' && activeId === undefined);
                                    const Icon = item.icon;

                                    return (
                                        <motion.button
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.1 + idx * 0.05,
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20
                                            }}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`relative 
                                                       p-5 
                                                       rounded-2xl
                                                       border
                                                       backdrop-blur-sm
                                                       touch-manipulation
                                                       transition-all duration-300
                                                       
                                                       overflow-hidden
                                                       ${isActive
                                                ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                                                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-cyan-500/30'
                                            }`}
                                        >
                                            {/* Card Background Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                                            </div>

                                            {/* Active Indicator */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="mobile-active-indicator"
                                                    className="absolute inset-0 bg-cyan-500/10 rounded-2xl"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-row justify-center items-center gap-3">
                                                <div className={`p-2.5 rounded-xl transition-all duration-300
                                                                ${isActive
                                                    ? 'bg-cyan-500/20 text-cyan-400'
                                                    : 'bg-white/5 text-zinc-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400'
                                                }`}>
                                                    <Icon className="w-5 h-5" strokeWidth={2} />
                                                </div>

                                                <div className="flex flex-col items-start gap-0.5">
                                                    <span className={`font-semibold text-base transition-colors
                                                                     ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                                        {item.label}
                                                    </span>

                                                </div>
                                            </div>

                                            {/* Corner Accent */}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400"
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Dev Mode Button - Mobile Enhanced */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                                className="relative
                                           w-full
                                           py-4
                                           rounded-2xl
                                           border border-cyan-500/40
                                           bg-gradient-to-r from-cyan-950/40 to-cyan-900/20
                                           backdrop-blur-sm
                                           overflow-hidden
                                           group
                                           touch-manipulation"
                            >
                                {/* Animated Background */}
                                <motion.div
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                                />

                                {/* Content */}
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <div className="relative">
                                        <Code2 className="w-5 h-5 text-cyan-400" />
                                        <motion.span
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full bg-cyan-400 blur-md"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase">
                                            Initialize Dev Mode
                                        </span>
                                        <span className="text-cyan-500/60 text-xs font-mono">
                                            Access developer dashboard
                                        </span>
                                    </div>
                                </div>

                                {/* Border Animation */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl" />
                                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl" />
                                </motion.div>
                            </motion.button>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-6 pt-6 border-t border-white/5 text-center"
                            >
                                <p className="text-zinc-600 text-xs font-mono">
                                    © 2024 BUDRA. All rights reserved.
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;