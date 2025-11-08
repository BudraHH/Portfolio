import React, { forwardRef, useEffect, useRef, useState } from "react";
import { user_name, sections } from "../utils/constants.js";
import TypedText from "./TypedText.jsx";

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
        <div className="relative">
            <span className="text-cyan-400">{user_name}</span>
            <span className="text-white">:{currentPath}$</span>
            <div className="relative inline-block z-20">
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
                    }}
                    className="bg-transparent border-none outline-none text-cyan-300 ml-2 font-mono caret-transparent"
                    autoComplete="off"
                    autoFocus
                    tabIndex={0}
                    readOnly={false}
                    disabled={false}
                />
                {focused && (
                    <span
                        style={{ left: `calc(${cursorPos}ch)` }}
                        className="absolute ml-2 mt-1 w-[1ch] h-[1em] bg-cyan-300 animate-pulse pointer-events-none"
                    />
                )}
            </div>
        </div>
    );
});

export default function Terminal({
                                     scrollProgress,
                                     isAuto: propIsAuto,
                                     setIsAuto: propSetIsAuto,
                                     setManualX,
                                     onProjectsCommand,
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
        "    │   └── info.jsx",
        "    ├── skills/",
        "    │   └── skills.jsx",
        "    ├── education/",
        "    │   └── education.jsx",
        "    ├── projects/",
        "    │   └── projects.sh",
        "    ├── contact/",
        "    │   └── contact.jsx",
        "    └── resume/",
        "        └── resume.jsx",
        "",
        "6 directories, 7 files",
    ];

    // Commands when scrolling DOWN (forward navigation)
    const SCROLL_DOWN_MAP = [
        {
            section: "initial",
            scrollRange: [0.10, 0.35],
            commands: [
                { command: "cat instructions.txt", key: "cat-instructions" },
                { command: "tree", key: "tree-initial" }
            ]
        },
        {
            section: "info",
            scrollRange: [0.36, 0.51],
            commands: [
                { command: "cd ~/portfolio/info", key: "cd-portfolio-info" },
                { command: "cat info.jsx", key: "cat-info" }
            ]
        },
        {
            section: "skills",
            scrollRange: [0.52, 0.70],
            commands: [
                { command: "cd ~/portfolio/skills", key: "cd-portfolio-skills" },
                { command: "cat skills.jsx", key: "cat-skills" }
            ]
        },
        {
            section: "projects",
            scrollRange: [0.71, 0.85],
            commands: [
                { command: "cd ~/portfolio/projects", key: "cd-projects" },
                { command: "bash projects.sh", key: "bash-projects" }
            ]
        }
    ];

// Commands when scrolling UP (backward navigation)
// Use DIFFERENT section names to avoid conflicts
    const SCROLL_UP_MAP = [
        {
            section: "projects-back",  // Changed name
            scrollRange: [0.71, 0.85],
            commands: [
                { command: "cd ~/portfolio/skills", key: "back-to-skills" },
                { command: "cat skills.jsx", key: "cat-skills-back" }
            ]
        },
        {
            section: "skills-back",  // Changed name
            scrollRange: [0.52, 0.70],
            commands: [
                { command: "cd ~/portfolio/info", key: "back-to-info" },
                { command: "cat info.jsx", key: "cat-info-back" }
            ]
        },
        {
            section: "info-back",  // Changed name
            scrollRange: [0.36, 0.51],  // Fixed: added end range
            commands: [
                { command: "cd ~", key: "back-to-home" },
            ]
        },
        {
            section: "initial-back",  // Changed name
            scrollRange: [0.10, 0.35],
            commands: [
                { command: "clear", key: "clear-terminal" },
                { command: "cat instructions.txt", key: "prior_instructions" },
                { command: "tree", key: "tree-initial" }
            ]
        }
    ];


    const [basePath] = useState("~");
    const [currentPath, setCurrentPath] = useState(basePath);
    const [history, setHistory] = useState([]);
    const [localIsAuto, setLocalIsAuto] = useState(propIsAuto || false);

    const currentPathRef = useRef(currentPath);
    useEffect(() => {
        currentPathRef.current = currentPath;
    }, [currentPath]);

    const isAuto = propSetIsAuto ? propIsAuto : localIsAuto;
    const setIsAuto = propSetIsAuto || setLocalIsAuto;

    const [executedSections, setExecutedSections] = useState(new Set());
    const [lastScrollProgress, setLastScrollProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("down");

    const [currentTypingCommand, setCurrentTypingCommand] = useState("");
    const [currentTypingProgress, setCurrentTypingProgress] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    const [priorInstructionsComplete, setPriorInstructionsComplete] = useState(false);
    const [isTreeExecuted, setIsTreeExecuted] = useState(false);
    const [isTreeOutputRendered, setIsTreeOutputRendered] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const commandHistory = history.map(({ command }) => command);

    const handleClickAuto = () => setIsAuto(true);
    const handleClickManual = () => setIsAuto(false);

    const handleTreeCommandExecuted = () => {
        setIsTreeExecuted(true);
        setTimeout(() => {
            setIsTreeOutputRendered(true);
        }, 10);
    };

    const handleInputFocusChange = (focused) => setInputFocused(focused);

    const handleManualCommand = (input) => {
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
                            // Go to home
                            currentParts = [];
                        } else if (part === "..") {
                            // Go up one directory
                            if (currentParts.length > 0) {
                                currentParts.pop();
                            }
                            // If already at root (~), stay there
                        } else if (part === ".") {
                            // Stay in current directory
                            continue;
                        } else if (part === "portfolio") {
                            // Can only cd to portfolio from home (~)
                            if (currentParts.length === 0) {
                                currentParts.push("portfolio");
                            } else {
                                output = [`bash: cd: ${destination}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            }
                        } else if (sectionNames.includes(part)) {
                            // Section names can only be accessed from ~/portfolio
                            if (currentParts.length === 1 && currentParts[0] === "portfolio") {
                                currentParts.push(part);
                            } else if (currentParts.length === 0) {
                                // If at home, show error
                                output = [`bash: cd: ${part}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            } else {
                                // If deeper than portfolio or not in portfolio
                                output = [`bash: cd: ${destination}: No such file or directory`];
                                errorOccurred = true;
                                break;
                            }
                        } else {
                            // Unknown directory
                            output = [`bash: cd: ${destination}: No such file or directory`];
                            errorOccurred = true;
                            break;
                        }
                    }

                    if (!errorOccurred) {
                        newPath = currentParts.length > 0 ? `~/${currentParts.join("/")}` : "~";
                        output = null;
                    } else {
                        // Keep current path on error
                        newPath = currentPathRef.current;
                    }
                }
            } else if (parts.length === 1) {
                // Just "cd" with no arguments goes to home
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
                    "│   └── info.jsx",
                    "├── skills/",
                    "│   └── skills.jsx",
                    "├── education/",
                    "│   └── education.jsx",
                    "├── projects/",
                    "│   └── projects.jsx",
                    "├── contact/",
                    "│   └── contact.jsx",
                    "└── resume/",
                    "    └── resume.jsx",
                    "",
                    "6 directories, 6 files",
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
                "  cd ./portfolio/skills",
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
            if (cmd.includes("info.jsx")) output = ["Portfolio Information File"];
            else if (cmd.includes("skills.jsx")) output = ["Skills List File"];
            else if (cmd.includes("education.jsx")) output = ["Education Details File"];
            else if (cmd.includes("projects.jsx")) output = ["Projects Collection File"];
            else if (cmd.includes("contact.jsx")) output = ["Contact Information File"];
            else if (cmd.includes("resume.jsx")) output = ["Resume File"];
            else if (cmd.includes("instructions.txt")) output = priorInstructions;
            else output = [`bash: ${cmd}: command not found`];
        }
        else if (cmd.startsWith("node")) {
            const fileName = cmd.split(" ")[1];

            if (!fileName) {
                output = ["node: missing file operand", "Usage: node <filename.jsx>"];
            } else {
                // Parse file path and extract section name
                const cleanPath = fileName.replace(/^\.\/|^\//, ""); // Remove ./ or /
                let targetSection = null;
                let targetFile = null;

                // Check if it's a path or just a filename
                if (cleanPath.includes("/")) {
                    const pathParts = cleanPath.split("/");
                    if (pathParts.includes("portfolio")) {
                        const sectionIndex = pathParts.indexOf("portfolio") + 1;
                        targetSection = pathParts[sectionIndex];
                        targetFile = pathParts[pathParts.length - 1];
                    }
                } else {
                    targetFile = cleanPath;
                    // Extract section from current path
                    if (currentPath.startsWith("~/portfolio/")) {
                        targetSection = currentPath.split("/").pop();
                    }
                }

                // Validate section and file match
                const validSections = {
                    "info": "info.jsx",
                    "skills": "skills.jsx",
                    "education": "education.jsx",
                    "projects": "projects.jsx",
                    "contact": "contact.jsx",
                    "resume": "resume.jsx"
                };

                if (!targetFile) {
                    output = [`node: ${fileName}: Invalid path`];
                } else if (targetFile.includes("info.jsx")) {
                    const expectedPath = "~/portfolio/info";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/info/info.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Info.jsx rendered successfully",
                            "Component mounted at /portfolio/info"
                        ];
                    } else {
                        output = [`node: cannot find 'info.jsx'`, `Expected: ${expectedPath}/info.jsx or absolute path`];
                    }
                } else if (targetFile.includes("skills.jsx")) {
                    const expectedPath = "~/portfolio/skills";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/skills/skills.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Skills.jsx rendered successfully",
                            "Component mounted at /portfolio/skills"
                        ];
                    } else {
                        output = [`node: cannot find 'skills.jsx'`, `Expected: ${expectedPath}/skills.jsx or absolute path`];
                    }
                } else if (targetFile.includes("education.jsx")) {
                    const expectedPath = "~/portfolio/education";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/education/education.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Education.jsx rendered successfully",
                            "Component mounted at /portfolio/education"
                        ];
                    } else {
                        output = [`node: cannot find 'education.jsx'`, `Expected: ${expectedPath}/education.jsx or absolute path`];
                    }
                } else if (targetFile.includes("projects.jsx")) {
                    const expectedPath = "~/portfolio/projects";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/projects/projects.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Projects.jsx rendered successfully",
                            "Component mounted at /portfolio/projects"
                        ];
                    } else {
                        output = [`node: cannot find 'projects.jsx'`, `Expected: ${expectedPath}/projects.jsx or absolute path`];
                    }
                } else if (targetFile.includes("contact.jsx")) {
                    const expectedPath = "~/portfolio/contact";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/contact/contact.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Contact.jsx rendered successfully",
                            "Component mounted at /portfolio/contact"
                        ];
                    } else {
                        output = [`node: cannot find 'contact.jsx'`, `Expected: ${expectedPath}/contact.jsx or absolute path`];
                    }
                } else if (targetFile.includes("resume.jsx")) {
                    const expectedPath = "~/portfolio/resume";
                    if (currentPath === expectedPath || cleanPath.includes("portfolio/resume/resume.jsx")) {
                        output = [
                            "Initializing component...",
                            "✓ Resume.jsx rendered successfully",
                            "Component mounted at /portfolio/resume"
                        ];
                    } else {
                        output = [`node: cannot find 'resume.jsx'`, `Expected: ${expectedPath}/resume.jsx or absolute path`];
                    }
                } else {
                    output = [
                        `node: ${fileName}: No such file or directory`,
                        "Usage: node <filename.jsx>"
                    ];
                }
            }
            // eslint-disable-next-line no-dupe-else-if
        } else if (cmd.startsWith("bash")) {
            const fileName = cmd.split(" ").slice(1).join(" ").trim();

            if (!fileName) {
                output = ["bash: missing file operand", "Usage: bash <filename.sh>"];
            } else {
                // Remove leading ./, ~/, or /
                let cleanPath = fileName.replace(/^\.\/|^~\/|^\//, "");
                const pathParts = cleanPath.split("/").filter(Boolean);

                // Define valid sections and script file names
                const validSections = {
                    info: "info.sh",
                    skills: "skills.sh",
                    education: "education.sh",
                    projects: "projects.sh",
                    contact: "contact.sh",
                    resume: "resume.sh",
                };

                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1]; // last part is file

                // Determine target section from path or current directory
                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    // Path like: portfolio/projects/projects.sh
                    targetSection = pathParts[1];
                } else if (Object.prototype.hasOwnProperty.call(validSections, pathParts[0])) {
                    // Path like: projects/projects.sh
                    targetSection = pathParts[0];
                } else if (pathParts.length === 1 && Object.values(validSections).includes(targetFile)) {
                    // Just filename like: projects.sh
                    // Infer section from current path
                    const currentPathParts = newPath.replace(/^~\//, "").split("/").filter(Boolean);
                    if (currentPathParts[0] === "portfolio" && currentPathParts.length > 1) {
                        targetSection = currentPathParts[1]; // Extract section from current path
                    }
                }

                if (!targetFile) {
                    output = [`bash: ${fileName}: Invalid path`];
                } else if (
                    targetSection &&
                    validSections[targetSection] === targetFile
                ) {
                    // Verify we're in the correct directory
                    const expectedPath = `~/portfolio/${targetSection}`;
                    const normalizedCurrentPath = newPath.replace(/^~\//, "");
                    const expectedNormalized = expectedPath.replace(/^~\//, "");

                    if (normalizedCurrentPath === expectedNormalized) {
                        output = [
                            "Running script...",
                            `✓ ${targetFile} executed successfully`,
                            `Script location: /portfolio/${targetSection}`,
                        ];
                        if (targetFile === "projects.sh") {
                            onProjectsCommand?.();
                        }
                    } else {
                        output = [
                            `bash: cannot find '${targetFile}'`,
                            `You are in: ${newPath}`,
                            `Expected: ${expectedPath}`,
                        ];
                    }
                } else if (Object.values(validSections).includes(targetFile)) {
                    output = [
                        `bash: cannot find '${targetFile}'`,
                        `Hint: Navigate to ~/portfolio/<section> first`,
                    ];
                } else {
                    output = [
                        `bash: ${fileName}: No such file or directory`,
                        "Usage: bash <filename.sh>",
                    ];
                }
            }
        }

        else {
            output = [`bash: ${cmd}: command not found`];
        }

        setCurrentPath(newPath);
        currentPathRef.current = newPath;

        setHistory((prev) => [...prev, { command: input, output, path: newPath }]);
    };

// Auto Mode: handle bidirectional section-based command execution
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            const direction = latest > lastScrollProgress ? "down" : latest < lastScrollProgress ? "up" : scrollDirection;
            setScrollDirection(direction);
            setLastScrollProgress(latest);

            const commandMap = direction === "down" ? SCROLL_DOWN_MAP : SCROLL_UP_MAP;

            const currentSection = commandMap.find(({ scrollRange }) => {
                const [start, end] = scrollRange;
                return latest >= start && latest < end;
            });

            const sectionKey = currentSection ? `${currentSection.section}-${direction}` : null;

            if (currentSection && sectionKey && !executedSections.has(sectionKey) && !isTyping) {
                setIsTyping(true);

                const executeSection = async () => {
                    for (const { command, key } of currentSection.commands) {
                        setCurrentTypingCommand(command);
                        setCurrentTypingProgress(0);

                        const typingDuration = command.length * 50;
                        const totalDelay = typingDuration + 500;

                        const typingInterval = setInterval(() => {
                            setCurrentTypingProgress((prev) => {
                                const next = prev + 1;
                                if (next >= command.length) {
                                    clearInterval(typingInterval);
                                    return command.length;
                                }
                                return next;
                            });
                        }, 50);

                        await new Promise((resolve) => {
                            setTimeout(() => {
                                handleManualCommand(command);
                                clearInterval(typingInterval);
                                setPriorInstructionsComplete(true);
                                resolve();
                            }, totalDelay);
                        });

                        await new Promise((resolve) => setTimeout(resolve, 100));
                    }

                    setExecutedSections((prev) => new Set(prev).add(sectionKey));
                    setIsTyping(false);
                    setCurrentTypingCommand("");
                    setCurrentTypingProgress(0);
                };

                executeSection();
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, isAuto, executedSections, isTyping, lastScrollProgress, scrollDirection]);

