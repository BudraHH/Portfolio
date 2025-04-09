import {motion, useInView, useReducedMotion} from "framer-motion";
import { FaTerminal } from 'react-icons/fa';
import {useRef} from "react";

// Define base color classes directly or ensure they are imported/configured
const devBaseColorClass = 'text-cyan-400';
const dataBaseColorClass = 'text-yellow-400';

export default function AboutMe({ choice, ref }) { // Provide default choice

    const shouldReduceMotion = useReducedMotion();
    const containerRef = ref || useRef(null);
    const isInView = useInView(containerRef, { amount: 0.25 }); // Render and animate only once when in view

    // --- Animation Variants ---
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const codeBlockVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
    };

    // --- Dynamic Content based on choice ---
    const isDevelopment = choice === 'development';
    const titleText = isDevelopment ? "Developer" : "AI Engineer";
    const titleColor = isDevelopment ? 'text-cyan-300' : 'text-yellow-300';

    // --- Syntax Highlighting Colors ---
    // Consistent approach for both languages where applicable
    const keywordColor = isDevelopment ? 'text-red-400' : 'text-yellow-400';       // class, void vs class, def, if
    const typeColor = isDevelopment ? 'text-white' : 'text-purple-300';        // String vs print (built-in), or types if used
    const stringColor = 'text-green-400/60'; // Unified string color
    const functionColor = isDevelopment ? 'text-amber-400' : 'text-blue-300';       // build, innovate vs __init__, analyze_data etc.
    const commentColor = 'text-gray-500';
    const selfColor = 'text-orange-400';    // Specific to Python 'self'
    const mainColor = 'text-red-400';       // Specific to Python '__main__'
    const classColor = 'text-white';        // Class names
    const systemOutColor = isDevelopment ? 'text-cyan-400' : 'text-gray-400'; // System.out vs potential other objects

    return (
        <motion.div
            // Added consistent horizontal padding
            className="relative w-full  py-16 md:py-20 text-white font-mono "
            initial="hidden"
            whileInView="visible"
            animate={isInView ? {opacity : 1} : {}}
            variants={sectionVariants}
        >
            {/*/!* Background Giant Text - Restored and Subtle *!/*/}
            {/*<motion.h1*/}
            {/*    className={`absolute top-10 left-1/2 -translate-x-1/2 text-7xl md:text-9xl lg:text-[160px] font-extrabold ${isDevelopment ? "text-gray-800/80" : "text-yellow-900/60"} opacity-10 -z-10 whitespace-nowrap pointer-events-none`}*/}
            {/*    initial={{ opacity: 0 }}*/}
            {/*    animate={{ opacity: 0.1 }}*/}
            {/*    transition={{ duration: 1, delay: 0.5 }}*/}
            {/*>*/}
            {/*    About*/}
            {/*</motion.h1>*/}

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-screen-lg mx-auto">

                {/* Section Title - Using cleaner structure */}
                <div className="text-left mb-6 md:mb-10 w-full">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        About{' '}
                        <span className={`${isDevelopment ? devBaseColorClass : dataBaseColorClass} transition-colors duration-300 hover:brightness-125`}>
                            Me
                        </span>
                        !
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                        A glimpse into my {titleText} persona.
                    </p>
                </div>

                {/* Code Block Section - Linux Terminal Style */}
                <motion.div
                    className="w-full bg-gray-900/50 backdrop-blur-md border text-sm border-gray-700/50 rounded-lg shadow-xl overflow-hidden hover:border-gray-600/70 transition-colors duration-300"
                    variants={codeBlockVariants}
                >
                    {/* Linux Terminal Style Header */}
                    <div className="flex items-center px-6 py-3 border-b border-gray-600/50 bg-gray-800/60 text-sm md:text-base">

                        <span className="text-gray-300 select-none font-medium">
                            {/* Using generic 'user' and dynamic path */}
                            budrahh@portfolio:~
                        </span>
                    </div>

                    {/* Code Content */}
                    {isDevelopment ? (
                        // --- Java Version ---
                        <>
                        <pre className="w-full h-full text-cyan-500 max-w-full overflow-x-auto px-6 py-4 text-sm md:text-base font-mono text-left leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
budrahh@portfolio:~$ <span className={`text-white`}>cat ~/AboutMe/Developer.java</span>
                        </pre>
                            <pre className="w-full h-full max-w-full overflow-x-auto px-6 pb-6 text-sm md:text-base font-mono text-left leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <span className={commentColor}>// File: Developer.java</span><br/>
                            <span className={keywordColor}>class</span> <span className={classColor}>Developer</span> {"{"} <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>// Attributes</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>String</span> name = <span className={stringColor}>"Hari Hara Budra"</span>;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>String</span> domain = <span className={stringColor}>"Full-Stack Development"</span>;<br/><br/>

                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>// Core methods</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>void</span> <span className={functionColor}>build</span>() {"{"} <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>System</span>.<span className={systemOutColor}>out</span>.<span className={functionColor}>println</span>(<span className={stringColor}>"Crafting seamless digital experiences..."</span>);<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>System</span>.<span className={systemOutColor}>out</span>.<span className={functionColor}>println</span>(<span className={stringColor}>"Specializing in scalable backends & smooth UIs."</span>);<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/><br/>

                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>void</span> <span className={functionColor}>innovate</span>() {"{"} <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>System</span>.<span className={systemOutColor}>out</span>.<span className={functionColor}>println</span>(<span className={stringColor}>"Architecting robust full-stack applications."</span>);<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>System</span>.<span className={systemOutColor}>out</span>.<span className={functionColor}>println</span>(<span className={stringColor}>"Turning ideas into clean, high-performance code."</span>);<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/>
                                {"}"}
                        </pre>
                        </>
                    ) : (
                        <>
                        <pre className="w-full h-full text-cyan-500 max-w-full overflow-x-auto px-6 py-6 text-sm md:text-base font-mono text-left leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
budrahh@portfolio:~$ <span className={`text-white`}>cat ~/AboutMe/ml_engineer.py</span>
                        </pre>

                            <pre className="w-full h-full max-w-full overflow-x-auto pb-6 px-6 text-sm md:text-base font-mono text-left leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <span className={commentColor}># File: ml_engineer.py</span><br/><br/>
                            <span className={keywordColor}>class</span> <span className={classColor}>MLEngineer</span>:<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={keywordColor}>def</span> <span className={functionColor}>__init__</span>(<span className={selfColor}>self</span>):<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>"""Initialize the ML Engineer profile."""</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={selfColor}>self</span>.name = <span className={stringColor}>"Hari Hara Budra"</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={selfColor}>self</span>.degree = <span className={stringColor}>"BTech in Artificial Intelligence & Data Science"</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={selfColor}>self</span>.specialties = [<span className={stringColor}>"Data Science"</span>, <span className={stringColor}>"Machine Learning"</span>, <span className={stringColor}>"Deep Learning"</span>]<br/><br/>

                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={keywordColor}>def</span> <span className={functionColor}>analyze_data</span>(<span className={selfColor}>self</span>, dataset_type=<span className={stringColor}>"complex"</span>):<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>"""Transform raw data into actionable insights."""</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>print</span>(<span className={stringColor}>f"Analyzing {"dataset_type"} datasets using advanced ML..."</span>)<br/><br/>

                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={keywordColor}>def</span> <span className={functionColor}>build_model</span>(<span className={selfColor}>self</span>, model_architecture=<span className={stringColor}>"Neural Network"</span>):<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>"""Design and implement AI/ML models."""</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>print</span>(<span className={stringColor}>f"Building a {"model_architecture"} for intelligent solutions."</span>)<br/><br/>

                                &nbsp;&nbsp;&nbsp;&nbsp;<span className={keywordColor}>def</span> <span className={functionColor}>innovate</span>(<span className={selfColor}>self</span>):<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={commentColor}>"""Continuously explore and implement cutting-edge AI."""</span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>print</span>(<span className={stringColor}>"Pushing the boundaries of Artificial Intelligence & Data Science."</span>)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={typeColor}>print</span>(<span className={stringColor}>"Advancing state-of-the-art in ML/DL."</span>)<br/><br/>

                            <span className={keywordColor}>if</span> <span className={mainColor}>__name__</span> == <span className={stringColor}>"__main__"</span>:<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;engineer = <span className={classColor}>AIEngineer</span>()<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;engineer.<span className={functionColor}>analyze_data</span>(<span className={stringColor}>"large-scale datasets"</span>)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;engineer.<span className={functionColor}>build_model</span>(<span className={stringColor}>"Deep Neural Network"</span>)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;engineer.<span className={functionColor}>innovate</span>()<br/>
                        </pre>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}