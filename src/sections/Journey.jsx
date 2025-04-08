import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    FaFolder, FaFileAlt, FaBriefcase, FaBook, FaMapMarkerAlt,
    FaCalendarAlt, FaLink, FaChevronDown, FaCodeBranch, FaCode,
    FaGithubAlt, // Using GitHub icon for placeholder
    FaRegFileCode, // More specific icon
    FaInfoCircle // For placeholder
} from 'react-icons/fa';
import Typed from "typed.js";

// --- GitHub Theme Colors (Refined) ---
const ghBgDarker = 'bg-[#010409]'; // Slightly darker main bg
const ghBg = 'bg-[#0d1117]/50';      // Card/component bg
const ghBgMedium = 'bg-[#161b22]'; // Hover/lighter elements bg
const ghBorder = 'border-[#30363d]';
const ghBorderLight = 'border-[#21262d]'; // Lighter border for subtle divisions
const ghText = 'text-[#e6edf3]';         // Primary text
const ghTextMedium = 'text-[#c9d1d9]';    // Slightly less prominent text
const ghTextSecondary = 'text-[#8b949e]'; // Secondary/muted text
const ghLink = 'text-[#58a6ff]';         // Links
const ghHoverBg = 'hover:bg-[#161b22]';  // Subtle hover
const ghActiveBg = 'bg-[#1f6feb]/15';   // Active item background
const ghActiveBorder = 'border-l-2 border-[#1f6feb]'; // Active item left border
const ghButtonBg = 'bg-[#21262d]';
const ghButtonHoverBg = 'hover:bg-[#30363d]';
const ghButtonBorder = 'border-[#30363d]';
const ghGreenButtonBg = 'bg-[#238636]';
const ghGreenButtonHoverBg = 'hover:bg-[#2ea043]';

// Static theme config
const accentColorClass = 'text-[#58a6ff]'; // Keep consistent accent
const themeGradient = 'from-[#58a6ff] to-[#a779ff]'; // Can use this for highlights


// --- Data (Keep as is) ---
const experienceData = [
    {
        id: "exp-zoho-1", type: "experience", fileName: "zoho-corporation.md",
        icon: <FaBriefcase className="text-blue-300" />, role: "Software Development Trainee",
        company: "Zoho Corporation", companyUrl: "https://www.zoho.com/",
        location: "Chennai", duration: "April 2025 - Present",
        description: [
            "Developing & maintaining web applications using Java, JavaScript, and related frameworks.",
            "Collaborating within an agile team on feature implementation, code reviews, and bug resolution.",
            "Actively participating in training sessions focused on enterprise software development.",
        ],
        commitMsg: "Update current role details", commitTime: "Present"
    },
    {
        id: "exp-systitsoft-1", type: "experience",
        icon: <FaBriefcase className="text-purple-300" />,
        fileName: "systitsoft-solutions.md",
        role: "Web Developer",
        company: "SystItSoft Solutions",
        // companyUrl: "https://www.zoho.com/",
        location: "Coimbatore", duration: "December 2024 - April 2025",
        description: [
            "Developed and maintained the company website using React.js, ensuring a responsive and dynamic user experience.",
            "Designed and integrated backend services with Node.js and Express.js, enabling seamless API communication.",
            "Optimized website performance and security, reducing load time by 25% through efficient state management and backend enhancements.",
        ],
        commitMsg: "Add SystItSoft Solutions internship details",commitTime: "12/2024"
    },
    {
        id: "exp-crionversity-1",
        type: "experience",
        fileName: "crion-versity.md",
        icon: <FaBriefcase className="text-purple-300" />,
        role: "Backend Developer Intern",
        company: "Crion Versity",
        location: "Remote",
        duration: "August 2023 - December 2023",
        description: [
            "Designed scalable backend services using Django and PostgreSQL, optimizing data handling and storage efficiency.",
            "Collaborated with front-end developers to integrate user-facing elements with server-side logic, improving user experience and system performance.",
        ],
        commitMsg: "Add Crion Versity internship details",
        commitTime: "08/2023"
    },
];

