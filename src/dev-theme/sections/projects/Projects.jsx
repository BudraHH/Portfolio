import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCodeBranch, FaRegStar, FaSearch, FaMapMarkerAlt, FaLink, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import image from '../../../assets/image_bw.png';
import { LANGUAGE_COLORS, REPOSITORIES } from '../../../constants/projects.js';
import { ABOUT_ME_HEADER, CONTACTS, NAV_TABS, SOCIAL_STATS } from '../../constants/profile.js';

export default function Projects({ onNavigate }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRepos = REPOSITORIES.filter(repo =>
        repo.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full min-h-full bg-[#0d1117] p-4 md:p-8 font-sans text-gray-300"
        >
            <div className="max-w-6xl mx-auto">
                {/* Profile/Header Section */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-8 mb-10 border-b border-gray-700/50 pb-10"
                >
                    <div className="flex-shrink-0 md:-mt-4">
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-800 overflow-hidden relative group shadow-2xl ring-4 ring-gray-800/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-gray-900 mix-blend-overlay" />
                            <img
                                src={image}
                                alt="Profile"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">{ABOUT_ME_HEADER.title}</h1>
                            <p className="text-xl text-gray-400 font-light">{ABOUT_ME_HEADER.subtitle}</p>
                        </div>

                        <p className="text-gray-300 leading-relaxed max-w-2xl text-base md:text-lg">
                            {ABOUT_ME_HEADER.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-2">
                            {CONTACTS.map((contact, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                    <contact.icon className="text-gray-500" /> {contact.text}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 pt-2">
                            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                <span className="font-bold text-gray-100">{SOCIAL_STATS.followers}</span> followers
                            </span>
                            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                <span className="font-bold text-gray-100">{SOCIAL_STATS.following}</span> following
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Sub-Navigation & Filters */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {NAV_TABS.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    if (tab === 'Overview' && onNavigate) {
                                        onNavigate('https://portfolio.com/info');
                                    }
                                }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                                    ${tab === 'Repositories'
                                        ? 'bg-gray-800 text-gray-100 shadow-sm border border-gray-700'
                                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                    }`}
                            >
                                {tab}
                                {tab === 'Repositories' && (
                                    <span className="ml-2 bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full text-xs">
                                        {searchQuery ? filteredRepos.length : REPOSITORIES.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Find a repository..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-300 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all outline-none"
                            />
                            <FaSearch className="absolute right-2.5 top-2.5 text-gray-500 text-xs" />
                        </div>
                    </div>
                </motion.div>

                {/* Repository List */}
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredRepos.length > 0 ? (
                            filteredRepos.map((repo, i) => (
                                <motion.div
                                    key={repo.name}
                                    variants={itemVariants}
                                    layoutId={repo.name}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                    className="bg-[#161b22]/30 border border-gray-800 hover:border-cyan-500/30 rounded-xl p-5 md:p-6 transition-all group cursor-pointer hover:bg-[#161b22]/80 relative overflow-hidden"
                                    onClick={() => {
                                        if (onNavigate) onNavigate(repo.name);
                                    }}
                                >
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 group-hover:underline decoration-cyan-500/30 underline-offset-4">
                                                {repo.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                                {repo.techStack?.slice(0, 3).map(tech => (
                                                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="flex items-center gap-2 text-xs font-medium bg-[#21262d] border border-gray-700/50 hover:border-gray-500 text-gray-300 px-3 py-1.5 rounded-lg transition-all hover:bg-gray-700 group/btn shadow-sm"
                                        >
                                            <FaRegStar className="text-gray-400 group-hover/btn:text-yellow-400 transition-colors" />
                                            <span>Star</span>
                                        </button>
                                    </div>

                                    <p className="text-gray-400 text-sm md:text-base max-w-3xl mb-4 leading-relaxed relative z-10">
                                        {repo.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 relative z-10">
                                        <div className="flex items-center gap-3">
                                            {repo.languages.map((language, idx) => (
                                                <div key={`${repo.name}-${language}`} className="flex items-center gap-1.5">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[language] || "bg-gray-500"} shadow-sm`} />
                                                    <span>{language}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                            <FaStar /> {repo.stars}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                            <FaCodeBranch /> {repo.forks}
                                        </div>
                                        <div>{repo.updated}</div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 text-gray-500"
                            >
                                <p className="text-lg">No repositories match your search.</p>
                                <button
                                    className="mt-4 text-cyan-400 hover:underline text-sm"
                                    onClick={() => setSearchQuery("")}
                                >
                                    Clear filter
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-center mt-10 mb-4 opacity-50">
                    <p className='text-gray-600 text-xs uppercase tracking-widest'>End of public repositories</p>
                </div>
            </div>
        </motion.div>
    );
}
