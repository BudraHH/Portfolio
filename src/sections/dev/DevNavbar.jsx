import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Using react-icons - ensuring consistent icon style
import { FaTimes, FaReact, FaFileDownload } from 'react-icons/fa';
import { FaBarsStaggered } from 'react-icons/fa6'; // FaBarsStaggered for visual flair, FaReact as placeholder logo

// --- Navigation Links Data ---
// Standardized 'path' and ensured clarity for root/development home
const navLinks = [
    // The logo link will handle navigation to '/' (Greetings page)
    // This 'Home' links to the main development section dashboard
    { name: "Home", path: "/development" },
    { name: "About", path: "/development/about" },
    { name: "Projects", path: "/development/projects" },
    { name: "Contact", path: "/development", hash: "#contact" }, // Added hash for scrolling
    // Add other main sections if needed
];

const DevNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation(); // Hook to get the current page location
    const navigate = useNavigate(); // Hook for programmatic navigation

    // --- Effects ---

    // Effect to detect scroll and add/remove styling
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 5);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial scroll position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to lock body scroll when mobile menu is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isMenuOpen]);

    // Effect to handle scrolling to the anchor after navigation
    useEffect(() => {
        if (location.hash) {
            const targetElement = document.querySelector(location.hash);
            if (targetElement) {
                setTimeout(() => { // Small delay to ensure element is rendered
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.hash]); // Re-run when the hash in the URL changes

    // --- Handlers ---

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleNavLinkClick = (path, hash) => {
        closeMobileMenu();
        if (hash) {
            navigate(path + hash);
        } else {
            navigate(path);
        }
    };


    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50 h-16 md:h-[70px]
                transition-all duration-300 ease-in-out
                ${hasScrolled || isMenuOpen
                ? ' backdrop-blur-lg shadow-lg border-b border-gray-700/30'
                : 'bg-transparent '
            }
            `}
            aria-label="Main Navigation"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 h-full flex items-center justify-between">

                {/* Logo/Name (Left) - Links to Greetings page */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 text-white transition-all duration-300 group shrink-0"
                    onClick={closeMobileMenu}
                    aria-label="Homepage"
                >

                    {"<"}<span className="text-lg md:text-xl font-bold font-mono tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                        BudraHH
                    </span>/ {">"}
                </Link>

                {/* Desktop Navigation Links (Center) */}
                <div className="hidden md:flex items-center gap-5 lg:gap-7">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const isContactLink = link.name === "Contact";

                        return (
                            <Link
                                key={link.name}
                                to={link.path + (link.hash || '')} // Append hash to the link
                                onClick={isContactLink ? () => handleNavLinkClick(link.path, link.hash) : undefined}
                                className={`
                                    relative px-1 py-1 text-sm lg:text-[15px] font-mono font-medium tracking-wider group transition-colors duration-300
                                    ${isActive && !link.hash
                                    ? 'text-cyan-300 font-semibold'
                                    : 'text-gray-400 hover:text-cyan-300'
                                }
                                `}
                                aria-current={isActive && !link.hash ? 'page' : undefined}
                            >
                                <span className={`absolute -left-1.5 top-1/2 -translate-y-1/2 transition-all duration-300 ${isActive && !link.hash ? 'opacity-0' : 'text-gray-600 group-hover:text-cyan-600/60 group-hover:scale-110 group-hover:-translate-x-0.5 opacity-80'}`}>{`{`}</span>
                                {link.name}
                                <span className={`absolute -right-1.5 top-1/2 -translate-y-1/2 transition-all duration-300 ${isActive && !link.hash ? 'opacity-0' : 'text-gray-600 group-hover:text-cyan-600/60 group-hover:scale-110 group-hover:translate-x-0.5 opacity-80'}`}>{`}`}</span>
                                <span className={`
                                    absolute bottom-[-4px] left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out
                                    ${isActive && !link.hash ? 'w-full' : 'w-0 group-hover:w-full'}
                                `}></span>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Resume Button (Right) */}
                <a
                    href="/resume.pdf"
                    download="HariHaraBudra_Resume.pdf"
                    className="hidden md:inline-flex items-center gap-1.5 text-gray-300 border border-gray-600/80 px-3.5 py-[7px] rounded text-xs font-mono bg-gray-800/70 hover:text-cyan-300 hover:border-cyan-600/90 hover:bg-gray-700/80 active:bg-gray-600/70 active:scale-[0.97] transition-all duration-150 ease-in-out shadow-sm hover:shadow-md group shrink-0"
                    aria-label="Download Resume"
                >
                    <FaFileDownload className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Resume</span>
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-cyan-300 z-[51] p-2 -mr-2 transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <div className="relative w-6 h-6">
                        <FaBarsStaggered className={`absolute top-0 left-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                        <FaTimes className={`absolute top-0 left-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                    </div>
                </button>

            </div>

            {/* --- Mobile Menu --- */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleMenu}
                aria-hidden={!isMenuOpen}
            ></div>

            {/* Mobile Menu Panel */}
            <div
                id="mobile-menu"
                className={`
                    fixed top-0 right-0 h-full w-3/4 max-w-[280px]
                    bg-gray-950 border-l border-gray-700/60 shadow-2xl
                    flex flex-col py-6 z-50
                    transition-transform duration-300 ease-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                aria-hidden={!isMenuOpen}
            >
                {/* Menu Header */}
                <div className="px-5 pb-4 mb-4 border-b border-gray-700/50 flex justify-between items-center">
                    <span className="font-mono text-cyan-400 text-base">// Navigation</span>
                    <button className="text-gray-400 hover:text-white p-1" onClick={toggleMenu} aria-label="Close menu">
                        <FaTimes className="w-4 h-4" />
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2 px-5 flex-grow overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const isContactLink = link.name === "Contact";

                        return (
                            <Link
                                key={link.name}
                                to={link.path + (link.hash || '')} // Append hash to the link
                                onClick={() => handleNavLinkClick(link.path, link.hash)}
                                className={`
                                    block py-2.5 px-3.5 rounded-md font-mono text-sm transition-all duration-200 ease-in-out
                                    ${isActive && !link.hash
                                    ? 'bg-cyan-800/60 text-cyan-300 font-semibold shadow-inner'
                                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:pl-4'
                                }
                                `}
                                aria-current={isActive && !link.hash ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Resume Button */}
                <div className="px-5 pt-6 mt-auto border-t border-gray-700/50">
                    <a
                        href="/resume.pdf"
                        download="HariHaraBudra_Resume.pdf"
                        onClick={closeMobileMenu}
                        className="w-full inline-flex items-center justify-center gap-2 text-gray-100 border border-cyan-600/90 px-4 py-2.5 rounded-md text-sm font-mono bg-gradient-to-r from-cyan-700/90 to-cyan-600/90 hover:from-cyan-600/90 hover:to-cyan-500/90 active:scale-[0.98] transition-all duration-200 ease-in-out shadow-md hover:shadow-lg group"
                        aria-label="Download Resume"
                    >
                        <FaFileDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Download Resume</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default DevNavbar;