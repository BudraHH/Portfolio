import { motion } from "framer-motion";
import profileImage from "../assets/dp.jpeg";
import { useState, useRef, useEffect } from "react";
import Typed from "typed.js";
export default function Hero({choice}) {

    const leftSectionRef = useRef(null);
    const heroSectionRef = useRef(null);

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
            className="h-[100vh] w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 overflow-x-hidden">

            {/* Left Section - Development Focused Introduction */}
            <div
                ref={leftSectionRef}
                className="h-full max-h-[80%] w-full md:w-1/2 text-center md:text-left   overflow-auto scrollbar-hide scroll-smooth"
            >
                <div className="h-full  flex flex-col justify-center items-start ">
                    <p className={`mb-2 opacity-75`}><pre className={``}>{choice === 'development' ? (
                       "console.log("
                    ) : (
                        `if "name" == "main":\n\tprint(`
                    )}</pre></p>
                    <div className={`flex flex-col justify-center items-start`}>
                        <motion.h1
                            initial={{opacity:0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.2,delay: 0.2}}
                            className={`text-white text-[25px] ml-[2px] mb-2 uppercase`}
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
                            <p className={`mb-2 opacity-75`}>
                              <pre>
                                {`);\n\npublic static void main(String[] args) {\n\tSystem.out.printf("`}
                                        </pre>
                            </p>
                        )}

                        {/* Name Section */}
                        <div className={`text-[150px] leading-none flex flex-col ${choice === 'development' ? "font-sans" : "font-sans"} text-white`}>
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
                    <p className={`opacity-75`}>
                        <pre>
                            {choice === 'development' ? `\n\t");\n}` : `\n\t)`}
                        </pre>
                    </p>

                </div>

                {/* About Section */}
                <div className="relative flex flex-col justify-center items-center  ">
                    <div className={` w-[100%] h-[10%] p-10 mt-10 mb-5 flex flex-col justify-center items-start`}>
                        <motion.h1 className={`absolute  font-semibold text-8xl ${choice === 'development' ? "text-gray-800 opacity-[100%]" : "text-yellow-800 opacity-[30%] "} `}>
                            About
                        </motion.h1>
                        <motion.p className={`relative top-4 font-black text-[40px]`}>
                            About{" "}
                            <motion.span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} text-[40px] hover:drop-shadow-[0_0_1px_cyan]`}>
                                me
                            </motion.span>
                            <motion.span>
                                !
                            </motion.span>
                        </motion.p>
                    </div>

                    {/* Description */}
                    <div className={`w-[100%] h-full px-10 my-5 flex flex-col justify-center items-center space-y-10`}>

                        <div className="px-5  w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                            {choice === 'development' ? (
                                <motion.pre className={`w-full h-full overflow-x-auto text-cyan-500 p-6 rounded-lg text-sm font-mono text-wrap break-words`}>
                                    {`
`}<span className="text-cyan-400">class</span> <span className="text-white">Developer</span> {"{"} <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">String</span> devName = <span className="text-cyan-300">"Hari Hara Budra"</span>;<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">String</span> domain = <span className="text-cyan-300">"Development"</span>;<br/><br/>

                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">void</span> build() {"{"} <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Crafting seamless experiences, one function at a time."</span>);<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Specialized in scalable backends, optimized databases, and smooth front-end interactions."</span>);<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/><br/>

                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">void</span> innovate() {"{"} <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Writing efficient algorithms and architecting full-stack applications."</span>);<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Bringing ideas to life through clean, maintainable, and high-performance code."</span>);<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/>
                                    {"}"}

                                </motion.pre>
                            ) : (
                                <motion.pre className={`w-full h-full overflow-x-auto text-red-500-400 p-6 rounded-lg text-sm font-mono text-wrap break-words`}>
                                    {`
