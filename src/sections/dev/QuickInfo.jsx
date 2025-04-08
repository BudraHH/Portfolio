import { motion, useReducedMotion,useInView } from "framer-motion";
import { useState, useRef } from 'react'; // Import useState for copy feedback
import {
    FaPhoneAlt,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
    FaCopy, // Icon for copy action
    FaCheck // Icon for copy success feedback
} from 'react-icons/fa';

// Assuming devBaseColor and dataBaseColor are defined elsewhere,
// otherwise, replace them with direct Tailwind classes like 'text-cyan-400' and 'text-yellow-400'
const devBaseColorClass = 'text-cyan-400'; // Example direct class
const dataBaseColorClass = 'text-yellow-400'; // Example direct class

export default function QuickInfo({ choice, ref }) { // Default choice
    const shouldReduceMotion = useReducedMotion();
    const containerRef = ref || useRef(null);
    const isInView = useInView(containerRef, { amount: 0.25 }); // Render and animate only once when in view

    const [copiedValue, setCopiedValue] = useState(null); // Track which value is copied

    // --- Data for Info Items ---
    const infoData = [
        {
            icon: <FaPhoneAlt />,
            label: "Phone",
            value: "+91 7397 509 844",
            href: "tel:+917397509844",
            copyable: true
        },
        {
            icon: <FaEnvelope />,
            label: "Email",
            value: "hariharabudra@gmail.com",
            href: "mailto:hariharabudra@gmail.com",
            copyable: true
        },
        {
            icon: <FaGithub />,
            label: "GitHub",
            value: "github.com/BudraHH", // Shorter display value
            href: "https://github.com/BudraHH",
            copyable: false // GitHub link usually isn't copied this way
        },

        {
            icon: <FaMapMarkerAlt />,
            label: "Location",
            value: "Coimbatore, Tamil Nadu",
            href: null, // No link needed
            copyable: false
        },{
            icon: <FaLinkedin />,
            label: "LinkedIn",
            value: "linkedin.com/in/hari-hara-budra", // Shorter display value
            href: "https://www.linkedin.com/in/hari-hara-budra/",
            copyable: false // LinkedIn link usually isn't copied this way
        },
    ];

    // --- Animation Variants ---
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } } // Added staggerChildren
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    // --- Copy Function ---
    const copyToClipboard = (textToCopy, label) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopiedValue(label); // Set the label of the copied item
            setTimeout(() => setCopiedValue(null), 1500); // Reset after 1.5 seconds
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Optional: Add user feedback for failure
        });
    };

    const promptColorClass = choice === 'development' ? devBaseColorClass : dataBaseColorClass;
    const titleColor = choice === 'development' ? 'text-cyan-300' : 'text-yellow-300';

    return (
        // Consistent padding and structure
        <motion.div
            className="relative w-full   py-16 md:py-20 text-white font-mono "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants} // Apply variants to the main container
        >
            {/* Background Giant Text - Subtle */}


            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-screen-md mx-auto"> {/* Max width for better centering */}

                {/* Section Title - Reusing refined style */}
                <div className="w-full text-left mb-6 md:mb-10">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Quick{' '}
                        <span className={`${titleColor} transition-colors duration-300 hover:brightness-125`}>
                            Info
                        </span>
                        !
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                        Connect with me.
                    </p>
                </div>

                {/* Info Items Container - Using Grid for better layout */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {infoData.map((item) => (
                        <motion.div
                            key={item.label}
                            className={`
                                group relative flex items-center p-4 md:p-5 rounded-lg
                                bg-gray-800/40 backdrop-blur-sm border border-gray-700/50
                                transition-all duration-300 ease-in-out
                                hover:bg-gray-700/60 hover:border-gray-600/80 hover:shadow-md
                                overflow-hidden  /* Prevent copy button overflow on hover */
                            `}
                            variants={itemVariants} // Apply item variants here
                        >
                            {/* Icon */}
                            <div className={`mr-3 text-lg md:text-xl ${promptColorClass} transition-colors duration-300`}>
                                {item.icon}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0"> {/* Allow text to wrap/truncate */}
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm md:text-base text-gray-200 font-medium break-words hover:text-white hover:underline underline-offset-2 transition-colors duration-200"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-sm md:text-base text-gray-200 font-medium break-words">
                                        {item.value}
                                    </p>
                                )}
                            </div>

                            {/* Copy Button (Conditional) */}
                            {item.copyable && (
                                <button
                                    onClick={() => copyToClipboard(item.value, item.label)}
                                    title={`Copy ${item.label}`}
                                    className={`
                                        absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded
                                        text-gray-400 bg-gray-700/50
                                        opacity-0 group-hover:opacity-100 focus:opacity-100 /* Show on hover/focus */
                                        transition-all duration-200 ease-in-out
                                        hover:bg-gray-600/70 hover:text-cyan-300
                                        focus:outline-none focus:ring-1 focus:ring-cyan-500
                                    `}
                                    aria-label={`Copy ${item.label} to clipboard`}
                                >
                                    {copiedValue === item.label ? (
                                        <FaCheck className="text-green-400 text-xs md:text-sm" /> // Success icon
                                    ) : (
                                        <FaCopy className="text-xs md:text-sm" /> // Default copy icon
                                    )}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}