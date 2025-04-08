import React, {useEffect, useRef, useState} from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion, useInView } from "framer-motion";
import Typed from "typed.js";
import {devProjectData} from "../../utils/constants.js";



// Enhanced Tag Colors (Slightly more vibrant/editor-like)
const getTagColor = (tag) => {
    switch (tag.toLowerCase()) {
        case 'react.js': case 'flutter': case'dart' : return 'bg-cyan-900/50 text-cyan-300 border border-cyan-700/50 ring-1 ring-inset ring-cyan-700/20';
        case 'javascript': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 ring-1 ring-inset ring-yellow-700/20';
        case 'node.js': case 'express': case 'django' :return 'bg-green-900/50 text-green-300 border border-green-700/50 ring-1 ring-inset ring-green-700/20';
        case 'python': return 'bg-blue-900/50 text-blue-300 border border-blue-700/50 ring-1 ring-inset ring-blue-700/20'; // Python often blue in themes
        case 'mongodb': return 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 ring-1 ring-inset ring-emerald-700/20';
        case 'html': return 'bg-orange-900/50 text-orange-300 border border-orange-700/50 ring-1 ring-inset ring-orange-700/20';
        case 'css': return 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 ring-1 ring-inset ring-indigo-700/20';
        case 'pandas': case 'plotly': case 'dash': return 'bg-purple-900/50 text-purple-300 border border-purple-700/50 ring-1 ring-inset ring-purple-700/20';
        default: return 'bg-gray-700/50 text-gray-300 border border-gray-600/50 ring-1 ring-inset ring-gray-600/20';
    }
};



