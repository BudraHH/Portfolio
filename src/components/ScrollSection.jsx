import {useRef, useState} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../sections/Hero';
import { Rest } from "../sections/Rest.jsx";

export default function ScrollSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"]
    });


    // Animation transforms for Hero
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 5]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Disable Hero pointer events as it fades out
    const heroPointerEvents = useTransform(
        scrollYProgress,
        [0, 0.1],
        ['auto', 'none']
    );

    // Animation transforms for Rest
    const restScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
    const restOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Enable Rest pointer events after Hero fades
    const restPointerEvents = useTransform(
        scrollYProgress,
        [0.15, 0.2],
        ['none', 'auto']
    );

    return (
        <div ref={containerRef} style={{ minHeight: "300vh" }}>
            {/* Fixed hero */}
            <motion.div
                className="fixed top-0 left-0 w-full h-screen z-50"
                style={{
                    scale: heroScale,
                    opacity: heroOpacity,
                    pointerEvents: heroPointerEvents,
                }}
            >
                <Hero />
            </motion.div>

            {/* Fixed/animated Rest (left-side) */}
            <motion.div
                className="fixed left-0 right-0 w-full h-screen"
                style={{
                    scale: restScale,
                    opacity: restOpacity,
                    zIndex: 10,
                    pointerEvents: restPointerEvents,
                }}
            >
                <Rest scrollProgress={scrollYProgress}/>
            </motion.div>
        </div>
    );
}
