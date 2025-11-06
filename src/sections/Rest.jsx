import { motion, useTransform } from "framer-motion";
import Info from "./Info.jsx";
import Terminal from "../components/Terminal.jsx";
import Projects from "./Projects.jsx";

export default function Rest({ scrollProgress }) {
    const terminalX = useTransform(scrollProgress, [0.26, 0.36], [0, 650]);
    const terminalScale = useTransform(scrollProgress, [0.26, 0.36], [1.5,1]);
    const aboutScale = useTransform(scrollProgress, [0.37, 0.47, 0.50, 0.57], [0, 1, 1, 1.5]);
    const aboutOpacity = useTransform(scrollProgress, [0.37, 0.47, 0.50, 0.57], [0, 1, 1, 0]);

    const projectsScale = useTransform(scrollProgress, [0.53, 0.67, 0.70, 0.77], [0, 1, 1, 1.5]);
    const projectsOpacity = useTransform(scrollProgress, [0.53, 0.67, 0.70, 0.77], [0, 1, 1, 0]);

    return (
        <section className="relative w-full h-full flex flex-row justify-start pointer-events-none">
            {/* Left animated stack */}
            {/*<div className="w-3/5 h-full bg-red-600 relative rounded-2xl overflow-hidden flex flex-col items-center justify-center">*/}
            {/*    /!* Info Card *!/*/}
            {/*    */}
            {/*</div>*/}

            <motion.div
                className="absolute left-0 inset-0 flex items-center justify-start rounded-2xl"
                style={{

                    scale: aboutScale,
                    opacity: aboutOpacity,
                    zIndex: 2,
                    willChange: "transform, opacity",
                }}
                transition={{ duration: 0.8 }}
            >
                <Info />
            </motion.div>
            {/* Projects Card */}
            <motion.div
                className="absolute inset-0 flex items-center justify-start rounded-2xl"
                style={{
                    scale: projectsScale,
                    opacity: projectsOpacity,
                    zIndex: 1,
                    willChange: "transform, opacity",
                }}
                transition={{ duration: 0.8 }}
            >
                <Projects />
            </motion.div>
            {/* Right motion terminal panel */}
            <motion.div
                className="absolute w-full h-full  flex justify-center items-center "
                style={{
                    x: terminalX,
                    scale: terminalScale,
                    pointerEvents: "auto",
                }}
            >
                <Terminal/>
            </motion.div>
        </section>
    );
}
