import {useState, useRef, useEffect} from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
    FaFolder, FaFileAlt, FaBriefcase, FaGraduationCap, FaMapMarkerAlt,
    FaCalendarAlt, FaLink, FaChevronDown, FaPlus, FaCodeBranch, FaCode, FaBook
} from 'react-icons/fa';
import Typed from "typed.js";

// --- GitHub Theme Colors (Approximations) ---
const ghBgDarker = 'bg-[#0d1117]';
const ghBg = 'bg-[#161b22]';
const ghBorder = 'border-[#30363d]';
const ghBorderLight = 'border-[#21262d]';
const ghText = 'text-[#e6edf3]';
const ghTextSecondary = 'text-[#7d8590]';
const ghLink = 'text-[#58a6ff]';
const ghHoverBg = 'hover:bg-[#b1bac4]/10';
const ghActiveBg = 'bg-[#1f6feb]/15';
const ghActiveBorder = 'border-l-2 border-[#1f6feb]';
const ghButtonBg = 'bg-[#21262d]';
const ghButtonHoverBg = 'hover:bg-[#30363d]';
const ghButtonBorder = 'border-[#30363d]';
const ghGreenButtonBg = 'bg-[#238636]';
const ghGreenButtonHoverBg = 'hover:bg-[#2ea043]';

// Static theme config
const accentColorClass = 'text-[#58a6ff]';
const themeGradient = 'from-[#58a6ff] to-[#a779ff]';


// --- Data ---
const experienceData = [
    {
        id: "exp-zoho-1", type: "experience", fileName: "zoho-corporation.md",
        icon: <FaBriefcase className="text-blue-300" />, role: "Software Development Trainee",
        company: "Zoho Corporation", companyUrl: "https://www.zoho.com/",
        location: "Chennai (Remote)", duration: "Oct 2023 - Present",
        description: [ /* Descriptions */
            "Developing & maintaining web applications using Java, JavaScript, and related frameworks.",
            "Collaborating within an agile team on feature implementation, code reviews, and bug resolution.",
            "Actively participating in training sessions focused on enterprise software development.",
        ],
        commitMsg: "Update current role details", commitTime: "Present"
    },
];

const educationData = [
    {
        id: "edu-btech-1", type: "education", fileName: "btech-aids-rathinam.md",
        icon: <FaBook className="text-purple-300" />, degree: "B.Tech, AI & Data Science",
        institution: "Rathinam Technical Campus", institutionUrl: null,
        location: "Coimbatore", duration: "2021 - 2025", gpa: "7.93 CGPA",
        description: [ /* Descriptions */
            "Core CS, AI algorithms, ML/DL, Data Analysis, Big Data.",
            "Projects: NLP, Computer Vision, Predictive Modeling.",
            "Coursework: Data Structures, Algorithms, DB Management, Neural Networks.",
        ],
        commitMsg: "Add B.Tech details", commitTime: "04 / 2025"
    },
    {
        id: "edu-hsc-1", type: "education", fileName: "hsc-vikas.md",
        icon: <FaBook className="text-purple-300" />, degree: "High Secondary Certification (HSC)",
        institution: "Vikas Vidyalaya Mat. Hr. Sec. School", institutionUrl: null,
        location: "Tiruppur", duration: "2020 - 2021", gpa: "94.2 Percentage",
        description: ["Focused on Computer Science stream with high academic standing."],
        commitMsg: "Add HSC details", commitTime: "05 / 2021"
    },
    {
        id: "edu-sslc-1", type: "education", fileName: "sslc-vikas.md",
        icon: <FaBook className="text-purple-300" />, degree: "Secondary School Leaving Certification (SSLC)",
        institution: "Vikas Vidyalaya Mat. Hr. Sec. School", institutionUrl: null,
        location: "Tiruppur", duration: "2018 - 2019", gpa: "94.5 Percentage",
        description: [],
        commitMsg: "Add SSLC details", commitTime: "03 / 2019"
    },
];

