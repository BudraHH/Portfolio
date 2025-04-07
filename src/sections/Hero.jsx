import { motion } from "framer-motion";
import profileImage from "../assets/dp.jpeg";
import { useState, useRef, useEffect } from "react";
import Typed from "typed.js";
import AboutMe from "./AboutMe.jsx";
import QuickInfo from "./QuickInfo.jsx";
import {FaTerminal} from "react-icons/fa";
import RoleAndPlace from "./RoleAndPlace.jsx";
export default function Hero({choice}) {

    const heroSectionRef = useRef(null);
    const leftSectionRef = useRef(null);

    const aboutSectionRef = useRef(null);
    const quickInfoSectionRef = useRef(null);
    const roleAndPlaceSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = (event) => {
            const leftSection = leftSectionRef.current;
            if (!leftSection) return;

            const leftScrollHeight = leftSection.scrollHeight;
            const leftScrollTop = leftSection.scrollTop;
            const leftClientHeight = leftSection.clientHeight;

            // Prevent scrolling in Hero only if there's room to scroll in the left section
            if (
                (event.deltaY > 0 && leftScrollTop + leftClientHeight < leftScrollHeight) ||  // Scrolling down
                (event.deltaY < 0 && leftScrollTop > 0)  // Scrolling up
            ) {
                event.preventDefault();
                leftSection.scrollTop += event.deltaY;
            }
        };

        const hero = heroSectionRef.current;
        hero.addEventListener("wheel", handleScroll, { passive: false });

        return () => hero.removeEventListener("wheel", handleScroll);
    }, []);


    const typedFirstName = useRef(null);
    const typedLastName = useRef(null);

    useEffect(() => {
        const FirstName = {
            strings: ["Hari Hara"],
            typeSpeed: 150,
            startDelay: 1000,
            loop: false,
            onComplete: (self) => {
                self.cursor.remove();
                self.stop();  // Stops the backspacing after the last string is typed
            }
        };

        const typedFN = new Typed(typedFirstName.current, FirstName);

        const LastName = {
            strings: ["Budra"],
            typeSpeed: 150,
            startDelay: 3000,
            loop: false,
            onComplete: (self) => {
                self.stop();  // Stops the backspacing after the last string is typed
            }
        };

        const typedLN = new Typed(typedLastName.current, LastName);

        // Cleanup
        return () => {
            typedFN.destroy();
            typedLN.destroy();
        };
    }, []);

        return (
        <div
            ref={heroSectionRef}
            className="h-[100vh] w-full flex flex-row items-center justify-center px-6 md:px-14 lg:px-20 xl:px-32 overflow-x-hidden">

            {/* Left Section - Development Focused Introduction */}
            <div
                ref={leftSectionRef}
                className="z-10  h-full max-h-[80%] w-full text-left   overflow-auto scrollbar-hide scroll-smooth"
            >
                <div className="h-full md:h-full  flex flex-col justify-center items-start ">
                    <div className={`text-sm md:text-lg mb-2 opacity-75`}><pre className={``}>{choice === 'development' ? (
                       `console.log("`
                    ) : (
                        `if __name__ == "__main__":\n\tprint("`
                    )}</pre></div>
                    <div className={`flex flex-col justify-center items-start`}>
                        <motion.h1
                            initial={{opacity:0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.2,delay: 0.2}}
                            className={`text-white md:text-[25px] ml-[2px] mb-2 uppercase`}
                        >
                            Hi{" "}
                            <motion.span
                                initial={{opacity:0, x: 0}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5,delay: 0.5}}
                            >
                                there,{" "}
                            </motion.span>
                            <motion.span
                                initial={{opacity:0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5,delay: 0.75}}
                                className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} `}
                            >
                                it's
                            </motion.span>


                        </motion.h1>
                        {choice === 'development' && (
                            <div className={`text-sm md:text-lg mb-2 opacity-75`}>
                              <pre>
                                {`");\n\npublic static void main(String[] args) {\n\tSystem.out.printf("`}
                                        </pre>
                            </div>
                        )}

                        {/* Name Section */}
                        <div className={`text-5xl md:text-8xl xl:text-[150px] leading-none flex flex-col items-start ${choice === 'development' ? "font-sans" : "font-sans"} text-white`}>
                            <motion.h1

                                className="font-normal text-shadow-lg">
                                <span ref={typedFirstName}></span>
                            </motion.h1>
                            <motion.h1

                                className={`font-normal text-shadow-lg ${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"}`} >
                                <span ref={typedLastName}></span>
                            </motion.h1>
                        </div>
                    </div>
                    <div className={`text-sm md:text-lg opacity-75`}>
                        <pre>
                            {choice === 'development' ? `\n\t");\n}` : `\n\t")`}
                        </pre>
                    </div>

                </div>


                <AboutMe choice={choice} ref={aboutSectionRef}/>


                <QuickInfo choice={choice} ref={quickInfoSectionRef}/>
<RoleAndPlace choice={choice} ref={roleAndPlaceSectionRef}/>

            </div>

            {/* Right Section - Profile Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute z-0 -right-32 lg:relative md:-right-52 lg:right-0 h-[70%] lg:h-full w-full  lg:aspect-square flex justify-center"
            >
                <img
                    src={profileImage}
                    alt="Hari Hara Budra"

                />
            </motion.div>

        </div>
    );
}
