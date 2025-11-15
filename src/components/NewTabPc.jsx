import { motion } from 'framer-motion';
import { FaFirefoxBrowser, FaGithub, FaLinkedin, FaHome, FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';

export default function NewTabPc({ newTabData, newTabActions }) {
    const { bookmarks } = newTabData;
    const { navigateToUrl } = newTabActions;

    const quickAccessSites = [
        {
            name: "GitHub",
            url: "https://github.com",
            icon: FaGithub,
            color: "from-cyan-500 to-cyan-600",
            hoverColor: "hover:from-cyan-600 hover:to-cyan-700"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com",
            icon: FaLinkedin,
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            name: "Portfolio",
            url: "http://localhost:3000/info",
            icon: FaHome,
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-full p-12 overflow-y-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <div className="relative inline-block mb-6">
                    <FaFirefoxBrowser className="text-8xl text-cyan-400 opacity-50 animate-pulse" />
                    <div className="absolute inset-0 blur-2xl bg-cyan-400/30 -z-10"></div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-3">
                    New Tab
                </h2>
                <p className="text-cyan-300/70 text-lg">Start a new browsing session</p>
            </motion.div>

            {/* Quick Access Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-16 mb-16"
            >
                {quickAccessSites.map((site, idx) => (
                    <motion.button
                        key={site.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 + idx * 0.1, type: "spring" }}

                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigateToUrl(site.url)}
                        className="group flex flex-col items-center gap-3"
                    >
                        <div className="relative">
                            {/* Glass container */}
                            <div className="w-16 h-16 rounded-2xl
        bg-gradient-to-br from-cyan-400/20 to-cyan-600/10
        backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        flex items-center justify-center
        transition-all duration-300">
                                <site.icon className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                            </div>

                            {/* Glow effect behind glass */}
                            <div className="absolute inset-0 -z-10 rounded-2xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>


                        {/* Minimal Text */}
                        <span className="text-cyan-100/60 text-xs font-medium group-hover:text-cyan-100/90 transition-colors">
                {site.name}
            </span>
                    </motion.button>
                ))}
            </motion.div>


            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full max-w-5xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                            <FaBookmark className="text-cyan-400" />
                        </div>
                        <h3 className="text-cyan-400 text-xl font-semibold">Bookmarks</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {bookmarks.map((bookmark, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                onClick={() => navigateToUrl(bookmark.url)}
                                className="group p-4 rounded-xl
                                    bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.05)_0%,rgba(0,0,0,0.3)_100%)]
                                    border border-cyan-500/20 hover:border-cyan-500/40
                                    transition-all text-left relative overflow-hidden"
                            >
                                {/* Hover Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={bookmark.favicon}
                                                alt=""
                                                className="w-5 h-5 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<span class="text-cyan-400 text-xs">🔖</span>';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-cyan-100 text-sm font-medium truncate group-hover:text-cyan-300 transition-colors">
                                                {bookmark.title}
                                            </p>
                                        </div>
                                        <FaExternalLinkAlt className="text-cyan-500/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-cyan-500/50 text-xs truncate ml-11">{bookmark.url}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Decorative Elements */}
            <div className="fixed top-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
