import React, { forwardRef, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { user_name, sections } from "../utils/constants.js";
import TypedText from "./TypedText.jsx";
import AutoCommand from "./AutoCommand.jsx";

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
    infoPid,setInfoPid,skillsPid,setSkillsPid,journeyPid,setJourneyPid,projectsPid,setProjectsPid,contactPid,setContactPid

                                 }) {
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const terminalRef = useRef(null);

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
        "    └── resume/",
        "        └── resume.jsx",
        "",
        "7 directories, 7 files",
    ];

// Commands when scrolling DOWN (forward navigation)
    // Aligned with Rest.jsx section display ranges for smooth transitions
    // Sections activate slightly before they become visible (0.01-0.02 earlier)
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
            scrollRange: [0.16, 0.20], // Section appears at 0.36-0.37, disappears at 0.57-0.58
            commands: [
                { command: "cd ~/portfolio/info", key: "cd-portfolio-info" },
                { command: "firefox https://portfoliobudra.com/info", key: "cat-info" }
            ]
        },
        {
            section: "info",
            scrollRange: [0.21, 0.24], // Section appears at 0.36-0.37, disappears at 0.57-0.58
            commands: [
                { command: `kill ${infoPid}`, key: "kill-portfolio-info" },

            ]
        },
        {
            section: "skills",
            scrollRange: [0.25, 0.31], // Section appears at 0.52-0.53, disappears at 0.76-0.77
            commands: [
                { command: "cd ~/portfolio/skills", key: "cd-portfolio-skills" },
                { command: "bash skills-manager.sh", key: "bash-skills" }
            ]
        },

        {
            section: "journey",
            scrollRange: [0.67, 0.87], // Section appears at 0.68-0.69, disappears at 0.87-0.88
            commands: [
                { command: "cd ~/portfolio/journey", key: "cd-journey" },
                { command: "bash career-journey.sh", key: "bash-journey" }
            ]
        },
        {
            section: "projects",
            scrollRange: [0.86, 0.98], // Section appears at 0.87-0.88, disappears at 0.98-0.99
            commands: [
                { command: "cd ~/portfolio/projects", key: "cd-projects" },
                { command: "bash projects.sh", key: "bash-projects" }
            ]
        },
        {
            section: "contact",
            scrollRange: [0.97, 1.0], // Section appears at 0.98-0.99
            commands: [
                { command: "cd ~/portfolio/contact", key: "cd-contact" },
                { command: "bash get-in-touch.sh", key: "bash-contact" }
            ]
        }
    ];

