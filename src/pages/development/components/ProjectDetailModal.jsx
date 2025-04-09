// src/components/ProjectDetailModal.jsx
import React from 'react';
import {
    FaTimes,
    FaGithub,
    FaExternalLinkAlt,
    FaCalendarAlt,
    FaTag,
    FaListUl,
    FaExclamationCircle,
    FaPython, FaHtml5, FaCss3Alt, FaDocker
} from 'react-icons/fa';

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
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-medium border bg-gray-700/40 border-gray-600/60 text-gray-300 shadow-sm whitespace-nowrap">
            {icon}
            <span>{skill}</span>
        </span>
    );
};
// You might need to import SiMongodb, SiExpress etc. here if redefining getSkillIcon
import {
    SiMongodb,
    SiExpress,
    SiRedux,
    SiFlask,
    SiFlutter,
    SiDart, SiTailwindcss, SiJsonwebtokens, SiDjango, /* ... other Si icons needed ... */
} from 'react-icons/si';
import { FaReact, FaNodeJs, /* ... other Fa icons needed ... */ FaCodeBranch } from 'react-icons/fa';


const ProjectDetailModal = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    // Prevent background clicks when clicking inside the modal content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    // Add placeholder details if not present in projectData
    const features = project.features || ["Feature 1 description.", "Feature 2 demonstrating capability.", "Feature 3 highlighting aspect."];
    const challenges = project.challenges || ["Overcame challenge A by implementing X.", "Solved challenge B using technique Y."];
    const duration = project.duration || "N/A"; // Get duration from data if available

    return (
        // Overlay
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={onClose} // Close when overlay is clicked
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
        >
            {/* Modal Container */}
            <div
                className={`relative bg-gray-900 border border-gray-700/70 rounded-lg shadow-xl max-w-7xl w-full max-h-[80vh] flex flex-col overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={handleContentClick} // Prevent closing when clicking inside modal
            >
                {/* Modal Header (Linux Style) */}
                <div className="flex items-center justify-between px-4 h-10 border-b border-gray-700/60 bg-gray-800/70 shrink-0">
                    <span id="project-modal-title" className="flex-1 text-sm font-mono text-gray-100 truncate pr-4">{project.title}</span>
                    <button
                        className="p-1.5 rounded-full text-gray-400 hover:bg-red-600/70 hover:text-white focus:outline-none focus:bg-red-700/80 transition-colors"
                        onClick={onClose}
                        aria-label="Close project details"
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-5 md:p-6 lg:p-7 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 flex-grow">
                    {/* Project Image (Larger) */}
                    <div className="mb-6">
                        <img
                            src={project.imageUrl || '/images/placeholder.png'}
                            alt={`${project.title} detail view`}
                            className="w-full h-auto min-h-72 object-contain rounded border border-gray-700/50 bg-gray-800/30"
                            // onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
                            // loading="lazy"
                        />
                    </div>

                    {/* Full Description */}
                    <div className="mb-6">
                        <h3 className="font-mono text-lg text-cyan-300 mb-2">// Description</h3>
                        {/* Using project.longDescription if available, else fallback */}
                        <p className="text-sm text-gray-300 leading-relaxed font-sans">
                            {project.longDescription || project.detailedDescription + " (Placeholder: Add more detailed description in projectData)"}
                        </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                        <h3 className="font-mono text-lg text-cyan-300 mb-2 flex items-center gap-2"><FaListUl /> // Key Features</h3>
                        <ul className="list-none space-y-1.5 pl-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-300 font-sans before:content-['>'] before:mr-2 before:text-cyan-500 before:font-mono before:mt-0.5">
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Challenges (Optional) */}
                    {challenges && challenges.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-mono text-lg text-cyan-300 mb-2 flex items-center gap-2"><FaExclamationCircle /> // Challenges & Solutions</h3>
                            <ul className="list-none space-y-1.5 pl-4">
                                {challenges.map((challenge, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-400 font-sans before:content-['-'] before:mr-2 before:text-purple-400 before:font-mono before:mt-0.5">
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies Used */}
                    <div className="mb-6">
                        <h3 className="font-mono text-lg text-cyan-300 mb-3 flex items-center gap-2"><FaTag /> // Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag) => (
                                <SkillTag key={tag} skill={tag} />
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    {duration !== "N/A" && (
                        <div className="mb-4">
                            <h3 className="font-mono text-lg text-cyan-300 mb-2 flex items-center gap-2"><FaCalendarAlt /> // Timeline</h3>
                            <p className="text-sm text-gray-400 font-mono pl-4">{duration}</p>
                        </div>
                    )}

                </div>

                {/* Modal DevFooter (Links) */}
                <div className="p-4 border-t border-gray-700/60 bg-gray-800/50 shrink-0 flex justify-end gap-3">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-gray-300 border border-gray-600/80 px-3 py-1.5 rounded text-xs font-mono bg-gray-700/60 hover:text-cyan-300 hover:border-cyan-600/70 hover:bg-gray-700/80 active:bg-gray-600/70 active:scale-[0.98] transition-all duration-150 ease-in-out shadow-sm hover:shadow-md group/link"
                            aria-label={`View source code for ${project.title} on GitHub`}
                        >
                            <FaGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                            <span>View Source</span>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-cyan-200 border border-cyan-600/80 px-3 py-1.5 rounded text-xs font-mono bg-cyan-700/70 hover:text-white hover:border-cyan-500 hover:bg-cyan-600/80 active:bg-cyan-800/80 active:scale-[0.98] transition-all duration-150 ease-in-out shadow-md hover:shadow-lg group/link"
                            aria-label={`View live demo for ${project.title}`}
                        >
                            <FaExternalLinkAlt className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;