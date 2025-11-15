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
    
    // Track executed sections with execution order for z-index stacking
    const [executedSections, setExecutedSections] = useState([]); // Array of section names in execution order
    
    // Derived state: active sections based on execution state
    const activeSections = useMemo(() => {
        const sections = {
            info: false,
            skills: false,
            journey: false,
            projects: false,
            contact: false,
            closing: false
        };
        
        if (isAuto) {
            // Auto mode: only show the most recently executed section
            if (executedSections.length > 0) {
                const lastSection = executedSections[executedSections.length - 1];
                sections[lastSection] = true;
            }
        } else {
            // Manual mode: show all executed sections
            executedSections.forEach(section => {
                sections[section] = true;
            });
        }
        
        return sections;
    }, [executedSections, isAuto]);

    // Memoized transform configurations
    const transforms = useMemo(() => ({
        terminalXAuto:       [0.10,0.115,0.15, 0.16, 0.17, 0.20, 0.21, 0.25, 0.26, 0.30, 0.31, 0.35, 0.36, 0.40, 0.41, 0.45, 0.46, 0.50, 0.51, 0.55, 0.56, 0.60, 0.61],
        terminalXAutoValues: [0,   50,   400,  400,   800, 800,  400,  400,  800,  800,  400,  400,  800,  800,  400,  400,  800,  800,  400,  400,  800,  800,  400],
        terminalXManual: [0.26, 0.30, 0.36],
        terminalXManualValues: [0, 50, 650],
        terminalScale: [0.10,0.115,0.15],
        terminalScaleValues: [1.5,1.2,1],

        info: {
            scale: [0.18, 0.20, 0.24,0.26], values: [0, 1, 1, 1.5],
            opacity: [0.18, 0.20, 0.24,0.26], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.18, 0.20, 0.24,0.26], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.18, 0.20, 0.24,0.26], displayValues: ['none', 'flex', 'flex', 'none'] ,
            infoX: [0.18, 0.20, 0.24,0.26],infoXValues: [400,0,0,800], },

        skills: {
            scale: [0.27, 0.29, 0.35, 0.37], values: [0, 1, 1, 1.5],
            opacity: [0.27, 0.29, 0.35, 0.37], opacityValues: [0, 1, 1, 0],
            pointerEvents: [0.27, 0.29, 0.35, 0.37], pointerValues: ['none', 'auto', 'auto', 'none'],
            display: [0.27, 0.29, 0.35, 0.37], displayValues: ['none', 'flex', 'flex', 'none'] },
            skillsX: [0.27, 0.29, 0.35, 0.37], skillsXValues: [400,0,0,800],

        journey: {
            scale: [0.37, 0.79, 0.82, 0.87], values: [0, 1, 1, 1.5],
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

    const [infoPid, setInfoPid] = useState(0);
    const [skillsPid, setSkillsPid] = useState(0);
    const [journeyPid, setJourneyPid] = useState(0);
    const [projectsPid, setProjectsPid] = useState(0);
    const [contactPid, setContactPid] = useState(0);
    const [displayEnd, setDisplayEnd] = useState(false);
    // Track scroll for manual position mode only (not for section visibility)
    useEffect(() => {
        if (!scrollProgress) return;

        let rafId = null;

        const handleScroll = (latest) => {
            // Update manual position mode
            if (!isAuto && latest >= 0.26) {
                setUseManualPosition(true);
            } else if (!isAuto && latest < 0.26) {
                setUseManualPosition(false);
            }
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

    // Memoized callbacks to track section execution
    const handleShowSection = useMemo(() => ({
        info: (shouldShow = true) => {
            setExecutedSections(prev => {
                if (!shouldShow) {
                    // Close section
                    return prev.filter(s => s !== 'info');
                }
                if (isAuto) return ['info'];
                if (!prev.includes('info')) return [...prev, 'info'];
                return prev;
            });
        },
        skills: (shouldShow = true) => {
            setExecutedSections(prev => {
                if (!shouldShow) return prev.filter(s => s !== 'skills');
                if (isAuto) return ['skills'];
                if (!prev.includes('skills')) return [...prev, 'skills'];
                return prev;
            });
        },
        journey: (shouldShow = true) => {
            setExecutedSections(prev => {
                if (!shouldShow) return prev.filter(s => s !== 'journey');
                if (isAuto) return ['journey'];
                if (!prev.includes('journey')) return [...prev, 'journey'];
                return prev;
            });
        },
        projects: (shouldShow = true) => {
            setExecutedSections(prev => {
                if (!shouldShow) return prev.filter(s => s !== 'projects');
                if (isAuto) return ['projects'];
                if (!prev.includes('projects')) return [...prev, 'projects'];
                return prev;
            });
        },
        contact: (shouldShow = true) => {
            setExecutedSections(prev => {
                if (!shouldShow) return prev.filter(s => s !== 'contact');
                if (isAuto) return ['contact'];
                if (!prev.includes('contact')) return [...prev, 'contact'];
                return prev;
            });
        }
    }), [isAuto]);



    // Calculate z-index for manual mode (most recent on top)
    const getSectionZIndex = useMemo(() => {
        return (sectionName) => {
            if (!activeSections[sectionName]) return 1;
            if (isAuto) {
                // Auto mode: all visible sections have same z-index (only one visible)
                return 2;
            } else {
                // Manual mode: z-index based on execution order (most recent highest)
                const index = executedSections.indexOf(sectionName);
                if (index >= 0) {
                    // Most recent (last in array) has highest z-index
                    // If executedSections = ['info', 'skills', 'projects']:
                    // 'info' (index 0) gets z-index 10, 'skills' (index 1) gets 11, 'projects' (index 2) gets 12 (highest)
                    return 10 + index;
                }
                return 1;
            }
        };
    }, [activeSections, isAuto, executedSections]);

    return (
        <section className="fixed inset-0 w-full h-full flex justify-center items-center overflow-hidden">
            {/* Info Section */}
            <Section
                show={activeSections.info}
                scale={activeSections.info ? 1 : infoScale}
                opacity={activeSections.info ? 1 : infoOpacity}
                pointerEvents={activeSections.info ? 'auto' : infoPointerEvents}
                display={activeSections.info ? 'flex' : infoDisplay}
                zIndex={getSectionZIndex('info')}
                xPosition={activeSections.info ? 0 : infoX}
            >
                <Info
                    // scrollProgress={scrollProgress}
                    // sectionScrollRange={[0.20,0.24]}
                    pid={infoPid}
                />
            </Section>

            {/* Skills Section */}
            <Section
                show={activeSections.skills}
                scale={activeSections.skills ? 1 : skillsScale}
                opacity={activeSections.skills ? 1 : skillsOpacity}
                pointerEvents={activeSections.skills ? 'auto' : skillsPointerEvents}
                display={activeSections.skills ? 'flex' : skillsDisplay}
                zIndex={getSectionZIndex('skills')}
                xPosition={activeSections.skills ? 0 : skillsX}
            >
                <Skills
                    // scrollProgress={scrollProgress}
                    // sectionScrollRange={[0.30, 0.34]}
                    pid={skillsPid}
                />
            </Section>

            {/* Journey Section */}
            <Section
                show={activeSections.journey}
                scale={activeSections.journey ? 1 : journeyScale}
                opacity={activeSections.journey ? 1 : journeyOpacity}
                pointerEvents={activeSections.journey ? 'auto' : journeyPointerEvents}
                display={activeSections.journey ? 'flex' : journeyDisplay}
                zIndex={getSectionZIndex('journey')}
                xPosition={activeSections.journey ? 0 : 0}
            >
                <CareerJourney 
                    // scrollProgress={scrollProgress}
                    // sectionScrollRange={[0.68, 0.88]}
                    pid={journeyPid}
                />
            </Section>

            {/* Projects Section */}
            <Section
                show={activeSections.projects}
                scale={activeSections.projects ? 1 : projectsScale}
                opacity={activeSections.projects ? 1 : projectsOpacity}
                pointerEvents={activeSections.projects ? 'auto' : projectsPointerEvents}
                display={activeSections.projects ? 'flex' : projectsDisplay}
                zIndex={getSectionZIndex('projects')}
                xPosition={activeSections.projects ? 0 : 0}
            >
                <Projects
                    // scrollProgress={scrollProgress}
                    // sectionScrollRange={[0.87, 0.99]}
                    pid={projectsPid}
                />
            </Section>

            {/* Contact Section */}
            <Section
                show={activeSections.contact}
                scale={activeSections.contact ? 1 : contactScale}
                opacity={activeSections.contact ? 1 : contactOpacity}
                pointerEvents={activeSections.contact ? 'auto' : contactPointerEvents}
                display={activeSections.contact ? 'flex' : contactDisplay}
                zIndex={getSectionZIndex('contact')}
                xPosition={activeSections.contact ? 0 : 0}
            >
                <Contact pid={contactPid} />
            </Section>

            {displayEnd && (
                <Closing/>
            )}
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
                        skillsPid={skillsPid}
                        setSkillsPid={setSkillsPid}
                        infoPid={infoPid}
                        setInfoPid={setInfoPid}
                        journeyPid={journeyPid}
                        setJourneyPid={setJourneyPid}
                        contactPid={contactPid}
                        setContactPid={setContactPid}
                        projectsPid={projectsPid}
                        setProjectsPid={setProjectsPid}
                        setDisplayEnd={setDisplayEnd}
                    />
                </div>
            </motion.div>
        </section>
    );
}
