import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaFileDownload, FaTimes, FaChartLine, FaDatabase, FaSitemap, FaQuestionCircle,
} from 'react-icons/fa'; // DS/ML focused icons
import { FaBarsStaggered } from 'react-icons/fa6';
import { TbNetwork, TbCodeDots } from "react-icons/tb"; // Network and Code icon

// Define navigation links WITH ICONS (no changes needed here)
const navLinks = [
    { name: "Dashboard", path: "/data-science", icon: <FaChartLine className="w-4 h-4" /> },
    { name: "Insights", path: "/data-science/insights", icon: <FaSitemap className="w-4 h-4" /> },
    { name: "Projects", path: "/data-science/projects", icon: <FaDatabase className="w-4 h-4" /> },
    { name: "Query", path: "/data-science", hash: "#contact", icon: <FaQuestionCircle className="w-4 h-4" /> },
];

const DataNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();

    // --- Effects (Keep as before) ---
    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => { document.body.style.overflow = originalStyle; }, 300);
        }
        return () => { document.body.style.overflow = originalStyle; };
    }, [isMenuOpen]);

    useEffect(() => {
        if (location.hash) {
            const targetElement = document.getElementById(location.hash.substring(1));
            if (targetElement) {
                const timer = setTimeout(() => {
                    const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight - 30;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }, 150);
                return () => clearTimeout(timer);
            }
        }
    }, [location.pathname, location.hash]);

    // --- Handlers ---
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleMobileLinkClick = () => setIsMenuOpen(false);

    // --- Render ---
    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50 h-16 md:h-[70px] font-mono /* Monospace */
                transition-all duration-300 ease-in-out
                ${hasScrolled || isMenuOpen
                // Yellow Theme: Deep zinc/black gradient, sharp blur, subtle yellow glow/border
                ? ' backdrop-blur-xl'
                : 'bg-black/30 border-b border-transparent' // Start slightly visible dark bg
            }
            `}
            aria-label="Main Navigation"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 h-full flex items-center justify-between">

                {/* Logo/Name (Left) - Yellow Accent */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white transition-all duration-300 group shrink-0"
                    onClick={handleMobileLinkClick}
                    aria-label="Homepage"
                >
                    {/* Icon with Yellow Accent */}
                    <TbCodeDots className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 group-hover:animate-pulse" />
                    {/* Name styled like a function call with Yellow Accent */}
                    <span className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-yellow-300 transition-colors duration-300">
                        BudraHH<span className='text-yellow-500/80'>(</span><span className='text-slate-400'></span><span className='text-yellow-500/80'>)</span><span className='text-slate-500'>;</span>
                    </span>
                </Link>

                {/* Desktop Navigation Links (Center) - Yellow Accent Theme */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === (link.path === "/data-science" ? "/data-science" : link.path) && !link.hash;
                        return (
                            <Link
                                key={link.name}
                                to={link.path + (link.hash || '')}
                                className={`
                                    relative px-2 py-1 text-[15px] font-medium tracking-normal group transition-all duration-200 ease-out
                                    flex justify-center items-center gap-1.5 /* Align icon and text */
                                    ${isActive
                                    ? 'text-yellow-300 font-semibold bg-yellow-600/10 rounded-md shadow-inner shadow-yellow-900/30 ring-1 ring-yellow-600/20' // Active: Yellow bg tint, brighter text, subtle ring
                                    : 'text-slate-400 hover:text-yellow-400 hover:bg-zinc-800/50 rounded-md' // Default + Hover: Yellow text, dark bg highlight
                                }
                                `}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* Icon with Yellow Accent */}
                                <span className={`${isActive ? 'text-yellow-400': 'text-slate-600 group-hover:text-yellow-500 transition-colors'}`}>{React.cloneElement(link.icon, { className: 'w-4 h-4' })}</span>
                                <span className="group-hover:translate-x-0.5 transition-transform duration-150">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Action Button (Right) - Yellow Theme */}
                <a
                    href="/resume.pdf"
                    download="BudraHH_Report.pdf" // Use actual name or thematic name
                    className="hidden md:inline-flex items-center gap-2 text-yellow-400 border border-yellow-600/50 px-4 py-[7px] rounded-md text-xs bg-gradient-to-br from-zinc-900/80 to-black/90 hover:text-yellow-200 hover:border-yellow-400 hover:bg-yellow-900/30 hover:shadow-yellow-500/20 hover:shadow-md active:scale-[0.97] transition-all duration-200 ease-in-out group shrink-0"
                    aria-label="Download Report"
                >
                    {/* Icon */}
                    <FaChartLine className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Export Report</span>
                </a>

                {/* Mobile Menu Button - Yellow Accent */}
                <button
                    className="md:hidden text-slate-300 hover:text-yellow-400 z-[51] p-2 -mr-2 transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <div className="relative w-6 h-6">
                        <FaBarsStaggered className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                        <FaTimes className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                    </div>
                </button>
            </div>

            {/* --- Mobile Menu --- */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-lg z-40 transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleMenu}
                aria-hidden={!isMenuOpen}
            ></div>

            {/* Mobile Menu Panel - Deep Dark & Yellow Theme */}
            <div
                id="mobile-menu"
                className={`
                    fixed top-0 right-0 h-full w-4/5 max-w-[320px]
                    bg-gradient-to-b from-zinc-950 via-black to-zinc-950 /* Dark gradient */
                    border-l border-yellow-700/30 shadow-2xl shadow-yellow-900/30
                    flex flex-col py-6 z-50 font-mono /* Monospace font */
                    transition-transform duration-300 ease-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:hidden
                `}
                aria-hidden={!isMenuOpen}
            >
                {/* Menu Header - Yellow Prompt Style */}
                <div className="px-6 pb-4 mb-4 border-b border-yellow-700/20 flex justify-between items-center shrink-0">
                    <span className="text-yellow-400 text-base flex items-center gap-1">
                        <span className='text-slate-500'>></span> Query_Interface<span className='animate-pulse'>_</span> {/* Blinking cursor effect */}
                    </span>
                    <button className="text-slate-400 hover:text-white p-1" onClick={toggleMenu} aria-label="Close menu">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation Links - Yellow Accent Styling */}
                <nav className="flex flex-col space-y-2 px-4 flex-grow overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path && !link.hash;
                        return (
                            <Link
                                key={`${link.name}-mobile`}
                                to={link.path + (link.hash || '')}
                                onClick={handleMobileLinkClick}
                                className={`
                                    flex items-center gap-3.5 py-3 px-4 rounded-lg text-sm transition-all duration-150 ease-out transform active:scale-[0.97]
                                    group border border-transparent /* Base border */
                                    ${isActive
                                    ? 'bg-yellow-700/20 text-yellow-300 font-semibold shadow-inner shadow-yellow-900/40 border-yellow-600/40' // Active: Yellow highlight, border
                                    : 'text-slate-300 hover:bg-zinc-800/60 hover:text-yellow-400 hover:border-zinc-700' // Hover: Yellow text, dark bg, subtle border
                                }
                                `}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* Icon styling - Yellow accent */}
                                <span className={`text-lg ${isActive ? 'text-yellow-400' : 'text-slate-500 group-hover:text-yellow-500 transition-colors'}`}>{React.cloneElement(link.icon, { className: 'w-5 h-5' })}</span>
                                <span>{link.name}</span>
                                <span className="ml-auto text-xs text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 duration-200">{'>'}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Action Button - Consistent Yellow Theme */}
                <div className="px-5 pt-5 mt-auto border-t border-yellow-700/20 shrink-0">
                    <a
                        href="/resume.pdf"
                        download="BudraHH_Report.pdf"
                        onClick={handleMobileLinkClick}
                        className="w-full inline-flex items-center justify-center gap-2.5 text-yellow-300 border border-yellow-500/80 px-4 py-3 rounded-md text-sm bg-gradient-to-r from-yellow-900/80 via-yellow-950/70 to-yellow-900/80 hover:text-yellow-100 hover:border-yellow-400 hover:shadow-yellow-500/30 hover:shadow-lg active:scale-[0.98] transition-all duration-200 ease-in-out group"
                        aria-label="Download Report"
                    >
                        <FaChartLine className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Export Report</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default DataNavbar;