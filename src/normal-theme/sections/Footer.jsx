import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../constants/socials';
import { PROFILE } from '../../constants/profile';
import { NAVIGATION_LINKS } from '../constants/navigation';
import { NORMAL_ROUTES } from '../routes/routes';

const Footer = () => {
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-[#050a0f] border-t border-white/5 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]" />

            {/* Cinematic Noise Overlay specific to section */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='1'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start md:items-center">

                    {/* Brand / Copyright */}
                    <div className="flex flex-col gap-4">
                        <div
                            onClick={() => navigate(NORMAL_ROUTES.ROOT)}
                            className="font-bold text-xl tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            BUDRA<span className="text-cyan-400">.</span>
                        </div>
                        <div className="text-zinc-500 text-sm flex items-center gap-1 font-light">
                            © {new Date().getFullYear()} {PROFILE.NAME}.
                            <span className="hidden sm:inline">Made with</span> <FaHeart className="text-red-500/60 mx-1 animate-pulse" /> & React.
                        </div>
                    </div>

                    {/* Quick Links (Centered on desktop) */}
                    <div className="flex items-center justify-start md:justify-center gap-8 text-sm font-medium text-zinc-400">
                        {NAVIGATION_LINKS.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    const sectionId = item.toLowerCase() === 'home' ? '' : item.toLowerCase();
                                    navigate(`${NORMAL_ROUTES.ROOT}/${sectionId}`);
                                }}
                                className="hover:text-cyan-400 transition-colors uppercase tracking-wider text-xs"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Socials & Scroll Top */}
                    <div className="flex items-center justify-between md:justify-end gap-6">
                        <div className="flex items-center gap-4">
                            {[
                                { icon: FaGithub, href: SOCIAL_LINKS.GITHUB },
                                { icon: FaLinkedin, href: SOCIAL_LINKS.LINKEDIN },
                                { icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM },
                                { icon: FaWhatsapp, href: SOCIAL_LINKS.WHATSAPP }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all border border-white/5 hover:border-cyan-500/30"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>

                        {/* Back to Top Button */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-900/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-all font-bold"
                            aria-label="Scroll to top"
                        >
                            <FaArrowUp />
                        </motion.button>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
