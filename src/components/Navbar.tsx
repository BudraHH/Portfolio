import { ModeToggle } from '@/components/theme/ModeToggle';
import { SECTIONS, NAV_LINKS } from '../utils/constants';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionObserver } from '../hooks/useSectionObserver';


export function Navbar({ welcomeRendered }: { welcomeRendered: boolean }) {
    const [activeSection, setActiveSection, suppressHashUpdate] = useSectionObserver({
        sectionIds: NAV_LINKS.map(link => link.id),
        homeSectionId: SECTIONS.HOME
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isProgrammaticScroll = useRef(false);
    const activeSectionRef = useRef(activeSection);

    useEffect(() => {
        activeSectionRef.current = activeSection;
    }, [activeSection]);

    useEffect(() => {
        const handleHashChange = () => {
            if (isProgrammaticScroll.current) return;

            const id = window.location.hash.substring(1) || SECTIONS.HOME;
            // Only scroll if we aren't already there (prevents loops)
            if (activeSectionRef.current !== id) {
                // Pass false to updateHash because the hash has already changed externally
                scrollToSection(id, false);
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        // Handle initial hash on load
        if (window.location.hash) {
            handleHashChange();
        }

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []); // Listener set up once

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const scrollToSection = (id: string, updateHash = true) => {
        setIsMenuOpen(false);
        isProgrammaticScroll.current = true;
        suppressHashUpdate.current = true;

        const finishScroll = () => {
            setTimeout(() => {
                isProgrammaticScroll.current = false;
                suppressHashUpdate.current = false;
            }, 800); // Buffer long enough for smooth scroll to complete
        };

        if (id === SECTIONS.HOME) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection(id);
            if (updateHash && window.location.hash) {
                window.history.pushState(null, '', window.location.pathname);
            }
            finishScroll();
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            // Handle special case for 'About' inside the HeroAbout scroll container
            if (id === SECTIONS.ABOUT) {
                // Find the main HeroAbout scroll container using its data attribute
                const container = element.closest('section[data-section="hero-about"]') as HTMLElement;

                if (container) {
                    // Calculate precise scroll target for 0.9 progress to align with HeroAbout's animation logic
                    const stickyOffset = 64;
                    const scrollStart = container.offsetTop - stickyOffset;
                    const scrollEnd = container.offsetTop + container.offsetHeight - window.innerHeight;
                    const targetScroll = scrollStart + 0.55 * (scrollEnd - scrollStart);

                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    setActiveSection(id);
                    if (updateHash) {
                        window.history.pushState(null, '', `#${id}`);
                    }
                    finishScroll();
                    return;
                }
            }

            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            if (updateHash) {
                window.history.pushState(null, '', `#${id}`);
            }
            finishScroll();
        } else {
            isProgrammaticScroll.current = false;
        }
    };

    return (
        <div className="sticky top-0 w-full border-b bg-background z-50 ">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 w-1/4 md:w-1/6">
                    <div
                        onClick={() => scrollToSection(SECTIONS.HOME)}
                        className="group flex items-baseline gap-0.5 font-bold tracking-tight text-lg cursor-pointer"
                    >
                        Budra
                        <div className="h-2 w-2 rounded-full bg-primary transition-all group-hover:bg-red-800" />
                    </div>
                </div>

                {welcomeRendered && (
                    <nav className="hidden lg:flex justify-center items-center gap-1 text-sm font-medium text-muted-foreground w-4/6">
                        {NAV_LINKS.map((nav) => (
                            <button
                                key={nav.id}
                                onClick={() => scrollToSection(nav.id)}
                                className={`px-4 py-1 xl:py-2 text-xs  rounded cursor-pointer transition-all duration-300 hover:bg-accent hover:text-accent-foreground ${activeSection === nav.id ? 'bg-accent text-accent-foreground font-semibold' : ''}`}
                            >
                                {nav.label}
                            </button>
                        ))}
                    </nav>
                )}

                <div className="flex justify-end items-center gap-2 w-1/4 md:w-1/6">
                    <ModeToggle />
                    {welcomeRendered && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className=" lg:hidden hover:bg-accent rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-16 z-50 lg:hidden bg-background h-full flex flex-col p-6 sm:p-8 gap-6"
                    >
                        <div className="flex flex-col gap-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2">Navigation</p>
                            {NAV_LINKS.map((nav, index) => (
                                <motion.button
                                    key={nav.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(nav.id)}
                                    className={`w-full text-left py-4 border-b border-border text-sm font-black uppercase tracking-tighter transition-all ${activeSection === nav.id ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    {nav.label}
                                </motion.button>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