const educationData = [
    {
        id: "edu-btech-1", type: "education", fileName: "btech-aids-rathinam.md",
        icon: <FaBook className="text-purple-300" />, degree: "B.Tech, AI & Data Science",
        institution: "Rathinam Technical Campus", institutionUrl: null,
        location: "Coimbatore", duration: "2021 - 2025", gpa: "7.93 CGPA",
        description: [
            "Core CS, AI algorithms, ML/DL, Data Analysis, Big Data.",
            "Projects: NLP, Computer Vision, Predictive Modeling.",
            "Coursework: Data Structures, Algorithms, DB Management, Neural Networks.",
        ],
        commitMsg: "Add B.Tech details", commitTime: "04/2025"
    },
    {
        id: "edu-hsc-1", type: "education", fileName: "hsc-vikas.md",
        icon: <FaBook className="text-purple-300" />, degree: "High Secondary Certification (HSC)",
        institution: "Vikas Vidyalaya Mat. Hr. Sec. School", institutionUrl: null,
        location: "Tiruppur", duration: "2020 - 2021", gpa: "94.2 Percentage",
        description: ["Focused on Computer Science stream with high academic standing."],
        commitMsg: "Add HSC details", commitTime: "05/2021"
    },
    {
        id: "edu-sslc-1", type: "education", fileName: "sslc-vikas.md",
        icon: <FaBook className="text-purple-300" />, degree: "Secondary School Leaving Certification (SSLC)",
        institution: "Vikas Vidyalaya Mat. Hr. Sec. School", institutionUrl: null,
        location: "Tiruppur", duration: "2018 - 2019", gpa: "94.5 Percentage",
        description: [],
        commitMsg: "Add SSLC details", commitTime: "03/2019"
    },
];

const readmeData = {
    id: "readme", type: "readme", fileName: "README.md",
    icon: <FaRegFileCode className="text-gray-400" />, // More specific icon
    commitMsg: "Initial commit", commitTime: "02/2024",
    content: `# My Journey\n\nWelcome! This repository outlines my professional experience and educational background.\n\nNavigate through the **Experience** and **Education** directories using the sidebar or the path bar above.\n\nSelect individual files (ending in ".md") to view detailed information.`,
};

const rootDirectoryItems = [
    { id: 'dir-exp', type: 'directory', icon: <FaFolder className="text-yellow-500" />, name: 'Experience', commitMsg: 'Update work history', commitTime: "04/2025" },
    { id: 'dir-edu', type: 'directory', icon: <FaFolder className="text-yellow-500" />, name: 'Education', commitMsg: 'Update academic info', commitTime: "04/2025" },
    readmeData
];

const goUpDirectory = { id: 'go-up', type: 'goUp', icon: <FaFolder className="text-gray-500 opacity-70" />, name: '..', commitMsg: '', commitTime: '' };

const allContentItems = [readmeData, ...experienceData, ...educationData];

// --- Sidebar Header ---
const FileExplorerHeader = () => (
    <div className={`px-3 py-2 text-xs ${ghTextSecondary} border-b ${ghBorderLight} flex justify-between items-center sticky top-0 ${ghBg} z-10`}>
        <span>Files</span>
        {/* Optionally add more controls here later */}
    </div>
);

