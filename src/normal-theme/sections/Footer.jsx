import React, { useCallback, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../constants/socials';
import { PROFILE } from '../../constants/profile';
import { NAVIGATION_LINKS } from '../constants/navigation';
import { NORMAL_ROUTES } from '../routes/routes';

// Move static social links array outside component
const socialLinks = [
    { icon: FaGithub, href: SOCIAL_LINKS.GITHUB, label: 'GitHub' },
    { icon: FaLinkedin, href: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    { icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' },
    { icon: FaWhatsapp, href: SOCIAL_LINKS.WHATSAPP, label: 'WhatsApp' }
];

// Memoized SocialLink component
const SocialLink = React.memo(({ social, index }) => (
    <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 sm:w-11 sm:h-11 
                   rounded-full 
                   bg-white/5 
                   flex items-center justify-center 
                   text-zinc-400 
                   hover:text-cyan-400 
                   hover:bg-cyan-500/10 
                   transition-all 
                   border border-white/5 
                   hover:border-cyan-500/30
                   min-w-[44px] min-h-[44px]
                   touch-manipulation"
        aria-label={social.label}
        style={{ willChange: 'transform' }}
    >
        <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
    </motion.a>
));

SocialLink.displayName = 'SocialLink';

// Memoized NavLink component
const NavLink = React.memo(({ item, onClick }) => (
    <button
        onClick={onClick}
        className="hover:text-cyan-400 transition-colors 
                   uppercase tracking-wider
                   min-h-[44px] min-w-[44px]
                   flex items-center justify-center
                   touch-manipulation"
        style={{
            fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)',
        }}
    >
        {item}
    </button>
));

NavLink.displayName = 'NavLink';

const Footer = () => {
    const navigate = useNavigate();

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleBrandClick = useCallback(() => {
        navigate(NORMAL_ROUTES.ROOT);
    }, [navigate]);

    const handleNavClick = useCallback((item) => {
        const sectionId = item.toLowerCase() === 'home' ? '' : item.toLowerCase();
        navigate(`${NORMAL_ROUTES.ROOT}/${sectionId}`);
    }, [navigate]);

    // Memoize current year
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="relative bg-[#050a0f] border-t border-white/5 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 
                            w-full max-w-xl sm:max-w-2xl md:max-w-3xl 
                            h-[1px] 
                            bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent 
                            shadow-[0_0_15px_rgba(6,182,212,0.4)] sm:shadow-[0_0_20px_rgba(6,182,212,0.5)]" />

            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='1'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-7xl mx-auto 
                            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 
                            py-8 sm:py-10 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 
                                gap-8 sm:gap-10 md:gap-12 
                                items-start md:items-center">

                    {/* Brand / Copyright */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div
                            onClick={handleBrandClick}
                            className="font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity
                                       touch-manipulation"
                            style={{
                                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                            }}
                        >
                            BUDRA<span className="text-cyan-400">.</span>
                        </div>
                        <div className="text-zinc-500 flex items-center gap-1 font-light flex-wrap"
                            style={{
                                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            }}
                        >
                            © {currentYear} {PROFILE.NAME}.
                            <span className="hidden xs:inline">Made with</span>
                            <FaHeart className="text-red-500/60 mx-0.5 sm:mx-1 animate-pulse text-xs sm:text-sm" />
                            <span className="hidden xs:inline">&</span>
                            <span className="xs:hidden">/</span>
                            React.
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex items-center justify-start md:justify-center 
                                    gap-4 sm:gap-6 md:gap-8 
                                    font-medium text-zinc-400
                                    flex-wrap">
                        {NAVIGATION_LINKS.map((item) => (
                            <NavLink
                                key={item}
                                item={item}
                                onClick={() => handleNavClick(item)}
                            />
                        ))}
                    </div>

                    {/* Socials & Scroll Top */}
                    <div className="flex items-center justify-between md:justify-end 
                                    gap-4 sm:gap-5 md:gap-6">
                        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 flex-wrap">
                            {socialLinks.map((social, idx) => (
                                <SocialLink key={idx} social={social} index={idx} />
                            ))}
                        </div>

                        {/* Back to Top Button */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-11 h-11 sm:w-12 sm:h-12 
                                       rounded-lg sm:rounded-xl 
                                       bg-gradient-to-tr from-cyan-900/20 to-cyan-500/20 
                                       border border-cyan-500/30 
                                       flex items-center justify-center 
                                       text-cyan-400 
                                       shadow-[0_0_12px_rgba(6,182,212,0.12)] sm:shadow-[0_0_15px_rgba(6,182,212,0.15)] 
                                       hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] sm:hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] 
                                       hover:border-cyan-400 
                                       transition-all 
                                       font-bold
                                       min-w-[44px] min-h-[44px]
                                       touch-manipulation"
                            aria-label="Scroll to top"
                            style={{ willChange: 'transform' }}
                        >
                            <FaArrowUp className="text-sm sm:text-base" />
                        </motion.button>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
