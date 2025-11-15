import React, { forwardRef, useEffect, useState, useCallback, useMemo } from "react";

const NewCommand = forwardRef(({ user_name, currentPath, onSubmit, history, onFocusChange }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(null);
    const [cursorPos, setCursorPos] = useState(0);
    const [focused, setFocused] = useState(true);

    // Memoized focus function
    const focusInput = useCallback(() => {
        if (ref?.current) {
            const rect = ref.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                ref.current.focus();
                return true;
            }
        }
        return false;
    }, [ref]);

    // Initial focus with progressive delays
    useEffect(() => {
        focusInput();

        const timers = [
            setTimeout(focusInput, 0),
            setTimeout(focusInput, 100),
            setTimeout(focusInput, 300),
            setTimeout(focusInput, 800)
        ];

        return () => timers.forEach(clearTimeout);
    }, [focusInput]);

    // Cursor position management
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

    // Memoized key handlers
    const handleKeyDown = useCallback((e) => {
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

                const upIndex = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
                if (upIndex !== historyIndex) {
                    setHistoryIndex(upIndex);
                    setInputValue(history[upIndex]);
                    setCursorPos(history[upIndex].length);
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
                    const downIndex = historyIndex + 1;
                    setHistoryIndex(downIndex);
                    setInputValue(history[downIndex]);
                    setCursorPos(history[downIndex].length);
                }
                break;

            case "ArrowLeft":
                e.preventDefault();
                setCursorPos(pos => Math.max(pos - 1, 0));
                break;

            case "ArrowRight":
                e.preventDefault();
                setCursorPos(pos => Math.min(pos + 1, inputValue.length));
                break;

            default:
                if (historyIndex !== null) {
                    setHistoryIndex(null);
                }
                break;
        }
    }, [inputValue, history, historyIndex, onSubmit]);

    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart;
        setInputValue(newValue);
        setCursorPos(cursorPosition);
    }, []);

    const handleClick = useCallback((e) => {
        e.stopPropagation();
        setCursorPos(e.target.selectionStart);
        ref?.current?.focus();
    }, [ref]);

    const handleFocus = useCallback(() => {
        setFocused(true);
        onFocusChange?.(true);
    }, [onFocusChange]);

    const handleBlur = useCallback(() => {
        setFocused(false);
        onFocusChange?.(false);
    }, [onFocusChange]);

    const handleMouseDown = useCallback((e) => {
        e.stopPropagation();
    }, []);

    // Memoized input width
    const inputWidth = useMemo(() =>
            `${Math.max(inputValue.length, 1)}ch`,
        [inputValue.length]
    );

    // Memoized cursor position
    const cursorLeft = useMemo(() =>
            `calc(${cursorPos}ch)`,
        [cursorPos]
    );

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
                    onClick={handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onMouseDown={handleMouseDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoFocus
                    tabIndex={0}
                    style={{
                        width: inputWidth,
                        minWidth: '1ch',
                        position: 'relative',
                        zIndex: 20,
                    }}
                    className="bg-transparent border-none outline-none text-cyan-300 ml-2 font-mono caret-transparent"
                />
                {focused && (
                    <span
                        style={{ left: cursorLeft }}
                        className="absolute ml-2 mt-1 w-[1ch] h-[1em] bg-cyan-300 animate-pulse pointer-events-none"
                    />
                )}
            </div>
        </div>
    );
});

NewCommand.displayName = 'NewCommand';

export default NewCommand;