// Reset executed sections when scrolling past boundaries
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            setExecutedSections((prev) => {
                const newSet = new Set();

                const direction = latest > lastScrollProgress ? "down" : "up";
                const commandMap = direction === "down" ? SCROLL_DOWN_MAP : SCROLL_UP_MAP;

                commandMap.forEach(({ section, scrollRange }) => {
                    const [start] = scrollRange;
                    const sectionKeyDown = `${section}-down`;
                    const sectionKeyUp = `${section}-up`;

                    if (latest >= start) {
                        if (prev.has(sectionKeyDown)) newSet.add(sectionKeyDown);
                        if (prev.has(sectionKeyUp)) newSet.add(sectionKeyUp);
                    }
                });

                return newSet;
            });
        });

        return () => unsubscribe();
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
            className="relative w-[60rem] max-w-3xl h-[30rem] rounded-2xl overflow-hidden font-mono text-white
      bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)]
      backdrop-blur-[24px] backdrop-brightness-75 border border-cyan-500/20
      shadow-[0_0_60px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.05)]
      transition-transform duration-500"
        >
            {/* Header */}
            <div className="flex flex-row justify-between items-center bg-gradient-to-r from-[#0f0f0f]/90 to-[#1a1a1a]/90 border-b border-cyan-500/20">
                <div className="flex items-center gap-2 px-4 py-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                    <span className="ml-3 text-sm text-cyan-400/70 select-none tracking-wide">
            {user_name}: {currentPath}$
          </span>
                </div>
                <div className="flex flex-row text-sm gap-2 justify-center items-center h-full px-5 py-2 mt-1">
                    <button
                        className={`${isAuto ? "text-cyan-400" : "text-white"} hover:opacity-80 transition cursor-pointer`}
                        onClick={handleClickAuto}
                        type="button"
                    >
                        <code>Auto</code>
                    </button>
                    <code className="text-white/20">|</code>
                    <button
                        className={`${isAuto ? "text-white" : "text-cyan-400"} hover:opacity-80 transition cursor-pointer`}
                        onClick={handleClickManual}
                        type="button"
                    >
                        <code>Manual</code>
                    </button>
                </div>
            </div>

            {/* Terminal content */}
            <div
                className="relative z-10 px-5 py-4 text-sm leading-relaxed text-gray-200 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]"
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
                {/* Command history */}
                {history.map(({ command, output, path }, idx) => (
                    <div key={idx}>
                        {(command !== "cls" && command !== "clear") && (
                            <p>
                                <span className="text-cyan-400">{user_name}</span>
                                <span className="text-white">:{path}$</span>
                                <span className="text-cyan-300 ml-2">{command}</span>
                            </p>
                        )}
                        {output?.map((line, i) => (
                            <p key={i} className="text-cyan-100/75 whitespace-pre-wrap">
                                {line}
                            </p>
                        ))}
                    </div>
                ))}

                {/* Auto mode typing */}
                {isAuto && currentTypingCommand && (
                    <div>
                        <p>
                            <span className="text-cyan-400">{user_name}</span>
                            <span className="text-white">:{currentPath}$</span>
                            <span className="text-cyan-300 ml-2">{currentTypingCommand.slice(0, currentTypingProgress)}</span>
                            <span className="absolute p-1 w-[1ch] h-[1.2rem] bg-cyan-300 animate-pulse pointer-events-none">&nbsp;</span>
                        </p>
                    </div>
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
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none" />
            <div className="absolute -inset-1 rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
        </div>
    );
}
