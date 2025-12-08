import { motion } from 'framer-motion';
import { FaTerminal, FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect, useMemo, memo } from 'react';

const SOCIAL_LINKS = [
    {
        href: "https://github.com/yourusername",
        Icon: FaGithub,
        title: "GitHub",
        subtitle: "View my code",
        gradient: "from-cyan-400/30 to-cyan-600/20",
        borderColor: "border-cyan-400/40"
    },
    {
        href: "https://linkedin.com/in/yourusername",
        Icon: FaLinkedin,
        title: "LinkedIn",
        subtitle: "Let's connect",
        gradient: "from-blue-400/30 to-blue-600/20",
        borderColor: "border-blue-400/40"
    },
    {
        href: "mailto:your.email@example.com",
        Icon: FaEnvelope,
        title: "Email",
        subtitle: "Send a message",
        gradient: "from-green-400/30 to-green-600/20",
        borderColor: "border-green-400/40"
    }
];

// Memoized Social Link
const SocialLink = memo(({ href, Icon, title, subtitle, gradient, borderColor, delay }) => (
    <motion.a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 xs:gap-3
            p-2.5 xs:p-3 sm:p-4
            bg-cyan-500/10 border border-cyan-500/20
            rounded-lg xs:rounded-xl
            hover:bg-cyan-500/20 hover:border-cyan-400/40
            transition-all touch-manipulation"
    >
        <div className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 
            rounded-lg bg-gradient-to-br ${gradient} 
            flex items-center justify-center border ${borderColor} 
            group-hover:scale-110 transition-transform flex-shrink-0`}>
            <Icon className="text-cyan-300 text-base xs:text-lg sm:text-xl" />
        </div>
        <div className="min-w-0">
            <h3 className="text-cyan-100 font-semibold text-xs xs:text-sm truncate">{title}</h3>
            <p className="text-cyan-400/70 text-[9px] xs:text-[10px] sm:text-xs truncate">{subtitle}</p>
        </div>
    </motion.a>
));

SocialLink.displayName = 'SocialLink';

export default function Closing({ onAnimationComplete }) {
    const [showContent, setShowContent] = useState(false);
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    // Show content immediately and notify parent when ready
    useEffect(() => {
        setShowContent(true);

        // Notify parent after all animations complete (1.2s delay + 0.6s duration)
        const timer = setTimeout(() => {
            onAnimationComplete?.();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <div className="">
            {/* Main Content */}
            {showContent && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 m-10"
                >
                    {/* Closing Message */}
                    <div className="text-center space-y-2 xs:space-y-3 sm:space-y-4
                        py-4 xs:py-5 sm:py-6 md:py-8
                        border-y border-cyan-500/20">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 text-cyan-300"
                        >
                            <FaTerminal className="text-lg xs:text-xl sm:text-2xl md:text-3xl" />
                            <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold">
                                Thanks for Visiting!
                            </span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-cyan-200/80 text-xs xs:text-sm sm:text-base
                                max-w-2xl mx-auto leading-relaxed px-2 xs:px-3 sm:px-4"
                        >
                            I appreciate you taking the time to explore my portfolio.
                            If you'd like to collaborate, discuss opportunities, or just say hi,
                            feel free to reach out through any of the channels below.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center gap-1 xs:gap-1.5 sm:gap-2
                                text-cyan-400/70 text-[10px] xs:text-xs sm:text-sm px-2"
                        >
                            <span>Built with</span>
                            <FaHeart className="text-red-400 animate-pulse" />
                            <span>using React, Framer Motion & Tailwind CSS</span>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                        {SOCIAL_LINKS.map((link, idx) => (
                            <SocialLink key={link.title} {...link} delay={0.8 + idx * 0.1} />
                        ))}
                    </div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-center text-cyan-400/50 text-[9px] xs:text-[10px] sm:text-xs space-y-0.5 xs:space-y-1"
                    >
                        <p>© {currentYear} Hari Hara Budra. All rights reserved.</p>
                        <p>Designed & Developed with passion in India 🇮🇳</p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
