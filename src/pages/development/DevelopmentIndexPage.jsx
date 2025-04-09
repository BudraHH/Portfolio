
import React,{useEffect} from 'react';
import Hero from "../../sections/Hero.jsx";
import Skills from "../../sections/dev/Skills.jsx";
import Summary from "../../sections/Summary.jsx";
import Projects from "../../sections/dev/Projects.jsx";
import DevContact from "../../sections/dev/DevContact.jsx";


function DevelopmentIndexPage() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        // Removed ClickSpark wrapper from here, it's now in the Layout
        <div className={`z-0 bg-black w-screen min-h-screen overflow-x-hidden`}>
            {/* Render the sections relevant to the main /development page */}
            <Hero choice={"development"} /> {/* Pass static choice if needed */}
            <Skills choice={"development"} />
            <Summary choice={"development"} />
            <Projects choice={"development"} />
            <DevContact choice={"development"} />
        </div>
    );
}

export default DevelopmentIndexPage;