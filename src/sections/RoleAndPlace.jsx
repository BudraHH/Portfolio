import { motion, useReducedMotion, useInView } from "framer-motion";
import { FaTerminal } from 'react-icons/fa';
import {useRef} from "react";

// Define base color classes directly or ensure they are imported/configured
const devBaseColorClass = 'text-cyan-400'; // Using explicit class name
const dataBaseColorClass = 'text-yellow-400'; // Using explicit class name

export default function RoleAndPlace({ choice,ref    }) { // Provide default choice
    const shouldReduceMotion = useReducedMotion();
    const containerRef = ref || useRef(null);
    const isInView = useInView(containerRef, { amount: 0.25 }); // Render and animate only once when in view

    // --- Animation Variants ---
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
    };

    // --- Dynamic Content based on choice ---
    const isDevelopment = choice === 'development';
    // titleText and titleColor are not directly used in this version's main content display
    const accentColorClass = isDevelopment ? devBaseColorClass : dataBaseColorClass;

    // --- Static Info (still useful for potential future enhancements) ---
    // const currentRole = "Software Development Trainee";
    // const currentWorkplace = "Zoho Corporation";
    // const workplaceUrl = "https://www.zoho.com/";

    return (
        <motion.div
            // Consistent padding
            className="relative w-full   py-16 md:py-20 text-white font-mono"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >


            {/* Main Content Area - Centered */}
            <div className="relative z-10 flex flex-col items-center w-full   mx-auto">

                {/* Section Title - Centered */}
                <div className="text-left mb-6 md:mb-10  w-full">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Current Role &{' '}
                        {/* Use accentColorClass for consistency */}
                        <span className={`${accentColorClass} transition-colors duration-300 hover:brightness-125`}>
                           Workplace
                        </span>
                        !
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                        My current professional status.
                    </p>
                </div>

                {/* Terminal-Style Content Card */}
                <motion.div
                    className="w-full bg-gray-900/70 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl overflow-hidden hover:border-gray-600/70 transition-colors duration-300"
                    variants={contentVariants} // Apply animation variant
                >
                    {/* Linux Terminal Style Header */}
                    <div className="flex items-center px-4 py-3 border-b border-gray-600/50 bg-gray-800/60">
                        {/* Use accentColorClass */}
                        <FaTerminal className={`${accentColorClass} mr-2 text-sm transition-colors duration-300`} />
                        <span className="text-sm text-gray-300 select-none font-medium">
                            budrahh@debian:~
                        </span>
                    </div>

                    {/* Preformatted Text Content Area */}
                    <div className="w-full h-full max-w-full overflow-x-auto p-5 md:p-6 text-sm md:text-base font-mono text-left leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {/* Using text-gray-200 or similar for output, accent for prompt */}
                        <pre className="text-gray-200"><span className={`${accentColorClass} font-semibold`}>budrahh@debian:~$</span> echo $CURRENT_ROLE</pre>
                        <pre className={`mb-3 text-white`}>Software Development Trainee</pre> {/* Use text-white or bright color for output */}
                        <pre className="text-gray-200"><span className={`${accentColorClass} font-semibold`}>budrahh@debian:~$</span> echo $CURRENT_WORKPLACE</pre>
                        <pre className={`text-white`}>Zoho Corporation</pre> {/* Use text-white or bright color for output */}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}