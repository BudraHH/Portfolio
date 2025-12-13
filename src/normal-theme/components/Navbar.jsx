import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Wrench, Briefcase, FolderGit2, Mail, Code2 } from 'lucide-react';
import { DEV_ROUTES } from "../../dev-theme/routes/devRoutes.js";
import { NORMAL_ROUTES } from "../routes/routes.js";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId } = useParams();

    // Determine active section (empty string for root/home)
    const activeId = sectionId || NORMAL_ROUTES.SECTIONS.HERO;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change or when activeId updates
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [activeId, location.pathname]);

    // Prevent body scroll when mobile menu is open, handle Lenis state
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        };
    }, [mobileMenuOpen]);

    const scrollToSection = useCallback((id) => {
        setMobileMenuOpen(false); // Close menu immediately

        // Force start Lenis in case it was stopped by the menu
        window.lenis?.start();

        // Check if we are on the normal theme root
        const isNormalTheme = location.pathname.startsWith(NORMAL_ROUTES.ROOT);

        if (isNormalTheme && window.lenis) {
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    // Use a slightly longer duration for smoother visual on mobile
                    window.lenis.scrollTo(element, { offset: -80, duration: 1.5 });
                    window.history.pushState({}, '', `${NORMAL_ROUTES.ROOT}/${id}`);
                    return;
                }
            } else {
                window.lenis.scrollTo(0, { offset: 0, duration: 1.5 });
                window.history.pushState({}, '', NORMAL_ROUTES.ROOT);
                return;
            }
        }

        // Fallback for non-home pages or missing lenis
        if (id) {
            navigate(`${NORMAL_ROUTES.ROOT}/${id}`);
        } else {
            navigate(NORMAL_ROUTES.ROOT);
        }
    }, [location.pathname, navigate]);

    const navItems = [
        { label: 'Home', id: NORMAL_ROUTES.SECTIONS.HERO, icon: Home },
        { label: 'Info', id: NORMAL_ROUTES.SECTIONS.INFO, icon: Info },
        { label: 'Skills', id: NORMAL_ROUTES.SECTIONS.SKILLS, icon: Wrench },
        { label: 'Career', id: NORMAL_ROUTES.SECTIONS.CAREER, icon: Briefcase },
        { label: 'Projects', id: NORMAL_ROUTES.SECTIONS.PROJECTS, icon: FolderGit2 },
        { label: 'Contact', id: NORMAL_ROUTES.SECTIONS.CONTACT, icon: Mail },
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
                        onClick={() => scrollToSection(NORMAL_ROUTES.SECTIONS.HERO)}
                        className="font-bold tracking-wider cursor-pointer group 
                                   flex items-center gap-0.5 sm:gap-1
                                   touch-manipulation
                                   min-h-[44px] flex items-center"
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
                                const isActive = item.id === activeId || (item.id === NORMAL_ROUTES.SECTIONS.HERO && activeId === undefined);
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
                                   touch-manipulation"
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

            {/* === Mobile Menu Overlay === */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 
                                   bg-[#050a0f]/95 backdrop-blur-lg
                                   pt-20 sm:pt-24 
                                   px-4 sm:px-6 
                                   md:hidden
                                   overflow-y-auto"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Noise Overlay */}
                            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                                }}
                            />
                            {/* Glow */}
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 
                                            w-64 h-64 
                                            bg-cyan-500/5 
                                            rounded-full 
                                            blur-[80px]" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-4 sm:gap-6 max-w-md mx-auto">
                            {navItems.map((item, idx) => {
                                const isActive = item.id === activeId || (item.id === NORMAL_ROUTES.SECTIONS.HERO && activeId === undefined);
                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`font-light text-left 
                                                   border-b border-white/5 
                                                   pb-3 sm:pb-4 
                                                   flex items-center justify-between
                                                   min-h-[48px]
                                                   touch-manipulation
                                                   ${isActive
                                                ? 'text-white border-cyan-500/50'
                                                : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                        style={{
                                            fontSize: 'clamp(1.25rem, 5vw, 1.5rem)',
                                        }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 rounded-full bg-cyan-400"
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}

                            {/* Dev Mode Button - Mobile */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                                className="mt-4 sm:mt-6 
                                           w-full 
                                           py-3 sm:py-4 
                                           border border-cyan-500/30 
                                           rounded-lg sm:rounded-xl 
                                           text-cyan-400 
                                           font-mono tracking-widest uppercase 
                                           hover:bg-cyan-500/10 
                                           flex items-center justify-center 
                                           gap-2 sm:gap-3
                                           min-h-[48px]
                                           touch-manipulation
                                           transition-all"
                                style={{
                                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                }}
                            >
                                <span className="w-2 h-2 bg-cyan-400 rounded-sm" />
                                Initialize Dev_Mode
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;