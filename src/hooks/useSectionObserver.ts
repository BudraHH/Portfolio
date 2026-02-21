import { useState, useEffect, useRef } from 'react';

interface UseSectionObserverProps {
    sectionIds: string[];
    homeSectionId: string;
}

export function useSectionObserver({ sectionIds, homeSectionId }: UseSectionObserverProps) {
    const [activeSection, setActiveSection] = useState<string>('');
    const suppressHashUpdate = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Priority 1: Check if we are inside the HeroAbout container for precise Home/About selection
                const heroAboutContainer = document.querySelector('section[data-section="hero-about"]') as HTMLElement;
                if (heroAboutContainer) {
                    const rect = heroAboutContainer.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // If the container is in view/sticky
                    if (rect.top <= 64 && rect.bottom >= 0) {
                        const containerHeight = rect.height;
                        const stickyOffset = 64;
                        const containerTop = heroAboutContainer.offsetTop;

                        const scrollStart = containerTop - stickyOffset;
                        const scrollEnd = containerTop + containerHeight - windowHeight;
                        const currentScroll = window.scrollY;

                        const progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / (scrollEnd - scrollStart)));

                        // Switch to 'About' once the slide has progressed substantially (0.4 is the sweet spot in 3-phase)
                        const id = progress > 0.4 ? 'about' : homeSectionId;

                        if (activeSection !== id) {
                            setActiveSection(id);
                            if (!suppressHashUpdate.current) {
                                if (id === homeSectionId) {
                                    if (window.location.hash) {
                                        window.history.replaceState(null, '', window.location.pathname);
                                    }
                                } else {
                                    window.history.replaceState(null, '', `#${id}`);
                                }
                            }
                        }
                        return; // Found our state, no need to process other intersections
                    }
                }

                // Priority 2: If we are at the very top, always favor Home
                if (window.scrollY < 100) {
                    setActiveSection(homeSectionId);
                    if (!suppressHashUpdate.current && window.location.hash) {
                        window.history.replaceState(null, '', window.location.pathname);
                    }
                    return;
                }

                // Priority 3: Standard intersection logic for other sections
                const bestEntry = entries.reduce((prev, current) => {
                    return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
                }, entries[0]);

                if (bestEntry && bestEntry.isIntersecting && bestEntry.intersectionRatio > 0.1) {
                    const id = bestEntry.target.id;

                    // Skip if we're in the Hero/About range as it's handled above
                    if (id === 'about' || id === homeSectionId) return;

                    setActiveSection(id);

                    if (suppressHashUpdate.current) return;

                    const currentHash = window.location.hash.substring(1);
                    if (id !== currentHash) {
                        window.history.replaceState(null, '', `#${id}`);
                    }
                }
            },
            {
                threshold: [0, 0.1, 0.2, 0.5, 0.8, 1],
                rootMargin: '-10% 0px -40% 0px'
            }
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sectionIds, homeSectionId, activeSection]);

    return [activeSection, setActiveSection, suppressHashUpdate] as const;
}
