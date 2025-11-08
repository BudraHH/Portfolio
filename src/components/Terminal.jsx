import React, { forwardRef, useEffect, useRef, useState } from "react";
import { user_name, sections } from "../utils/constants.js";
import TypedText from "./TypedText.jsx";

const NewCommand = forwardRef(({ user_name, currentPath, onSubmit, history, onFocusChange }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(null);
    const [cursorPos, setCursorPos] = useState(0);
    const [focused, setFocused] = useState(true);

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
        const timer1 = setTimeout(() => focusInput(), 0);
        const timer2 = setTimeout(() => focusInput(), 100);
        const timer3 = setTimeout(() => focusInput(), 300);
        const timer4 = setTimeout(() => focusInput(), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [ref]);

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
        const value = inputValue;

        switch (e.key) {
            case "Enter":
                e.preventDefault();
                if (value.trim()) {
                    onSubmit(value.trim());
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
                if (history.length === 0) return;
                if (historyIndex === null) return;
                if (historyIndex === history.length - 1) {
                    setHistoryIndex(null);
                    setInputValue("");
                    setCursorPos(0);
                } else if (historyIndex < history.length - 1) {
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
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart;
        setInputValue(newValue);
        setCursorPos(cursorPosition);
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
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                    style={{
                        width: `${Math.max(inputValue.length, 1)}ch`,
                        minWidth: '1ch',
                        position: 'relative',
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


export default function Terminal({scrollProgress, isAuto: propIsAuto, setIsAuto: propSetIsAuto, setManualX, onProjectsCommand }) {
    // ===== REFS =====
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const terminalRef = useRef(null);

    // ===== CONSTANTS =====
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
        "════════════════════════════════════════════════════════════"
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
        "6 directories, 7 files"
    ];

    // ✅ Map EACH command to its scroll range (for AUTO mode)
    const COMMAND_SCROLL_DOWN_MAP = [
        // Initial commands (scroll 0.10-0.30)
        {scrollRange: [0.10, 0.22], command: "cat instructions.txt", section: "initial"},
        {scrollRange: [0.23, 0.30], command: "tree", section: "initial"},

        // Info section commands (scroll 0.36-0.46, BEFORE Info.jsx at 0.47)
        {scrollRange: [0.36, 0.37], command: "cd portfolio", section: "info"},
        {scrollRange: [0.39, 0.40], command: "cd info", section: "info"},
        {scrollRange: [0.41, 0.46], command: "cat info.jsx", section: "info"},
        // Info.jsx component appears: 0.47-0.57

        // Skills section commands (scroll 0.52-0.62, BEFORE Skills.jsx at 0.63)
        {scrollRange: [0.52, 0.54], command: "cd ..", section: "skills"},
        {scrollRange: [0.53, 0.54], command: "cd skills", section: "skills"},
        {scrollRange: [0.55, 0.62], command: "cat skills.jsx", section: "skills"},
        // Skills.jsx component appears: 0.63-0.76

        // Projects section commands (scroll 0.71-0.78, BEFORE Projects.sh at 0.79)
        {scrollRange: [0.71, 0.73], command: "cd ..", section: "projects"},
        {scrollRange: [0.74, 0.76], command: "cd projects", section: "projects"},
        {scrollRange: [0.77, 0.78], command: "bash projects.sh", section: "projects"},
        // Projects.jsx component appears: 0.79-0.95
    ];

    // ===== STATE - Core Terminal =====
    const [basePath] = useState("~");
    const [currentPath, setCurrentPath] = useState(basePath);
    const [history, setHistory] = useState([]);

    // ===== STATE - Auto/Manual Mode =====
    const [localIsAuto, setLocalIsAuto] = useState(propIsAuto || false);
    const isAuto = propSetIsAuto ? propIsAuto : localIsAuto;
    const setIsAuto = propSetIsAuto || setLocalIsAuto;

    // ===== STATE - Auto Mode Execution =====
    const [executedCommands, setExecutedCommands] = useState(new Set());
    const [currentTypingCommand, setCurrentTypingCommand] = useState("");
    const [currentTypingProgress, setCurrentTypingProgress] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    // ===== STATE - Manual Mode =====
    const [priorInstructionsComplete, setPriorInstructionsComplete] = useState(false);
    const [isTreeExecuted, setIsTreeExecuted] = useState(false);
    const [isTreeOutputRendered, setIsTreeOutputRendered] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    // ===== DERIVED VALUES =====
    const commandHistory = history.map((entry) => entry.command);

    // ===== HANDLERS =====
    const handleClickAuto = () => {
        setIsAuto(true);
    };

    const handleClickManual = () => {
        setIsAuto(false);
    };

    const handleTreeCommandExecuted = () => {
        setIsTreeExecuted(true);
    };

    const handleInputFocusChange = (focused) => {
        setInputFocused(focused);
    };

    const handleManualCommand = (input) => {
        let output = null;
        let newPath = currentPath;
        const cmd = input.trim().toLowerCase();

        setTimeout(() => {
            inputRef?.current?.focus();
        }, 0);

        // CD command
        if (cmd.startsWith("cd")) {
            const parts = cmd.split(" ");
            if (parts.length === 2) {
                let destination = parts[1].trim().replace(/\/$/, "");

                if (destination === "~" || destination === "") {
                    newPath = "~";
                    output = null;
                } else {
                    destination = destination.replace(/^\.\/|^\//, "");
                    const sectionNames = sections.map((section) => section.name);
                    let currentParts = currentPath.replace(/^~\/?/, "").split("/");
                    if (currentParts[0] === "") currentParts = [];

                    const destParts = destination.split("/").filter(Boolean);

                    for (let part of destParts) {
                        if (part === "~") {
                            currentParts = [];
                        } else if (part === "..") {
                            if (currentParts.length > 0) currentParts.pop();
                        } else if (part === ".") {
                            continue;
                        } else if (part === "portfolio" && currentParts.length === 0) {
                            currentParts.push("portfolio");
                        } else if (sectionNames.includes(part)) {
                            if (currentParts[0] === "portfolio") {
                                currentParts = ["portfolio", part];
                            } else {
                                output = [`bash: cd: ${destination}: No such file or directory`];
                                break;
                            }
                        } else {
                            output = [`bash: cd: ${destination}: No such file or directory`];
                            break;
                        }
                    }

                    newPath = currentParts.length > 0 ? `~/${currentParts.join("/")}` : "~";
                    if (!output) output = null;
                }
            } else {
                output = ["bash: cd: missing operand"];
            }
        }
        // LS command
        else if (cmd.startsWith("ls")) {
            const showDetails = cmd.includes("-la");

            if (currentPath === "~") {
                output = showDetails
                    ? [
                        "drwxr-xr-x  5 dev  portfolio  4096 Jan 01 12:34 portfolio",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 .",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 ..",
                    ]
                    : ["instructions.txt    portfolio"];
            } else if (currentPath === "~/portfolio") {
                output = showDetails
                    ? sections.map(
                        ({name, size, date}) =>
                            `drwxr-xr-x  5 dev  portfolio  ${size} ${date} ${name}`
                    )
                    : [sections.map(({name}) => name).join("  ")];
            } else if (currentPath.startsWith("~/portfolio/")) {
                const currentSection = currentPath.split("/").pop();
                const section = sections.find((s) => s.name === currentSection);

                if (section) {
                    output = showDetails
                        ? [
                            `-rw-r--r--  1 dev  portfolio  ${section.size}  ${section.date}  ${section.file}`,
                        ]
                        : [section.file];
                } else {
                    output = ["(empty directory) No files or directories in this location."];
                }
            } else {
                output = ["(empty directory) No files or directories in this location."];
            }
        }
        // TREE command
        else if (cmd === "tree") {
            if (currentPath === "~") {
                output = treeOutput;
            } else if (currentPath === "~/portfolio") {
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
                    "6 directories, 6 files"
                ];
            } else if (currentPath.startsWith("~/portfolio/")) {
                const currentSection = currentPath.split("/").pop();
                const section = sections.find((s) => s.name === currentSection);

                if (section) {
                    output = [
                        `~/portfolio/${currentSection}`,
                        `└── ${section.file}`,
                        "",
                        "0 directories, 1 file"
                    ];
                } else {
                    output = ["(empty directory)"];
                }
            }
        }
        // PWD command
        else if (cmd === "pwd") {
            output = [currentPath];
        }
        // CLEAR command
        else if (cmd === "cls" || cmd === "clear") {
            setHistory([]);
            output = null;
        }
        // HELP command
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
        // DATE command
        else if (cmd === "date") {
            const now = new Date();
            output = [now.toString()];
        }
        // CAT command
        else if (cmd.startsWith("cat")) {
            if (cmd.includes("info.jsx")) {
                output = ["Portfolio Information File"];
            } else if (cmd.includes("skills.jsx")) {
                output = ["Skills List File"];
            } else if (cmd.includes("education.jsx")) {
                output = ["Education Details File"];
            } else if (cmd.includes("projects.jsx")) {
                output = ["Projects Collection File"];
            } else if (cmd.includes("contact.jsx")) {
                output = ["Contact Information File"];
            } else if (cmd.includes("resume.jsx")) {
                output = ["Resume File"];
            } else if (cmd.includes("instructions.txt")) {
                output = priorInstructions;
            } else {
                output = [`bash: ${cmd}: command not found`];
            }
        } // NODE command
        // NODE command
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

                // Attempt to find the section in path parts
                let targetSection = null;
                let targetFile = pathParts[pathParts.length - 1]; // last part is file

                // Check for 'portfolio' as root folder, or direct section at first folder
                if (pathParts[0] === "portfolio" && pathParts.length > 1) {
                    targetSection = pathParts[1];
                } else if (validSections.hasOwnProperty(pathParts[0])) {
                    targetSection = pathParts[0];
                }

                if (!targetFile) {
                    output = [`bash: ${fileName}: Invalid path`];
                } else if (
                    targetSection &&
                    validSections[targetSection] === targetFile
                ) {
                    const expectedPath1 = `~/portfolio/${targetSection}`;
                    const expectedPath2 = `portfolio/${targetSection}`;
                    const normalizedCurrentPath = currentPath.replace(/^~\//, "");

                    if (
                        normalizedCurrentPath === expectedPath1 ||
                        normalizedCurrentPath === expectedPath2 ||
                        cleanPath.includes(`portfolio/${targetSection}/${targetFile}`) ||
                        cleanPath === targetFile // allows 'bash projects.sh' to work
                    ) {
                        output = [
                            "Running script...",
                            `✓ ${targetFile} executed successfully`,
                            `Script location: /portfolio/${targetSection}`,
                        ];
                        if(targetFile === "projects.sh"){
                            onProjectsCommand?.();
                        }
                    } else {
                        output = [
                            `bash: cannot find '${targetFile}'`,
                            `Expected: ${expectedPath1}/${targetFile} or absolute path`,
                        ];
                    }
                } else if (Object.values(validSections).includes(targetFile)) {
                    output = [
                        `bash: cannot find '${targetFile}'`,
                        `Expected: ~/portfolio/<section>/${targetFile} or absolute path`,
                    ];
                } else {
                    output = [
                        `bash: ${fileName}: No such file or directory`,
                        "Usage: bash <filename.sh>",
                    ];
                }
            }
        }


        // Unknown command
        else {
            output = [`bash: ${cmd}: command not found`];
        }

        setCurrentPath(newPath);
        setHistory((prev) => [...prev, {command: input, output, path: currentPath}]);
    };

    // ===== EFFECT 1: Auto Mode - Execute commands based on scroll =====
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            // Find command that should execute at current scroll position
            const activeCommand = COMMAND_SCROLL_DOWN_MAP.find(cmd => {
                const [start, end] = cmd.scrollRange;
                const commandKey = `${cmd.command}-${cmd.section}`;
                return latest >= start && latest < end && !executedCommands.has(commandKey);
            });

            if (activeCommand && !isTyping) {
                setIsTyping(true);
                const command = activeCommand.command;
                const commandKey = `${command}-${activeCommand.section}`;

                // Start typing animation
                setCurrentTypingCommand(command);
                setCurrentTypingProgress(0);

                const typingDuration = command.length * 50;
                const totalDelay = typingDuration + 500;

                // Animate typing
                const typingInterval = setInterval(() => {
                    setCurrentTypingProgress((prev) => {
                        const newProgress = prev + 1;
                        if (newProgress >= command.length) {
                            clearInterval(typingInterval);
                            return command.length;
                        }
                        return newProgress;
                    });
                }, 50);

                // Execute command after typing
                const timer = setTimeout(() => {
                    handleManualCommand(command);
                    setExecutedCommands((prev) => new Set(prev).add(commandKey));
                    setIsTyping(false);
                    setCurrentTypingCommand("");
                    setCurrentTypingProgress(0);
                    clearInterval(typingInterval);
                    setPriorInstructionsComplete(true);
                    setIsTreeOutputRendered(true);
                }, totalDelay);
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, isAuto, executedCommands, isTyping]);

    // ===== EFFECT 2: Auto Mode - Reset executed commands on scroll backwards =====
    useEffect(() => {
        if (!scrollProgress || !isAuto) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            setExecutedCommands((prev) => {
                const newSet = new Set();
                COMMAND_SCROLL_DOWN_MAP.forEach(cmd => {
                    const [start] = cmd.scrollRange;
                    const commandKey = `${cmd.command}-${cmd.section}`;
                    if (latest >= start && prev.has(commandKey)) {
                        newSet.add(commandKey);
                    }
                });
                return newSet;
            });
        });

        return () => unsubscribe();
    }, [scrollProgress, isAuto]);

    // ===== EFFECT 3: Manual Mode - Detect when priorInstructions complete =====
    useEffect(() => {
        // This is now handled by TypedText component onComplete callback
        // Can be removed if not needed
    }, []);

    // ===== EFFECT 4: Manual Mode - Set tree output rendered after delay =====
    useEffect(() => {
        if (isTreeExecuted && !isTreeOutputRendered) {
            const timer = setTimeout(() => {
                setIsTreeOutputRendered(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isTreeExecuted, isTreeOutputRendered]);

    // ===== EFFECT 5: Manual Mode - Check input focus state =====
    useEffect(() => {
        if (!isAuto && inputRef?.current) {
            const isActuallyFocused = document.activeElement === inputRef.current;
            if (isActuallyFocused !== inputFocused) {
                setInputFocused(isActuallyFocused);
            }
        }
    }, [isAuto, inputFocused]);

    // ===== EFFECT 6: Manual Mode - Update terminal position based on focus =====
    useEffect(() => {
        if (!isAuto) {
            if (inputFocused) {
                setManualX(650);
            } else {
                setManualX(800);
            }
        }
    }, [isAuto, inputFocused, setManualX]);

    // ===== EFFECT 7: Auto-scroll to bottom when history changes =====
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [history, isTreeExecuted]);

    // ===== EFFECT 8: Auto-focus input on mount and visibility =====
    useEffect(() => {
        const focusInput = () => {
            if (inputRef?.current) {
                const rect = inputRef.current.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0 &&
                    rect.top >= 0 && rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

                if (isVisible) {
                    inputRef.current.focus();
                    return true;
                }
                return false;
            }
            return false;
        };

        focusInput();
        const timer1 = setTimeout(() => focusInput(), 100);
        const timer2 = setTimeout(() => focusInput(), 500);
        const timer3 = setTimeout(() => focusInput(), 1000);
        const timer4 = setTimeout(() => focusInput(), 2000);

        let observer = null;
        const setupObserver = () => {
            if (inputRef?.current && !observer) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                                setTimeout(() => focusInput(), 100);
                            }
                        });
                    },
                    {threshold: 0.1}
                );
                observer.observe(inputRef.current);
            }
        };

        setTimeout(setupObserver, 100);
        setTimeout(setupObserver, 500);

        const handleKeyDown = (e) => {
            if (document.activeElement !== inputRef?.current &&
                !e.ctrlKey && !e.metaKey && !e.altKey &&
                e.key.length === 1 &&
                inputRef?.current) {
                focusInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            if (observer && inputRef?.current) {
                observer.unsubscribe(inputRef.current);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            ref={terminalRef}
            tabIndex={-1}
            onFocus={(e) => {
                if (e.target === e.currentTarget) {
                    inputRef?.current?.focus();
                }
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget || !e.target.closest('input')) {
                    setTimeout(() => {
                        inputRef?.current?.focus();
                    }, 0);
                }
            }}
            className="relative w-[60rem] max-w-3xl h-[30rem] rounded-2xl overflow-hidden font-mono text-white
         bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)]
         backdrop-blur-[24px] backdrop-brightness-75 border border-cyan-500/20
         shadow-[0_0_60px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.05)]
         transition-transform duration-500"
        >
            {/* ===== HEADER BAR ===== */}
            <div
                className="flex flex-row justify-between items-center bg-gradient-to-r from-[#0f0f0f]/90 to-[#1a1a1a]/90 border-b border-cyan-500/20">
                <div className="flex items-center gap-2 px-4 py-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]"></span>
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

            {/* ===== TERMINAL CONTENT ===== */}
            <div
                className="relative z-10 px-5 py-4 text-sm leading-relaxed text-gray-200 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]"
                onClick={(e) => {
                    if (e.target === e.currentTarget || !e.target.closest('input')) {
                        setTimeout(() => {
                            inputRef?.current?.focus();
                        }, 0);
                    }
                }}
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget || !e.target.closest('input')) {
                        setTimeout(() => {
                            inputRef?.current?.focus();
                        }, 0);
                    }
                }}
            >

                {/* ===== COMMAND HISTORY (Both Auto & Manual) ===== */}
                {history.map(({command, output, path}, idx) => (
                    <div key={idx}>
                        {/* Command line */}
                        {(command !== "cls" && command !== "clear") && (
                            <p>
                                <span className="text-cyan-400">{user_name}</span>
                                <span className="text-white">:{path}$</span>
                                <span className="text-cyan-300 ml-2">{command}</span>
                            </p>
                        )}

                        {/* Command output */}
                        {output && output.map((line, i) => (
                            <p key={i} className="text-cyan-100/75 whitespace-pre-wrap">
                                {line}
                            </p>
                        ))}
                    </div>
                ))}

                {/* ===== AUTO MODE: Current Typing Command ===== */}
                {isAuto && currentTypingCommand && (
                    <div>
                        <p>
                            <span className="text-cyan-400">{user_name}</span>
                            <span className="text-white">:{currentPath}$</span>
                            <span className="text-cyan-300 ml-2">
                                {currentTypingCommand.slice(0, currentTypingProgress)}
                            </span>
                            <span className="absolute  p-1 w-[1ch] h-[1.2rem] bg-cyan-300 animate-pulse pointer-events-none">
                                &nbsp;
                            </span>
                        </p>
                    </div>
                )}



                {/*/!* ===== MANUAL MODE: Initial Commands ===== *!/*/}
                {!isAuto && !priorInstructionsComplete && (
                    <>
                        {/* Tree command typing */}
                        <div>
                            <p>
                                <span className="text-cyan-400">{user_name}</span>
                                <span className="text-white">:{currentPath}$</span>
                                <span className="text-cyan-300 ml-2">
                                <TypedText
                                    strings={["tree"]}
                                    onComplete={handleTreeCommandExecuted}
                                    showCursor={false}
                                    typeSpeed={50}
                                />
                            </span>
                                {!isTreeExecuted && (
                                    <span className="absolute mt-1 w-[1ch] h-[1em] bg-cyan-300 animate-pulse pointer-events-none">
                                        &nbsp;
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Tree output */}
                        {isTreeExecuted && (
                            <div>
                                {treeOutput.map((line, i) => (
                                    <p key={i} className="text-cyan-100/75 whitespace-pre-wrap">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ===== MANUAL MODE: Input Command Prompt ===== */}
                {!isAuto && isTreeOutputRendered && (
                    <NewCommand
                        ref={inputRef}
                        user_name={user_name}
                        currentPath={currentPath}
                        onSubmit={handleManualCommand}
                        history={commandHistory}
                        onFocusChange={handleInputFocusChange}
                    />
                )}

                {/* Bottom scroll anchor */}
                <div ref={bottomRef}/>
            </div>

            {/* ===== OVERLAYS ===== */}
            <div
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%)] pointer-events-none"/>
            <div
                className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none"/>
            <div
                className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none"/>
            <div
                className="absolute -inset-1 rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none"/>
        </div>
    );
}