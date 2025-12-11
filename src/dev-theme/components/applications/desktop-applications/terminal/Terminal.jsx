import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { FaTerminal } from "react-icons/fa";

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

import { fileSystemTree, getNode, resolvePath, formatPath } from "../../../../lib/fileSystemTree.js";

// Utility to get current path files (mocked 'cd' state would be needed for full traversal)
// For now, let's assume 'ls' lists the current directory if we implement tracking
// But the static 'COMMANDS' object makes state access hard.
// We need to move COMMANDS inside the component or pass state to it.

// Let's keep specific commands static but `ls` needs to be dynamic.
const STATIC_COMMANDS = {
    help: {
        description: "Show available commands",
        output: [
            "  help       - Show this help message",
            "  about      - Display information about me",
            "  experience - Show my work experience",
            "  skills     - List technical skills",
            "  projects   - Show my projects",
            "  contact    - Display contact information",
            "  clear      - Clear terminal screen",
            "  whoami     - Display current user",
            "  ls         - List directory contents",
            "  cd <dir>   - Change directory",
            "  cat        - Display file contents",
        ]
    },
    // ... (rest of static commands like about, experience, skills, projects, contact, whoami)
    about: {
        description: "Information about me",
        output: [
            "Hi, I'm Hari Hara Budra.",
            "Full-stack Developer passionate about building scalable web applications.",
            "I enjoy solving complex problems and creating intuitive user experiences.",
            "",
            "Current Role: Technical Support Engineer @ Movate Technologies",
            "Education: Computer Science Student",
        ]
    },
    experience: {
        description: "Work Experience",
        output: [
            "Work Experience:",
            "",
            "• Technical Support Engineer @ Movate Technologies (Present)",
            "  - Solving complex technical issues for global customers.",
            "  - Collaborating with cross-functional teams.",
            "",
            "• Previous Role @ Company X (Year - Year)",
            "  - Did cool stuff.",
        ]
    },
    skills: {
        description: "Technical skills",
        output: [
            "Technical Skills:",
            "",
            "Languages:  JavaScript, TypeScript, Python, Java, SQL",
            "Frontend:   React, Tailwind CSS, Next.js, Framer Motion",
            "Backend:    Node.js, Express, FastAPI, Django",
            "Database:   PostgreSQL, MongoDB, Redis",
            "DevOps:     Docker, Kubernetes, AWS, Git",
        ]
    },
    projects: {
        description: "My projects",
        output: [
            "Featured Projects:",
            "",
            "1. ApplyForge",
            "   Job application automation platform.",
            "   Stack: Python, FastAPI, React",
            "",
            "2. Portfolio",
            "   This interactive desktop environment.",
            "   Stack: React, Tailwind, Framer Motion",
        ]
    },
    contact: {
        description: "Contact information",
        output: [
            "Email:    your.email@example.com",
            "GitHub:   github.com/yourusername",
            "LinkedIn: linkedin.com/in/yourusername",
        ]
    },
    whoami: {
        description: "Current user",
        output: ["dev@portfolio"]
    },
    // ls is dynamic, handled in processCommand
    // cat is partially dynamic
    cat: {
        description: "Display file contents",
        requiresArg: true,
        files: {
            "about.txt": [
                "Full-stack Developer | Computer Science Student",
                "Building scalable web applications.",
            ],
            "contact.txt": [
                "Email: email@example.com",
            ]
        }
    }
};

import TerminalLine from "./TerminalLine.jsx";

