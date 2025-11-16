import React, { forwardRef, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { user_name, sections } from "../utils/constants.js";
import TypedText from "./TypedText.jsx";
import AutoCommand from "./AutoCommand.jsx";
import Closing from "../sections/Closing.jsx";

const NewCommand = forwardRef(({ user_name, currentPath, onSubmit, history, onFocusChange }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(null);
    const [cursorPos, setCursorPos] = useState(0);
    const [focused, setFocused] = useState(true);

    // Focus input with multiple retries for visibility
    useEffect(() => {
        const focusInput = () => {
            if (ref?.current) {
                const rect = ref.current.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0;
                if (isVisible) {
                    ref.current.focus();
                    return true;
                }
                return false;
            }
            return false;
        };

        focusInput();
        const timers = [
            setTimeout(focusInput, 0),
            setTimeout(focusInput, 100),
            setTimeout(focusInput, 300),
            setTimeout(focusInput, 800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [ref]);

    // Keep cursor position in sync
    useEffect(() => {
        if (ref?.current && cursorPos !== null) {
            requestAnimationFrame(() => {
                if (ref?.current) {
                    ref.current.selectionStart = cursorPos;
                    ref.current.selectionEnd = cursorPos;
                }
            });
        }
    }, [cursorPos, inputValue, ref]);

    const handleKeyDown = (e) => {
        e.stopPropagation();
        const val = inputValue;

        switch (e.key) {
            case "Enter":
                e.preventDefault();
                if (val.trim()) {
                    onSubmit(val.trim());
                    setInputValue("");
                    setHistoryIndex(null);
                    setCursorPos(0);
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (history.length === 0) return;
                if (historyIndex === null) {
                    setHistoryIndex(history.length - 1);
                    setInputValue(history[history.length - 1]);
                    setCursorPos(history[history.length - 1].length);
                } else if (historyIndex > 0) {
                    setHistoryIndex(historyIndex - 1);
                    setInputValue(history[historyIndex - 1]);
                    setCursorPos(history[historyIndex - 1].length);
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (history.length === 0 || historyIndex === null) return;
                if (historyIndex === history.length - 1) {
                    setHistoryIndex(null);
                    setInputValue("");
                    setCursorPos(0);
                } else {
                    setHistoryIndex(historyIndex + 1);
                    setInputValue(history[historyIndex + 1]);
                    setCursorPos(history[historyIndex + 1].length);
                }
                break;
            case "ArrowLeft":
                setCursorPos((pos) => Math.max(pos - 1, 0));
                break;
            case "ArrowRight":
                setCursorPos((pos) => Math.min(pos + 1, inputValue.length));
                break;
            default:
                setHistoryIndex(null);
                break;
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setCursorPos(e.target.selectionStart);
    };

    return (
        <div className="relative flex items-center flex-wrap">
            <span className="text-cyan-400 text-[10px] xs:text-xs sm:text-sm">{user_name}</span>
            <span className="text-white text-[10px] xs:text-xs sm:text-sm">:{currentPath}$</span>
            <div className="relative inline-block z-20 min-w-[1ch]">
                <input
                    ref={ref}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    onClick={(e) => {
                        e.stopPropagation();
                        setCursorPos(e.target.selectionStart);
                        ref?.current?.focus();
                    }}
                    onFocus={() => {
                        setFocused(true);
                        onFocusChange?.(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onFocusChange?.(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        width: `${Math.max(inputValue.length, 1)}ch`,
                        minWidth: "1ch",
                        position: "relative",
                        zIndex: 20,
                        fontSize: 'inherit',
                    }}
                    className="bg-transparent border-none outline-none text-cyan-300 ml-1 xs:ml-2 font-mono caret-transparent text-[10px] xs:text-xs sm:text-sm"
                    autoComplete="off"
                    autoFocus
                    tabIndex={0}
                    readOnly={false}
                    disabled={false}
                />
                {focused && (
                    <span
                        style={{ left: `calc(${cursorPos}ch + 0.25rem)` }}
                        className="absolute ml-1 xs:ml-2 mt-0.5 xs:mt-1 w-[0.5ch] xs:w-[1ch] h-[1em] bg-cyan-300 animate-pulse pointer-events-none"
                    />
                )}
            </div>
        </div>
    );
});

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            // Consider devices with width < 768px as mobile (Tailwind's md breakpoint)
            setIsMobile(width < 768);
        };

        // Check on mount
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

export default function Terminal({
                                     scrollProgress,
                                     isAuto: propIsAuto,
                                     setIsAuto: propSetIsAuto,
                                     setManualX,
                                     scrollToProgress,
                                     onSkillsCommand, onInfoCommand, onCareerJourneyCommand, onContactCommand,
                                     onProjectsCommand,
                                     infoPid,setInfoPid,skillsPid,setSkillsPid,journeyPid,setJourneyPid,projectsPid,setProjectsPid,contactPid,setContactPid,
                                 setDisplayEnd}) {
    // ========================================
    // REFS
    // ========================================
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const terminalRef = useRef(null);
    const currentPathRef = useRef("~");
    const isProcessingRef = useRef(false);
    const lastCommandRef = useRef({ command: null, timestamp: 0 });
    const pidCacheRef = useRef({});
    const [isExiting, setIsExiting] = useState(false);
    // ========================================
    // CONSTANTS
    // ========================================
    const priorInstructions = [
        "╔════════════════════════════════════════════════════════════╗",
        "║            WELCOME TO PORTFOLIO TERMINAL v1.0              ║",
        "╚════════════════════════════════════════════════════════════╝",
        "",
        "║                  BY DEFAULT IN AUTO MODE                   ║",
        "",
        "1. AUTO MODE: Commands queue & execute automatically (1s delay)",
        "   Disclaimer: Auto mode runs commands without confirmation",
        "",
        "2. MANUAL MODE: Commands execute immediately on Enter (Recommended)",
        "",
        "3. Navigation: cd portfolio → ls → cd [section] → ls -la",
        "",
        "4. Available Sections: info, skills, education, projects, contact, resume",
        "",
        "Type 'help' for all commands | Press ↑↓ for history",
        "════════════════════════════════════════════════════════════",
    ];

    const treeOutput = [
        "~",
        "├── instructions.txt",
        "└── portfolio/",
        "    ├── info/",
        "    │   └── info.sh",
        "    ├── skills/",
        "    │   └── skills-manager.sh",
        "    ├── journey/",
        "    │   └── career-journey.sh",
        "    ├── projects/",
        "    │   └── projects.sh",
        "    ├── contact/",
        "    │   └── get-in-touch.sh",
        "    └── closing/",
        "        └── closing-greet.sh",
        "",
        "7 directories, 7 files",
    ];

    const SCROLL_DOWN_MAP = [
        {
            section: "initial-1",
            scrollRange: [0.06, 0.08],
            commands: [
                { command: "cat instructions.txt", key: "cat-instructions" },
            ]
        },
        {
            section: "initial-2",
            scrollRange: [0.07, 0.09],
            commands: [
                { command: "tree", key: "tree-initial" }
            ]
        },
        {
            section: "info",
            scrollRange: [0.16, 0.20],
            commands: [
                { command: "cd ~/portfolio/info", key: "cd-portfolio-info" },
                { command: "firefox https://portfoliobudra.com/info &", key: "cat-info" }
            ]
        },
        {
            section: "info-kill",
            scrollRange: [0.21, 0.24],
            commands: [
                { command: `kill ${infoPid}`, key: "kill-portfolio-info" },
            ]
        },
        {
            section: "skills",
            scrollRange: [0.25, 0.30],
            commands: [
                { command: "cd ~/portfolio/skills", key: "cd-portfolio-skills" },
                { command: "bash skills-manager.sh &", key: "bash-skills" }
            ]
        },
        {
            section: "skills-kill",
            scrollRange: [0.31, 0.34],
            commands: [
                { command: `kill ${skillsPid}`, key: "kill-portfolio-skills" },
            ]
        },
        {
            section: "journey",
            scrollRange: [0.35, 0.40],
            commands: [
                { command: "cd ~/portfolio/journey", key: "cd-journey" },
                { command: "bash career-journey.sh &", key: "bash-journey" }
            ]
        },
        {
            section: "journey-kill",
            scrollRange: [0.41, 0.44],
            commands: [
                { command: `kill ${journeyPid}`, key: "kill-journey" },
            ]
        },
        {
            section: "projects",
            scrollRange: [0.45, 0.50],
            commands: [
                { command: "cd ~/portfolio/projects", key: "cd-projects" },
                { command: "bash projects.sh &", key: "bash-projects" }
            ]
        },
        {
            section: "projects-kill",
            scrollRange: [0.51, 0.54],
            commands: [
                { command: `kill ${projectsPid}`, key: "kill-projects" }
            ]
        },
        {
            section: "contact",
            scrollRange: [0.55, 0.60],
            commands: [
                { command: "cd ~/portfolio/contact", key: "cd-contact" },
                { command: "bash get-in-touch.sh &", key: "bash-contact" }
            ]
        },
        {
            section: "contact-kill",
            scrollRange: [0.61, 0.64],
            commands: [
                { command: `kill ${contactPid}`, key: "kill-contact" },
            ]
        },
        {
            section: "closing",
            scrollRange: [0.65, 0.70],
            commands: [
                { command: "cd ~/portfolio/closing", key: "closing" },
                { command: "source closing-greet.sh", key: "closing" },
            ]
        },
        {
            section: "exit",
            scrollRange: [0.71, 0.74],
            commands: [
                { command: "exit", key: "exit" },
            ]
        }
    ];

    const SCROLL_UP_MAP = [
        {
            section: "contact-back",
            scrollRange: [0.97, 1.0],
            commands: [
                { command: "cd ~/portfolio/projects", key: "back-to-projects" },
                { command: "bash projects.sh", key: "bash-projects-back" }
            ]
        },
        {
            section: "projects-back",
            scrollRange: [0.86, 0.97],
            commands: [
                { command: "cd ~/portfolio/journey", key: "back-to-journey" },
                { command: "bash career-journey.sh", key: "bash-journey-back" }
            ]
        },
        {
            section: "journey-back",
            scrollRange: [0.67, 0.86],
            commands: [
                { command: "cd ~/portfolio/skills", key: "back-to-skills" },
                { command: "bash skills-manager.sh", key: "bash-skills-back" }
            ]
        },
        {
            section: "skills-back",
            scrollRange: [0.51, 0.67],
            commands: [
                { command: "cd ~/portfolio/info", key: "back-to-info" },
                { command: "firefox https://portfoliobudra.com/info", key: "cat-info-back" }
            ]
        },
        {
            section: "info-back",
            scrollRange: [0.35, 0.51],
            commands: [
                { command: "cd ~", key: "back-to-home" },
            ]
        },
        {
            section: "initial-back-2",
            scrollRange: [0.23, 0.26],
            commands: [
                { command: "tree", key: "tree-initial" }
            ]
        },
        {
            section: "initial-back-1",
            scrollRange: [0.20, 0.23],
            commands: [
                { command: "cat instructions.txt", key: "prior_instructions" },
            ]
        }
    ];

    // ========================================
    // STATE
    // ========================================
    const [basePath] = useState("~");
    const [currentPath, setCurrentPath] = useState(basePath);
    const [history, setHistory] = useState([]);
    const [localIsAuto, setLocalIsAuto] = useState(propIsAuto || false);
    const [executedSections, setExecutedSections] = useState(new Set());
    const [lastScrollProgress, setLastScrollProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("down");
    const [autoCommandQueue, setAutoCommandQueue] = useState([]);
    const [currentAutoCommand, setCurrentAutoCommand] = useState(null);
    const [isProcessingAuto, setIsProcessingAuto] = useState(false);
    const [priorInstructionsComplete, setPriorInstructionsComplete] = useState(false);
    const [isTreeExecuted, setIsTreeExecuted] = useState(false);
    const [isTreeOutputRendered, setIsTreeOutputRendered] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const isMobile = useIsMobile();
    const isAuto = isMobile ? true : (propSetIsAuto ? propIsAuto : localIsAuto);
    const setIsAuto = propSetIsAuto || setLocalIsAuto;

    // ========================================
    // COMPUTED VALUES
    // ========================================
    const commandHistory = history.map(({ command }) => command);

    const SECTION_SCROLL_TARGETS = useMemo(() => ({
        "info": 0.48,
        "skills": 0.645,
        "journey": 0.805,
        "projects": 0.94,
        "contact": 0.995,
        "closing" : 1
    }), []);

    // ========================================
    // EFFECTS - Update Refs
    // ========================================
    useEffect(() => {
        currentPathRef.current = currentPath;
    }, [currentPath]);

    // ========================================
    // HANDLERS
    // ========================================
    const handleClickAuto = () => setIsAuto(true);
    const handleClickManual = () => setIsAuto(false);

    const handleTreeCommandExecuted = () => {
        setIsTreeExecuted(true);
        setTimeout(() => {
            setIsTreeOutputRendered(true);
        }, 10);
    };

    const handleInputFocusChange = (focused) => setInputFocused(focused);

    const handleManualCommand = useCallback((input) => {
        let output = null;
        let newPath = currentPathRef.current;
        const cleanInput = input.trim().replace(/\s*&\s*$/, '');
        const cmd = cleanInput.toLowerCase();

        setTimeout(() => inputRef?.current?.focus(), 0);

        if (cmd.startsWith("cd")) {
            const parts = cmd.split(" ");
            if (parts.length === 2) {
                let destination = parts[1].trim().replace(/\/$/, "");

                if (destination === "~" || destination === "") {
                    newPath = "~";
                    output = null;
                } else {
                    const sectionNames = sections.map((s) => s.name);
                    let currentParts = newPath.replace(/^~\/?/, "").split("/").filter(Boolean);

                    if (destination.startsWith("~")) {
                        destination = destination.replace(/^~\/?/, "");
                        currentParts = [];
                    } else if (destination.startsWith("/")) {
                        destination = destination.substring(1);
                        currentParts = [];
                    } else {
                        destination = destination.replace(/^\.\//, "");
                    }

                    const destParts = destination.split("/").filter(Boolean);
                    let errorOccurred = false;

                    for (let part of destParts) {
                        if (part === "~") {
                            currentParts = [];
                        } else if (part === "..") {
                            if (currentParts.length > 0) {
                                currentParts.pop();
                            }
                        } else if (part === ".") {
                            continue;
                        } else if (part === "portfolio") {
                            if (currentParts.length === 0) {
                                currentParts.push("portfolio");
                            } else {
                                output = [`bash: cd: ${destination}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            }
                        } else if (sectionNames.includes(part)) {
                            if (currentParts.length === 1 && currentParts[0] === "portfolio") {
                                currentParts.push(part);
                            } else if (currentParts.length === 0) {
                                output = [`bash: cd: ${part}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            } else {
                                output = [`bash: cd: ${destination}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            }
                        } else {
                            output = [`bash: cd: ${destination}: No such file or directory`];
                            errorOccurred = true;
                            break;
                        }
                    }

                    if (!errorOccurred) {
                        newPath = currentParts.length > 0 ? `~/${currentParts.join("/")}` : "~";
                        output = null;
                    } else {
                        newPath = currentPathRef.current;
                    }
                }
            } else if (parts.length === 1) {
                newPath = "~";
                output = null;
            } else {
                output = ["bash: cd: too many arguments"];
            }
        }
        else if (cmd.startsWith("ls")) {
            const showDetails = cmd.includes("-la");
            if (newPath === "~") {
                output = showDetails
                    ? [
                        "drwxr-xr-x  5 dev  portfolio  4096 Jan 01 12:34 portfolio",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 .",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 ..",
                    ]
                    : ["instructions.txt    portfolio"];
            } else if (newPath === "~/portfolio") {
                output = showDetails
                    ? sections.map(({ name, size, date }) => `drwxr-xr-x  5 dev  portfolio  ${size} ${date} ${name}`)
                    : [sections.map(({ name }) => name).join("  ")];
            } else if (newPath.startsWith("~/portfolio/")) {
                const currentSection = newPath.split("/").pop();
                const section = sections.find((s) => s.name === currentSection);
                output = section
                    ? showDetails
                        ? [`-rw-r--r--  1 dev  portfolio  ${section.size}  ${section.date}  ${section.file}`]
                        : [section.file]
                    : ["(empty directory) No files or directories in this location."];
            } else {
                output = ["(empty directory) No files or directories in this location."];
            }
        }
        else if (cmd === "tree") {
            if (newPath === "~") output = treeOutput;
            else if (newPath === "~/portfolio")
                output = [
                    "~/portfolio",
                    "├── info/",
                    "│   └── info.sh",
                    "├── skills/",
                    "│   └── skills-manager.sh",
                    "├── journey/",
                    "│   └── career-journey.sh",
                    "├── projects/",
                    "│   └── projects.sh",
                    "├── contact/",
                    "│   └── get-in-touch.sh",
                    "└── closing/",
                    "    └── closing-greet.sh",
                    "",
                    "7 directories, 7 files",
                ];
            else if (newPath.startsWith("~/portfolio/")) {
                const currentSection = newPath.split("/").pop();
                const section = sections.find((s) => s.name === currentSection);
                output = section
                    ? [`~/portfolio/${currentSection}`, `└── ${section.file}`, "", "0 directories, 1 file"]
                    : ["(empty directory)"];
            }
        }
        else if (cmd === "pwd") {
            output = [newPath];
        }
        else if (cmd === "cls" || cmd === "clear") {
            setHistory([]);
            output = null;
        }
        else if (cmd === "help") {
            output = [
                "Available commands:",
                "",
                "  ls            - List directory contents",
                "  ls -la        - List detailed directory contents",
                "  cd <dir>      - Change the current directory",
                "  cd ..         - Go back to the previous directory",
                "  cd ~          - Return to the home directory",
                "  tree          - Display directory tree structure",
                "  pwd           - Print working directory",
                "  clear / cls   - Clear the terminal screen",
                "  help          - Display this help message",
                "",
                "Examples:",
                "  cd portfolio",
                "  cd ./portfolio/contact",
                "  bash get-in-touch.sh",
                "  tree",
                "  ls -la",
                "",
                "Tip: Use ↑ and ↓ arrows to navigate command history.",
            ];
        }
        else if (cmd === "date") {
            const now = new Date();
            output = [now.toString()];
        }
        else if (cmd.startsWith("cat")) {
            if (cmd.includes("info.sh")) output = ["Portfolio Information File"];
            else if (cmd.includes("skills-manager.sh")) output = ["Skills Package Manager Script"];
            else if (cmd.includes("career-journey.sh")) output = ["Career Journey Timeline Script"];
            else if (cmd.includes("projects.sh")) output = ["Projects Collection Script"];
            else if (cmd.includes("get-in-touch.sh")) output = ["Contact & Communication Script"];
            else if (cmd.includes("closing-greet.sh")) output = ["Closing Greeting Script"];
            else if (cmd.includes("resume.jsx")) output = ["Resume File"];
            else if (cmd.includes("instructions.txt")) output = priorInstructions;
            else output = [`bash: cat: ${cmd.split(" ")[1]}: No such file or directory`];
        }
        else if (cmd.startsWith("node")) {
            const fileName = cmd.split(" ").slice(1).join(" ").trim();

            if (!fileName) {
                output = ["node: missing file operand", "Usage: node <filename.jsx>"];
            } else {
                const validNodeFiles = {
                    info: "info.jsx",
                    resume: "resume.jsx"
                };

                let cleanPath = fileName.replace(/^\.\/|^~\/|^\//, "");
                const pathParts = cleanPath.split("/").filter(Boolean);
                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1];

                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    targetSection = pathParts[1];
                } else if (Object.prototype.hasOwnProperty.call(validNodeFiles, pathParts[0])) {
                    targetSection = pathParts[0];
                } else if (pathParts.length === 1 && Object.values(validNodeFiles).includes(targetFile)) {
                    const currentPathParts = newPath.replace(/^~\//, "").split("/").filter(Boolean);
                    if (currentPathParts[0] === "portfolio" && currentPathParts.length > 1) {
                        targetSection = currentPathParts[1];
                    }
                }

                if (!targetFile) {
                    output = [`node: ${fileName}: Invalid path`];
                } else if (targetSection && validNodeFiles[targetSection] === targetFile) {
                    const expectedPath = `~/portfolio/${targetSection}`;
                    const normalizedCurrentPath = newPath.replace(/^~\//, "");
                    const expectedNormalized = expectedPath.replace(/^~\//, "");

                    if (normalizedCurrentPath === expectedNormalized) {
                        output = [
                            "Initializing component...",
                            `✓ ${targetFile} rendered successfully`,
                            `Component mounted at /portfolio/${targetSection}`
                        ];
                    } else {
                        output = [
                            `node: cannot find '${targetFile}'`,
                            `You are in: ${newPath}`,
                            `Expected: ${expectedPath}`
                        ];
                    }
                } else if (Object.values(validNodeFiles).includes(targetFile)) {
                    output = [
                        `node: cannot find '${targetFile}'`,
                        `Hint: Navigate to ~/portfolio/<section> first`
                    ];
                } else {
                    output = [
                        `node: ${fileName}: No such file or directory`,
                        "Usage: node <filename.jsx>"
                    ];
                }
            }
        }
        else if (cmd.startsWith("bash")) {
            const fileName = cmd.split(" ").slice(1).join(" ").trim().replace(/\s*&\s*$/, '');

            if (!fileName) {
                output = ["bash: missing file operand", "Usage: bash <filename.sh>"];
            } else {
                const validBashScripts = {
                    skills: "skills-manager.sh",
                    journey: "career-journey.sh",
                    projects: "projects.sh",
                    contact: "get-in-touch.sh",
                    closing: "closing-greet.sh"
                };

                let cleanPath = fileName.replace(/^\.\/|^~\/|^\//, "");
                const pathParts = cleanPath.split("/").filter(Boolean);
                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1];

                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    targetSection = pathParts[1];
                } else if (Object.prototype.hasOwnProperty.call(validBashScripts, pathParts[0])) {
                    targetSection = pathParts[0];
                } else if (pathParts.length === 1 && Object.values(validBashScripts).includes(targetFile)) {
                    const currentPathParts = newPath.replace(/^~\//, "").split("/").filter(Boolean);
                    if (currentPathParts[0] === "portfolio" && currentPathParts.length > 1) {
                        targetSection = currentPathParts[1];
                    }
                }

                if (!targetFile) {
                    output = [`bash: ${fileName}: Invalid path`];
                } else if (targetSection && validBashScripts[targetSection] === targetFile) {
                    const expectedPath = `~/portfolio/${targetSection}`;
                    const normalizedCurrentPath = newPath.replace(/^~\//, "");
                    const expectedNormalized = expectedPath.replace(/^~\//, "");

                    if (normalizedCurrentPath === expectedNormalized) {
                        if (targetFile === "closing-greet.sh") {
                            output = [
                                "╔════════════════════════════════════════════════════════╗",
                                "║           THANK YOU FOR VISITING MY PORTFOLIO          ║",
                                "╚════════════════════════════════════════════════════════╝",
                                "",
                                "It was great having you explore my work!",
                                "Feel free to reach out anytime.",
                                "",
                                "- Budra",
                                "",
                                <Closing key="closing-component" />
                            ];
                        } else {
                            const cacheKey = `${targetSection}-${targetFile}`;
                            if (!pidCacheRef.current[cacheKey]) {
                                pidCacheRef.current[cacheKey] = Math.floor(Math.random() * 29001) + 1000;
                            }
                            const newPid = pidCacheRef.current[cacheKey];

                            const timestamp = new Date().toLocaleTimeString('en-US', {
                                hour12: false,
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });

                            output = [
                                `[${timestamp}] bash ${targetFile}`,
                                `[1] ${newPid}`,
                                `Executing: /portfolio/${targetSection}/${targetFile}`,
                                ``,
                                `Process running in background...`,
                                `Use 'kill ${newPid}' to terminate`,
                                ``,
                                `[1]+ ${newPid} Running                bash ${targetFile} &`
                            ];

                            if (targetFile === "projects.sh") {
                                setProjectsPid(newPid);
                                onProjectsCommand?.();
                                if (isAuto && scrollToProgress && targetSection) {
                                    const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                    if (targetProgress !== undefined) {
                                        setTimeout(() => scrollToProgress(targetProgress), 300);
                                    }
                                }
                            } else if (targetFile === "skills-manager.sh") {
                                setSkillsPid(newPid);
                                onSkillsCommand?.();
                                if (isAuto && scrollToProgress && targetSection) {
                                    const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                    if (targetProgress !== undefined) {
                                        setTimeout(() => scrollToProgress(targetProgress), 300);
                                    }
                                }
                            } else if (targetFile === "career-journey.sh") {
                                setJourneyPid(newPid);
                                onCareerJourneyCommand?.();
                                if (isAuto && scrollToProgress && targetSection) {
                                    const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                    if (targetProgress !== undefined) {
                                        setTimeout(() => scrollToProgress(targetProgress), 300);
                                    }
                                }
                            } else if (targetFile === "get-in-touch.sh") {
                                setContactPid(newPid);
                                onContactCommand?.();
                                if (isAuto && scrollToProgress && targetSection) {
                                    const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                    if (targetProgress !== undefined) {
                                        setTimeout(() => scrollToProgress(targetProgress), 300);
                                    }
                                }
                            }
                        }
                    } else {
                        output = [
                            `bash: cannot find '${targetFile}'`,
                            `You are in: ${newPath}`,
                            `Expected: ${expectedPath}`
                        ];
                    }
                } else if (Object.values(validBashScripts).includes(targetFile)) {
                    output = [
                        `bash: cannot find '${targetFile}'`,
                        `Hint: Navigate to ~/portfolio/<section> first`
                    ];
                } else {
                    output = [
                        `bash: ${fileName}: No such file or directory`,
                        "Usage: bash <filename.sh>"
                    ];
                }
            }
        }
        else if (cmd.startsWith("firefox")) {
            const urlMatch = input.match(/firefox\s+(https?:\/\/[^\s&]+)/i);

            if (!urlMatch) {
                output = ["firefox: missing URL", "Usage: firefox <url>"];
            } else if (urlMatch[1] === "https://portfoliobudra.com/info") {
                if (newPath === "~/portfolio/info") {
                    const cacheKey = "info-firefox";
                    if (!pidCacheRef.current[cacheKey]) {
                        pidCacheRef.current[cacheKey] = Math.floor(Math.random() * 29001) + 1000;
                    }
                    const newPid = pidCacheRef.current[cacheKey];

                    const timestamp = new Date().toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });

                    output = [
                        `[${timestamp}] firefox ${urlMatch[1]}`,
                        `[1] ${newPid}`,
                        ``,
                        `[1]+ ${newPid} Running                firefox ${urlMatch[1]} &`
                    ];

                    setInfoPid(newPid);
                    onInfoCommand?.();

                    if (isAuto && scrollToProgress) {
                        const targetProgress = SECTION_SCROLL_TARGETS["info"];
                        if (targetProgress !== undefined) {
                            setTimeout(() => {
                                scrollToProgress(targetProgress);
                            }, 300);
                        }
                    }
                } else {
                    output = ["Command restricted to ~/portfolio/info directory"];
                }
            } else {
                output = [`firefox: ${urlMatch[1]}: Unknown URL`];
            }
        }
        else if (cmd.startsWith("kill")) {
            const parts = input.trim().split(" ");

            if (parts.length === 1) {
                output = [
                    "kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec",
                    "Try 'kill <pid>' or 'kill -9 <pid>'"
                ];
            } else if (parts.length === 2) {
                let targetPid = parts[1];

                if (targetPid === "KILL_INFO") {
                    targetPid = infoPid;
                } else if (targetPid === "KILL_SKILLS") {
                    targetPid = skillsPid;
                } else if (targetPid === "KILL_JOURNEY") {
                    targetPid = journeyPid;
                } else if (targetPid === "KILL_PROJECTS") {
                    targetPid = projectsPid;
                } else if (targetPid === "KILL_CONTACT") {
                    targetPid = contactPid;
                } else {
                    targetPid = parseInt(targetPid);
                }

                if (isNaN(targetPid) || targetPid === null || targetPid === 0) {
                    output = [`bash: kill: ${parts[1]}: arguments must be process or job IDs`];
                } else {
                    let killedSection = null;
                    let killedFile = null;
                    let wasRunning = false;

                    if (targetPid === infoPid && infoPid !== null && infoPid !== 0) {
                        killedSection = "info";
                        killedFile = "firefox https://portfoliobudra.com/info";
                        wasRunning = true;
                        setInfoPid(null);
                        onInfoCommand?.(false);
                        delete pidCacheRef.current["info-firefox"];
                    } else if (targetPid === skillsPid && skillsPid !== null && skillsPid !== 0) {
                        killedSection = "skills";
                        killedFile = "skills-manager.sh";
                        wasRunning = true;
                        setSkillsPid(null);
                        onSkillsCommand?.(false);
                        delete pidCacheRef.current["skills-skills-manager.sh"];
                    } else if (targetPid === journeyPid && journeyPid !== null && journeyPid !== 0) {
                        killedSection = "journey";
                        killedFile = "career-journey.sh";
                        wasRunning = true;
                        setJourneyPid(null);
                        onCareerJourneyCommand?.(false);
                        delete pidCacheRef.current["journey-career-journey.sh"];
                    } else if (targetPid === projectsPid && projectsPid !== null && projectsPid !== 0) {
                        killedSection = "projects";
                        killedFile = "projects.sh";
                        wasRunning = true;
                        setProjectsPid(null);
                        onProjectsCommand?.(false);
                        delete pidCacheRef.current["projects-projects.sh"];
                    } else if (targetPid === contactPid && contactPid !== null && contactPid !== 0) {
                        killedSection = "contact";
                        killedFile = "get-in-touch.sh";
                        wasRunning = true;
                        setContactPid(null);
                        onContactCommand?.(false);
                        delete pidCacheRef.current["contact-get-in-touch.sh"];
                    }

                    if (wasRunning && killedSection) {
                        const timestamp = new Date().toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });

                        const seconds = Math.floor(Math.random() * 51) + 10;
                        const milliseconds = Math.floor(Math.random() * 900) + 100;
                        const execTime = `${seconds}.${milliseconds}s`;

                        const processName = killedFile.startsWith("firefox")
                            ? killedFile
                            : `bash ${killedFile}`;

                        output = [
                            `[${timestamp}] Terminating process ${targetPid}...`,
                            ``,
                            `✓ Process ${targetPid} terminated successfully`,
                            `Signal: SIGTERM (15)`,
                            `Exit status: 0`,
                            `Total runtime: ${execTime}`,
                            ``,
                            `[1]+  Terminated              ${processName}`
                        ];
                    } else {
                        output = [
                            `bash: kill: (${targetPid}) - No such process`,
                            `Hint: Use 'ps' to list running processes`
                        ];
                    }
                }
            } else if (parts.length === 3 && (parts[1] === "-9" || parts[1] === "-KILL")) {
                const targetPid = parseInt(parts[2]);

                if (isNaN(targetPid)) {
                    output = [`bash: kill: ${parts[2]}: arguments must be process or job IDs`];
                } else {
                    let killedSection = null;
                    let killedFile = null;
                    let wasRunning = false;

                    if (targetPid === infoPid && infoPid !== null && infoPid !== 0) {
                        killedSection = "info";
                        killedFile = "firefox https://portfoliobudra.com/info";
                        wasRunning = true;
                        setInfoPid(null);
                        onInfoCommand?.(false);
                    } else if (targetPid === skillsPid && skillsPid !== null && skillsPid !== 0) {
                        killedSection = "skills";
                        killedFile = "skills-manager.sh";
                        wasRunning = true;
                        setSkillsPid(null);
                        onSkillsCommand?.(false);
                        delete pidCacheRef.current["skills-skills-manager.sh"];
                    } else if (targetPid === journeyPid && journeyPid !== null && journeyPid !== 0) {
                        killedSection = "journey";
                        killedFile = "career-journey.sh";
                        wasRunning = true;
                        setJourneyPid(null);
                        onCareerJourneyCommand?.(false);
                        delete pidCacheRef.current["journey-career-journey.sh"];
                    } else if (targetPid === projectsPid && projectsPid !== null && projectsPid !== 0) {
                        killedSection = "projects";
                        killedFile = "projects.sh";
                        wasRunning = true;
                        setProjectsPid(null);
                        onProjectsCommand?.(false);
                        delete pidCacheRef.current["projects-projects.sh"];
                    } else if (targetPid === contactPid && contactPid !== null && contactPid !== 0) {
                        killedSection = "contact";
                        killedFile = "get-in-touch.sh";
                        wasRunning = true;
                        setContactPid(null);
                        onContactCommand?.(false);
                        delete pidCacheRef.current["contact-get-in-touch.sh"];
                    }

                    if (wasRunning && killedSection) {
                        const timestamp = new Date().toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });

                        const seconds = Math.floor(Math.random() * 51) + 10;
                        const milliseconds = Math.floor(Math.random() * 900) + 100;
                        const execTime = `${seconds}.${milliseconds}s`;

                        const processName = killedFile.startsWith("firefox")
                            ? killedFile
                            : `bash ${killedFile}`;

                        output = [
                            `[${timestamp}] Force killing process ${targetPid}...`,
                            ``,
                            `✓ Process ${targetPid} killed (SIGKILL)`,
                            `Signal: SIGKILL (9)`,
                            `Exit status: 137`,
                            `Total runtime: ${execTime}`,
                            ``,
                            `[1]+  Killed                  ${processName}`
                        ];
                    } else {
                        output = [
                            `bash: kill: (${targetPid}) - No such process`,
                            `Hint: Use 'ps' to list running processes`
                        ];
                    }
                }
            } else {
                output = [
                    "bash: kill: too many arguments",
                    "Usage: kill [-s sigspec | -signum] pid",
                    "       kill -9 pid (force kill)"
                ];
            }
        }
        else if (cmd.startsWith("source") || cmd.startsWith(".")) {
            const fileName = cmd.replace(/^(source|\.)\s+/, "").trim();

            if (fileName === "closing-greet.sh") {
                if (newPath === "~/portfolio/closing") {
                    output = [
                        "╔════════════════════════════════════════════════════════╗",
                        "║           THANK YOU FOR VISITING MY PORTFOLIO          ║",
                        "╚════════════════════════════════════════════════════════╝",
                        "",
                        "It was great having you explore my work!",
                        "Feel free to reach out anytime.",
                        "",
                        "- Budra",
                        "",
                        <Closing key="closing-component" />
                    ];
                } else {
                    output = ["Command restricted to ~/portfolio/closing directory"];
                }
            } else {
                output = [`bash: source: ${fileName}: No such file or directory`];
            }
        }
        else {
            output = [`bash: ${cmd}: command not found`];
        }


        setCurrentPath(newPath);
        currentPathRef.current = newPath;

        const now = Date.now();
        const isDuplicate = lastCommandRef.current.command === input &&
            (now - lastCommandRef.current.timestamp) < 500;

        if (!isDuplicate) {
            lastCommandRef.current = { command: input, timestamp: now };
            setHistory((prev) => {
                const lastEntry = prev[prev.length - 1];
                if (lastEntry && lastEntry.command === input && lastEntry.path === newPath) {
                    return prev;
                }
                return [...prev, { command: input, output, path: newPath }];
            });
        }
    }, [isAuto, scrollToProgress, SECTION_SCROLL_TARGETS, onProjectsCommand, onSkillsCommand, onCareerJourneyCommand, onContactCommand, onInfoCommand, infoPid, skillsPid, journeyPid, projectsPid, contactPid, setInfoPid, setSkillsPid, setJourneyPid, setProjectsPid, setContactPid]);

    const executeAutoCommand = useCallback((command) => {
        return new Promise((resolve) => {
            setCurrentAutoCommand(command);
            const typingDuration = command.length * 50;

            setTimeout(() => {
                handleManualCommand(command);
                setCurrentAutoCommand(null);
                resolve()
            }, typingDuration);
        });
    }, [handleManualCommand]);

    const processAutoCommandQueue = useCallback(() => {
        if (isProcessingRef.current) {
            return;
        }

        isProcessingRef.current = true;
        setIsProcessingAuto(true);

        const processNext = () => {
            setAutoCommandQueue((prev) => {
                if (prev.length === 0) {
                    isProcessingRef.current = false;
                    setIsProcessingAuto(false);
                    return prev;
                }

                const [command, ...rest] = prev;

                executeAutoCommand(command).then(() => {
                    setTimeout(() => {
                        processNext();
                    }, 100);
                }).catch((error) => {
                    isProcessingRef.current = false;
                    setIsProcessingAuto(false);
                });

                return rest;
            });
        };

        processNext();
    }, [executeAutoCommand]);

    // ========================================
    // EFFECTS - Auto Mode
    // ========================================
    useEffect(() => {
        if (isAuto && autoCommandQueue.length > 0 && !isProcessingAuto && !isProcessingRef.current) {
            processAutoCommandQueue();
        }
    }, [isAuto, autoCommandQueue.length, isProcessingAuto, processAutoCommandQueue]);

    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        let rafId = null;
        let lastProcessedProgress = -1;
        const SCROLL_THRESHOLD = 0.001;

        const processScroll = (latest) => {
            if (Math.abs(latest - lastProcessedProgress) < SCROLL_THRESHOLD) {
                return;
            }

            lastProcessedProgress = latest;
            const direction = latest > lastScrollProgress ? "down" : latest < lastScrollProgress ? "up" : scrollDirection;
            setScrollDirection(direction);
            setLastScrollProgress(latest);

            const commandMap = SCROLL_DOWN_MAP;
            const currentSection = commandMap.find(({ scrollRange }) => {
                const [start, end] = scrollRange;
                return latest >= start && latest <= end;
            });

            const sectionKey = currentSection ? `${currentSection.section}-${direction}` : null;

            if (currentSection && sectionKey && !executedSections.has(sectionKey) && !isProcessingAuto) {
                // Dynamically resolve kill commands to use current PID values
                // This fixes the info section PID mismatch where kill command was evaluated at initialization
                const commandsToAdd = currentSection.commands.map(({ command }) => {
                    // If this is a kill command for info section, use current infoPid value
                    if (command.startsWith("kill ") && currentSection.section === "info-kill") {
                        return infoPid && infoPid !== 0 ? `kill ${infoPid}` : command;
                    }
                    return command;
                });
                setAutoCommandQueue((prev) => [...prev, ...commandsToAdd]);
                setExecutedSections((prev) => new Set(prev).add(sectionKey));
                setPriorInstructionsComplete(true);
            }
        };

        const unsubscribe = scrollProgress.on("change", (latest) => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => processScroll(latest));
        });

        return () => {
            unsubscribe();
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [scrollProgress, isAuto, executedSections, isProcessingAuto, lastScrollProgress, scrollDirection, infoPid]);

    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        let rafId = null;

        const processReset = (latest) => {
            setExecutedSections((prev) => {
                const newSet = new Set();
                const direction = latest > lastScrollProgress ? "down" : "up";

                [SCROLL_DOWN_MAP, SCROLL_UP_MAP].forEach((commandMap) => {
                    commandMap.forEach(({ section, scrollRange }) => {
                        const [start, end] = scrollRange;
                        const sectionKeyDown = `${section}-down`;
                        const sectionKeyUp = `${section}-up`;

                        if (latest >= start - 0.05 && latest <= end + 0.05) {
                            if (prev.has(sectionKeyDown)) newSet.add(sectionKeyDown);
                            if (prev.has(sectionKeyUp)) newSet.add(sectionKeyUp);
                        }
                    });
                });

                return newSet;
            });
        };

        const unsubscribe = scrollProgress.on("change", (latest) => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => processReset(latest));
        });

        return () => {
            unsubscribe();
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [scrollProgress, isAuto, lastScrollProgress]);

    // ========================================
    // EFFECTS - UI Updates
    // ========================================
    useEffect(() => {
        if (isTreeExecuted && !isTreeOutputRendered) {
            const timer = setTimeout(() => {}, 100);
            return () => clearTimeout(timer);
        }
    }, [isTreeExecuted, isTreeOutputRendered]);

    useEffect(() => {
        if (!isAuto && inputRef?.current) {
            const isFocused = document.activeElement === inputRef.current;
            if (isFocused !== inputFocused) setInputFocused(isFocused);
        }
    }, [isAuto, inputFocused]);

    useEffect(() => {
        if (!isAuto) {
            setManualX(inputFocused ? 650 : 800);
        }
    }, [isAuto, inputFocused, setManualX]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isTreeExecuted]);

    useEffect(() => {
        const focusInput = () => {
            if (!inputRef?.current) return false;
            const rect = inputRef.current.getBoundingClientRect();
            const isVisible =
                rect.width > 0 &&
                rect.height > 0 &&
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);
            if (isVisible) {
                inputRef.current.focus();
                return true;
            }
            return false;
        };

        focusInput();

        const timers = [
            setTimeout(focusInput, 100),
            setTimeout(focusInput, 500),
            setTimeout(focusInput, 1000),
            setTimeout(focusInput, 2000),
        ];

        let observer = null;
        const setupObserver = () => {
            if (inputRef?.current && !observer) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                                setTimeout(focusInput, 100);
                            }
                        });
                    },
                    { threshold: 0.1 }
                );
                observer.observe(inputRef.current);
            }
        };

        setTimeout(setupObserver, 100);
        setTimeout(setupObserver, 500);

        const handleGlobalKeyDown = (e) => {
            if (
                document.activeElement !== inputRef?.current &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.altKey &&
                e.key.length === 1 &&
                inputRef?.current
            ) {
                focusInput();
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);

        return () => {
            timers.forEach(clearTimeout);
            if (observer && inputRef?.current) observer.unsubscribe?.(inputRef.current);
            window.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, []);

    return (
        <div
            ref={terminalRef}
            tabIndex={-1}
            onFocus={(e) => e.target === e.currentTarget && inputRef?.current?.focus()}
            onClick={(e) => {
                if (e.target === e.currentTarget || !e.target.closest("input")) {
                    setTimeout(() => inputRef?.current?.focus(), 0);
                }
            }}
            className="relative
                w-[calc(100%-1rem)]
                sm:w-[32rem] md:w-[48rem] lg:w-[60rem]
                max-w-full md:max-w-3xl
                h-[20rem] sm:h-[28rem] md:h-[25rem]
                rounded-lg sm:rounded-xl md:rounded-2xl
                overflow-hidden font-mono text-white
                backdrop-blur-[24px] backdrop-brightness-75 border border-cyan-500/20
                shadow-[0_0_10px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.05)]
                transition-transform duration-500
                mx-auto"
        >
            {/* Header */}
            <div className="flex flex-row justify-between items-center bg-gradient-to-r from-[#0f0f0f]/90 to-[#1a1a1a]/90 border-b border-cyan-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 flex-1 min-w-0">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)] flex-shrink-0" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] flex-shrink-0" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)] flex-shrink-0" />
                    <span className="ml-1.5 sm:ml-2 md:ml-3 text-[10px] sm:text-xs md:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                        {user_name}: {currentPath}$
                    </span>
                </div>
                {!isMobile && (
                    <div className="flex flex-row text-[10px] sm:text-xs md:text-sm gap-1 sm:gap-1.5 md:gap-2 justify-center items-center h-full px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 flex-shrink-0">
                        <button
                            className={`${isAuto ? "text-cyan-400" : "text-white"} hover:opacity-80 transition cursor-pointer whitespace-nowrap`}
                            onClick={handleClickAuto}
                            type="button"
                        >
                            <code>Auto</code>
                        </button>
                        <code className="text-white/20">|</code>
                        <button
                            className={`${isAuto ? "text-white" : "text-cyan-400"} hover:opacity-80 transition cursor-pointer whitespace-nowrap`}
                            onClick={handleClickManual}
                            type="button"
                        >
                            <code>Manual</code>
                        </button>
                    </div>
                )}
            </div>

            {/* Terminal content */}
            <div
                className="relative z-10
                    px-2 xs:px-3 sm:px-4 md:px-5
                    py-2 xs:py-3 sm:py-4 md:py-5
                    text-[10px] xs:text-xs sm:text-sm
                    leading-relaxed text-gray-200 space-y-1 xs:space-y-1.5 sm:space-y-2
                    overflow-y-auto max-h-[22rem] "
                onClick={(e) => {
                    if (e.target === e.currentTarget || !e.target.closest("input")) {
                        setTimeout(() => inputRef?.current?.focus(), 0);
                    }
                }}
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget || !e.target.closest("input")) {
                        setTimeout(() => inputRef?.current?.focus(), 0);
                    }
                }}
            >
                {/* Command history - historical prompts never show cursors */}
                {history.map(({ command, output, path }, idx) => (
                    <div key={idx} className="break-words">
                        {(command !== "cls" && command !== "clear") && (
                            <p className="break-words">
                                <span className="text-cyan-400 text-[10px] xs:text-xs sm:text-sm">{user_name}</span>
                                <span className="text-white text-[10px] xs:text-xs sm:text-sm">:{path}$</span>
                                <span className="text-cyan-300 ml-1 xs:ml-2 break-all text-[10px] xs:text-xs sm:text-sm">{command}</span>
                            </p>
                        )}
                        {output ? (
                            Array.isArray(output) ? (
                                // ✅ Handle array of strings or components
                                output.map((line, i) => {
                                    // Check if the line is a React element
                                    if (React.isValidElement(line)) {
                                        return <div key={i} className="my-2">{line}</div>;
                                    }

                                    // Otherwise render as text
                                    return (
                                        <p
                                            key={i}
                                            className="text-cyan-100/75 whitespace-pre-wrap break-words text-[10px] xs:text-xs sm:text-sm"
                                        >
                                            {line}
                                        </p>
                                    );
                                })
                            ) : React.isValidElement(output) ? (
                                // ✅ Handle single React component
                                <div className="my-2">{output}</div>
                            ) : (
                                // ✅ Handle single string (edge case)
                                <p className="text-cyan-100/75 whitespace-pre-wrap break-words text-[10px] xs:text-xs sm:text-sm">
                                    {output}
                                </p>
                            )
                        ) : null}

                    </div>
                ))}

                {/* Auto mode: show AutoCommand when typing, or idle prompt with blinking cursor when queue is empty */}
                {isAuto && (
                    currentAutoCommand ? (
                        <AutoCommand
                            username={user_name}
                            currentPath={currentPath}
                            command={currentAutoCommand}
                            // onComplete={() => {}}
                            isTyping={true}
                        />
                    ) : (
                        <div className="break-words">
                            <p className="break-words">
                                <span className="text-cyan-400 text-[10px] xs:text-xs sm:text-sm">{user_name}</span>
                                <span className="text-white text-[10px] xs:text-xs sm:text-sm">:{currentPath}$</span>
                                <span className="text-cyan-300 ml-1 xs:ml-2 break-all text-[10px] xs:text-xs sm:text-sm">
                                    <span
                                        className={`inline-block w-2 xs:w-2.5 h-4 bg-cyan-500 animate-pulse`}
                                        style={{ verticalAlign: 'text-bottom' }}
                                    >
                        &nbsp;
                    </span>
                                </span>
                            </p>
                        </div>
                    )
                )}


{/*<Closing />*/}


                {/* Manual mode input */}
                {!isAuto && (
                    <NewCommand
                        ref={inputRef}
                        user_name={user_name}
                        currentPath={currentPath}
                        onSubmit={handleManualCommand}
                        history={commandHistory}
                        onFocusChange={handleInputFocusChange}
                    />
                )}

                <div ref={bottomRef} />
            </div>

            {/* Visual overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%)] pointer-events-none rounded-lg xs:rounded-xl md:rounded-2xl" />
            <div className="absolute inset-0 rounded-lg xs:rounded-xl md:rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none rounded-lg xs:rounded-xl md:rounded-2xl" />
            <div className="absolute inset-0 rounded-lg xs:rounded-xl md:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
        </div>
    );
}
