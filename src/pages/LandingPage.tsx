import { Stack } from '../sections/Stack';
import { CareerMobile } from '../sections/mobile-view/CareerMobile';
import { Builds } from '../sections/Builds';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';
import HeroAbout from '../sections/HeroAbout';
import { useEffect, useState } from 'react';
import { HeroMobileView } from '../sections/mobile-view/HeroMobileView';
import { AboutMobileView } from '../sections/mobile-view/AboutMobileView';
import { StackMobileView } from '../sections/mobile-view/StackMobileView';
import { Career } from '../sections/Career';
import { BuildsMobileView } from '../sections/mobile-view/BuildsMobileView';

export default function LandingPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleHashChange = () => {
            if (window.location.hash === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <main className="w-full flex flex-col gap-20">
            {!isMobile ? (
                <div className="space-y-20">
                    <HeroAbout />
                    <Stack />
                    <Career />
                    <Builds />
                </div>
            ) : (
                <div className="space-y-20">
                    <HeroMobileView />
                    <AboutMobileView />
                    <StackMobileView />
                    <CareerMobile />
                    <BuildsMobileView />
                </div>
            )}

            <Contact />
            <Footer />
        </main>
    );
}
