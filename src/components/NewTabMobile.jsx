import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHome, FaSearch, FaCog, FaUser } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

export default function NewTabMobile({ newTabData, newTabActions }) {
    const { bookmarks } = newTabData;
    const { navigateToUrl } = newTabActions;

    const quickAccessSites = [
        {
            name: "GitHub",
            url: "https://github.com",
            icon: FaGithub,
            shortName: "GitHub"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com",
            icon: FaLinkedin,
            shortName: "LinkedIn"
        },
        {
            name: "Portfolio",
            url: "http://localhost:3000/info",
            icon: FaHome,
            shortName: "Portfolio"
        },
        {
            name: "Profile",
            url: "http://localhost:3000/profile",
            icon: FaUser,
            shortName: "Profile"
        }
    ];

    return (
        <div className="flex flex-col min-h-full bg-[#08141b] overflow-y-auto">
            {/* Google Logo / Branding - Chrome Style */}
            <div className="flex flex-col items-center pt-24 xs:pt-32 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 xs:mb-10"
                >
                    <div className="text-5xl xs:text-6xl sm:text-7xl font-bold text-center tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                            Browser
                        </span>
                    </div>
                </motion.div>

                {/* Search Bar - Chrome Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full max-w-xl mb-10 xs:mb-12"
                >
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60">
                            <FaSearch size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Google or type a URL"
                            onFocus={(e) => {
                                e.target.blur();
                                // Could trigger actual search functionality
                            }}
                            className="w-full h-12 xs:h-14 pl-12 pr-4
                                bg-gradient-to-br from-cyan-500/10 to-cyan-500/5
                                border border-cyan-500/30
                                rounded-full
                                text-cyan-100 text-sm xs:text-base
                                placeholder-cyan-400/50
                                focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                                shadow-[0_2px_10px_rgba(0,255,255,0.1)]
                                transition-all"
                            readOnly
                        />
                    </div>
                </motion.div>
            </div>

            {/* Quick Access Shortcuts - Chrome Grid Style */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-4 pb-8"
            >
                <div className="max-w-xl mx-auto">
                    {/* Grid of shortcuts */}
                    <div className="grid grid-cols-4 gap-3 xs:gap-4 mb-8">
                        {quickAccessSites.map((site, idx) => (
                            <motion.button
                                key={site.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 + idx * 0.05, type: "spring" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigateToUrl(site.url)}
                                className="group flex flex-col items-center gap-2 touch-manipulation"
                            >
                                {/* Icon container - Chrome style circular */}
                                <div className="relative w-14 h-14 xs:w-16 xs:h-16">
                                    <div className="w-full h-full rounded-2xl
                                        bg-gradient-to-br from-cyan-400/15 to-cyan-600/10
                                        backdrop-blur-sm
                                        border border-cyan-500/20
                                        flex items-center justify-center
                                        transition-all duration-300
                                        active:scale-95
                                        shadow-[0_2px_8px_rgba(0,255,255,0.1)]"
                                    >
                                        <site.icon className="text-xl xs:text-2xl text-cyan-400" />
                                    </div>

                                    {/* Edit button overlay - Chrome style */}
                                    <div className="absolute -top-1 -right-1 w-5 h-5 xs:w-6 xs:h-6
                                        bg-[#08141b] border border-cyan-500/30 rounded-full
                                        flex items-center justify-center opacity-0 group-active:opacity-100
                                        transition-opacity"
                                    >
                                        <MdEdit className="text-cyan-400 text-[10px] xs:text-xs" />
                                    </div>
                                </div>

                                {/* Label */}
                                <span className="text-cyan-200/70 text-xs xs:text-sm font-normal text-center truncate w-full px-1">
                                    {site.shortName}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Add shortcut button - Chrome style */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileTap={{ scale: 0.95 }}
                        className="mx-auto flex flex-col items-center gap-2 touch-manipulation"
                    >
                        <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-2xl
                            bg-gradient-to-br from-cyan-400/10 to-cyan-600/5
                            border border-cyan-500/30 border-dashed
                            flex items-center justify-center
                            active:scale-95 transition-all"
                        >
                            <svg className="w-6 h-6 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-cyan-400/60 text-xs xs:text-sm">Add shortcut</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Customize button - Chrome bottom right */}
            <div className="fixed bottom-6 right-4 z-10">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5
                        bg-gradient-to-r from-cyan-500/20 to-cyan-600/10
                        backdrop-blur-md
                        border border-cyan-500/30
                        rounded-full
                        shadow-lg
                        touch-manipulation"
                >
                    <MdEdit className="text-cyan-400 text-base" />
                    <span className="text-cyan-300 text-sm font-medium">Customize</span>
                </motion.button>
            </div>

            {/* Decorative gradient orbs */}
            <div className="fixed top-20 left-10 w-40 h-40 xs:w-56 xs:h-56 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-20 right-10 w-48 h-48 xs:w-64 xs:h-64 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
