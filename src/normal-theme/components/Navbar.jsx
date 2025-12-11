import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DEV_ROUTES } from "../../dev-theme/routes/devRoutes.js";
import { NORMAL_ROUTES } from "../routes/routes.js";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { sectionId } = useParams();

    // Determine active section (empty string for root/home)
    const activeId = sectionId || '';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [activeId]);

    const scrollToSection = (id) => {
        if (id) {
            navigate(`${NORMAL_ROUTES.ROOT}/${id}`);
        } else {
            navigate(NORMAL_ROUTES.ROOT);
        }
    };

    const navItems = [
        { label: 'Home', id: '' },
        { label: 'Info', id: 'info' },
        { label: 'Skills', id: 'skills' },
        { label: 'Career', id: 'career' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050a0f]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                    {/* === Logo === */}
                    <div
                        onClick={() => scrollToSection('')}
                        className="font-bold text-xl tracking-wider cursor-pointer group flex items-center gap-1"
                    >
                        <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">BUDRA</span>
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-cyan-400"
                        >.</motion.span>
                    </div>

                    {/* === Desktop Nav === */}
                    <div className="hidden md:flex items-center gap-1">
                        <div className="flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-sm">
                            {navItems.map((item) => {
                                const isActive = item.id === activeId;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-1.5 text-sm font-medium transition-colors z-10 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
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

                        {/* Theme Switcher */}
                        
                    </div>
                            <button
                            onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                            className="ml-6 flex items-center gap-2 px-4 py-2 text-xs font-bold border border-cyan-500/20 rounded-full text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                            DEV_MODE
                        </button>
                    {/* === Mobile Toggle === */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className="w-6 flex flex-col items-end gap-1.5">
                            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }} className="w-full h-0.5 bg-white origin-center transition-all" />
                            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-4 h-0.5 bg-cyan-400 transition-all" />
                            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }} className="w-full h-0.5 bg-white origin-center transition-all" />
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
                        className="fixed inset-0 z-40 bg-[#050a0f] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navItems.map((item, idx) => {
                                const isActive = item.id === activeId;
                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-2xl font-light text-left border-b border-white/5 pb-4 flex items-center justify-between ${isActive ? 'text-white border-cyan-500/50' : 'text-zinc-500'}`}
                                    >
                                        {item.label}
                                        {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                                    </motion.button>
                                );
                            })}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                                className="mt-4 w-full py-4 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-mono tracking-widest uppercase hover:bg-cyan-500/10 flex items-center justify-center gap-2"
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