// --- Sidebar Component (Enhanced) ---
const FileExplorerAside = ({ items, selectedItemId, onSelectItem }) => {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.2 } } // Faster stagger
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } }
    };

    return (
        <motion.aside
            className={`w-full md:w-64 lg:w-72 xl:w-80 flex-shrink-0 ${ghBg} ${ghBorder} border-r h-full flex flex-col overflow-hidden hidden md:block`} // Use flex-col
            // No need for listVariants here, apply to the list itself
        >
            <FileExplorerHeader />
            <nav aria-label="File explorer" className="flex-1 overflow-y-auto"> {/* Make nav scrollable */}
                <motion.ul
                    className="pt-1 pb-2 text-xs" // Reduced padding top
                    variants={listVariants} initial="hidden" animate="visible"
                >
                    {items.map((item) => {
                        const isActive = item.id === selectedItemId;
                        const isDirectory = item.type === 'directory';
                        const isGoUp = item.type === 'goUp';
                        const displayName = isDirectory || isGoUp ? item.name : item.fileName;

                        return (
                            <motion.li key={item.id} variants={itemVariants} className="px-1.5">
                                <button
                                    onClick={() => onSelectItem(item)}
                                    className={`w-full flex flex-row justify-between items-center gap-2 px-2 py-1.5 rounded-md my-[1px] transition-colors duration-100 whitespace-nowrap group
                                                ${isActive
                                        ? `${ghActiveBg} ${ghActiveBorder} -ml-px pl-[calc(0.5rem-1px)]` // Active state
                                        : `${ghTextSecondary} hover:bg-[#b1bac4]/5` // Subtle hover for inactive
                                    }
                                                ${isDirectory ? `${ghLink} font-medium` : ''}
                                                ${isGoUp ? `italic text-gray-500 hover:text-gray-300` : ''}
                                    `}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <div className="flex flex-row items-center gap-3"> {/* Slightly more gap */}
                                        {/* Icon */}
                                        <span className={`w-4 flex-shrink-0 text-center transition-colors ${isActive ? accentColorClass : 'text-gray-500 group-hover:text-gray-400'}`}> {/* Icon color change */}
                                            {item.icon || <FaFileAlt />}
                                        </span>
                                        {/* Name */}
                                        <span className={`truncate transition-colors ${isActive ? `font-medium ${ghText}` : ''} ${isDirectory ? '' : ghTextMedium} group-hover:${ghText}`}>{displayName}</span>
                                    </div>
                                    {/* Commit Time */}
                                    <span className={`text-right ${ghTextSecondary} text-[11px] ${isActive ? 'text-gray-400' : ''} hidden lg:inline`}>{item.commitTime}</span>
                                </button>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </nav>
        </motion.aside>
    );
};

// --- Path Bar Component (Minor tweaks) ---
const PathBar = ({ path, onPathClick }) => {
    return (
        <div className={`px-3 py-2 text-sm ${ghTextSecondary} border-b ${ghBorderLight} flex items-center gap-1 flex-wrap ${ghBg} flex-shrink-0 h-[2.75rem]`}>
            <FaGithubAlt className={`mr-1.5 ${ghTextMedium}`} /> {/* Added Icon */}
            {path.map((part, index) => (
                <span key={part.id} className="flex items-center gap-1">
                    {index > 0 && <span className="opacity-60 -mx-0.5">/</span>}
                    {/* Root element */}
                    {index === 0 ? (
                        <button
                            onClick={() => onPathClick(part)}
                            className={`font-semibold ${ghLink} hover:underline`}
                            aria-label={`Go to ${part.name}`}
                        >
                            {part.name}
                        </button>
                        // Clickable directories in the path
                    ) : index < path.length - 1 && (part.type === 'directory') ? (
                        <button
                            onClick={() => onPathClick(part)}
                            className={`${ghLink} hover:underline`}
                            aria-label={`Go to ${part.name}`}
                        >
                            {part.name}
                        </button>
                    ) : ( // Last item (current dir or file) is not clickable
                        <span className={`font-medium ${ghText}`}>{part.name}</span>
                    )}
                </span>
            ))}
        </div>
    );
};


// --- Content Viewer Component (Enhanced) ---
const ContentViewer = ({ itemData, accentColorClass, themeGradient, currentDirectoryId }) => {
    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, y: -5, transition: { duration: 0.15, ease: 'easeIn' } }
    };

    return (
        <div className={`flex-1 overflow-y-auto ${ghBg} relative h-full`}> {/* Use standard bg */}
            <AnimatePresence mode="wait">
                {itemData ? (
                    <motion.div
                        key={itemData.id}
                        variants={contentVariants}
                        initial="hidden" animate="visible" exit="exit"
                        className={`border-b ${ghBorderLight} m-0 shadow-sm ${ghBg}`} // Border bottom only, no margin needed if parent handles padding
                    >
                        {/* File Header */}
                        <div className={`px-4 py-2 border-b ${ghBorderLight} ${ghTextSecondary} flex justify-between items-center sticky top-0 ${ghBg} z-10`}>
                            <div className="flex items-center gap-2">
                                {itemData.icon && <span className="text-base">{itemData.icon}</span>}
                                <span className={`font-medium ${ghText}`}>{itemData.fileName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Add more actions if needed */}
                                <button className={`px-2 py-0.5 text-xs ${ghTextSecondary} border ${ghButtonBorder} ${ghButtonBg} ${ghButtonHoverBg} rounded hover:border-gray-500 transition-colors`}>Raw</button>
                            </div>
                        </div>

                        {/* Specific Content Rendering */}
                        <div className={`p-5 md:p-8 font-sans text-sm md:text-base leading-relaxed ${ghTextMedium}`}> {/* Increased padding */}
                            {itemData.type === 'readme' ? (
                                <article className="prose prose-sm md:prose-base prose-invert max-w-none prose-headings:font-semibold prose-headings:pb-1 prose-headings:border-b prose-headings:border-gray-700/50 prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0 prose-a:text-blue-400 hover:prose-a:underline prose-ul:list-disc prose-ul:pl-5 prose-li:my-1">
                                    {/* Basic Markdown Simulation - Improved */}
                                    <h1 className="!text-2xl !mb-4 !pb-2">{itemData.content.match(/^# (.*)/)?.[1]}</h1>
                                    {itemData.content.split('\n\n').slice(1).map((paragraph, i) => {
                                        if (paragraph.startsWith('* ')) {
                                            return (
                                                <ul key={i} className="!my-4 !pl-6">
                                                    {paragraph.split('\n').map((line, j) => (
                                                        <li key={`${i}-${j}`} className="!my-1.5">{line.substring(2)}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        // Simple bold simulation
                                        const boldedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-100">$1</strong>');
                                        return <p key={i} className="!my-4" dangerouslySetInnerHTML={{ __html: boldedText }} />;
                                    })}
                                </article>
                            ) : ( // Experience/Education Content
                                <div>
                                    <h1 className={`text-xl md:text-2xl font-semibold mb-4 pb-3 border-b ${ghBorderLight} ${ghText} flex items-center gap-3`}> {/* Lighter border, Primary text */}
                                        <span className={accentColorClass}>{itemData.icon}</span>
                                        {itemData.role || itemData.degree}
                                    </h1>
                                    <div className={`flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-2 mb-6 text-sm ${ghTextSecondary}`}> {/* Flex col on small */}
                                        <div className="flex items-center gap-2 font-medium">
                                            <span className={`${ghTextMedium}`}>
                                                {itemData.type === 'experience' ? 'At:' : 'Institution:'}
                                            </span>
                                            {itemData.companyUrl || itemData.institutionUrl ? (
                                                <a href={itemData.companyUrl || itemData.institutionUrl} target="_blank" rel="noopener noreferrer" className={` ${ghLink} hover:underline`}>{itemData.company || itemData.institution}</a>
                                            ) : <span className={` ${ghTextMedium}`}>{itemData.company || itemData.institution}</span>}
                                        </div>
                                        <span className="text-gray-600 hidden sm:inline">·</span>
                                        <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-xs" /> {itemData.duration}</span>
                                        {itemData.location && <span className="text-gray-600 hidden sm:inline">·</span>}
                                        {itemData.location && <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-xs" /> {itemData.location}</span>}
                                        {itemData.gpa && <span className="text-gray-600 hidden sm:inline">·</span>}
                                        {itemData.gpa && <span className="flex items-center gap-1.5"><span className="font-mono text-xs">GPA:</span> {itemData.gpa}</span>}
                                    </div>
                                    {itemData.description && itemData.description.length > 0 && (
                                        <div className="prose prose-sm md:prose-base prose-invert max-w-none mt-6 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-li:before:content-none">
                                            <ul className="space-y-2.5">
                                                {itemData.description.map((desc, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        {/* More subtle bullet */}
                                                        <span className={`mt-[9px] flex-shrink-0 w-1.5 h-1.5 rounded-full ${accentColorClass} opacity-80`}></span>
                                                        <span className={`${ghTextMedium}`}>{desc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div // Enhanced Placeholder
                        key="placeholder"
                        variants={contentVariants} // Use same variants
                        initial="hidden" animate="visible" exit="exit"
                        className={`flex flex-col items-center justify-center h-full ${ghTextSecondary} italic p-10 text-center text-base`}
                    >
                        <FaInfoCircle className="text-3xl mb-4 text-gray-600" />
                        <span>
                            {currentDirectoryId === 'root' && readmeData
                                ? "Select a file or folder from the explorer."
                                : "Select a file to view its details."
                            }
                         </span>
                        <span className="text-xs mt-2 text-gray-600">Explore Experience or Education folders.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Main Exported Component (Enhanced Structure/Styling) ---
export default function GithubRepoSection({ choice }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 }); // Adjusted amount
    const [selectedItemId, setSelectedItemId] = useState(readmeData?.id || null);
    const [currentDirectoryId, setCurrentDirectoryId] = useState('root');

    const currentItemData = allContentItems.find(item => item.id === selectedItemId);

    let sidebarItems = [];
    if (currentDirectoryId === 'root') {
        sidebarItems = rootDirectoryItems;
    } else if (currentDirectoryId === 'dir-exp') {
        sidebarItems = [goUpDirectory, ...experienceData];
    } else if (currentDirectoryId === 'dir-edu') {
        sidebarItems = [goUpDirectory, ...educationData];
    }

    const handleSelectItem = (item) => {
        if (item.type === 'directory') {
            setCurrentDirectoryId(item.id);
            setSelectedItemId(null);
        } else if (item.type === 'goUp') {
            setCurrentDirectoryId('root');
            setSelectedItemId(readmeData?.id || null); // Select README when going up to root
        } else {
            setSelectedItemId(item.id);
        }
    };

    const handlePathClick = (pathItem) => {
        if (pathItem.id === 'root') {
            setCurrentDirectoryId('root');
            setSelectedItemId(readmeData?.id || null); // Select README on root click
        } else if (pathItem.type === 'directory') { // Only handle directory clicks here
            setCurrentDirectoryId(pathItem.id);
            setSelectedItemId(null); // Clear file selection when clicking dir in path
        }
        // Clicking file in path bar does nothing here
    };


    // Build the current path for the PathBar component
    let currentPath = [{ id: 'root', name: 'MyJourney', type: 'root' }];
    const experienceDir = rootDirectoryItems.find(d => d.id === 'dir-exp');
    const educationDir = rootDirectoryItems.find(d => d.id === 'dir-edu');

    let currentDirObject = null; // To get the commit message for the directory itself

    if (currentDirectoryId === 'dir-exp' && experienceDir) {
        currentPath.push(experienceDir);
        currentDirObject = experienceDir;
    } else if (currentDirectoryId === 'dir-edu' && educationDir) {
        currentPath.push(educationDir);
        currentDirObject = educationDir;
    }

    // Determine which item's commit info to show (file > directory > root default)
    const displayItemForCommit = currentItemData || currentDirObject || readmeData;


    if (currentItemData) {
        const fileBelongsToCurrentDir =
            (currentDirectoryId === 'root' && currentItemData.type === 'readme') ||
            (currentDirectoryId === 'dir-exp' && currentItemData.type === 'experience') ||
            (currentDirectoryId === 'dir-edu' && currentItemData.type === 'education');

        if (fileBelongsToCurrentDir) {
            currentPath.push({ id: currentItemData.id, name: currentItemData.fileName, type: currentItemData.type });
        } else {
            // If a file is selected but doesn't belong to the *current directory view*,
            // don't add it to the path. This happens if you navigate back up via path bar
            // while a file view is still technically selected. We should probably clear
            // selection or select README in handlePathClick for better consistency.
            // (Updated handlePathClick and handleSelectItem to handle this better)
        }
    }



    return (
        <motion.section
            ref={containerRef}
            id="journey-repo"
            className={`relative w-full ${ghText} px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-20 md:pt-24 font-mono overflow-hidden isolate  `} // Use darkest bg for section
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.4 }}
        >


            {/* Main Content Wrapper */}
            <div className="p-20"> {/* Align items start */}


                {/* Repo Card Container */}
                <motion.div
                    initial={{opacity: 0, y:100, scale:0.5}} // Slightly different animation
                    animate={isInView ? {opacity: 1,y:0, scale:1} : "hidden"}
                    transition={{delay: 0.5, duration: 0.6, ease: 'easeOut'}} // Adjusted timing
                    className={`relative z-10 w-full ${ghBg} border ${ghBorder} rounded-lg shadow-sm ${choice === "development" ? "hover:shadow-cyan-400" : "hover:shadow-yellow-400"} overflow-hidden`} // Main repo card styling
                >
                    {/* Top Bar: Repo Name + Public Badge */}
                    <div className={`px-4 py-3 flex items-center gap-3 text-sm border-b ${ghBorderLight}`}>
                        {/*<FaCode className={`${accentColorClass} text-lg`} /> /!* Slightly larger icon *!/*/}
                        <a href="#" className={`font-semibold ${ghLink} hover:underline text-lg`}>BudraHH</a>
                        <span className={`ml-auto px-2.5 py-0.5 text-xs ${ghBorder} border rounded-full ${ghTextSecondary} font-medium`}>Public</span> {/* Moved to right */}
                    </div>

                    {/* Tabs Row - Simplified for this context */}
                    {/* We can hide tabs or keep them simple as the core is the file explorer */}
                    {/*/!**/}
                   <div className={`flex items-center border-b ${ghBorder} px-2 md:px-4`}>
                       <button className={`px-3 py-2 text-sm font-medium ${ghText} border-b-2 border-orange-500 -mb-px flex items-center gap-1.5`}>
                           <FaCode className="text-base" /> Code
                       </button>
                        {/*<-- Other tabs can be added if needed -->*/}
                   </div>
                   {/**!/*/}

                    {/* Path Bar */}
                    <PathBar path={currentPath} onPathClick={handlePathClick} />


                    {/* The "Repository" Inner Structure */}
                    <div
                        className={`min-h-[60vh] max-h-[70vh] flex flex-col md:flex-row border-t ${ghBorderLight}`} // Use border-t, flex row on md+
                    >
                        {/* Sidebar */}
                        <FileExplorerAside
                            items={sidebarItems}
                            selectedItemId={selectedItemId}
                            onSelectItem={handleSelectItem}
                        />

                        {/* Right Side: Commit Info + Content */}
                        <div className={`flex flex-col flex-1 overflow-hidden ${ghBg}`}> {/* Use standard bg, ensure flex col */}

                            {/* --- Commit Info Bar (Mock) --- */}
                            <div className={`px-3 py-2 text-sm ${ghTextSecondary} border-b ${ghBorderLight} flex items-center gap-2 flex-wrap flex-shrink-0 ${ghBgMedium}`}> {/* Lighter bg */}
                                <img src="https://github.com/BudraHH.png" alt="Author" className="w-5 h-5 rounded-full border border-gray-600"/> {/* Border on avatar */}
                                <span className="font-medium text-white mr-1">BudraHH</span>
                                <span className={`hidden sm:inline truncate ${ghTextMedium}`}> {/* Medium text */}
                                    {displayItemForCommit?.commitMsg || 'Initial commit'}
                                </span>
                                {/* Optional: Link to commit history? */}
                                <span className="ml-auto text-xs font-mono">{displayItemForCommit?.commitTime || ''}</span>
                            </div>

                            {/* Content Viewer */}
                            <ContentViewer
                                itemData={currentItemData}
                                accentColorClass={accentColorClass}
                                themeGradient={themeGradient}
                                currentDirectoryId={currentDirectoryId}
                            />
                        </div>
                    </div>
                    {/* Optional Footer */}
                     <div className={`p-2 border-t ${ghBorderLight} text-xs ${ghTextSecondary} text-center`}></div>
                </motion.div>
            </div>
        </motion.section>
    );
}