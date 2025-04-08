import React, {useEffect,useState} from 'react'; // Removed memo if Projects might filter later, add back if static
import {
    FaGithub,
    FaExternalLinkAlt,
    FaReact,
    FaNodeJs,
    FaPython,
    FaDocker,
    FaDatabase,
    FaHtml5,
    FaCss3Alt,
    FaCodeBranch,
    FaTimes
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiFlask, SiFlutter, SiDart, SiDjango, SiTailwindcss, SiRedux, SiJsonwebtokens } from 'react-icons/si';
import {FaRegSquare, FaWindowMinimize} from "react-icons/fa6"; // More specific icons
import {devProjectData} from "../../utils/constants.js";
import ProjectDetailModal from "./components/ProjectDetailModal";

// --- Reusable Skill Tag Component (or function) ---
// Using a function here for consistency with previous examples
const getSkillIcon = (skillName) => {
    const lowerSkill = skillName.toLowerCase();
    // Prioritize specific icons
    if (lowerSkill.includes('mongo')) return <SiMongodb className="w-3 h-3 text-emerald-400" />;
    if (lowerSkill.includes('express')) return <SiExpress className="w-3 h-3 text-gray-400" />;
    if (lowerSkill.includes('react')) return <FaReact className="w-3 h-3 text-cyan-400" />;
    if (lowerSkill.includes('redux')) return <SiRedux className="w-3 h-3 text-purple-400" />;
    if (lowerSkill.includes('node')) return <FaNodeJs className="w-3 h-3 text-green-400" />;
    if (lowerSkill.includes('python')) return <FaPython className="w-3 h-3 text-blue-400" />;
    if (lowerSkill.includes('flask')) return <SiFlask className="w-3 h-3 text-gray-400" />;
    if (lowerSkill.includes('django')) return <SiDjango className="w-3 h-3 text-green-400"/>; // Example using SVG if no icon found
    if (lowerSkill.includes('flutter')) return <SiFlutter className="w-3 h-3 text-sky-400" />;
    if (lowerSkill.includes('dart')) return <SiDart className="w-3 h-3 text-sky-500" />;
    if (lowerSkill.includes('tailwind')) return <SiTailwindcss className="w-3 h-3 text-teal-400" />;
    if (lowerSkill.includes('html')) return <FaHtml5 className="w-3 h-3 text-orange-500" />;
    if (lowerSkill.includes('css')) return <FaCss3Alt className="w-3 h-3 text-blue-500" />;
    if (lowerSkill.includes('docker')) return <FaDocker className="w-3 h-3 text-blue-500" />;
    if (lowerSkill.includes('aws')) return <FaAws className="w-3 h-3 text-orange-400" />;
    if (lowerSkill.includes('git')) return <FaGitAlt className="w-3 h-3 text-red-400" />;
    if (lowerSkill.includes('jwt')) return <SiJsonwebtokens className="w-3 h-3 text-pink-400" />;
    if (lowerSkill.includes('api')) return <FaCodeBranch className="w-3 h-3 text-purple-400" />; // Generic API
    // Add more...
    return null; // Default no icon
};
const SkillTag = ({ skill }) => {
    const icon = getSkillIcon(skill);
    return (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-medium border bg-gray-700/40 border-gray-600/60 text-gray-300 shadow-sm hover:bg-gray-600/50 hover:border-gray-500 transition-colors duration-150 whitespace-nowrap">
            {icon}
            <span>{skill}</span>
        </span>
    );
};

