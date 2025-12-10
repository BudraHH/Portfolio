import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLink, FaTwitter, FaBuilding, FaStar, FaCodeBranch } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import image_2 from '../../assets/image_2.jpg';
import yes from '../../assets/yes.png';
import { REPOSITORIES, LANGUAGE_COLORS } from '../../constants/projects.js';
import { ABOUT_ME_HEADER, CONTACTS, NAV_TABS, SOCIAL_STATS } from '../constants/profile.js';

export default function Info({ onNavigate }) {
    const { title, subtitle, bio, readme } = ABOUT_ME_HEADER;

    // Select a few repos to "Pin"
    const pinnedRepos = REPOSITORIES.slice(0, 6);

    // Animation variants - matching Projects.jsx
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

    // Contribution graph simulation
    const renderContributionGraph = () => {
        return (
            <div className="flex gap-[3px] overflow-x-auto">
                {[...Array(53)].map((_, col) => (
                    <div key={col} className="flex flex-col gap-[3px]">
                        {[...Array(7)].map((_, row) => {
                            const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                            const colors = ['bg-[#161b22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];
                            return (
                                <div key={row} className={`w-[10px] h-[10px] rounded-sm ${colors[level]}`} />
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full min-h-full bg-[#0d1117] p-4 md:p-8 font-sans text-gray-300"
        >
            <div className="max-w-6xl mx-auto">

                {/* Sub-Navigation */}
                <motion.div variants={itemVariants} className="mb-6">
                    <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {NAV_TABS.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    if (tab === 'Repositories' && onNavigate) {
                                        onNavigate('https://portfolio.com/projects');
                                    }
                                }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                                    ${tab === 'Overview'
                                        ? 'bg-gray-800 text-gray-100 shadow-sm border border-gray-700'
                                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                    }`}
                            >
                                {tab}
                                {tab === 'Repositories' && (
                                    <span className="ml-2 bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full text-xs">
                                        {REPOSITORIES.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* GitHub-style two-column layout */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    {/* LEFT SIDEBAR - Profile Card */}
                    <div
                        className="md:w-72 flex flex-col justify-start items-start gap-2"
                    >
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-800 overflow-hidden relative group shadow-2xl ring-4 ring-gray-800/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-gray-900 mix-blend-overlay" />
                            <img
                                src={yes}
                                alt="Profile"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Name & Username */}
                        <div className="mb-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">{title}</h1>
                            <p className="text-xl text-gray-400 font-light">{subtitle}</p>
                        </div>

                        {/* Bio */}
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
                            {bio}
                        </p>

                        {/* Followers/Following */}
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700/50 w-full">
                            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                <span className="font-bold text-gray-100">{SOCIAL_STATS.followers}</span> followers
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors">
                                <span className="font-bold text-gray-100">{SOCIAL_STATS.following}</span> following
                            </span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                            {CONTACTS.map((contact, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                    <contact.icon className="text-gray-500" />
                                    <span>{contact.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CONTENT - Main Profile Content */}
                    <div className="flex-1 min-w-0 space-y-6">

                        {/* README Section */}
                        <motion.div variants={itemVariants}>
                            <div className="bg-[#161b22]/30 border border-gray-800 rounded-xl p-5 md:p-6">
                                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                                    <RiGitRepositoryLine className="text-gray-400" />
                                    <span className="font-mono text-sm text-gray-400">BudraHH / README.md</span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6">Hi there, I'm Hari 👋</h2>

                                <div className="space-y-4 text-gray-300">
                                    {readme.map((p, i) => (
                                        <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
                                    ))}

                                    <div className="pt-6 mt-6 border-t border-gray-700/50">
                                        <h3 className="text-lg font-bold text-gray-100 mb-3">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['JavaScript', 'React', 'Node.js', 'Python', 'Web3', 'Framer Motion', 'Next.js'].map(tech => (
                                                <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Pinned Repositories */}
                        <motion.div variants={itemVariants}>
                            <h2 className="text-lg font-bold text-gray-100 mb-4">Pinned</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {pinnedRepos.map((repo) => (
                                    <div
                                        key={repo.name}
                                        className="bg-[#161b22]/30 border border-gray-800 hover:border-cyan-500/30 rounded-xl p-5 transition-all group cursor-pointer hover:bg-[#161b22]/80 relative overflow-hidden"
                                    >
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <RiGitRepositoryLine className="text-gray-400" />
                                                    <h3 className="text-base font-bold text-cyan-400 group-hover:underline decoration-cyan-500/30 underline-offset-4">
                                                        {repo.name}
                                                    </h3>
                                                </div>
                                                <span className="text-[10px] px-2 py-0.5 border border-gray-700 rounded-full text-gray-500">Public</span>
                                            </div>

                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                                                {repo.description || "No description provided."}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                                                <div className="flex items-center gap-3">
                                                    {repo.languages.slice(0, 2).map((language) => (
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
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contribution Calendar */}
                        <motion.div variants={itemVariants}>
                            <div className="bg-[#161b22]/30 border border-gray-800 rounded-xl p-5 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-base font-bold text-gray-100">542 contributions in the last year</h2>
                                </div>

                                <div className="mb-3">
                                    {renderContributionGraph()}
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span className="hover:text-cyan-400 cursor-pointer">Learn how we count contributions</span>
                                    <div className="flex items-center gap-1">
                                        <span>Less</span>
                                        <div className="w-2.5 h-2.5 bg-[#161b22] rounded-sm" />
                                        <div className="w-2.5 h-2.5 bg-[#0e4429] rounded-sm" />
                                        <div className="w-2.5 h-2.5 bg-[#006d32] rounded-sm" />
                                        <div className="w-2.5 h-2.5 bg-[#26a641] rounded-sm" />
                                        <div className="w-2.5 h-2.5 bg-[#39d353] rounded-sm" />
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex justify-center mt-6 mb-4 opacity-50">
                            <p className='text-gray-600 text-xs uppercase tracking-widest'>End of profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
