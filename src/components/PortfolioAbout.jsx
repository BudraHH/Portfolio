import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { CONTACTS, ABOUT_ME_HEADER } from '../utils/constants.js';

export default function PortfolioAbout() {
    const { title, subtitle, bioParagraphs, footerQuote } = ABOUT_ME_HEADER;

    // Memoize animation variants
    const headerVariants = useMemo(() => ({
        initial: { opacity: 0, y: -30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }), []);

    const cardVariants = useMemo(() => ({
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.2 }
    }), []);

    return (
        <div className="w-full flex justify-center
            p-4 xs:p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20
            bg-[#08141b]">
            <div className="w-full max-w-7xl">

                {/* Animated Header */}
                <motion.div
                    {...headerVariants}
                    viewport={{ once: true }}
                    className="text-center
                        mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16"
                >
                    <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl
                        font-bold text-transparent bg-clip-text
                        bg-gradient-to-r from-cyan-400 via-cyan-200 to-white
                        mb-3 xs:mb-4 drop-shadow-lg
                        px-4">
                        {title}
                    </h2>
                    <div className="flex items-center justify-center gap-2 xs:gap-3 text-cyan-200/70 px-4">
                        <span className="w-8 xs:w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-cyan-200" />
                        <p className="text-xs xs:text-sm uppercase tracking-[0.15em] xs:tracking-[0.2em] font-semibold whitespace-nowrap">
                            {subtitle}
                        </p>
                        <span className="w-8 xs:w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-cyan-400 to-cyan-100" />
                    </div>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    {...cardVariants}
                    viewport={{ once: true }}
                    className="relative flex flex-col lg:flex-row gap-6 lg:gap-8
                        bg-[#0d202c] border border-cyan-400/30
                        rounded-xl sm:rounded-2xl overflow-hidden
                        shadow-2xl shadow-cyan-500/10 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-cyan-300/0 to-transparent pointer-events-none" />

                    <div className="flex-1 p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 relative z-10">
                        {/* Bio Paragraphs */}
                        <div className="mb-6 xs:mb-8 sm:mb-10">
                            {bioParagraphs.map((p, idx) => (
                                <p key={idx}
                                   className={`text-sm xs:text-base sm:text-lg leading-relaxed text-cyan-100 
                                       ${idx === bioParagraphs.length - 1 ? "" : "mb-3 xs:mb-4"} 
                                       font-light`}>
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
                            mb-6 xs:mb-8 sm:mb-10" />

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4
                            mb-6 xs:mb-8 sm:mb-10">
                            {CONTACTS.map((item, i) => {
                                const Icon = item.icon;
                                const content = (
                                    <>
                                        <div className="flex items-center justify-center
                                            w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11
                                            rounded-lg xs:rounded-xl
                                            bg-cyan-500/10 group-hover:bg-cyan-500/20
                                            transition-all duration-300 flex-shrink-0">
                                            <Icon className="text-cyan-300 text-base xs:text-lg
                                                group-hover:scale-110 transition-transform" />
                                        </div>
                                        <span className="text-cyan-100 group-hover:text-cyan-200
                                            transition-colors font-mono
                                            text-xs xs:text-sm
                                            flex-1 truncate">
                                            {item.text}
                                        </span>
                                    </>
                                );

                                return item.href ? (
                                    <motion.a
                                        key={i}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        className="group flex items-center gap-3 xs:gap-4
                                            p-3 xs:p-4
                                            rounded-lg xs:rounded-xl
                                            bg-cyan-800/30 hover:bg-cyan-600/10
                                            border border-cyan-500/10 hover:border-cyan-400/30
                                            transition-all duration-300
                                            touch-manipulation"
                                    >
                                        {content}
                                    </motion.a>
                                ) : (
                                    <div
                                        key={i}
                                        className="group flex items-center gap-3 xs:gap-4
                                            p-3 xs:p-4
                                            rounded-lg xs:rounded-xl
                                            bg-cyan-800/20 border border-cyan-500/10"
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Quote */}
                        <div className="pt-6 xs:pt-8 border-t border-cyan-500/10">
                            <p className="text-center text-cyan-200/70 italic
                                text-xs xs:text-sm
                                font-light px-2">
                                {footerQuote}
                            </p>
                        </div>
                    </div>

                    {/* Right: Animated Visual Accent - Hidden on mobile */}
                    <div className="hidden lg:flex lg:w-72 xl:w-80 flex-shrink-0 relative items-center justify-center p-6">
                        <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-cyan-400/5 via-cyan-700/10 to-cyan-600/5 animate-pulse" />

                        {/* Decorative Frame */}
                        <div className="absolute inset-4 rounded-2xl border-2 border-cyan-400/20 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-200/5 to-transparent" />

                            {/* Subtle Grid */}
                            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#grid)"/>
                                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
                                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4"/>
                                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
                                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                            </svg>
                        </div>

                        {/* Floating Code Brackets */}
                        <div className="relative z-10 text-cyan-300/30 text-7xl xl:text-8xl font-mono select-none">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {'{ }'}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
