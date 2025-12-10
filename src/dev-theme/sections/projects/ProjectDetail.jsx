import { motion } from 'framer-motion';
import { FaBook, FaGlobe, FaGithub, FaCog, FaCode, FaArrowLeft } from 'react-icons/fa';
import { REPOSITORIES, LANGUAGE_COLORS } from '../../../constants/projects.js';

export default function ProjectDetail({ repoName }) {
    const repo = REPOSITORIES.find(r => r.name === repoName) || {
        name: repoName,
        description: "Repository data not found.",
        languages: [],
        techStack: [],
        github: "#",
        website: null,
        stars: 0,
        forks: 0,
        updated: "Unknown"
    };

    // Fallback colors for unknown languages
    const getLangColor = (lang) => LANGUAGE_COLORS[lang] || "bg-gray-500";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full min-h-full bg-[#0d1117] font-sans text-gray-300 p-6 md:p-10"
        >
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <motion.div variants={itemVariants} className="border-b border-gray-700/50 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                <FaBook className="text-2xl text-cyan-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                                    {repo.name}
                                    <span className="text-xs font-medium border border-cyan-500/30 text-cyan-400 bg-cyan-950/30 rounded-full px-2.5 py-0.5 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                        Public
                                    </span>
                                </h1>
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                    Authored by <span className="text-gray-300 font-medium hover:text-cyan-400 cursor-pointer">BudraHH</span> • {repo.updated}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {repo.website && (
                                <a
                                    href={repo.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-green-900/20 hover:-translate-y-0.5 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaGlobe /> Live Demo
                                </a>
                            )}
                            <a
                                href={repo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#21262d] hover:bg-[#30363d] border border-gray-700 text-gray-200 rounded-lg font-medium text-sm transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub /> View Code
                            </a>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Readme & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
                            <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-cyan-500/50 pl-4">
                                {repo.description}
                            </p>
                        </motion.div>

                        {/* README Window */}
                        <motion.div variants={itemVariants} className="rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl bg-[#0d1117] relative group">
                            {/* Window Title Bar */}
                            <div className="bg-[#161b22] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/20" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/20" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/20" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                        <FaBook className="text-gray-600" /> README.md
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 font-mono">1.4 KB</div>
                            </div>

                            {/* Window Content */}
                            <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#0d1117] to-[#0f131a]">
                                <div>
                                    <h1 className="text-3xl font-bold border-b border-gray-800 pb-4 mb-4 text-gray-100">{repo.name}</h1>
                                    <p className="text-gray-400">{repo.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
                                        <FaCode className="text-cyan-400" /> Installation
                                    </h3>
                                    <div className="relative group/code">
                                        <pre className="bg-[#161b22] p-4 rounded-lg font-mono text-xs md:text-sm text-gray-300 overflow-x-auto border border-gray-700/50 shadow-inner">
                                            <span className="text-gray-500"># Clone the repository</span>
                                            <span className="text-cyan-400">$</span> <span className="text-pink-400">git</span> clone {repo.github}

                                            <span className="text-gray-500"># Navigate to project directory</span>
                                            <span className="text-cyan-400">$</span> <span className="text-pink-400">cd</span> {repo.name}

                                            <span className="text-gray-500"># Install dependencies</span>
                                            <span className="text-cyan-400">$</span> <span className="text-pink-400">npm</span> install

                                            <span className="text-gray-500"># Start local server</span>
                                            <span className="text-cyan-400">$</span> <span className="text-pink-400">npm</span> run dev</pre>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                            <button className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600">Copy</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <motion.div variants={itemVariants} className="space-y-6">

                        {/* Tech Stack Card */}
                        <div className="bg-[#161b22]/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="font-semibold text-gray-200 mb-4 flex items-center gap-2">
                                <FaCog className="text-cyan-400 animate-[spin_10s_linear_infinite]" />
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {repo.techStack.map(tech => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 bg-cyan-900/20 text-cyan-300 border border-cyan-500/20 rounded-md text-xs font-medium hover:bg-cyan-900/30 hover:border-cyan-500/40 transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages Card */}
                        <div className="bg-[#161b22]/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="font-semibold text-gray-200 mb-4">Languages</h3>
                            <div className="w-full h-2.5 bg-gray-800 rounded-full mb-4 flex overflow-hidden">
                                {repo.languages.map((lang, index) => {
                                    const width = index === 0 ?
                                        (repo.languages.length === 1 ? '100%' : '70%') :
                                        `${Math.floor(30 / (repo.languages.length - 1))}%`;

                                    return <div key={lang} style={{ width }} className={`h-full ${getLangColor(lang)}`} />;
                                })}
                            </div>

                            <div className="space-y-2">
                                {repo.languages.map((lang, index) => {
                                    // Simulated percentage 
                                    const percentage = index === 0 ?
                                        (repo.languages.length === 1 ? "100.0" : "70.0") :
                                        (30 / (repo.languages.length - 1)).toFixed(1);

                                    return (
                                        <div key={lang} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <span className={`w-3 h-3 rounded-full ${getLangColor(lang)} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                                                <span className="font-medium">{lang}</span>
                                            </div>
                                            <span className="text-gray-500 text-xs">{percentage}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stats / Metadata */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#161b22]/30 border border-gray-700/30 rounded-lg p-4 text-center hover:border-cyan-500/30 transition-colors">
                                <div className="text-2xl font-bold text-gray-200">{repo.stars}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Stars</div>
                            </div>
                            <div className="bg-[#161b22]/30 border border-gray-700/30 rounded-lg p-4 text-center hover:border-cyan-500/30 transition-colors">
                                <div className="text-2xl font-bold text-gray-200">{repo.forks}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Forks</div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
