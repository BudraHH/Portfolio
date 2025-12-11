import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Hero from "../sections/Hero.jsx";
import Projects from "../sections/Projects.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";
import { LenisScroll } from "../components/LenisScroll.jsx";
import Career from "../sections/Career.jsx";

const BasePage = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    const isScrollingRef = useRef(false);

    // Initial Scroll / Param Change Scroll
    useEffect(() => {
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                // Determine if we need to scroll
                const rect = element.getBoundingClientRect();
                const isInView = (rect.top >= 0 && rect.bottom <= window.innerHeight);

                if (!isInView) {
                    isScrollingRef.current = true;
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Release lock after scroll (approximate time)
                    setTimeout(() => { isScrollingRef.current = false; }, 1000);
                }
            }
        }
    }, [sectionId]);

    // Scroll Spy (Update URL on Scroll)
    useEffect(() => {
        const sections = ['hero', 'info', 'career', 'projects', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return; // Don't update while auto-scrolling

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        // Avoid redundant navigation
                        if (sectionId !== id) {
                            navigate(`/normal-theme/${id}`, { replace: true });
                        }
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% visible
                rootMargin: "-10% 0px -45% 0px" // Adjust center view detection
            }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
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
                <Career />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default BasePage;
