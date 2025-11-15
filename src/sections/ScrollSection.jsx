import { useRef, useMemo, memo, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Hero from './Hero.jsx';
import { Rest } from "./Rest.jsx";

// 1. New component to display scroll progress
const ScrollProgressDisplay = memo(({ scrollYProgress }) => {
    const [progress, setProgress] = useState(0);

    // Listen for changes in the scrollYProgress MotionValue
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Format the value to two decimal places and update the state
        setProgress(latest.toFixed(2));
    });

    return (
        <div className="fixed right-0 top-0 z-[100]  h-14 w-14
        flex items-center justify-center text-white font-bold text-lg">
            {progress}
        </div>
    );
});
ScrollProgressDisplay.displayName = 'ScrollProgressDisplay';


// Memoized Hero wrapper
const HeroSection = memo(({ scale, opacity, pointerEvents }) => (
    <motion.div
        className="fixed inset-0 w-full h-full z-50 overflow-hidden"
        style={{ scale, opacity, pointerEvents }}
    >
        <Hero />
    </motion.div>
));

HeroSection.displayName = 'HeroSection';

// Memoized Rest wrapper
const RestSection = memo(({ scale, opacity, pointerEvents, scrollProgress, scrollToProgress }) => (
    <motion.div
        className="fixed inset-0 w-full h-full z-10 overflow-hidden"
        style={{ scale, opacity, pointerEvents }}
    >
        <Rest scrollProgress={scrollProgress} scrollToProgress={scrollToProgress} />
    </motion.div>
));

RestSection.displayName = 'RestSection';

export default function ScrollSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"]
    });

    // Function to scroll to a specific scrollProgress value (0-1)
    const scrollToProgress = useMemo(() => {
        return (targetProgress) => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const viewportHeight = window.innerHeight;
            const containerHeight = container.scrollHeight;
            const scrollableHeight = containerHeight - viewportHeight;

            const targetScrollY = targetProgress * scrollableHeight;
            const clampedScrollY = Math.max(0, Math.min(targetScrollY, scrollableHeight));

            window.scrollTo({
                top: clampedScrollY,
                behavior: 'smooth'
            });
        };
    }, []);

    // Memoized transform configurations
    const transformConfig = useMemo(() => ({
        hero: {
            scale: { input: [0, 0.05], output: [1, 5] },
            opacity: { input: [0, 0.05], output: [1, 0] },
            pointerEvents: { input: [0, 0.05], output: ['auto', 'none'] }
        },
        rest: {
            scale: { input: [0.035, 0.05], output: [0.25, 1] },
            opacity: { input: [0.035, 0.05], output: [0.25, 1] },
            pointerEvents: { input: [0.035, 0.05], output: ['none', 'auto'] }
        }
    }), []);

    // Hero transforms
    const heroScale = useTransform(
        scrollYProgress,
        transformConfig.hero.scale.input,
        transformConfig.hero.scale.output
    );
    const heroOpacity = useTransform(
        scrollYProgress,
        transformConfig.hero.opacity.input,
        transformConfig.hero.opacity.output
    );
    const heroPointerEvents = useTransform(
        scrollYProgress,
        transformConfig.hero.pointerEvents.input,
        transformConfig.hero.pointerEvents.output
    );

    // Rest transforms
    const restScale = useTransform(
        scrollYProgress,
        transformConfig.rest.scale.input,
        transformConfig.rest.scale.output
    );
    const restOpacity = useTransform(
        scrollYProgress,
        transformConfig.rest.opacity.input,
        transformConfig.rest.opacity.output
    );
    const restPointerEvents = useTransform(
        scrollYProgress,
        transformConfig.rest.pointerEvents.input,
        transformConfig.rest.pointerEvents.output
    );

    return (
        <div
            ref={containerRef}
            className="relative min-h-[1000vh] w-full overflow-x-hidden"
        >
            {/* 2. Replace the old div with our new component */}
            <ScrollProgressDisplay scrollYProgress={scrollYProgress} />

            {/* Hero Section */}
            <HeroSection
                scale={heroScale}
                opacity={heroOpacity}
                pointerEvents={heroPointerEvents}
            />

            {/* Rest Section */}
            <RestSection
                scale={restScale}
                opacity={restOpacity}
                pointerEvents={restPointerEvents}
                scrollProgress={scrollYProgress}
                scrollToProgress={scrollToProgress}
            />
        </div>
    );
}
