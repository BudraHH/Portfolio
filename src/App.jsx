import { useState, useCallback, lazy, Suspense } from 'react';
import Skills from './sections/Skills.jsx';
import Terminal from "./components/Terminal.jsx";
import Projects from "./sections/Projects.jsx";
import Info from "./sections/Info.jsx";
import CareerJourney from "./sections/CareerJourney.jsx";
import Contact from "./sections/Contact.jsx";
import Closing from "./sections/Closing.jsx";

const Welcome = lazy(() => import('./sections/Welcome'));
const ScrollSection = lazy(() => import('./sections/ScrollSection.jsx'));

function App() {
    const [showHero, setShowHero] = useState(true);

    const handleWelcomeComplete = useCallback(() => {
        setShowHero(true);
    }, []);

    return (
        <div className="relative bg-black overflow-x-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-black to-black pointer-events-none" />

            <Suspense fallback={null}>
                {/* Welcome Screen */}
                {!showHero && (
                    <Welcome onComplete={handleWelcomeComplete}/>
                )}

                {/* Hero & Rest Sections - only render when ready */}
                {showHero && <ScrollSection/>}
            </Suspense>
            {/*<Welcome />*/}
            {/*<Info />*/}
            {/*<Terminal />*/}
            {/*<Skills />*/}
            {/*<CareerJourney/>*/}
            {/*<Projects />*/}
            {/*<Contact/>*/}
            {/*<Closing/>*/}
        </div>
    );
}

export default App;