// Commands when scrolling UP (backward navigation)
    // Aligned with Rest.jsx section display ranges for smooth transitions
    const SCROLL_UP_MAP = [
        {
            section: "contact-back",
            scrollRange: [0.97, 1.0], // Exit contact section
            commands: [
                { command: "cd ~/portfolio/projects", key: "back-to-projects" },
                { command: "bash projects.sh", key: "bash-projects-back" }
            ]
        },
        {
            section: "projects-back",
            scrollRange: [0.86, 0.97], // Exit projects, enter journey
            commands: [
                { command: "cd ~/portfolio/journey", key: "back-to-journey" },
                { command: "bash career-journey.sh", key: "bash-journey-back" }
            ]
        },
        {
            section: "journey-back",
            scrollRange: [0.67, 0.86], // Exit journey, enter skills
            commands: [
                { command: "cd ~/portfolio/skills", key: "back-to-skills" },
                { command: "bash skills-manager.sh", key: "bash-skills-back" }
            ]
        },
        {
            section: "skills-back",
            scrollRange: [0.51, 0.67], // Exit skills, enter info
            commands: [
                { command: "cd ~/portfolio/info", key: "back-to-info" },
                { command: "firefox https://portfoliobudra.com/info", key: "cat-info-back" }
            ]
        },
        {
            section: "info-back",
            scrollRange: [0.35, 0.51], // Exit info, return to home
            commands: [
                { command: "cd ~", key: "back-to-home" },
            ]
        },
        {
            section: "initial-back-2",
            scrollRange: [0.23, 0.26], // Return to initial state
            commands: [
                // { command: "clear", key: "clear-terminal" },
                // { command: "cat instructions.txt", key: "prior_instructions" },
                { command: "tree", key: "tree-initial" }
            ]
        },
        {
            section: "initial-back-1",
            scrollRange: [0.20, 0.23], // Return to initial state
            commands: [
                // { command: "clear", key: "clear-terminal" },
                { command: "cat instructions.txt", key: "prior_instructions" },
                // { command: "tree", key: "tree-initial" }
            ]
        }
    ];



    const [basePath] = useState("~");
    const [currentPath, setCurrentPath] = useState(basePath);
    const [history, setHistory] = useState([]);
    const isMobile = useIsMobile();

    const currentPathRef = useRef(currentPath);
    useEffect(() => {
        currentPathRef.current = currentPath;
    }, [currentPath]);

    const [localIsAuto, setLocalIsAuto] = useState(propIsAuto || false);

    // Force auto mode on mobile
    const isAuto = isMobile ? true : (propSetIsAuto ? propIsAuto : localIsAuto);
    const setIsAuto = propSetIsAuto || setLocalIsAuto;

    const [executedSections, setExecutedSections] = useState(new Set());
    const [lastScrollProgress, setLastScrollProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("down");

    // Auto mode state management
    const [autoCommandQueue, setAutoCommandQueue] = useState([]);
    const [currentAutoCommand, setCurrentAutoCommand] = useState(null);
    const [isProcessingAuto, setIsProcessingAuto] = useState(false);
    const isProcessingRef = useRef(false);
    const lastCommandRef = useRef({ command: null, timestamp: 0 });

    const [priorInstructionsComplete, setPriorInstructionsComplete] = useState(false);
    const [isTreeExecuted, setIsTreeExecuted] = useState(false);
    const [isTreeOutputRendered, setIsTreeOutputRendered] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const commandHistory = history.map(({ command }) => command);

    // Map section commands to target scrollProgress values (where sections are at scale 1)
    // Based on Rest.jsx scale ranges: scale reaches 1 at the middle of the range
    const SECTION_SCROLL_TARGETS = useMemo(() => ({
        "info": 0.48,           // scale [0.37, 0.47, 0.49, 0.57] -> scale 1 at 0.47-0.49, target 0.48
        "skills": 0.645,       // scale [0.53, 0.63, 0.66, 0.76] -> scale 1 at 0.63-0.66, target 0.645
        "journey": 0.805,      // scale [0.69, 0.79, 0.82, 0.87] -> scale 1 at 0.79-0.82, target 0.805
        "projects": 0.94,      // scale [0.88, 0.93, 0.95, 0.98] -> scale 1 at 0.93-0.95, target 0.94
        "contact": 0.995       // scale [0.99, 1.0] -> scale 1 at 0.99-1.0, target 0.995
    }), []);

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
        let newPath = currentPathRef.current; // Use latest path from ref
        const cmd = input.trim().toLowerCase();

        setTimeout(() => inputRef?.current?.focus(), 0);

        if (cmd.startsWith("cd")) {
            const parts = cmd.split(" ");
            if (parts.length === 2) {
                let destination = parts[1].trim().replace(/\/$/, "");

                // Handle home directory shortcuts
                if (destination === "~" || destination === "") {
                    newPath = "~";
                    output = null;
                } else {
                    // Get section names
                    const sectionNames = sections.map((s) => s.name);

                    // Parse current path into parts
                    let currentParts = newPath.replace(/^~\/?/, "").split("/").filter(Boolean);

                    // Check if destination is absolute (starts with ~/ or /)
                    if (destination.startsWith("~")) {
                        destination = destination.replace(/^~\/?/, "");
                        currentParts = []; // Reset to home
                    } else if (destination.startsWith("/")) {
                        destination = destination.substring(1);
                        currentParts = []; // Reset to root
                    } else {
                        // Remove leading ./ if present
                        destination = destination.replace(/^\.\//, "");
                    }

                    // Navigate through destination parts
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
                    "└── resume/",
                    "    └── resume.jsx",
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
        else if (cmd === "pwd") output = [newPath];
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
            else if (cmd.includes("resume.jsx")) output = ["Resume File"];
            else if (cmd.includes("instructions.txt")) output = priorInstructions;
            else output = [`bash: cat: ${cmd.split(" ")[1]}: No such file or directory`];
        }
        else if (cmd.startsWith("node")) {
            const fileName = cmd.split(" ").slice(1).join(" ").trim();

            if (!fileName) {
                output = ["node: missing file operand", "Usage: node <filename.jsx>"];
            } else {
                // Define valid node files
                const validNodeFiles = {
                    info: "info.jsx",
                    resume: "resume.jsx"
                };

                // Clean path
                let cleanPath = fileName.replace(/^\.\/|^~\/|^\//, "");
                const pathParts = cleanPath.split("/").filter(Boolean);
                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1];

                // Determine target section
                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    targetSection = pathParts[1];
                } else if (Object.prototype.hasOwnProperty.call(validNodeFiles, pathParts[0])) {
                    targetSection = pathParts[0];
                } else if (pathParts.length === 1 && Object.values(validNodeFiles).includes(targetFile)) {
                    // Infer from current path
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
            const fileName = cmd.split(" ").slice(1).join(" ").trim();

            if (!fileName) {
                output = ["bash: missing file operand", "Usage: bash <filename.sh>"];
            } else {
                // Define valid bash scripts
                const validBashScripts = {
                    skills: "skills-manager.sh",
                    journey: "career-journey.sh",
                    projects: "projects.sh",
                    contact: "get-in-touch.sh"
                };

                // Clean path
                let cleanPath = fileName.replace(/^\.\/|^~\/|^\//, "");
                const pathParts = cleanPath.split("/").filter(Boolean);
                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1];

                // Determine target section
                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    targetSection = pathParts[1];
                } else if (Object.prototype.hasOwnProperty.call(validBashScripts, pathParts[0])) {
                    targetSection = pathParts[0];
                } else if (pathParts.length === 1 && Object.values(validBashScripts).includes(targetFile)) {
                    // Infer from current path
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
                        const newPid = Math.floor(Math.random() * (30000 - 1000 + 1)) + 1000;
                        console.log("newPid in bash: ", newPid);
                        output = [
                            "Running script...",
                            `✓ ${targetFile} executed successfully`,
                            `Script location: /portfolio/${targetSection}`,
                            `PID: ${newPid}`
                        ];
                        // Trigger section callbacks
                        if (targetFile === "projects.sh") {
                            setProjectsPid(newPid);
                            onProjectsCommand?.();
                            // Auto-scroll to section in auto mode
                            if (isAuto && scrollToProgress && targetSection) {
                                const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                if (targetProgress !== undefined) {
                                    setTimeout(() => {
                                        scrollToProgress(targetProgress);
                                    }, 300); // Small delay to ensure section is activated first
                                }
                            }
                        } else if (targetFile === "skills-manager.sh") {
                            setSkillsPid(newPid);
                            onSkillsCommand?.();
                            if (isAuto && scrollToProgress && targetSection) {
                                const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                if (targetProgress !== undefined) {
                                    setTimeout(() => {
                                        scrollToProgress(targetProgress);
                                    }, 300);
                                }
                            }
                        } else if (targetFile === "career-journey.sh") {
                            setJourneyPid(newPid);
                            onCareerJourneyCommand?.();
                            if (isAuto && scrollToProgress && targetSection) {
                                const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                if (targetProgress !== undefined) {
                                    setTimeout(() => {
                                        scrollToProgress(targetProgress);
                                    }, 300);
                                }
                            }
                        } else if (targetFile === "get-in-touch.sh") {
                            setContactPid(newPid);
                            onContactCommand?.();
                            if (isAuto && scrollToProgress && targetSection) {
                                const targetProgress = SECTION_SCROLL_TARGETS[targetSection];
                                if (targetProgress !== undefined) {
                                    setTimeout(() => {
                                        scrollToProgress(targetProgress);
                                    }, 300);
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
        else if (cmd === "firefox https://portfoliobudra.com/info") {
            if (newPath === "~/portfolio/info") {
                output = ["[1]+  Done                    firefox https://portfoliobudra.com/info\n"];
                setInfoPid(Math.floor(Math.random() * (30000 - 1000 + 1)) + 1000)
                onInfoCommand?.();
                // Auto-scroll to info section in auto mode
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
        }
        else {
            output = [`bash: ${cmd}: command not found`];
        }



        setCurrentPath(newPath);
        currentPathRef.current = newPath;

        // Use a ref to track the last command to prevent duplicate history entries
        // This prevents race conditions where setHistory might be called twice with the same command
        const now = Date.now();
        
        // Check if this is a duplicate: same command within a short time window (500ms)
        const isDuplicate = lastCommandRef.current.command === input && 
                            (now - lastCommandRef.current.timestamp) < 500;
        
        if (!isDuplicate) {
            lastCommandRef.current = { command: input, timestamp: now };
            setHistory((prev) => {
                // Double-check: ensure the last entry is not the same command with same path
                // This provides an additional safeguard against race conditions
                const lastEntry = prev[prev.length - 1];
                if (lastEntry && lastEntry.command === input && lastEntry.path === newPath) {
                    // Duplicate detected, don't add
                    return prev;
                }
                return [...prev, { command: input, output, path: newPath }];
            });
        }
    }, [isAuto, scrollToProgress, SECTION_SCROLL_TARGETS, onProjectsCommand, onSkillsCommand, onCareerJourneyCommand, onContactCommand, onInfoCommand]);

    // Execute a single auto command with typing animation
    const executeAutoCommand = useCallback((command) => {
        return new Promise((resolve) => {
            // Set current command for typing animation
            setCurrentAutoCommand(command);

            // Calculate typing duration (50ms per character)
            const typingDuration = command.length * 50;

            // Wait for typing to complete, then pause 300ms before executing
            setTimeout(() => {
                // Execute the command using handleManualCommand (called only once)
                handleManualCommand(command);

                // Wait 300ms for output to render, then clear and resolve
                // setTimeout(() => {
                //     setCurrentAutoCommand(null);
                //     resolve();
                // }, 100);
                setCurrentAutoCommand(null);
                resolve()
            }, typingDuration);
        });
    }, [handleManualCommand]);

    // Process the auto command queue
    const processAutoCommandQueue = useCallback(() => {
        // Use ref to prevent race conditions
        if (isProcessingRef.current) {
            return;
        }

        isProcessingRef.current = true;
        setIsProcessingAuto(true);

        const processNext = () => {
            setAutoCommandQueue((prev) => {
                if (prev.length === 0) {
                    // Queue is empty, stop processing
                    isProcessingRef.current = false;
                    setIsProcessingAuto(false);
                    return prev;
                }

                // Dequeue the first command
                const [command, ...rest] = prev;

                // Process the command asynchronously
                executeAutoCommand(command).then(() => {
                    // Small delay between commands
                    setTimeout(() => {
                        processNext();
                    }, 100);
                }).catch((error) => {
                    // If there's an error, reset processing state
                    isProcessingRef.current = false;
                    setIsProcessingAuto(false);
                });

                return rest;
            });
        };

        processNext();
    }, [executeAutoCommand]);

    // Process queue when it changes
    useEffect(() => {
        if (isAuto && autoCommandQueue.length > 0 && !isProcessingAuto && !isProcessingRef.current) {
            processAutoCommandQueue();
        }
    }, [isAuto, autoCommandQueue.length, isProcessingAuto, processAutoCommandQueue]);

// Auto Mode: handle scroll-based command queueing
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        let rafId = null;
        let lastProcessedProgress = -1;
        const SCROLL_THRESHOLD = 0.001; // Minimum change to process

        const processScroll = (latest) => {
            // Skip if change is too small (throttling)
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

            // Add commands to queue when section threshold is crossed
            if (currentSection && sectionKey && !executedSections.has(sectionKey) && !isProcessingAuto) {
                // Add all commands from this section to the queue
                const commandsToAdd = currentSection.commands.map(({ command }) => command);
                setAutoCommandQueue((prev) => [...prev, ...commandsToAdd]);
                setExecutedSections((prev) => new Set(prev).add(sectionKey));
                setPriorInstructionsComplete(true);
            }
        };

        const unsubscribe = scrollProgress.on("change", (latest) => {
            // Use requestAnimationFrame for smoother updates
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
    }, [scrollProgress, isAuto, executedSections, isProcessingAuto, lastScrollProgress, scrollDirection]);

// Reset executed sections when scrolling past boundaries
    // Only clear sections that are no longer in range to prevent premature clearing
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        let rafId = null;

        const processReset = (latest) => {
            setExecutedSections((prev) => {
                const newSet = new Set();
                const direction = latest > lastScrollProgress ? "down" : "up";

                // Check both directions to maintain state when scrolling back
                [SCROLL_DOWN_MAP, SCROLL_UP_MAP].forEach((commandMap) => {
                    commandMap.forEach(({ section, scrollRange }) => {
                        const [start, end] = scrollRange;
                        const sectionKeyDown = `${section}-down`;
                        const sectionKeyUp = `${section}-up`;

                        // Keep section if it's in range or was recently visited
                        // Use a buffer zone (0.05) to prevent premature clearing
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


// Tree output rendered after delay to smooth UI
    useEffect(() => {
        if (isTreeExecuted && !isTreeOutputRendered) {
            const timer = setTimeout(() => {}, 100);
            return () => clearTimeout(timer);
        }
    }, [isTreeExecuted, isTreeOutputRendered]);

// Input focus detection in manual mode
    useEffect(() => {
        if (!isAuto && inputRef?.current) {
            const isFocused = document.activeElement === inputRef.current;
            if (isFocused !== inputFocused) setInputFocused(isFocused);
        }
    }, [isAuto, inputFocused]);

// Adjust terminal X position based on input focus
    useEffect(() => {
        if (!isAuto) {
            setManualX(inputFocused ? 650 : 800);
        }
    }, [isAuto, inputFocused, setManualX]);

// Scroll to bottom on history or tree output change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isTreeExecuted]);

// Auto-focus input on mount & when visible with intersection observer + fallback timers
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
                        {output?.map((line, i) => (
                            <p key={i} className="text-cyan-100/75 whitespace-pre-wrap break-words text-[10px] xs:text-xs sm:text-sm">
                                {line}
                            </p>
                        ))}
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
