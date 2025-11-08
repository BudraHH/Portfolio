import { motion, useTransform } from "framer-motion";
import Info from "./Info.jsx";
import Terminal from "../components/Terminal.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import { useState, useEffect } from "react";

export function Rest({scrollProgress}) {
    // Auto mode: Terminal moves based on scroll
    const terminalXAuto = useTransform(
        scrollProgress,
        [0.26, 0.30, 0.36, 0.47, 0.49, 0.52, 0.55, 0.63, 0.66, 0.69, 0.75, 0.79, 0.82],
        [0, 50, 600, 800, 800, 600, 600, 800, 800, 600, 600, 800, 800]
    );

    // Manual mode (before 0.36): Terminal moves based on scroll
    const terminalXManual = useTransform(
        scrollProgress,
        [0.26, 0.30, 0.36],
        [0, 50, 650]
    );

    const terminalScale = useTransform(scrollProgress, [0.26, 0.30, 0.36], [1.5, 1.35, 1]);

    // Info section animations
    const aboutScale = useTransform(scrollProgress, [0.37, 0.47, 0.49, 0.57], [0, 1, 1, 1.5]);
    const aboutOpacity = useTransform(scrollProgress, [0.37, 0.47, 0.49, 0.57], [0, 1, 1, 0]);
    const aboutPointerEvents = useTransform(
        scrollProgress,
        [0.36, 0.47, 0.49, 0.58],
        ['none', 'auto', 'auto', 'none']
    );
    const aboutDisplay = useTransform(
        scrollProgress,
        [0.36, 0.37, 0.57, 0.58],
        ['none', 'flex', 'flex', 'none']
    );

    // Skills section animations
    const skillsScale = useTransform(scrollProgress, [0.53, 0.63, 0.66, 0.76], [0, 1, 1, 1.5]);
    const skillsOpacity = useTransform(scrollProgress, [0.53, 0.63, 0.66, 0.76], [0, 1, 1, 0]);
    const skillsPointerEvents = useTransform(
        scrollProgress,
        [0.52, 0.63, 0.66, 0.77],
        ['none', 'auto', 'auto', 'none']
    );
    const skillsDisplay = useTransform(
        scrollProgress,
        [0.52, 0.53, 0.76, 0.77],
        ['none', 'flex', 'flex', 'none']
    );

    // Projects section animations
    const projectsScale = useTransform(scrollProgress, [0.69, 0.79, 0.82, 0.95], [0, 1, 1, 1.5]);
    const projectsOpacity = useTransform(scrollProgress, [0.69, 0.79, 0.82, 0.95], [0, 1, 1, 0]);
    const projectsPointerEvents = useTransform(
        scrollProgress,
        [0.71, 0.75, 0.78, 0.86],
        ['none', 'auto', 'auto', 'none']
    );
    const projectsDisplay = useTransform(
        scrollProgress,
        [0.71, 0.72, 0.85, 0.86],
        ['none', 'flex', 'flex', 'none']
    );

    // State management
    const [isAuto, setIsAuto] = useState(true);
    const [manualX, setManualX] = useState(800);
    const [useManualPosition, setUseManualPosition] = useState(false);
    const [showProjects, setShowProjects] = useState(false);

    // ✅ Track when to switch from scroll-based to manual positioning
    useEffect(() => {
        if (!scrollProgress) return;

        // If in auto mode, always use scroll-based animation
        if (isAuto) {
            setUseManualPosition(false);
            return;
        }

        // Manual mode: listen to scroll progress
        const unsubscribe = scrollProgress.on("change", (latest) => {
            if (latest >= 0.36) {
                // After 36%, use manual position (user-controlled)
                setUseManualPosition(true);
            } else {
                // Before 36%, use scroll-based animation
                setUseManualPosition(false);
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, isAuto]);

    // ✅ Calculate terminal X position based on mode
    const getTerminalX = () => {
        if (isAuto) {
            return terminalXAuto;  // Auto: oscillates with scroll
        }

        if (useManualPosition) {
            return manualX;  // Manual + after 36%: user-controlled (650 or 800)
        }

        return terminalXManual;  // Manual + before 36%: scroll-based
    };

    return (
        <section className="relative w-full h-full flex flex-row justify-center items-center">

            {/* Info Section */}
            <motion.div
                className="absolute left-0 inset-0 flex items-center justify-start rounded-2xl"
                style={{
                    scale: aboutScale,
                    opacity: aboutOpacity,
                    zIndex: 2,
                    willChange: "transform, opacity",
                    pointerEvents: aboutPointerEvents,
                    display: aboutDisplay,
                }}
                transition={{duration: 0.8}}
            >
                <Info scrollProgress={scrollProgress} />
            </motion.div>

            {/* Skills Section */}
            <motion.div
                className="absolute inset-0 flex items-center justify-start rounded-2xl"
                style={{
                    scale: skillsScale,
                    opacity: skillsOpacity,
                    zIndex: 3,
                    willChange: "transform, opacity",
                    pointerEvents: skillsPointerEvents,
                    display: skillsDisplay,
                }}
                transition={{duration: 0.8}}
            >
                <Skills scrollProgress={scrollProgress} />
            </motion.div>

            {/* Projects Section - Only render when bash projects.sh is executed */}
            {showProjects && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-start rounded-2xl"
                    style={{
                        scale: projectsScale,
                        opacity: projectsOpacity,
                        zIndex: 4,
                        pointerEvents: projectsPointerEvents,
                        display: projectsDisplay,
                    }}
                    initial={{x: 600, scale: 0.25 }}
                    animate={{x:0, scale: 1}}
                    transition={{duration: 0.25}}
                >
                    <Projects />
                </motion.div>
            )}

            {/* Terminal */}
            <motion.div
                className="absolute flex justify-center items-center"
                style={{
                    x: getTerminalX(),  // ✅ Use function to calculate position
                    scale: terminalScale,
                    pointerEvents: "auto",
                    zIndex: 10
                }}
                transition={{
                    x: { type: "spring", stiffness: 100, damping: 15 },
                    scale: { duration: 0.8, ease: "easeInOut" }
                }}
            >
                <Terminal
                    scrollProgress={scrollProgress}
                    isAuto={isAuto}
                    setIsAuto={setIsAuto}
                    setManualX={setManualX}
                    onProjectsCommand={() => setShowProjects(true)}
                />
            </motion.div>
        </section>
    );
}