// --- README Data ---
const readmeData = {
    id: "readme", type: "readme", fileName: "README.md",
    icon: <FaFileAlt className="text-gray-400" />,
    commitMsg: "Initial commit", commitTime: "02 / 2024",
    content: `# My Journey\n\nWelcome! This repository outlines my professional experience and educational background.\n\nNavigate through the **Experience** and **Education** directories using the sidebar or the path bar above.\n\nSelect individual files (ending in ".md") to view detailed information.`,
};

// --- Root Directory Definitions ---
// These represent the folders shown when at the root level
const rootDirectoryItems = [
    // These objects now ONLY represent the folders themselves
    { id: 'dir-exp', type: 'directory', icon: <FaFolder className="text-yellow-500" />, name: 'Experience', commitMsg: 'Update work history', commitTime: "04 / 2025" },
    { id: 'dir-edu', type: 'directory', icon: <FaFolder className="text-yellow-500" />, name: 'Education', commitMsg: 'Update academic info', commitTime: "04 / 2025" },
    // Include the README file as an item at the root level
    readmeData
];

// --- "Go Up" Object ---
const goUpDirectory = { id: 'go-up', type: 'goUp', icon: <FaFolder className="text-gray-500" />, name: '..', commitMsg: '', commitTime: '' };

// --- Flatten all *content* items (non-directory, non-goUp) for easy lookup by ID ---
const allContentItems = [readmeData, ...experienceData, ...educationData];

// --- Sidebar Component ---
const FileExplorerAside = ({ items, selectedItemId, onSelectItem }) => {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.3 } } // Short delay
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } }
    };

    return (
        <motion.aside
            className={`w-full md:w-64 lg:w-72 xl:w-80 flex-shrink-0 ${ghBg} ${ghBorder} border-r h-full overflow-y-auto hidden md:block`}
            variants={listVariants} initial="hidden" animate="visible"
        >
            <nav aria-label="File explorer">
                <ul className="pt-2 pb-2 text-xs">
                    {items.map((item) => {
                        const isActive = item.id === selectedItemId;
                        const isDirectory = item.type === 'directory';
                        const isGoUp = item.type === 'goUp';
                        // Use item.name for directories/goUp, item.fileName for files
                        const displayName = isDirectory || isGoUp ? item.name : item.fileName;

                        return (
                            <motion.li key={item.id} variants={itemVariants} className="px-1.5">
                                <button
                                    onClick={() => onSelectItem(item)} // Pass the whole item
                                    className={`w-full flex flex-row justify-between items-center gap-2 px-2 py-1 rounded-md my-[1px] transition-colors duration-100 whitespace-nowrap
                                                ${isActive ? `${ghActiveBg} ${ghActiveBorder} -ml-px pl-[calc(0.5rem-1px)]` : `${ghTextSecondary} ${ghHoverBg}`}
                                                ${isDirectory ? `${ghLink} font-medium` : ''}
                                                ${isGoUp ? `italic text-gray-500 hover:text-gray-300` : ''}
                                    `}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                   <div className={`flex flex-row items-center justify-center gap-4`}>
                                       {/* Icon */}
                                       <span className={`w-4 flex-shrink-0 text-center ${isActive ? accentColorClass : ''}`}>{item.icon || <FaFileAlt />}</span>
                                       {/* Name */}
                                       <span className={`truncate ${isActive ? `font-medium ${ghText}` : ''} ${isDirectory ? '' : ghText}`}>{displayName}</span>
                                   </div>
                                    {/* Commit Time */}
                                    <span className={`text-right ${ghTextSecondary} ${isActive ? 'text-gray-400' : ''} hidden lg:inline`}>{item.commitTime}</span>
                                </button>
                            </motion.li>
                        );
                    })}
                </ul>
            </nav>
        </motion.aside>
    );
};

