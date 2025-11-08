import { motion, useTransform } from "framer-motion";
import TypedText from "../components/TypedText.jsx";
import {
    FaPython,
    FaJava,
    FaReact,
    FaNodeJs,
    FaDocker,
    FaGitAlt,
    FaLinux,
    FaWrench,
    FaShieldAlt,
    FaCss3,
    FaHtml5, FaChevronDown,
} from "react-icons/fa";
import {
    SiJavascript,
    SiTailwindcss,
    SiDjango,
    SiFlask,
    SiExpress,
    SiPostgresql,
    SiMongodb,
    SiPostman,
    SiGithubactions,
} from "react-icons/si";
import { useEffect, useState, useCallback } from "react";

export default function Skills({ scrollProgress }) {
    const skills = [
        {
            id: "languages",
            title: "Languages",
            icon: null,
            color: "from-indigo-500 to-purple-500",
            borderColor: "border-indigo-500",
            bgColor: "bg-indigo-500/10",
            technologies: [
                { name: "Python", icon: <FaPython />, category: "Language" },
                { name: "Java", icon: <FaJava />, category: "Language" },
                { name: "JavaScript (ES6+)", icon: <SiJavascript />, category: "Language" },
            ],
        },
        {
            id: "frontend",
            title: "Frontend Development",
            icon: FaReact,
            color: "from-blue-500 to-cyan-500",
            borderColor: "border-blue-500",
            bgColor: "bg-blue-500/10",
            technologies: [
                { name: "React.js", icon: <FaReact />, category: "Framework" },
                { name: "HTML5", icon: <FaHtml5 />, category: "HTML" },
                { name: "CSS", icon: <FaCss3 />, category: "CSS" },
                { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Styling" },
            ],
        },
        {
            id: "backend",
            title: "Backend Development",
            icon: FaNodeJs,
            color: "from-green-500 to-emerald-500",
            borderColor: "border-green-500",
            bgColor: "bg-green-500/10",
            technologies: [
                { name: "Node.js", icon: <FaNodeJs />, category: "Runtime" },
                { name: "Django", icon: <SiDjango />, category: "Framework" },
                { name: "Flask", icon: <SiFlask />, category: "Framework" },
                { name: "Express.js", icon: <SiExpress />, category: "Framework" },
            ],
        },
        {
            id: "api",
            title: "API & Architecture",
            icon: null,
            color: "from-purple-500 to-pink-500",
            borderColor: "border-purple-500",
            bgColor: "bg-purple-500/10",
            technologies: [
                { name: "REST APIs", icon: null, category: "Design" },
                { name: "WebSockets", icon: null, category: "Real-time" },
                { name: "JSON", icon: null, category: "Data Format" },
                { name: "MVC Pattern", icon: null, category: "Architecture" },
                { name: "JWT", icon: <FaShieldAlt />, category: "Authentication" },
            ],
        },
        {
            id: "database",
            title: "Database Management",
            icon: SiPostgresql,
            color: "from-orange-500 to-red-500",
            borderColor: "border-orange-500",
            bgColor: "bg-orange-500/10",
            technologies: [
                { name: "PostgreSQL", icon: <SiPostgresql />, category: "SQL" },
                { name: "MongoDB", icon: <SiMongodb />, category: "NoSQL" },
            ],
        },
        {
            id: "devtools",
            title: "DevOps & Tools",
            icon: FaWrench,
            color: "from-yellow-500 to-amber-500",
            borderColor: "border-yellow-500",
            bgColor: "bg-yellow-500/10",
            technologies: [
                { name: "Git", icon: <FaGitAlt />, category: "Version Control" },
                { name: "GitHub Actions", icon: <SiGithubactions />, category: "CI/CD" },
                { name: "Docker", icon: <FaDocker />, category: "Containerization" },
                { name: "Linux", icon: <FaLinux />, category: "OS" },
                { name: "Postman", icon: <SiPostman />, category: "API Testing" },
            ],
        },
    ];

    const [startTitleTyping, setStartTitleTyping] = useState(false);
    const [titleTypingComplete, setTitleTypingComplete] = useState(false);
    const [startDescriptionTyping, setStartDescriptionTyping] = useState(false);
    const [descriptionTypingComplete, setDescriptionTypingComplete] = useState(false);
    const [showCards, setShowCards] = useState(false);

    // Track expanded categories for toggling "See More" per category
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategoryExpansion = (id) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        if (!scrollProgress) {
            setStartTitleTyping(true);
            return;
        }

        const checkStart = () => {
            const current = scrollProgress.get();
            if (current >= 0.53 && !startTitleTyping) {
                setStartTitleTyping(true);
            }
        };

        checkStart();

        const unsubscribe = scrollProgress.on("change", (latest) => {
            if (latest >= 0.53 && !startTitleTyping) {
                setStartTitleTyping(true);
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, startTitleTyping]);

    useEffect(() => {
        if (titleTypingComplete && !startDescriptionTyping) {
            setStartDescriptionTyping(true);
        }
    }, [titleTypingComplete, startDescriptionTyping]);

    useEffect(() => {
        if (descriptionTypingComplete && !showCards) {
            setShowCards(true);
        }
    }, [descriptionTypingComplete, showCards]);

    const handleTitleComplete = useCallback(() => {
        setTitleTypingComplete(true);
    }, []);

    const handleDescriptionComplete = useCallback(() => {
        setDescriptionTypingComplete(true);
    }, []);

    const visibility = scrollProgress
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useTransform(scrollProgress, [0.53, 0.54], ["hidden", "visible"])
        : "visible";

    return (
        <div
            className="w-full h-full max-w-[79rem] p-16  flex flex-col justify-center items-center relative"
            style={{ pointerEvents: "auto" }}
        >
            <motion.div
                className="w-full"
                style={{ pointerEvents: "auto" }}
            >
                <div
                    className="w-full border border-cyan-400/30 backdrop-blur-2xl bg-gradient-to-b from-white/10 via-cyan-400/5 to-transparent rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.1)] transition-all duration-500 ]"
                    >

                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.15)_0%,transparent_80%)] pointer-events-none"></div>

                    {/* Top Accent Line */}
                    <motion.div
                        style={{ visibility }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-600 to-cyan-400 mb-10 rounded-full shadow-cyan-500/30"
                    />

                    {/* Heading */}
                    {startTitleTyping && (
                        <div className="w-full flex flex-row justify-between items-center relative">
                            <motion.code
                                style={{ visibility }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-8 select-text"
                            >
                                {"<"}
                                <TypedText
                                    key="skills-title-typed"
                                    strings={["Skills possessed"]}
                                    showCursor={false}
                                    typeSpeed={30}
                                    startDelay={300}
                                    onComplete={handleTitleComplete}
                                />
                                {"/>"}
                            </motion.code>
                            {startDescriptionTyping && (
                                <motion.pre
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="text-md md:text-lg text-gray-300 leading-relaxed mb-5 max-w-3xl whitespace-pre-line select-text"
                                >
                                    <TypedText
                                        strings={[
                                            "   Always Learning • Always Growing"
                                        ]}
                                        showCursor={false}
                                        typeSpeed={10}
                                        onComplete={handleDescriptionComplete}
                                    />
                                </motion.pre>
                            )}
                        </div>
                    )}

                    {/* Description Text */}


                    {/* Skill Cards */}
                    {showCards && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className=" w-full h-full max-h-[25rem] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 "
                            style={{ pointerEvents: "auto" }}
                        >
                            {skills.map(({ id, title, color, borderColor, bgColor, technologies }) => {
                                const isExpanded = expandedCategories[id];
                                const visibleTechs = isExpanded ? technologies : technologies.slice(0, 3);
                                const hasMore = technologies.length > 3;
                                return (
                                    <div
                                        key={id}
                                        className={`rounded-lg p-4 border ${borderColor} ${bgColor} shadow-md`}
                                        style={{ pointerEvents: "auto" }}
                                    >
                                        <h3 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${color} mb-4`}>
                                            {title}
                                        </h3>
                                        <ul className="space-y-2" style={{ pointerEvents: "auto" }}>
                                            {visibleTechs.map(({ name, icon }, index) => (
                                                <li
                                                    key={name}
                                                    className="flex items-center justify-between text-gray-200"
                                                    style={{ pointerEvents: "auto" }}
                                                >
                                                    <div className="flex items-center gap-2 text-gray-200">
                                                        {icon && <span className="text-cyan-400">{icon}</span>}
                                                        <span>{name}</span>
                                                    </div>
                                                    {/* Show button on the LAST visible item if there are more */}
                                                    {index === visibleTechs.length - 1 && hasMore && (
                                                        <button
                                                            onClick={(e) => {
                                                                console.log("=== BUTTON CLICKED ===");
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                toggleCategoryExpansion(id);
                                                            }}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                            className="text-cyan-300 hover:text-cyan-100 flex justify-center items-center gap-1 text-sm rounded transition-all cursor-pointer relative z-50"
                                                            style={{
                                                                pointerEvents: "auto",
                                                                touchAction: "auto",
                                                                userSelect: "none"
                                                            }}
                                                            type="button"
                                                        >
                                                            {isExpanded ? "See Less " : "See More"}
                                                            <FaChevronDown
                                                            className="mt-0.5"
                                                            style={{
                                                                rotate: isExpanded ? "180deg" : "0deg",
                                                                transition: "rotate 2s ease-in-out"
                                                            }}
                                                        />
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* Bottom Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full shadow-cyan-500/30 mt-12"
                    />
                </div>
            </motion.div>
        </div>
    );
}
