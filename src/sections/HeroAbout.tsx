import { useRef, useState, useEffect } from 'react';
import { About } from "./About";
import { Hero } from "./Hero";

export default function HeroAbout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = containerRef.current.offsetTop;
            const containerHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress based on global scroll position relative to container start
            // We start transition when the container top hits the sticky offset (64px)
            const stickyOffset = 64;
            const scrollStart = containerTop - stickyOffset;
            const scrollEnd = containerTop + containerHeight - windowHeight;

            const currentScroll = window.scrollY;
            const progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / (scrollEnd - scrollStart)));

            setProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ─── Animation Logic ──────────────────────────────────────────────────────

    // Map progress (0-1) to specific ranges manually (equivalent to useTransform)
    const getMapValue = (value: number, input: [number, number], output: [number | string, number | string]) => {
        const [inMin, inMax] = input;
        const [outMin, outMax] = output;

        // Clamp and normalize
        const p = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));

        if (typeof outMin === 'string' && typeof outMax === 'string') {
            const minNum = parseFloat(outMin);
            const maxNum = parseFloat(outMax);
            return `${minNum + (maxNum - minNum) * p}%`;
        }

        return (outMin as number) + ((outMax as number) - (outMin as number)) * p;
    };

    // 1. Hero Vertical Scroll (Left Column): 0% to 30%
    const heroContentY = getMapValue(progress, [0, 0.30], ["0%", "-50%"]);

    // 2. Horizontal Slide: 30% to 50%
    const xTransform = getMapValue(progress, [0.30, 0.50], ["0%", "-25%"]);

    // 3. About Vertical Scroll: 50% to 95%
    // Since About now has 2 sections stacked vertically (200% height), we scroll to -50%
    const aboutContentY = getMapValue(progress, [0.55, 0.95], ["0%", "-50%"]);


    return (
        <section ref={containerRef} data-section="hero-about" className="relative h-[600vh]">
            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
                <div
                    style={{ transform: `translateX(${xTransform})` }}
                    className="flex w-[200%] h-full will-change-transform"
                >
                    {/* Hero Slide */}
                    <div className="w-1/2 h-full shrink-0 relative bg-background">
                        <Hero manualY={heroContentY} />
                    </div>

                    {/* About Slide (Strictly 50vw) */}
                    <div className="w-1/4 h-full shrink-0 bg-background border-l border-border">
                        <About manualY={aboutContentY} />
                    </div>
                </div>
            </div>
        </section>
    );
}