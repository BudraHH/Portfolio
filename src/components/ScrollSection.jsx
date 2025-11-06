import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../sections/Hero';
import Rest from "../sections/Rest.jsx";
export default function ScrollSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"]
    });

    // Animation transforms
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 5]);
    const heroRotateY = useTransform(scrollYProgress, [0, 0.2], [1, 5]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const restScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
    const restY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    const restOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div ref={containerRef} style={{ minHeight: "300vh" }}>
            {/* Fixed hero */}
            <motion.div
                className="fixed top-0 left-0 w-full h-screen z-50"
                style={{
                    scale: heroScale,
                    rotateY: heroRotateY,
                    opacity: heroOpacity,
                }}
            >
                <Hero />
            </motion.div>
            {/* Fixed/animated Rest (left-side) */}
            <motion.div
                className=" fixed left-0 right-0 w-full h-screen pointer-events-none"
                style={{
                    scale: restScale,
                    y: restY,
                    opacity: restOpacity,
                    zIndex: 10,
                }}
            >
                <Rest scrollProgress={scrollYProgress}/>
            </motion.div>
        </div>
    );
}