export default function Terminal({ pid = 1337, onClose, onMinimize, onMaximize, onOpenApp, launchParams, readOnly = false }) {
    const [history, setHistory] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [cursorPos, setCursorPos] = useState(0); // Track cursor position
    const [isProcessing, setIsProcessing] = useState(false);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    // Initial setup
    useEffect(() => {
        setHistory([
            { type: 'output', content: "Welcome to Terminal v2.0" },
            { type: 'output', content: "Type 'help' to see available commands." },
            { type: 'output', content: "" }
        ]);
    }, []);


    useEffect(() => {
        if (!isProcessing) return;
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % spinnerFrames.length), 80);
        return () => clearInterval(spinner);
    }, [isProcessing]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    const handleContainerClick = () => {
        if (readOnly) return;
        const selection = window.getSelection();
        if (selection.toString().length === 0) {
            inputRef.current?.focus();
        }
    };



    // State now holds path as an array of segments: ['home', 'dev']
    const [currentPath, setCurrentPath] = useState(['home', 'dev']);

    const formatPrompt = (pathArray) => {
        const displayPath = formatPath(pathArray);
        return (
            <div className="flex shrink-0 pt-[2px]">
                <span className="text-cyan-400 font-bold">dev@portfolio</span>
                <span className="text-cyan-500/60">:</span>
                <span className="text-cyan-300">{displayPath}</span>
                <span className="text-cyan-400">$</span>
            </div>
        );
    };

    const processCommand = useCallback((command) => {
        const trimmed = command.trim();
        const [cmd, ...args] = trimmed.split(" ");
        const displayPath = formatPath(currentPath);

        // Add command to history immediately with CURRENT path
        if (cmd) {
            setHistory(prev => [...prev, {
                type: 'command',
                content: command,
                path: displayPath
            }]);
        } else {
            // Empty enter just shows prompt
            setHistory(prev => [...prev, {
                type: 'command',
                content: '',
                path: displayPath
            }]);
            return;
        }

        if (cmd === "clear") {
            setHistory([]);
            return;
        }

        // --- EXECUTION HANDLING (.sh files) ---
        // Check if command looks like a file execution path
        if (cmd.endsWith('.sh') || (cmd.startsWith('./') && cmd.endsWith('.sh'))) {
            const filename = cmd.startsWith('./') ? cmd.substring(2) : cmd;

            // Check if file exists in current path
            const node = getNode(currentPath);
            const childNode = node && node.children && node.children[filename];

            if (!childNode) {
                setHistory(prev => [...prev, { type: 'error', content: `bash: ${cmd}: No such file or directory` }]);
                return;
            }

            if (childNode.type !== 'shell') {
                setHistory(prev => [...prev, { type: 'error', content: `bash: ${cmd}: Permission denied` }]);
                return;
            }

            // Special Handler for Skills Installer
            if (filename === 'install-skills-packages.sh') {
                // GENERATE RANDOM PID
                const randomPid = Math.floor(Math.random() * 9000) + 1000;

                setHistory(prev => [...prev, {
                    type: 'output',
                    content: `[INFO] Spawning child process for ${filename}...`
                }]);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: `[SUCCESS] Process started (PID: ${randomPid})` }]);

                    // USE INTERNAL SCRIPT IF AVAILABLE, OTHERWISE CONTENT
                    const scriptToRun = childNode.internalScript || childNode.content;

                    onOpenApp('Installer', {
                        script: scriptToRun,
                        pid: randomPid // PASS PID TO CHILD
                    });
                }, 500);
                return;
            } else if (filename === 'resume-download.sh') {
                // GENERATE RANDOM PID
                const randomPid = Math.floor(Math.random() * 9000) + 1000;

                setHistory(prev => [...prev, {
                    type: 'output',
                    content: `[INIT] Initializing resume download utility...`
                }]);

                setTimeout(() => {
                    setHistory(prev => [...prev,
                    { type: 'output', content: `[INFO] Target file: Resume.pdf` },
                    { type: 'output', content: `[INFO] Spawning download manager...` }
                    ]);
                }, 200);

                setTimeout(() => {
                    setHistory(prev => [...prev, {
                        type: 'output',
                        content: `[SUCCESS] Download manager spawned (PID: ${randomPid}).`
                    }]);
                    setHistory(prev => [...prev, {
                        type: 'output',
                        content: `Monitor the new window for download progress.`
                    }]);

                    // USE INTERNAL SCRIPT IF AVAILABLE, OTHERWISE CONTENT
                    const scriptToRun = childNode.internalScript || childNode.content;

                    onOpenApp('Installer', {
                        script: scriptToRun,
                        pid: randomPid,
                        title: 'Resume Download'
                    });
                }, 700);
                return;
            } else if (filename === 'projects-list.sh') {
                setHistory(prev => [...prev,
                { type: 'output', content: "[INIT] Connecting to GitHub API..." },
                { type: 'output', content: "[INFO] Authenticating session..." }
                ]);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "[SUCCESS] Token verified." }]);
                }, 400);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "[NET] Fetching public repositories..." }]);
                }, 800);

                setTimeout(() => {
                    setHistory(prev => [...prev,
                    { type: 'output', content: "[DATA] Download complete." },
                    { type: 'output', content: "[LAUNCH] Opening Project Viewer..." }
                    ]);

                    onOpenApp('Firefox', { url: "https://portfolio.com/projects", pid: 1337 });
                }, 1500);
                return;

            } else if (filename === 'career-journey.sh') {
                // Generate random PID for the app
                const randomPid = Math.floor(Math.random() * 9000) + 1000;

                setHistory(prev => [...prev, {
                    type: 'output',
                    content: `[INIT] Loading career timeline data...`
                }]);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: `[INFO] Spawning timeline viewer...` }]);
                }, 300);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: `[SUCCESS] Timeline viewer active (PID: ${randomPid}).` }]);

                    // Launch CareerJourney as a visual app (like Hero)
                    onOpenApp('CareerJourney', {
                        pid: randomPid
                    });
                }, 600);
                return;

            } else if (filename === 'info-run.sh') {
                setHistory(prev => [...prev,
                { type: 'output', content: "[INIT] checking display server..." },
                { type: 'output', content: "[OK] Wayland session detected." }
                ]);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "[INIT] Verifying browser dependencies..." }]);
                }, 400);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "[OK] Firefox core found." }]);
                }, 800);

                setTimeout(() => {
                    setHistory(prev => [...prev,
                    { type: 'output', content: "[LAUNCH] Opening https://portfolio.com/info..." }
                    ]);

                    onOpenApp('Firefox', { url: "https://portfolio.com/info", pid: 1338 });
                }, 1500);
                return;

            } else if (filename === 'profile_init.sh') {
                // For now, treat others as "run and show output" or "launch logic"
                // Since they were designed as simple cats in previous steps, 
                // we can either cat them or parse them.
                // Let's implement simple parsing for the 'firefox' command in them?
                // Or just output their echo lines.

                // Simulating execution for info-run / projects-list / profile_init
                const lines = childNode.content.split('\n');
                let delayAccumulator = 0;

                // Generate a random PID for this execution context to match the spawned app
                const executionPid = Math.floor(Math.random() * 9000) + 1000;

                lines.forEach(line => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine || trimmedLine.startsWith('#')) return;

                    if (trimmedLine.startsWith('sleep ')) {
                        const sleepTime = parseFloat(trimmedLine.split(' ')[1]) * 1000;
                        delayAccumulator += sleepTime;
                        return;
                    }

                    if (trimmedLine.startsWith('echo ')) {
                        let msg = trimmedLine.substring(5).replace(/"/g, '');
                        // Inject the generated PID if placeholder exists
                        msg = msg.replace('__PID__', executionPid);

                        setTimeout(() => {
                            setHistory(prev => [...prev, { type: 'output', content: msg }]);
                        }, delayAccumulator);
                        delayAccumulator += 100; // tiny delay for sequential feel
                    }
                    else if (trimmedLine.startsWith('firefox ')) {
                        // Extract URL
                        const urlMatch = trimmedLine.match(/"([^"]+)"/);
                        const url = urlMatch ? urlMatch[1] : null;

                        if (url) {
                            setTimeout(() => {
                                onOpenApp('Firefox', { url, pid: executionPid });
                            }, delayAccumulator + 500);
                        }
                    }
                    else if (trimmedLine.startsWith('open ')) {
                        // Handle generic app open: open "AppName"
                        const appMatch = trimmedLine.match(/"([^"]+)"/);
                        const appName = appMatch ? appMatch[1] : null;

                        if (appName) {
                            // Map simplified names if needed, or pass directly (Hero -> Info mapping if specific logic needed?)
                            // Assuming onOpenApp handles 'Hero' mapping to 'Info' or handled in GUI
                            const validApp = appName === 'Hero' ? 'Info' : appName;

                            setTimeout(() => {
                                onOpenApp(validApp, { pid: executionPid });
                            }, delayAccumulator + 500);
                        }
                    }
                });
                return;
            }

            return;
        }

        // --- DYNAMIC COMMANDS ---

        if (cmd === "pwd") {
            setHistory(prev => [...prev, { type: 'output', content: '/' + currentPath.join('/') }]);
            return;
        }

        if (cmd === "ls") {
            const node = getNode(currentPath);
            if (!node || !node.children) {
                return;
            }
            const childrenNames = Object.values(node.children).map(child => {
                return child.type === 'folder' ? `${child.name}/` : child.name
            });
            setHistory(prev => [...prev, { type: 'output', content: childrenNames.join("  ") }]);
            return;
        }

        if (cmd === "cd") {
            const target = args[0];
            if (!target) {
                setCurrentPath(['home', 'dev']);
                return;
            }

            const candidatePath = resolvePath(currentPath, target);
            const node = getNode(candidatePath);

            if (node && node.type === 'folder') {
                setCurrentPath(candidatePath);
            } else {
                setHistory(prev => [...prev, { type: 'error', content: `cd: ${target}: No such file or directory` }]);
            }
            return;
        }

        if (cmd === "tree") {
            const generateTree = (node, prefix = "") => {
                const children = Object.values(node.children || {});
                let result = [];
                children.forEach((child, index) => {
                    const isLast = index === children.length - 1;
                    const connector = isLast ? "└── " : "├── ";
                    result.push(`${prefix}${connector}${child.name}`);

                    if (child.type === 'folder' && child.children) {
                        const childPrefix = prefix + (isLast ? "    " : "│   ");
                        result = result.concat(generateTree(child, childPrefix));
                    }
                });
                return result;
            };

            const currentNode = getNode(currentPath);
            if (currentNode) {
                const treeOutput = generateTree(currentNode);
                setHistory(prev => [...prev, { type: 'output', content: treeOutput.join('\n') }]);
            }
            return;
        }

        // --- DOWNLOAD COMMAND ---
        if (cmd === "download") {
            const url = args[0];
            const filename = args[1] || url.split('/').pop();

            if (!url) {
                setHistory(prev => [...prev, { type: 'error', content: 'download: missing file URL' }]);
                return;
            }

            // Trigger actual browser download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setHistory(prev => [...prev, {
                type: 'output',
                content: `[SUCCESS] Downloading ${filename}...`
            }]);
            return;
        }

        // --- STATIC COMMANDS / FALLBACK ---

        const commandDef = STATIC_COMMANDS[cmd];
        if (!commandDef) {
            setHistory(prev => [
                ...prev,
                { type: 'error', content: `Error: command not found: ${cmd}` }
            ]);
            return;
        }

        if (cmd === "cat") {
            const filename = args[0];
            if (!filename) {
                setHistory(prev => [...prev, { type: 'error', content: "Usage: cat <filename>" }]);
                return;
            }

            const node = getNode(currentPath);
            const childNode = node && node.children && node.children[filename];

            if (!childNode || childNode.type === 'folder') {
                setHistory(prev => [...prev, { type: 'error', content: `cat: ${filename}: No such file` }]);
                return;
            }

            // Check if content exists on the node itself (new dynamic system)
            if (childNode.content) {
                setHistory(prev => [...prev, { type: 'output', content: childNode.content }]);
                return;
            }

            // Fallback to static definition (legacy)
            const fileContent = commandDef.files && commandDef.files[filename];

            if (fileContent) {
                // Join content array for display
                setHistory(prev => [...prev, { type: 'output', content: fileContent.join('\n') }]);
            } else {
                setHistory(prev => [...prev, { type: 'output', content: "(File exists but content is empty/binary)" }]);
            }
            return;
        }

        // Processing simulation for basic static commands
        setIsProcessing(true);
        setTimeout(() => {
            const outputContent = Array.isArray(commandDef.output) ? commandDef.output.join('\n') : commandDef.output;
            setHistory(prev => [
                ...prev,
                { type: 'output', content: outputContent }
            ]);
            setIsProcessing(false);
        }, 300);
    }, [currentPath, onOpenApp]); // Dependency on currentPath and onOpenApp added

    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(null);

    const handleKeyDown = (e) => {
        if (readOnly) return; // Prevent input in readOnly mode

        if (e.key === "Enter") {
            e.preventDefault();
            const cmd = currentInput;

            if (cmd.trim()) {
                setCommandHistory(prev => [...prev, cmd]);
            }
            setHistoryIndex(null);

            setCurrentInput("");
            setCursorPos(0);
            processCommand(cmd);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === null
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            const newValue = commandHistory[newIndex];
            setCurrentInput(newValue);
            setCursorPos(newValue.length);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === null) return;

            const newIndex = historyIndex + 1;

            if (newIndex >= commandHistory.length) {
                setHistoryIndex(null);
                setCurrentInput("");
                setCursorPos(0);
            } else {
                setHistoryIndex(newIndex);
                const newValue = commandHistory[newIndex];
                setCurrentInput(newValue);
                setCursorPos(newValue.length);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const matching = Object.keys(STATIC_COMMANDS).filter(c => c.startsWith(currentInput.toLowerCase()));
            if (matching.length === 1) {
                const match = matching[0];
                setCurrentInput(match);
                setCursorPos(match.length);
            }
        }
    };


    return (
        <div
            className={`w-full h-full flex flex-col font-mono text-sm 
                bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                rounded-lg overflow-hidden border border-cyan-500/20 
                shadow-[0_0_20px_rgba(0,0,0,0.5)] relative transition-colors duration-300`}
            onClick={handleContainerClick}
        >
            {/* Visual overlays */}
            <div className="absolute inset-0 pointer-events-none
                bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                rounded-lg mix-blend-overlay opacity-30 z-0" />
            <div className="absolute -inset-1 rounded-lg bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none z-0" />

            {/* Header / Title Bar */}
            <div className={`window-drag-handle h-12 flex items-center px-4 
                bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                border-b border-cyan-500/20 select-none shrink-0 z-30 cursor-grab active:cursor-grabbing`}>
                <div className="flex gap-2 group/controls" onMouseDown={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)] hover:bg-red-600 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-red-900">×</span>
                    </button>
                    <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] hover:bg-yellow-500 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-yellow-900">−</span>
                    </button>
                    <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)] hover:bg-green-600 flex items-center justify-center transition-colors">
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-green-900">+</span>
                    </button>
                </div>
                <div className={`flex-1 text-center text-xs text-cyan-400/70 font-medium flex items-center justify-center gap-2`}>
                    <FaTerminal className="text-cyan-400" />
                    <span>{'dev — -zsh — 80×24'}</span>
                </div>
                <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto custom-scrollbar scroll-smooth relative z-10"
            >
                {/* Output History */}
                <div className="flex flex-col gap-2">
                    {history.map((item, i) => (
                        <TerminalLine key={i} item={item} />
                    ))}
                </div>

                {/* Current Input Line */}
                {!isProcessing && !readOnly && (
                    <div className="flex items-center gap-2 mt-1 relative ">
                        {formatPrompt(currentPath)}

                        <div className="relative flex-1 justify-center items-center min-w-0 break-all font-mono">
                            {/* Visual Render of Input + Cursor */}
                            <div className="relative z-10 whitespace-pre-wrap break-all pointer-events-none text-cyan-100/90">
                                <span>{currentInput.slice(0, cursorPos)}</span>
                                <span className="relative inline-block">
                                    <span className="absolute -left-[0.1em] -top-[0.05em] text-cyan-400 animate-pulse select-none">▉</span>
                                    {currentInput[cursorPos] || '\u00A0'}
                                </span>
                                <span>{currentInput.slice(cursorPos + 1)}</span>
                            </div>

                            {/* Hidden Input for Typing */}
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => {
                                    setCurrentInput(e.target.value);
                                    setCursorPos(e.target.selectionStart);
                                }}
                                onKeyDown={(e) => {
                                    handleKeyDown(e);
                                    // Defer cursor update to next tick to catch new position
                                    setTimeout(() => {
                                        if (inputRef.current) {
                                            setCursorPos(inputRef.current.selectionStart);
                                        }
                                    }, 0);
                                }}
                                onClick={(e) => setCursorPos(e.target.selectionStart)}
                                onSelect={(e) => setCursorPos(e.target.selectionStart)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-text -z-0 "
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                {readOnly && (
                    <div className="mt-4 pt-2 border-t border-dashed border-gray-700 text-gray-500 text-xs text-center">
                        SESSION IS READ ONLY
                    </div>
                )}

                {/* Loading Spinner */}
                {isProcessing && (
                    <div className="mt-2 text-emerald-400 font-bold animate-pulse">
                        {spinnerFrames[spinnerStep]} Processing...
                    </div>
                )}

                {/* Scroll Anchor */}
                <div className="h-4" />
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#0a1520] border-t border-cyan-500/20 flex items-center px-3 text-[10px] text-cyan-500/60 select-none z-30 justify-between">
                <div className="flex items-center gap-4">
                    <span>{readOnly ? 'RO' : 'NORMAL'}</span>
                    <span>master*</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>utf-8</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}
