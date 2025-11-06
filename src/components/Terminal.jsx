import React, { forwardRef, useEffect, useRef, useState } from "react";

const NewCommand = forwardRef(({ user_name, currentPath, onSubmit, history }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(null);
    const [cursorPos, setCursorPos] = useState(0);
    const [focused, setFocused] = useState(true);

    useEffect(() => {
        // Focus the input when component mounts or ref becomes available
        const timer = setTimeout(() => {
            if (ref?.current) {
                ref.current.focus();
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (ref?.current && cursorPos !== null) {
            // Use requestAnimationFrame to ensure DOM is updated
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

            <div className="relative inline-block">
                <input
                    ref={ref}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    onClick={(e) => setCursorPos(e.target.selectionStart)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        width: `${Math.max(inputValue.length, 1)}ch`,
                        minWidth: '1ch',
                    }}
                    className="bg-transparent border-none outline-none text-cyan-300 ml-2 font-mono caret-transparent"
                    autoComplete="off"
                    autoFocus
                    tabIndex={0}
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


export default function Terminal() {
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const user_name = "dev@budraPortfolio";
    const sections = [
        { name: "info", file: "info.jsx", size: "4096", date: "Jan 01 12:34" },
        { name: "skills", file: "skills.jsx", size: "3072", date: "Feb 14 08:22" },
        { name: "education", file: "education.jsx", size: "2560", date: "Mar 22 11:15" },
        { name: "projects", file: "projects.jsx", size: "8192", date: "Apr 18 14:20" },
        { name: "contact", file: "contact.jsx", size: "1024", date: "May 03 10:10" },
        { name: "resume", file: "resume.jsx", size: "5120", date: "Jun 05 09:00" },
    ];

    const [basePath] = useState("~");
    const [currentPath, setCurrentPath] = useState(basePath);
    const [history, setHistory] = useState([]);

    const commandHistory = history.map((entry) => entry.command);

    const handleCommand = (input) => {
        let output = null;
        let newPath = currentPath;
        const cmd = input.trim().toLowerCase();

        // Refocus input after command submission
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 0);

        if (cmd.startsWith("cd")) {
            const parts = cmd.split(" ");
            if (parts.length === 2) {
                let destination = parts[1].trim().replace(/\/$/, ""); // remove trailing slash

                if (destination === "~" || destination === "") {
                    newPath = "~";
                    output = null;
                } else {
                    // Normalize destination (remove "./" or "/" prefix)
                    destination = destination.replace(/^\.\/|^\//, "");

                    const sectionNames = sections.map((section) => section.name);
                    let currentParts = currentPath.replace(/^~\/?/, "").split("/"); // e.g., ["portfolio", "about"]
                    if (currentParts[0] === "") currentParts = []; // handle "~" as root

                    // Split destination into path parts
                    const destParts = destination.split("/").filter(Boolean);

                    for (let part of destParts) {
                        if (part === "~") {
                            currentParts = []; // go home
                        } else if (part === "..") {
                            // Go up one level if possible
                            if (currentParts.length > 0) currentParts.pop();
                        } else if (part === ".") {
                            continue; // stay in current directory
                        } else if (part === "portfolio" && currentParts.length === 0) {
                            // Go into portfolio from ~
                            currentParts.push("portfolio");
                        } else if (sectionNames.includes(part)) {
                            // Go into a valid section (only if inside portfolio)
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
        else if (cmd.startsWith("ls")) {
            const showDetails = cmd.includes("-la");

            if (currentPath === "~") {
                output = showDetails
                    ? [
                        "drwxr-xr-x  5 dev  portfolio  4096 Jan 01 12:34 portfolio",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 .",
                        "drwxr-xr-x  1 dev  portfolio  1024 Jan 01 12:34 ..",
                    ]
                    : ["portfolio"];
            } else if (currentPath === "~/portfolio") {
                output = showDetails
                    ? sections.map(
                        ({ name, size, date }) =>
                            `drwxr-xr-x  5 dev  portfolio  ${size} ${date} ${name}`
                    )
                    : [sections.map(({ name }) => name).join("  ")];
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

        } else if(cmd === "pwd") {
            output = [currentPath];
        } else if (cmd === "cls" || cmd === "clear") {
            setHistory([]);
            output = null; // no output after clearing
        } else if (cmd === "help") {
            output = [
                "Available commands:",
                "",
                "  ls            - List directory contents",
                "  ls -la        - List detailed directory contents",
                "  cd <dir>      - Change the current directory",
                "  cd ..         - Go back to the previous directory",
                "  cd ~          - Return to the home directory",
                "  clear / cls   - Clear the terminal screen",
                "  help          - Display this help message",
                "",
                "Examples:",
                "  cd portfolio",
                "  cd ./portfolio/about",
                "  ls -la",
                "",
                "Tip: Use ↑ and ↓ arrows to navigate command history.",
            ];
        } else if (cmd === "date") {
            const now = new Date();

            output = [now.toString()];
        } else {
            output = [`bash: ${cmd}: command not found`];
        }

        setCurrentPath(newPath);
        setHistory((prev) => [...prev, { command: input, output, path: currentPath }]);
    };


    // ✅ Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <div
            tabIndex={0}
            onFocus={() => inputRef?.current?.focus()}
            onClick={() => inputRef?.current?.focus()}
            className="relative w-full max-w-3xl h-96 rounded-2xl overflow-hidden font-mono text-white
             bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)]
             backdrop-blur-[24px] backdrop-brightness-75 border border-cyan-500/20
             shadow-[0_0_60px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.05)]
             transition-transform duration-500"
        >

        {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#0f0f0f]/90 to-[#1a1a1a]/90 border-b border-cyan-500/20">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]"></span>
                <span className="ml-3 text-sm text-cyan-400/70 select-none tracking-wide">
                    {user_name}: {currentPath}$
                </span>
            </div>

            {/* Terminal content */}
            <div
                className="relative z-10 px-5 py-4 text-sm leading-relaxed text-gray-200 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)] "
            >
                {history.map(({ command, output, path }, idx) => (
                    <div key={idx}>


                            {(command !== "cls" && command !== "clear") && (
                                <p>
                                    <span className="text-cyan-400">{user_name}</span>
                                    <span className="text-white">:{path}$</span>
                                    <span className="text-cyan-300 ml-2">{command}</span>
                                </p>
                            )}


                        {output &&
                            output.map((line, i) => (
                                <p key={i} className="text-cyan-100/75 whitespace-pre-wrap">
                                    {line}
                                </p>
                            ))}
                    </div>
                ))}

                <NewCommand
                    ref={inputRef}
                    user_name={user_name}
                    currentPath={currentPath}
                    onSubmit={handleCommand}
                    history={commandHistory}
                />


                <div ref={bottomRef} />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)] pointer-events-none" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none" />
            <div className="absolute -inset-1 rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
        </div>
    );
}
