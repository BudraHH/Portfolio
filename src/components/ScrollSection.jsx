import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../sections/Hero';
import About from "../sections/About.jsx";

export default function ScrollSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"]
    });

    // Hero expands and fades out - completes at 20%
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 5]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // About slides up from bottom - completes at 20%
    const aboutScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
    const aboutY = useTransform(scrollYProgress, [0, 0.2], [0, 0]);
    const aboutOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div ref={containerRef} className="relative">
            {/* Hero - expands and fades */}
            <motion.div
                className="w-screen h-screen fixed top-0 left-0"
                style={{
                    scale: heroScale,
                    opacity: heroOpacity,
                    zIndex: 5,
                }}
            >
                <Hero />
            </motion.div>

            {/* About - hovers over Hero */}
            <motion.div
                className="w-screen h-screen fixed top-0 left-0 right-0"
                style={{
                    scale: aboutScale,
                    y: aboutY,
                    opacity: aboutOpacity,
                    zIndex: 10,
                }}
                // initial={{scale: 0, opacity: 0}}
                // animate={{scale: 1, opacity: 1}}
            >
                <About />
            </motion.div>

            {/* Scrollable area */}
            <div className="h-[200vh]" />
        </div>
    );
}
