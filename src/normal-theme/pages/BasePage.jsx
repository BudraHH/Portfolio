import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NORMAL_ROUTES } from "../routes/routes.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../sections/Hero.jsx";
import Projects from "../sections/Projects.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";
import { LenisScroll } from "../components/LenisScroll.jsx";
import Career from "../sections/Career.jsx";
import Info from "../sections/Info.jsx";
import Skills from "../sections/Skills.jsx";

import QuoteTransition from "../components/QuoteTransition.jsx";

const BasePage = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    const isScrollingRef = useRef(false);

    // Initial Scroll / Param Change Scroll
    useEffect(() => {
        const targetId = sectionId || 'hero';
        const element = document.getElementById(targetId);
        if (element) {
            // Determine if we need to scroll
            const rect = element.getBoundingClientRect();
            // If checking 'hero' specifically and we are effectively at top (top < 100), consider it in view?
            // Standardizing check:
            const isInView = (rect.top >= -50 && rect.top <= window.innerHeight / 2); // Relaxing check

            if (!isInView) {
                isScrollingRef.current = true;
                element.scrollIntoView({ behavior: 'smooth' });
                // Release lock after scroll (approximate time)
                setTimeout(() => { isScrollingRef.current = false; }, 1000);
            }
        } else if (!sectionId) {
            // Explicitly scroll to top if root
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [sectionId]);

    // Scroll Spy (Update URL on Scroll)
    useEffect(() => {
        const sections = Object.values(NORMAL_ROUTES.SECTIONS);

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return; // Don't update while auto-scrolling

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const domId = entry.target.id;
                        const routeSection = domId === 'hero' ? '' : domId;

                        // Avoid redundant navigation
                        if (sectionId !== routeSection) {
                            if (routeSection === '') {
                                navigate(`${NORMAL_ROUTES.ROOT}`, { replace: true });
                            } else {
                                navigate(`${NORMAL_ROUTES.ROOT}/${routeSection}`, { replace: true });
                            }
                        }
                    }
                });
            },
            {
                threshold: [0, 0.1], // Trigger as soon as it touches the zone
                rootMargin: "-40% 0px -60% 0px" // Active zone is a narrow strip near the top-center
            }
        );

        sections.forEach((routeSection) => {
            const domId = routeSection === '' ? 'hero' : routeSection;
            const element = document.getElementById(domId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [navigate, sectionId]);

    return (
        <div className="bg-[#050a0f] min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-white">
            <LenisScroll />
            <Navbar />
            <main>
                <Hero />
                <QuoteTransition />
                <Info />
                <Skills />
                <Career />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default BasePage;
