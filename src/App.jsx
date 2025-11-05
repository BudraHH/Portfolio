import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './sections/Hero';
import About from "./sections/About.jsx";
import Welcome from './sections/Welcome';
import ScrollSection from './components/ScrollSection';

function App() {
    const [showHero, setShowHero] = useState(false);

    const handleWelcomeComplete = () => {
        setShowHero(true);
    };

    return (
        <div className="relativebg-black overflow-x-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-black to-black pointer-events-none" />

            {/* Welcome Screen */}
            {!showHero && (
                <Welcome onComplete={handleWelcomeComplete} />
            )}

            {/* Hero & About Sections - only render when ready */}
            {showHero && <ScrollSection />}
        </div>
    );
}

export default App;