// --- Extracted Project Card Component ---
const ProjectCard = React.memo(({ project, getTagColor }) => {
    // console.log(`Rendering Card: ${project.title}`);

    return (
        <motion.div
            initial="hidden"
            animate="animate"
            key={project.id}
            className="
                relative group
                bg-gray-800/70 backdrop-blur-md border border-gray-700/60
                rounded-lg overflow-hidden
                shadow-lg shadow-black/30 hover:shadow-cyan-500/20
                transition-all duration-300 ease-in-out
                hover:border-cyan-600/60
            "
            style={{ '--glow-color': '#22d3ee' }} // Define glow color var (Tailwind doesn't easily support dynamic shadow colors)
        >
            {/* Optional: Animated Gradient Border on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-tilt"></div>

            {/* Card Content Wrapper (relative for positioning elements inside) */}
            <div className="relative flex flex-col h-full bg-gray-800/95 rounded-lg"> {/* Slightly darker inner bg */}

                {/* Line Number Gutter Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-gray-900/50 border-r border-gray-700/50 flex flex-col items-center py-2">
                    <span className="text-gray-600 text-[10px] md:text-xs font-mono select-none">{project.id}</span>
                    {/* Add more line numbers or symbols if desired */}
                </div>

                {/* Main Content Area (with padding for gutter) */}
                <div className="pl-8 md:pl-10 flex flex-col flex-grow"> {/* Adjust padding-left */}

                    {/* Project Image */}
                    <div className="relative h-40 md:h-48 w-full overflow-hidden border-b border-gray-700/50">
                        <img
                            src={project.imageUrl || '/images/placeholder.png'}
                            alt={`${project.title} `} // **Important: Keep alt text**
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"


                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
                        {/* Optional: Top bar effect like an editor window */}
                        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/40 to-transparent"></div>
                    </div>

                    {/* Project Text Content */}
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                        {/* Title with Terminal Prompt */}
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-cyan-300 font-mono flex items-start">
                            <span className="text-cyan-500 mr-2 select-none">{'>_'}</span>
                            {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 flex-grow leading-relaxed">
                            {project.description}
                        </p>

                        {/* Technology Tags */}
                        <div className="mb-4 flex flex-wrap gap-1.5 md:gap-2">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`
                                        px-2 py-0.5 rounded font-mono text-[11px] md:text-xs font-medium border
                                        transition-colors duration-200 ${getTagColor(tag)}
                                        group-hover:opacity-90 hover:!opacity-100 hover:scale-105 // Dim others slightly on card hover
                                    `}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="mt-auto flex justify-start gap-4 pt-3 border-t border-gray-700/40">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex items-center gap-1.5 text-gray-400 hover:text-cyan-400
                                        transition-all duration-200 text-xs md:text-sm font-medium group/link
                                        hover:bg-cyan-900/30 px-2 py-1 rounded border border-white/50 hover:border-cyan-700/50
                                    "
                                    aria-label={`View source code for ${project.title} on GitHub`}
                                >
                                    <FaGithub className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:scale-110" />
                                    Code
                                </a>
                            )}
                            {/*{project.liveUrl && (*/}
                            {/*    <a*/}
                            {/*        href={project.liveUrl}*/}
                            {/*        target="_blank"*/}
                            {/*        rel="noopener noreferrer"*/}
                            {/*        className="*/}
                            {/*            inline-flex items-center gap-1.5 text-gray-400 hover:text-cyan-400*/}
                            {/*            transition-all duration-200 text-xs md:text-sm font-medium group/link*/}
                            {/*            hover:bg-cyan-900/30 px-2 py-1 rounded border border-transparent hover:border-cyan-700/50*/}
                            {/*        "*/}
                            {/*        aria-label={`View live demo for ${project.title}`}*/}
                            {/*    >*/}
                            {/*        <FaExternalLinkAlt className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:scale-110" />*/}
                            {/*        Demo*/}
                            {/*    </a>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

// --- Main Projects Component ---
const ProjectsComponent = () => {
    const displayedProjects = devProjectData;

    const [showLsCommand, setShowLsCommand] = useState(false);
    const [showExecution, setShowExecution] = useState(false);
    const [showTotalCount, setShowTotalCount] = useState(false);
    const [showDevProjects, setShowDevProjects] = useState(false);
    const [showExecutionComplete, setShowExecutionComplete] = useState(false);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    const[userCommand, setUserCommand] = useState("");
    const[enterPressed,setEnterPressed] = useState(false);
    const handleUserCommandChange = (e) => {
        e.preventDefault();
        setUserCommand(e.target.value);
    }
    const handleUserCommandKeyPress = (e) =>{
        if (e.key === 'Enter') {
            console.log('Enter key pressed!');
           setEnterPressed(true);
        }
    }


    const [showUserCommandExecution, setShowUserCommandExecution] = useState(false);
    const [showDataProjects, setShowDataProjects] = useState(false);

    useEffect(() => {
        if(userCommand === "cd ../DataProjects & ls -l"){
            if (enterPressed) {
                setShowUserCommandExecution(true);
                setTimeout(() => {
                    setShowDataProjects(true);
                }, 100)
            }
        }
    }, [userCommand,enterPressed]);

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });


    const typedProjectsRef = useRef(null);
    useEffect(() => {
        let typedProjectInstance;

        if (isInView && typedProjectsRef.current ) {

            typedProjectsRef.current.textContent = '';

            typedProjectInstance = new Typed(typedProjectsRef.current, {
                strings: ["Projects"], // Changed first word
                typeSpeed: 80,
                startDelay: 400,
                showCursor: true,
                cursorChar: '_', // Underscore cursor for dev feel
                loop: false,
                onComplete: (self) => {
                    // You have a self2.cursor here, but self2 is not defined in this scope.
                    // Assuming you meant to target the cursor of the current Typed instance (self).
                    if (self && self.cursor) {
                        self.cursor.style.animation = 'blink 1s infinite';
                    }

                },
            });
        }

        return () => {
            if (typedProjectInstance) {
                typedProjectInstance.destroy();
            }

        };
    }, [isInView]);

    const typedCdCommandRef = useRef(null);
    const typedLsCommandRef = useRef(null);

    const cdInstanceRef = useRef(null);
    const lsInstanceRef = useRef(null);

    useEffect(() => {
        if (isInView && typedCdCommandRef.current) {
            typedCdCommandRef.current.textContent = '';
            if (cdInstanceRef.current) cdInstanceRef.current.destroy();
            try {
                cdInstanceRef.current = new Typed(typedCdCommandRef.current, {
                    strings: ["cd ./DevProjects"],
                    typeSpeed: 70,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '█',
                    loop: false,
                    onComplete: (self) => {
                        if (self.cursor) self.cursor.style.opacity = '0';
                        setTimeout(() => { setShowLsCommand(true); }, 100);
                    },
                });
            } catch (error) {
                console.error("Typed.js (cd command) error:", error);
                if (typedCdCommandRef.current) typedCdCommandRef.current.textContent = "cd ./DevProjects";
                setTimeout(() => { setShowLsCommand(true); }, 100);
            }
        }
        return () => {
            if (cdInstanceRef.current) cdInstanceRef.current.destroy();
        };
    }, [isInView]);

    useEffect(() => {
        if (showLsCommand && isInView && typedLsCommandRef.current) {
            typedLsCommandRef.current.textContent = '';
            if (lsInstanceRef.current) lsInstanceRef.current.destroy();
            try {
                lsInstanceRef.current = new Typed(typedLsCommandRef.current, {
                    strings: ["ls -l"],
                    typeSpeed: 70,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '█',
                    loop: false,
                    onComplete: (self) => {
                        if (self.cursor) self.cursor.style.opacity = '0';
                        setShowExecution(true);
                        setShowTotalCount(true);
                        setShowDevProjects(true);
                        setTimeout(() => setShowExecutionComplete(true), 100);
                    },
                });
            } catch (error) {
                console.error("Typed.js (ls command) error:", error);
                if (typedLsCommandRef.current) typedLsCommandRef.current.textContent = "ls -l";
                setShowExecution(true);
                setShowTotalCount(true);
                setShowDevProjects(true);
                setTimeout(() => setShowExecutionComplete(true), 100);
            }
        }
        return () => {
            if (lsInstanceRef.current) lsInstanceRef.current.destroy();

        };
    }, [showLsCommand, isInView]);


    return (
        <section
            id="projects"
            ref={containerRef}
            className="pt-20 md:pt-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
                text-gray-200  relative overflow-hidden
                isolate
            "
        >
            <h2 className={`container mx-auto relative mb-5 lg:text-xl font-mono`}>
                [ <span ref={typedProjectsRef}></span> ]
            </h2>
            {/* Background Elements */}


            {/* Content */}
            <div className={`container  mx-auto relative border border-white/10 border-b-transparent rounded-2xl`}>
                <div className={`container mx-auto relative z-10 flex justify-start items-center  px-8 py-3  rounded-t-2xl border-b border-white/10 bg-slate-900`}>
                    <p className="font-mono text-sm lg:text-lg text-white mb-1">
                        <span className="">budrahh@portfolio</span>:~ /Projects</p>
                </div>
                <div className="container min-h-[60vh] mx-auto relative z-10 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 p-8 rounded-b-2xl">
                    {/* Enhanced Heading */}
                    <div className="text-left mb-6 md:mb-10">
                        <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                            <span className="text-cyan-400">budrahh@portfolio</span>:~/Projects$<span className="text-white"> <code ref={typedCdCommandRef} className={`text-white`}></code></span></p>
                        {showLsCommand && (
                            <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                                <span className="text-cyan-400">budrahh@portfolio</span>:<span className="text-green-400">~/DevProjects$</span> <span className={`text-white`}><code ref={typedLsCommandRef} className={`text-white`}></code></span>
                            </p>
                        )}
                        {showExecution && (
                            <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-gray-100 flex items-center justify-start gap-2">
                                <span className="text-cyan-400">// Executing:</span> ls -l
                            </p>
                        )}
                        {showTotalCount && (
                            <p className="font-mono text-xs text-gray-500 mt-2">total {displayedProjects.length}</p>
                        )}
                    </div>


                    {showDevProjects && (
                       <>
                           <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-6 md:mb-10">
                               {displayedProjects.map((project,index) => {

                                   return(
                                       <ProjectCard
                                           key={project.id} // Key here
                                           project={project}
                                           getTagColor={getTagColor}
                                       />
                                   )
                               })}

                           </div>
                           {showExecutionComplete && (
                               <div className="font-mono text-sm lg:text-lg text-gray-500 mb-1">
                                   <p>// Want to see my projects related to data science and machine learning ?</p>
                                   <p>// Type in ""cd ../DataProjects & ls -l"" and press "Enter" key.</p>
                               </div>
                           )}
                       </>
                    )}

                    {showExecutionComplete && (
                       <div className={`w-full flex flex-row gap-5 items-center`}>
                           <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                               <span className="text-cyan-400">budrahh@portfolio</span>:<span className="text-green-400">~/DevProjects$</span> </p>
                           <input
                               type="text"
                               value={userCommand}
                               onChange={handleUserCommandChange}
                               onKeyUp={handleUserCommandKeyPress}
                               disabled={showDataProjects}
                               onFocus={handleFocus}
                               onBlur={handleBlur}
                               className={`w-full bg-transparent font-mono focus:ring-0 focus:outline-none text-white mb-1 leading-4 ${
                                   isFocused ? 'focused-cursor' : ''
                               }`}
                           /> </div>
                    )}

                    {showUserCommandExecution && (
                        <>
                            <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-gray-100 flex items-center justify-start gap-2 mb-1">
                                <span className="text-cyan-400">// Executing:</span> cd ../DataProjects
                            </p>

                            <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                                <span className="text-cyan-400">budrahh@portfolio</span>:<span className="text-green-400">~/DataProjects$</span> </p>
                            <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-gray-100 flex items-center justify-start gap-2 mb-6 md:mb-10">
                                <span className="text-cyan-400">// Executing:</span>ls -l
                            </p>
                        </>
                    )}

                    {showDataProjects && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-6 md:mb-10 ">
                            {displayedProjects.map((project) => (
                                <ProjectCard
                                    key={project.id} // Key here
                                    project={project}
                                    getTagColor={getTagColor}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>

        </section>
    );
};

export default React.memo(ProjectsComponent);

ProjectCard.displayName = 'ProjectCard';
ProjectsComponent.displayName = 'Projects';