// --- Extracted Project Card Component ---
// Keeping the IDE window style from previous refinements
const ProjectCard = ({ project, onClick }) => { // Added onClick prop
    return (
        <div
            className="cursor-pointer relative group rounded-lg border border-gray-700/50 hover:border-cyan-600/70 transition-colors duration-300 flex flex-col h-full"
            onClick={() => onClick(project)} // Call onClick on card click
        >
            {/* Animated Glow Border */}
            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-600/50 via-purple-600/50 to-green-500/50 opacity-0 group-hover:opacity-70 transition duration-500 group-hover:duration-200 blur-md animate-tilt pointer-events-none"></div>

            {/* Main Card Structure */}
            <div className="relative flex flex-col flex-grow h-full bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl shadow-black/40">

                {/* Card Header - Title Bar + Window Controls */}
                <div className="flex items-center px-3 py-3 border-b border-gray-700/60 bg-gray-800/50 shrink-0"> {/* Added shrink-0 */}
                    <div className="flex justify-between items-center w-full">
                        <span className="flex-1 text-xs font-mono text-cyan-300 truncate">{project.title}</span>
                        <div className="flex items-center space-x-1">
                            {/* Minimize Button */}
                            <button className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:bg-gray-700/70" aria-label="Minimize">
                                <FaWindowMinimize className="w-3 h-3" />
                            </button>
                            {/* Maximize Button */}
                            <button className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:bg-gray-700/70" aria-label="Maximize">
                                {/* Using FaRegSquare as a common maximize icon */}
                                <FaRegSquare className="w-3 h-3" />
                            </button>
                            {/* Close Button */}
                            <button className="p-1 rounded-full text-gray-400 hover:bg-red-600/70 hover:text-white focus:outline-none focus:bg-red-700/80" aria-label="Close">
                                <FaTimes className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Card Body Content - Allow growth */}
                <div className="flex flex-col flex-grow"> {/* Allow this section to grow */}

                    {/* Project Image */}
                    <div className="relative h-44 md:h-48 w-full overflow-hidden border-b border-gray-700/50 shrink-0"> {/* Added shrink-0 */}
                        <img
                            src={project.imageUrl || '/images/placeholder.png'}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-90"

                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent transition-opacity duration-300 group-hover:from-gray-900/50"></div>
                    </div>

                    {/* Text Content Area - Allow growth and push footer down */}
                    <div className="p-4 md:p-5 flex flex-col flex-grow"> {/* Added flex-grow here */}
                        {/* Description */}
                        <p className="font-mono text-gray-400 text-sm mb-4 flex-grow leading-relaxed"> {/* Added flex-grow here */}
                            {project.description}
                        </p>

                        {/* Technology Tags */}
                        <div className="mb-4 flex flex-wrap gap-1.5 md:gap-2">
                            {project.tags?.map((tag) => (
                                <SkillTag key={tag} skill={tag} />
                            ))}
                        </div>

                        {/* Links Area (Pushed to bottom) */}
                        <div className="mt-auto flex justify-start gap-3 pt-3 border-t border-gray-700/40 shrink-0"> {/* Added mt-auto & shrink-0 */}
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // Re-applying dev-button style with Tailwind classes
                                    className="inline-flex items-center gap-1.5 text-gray-400 border border-gray-600/80 px-2.5 py-1 rounded text-xs md:text-sm font-mono bg-gray-800/50 hover:text-cyan-300 hover:border-cyan-600/70 hover:bg-gray-700/60 active:bg-gray-600/50 active:scale-[0.98] active:shadow-inner transition-all duration-150 ease-in-out shadow-sm hover:shadow-md group/link"
                                    aria-label={`View source code for ${project.title} on GitHub`}
                                >
                                    <FaGithub className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                                    <span>Source</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // Re-applying dev-button style with Tailwind classes
                                    className="inline-flex items-center gap-1.5 text-gray-400 border border-gray-600/80 px-2.5 py-1 rounded text-xs md:text-sm font-mono bg-gray-800/50 hover:text-cyan-300 hover:border-cyan-600/70 hover:bg-gray-700/60 active:bg-gray-600/50 active:scale-[0.98] active:shadow-inner transition-all duration-150 ease-in-out shadow-sm hover:shadow-md group/link"
                                    aria-label={`View live demo for ${project.title}`}
                                >
                                    <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                                    <span>Deploy</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// Explicitly memoize ProjectCard if performance becomes an issue and props are stable
const MemoizedProjectCard = React.memo(ProjectCard);
MemoizedProjectCard.displayName = 'ProjectCard';


// --- Main Projects Page Component ---
const DevProjectsPage = () => {
    // Future: Add state for filtering/sorting if needed
    const displayedProjects = devProjectData;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    // State for modal visibility and selected project data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Function to open the modal
    const handleOpenModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll when modal is open
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = 'unset'; // Restore background scroll
    };

    // Effect to handle Escape key press for closing modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // Ensure scroll is restored if component unmounts while modal is open
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]); // Re-add listener if isModalOpen changes


    return (
        <section
            id="projects"
            className="min-h-screen py-24 md:py-32 bg-black text-gray-200 px-4 md:px-8 lg:px-16 relative overflow-hidden isolate scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
            {/* Background Layers (Consistent) */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/noise.png')] bg-repeat pointer-events-none"></div>
            <div className="absolute inset-0 animated-grid-bg opacity-5 pointer-events-none"></div>
            <div className="absolute inset-0 character-stream opacity-[0.04] pointer-events-none" aria-hidden="true"></div>
            <div className="absolute -top-10 left-1/4 w-96 h-96 bg-purple-700/15 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
            <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-cyan-700/15 rounded-full filter blur-3xl opacity-30 animation-delay-4000 animate-pulse pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none scanline-bg"></div>

            {/* Content */}
            <div className="container mx-auto relative z-10">
                {/* Terminal Style Header */}
                <div className={`container mx-auto relative border border-white/10  rounded-2xl`}>
                    <div className={`container mx-auto relative z-10 flex justify-start items-center  px-8 py-3  rounded-t-2xl border-b border-white/10 bg-slate-900`}>
                        <p className="font-mono text-sm lg:text-lg text-white mb-1">
                            <span className="">budrahh@portfolio</span>:~ /DevProjects</p>
                    </div>
                    <div className={`p-8`}>
                        <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-700/20 via-purple-700/20 to-gray-800/10 blur-lg opacity-50 pointer-events-none"></div>

                        <div className="container mx-auto relative z-10 rounded-b-2xl">
                            {/* Enhanced Heading */}
                            <div className="text-left mb-6 md:mb-10">
                                <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                                    <span className="text-cyan-400">budrahh@portfolio</span>:~/DevProjects$<span className="text-white"> <code  className={`text-white`}>$ ls -la --sort=time <span className="text-gray-500"># List projects, newest first</span></code></span></p>

                                <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-gray-100 flex items-center justify-start gap-2">
                                    <span className="text-cyan-400">// Executing:</span> -----
                                </p>
                                <p className="font-mono text-xs text-gray-500 mt-2">Found {displayedProjects.length} items.</p>
                            </div>
                        </div>
                        <div className="container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {/* Map over data and render the MemoizedProjectCard */}
                            {displayedProjects.map((project) => (
                                <MemoizedProjectCard
                                    key={project.id} // Key is crucial here
                                    project={project}
                                    onClick={handleOpenModal} // Pass the function to open the modal
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
            {/* Modal - Rendered conditionally */}
            {selectedProject && (
                <ProjectDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    project={selectedProject}
                />
            )}
        </section>
    );
};

export default DevProjectsPage;