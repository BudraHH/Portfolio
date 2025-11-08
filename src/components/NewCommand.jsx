import React, { forwardRef, useEffect, useState } from "react";

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

NewCommand.displayName = 'NewCommand';

export default NewCommand;
