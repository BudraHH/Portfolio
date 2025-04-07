import { motion, useReducedMotion, useInView } from "framer-motion";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import {
    FaCode, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDatabase, FaMobileAlt,
    FaTools, FaPython, FaJava, FaFlask, FaGitAlt, FaGithub, FaNpm, FaDocker,
    FaChartBar, FaBrain, FaServer, FaRocket, FaBook, FaTerminal, FaNetworkWired, FaLaptopCode
} from 'react-icons/fa';
import {
    SiTailwindcss, SiDjango, SiExpress, SiPostgresql, SiMongodb, SiFlutter,
    SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiKeras, SiMlflow,
    SiHuggingface, SiJupyter, SiTypescript, SiRedis, SiKubernetes, SiGooglecloud
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// --- Base Color Classes & Configuration ---
const devBaseColorClass = 'text-cyan-400';
const dataBaseColorClass = 'text-yellow-400';

// Gradient classes for borders/glows
const devGradient = 'from-cyan-500 via-purple-500 to-pink-500';
const dataGradient = 'from-yellow-400 via-orange-500 to-red-500';

// Background Glows
const devGlowFrom = 'from-cyan-600/20'; // Slightly stronger glow
const dataGlowFrom = 'from-yellow-600/20';
const devGlowTo = 'to-purple-600/10';
const dataGlowTo = 'to-orange-600/10';

// Pill hover styles
const devPillHoverBg = 'hover:bg-cyan-900/60';
const dataPillHoverBg = 'hover:bg-yellow-900/60';
const devPillHoverBorder = 'hover:border-cyan-400/80';
const dataPillHoverBorder = 'hover:border-yellow-400/80';

// --- Icon Mappings (Ensure consistency) ---
const iconSize = "text-lg";
const skillIcons = {
    Python: <FaPython className={`text-blue-400 ${iconSize}`} />,
    JavaScript: <FaCode className={`text-yellow-500 ${iconSize}`} />,
    TypeScript: <SiTypescript className={`text-blue-500 ${iconSize}`} />,
    Java: <FaJava className={`text-red-500 ${iconSize}`} />,
    "React.js": <FaReact className={`text-cyan-400 ${iconSize}`} />,
    HTML: <FaHtml5 className={`text-orange-500 ${iconSize}`} />,
    CSS: <FaCss3Alt className={`text-blue-500 ${iconSize}`} />,
    "Tailwind CSS": <SiTailwindcss className={`text-cyan-500 ${iconSize}`} />,
    "Node.js": <FaNodeJs className={`text-green-500 ${iconSize}`} />,
    "Express.js": <SiExpress className={`text-gray-400 ${iconSize}`} />,
    Django: <SiDjango className={`text-green-700 ${iconSize}`} />,
    Flask: <FaFlask className={`text-gray-300 ${iconSize}`} />,
    Flutter: <SiFlutter className={`text-cyan-400 ${iconSize}`} />,
    PostgreSQL: <SiPostgresql className={`text-blue-600 ${iconSize}`} />,
    MongoDB: <SiMongodb className={`text-green-600 ${iconSize}`} />,
    Redis: <SiRedis className={`text-red-600 ${iconSize}`} />,
    Git: <FaGitAlt className={`text-orange-600 ${iconSize}`} />,
    GitHub: <FaGithub className={`text-gray-300 ${iconSize}`} />,
    Docker: <FaDocker className={`text-blue-500 ${iconSize}`} />,
    Kubernetes: <SiKubernetes className={`text-blue-700 ${iconSize}`} />,
    Postman: <TbApi className={`text-orange-500 ${iconSize}`} />,
    Npm: <FaNpm className={`text-red-600 ${iconSize}`} />,
    "Google Cloud": <SiGooglecloud className={`text-blue-500 ${iconSize}`} />,
    Pandas: <SiPandas className={`text-purple-500 ${iconSize}`} />,
    NumPy: <SiNumpy className={`text-blue-400 ${iconSize}`} />,
    "Scikit-learn": <FaBrain className={`text-orange-500 ${iconSize}`} />,
    TensorFlow: <SiTensorflow className={`text-orange-600 ${iconSize}`} />,
    Keras: <SiKeras className={`text-red-600 ${iconSize}`} />,
    Matplotlib: <FaChartBar className={`text-blue-500 ${iconSize}`} />,
    Seaborn: <FaChartBar className={`text-purple-400 ${iconSize}`} />,
    MLflow: <SiMlflow className={`text-blue-500 ${iconSize}`} />,
    "Hugging Face": <SiHuggingface className={`text-yellow-400 ${iconSize}`} />,
    "Jupyter Notebook": <SiJupyter className={`text-orange-500 ${iconSize}`} />,
    Fallback: <FaCode className={`text-gray-500 ${iconSize}`} />
};

const categoryIconSize = "text-xl";
const categoryIcons = {
    "Programming Languages": <FaCode className={`text-yellow-400 ${categoryIconSize}`} />,
    "Frontend": <FaLaptopCode className={`text-cyan-400 ${categoryIconSize}`} />,
    "Backend": <FaServer className={`text-green-500 ${categoryIconSize}`} />,
    "Mobile": <FaMobileAlt className={`text-cyan-400 ${categoryIconSize}`} />,
    "Databases": <FaDatabase className={`text-blue-600 ${categoryIconSize}`} />,
    "Tools & DevOps": <FaTools className={`text-orange-500 ${categoryIconSize}`} />,
    "Cloud": <FaNetworkWired className={`text-blue-500 ${categoryIconSize}`} />,
    "Core DS": <FaBrain className={`text-orange-500 ${categoryIconSize}`} />,
    "Visualization": <FaChartBar className={`text-purple-400 ${categoryIconSize}`} />,
    "Deployment & MLOps": <FaRocket className={`text-blue-500 ${categoryIconSize}`} />,
    "Notebooks": <FaBook className={`text-orange-500 ${categoryIconSize}`} />,
    Fallback: <FaCode className={`text-gray-500 ${categoryIconSize}`} />
};

// --- Component ---
export default function Skills({ choice = 'development' }) {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.25 }); // Render and animate only once when in view

    // --- Skills Data ---
    const skillsData = {
        development: {
            "Programming Languages": ["Python", "JavaScript", "Java"],
            "Frontend": ["React.js", "HTML", "CSS", "Tailwind CSS"],
            "Backend": ["Node.js", "Express.js", "Django", "Flask"],
            "Mobile": ["Flutter"],
            "Databases": ["PostgreSQL", "MongoDB", ],
            "Tools & DevOps": ["Git", "GitHub",  "Postman", "Npm"],

        },
        dataScience: {
            "Programming Languages": ["Python", "JavaScript", "Java"],
            "Core DS": ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras"],
            "Visualization": ["Matplotlib", "Seaborn"],
            "Deployment & MLOps": ["Flask","Django", "Postman"],
            "Notebooks": ["Jupyter Notebook"],
            "Databases": ["PostgreSQL", "MongoDB"],
            "Tools & DevOps": ["Git", "GitHub"],
        }
    };

    const isDevelopment = choice.toLowerCase() === "development";
    const skills = isDevelopment ? skillsData.development : skillsData.dataScience;
    const accentColorClass = isDevelopment ? devBaseColorClass : dataBaseColorClass;
    const themeGradient = isDevelopment ? devGradient : dataGradient;
    const glowFrom = isDevelopment ? devGlowFrom : dataGlowFrom;
    const glowTo = isDevelopment ? devGlowTo : dataGlowTo;
    const pillHoverBg = isDevelopment ? devPillHoverBg : dataPillHoverBg;
    const pillHoverBorder = isDevelopment ? devPillHoverBorder : dataPillHoverBorder;


    // --- Typed.js ---
    const typedMyRef = useRef(null);
    const typedToolkitRef = useRef(null);
    useEffect(() => {
        let typedMyInstance;
        let typedToollkitInstance;

        if (isInView && typedMyRef.current) {
            typedMyRef.current.textContent = '';
            if (typedToolkitRef.current) typedToolkitRef.current.textContent = '';

            typedMyInstance = new Typed(typedMyRef.current, {
                strings: ["My"], typeSpeed: 100, startDelay: 500, showCursor: true, cursorChar: '|', loop: false,
                onComplete: (self) => {
                    setTimeout(() => { if (self.cursor) self.cursor.style.opacity = '0'; }, 50);
                    if (typedToolkitRef.current) {
                        typedToollkitInstance = new Typed(typedToolkitRef.current, {
                            strings: ["Toolkit"], typeSpeed: 100, startDelay: 100, showCursor: true, cursorChar: '|', loop: false,
                            onComplete: (self2) => { setTimeout(() => { if (self2.cursor) self2.cursor.style.opacity = '50'; }, 1500); },
                        });
                    }
                },
            });
        }

        return () => {
            if (typedMyInstance) typedMyInstance.destroy();
            if (typedToollkitInstance) typedToollkitInstance.destroy();
        };
    }, [isInView, choice]);

    // --- Framer Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.6 } }
    };

    const cardContentVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    }
    const cardTitleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    }
    const pillContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } }
    }
    const pillVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
    }

    const iconHoverVariant = {
        y: [0, -2, 0],
        scale: [1, 1.15, 1],
        transition: { duration: 0.3, ease: "backInOut" }
    }

    return (
        <div ref={containerRef} className="relative  w-full text-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-20 md:py-24 font-mono overflow-hidden bg-gray-950 isolate" style={{ perspective: '1200px' }}>
            <div className="absolute inset-0 z-[-1] opacity-[0.02] bg-[url('/noise.png')] bg-repeat pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 z-[-2] opacity-[0.07]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(107, 114, 128, 0.5)" strokeWidth="0.5"/></pattern><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="url(#smallGrid)"/><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(107, 114, 128, 0.7)" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
            </div>
            <div className="absolute inset-0 z-[-2] bg-gradient-to-bl from-gray-950 via-black to-black opacity-95"></div>

            <div className="relative z-10 flex flex-col items-left w-full  mx-auto ">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-left tracking-tight text-gray-100 h-20 flex flex-row justify-start -gap-20"
                >
                    <span ref={typedMyRef} className="text-gray-200"></span>
                    <span ref={typedToolkitRef} className={`${accentColorClass}`}></span>
                </motion.h2>

                <div className={`flex flex-row space-x-5`}>
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={isInView ? {opacity: 1, x:0} : {opacity:0, x: -100}}
                        transition={{delay: 0.3, duration: 0.5}}
                        className={`w-1 ${isInView ? (isDevelopment ? "bg-cyan-400" : "bg-yellow-400") : "bg-transparent"}`}></motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{delay: 0.5, duration: 0.5}}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full"
                    >
                        {Object.entries(skills).map(([category, items]) => (
                            <motion.div // The Card
                                key={category}
                                variants={cardVariants}

                                className="group relative flex flex-col h-full rounded-xl shadow-xl bg-gray-900/20 backdrop-blur-xl border border-white/10 overflow-hidden  " // Added overflow-hidden, transform-style-3d
                            >

                                {/* Inner content container with padding */}
                                <motion.div
                                    className="relative z-10 flex flex-col h-full p-5 md:p-6 bg-gray-900/5 rounded-lg" // Slightly smaller radius than parent
                                    variants={cardContentVariants}
                                    initial="hidden"
                                    animate="visible" // Animate content after card appears
                                >
                                    {/* Category Title */}
                                    <motion.div
                                        variants={cardTitleVariants}
                                        className="flex items-center gap-3 mb-5 text-lg font-semibold text-gray-100 border-b border-gray-700/60 pb-3"
                                    >
                                        {categoryIcons[category] || categoryIcons.Fallback}
                                        <span className="tracking-wide">
                                        {category}
                                    </span>
                                    </motion.div>

                                    {/* Skills List */}
                                    <motion.div
                                        variants={pillContainerVariants} // Stagger pills within this container
                                        className="flex flex-wrap gap-2.5 " // Adjusted gap
                                    >
                                        {items.map((skill) => (
                                            <motion.div // This is the pill
                                                key={skill}
                                                variants={pillVariants}

                                                className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 h-10 rounded-lg cursor-crosshair
                                                        bg-gradient-to-br from-gray-800/80 to-gray-900/70 border border-gray-600/80
                                                        text-gray-300 text-xs md:text-sm shadow-md transition-all duration-200
                                                        ${pillHoverBg} ${pillHoverBorder} hover:text-white hover:shadow-lg`} // Refined styling
                                            >
                                                {/* Wrap icon in motion.span for animation */}
                                                <motion.span variants={shouldReduceMotion ? {} : iconHoverVariant}>
                                                    {skillIcons[skill] || skillIcons.Fallback}
                                                </motion.span>
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

        </div>
    );
}