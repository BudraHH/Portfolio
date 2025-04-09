import React, {useEffect, useRef} from 'react';
// More specific icons for skills/sections
import {
    FaUserAstronaut,
    FaCodeBranch,
    FaTerminal,
    FaDownload,
    FaReact,
    FaNodeJs,
    FaPython,
    FaDatabase,
    FaDocker,
    FaAws,
    FaGitAlt,
    FaJsSquare,
    FaEye,
    FaFlask,
    FaHtml5,
    FaCss3, FaCss3Alt

} from 'react-icons/fa';
import {
    SiMongodb,
    SiExpress,
    SiRedux,
    SiFlask,
    SiPostgresql,
    SiTailwindcss,
    SiDjango,
    SiFlutter,
    SiDart,
    SiJsonwebtokens
} from 'react-icons/si';
import Typed from "typed.js";
import {useInView} from "framer-motion"; // Example for specific tech



const About = () => {
    // More structured skills data (Example)
    const skillSets = [
        {
            category: "Frontend",
            icon: FaReact,
            color: "text-cyan-400",
            skills: ["React", "JavaScript (ES6+)", "Redux", "HTML5", "CSS3", "Tailwind CSS", "Flutter"]
        },
        {
            category: "Backend",
            icon: FaNodeJs,
            color: "text-green-400",
            skills: ["Node.js", "Express.js", "Python", "Flask", "Django", "REST APIs"]
        },
        {
            category: "Databases & DevOps",
            icon: FaDatabase,
            color: "text-emerald-400",
            skills: ["MongoDB", "SQL", "Git", "CI/CD (basic)"]
        }
    ];

    // Reusable skill tag styling
    const skillTagClasses = "flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] font-medium border bg-gray-700/40 border-gray-600/60 text-gray-300 shadow-sm hover:bg-gray-600/50 hover:border-gray-500 transition-colors duration-150";

    // Helper to get specific icons (optional, improves readability)
    const getSkillIcon = (skillName) => {
        const lowerSkill = skillName.toLowerCase();
        // Prioritize specific icons
        if (lowerSkill.includes('mongo')) return <SiMongodb className="w-3 h-3 text-emerald-400" />;
        if (lowerSkill.includes('express')) return <SiExpress className="w-3 h-3 text-gray-400" />;
        if (lowerSkill.includes('react')) return <FaReact className="w-3 h-3 text-cyan-400" />;
        if (lowerSkill.includes('redux')) return <SiRedux className="w-3 h-3 text-purple-400" />;
        if (lowerSkill.includes('node')) return <FaNodeJs className="w-3 h-3 text-green-400" />;
        if (lowerSkill.includes('python')) return <FaPython className="w-3 h-3 text-blue-400" />;
        if (lowerSkill.includes('flask')) return <SiFlask className="w-3 h-3 text-gray-400" />;
        if (lowerSkill.includes('django')) return <SiDjango className="w-3 h-3 text-green-400"/>; // Example using SVG if no icon found
        if (lowerSkill.includes('flutter')) return <SiFlutter className="w-3 h-3 text-sky-400" />;
        if (lowerSkill.includes('dart')) return <SiDart className="w-3 h-3 text-sky-500" />;
        if (lowerSkill.includes('tailwind')) return <SiTailwindcss className="w-3 h-3 text-teal-400" />;
        if (lowerSkill.includes('html')) return <FaHtml5 className="w-3 h-3 text-orange-500" />;
        if (lowerSkill.includes('css')) return <FaCss3Alt className="w-3 h-3 text-blue-500" />;
        if (lowerSkill.includes('docker')) return <FaDocker className="w-3 h-3 text-blue-500" />;
        if (lowerSkill.includes('aws')) return <FaAws className="w-3 h-3 text-orange-400" />;
        if (lowerSkill.includes('git')) return <FaGitAlt className="w-3 h-3 text-red-400" />;
        if (lowerSkill.includes('jwt')) return <SiJsonwebtokens className="w-3 h-3 text-pink-400" />;
        if (lowerSkill.includes('api')) return <FaCodeBranch className="w-3 h-3 text-purple-400" />; // Generic API
        // Add more...
        return null; // Default no icon
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <section
            id="about"
            className="min-h-screen py-24 md:py-32 bg-black text-gray-200 px-4 md:px-8 lg:px-16 relative overflow-hidden isolate"
        >
            {/* Background Layers (Consistent) */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/noise.png')] bg-repeat pointer-events-none"></div>
            <div className="absolute inset-0 animated-grid-bg opacity-5 pointer-events-none"></div>
            <div className="absolute inset-0 character-stream opacity-[0.04] pointer-events-none" aria-hidden="true"></div>
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-700/15 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-700/15 rounded-full filter blur-3xl opacity-30 animation-delay-4000 animate-pulse pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none scanline-bg"></div>

            {/* Content */}
            <div className="container mx-auto relative z-10">
                {/* Terminal Style Header */}

                <div className={`container mx-auto relative border border-white/10  rounded-2xl`}>
                    <div className={`container mx-auto relative z-10 flex justify-start items-center  px-8 py-3  rounded-t-2xl border-b border-white/10 bg-slate-900`}>
                        <p className="font-mono text-sm lg:text-lg text-white mb-1">
                            <span className="">budrahh@portfolio</span>:~ /AboutMe</p>
                    </div>
                   <div>
                       <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-700/20 via-purple-700/20 to-gray-800/10 blur-lg opacity-50 pointer-events-none"></div>

                       <div className="container mx-auto relative z-10  p-8 rounded-b-2xl">
                           {/* Enhanced Heading */}
                           <div className="text-left mb-6 md:mb-10">
                               <p className="font-mono text-sm lg:text-lg text-green-400 mb-1">
                                   <span className="text-cyan-400">budrahh@portfolio</span>:~/AboutMe$<span className="text-white"> <code  className={`text-white`}>cat ./docs/about.md  | grep BudraHH </code></span></p>

                                   <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-gray-100 flex items-center justify-start gap-2">
                                       <span className="text-cyan-400">// Executing:</span> -----
                                   </p>

                           </div>
                       </div>


                           <div className="relative  rounded-b-2xl shadow-xl shadow-black/30 p-6 sm:p-8 md:p-10">

                       {/* Main Content Grid */}
                       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start"> {/* Changed to items-start */}

                           {/* Column 1 & 2: Text Content */}
                           <div className="lg:col-span-2 space-y-10"> {/* Increased spacing */}
                               {/* Introduction */}
                               <div className="space-y-4">
                                   <h3 className="flex items-center gap-3 text-2xl font-semibold text-cyan-300 font-mono">
                                       <FaUserAstronaut className="w-6 h-6 text-cyan-500 shrink-0" />
                                       <span>README.md: Introduction</span>
                                   </h3>
                                   {/* --- REPLACE THIS WITH YOUR BIO --- */}
                                   <div className="space-y-4 text-gray-300 leading-relaxed font-sans text-sm sm:text-base pl-9"> {/* Indent content */}
                                       <p>
                                           <span className="text-cyan-500 mr-2 font-mono select-none">{'>'}</span>
                                           Hello! I'm BudraHH, a Full-Stack Developer driven by a passion for creating elegant, efficient, and impactful digital experiences. My journey began with [mention starting point], evolving into a deep dive across the full web development spectrum.
                                       </p>
                                       <p>
                                           <span className="text-cyan-500 mr-2 font-mono select-none">{'>'}</span>
                                           I specialize in translating complex requirements into robust applications, focusing on clean code, scalability, and user-centric design. Comfortable navigating both frontend intricacies (<span className="text-cyan-400 font-medium">React</span>, <span className="text-yellow-400 font-medium">JavaScript</span>) and backend logic (<span className="text-green-400 font-medium">Node.js</span>, <span className="text-blue-400 font-medium">Python</span>), including database management (<span className="text-emerald-400 font-medium">MongoDB</span>, SQL) and modern deployment practices.
                                       </p>
                                       <p>
                                           <span className="text-cyan-500 mr-2 font-mono select-none">{'>'}</span>
                                           A perpetual learner, I actively explore emerging technologies and methodologies to refine my craft and deliver cutting-edge solutions. Let's connect and build something great!
                                       </p>
                                   </div>
                                   {/* --- END OF BIO PLACEHOLDER --- */}
                               </div>

                               {/* Divider */}
                               <hr className="border-t border-gray-700/60 my-8" />

                               {/* Skills Section */}
                               <div className="space-y-6">
                                   <h3 className="flex items-center gap-3 text-2xl font-semibold text-cyan-300 font-mono">
                                       <FaCodeBranch className="w-6 h-6 text-cyan-500 shrink-0" />
                                       <span>./skills --list --verbose</span>
                                   </h3>
                                   {/* Categorized Skills */}
                                   <div className="space-y-5 pl-9"> {/* Indent content */}
                                       {skillSets.map((set) => (
                                           <div key={set.category}>
                                               <h4 className={`flex items-center gap-2 font-mono text-sm font-medium mb-2 ${set.color}`}>
                                                   <set.icon className="w-4 h-4" />
                                                   <span>{set.category}</span>
                                               </h4>
                                               <div className="flex flex-wrap gap-2">
                                                   {set.skills.map(skill => (
                                                       <span key={skill} className={skillTagClasses}>
                                                         {getSkillIcon(skill)} {/* Add icon next to skill name */}
                                                           <span>{skill}</span>
                                                     </span>
                                                   ))}
                                               </div>
                                           </div>
                                       ))}
                                   </div>
                               </div>

                               {/* Optional: Call to Action / Links */}
                               <div className="pt-6 pl-9 flex flex-wrap gap-4">
                                   <a
                                       href="/development/projects"
                                       className="inline-flex items-center gap-2 text-gray-300 border border-gray-600/80 px-4 py-2 rounded text-sm font-mono bg-gray-800/60 hover:text-cyan-300 hover:border-cyan-600/70 hover:bg-gray-700/70 active:bg-gray-600/60 active:scale-[0.98] transition-all duration-150 ease-in-out shadow-sm hover:shadow-md group"
                                   >
                                       <FaEye className="w-4 h-4 group-hover:animate-pulse text-green-400" /> {/* Changed icon */}
                                       Explore Projects
                                   </a>
                                   <a
                                       href="/resume.pdf"
                                       download="BudraHH_Resume.pdf"
                                       className="inline-flex items-center gap-2 text-gray-300 border border-cyan-600/80 px-4 py-2 rounded text-sm font-mono bg-cyan-700/80 hover:text-white hover:bg-cyan-600/80 active:bg-cyan-800/80 active:scale-[0.98] transition-all duration-150 ease-in-out shadow-md hover:shadow-lg group"
                                   >
                                       <FaDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                       Get Resume.pdf
                                   </a>
                               </div>
                           </div>

                           {/* Column 3: Image */}
                           <div className="lg:col-span-1 flex justify-center items-start pt-4 lg:pt-0"> {/* Aligned top */}
                               <div className="relative group w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72"> {/* Slightly smaller */}
                                   {/* Enhanced Glow/Frame */}
                                   <div className="absolute -inset-2.5 rounded-full bg-gradient-to-br from-cyan-600/40 via-purple-600/40 to-transparent blur-xl opacity-70 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
                                   <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-700/50 group-hover:border-cyan-500/60 transition duration-500 animate-spin-slow"></div> {/* Dashed rotating border */}

                                   {/* Image container */}
                                   <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-600/80 shadow-xl shadow-black/50 p-1 bg-gray-800"> {/* Inner padding */}
                                       <img
                                           src="/images/profile-placeholder.png" // Replace with your image
                                           alt="BudraHH - Profile Picture"
                                           className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
                                           // loading="lazy"
                                           // onError={(e) => { e.target.onerror = null; e.target.src = '/images/profile-placeholder.png'; }}
                                       />
                                   </div>
                               </div>
                           </div>

                       </div>
                   </div>

                   </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(About);

// --- Add this CSS if you don't have it already ---
/*
// Add slow spin animation
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 25s linear infinite;
}

// Ensure other necessary animations/classes are defined
// (e.g., scanline-bg, animated-grid-bg, character-stream, animation-delay-4000)
*/