// --- Path Bar Component ---
const PathBar = ({ path, onPathClick }) => {
    return (
        <div className={`px-3 py-2 text-sm ${ghTextSecondary} border-b ${ghBorderLight} flex items-center gap-1 flex-wrap ${ghBg} flex-shrink-0 h-[2.75rem]`}>
            {path.map((part, index) => (
                <span key={part.id} className="flex items-center gap-1">
                    {index > 0 && <span className="opacity-60 -mx-0.5">/</span>}
                    {/* Only make directories/root clickable in the path bar */}
                    {index < path.length - 1 && (part.type === 'directory' || part.id === 'root') ? (
                        <button
                            onClick={() => onPathClick(part)}
                            className={`hover:${ghLink} hover:underline ${index === 0 ? `font-medium ${ghText}` : ''}`}
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


// --- Content Viewer Component ---
const ContentViewer = ({ itemData, accentColorClass, themeGradient, currentDirectoryId }) => {
    const contentVariants = { /* ... variants remain same */ };

    return (
        <div className={`flex-1 overflow-y-auto ${ghBgDarker} relative h-full`}>
            <AnimatePresence mode="wait">
                {itemData ? (
                    <motion.div
                        key={itemData.id}
                        // variants={contentVariants} // Keeping simple fade for content switch
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className={`border ${ghBorder} rounded-md m-3 md:m-4 shadow-sm ${ghBg}`}
                    >
                        {/* File Header */}
                        <div className={`px-4 py-2 border-b ${ghBorderLight} text-sm ${ghTextSecondary} flex justify-between items-center sticky top-0 ${ghBg} z-10`}>
                            <span className="font-medium text-white">{itemData.fileName}</span>
                            <div className="flex items-center space-x-2">
                                <button className={`px-2 py-0.5 text-xs ${ghTextSecondary} border ${ghButtonBorder} ${ghButtonBg} ${ghButtonHoverBg} rounded hover:border-gray-500`}>Raw</button>
                            </div>
                        </div>

                        {/* Specific Content Rendering */}
                        {itemData.type === 'readme' ? (
                            <div className={`p-4 md:p-6 font-sans text-sm md:text-base leading-relaxed ${ghText}`}>
                                <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-a:text-blue-400 hover:prose-a:underline prose-ul:list-disc prose-ul:pl-5 prose-li:pl-0">
                                    {/* Basic Markdown Simulation */}
                                    <h1 className="!text-2xl !mb-4">{itemData.content.match(/^# (.*)/)?.[1]}</h1>
                                    {itemData.content.split('\n\n').slice(1).map((paragraph, i) => {
                                        if (paragraph.startsWith('*')) {
                                            return (
                                                <ul key={i} className="!my-3">
                                                    {paragraph.split('\n').map((line, j) => (
                                                        <li key={`${i}-${j}`}>{line.substring(2)}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return <p key={i} className="!my-3">{paragraph}</p>;
                                    })}
                                </div>
                            </div>
                        ) : ( // Experience/Education Content
                            <div className={`p-4 md:p-6 font-sans text-sm md:text-base leading-relaxed ${ghText}`}>
                                <h1 className={`text-xl md:text-2xl font-semibold mb-3 pb-3 border-b ${ghBorder} ${accentColorClass} flex items-center gap-2`}>
                                    {itemData.icon} {itemData.role || itemData.degree}
                                </h1>
                                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6 text-sm ${ghTextSecondary}`}>
                                    <span className={`font-medium ${ghText}`}>
                                        {itemData.type === 'experience' ? 'At:' : 'Institution:'}
                                        {itemData.companyUrl || itemData.institutionUrl ? (
                                            <a href={itemData.companyUrl || itemData.institutionUrl} target="_blank" rel="noopener noreferrer" className={`ml-1 ${ghLink} hover:underline`}>{itemData.company || itemData.institution}</a>
                                        ) : <span className="ml-1 text-gray-200">{itemData.company || itemData.institution}</span>}
                                    </span>
                                    <span className="opacity-50 hidden sm:inline">·</span>
                                    <span className="flex items-center gap-1.5"><FaCalendarAlt /> {itemData.duration}</span>
                                    {itemData.location && <span className="opacity-50 hidden sm:inline">·</span>}
                                    {itemData.location && <span className="flex items-center gap-1.5"><FaMapMarkerAlt /> {itemData.location}</span>}
                                    {itemData.gpa && <span className="opacity-50 hidden sm:inline">·</span>}
                                    {itemData.gpa && <span>Score: {itemData.gpa}</span>}
                                </div>
                                {itemData.description && itemData.description.length > 0 && (
                                    <div className="prose prose-sm md:prose-base prose-invert max-w-none mt-6 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-li:before:content-none prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-0">
                                        <ul className="space-y-2">
                                            {itemData.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-sm bg-gradient-to-r ${themeGradient} opacity-70`}></span>
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div // Placeholder - Show README if root & no file selected
                        key="placeholder"
                        // variants={contentVariants} // Keep placeholder static
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className={`flex items-center justify-center h-full ${ghTextSecondary} italic p-10 text-center text-base`}
                    >
                        {(currentDirectoryId === 'root' && readmeData)
                            ? "Select a file or folder from the explorer."
                            : "Select a file from the explorer."
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Main Exported Component ---
export default function GithubRepoSection({ choice }) { // choice might be redundant now
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.25 });
    const [selectedItemId, setSelectedItemId] = useState(readmeData?.id || null); // Default to README
    const [currentDirectoryId, setCurrentDirectoryId] = useState('root'); // 'root', 'dir-exp', 'dir-edu'

    // Find the full data object for the selected item
    const currentItemData = allContentItems.find(item => item.id === selectedItemId);

    // Determine items to show in the sidebar based on currentDirectoryId
    let sidebarItems = [];
    if (currentDirectoryId === 'root') {
        sidebarItems = rootDirectoryItems;
    } else if (currentDirectoryId === 'dir-exp') {
        sidebarItems = [goUpDirectory, ...experienceData];
    } else if (currentDirectoryId === 'dir-edu') {
        sidebarItems = [goUpDirectory, ...educationData];
    }

    // Handle clicks within the sidebar
    const handleSelectItem = (item) => {
        if (item.type === 'directory') {
            setCurrentDirectoryId(item.id);
            setSelectedItemId(null); // Clear file selection when entering directory
        } else if (item.type === 'goUp') {
            setCurrentDirectoryId('root');
            setSelectedItemId(null);
        } else { // It's a file (experience, education, readme)
            setSelectedItemId(item.id);
            // Keep currentDirectoryId the same, file selection changes viewer
        }
    };

    // Handle clicks on the path bar segments
    const handlePathClick = (pathItem) => {
        setSelectedItemId(null); // Always clear file view when changing path
        if (pathItem.id === 'root') {
            setCurrentDirectoryId('root');
        } else if (pathItem.id === 'dir-exp') {
            setCurrentDirectoryId('dir-exp');
        } else if (pathItem.id === 'dir-edu') {
            setCurrentDirectoryId('dir-edu');
        }
        // Clicking a file in the path bar does nothing different here
    };

    // Build the current path for the PathBar component
    let currentPath = [{ id: 'root', name: 'MyJourney', type: 'root' }]; // Add type for clarity
    const experienceDir = rootDirectoryItems.find(d => d.id === 'dir-exp');
    const educationDir = rootDirectoryItems.find(d => d.id === 'dir-edu');

    if (currentDirectoryId === 'dir-exp' && experienceDir) {
        currentPath.push(experienceDir);
    } else if (currentDirectoryId === 'dir-edu' && educationDir) {
        currentPath.push(educationDir);
    }

    // Add the selected file to the path *only if* it's appropriate for the current directory view
    if (currentItemData) {
        const fileBelongsToCurrentDir =
            (currentDirectoryId === 'root' && currentItemData.type === 'readme') ||
            (currentDirectoryId === 'dir-exp' && currentItemData.type === 'experience') ||
            (currentDirectoryId === 'dir-edu' && currentItemData.type === 'education');

        if (fileBelongsToCurrentDir) {
            currentPath.push({ id: currentItemData.id, name: currentItemData.fileName, type: currentItemData.type });
        }
        // If file doesn't belong (e.g., clicked path back to root but file view lingers), path bar won't show filename
    }


    // --- Typed.js ---
    const typedMyRef = useRef(null);
    const typedSummaryRef = useRef(null);
    useEffect(() => {
        let typedMyInstance;
        let typedSummaryInstance;

        if (isInView && typedMyRef.current) {
            typedMyRef.current.textContent = '';
            if (typedSummaryRef.current) typedSummaryRef.current.textContent = '';

            typedMyInstance = new Typed(typedMyRef.current, {
                strings: ["My"], typeSpeed: 100, startDelay: 500, showCursor: true, cursorChar: '|', loop: false,
                onComplete: (self) => {
                    setTimeout(() => { if (self.cursor) self.cursor.style.opacity = '0'; }, 50);
                    if (typedSummaryRef.current) {
                        typedSummaryInstance = new Typed(typedSummaryRef.current, {
                            strings: ["Summary"], typeSpeed: 100, startDelay: 100, showCursor: true, cursorChar: '|', loop: false,
                            onComplete: (self2) => { setTimeout(() => { if (self2.cursor) self2.cursor.style.opacity = '50'; }, 1500); },
                        });
                    }
                },
            });
        }

        return () => {
            if (typedMyInstance) typedMyInstance.destroy();
            if (typedSummaryInstance) typedSummaryInstance.destroy();
        };
    }, [isInView, choice]);



    return (
        <motion.section
            ref={containerRef}
            id="journey-repo"
            className={`relative w-full text-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-20 md:py-24 font-mono overflow-hidden  isolate`} // Reduced horizontal padding
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
        >

            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-left tracking-tight text-gray-100 h-20"
            >
                <span ref={typedMyRef} className="text-gray-200"></span>
                <span ref={typedSummaryRef} className={`${choice === "development" ? "text-cyan-400" : "text-dataBaseColor"}`}></span>
            </motion.h2>

           <div className={`flex flex-row gap-5`}>
               <motion.div
                   initial={{opacity: 0, x: -100}}
                   animate={isInView ? {opacity: 1, x:0} : {opacity:0, x: -100}}
                   transition={{delay: 0.3, duration: 0.5}}
                   className={`w-1 ${isInView ? (choice === "development" ? "bg-cyan-400" : "bg-yellow-400") : "bg-transparent"}`}></motion.div>
               {/* Main Content */}
               <motion.div
                   initial={{opacity: 0, y:50, scale:0.85}}
                   animate={isInView ? {opacity: 1,y:0, scale:1} : {opacity:0,y:50, scale:0.85}}
                   transition={{delay: 0.55, duration: 0.5}}
                   className={`relative z-10 w-full mx-auto border border-white/50 ${ghBgDarker} p-5 rounded-xl hover:shadow-sm hover:shadow-cyan-400`}> {/* Increased max-width */}
                   {/* Top Bar: Repo Name + Public Badge */}
                   <div className="px-1 md:px-4 py-3 flex items-center gap-2 text-sm mb-3">
                       <FaCode className={accentColorClass} />
                       <a href="#" className={`font-semibold ${ghLink} hover:underline text-lg`}>MyJourney</a> {/* Link style */}
                       <span className={`ml-2 px-2 py-0.5 text-xs ${ghBorder} border rounded-full ${ghTextSecondary}`}>Public</span>
                   </div>

                   {/* Tabs Row */}
                   <div className={`flex items-center border-b ${ghBorder} px-1 md:px-4 mb-3`}>
                       {/* Mock Tabs - add more as needed */}
                       <button className={`px-3 py-2 text-sm font-medium ${ghText} border-b-2 border-orange-500 -mb-px`}> {/* Active Tab */}
                           <FaCode className="inline mr-1.5 -mt-0.5" /> Code
                       </button>
                       <button className={`px-3 py-2 text-sm ${ghTextSecondary} hover:${ghText}`}>
                           {/* <FaExclamationCircle className="inline mr-1.5 -mt-0.5" /> */} Issues
                       </button>
                       <button className={`px-3 py-2 text-sm ${ghTextSecondary} hover:${ghText}`}>
                           {/* <FaProjectDiagram className="inline mr-1.5 -mt-0.5" /> */} Projects
                       </button>
                       {/* Add more tabs */}
                   </div>


                   {/* The "Repository" Card Structure */}
                   <motion.div
                       className={` ${ghBg} border ${ghBorder} rounded-lg shadow-md overflow-hidden min-h-[65vh] max-h-[75vh] flex flex-col`} // Main card bg, reduced shadow slightly
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                   >
                       {/* --- Path/Branch/Action Bar --- */}
                       <div className={`px-3 py-2 text-sm ${ghTextSecondary} border-b ${ghBorderLight} flex items-center gap-2 flex-wrap ${ghBg} flex-shrink-0`}>
                           {/* Branch Dropdown Mock */}
                           <button className={`flex items-center gap-1 px-2 py-1 rounded ${ghButtonBg} border ${ghButtonBorder} ${ghButtonHoverBg} ${ghText}`}>
                               <FaCodeBranch className="text-xs"/>
                               <span className="font-medium">main</span>
                               <FaChevronDown className="text-xs opacity-70"/>
                           </button>
                           {/* Path */}
                           <div className="flex items-center gap-1 flex-1 min-w-0">
                               <span className={`font-medium ${ghText}`}>my-journey/ {currentDirectoryId === "dir-edu" && "education/"} {currentDirectoryId === "dir-exp" &&  "experience/"} {currentItemData ? currentItemData.fileName : ''}</span>
                           </div>
                           {/* Action Buttons Mock */}
                           <div className="flex items-center gap-1">
                               <button className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${ghButtonBg} border ${ghButtonBorder} ${ghButtonHoverBg} ${ghText}`}>Go to file</button>
                               <button className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${ghButtonBg} border ${ghButtonBorder} ${ghButtonHoverBg} ${ghText}`}>Add file <FaChevronDown className="text-xs opacity-70"/></button>
                               <button className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium ${ghGreenButtonBg} ${ghGreenButtonHoverBg} border ${ghButtonBorder} text-white`}> <FaCode className="text-xs"/> Code <FaChevronDown className="text-xs opacity-70"/></button>
                           </div>
                       </div>

                       {/* --- Commit Info Bar (Mock) --- */}
                       <div className={`px-3 py-2 text-sm ${ghTextSecondary} border-b ${ghBorderLight} flex items-center gap-2 flex-wrap ${ghBg} flex-shrink-0`}>
                           <img src="https://github.com/BudraHH.png" alt="Author" className="w-5 h-5 rounded-full"/> {/* Replace with your avatar URL */}
                           <span className="font-medium text-white mr-1">BudraHH</span> {/* Replace with username */}
                           <span className="hidden sm:inline">{currentItemData?.commitMsg || 'Initial commit'}</span>
                           <span className="ml-auto text-xs"> {currentItemData?.commitTime  }</span>
                       </div>


                       {/* --- Flex Container for Sidebar + Content --- */}
                       <div className="flex flex-row flex-1 overflow-hidden">
                           {/* Sidebar */}
                           <FileExplorerAside
                               items={sidebarItems}
                               selectedItemId={selectedItemId}
                               onSelectItem={handleSelectItem}

                           />
                           {/* Content Viewer */}
                           <ContentViewer
                               itemData={currentItemData}
                               accentColorClass={accentColorClass}
                               themeGradient={themeGradient}
                               currentDirectoryId={currentDirectoryId}
                           />
                       </div>
                   </motion.div>
               </motion.div>
           </div>
        </motion.section>
    );
}