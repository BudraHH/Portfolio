import { motion, useReducedMotion, useInView } from "framer-motion";
import Typed from "typed.js";
import React, { useEffect, useRef } from "react";
import {
    FaCode, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDatabase, FaMobileAlt,
    FaTools, FaPython, FaJava, FaFlask, FaGitAlt, FaGithub, FaNpm, FaDocker,
    FaServer, FaRocket, FaBook, FaTerminal, FaNetworkWired, FaLaptopCode
} from 'react-icons/fa';
import {
    SiTailwindcss, SiDjango, SiExpress, SiPostgresql, SiMongodb, SiFlutter,
    SiTypescript, SiRedis, SiKubernetes, SiGooglecloud
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// --- Development Theme Configuration ---
const accentColorClass = 'text-cyan-400'; // Primary accent
const themeGradient = 'from-cyan-500 via-purple-500 to-pink-500'; // Gradient for highlights/borders
const glowFrom = 'from-cyan-600/20'; // Background glow start
const glowTo = 'to-purple-600/10';  // Background glow end
const pillHoverBg = 'hover:bg-cyan-900/60'; // Pill background on hover
const pillHoverBorder = 'hover:border-cyan-400/80'; // Pill border on hover
const categoryBorderColor = 'border-cyan-500/30'; // Border for category titles

// --- Icon Mappings (Keep relevant icons) ---
const iconSize = "text-lg"; // Standard size for skill icons
const skillIcons = {
    Python: <FaPython className={`text-blue-400 ${iconSize}`} />,
    JavaScript: <FaCode className={`text-yellow-500 ${iconSize}`} />,
    // TypeScript: <SiTypescript className={`text-blue-500 ${iconSize}`} />, // Optional: Keep if used
    Java: <FaJava className={`text-red-500 ${iconSize}`} />,
    "React.js": <FaReact className={`text-cyan-400 ${iconSize}`} />,
    HTML: <FaHtml5 className={`text-orange-500 ${iconSize}`} />,
    CSS: <FaCss3Alt className={`text-blue-500 ${iconSize}`} />,
    "Tailwind CSS": <SiTailwindcss className={`text-cyan-500 ${iconSize}`} />,
    "Node.js": <FaNodeJs className={`text-green-500 ${iconSize}`} />,
    "Express.js": <SiExpress className={`text-gray-400 ${iconSize}`} />,
    Django: <SiDjango className={`text-green-700 ${iconSize}`} />,
    Flask: <FaFlask className={`text-gray-300 ${iconSize}`} />,
    Flutter: <SiFlutter className={`text-cyan-400 ${iconSize}`} />, // Keep if mobile dev is listed
    PostgreSQL: <SiPostgresql className={`text-blue-600 ${iconSize}`} />,
    MongoDB: <SiMongodb className={`text-green-600 ${iconSize}`} />,
    // Redis: <SiRedis className={`text-red-600 ${iconSize}`} />, // Optional
    Git: <FaGitAlt className={`text-orange-600 ${iconSize}`} />,
    GitHub: <FaGithub className={`text-gray-300 ${iconSize}`} />,
    // Docker: <FaDocker className={`text-blue-500 ${iconSize}`} />, // Optional
    // Kubernetes: <SiKubernetes className={`text-blue-700 ${iconSize}`} />, // Optional
    Postman: <TbApi className={`text-orange-500 ${iconSize}`} />, // API testing tool
    Npm: <FaNpm className={`text-red-600 ${iconSize}`} />,
    // "Google Cloud": <SiGooglecloud className={`text-blue-500 ${iconSize}`} />, // Optional
    Fallback: <FaCode className={`text-gray-500 ${iconSize}`} /> // Fallback icon
};

// Category icons using the development theme colors where appropriate
const categoryIconSize = "text-xl";
const categoryIcons = {
    "Core Languages": <FaCode className={`${accentColorClass} ${categoryIconSize}`} />, // Use accent for core
    "Frontend": <FaLaptopCode className={`text-cyan-400 ${categoryIconSize}`} />,
    "Backend": <FaServer className={`text-green-500 ${categoryIconSize}`} />,
    "Mobile": <FaMobileAlt className={`text-cyan-400 ${categoryIconSize}`} />, // Keep if Flutter listed
    "Databases": <FaDatabase className={`text-blue-600 ${categoryIconSize}`} />,
    "Tools & Workflow": <FaTools className={`text-orange-500 ${categoryIconSize}`} />, // Renamed category
    // "Cloud & DevOps": <FaNetworkWired className={`text-blue-500 ${categoryIconSize}`} />, // Optional category
    Fallback: <FaCode className={`text-gray-500 ${categoryIconSize}`} />
};

// --- Development Skills Data ---
// Focused purely on development skills, emphasizing the core languages.
const developmentSkills = {
    // Renamed first category to highlight core languages
    "Core Languages": ["Java", "JavaScript", "Python"],
    "Frontend": ["React.js", "HTML", "CSS", "Tailwind CSS"],
    "Backend": ["Node.js", "Express.js", "Django", "Flask"], // Includes Python frameworks
    "Mobile": ["Flutter"], // Include this category if Flutter is relevant
    "Databases": ["PostgreSQL", "MongoDB"],
    // Renamed for broader scope
    "Tools & Workflow": ["Git", "GitHub", "Postman", "Npm"],
    // "Cloud & DevOps": ["Docker", "Google Cloud"] // Optional category
};


// --- Component ---
export default function DevelopmentSkills() { // Removed 'choice' prop
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef(null);
    // Animate only once when it comes into view
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    // --- Typed.js ---
    const typedDevelopmentRef = useRef(null);
    const typedToolkitRef = useRef(null);
    useEffect(() => {
        let typedDevelopmentInstance;
        let typedToollkitInstance;

        // Only run Typed.js when the component is in view
        if (isInView && typedDevelopmentRef.current && typedToolkitRef.current) {
            // Ensure text content is cleared before initializing
            typedDevelopmentRef.current.textContent = '';
            typedToolkitRef.current.textContent = '';

            typedDevelopmentInstance = new Typed(typedDevelopmentRef.current, {
                strings: ["Development"], // Changed first word
                typeSpeed: 80,
                startDelay: 400,
                showCursor: true,
                cursorChar: '_', // Underscore cursor for dev feel
                loop: false,
                onComplete: (self) => {
                    setTimeout(() => { if (self.cursor) self.cursor.style.opacity = '0'; }, 50);
                    // Chain the second Typed instance
                    typedToollkitInstance = new Typed(typedToolkitRef.current, {
                        strings: ["Toolkit"],
                        typeSpeed: 80,
                        startDelay: 100,
                        showCursor: true,
                        cursorChar: '_',
                        loop: false,
                        onComplete: (self2) => {
                            // Keep cursor blinking at the end
                            setTimeout(() => { if (self2.cursor) self2.cursor.style.animation = 'blink 1s infinite'; }, 500);
                        },
                    });
                },
            });
        }

        // Cleanup function to destroy Typed instances on unmount or when isInView becomes false
        return () => {
            if (typedDevelopmentInstance) typedDevelopmentInstance.destroy();
            if (typedToollkitInstance) typedToollkitInstance.destroy();
        };
        // Rerun effect if isInView changes (specifically to true)
    }, [isInView]);

    // --- Framer Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.6 } // Slightly adjusted timing
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -10 }, // Added subtle rotation
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: { type: "spring", stiffness: 70, damping: 12, duration: 0.5 }
        }
    };

    // Variants for staggering content within the card
    const cardContentVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } }
    }
    const cardTitleVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } }
    }
    const pillContainerVariants = { // For staggering pills
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } }
    }
    const pillVariants = {
        hidden: { opacity: 0, scale: 0.7, y: 15 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
    }

    // Hover animation for skill icons (only if motion is not reduced)
    const iconHoverVariant = shouldReduceMotion ? {} : {
        y: [0, -2.5, 0], // Slightly more pronounced lift
        scale: [1, 1.2, 1], // Slightly larger scale
        transition: { duration: 0.3, ease: "backInOut" }
    };

    return (
        // Main container with reference for useInView
        <div ref={containerRef} className="relative w-full text-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 pt-20 md:pt-24 font-sans overflow-hidden   isolate" style={{ perspective: '1000px' }}> {/* Darker dev background, sans-serif font */}

            {/* Background Effects */}
            <div className={`absolute inset-0 z-[-1] bg-gradient-radial from-transparent via-transparent to-black opacity-80`}></div>
            <div className={`absolute top-0 left-0 w-1/2 h-1/2 z-[-2] bg-gradient-radial ${glowFrom} ${glowTo} blur-[100px] opacity-50 pointer-events-none`}></div>
            <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 z-[-2] bg-gradient-radial from-purple-700/15 to-pink-700/5 blur-[120px] opacity-60 pointer-events-none`}></div>
            {/* Subtle Grid */}
            <div className="absolute inset-0 z-[-1] opacity-[0.03] bg-[url('/grid.svg')] bg-repeat pointer-events-none mix-blend-soft-light"></div>

            {/* Content Area */}
            <div className="relative z-10 flex flex-col items-start w-full  mx-auto"> {/* Align left, max width */}
                <h2 className={`container mx-auto relative mb-5 lg:text-xl font-mono`}>
                    [ <span ref={typedDevelopmentRef}></span><span ref={typedToolkitRef} className={`text-cyan-500`}></span> ]
                </h2>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    // Trigger animation when the component is in view
                    animate={isInView ? "visible" : "hidden"}
                    className="container mx-auto relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full" // Responsive grid
                >
                    {/* Map over the developmentSkills data */}
                    {Object.entries(developmentSkills).map(([category, items]) => (
                        <motion.div // Individual Skill Card
                            key={category}
                            variants={cardVariants} // Apply card animation variants
                            className="group relative flex flex-col h-full rounded-lg shadow-lg bg-[#111827]/60 backdrop-blur-md border border-white/10 overflow-hidden transition-shadow duration-300  " // Dev-themed card styles
                        >
                            {/* Inner container for padding and content staggering */}
                            <motion.div
                                className="relative z-10 flex flex-col h-full p-5 md:p-6"
                                variants={cardContentVariants} // Stagger title and pills
                            >
                                {/* Category Title Area */}
                                <motion.div
                                    variants={cardTitleVariants} // Animate title
                                    className={`flex items-center gap-3 mb-5 text-lg font-semibold text-gray-100 border-b-2 ${categoryBorderColor} pb-3`} // Style category title
                                >
                                    {categoryIcons[category] || categoryIcons.Fallback}
                                    <span className="tracking-wide">{category}</span>
                                </motion.div>

                                {/* Skill Pills Area */}
                                <motion.div
                                    variants={pillContainerVariants} // Stagger pills
                                    className="flex flex-wrap gap-2.5 mt-auto pt-2" // Pills wrap, aligned towards bottom if space allows
                                >
                                    {items.map((skill) => (
                                        <motion.div // Individual Skill Pill
                                            key={skill}
                                            variants={pillVariants} // Animate each pill
                                            className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md cursor-default
                                                    bg-gray-800/70 border border-gray-600/50
                                                    text-gray-300 text-xs md:text-sm shadow-sm transition-all duration-200
                                                    ${pillHoverBg} ${pillHoverBorder} hover:text-white hover:shadow-md hover:scale-[1.03]`} // Pill styling and hover effects
                                        >
                                            {/* Icon with hover animation */}
                                            <motion.span whileHover={iconHoverVariant}>
                                                {skillIcons[skill] || skillIcons.Fallback}
                                            </motion.span>
                                            {/* Skill name */}
                                            <span className="whitespace-nowrap">{skill}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}