`}<span className="text-yellow-400">class</span> <span className="text-white">AIEngineer</span>:<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">def</span> <span className="text-white">__init__</span>(self):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = <span className="text-green-300">"Hari Hara Budra"</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.degree = <span className="text-green-300">"BTech in AI & Data Science"</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.specialties = [<span className="text-yellow-400">"Data Science"</span>, <span className="text-yellow-300">"Machine Learning"</span>, <span className="text-yellow-300">"Deep Learning"</span>, <span className="text-yellow-300">"AI Systems"</span>]<br/><br/>

                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">def</span> <span className="text-white">analyze_data</span>(self, dataset):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"""Transforming raw data into meaningful insights."""</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(<span className="text-yellow-300">f"Analyzing {"{"}dataset{"}"} using advanced ML techniques..."</span>)<br/><br/>

                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">def</span> <span className="text-white">build_model</span>(self, architecture):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"""Designing AI models for real-world applications."""</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(<span className="text-yellow-300">f"Building a {"{"}architecture{"}"} model for intelligent decision-making."</span>)<br/><br/>

                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">def</span> <span className="text-white">innovate</span>(self):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"""Pushing the boundaries of AI & DS."""</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(<span className="text-yellow-300">"Exploring AI-driven solutions for the future."</span>)<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(<span className="text-yellow-300">"Advancing state-of-the-art in ML and DL research."</span>)<br/><br/>

                                    <span className="text-yellow-400">if</span> <span className="text-red-600">__name__</span> == <span className="text-green-400">"__main__"</span>:<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;engineer = <span className="text-white">AIEngineer</span>()<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;engineer.analyze_data(<span className="text-green-300">"large-scale datasets"</span>)<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;engineer.build_model(<span className="text-green-300">"Deep Neural Network"</span>)<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;engineer.innovate()<br/>
                                </motion.pre>

                            )}
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col justify-center items-center  ">
                    <div className={` w-[100%] h-[10%] p-10 mt-10 mb-5 flex flex-col justify-center items-start`}>
                        <motion.h1 className={`absolute  font-semibold text-8xl ${choice === 'development' ? "text-gray-800 opacity-[100%]" : "text-yellow-800 opacity-[30%] "} `}>
                            Quick
                        </motion.h1>
                        <motion.p className={`relative top-4 font-black text-[40px]`}>
                            Quick{" "}
                            <motion.span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} text-[40px] hover:drop-shadow-[0_0_1px_cyan]`}>
                                Info
                            </motion.span>
                            <motion.span>
                                !
                            </motion.span>
                        </motion.p>
                    </div>

                    <div className={`w-[100%] h-full px-10 my-5 flex flex-col justify-center items-center space-y-10`}>
                        <div className={`w-full space-y-5`}>
                            <div className="p-5 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                                <pre> <span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} font-bold`}>&gt;&gt;&gt;</span> PHONE NUMBER: <a href={"tel:+917397509844"}
                                                                                                         target="_blank"
                                                                                                         rel="noreferrer"
                                                                                                         className={`hover:underline`} >+91 7397 509 844</a> </pre>
                            </div>
                            <div className="p-5 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                                <pre> <span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} font-bold`}>&gt;&gt;&gt;</span> E-MAIL: <a href={"mailto:hariharabudra@gmail.com"}
                                                                                                   target="_blank"
                                                                                                   rel="noreferrer" className={`hover:underline`}>hariharabudra@gmail.com</a> </pre>
                            </div>
                            <div className="p-5 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                                <pre> <span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} font-bold`}>&gt;&gt;&gt;</span>  GITHUB: <a href={"https://github.com/BudraHH"}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer"
                                className={`hover:underline`}>https://github.com/BudraHH</a></pre>
                            </div>
                            <div className="p-5 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                                <pre> <span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} font-bold`}>&gt;&gt;&gt;</span>  LINKEDIN: <a href={"https://www.linkedin.com/in/hari-hara-budra/"}
                                                                                                      target="_blank"
                                                                                                      rel="noreferrer" className={`hover:underline`}>https://www.linkedin.com/in/hari-hara-budra/</a></pre>
                            </div>
                            <div className="p-5 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl">
                                <pre> <span className={`${choice === 'development' ? "text-devBaseColor" : "text-dataBaseColor"} font-bold`}>&gt;&gt;&gt;</span> LOCATION: Coimbatore, Tamil Nadu </pre>
                            </div>
                        </div>

                    </div>
                </div>



            </div>

            {/* Right Section - Profile Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 flex justify-center"
            >
                <img
                    src={profileImage}
                    alt="Hari Hara Budra"

                />
            </motion.div>
        </div>
    );
}
