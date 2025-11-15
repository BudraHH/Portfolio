import { motion, useTransform } from "framer-motion";
import { useState, useEffect, useMemo, memo } from "react";
import Info from "./Info.jsx";
import Terminal from "../components/Terminal.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import CareerJourney from "./CareerJourney.jsx";
import Contact from "./Contact.jsx";
import Closing from "./Closing.jsx";

// Memoized section wrapper to prevent unnecessary re-renders
const Section = memo(({
                          show,
                          scale,
                          opacity,
                          pointerEvents,
                          display,
                          zIndex,
                            xPosition,
                          children
                      }) => {
    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 w-full h-full md:p-16 flex items-center justify-center overflow-hidden"
            style={{ scale, opacity, zIndex, pointerEvents, display,
                        x: xPosition}}

            transition={{ duration: 0.25 }}
        >
            {children}
        </motion.div>
    );
});

Section.displayName = 'Section';

export function Rest({ scrollProgress, scrollToProgress }) {
    // State management
    const [isAuto, setIsAuto] = useState(true);
    const [manualX, setManualX] = useState(800);
    const [useManualPosition, setUseManualPosition] = useState(false);
    const [activeSections, setActiveSections] = useState({
        info: false,
        skills: false,
        journey: false,
        projects: false,
        contact: false,
        closing: false
    });

    // Memoized transform configurations
    const transforms = useMemo(() => ({
        terminalXAuto:       [0.10,0.115,0.15, 0.195, 0.20, 0.245, 0.26 ],
        terminalXAutoValues: [0,   50,  400,  400,  800,  800,  400],
        terminalXManual: [0.26, 0.30, 0.36],
        terminalXManualValues: [0, 50, 650],
        terminalScale: [0.10,0.115,0.15],
        terminalScaleValues: [1.5,1.2,1],

        info: { scale: [0.18, 0.20, 0.24,0.26], values: [0, 1, 1, 1.5],
            opacity: [0.18, 0.20, 0.24,0.26], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.18, 0.20, 0.24,0.26], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.18, 0.20, 0.24,0.26], displayValues: ['none', 'flex', 'flex', 'none'] ,
            infoX: [0.18, 0.20, 0.24,0.26],infoXValues: [400,0,0,800], },

        skills: { scale: [0.27, 0.29, 0.35, 0.37], values: [0, 1, 1, 1.5],
            opacity: [0.27, 0.29, 0.35, 0.37], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.27, 0.29, 0.35, 0.37], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.27, 0.29, 0.35, 0.37], displayValues: ['none', 'flex', 'flex', 'none'] },
            skillsX: [0.27, 0.29, 0.35, 0.37], skillsXValues: [400,0,0,800],

        journey: { scale: [0.69, 0.79, 0.82, 0.87], values: [0, 1, 1, 1.5],
            opacity: [0.69, 0.79, 0.82, 0.87], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.68, 0.79, 0.82, 0.88], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.68, 0.69, 0.87, 0.88], displayValues: ['none', 'flex', 'flex', 'none'] },

        projects: { scale: [0.87, 0.93, 0.95, 0.99], values: [0, 1, 1, 1.5],
            opacity: [0.87, 0.93, 0.95, 0.99], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.87, 0.93, 0.95, 0.99], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.86, 0.87, 0.99, 1.0], displayValues: ['none', 'flex', 'flex', 'none'] },

        contact: { scale: [0.98, 1.0], values: [0, 1],
            opacity: [0.98, 1.0], opacityValues: [0, 1],
            pointerEvents: [0.98, 1.0], pointerValues: ['none', 'auto'],
            display: [0.97, 0.98, 1.0, 1.01], displayValues: ['none', 'flex', 'flex', 'flex'] }
    }), []);

    // Create transforms
    const terminalXAuto = useTransform(scrollProgress, transforms.terminalXAuto, transforms.terminalXAutoValues);
    const terminalXManual = useTransform(scrollProgress, transforms.terminalXManual, transforms.terminalXManualValues);
    const terminalScale = useTransform(scrollProgress, transforms.terminalScale, transforms.terminalScaleValues);

    const infoScale = useTransform(scrollProgress, transforms.info.scale, transforms.info.values);
    const infoOpacity = useTransform(scrollProgress, transforms.info.opacity, transforms.info.opacityValues);
    const infoPointerEvents = useTransform(scrollProgress, transforms.info.pointerEvents, transforms.info.pointerValues);
    const infoDisplay = useTransform(scrollProgress, transforms.info.display, transforms.info.displayValues);
    const infoX = useTransform(scrollProgress, transforms.info.infoX, transforms.info.infoXValues);

    const skillsScale = useTransform(scrollProgress, transforms.skills.scale, transforms.skills.values);
    const skillsOpacity = useTransform(scrollProgress, transforms.skills.opacity, transforms.skills.opacityValues);
    const skillsPointerEvents = useTransform(scrollProgress, transforms.skills.pointerEvents, transforms.skills.pointerValues);
    const skillsDisplay = useTransform(scrollProgress, transforms.skills.display, transforms.skills.displayValues);
    const skillsX = useTransform(scrollProgress, transforms.skillsX, transforms.skillsXValues);

    const journeyScale = useTransform(scrollProgress, transforms.journey.scale, transforms.journey.values);
    const journeyOpacity = useTransform(scrollProgress, transforms.journey.opacity, transforms.journey.opacityValues);
    const journeyPointerEvents = useTransform(scrollProgress, transforms.journey.pointerEvents, transforms.journey.pointerValues);
    const journeyDisplay = useTransform(scrollProgress, transforms.journey.display, transforms.journey.displayValues);

    const projectsScale = useTransform(scrollProgress, transforms.projects.scale, transforms.projects.values);
    const projectsOpacity = useTransform(scrollProgress, transforms.projects.opacity, transforms.projects.opacityValues);
    const projectsPointerEvents = useTransform(scrollProgress, transforms.projects.pointerEvents, transforms.projects.pointerValues);
    const projectsDisplay = useTransform(scrollProgress, transforms.projects.display, transforms.projects.displayValues);

    const contactScale = useTransform(scrollProgress, transforms.contact.scale, transforms.contact.values);
    const contactOpacity = useTransform(scrollProgress, transforms.contact.opacity, transforms.contact.opacityValues);
    const contactPointerEvents = useTransform(scrollProgress, transforms.contact.pointerEvents, transforms.contact.pointerValues);
    const contactDisplay = useTransform(scrollProgress, transforms.contact.display, transforms.contact.displayValues);

    const [startDisplaySkills, setStartDisplaySkills] = useState(false);
    // Track scroll and manual mode, manage section visibility
    useEffect(() => {
        if (!scrollProgress) return;

        let scrollEndTimer;
        let rafId = null;

        const handleScroll = (latest) => {
            // Update manual position mode
            if (!isAuto && latest >= 0.26) {
                setUseManualPosition(true);
            } else if (!isAuto && latest < 0.26) {
                setUseManualPosition(false);
            }

            // Manage section visibility based on scroll progress
            // Sections are shown/hidden based on their display ranges
            setActiveSections((prev) => {
                const newState = { ...prev };

                // Info section: display [0.36, 0.37, 0.57, 0.58]
                if (latest >= 0.18 && latest <= 0.26) {
                    if (!prev.info) newState.info = true;
                } else if (latest < 0.18 || latest > 0.26) {
                    if (prev.info) newState.info = false;
                }

                // Skills section: display [0.52, 0.53, 0.76, 0.77]
                if (latest >= 0.27 && latest <= 0.37) {
                    if (!prev.skills) newState.skills = true;
                    if (latest >= 0.29) setStartDisplaySkills(true);
                } else if (latest < 0.27 || latest > 0.37) {
                    if (prev.skills) newState.skills = false;
                    setStartDisplaySkills(false);
                }

                // Journey section: display [0.68, 0.69, 0.87, 0.88]
                if (latest >= 0.68 && latest <= 0.88) {
                    if (!prev.journey) newState.journey = true;
                } else if (latest < 0.68 || latest > 0.88) {
                    if (prev.journey) newState.journey = false;
                }

                // Projects section: display [0.87, 0.88, 0.98, 0.99]
                if (latest >= 0.87 && latest <= 0.99) {
                    if (!prev.projects) newState.projects = true;
                } else if (latest < 0.87 || latest > 0.99) {
                    if (prev.projects) newState.projects = false;
                }

                // Contact section: display [0.98, 0.99]
                if (latest >= 0.98) {
                    if (!prev.contact) newState.contact = true;
                } else if (latest < 0.98) {
                    if (prev.contact) newState.contact = false;
                }

                // Show closing when scrolled to the fullest (>= 99%)
                if (latest >= 0.99 && !prev.closing) {
                    if (scrollEndTimer) clearTimeout(scrollEndTimer);
                    scrollEndTimer = setTimeout(() => {
                        setActiveSections((p) => ({ ...p, closing: true }));
                    }, 300);
                } else if (latest < 0.99 && prev.closing) {
                    newState.closing = false;
                }

                return newState;
            });
        };

        const unsubscribe = scrollProgress.on("change", (latest) => {
            // Use requestAnimationFrame for smoother updates
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => handleScroll(latest));
        });

        return () => {
            unsubscribe();
            if (scrollEndTimer) clearTimeout(scrollEndTimer);
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [scrollProgress, isAuto]);

    // Reset manual position when switching to auto
    useEffect(() => {
        if (isAuto) {
            setUseManualPosition(false);
        }
    }, [isAuto]);

    // Calculate terminal X position
    const terminalX = useMemo(() => {
        if (isAuto) return terminalXAuto;
        if (useManualPosition) return manualX;
        return terminalXManual;
    }, [isAuto, useManualPosition, manualX, terminalXAuto, terminalXManual]);

    // Memoized callbacks
    const handleShowSection = useMemo(() => ({
        info: () => setActiveSections(prev => ({ ...prev, info: true })),
        skills: () => setActiveSections(prev => ({ ...prev, skills: true })),
        journey: () => setActiveSections(prev => ({ ...prev, journey: true })),
        projects: () => setActiveSections(prev => ({ ...prev, projects: true })),
        contact: () => setActiveSections(prev => ({ ...prev, contact: true }))
    }), []);


    return (
        <section className="fixed inset-0 w-full h-full flex justify-center items-center overflow-hidden">
            {/* Info Section */}
            <Section
                show={activeSections.info}
                scale={infoScale}
                opacity={infoOpacity}
                pointerEvents={infoPointerEvents}
                display={infoDisplay}
                zIndex={2}
                xPosition={infoX}
            >
                <Info scrollProgress={scrollProgress} sectionScrollRange={[0.20,0.24]} />
            </Section>

            {/* Skills Section */}
            <Section
                show={activeSections.skills}
                scale={skillsScale}
                opacity={skillsOpacity}
                pointerEvents={skillsPointerEvents}
                display={skillsDisplay}
                zIndex={3}
                xPosition={skillsX}
            >
                <Skills scrollProgress={scrollProgress} sectionScrollRange={[0.30, 0.34]} startDisplay={startDisplaySkills} />
            </Section>

            {/*/!* Projects Section *!/*/}
            {/*<Section*/}
            {/*    show={activeSections.projects}*/}
            {/*    scale={projectsScale}*/}
            {/*    opacity={projectsOpacity}*/}
            {/*    pointerEvents={projectsPointerEvents}*/}
            {/*    display={projectsDisplay}*/}
            {/*    zIndex={4}*/}
            {/*>*/}
            {/*    <Projects scrollProgress={scrollProgress} sectionScrollRange={[0.87, 0.99]} />*/}
            {/*</Section>*/}

            {/*/!* Journey Section *!/*/}
            {/*<Section*/}
            {/*    show={activeSections.journey}*/}
            {/*    scale={journeyScale}*/}
            {/*    opacity={journeyOpacity}*/}
            {/*    pointerEvents={journeyPointerEvents}*/}
            {/*    display={journeyDisplay}*/}
            {/*    zIndex={5}*/}
            {/*>*/}
            {/*    <CareerJourney */}
            {/*        scrollProgress={scrollProgress} */}
            {/*        sectionScrollRange={[0.68, 0.88]}*/}
            {/*        onScrollProgressChange={scrollToProgress}*/}
            {/*    />*/}
            {/*</Section>*/}



            {/*/!* Contact Section *!/*/}
            {/*<Section*/}
            {/*    show={activeSections.contact}*/}
            {/*    scale={contactScale}*/}
            {/*    opacity={contactOpacity}*/}
            {/*    pointerEvents={contactPointerEvents}*/}
            {/*    display={contactDisplay}*/}
            {/*    zIndex={6}*/}
            {/*>*/}
            {/*    <Contact />*/}
            {/*</Section>*/}

            {/*/!* Closing Section *!/*/}
            {/*{activeSections.closing && (*/}
            {/*    <motion.div*/}
            {/*        className="fixed inset-0 z-50 overflow-hidden"*/}
            {/*        initial={{ opacity: 0 }}*/}
            {/*        animate={{ opacity: 1 }}*/}
            {/*        transition={{ duration: 0.5 }}*/}
            {/*        zIndex={7}*/}
            {/*    >*/}
            {/*        <Closing scrollProgress={scrollProgress} />*/}
            {/*    </motion.div>*/}
            {/*)}*/}

            {/* Terminal */}
            <motion.div
                className="absolute flex justify-center items-center touch-none"
                style={{
                    x: terminalX,
                    scale: terminalScale,
                    pointerEvents: "auto",
                    zIndex: 10
                }}
                transition={{
                    x: { type: "spring", stiffness: 100, damping: 15 },
                    scale: { duration: 0.8, ease: "easeInOut" }
                }}
            >
                <div className="w-full max-w-[95vw] h-full p-16 sm:max-w-none flex justify-center items-center">
                    <Terminal
                        scrollProgress={scrollProgress}
                        isAuto={isAuto}
                        setIsAuto={setIsAuto}
                        setManualX={setManualX}
                        onInfoCommand={handleShowSection.info}
                        onSkillsCommand={handleShowSection.skills}
                        onCareerJourneyCommand={handleShowSection.journey}
                        onProjectsCommand={handleShowSection.projects}
                        onContactCommand={handleShowSection.contact}
                    />
                </div>
            </motion.div>
        </section>
    );
}
