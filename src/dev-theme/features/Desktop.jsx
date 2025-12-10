import Terminal from "../components/applications/desktop-applications/terminal/Terminal.jsx";
import ChildProcessTerminal from "../components/applications/desktop-applications/terminal/ChildProcessTerminal.jsx";
import FirefoxWindow from "../components/applications/desktop-applications/firefox/FirefoxApp.jsx";
import SystemWarning from "../components/system/SystemWarning.jsx";
import FilesExplorer from "../components/applications/desktop-applications/files-explorer/FilesExplorer.jsx";
import HelpCenter from "../components/applications/desktop-applications/help-center/HelpCenter.jsx";
import Thunderbird from "../components/applications/desktop-applications/thunder-bird/Thunderbird.jsx";
import Hero from "../sections/Hero.jsx";
import React, { useState, useCallback, useRef, useEffect } from "react";

const Window = ({ id, title, children, initialPosition, initialSize, onClose, onFocus, isActive, zIndex, isMinimized, onToggleMinimize }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isMaximized, setIsMaximized] = useState(false);
    // REMOVED local isMinimized state
    const [previousState, setPreviousState] = useState(null);

    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
    const resizeDirection = useRef('');

    // Restore size/position when un-minimizing (handled implicitly by not unmounting)
    useEffect(() => {
        if (!isMinimized && isActive) {
            // Ensure z-index is top when restoring
            onFocus(id);
        }
    }, [isMinimized, isActive, id, onFocus]);


    const toggleMaximize = useCallback(() => {
        onFocus(id); // Focusing when maximizing
        if (isMaximized) {
            setPosition(previousState.position);
            setSize(previousState.size);
            setIsMaximized(false);
        } else {
            setPreviousState({ position, size });
            setPosition({ x: 0, y: 0 });
            setSize({ width: window.innerWidth, height: window.innerHeight }); // Full screen
            setIsMaximized(true);
        }
    }, [isMaximized, position, size, previousState, id, onFocus]);

    const toggleMinimize = useCallback(() => {
        // Delegate to parent
        onToggleMinimize(id, !isMinimized);
    }, [isMinimized, id, onToggleMinimize]);

    const handleMouseDown = useCallback((e) => {
        // Allow interaction with resize handles without triggering drag
        if (e.target.closest('.resize-handle')) return;

        // DELEGATED INTERACTION: Only start drag if clicking a designated drag handle
        if (!e.target.closest('.window-drag-handle')) return;

        onFocus(id);
        isDragging.current = true;
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        // e.preventDefault(); // Don't prevent default here, lets inputs focus etc if they are inside
    }, [position, id, onFocus]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging.current && !isMaximized) {
            const newX = e.clientX - dragStart.current.x;
            const newY = e.clientY - dragStart.current.y;

            setPosition({
                x: Math.max(0, Math.min(newX, window.innerWidth - 100)),
                y: Math.max(0, Math.min(newY, window.innerHeight - 100))
            });
        }

        if (isResizing.current) {
            const deltaX = e.clientX - resizeStart.current.x;
            const deltaY = e.clientY - resizeStart.current.y;
            const dir = resizeDirection.current;

            let newSize = { width: resizeStart.current.width, height: resizeStart.current.height };
            let newPos = { x: resizeStart.current.posX, y: resizeStart.current.posY };

            if (dir.includes('e')) {
                newSize.width = Math.max(300, resizeStart.current.width + deltaX);
            }
            if (dir.includes('s')) {
                newSize.height = Math.max(200, resizeStart.current.height + deltaY);
            }
            if (dir.includes('w')) {
                const newWidth = Math.max(300, resizeStart.current.width - deltaX);
                newPos.x = resizeStart.current.posX + (resizeStart.current.width - newWidth);
                newSize.width = newWidth;
            }
            if (dir.includes('n')) {
                const newHeight = Math.max(200, resizeStart.current.height - deltaY);
                newPos.y = resizeStart.current.posY + (resizeStart.current.height - newHeight);
                newSize.height = newHeight;
            }

            setSize(newSize);
            setPosition(newPos);
        }
    }, [isMaximized]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        isResizing.current = false;
    }, []);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging.current || isResizing.current) {
                handleMouseMove(e);
            }
        };

        const handleGlobalMouseUp = () => {
            handleMouseUp();
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const handleResizeStart = useCallback((e, direction) => {
        e.stopPropagation();
        e.preventDefault();
        onFocus(id);
        isResizing.current = true;
        resizeDirection.current = direction;
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height,
            posX: position.x,
            posY: position.y
        };
    }, [position, size, id, onFocus]);


    // REMOVED: if (isMinimized) return null;

    // Inject props into children for window control
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClose: () => onClose(id),
                onMinimize: toggleMinimize,
                onMaximize: toggleMaximize,
                isMaximized: isMaximized
            });
        }
        return child;
    });

    return (
        <div
            className={`absolute rounded-xl overflow-hidden transition-shadow ${isActive ? 'shadow-2xl z-[100]' : 'shadow-lg'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                zIndex: zIndex,
                display: isMinimized ? 'none' : 'block', // CSS VISIBILITY TOGGLE for persisting state
                // Removed backdrop-blur/border/bg from here, child should handle it to look seamless
            }}
            onMouseDown={(e) => {
                // Determine if we should focus based on click
                onFocus(id);
                // Also check for drag logic
                handleMouseDown(e);
            }}
        >
            {/* Content Area - Full Size */}
            <div className="w-full h-full relative">
                {childrenWithProps}
            </div>

            {/* Resize handles */}
            {!isMaximized && (
                <>
                    {/* Edge handles */}
                    <div className="resize-handle absolute top-0 left-0 right-0 h-2 cursor-n-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'n')} />
                    <div className="resize-handle absolute bottom-0 left-0 right-0 h-2 cursor-s-resize z-50" onMouseDown={(e) => handleResizeStart(e, 's')} />
                    <div className="resize-handle absolute top-0 bottom-0 left-0 w-2 cursor-w-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'w')} />
                    <div className="resize-handle absolute top-0 bottom-0 right-0 w-2 cursor-e-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'e')} />

                    {/* Corner handles */}
                    <div className="resize-handle absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
                    <div className="resize-handle absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
                    <div className="resize-handle absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
                    <div className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'se')} />
                </>
            )}
        </div>
    );
};



// Window content mapping
const getWindowContent = (tab, onOpenApp) => {
    const label = tab.label;

    // Props common to all apps that might need them
    const commonProps = {
        onOpenApp: onOpenApp,
        launchParams: tab.launchParams || null
    };

    const contentMap = {
        'Terminal': <Terminal {...commonProps} />,
        'Installer': <ChildProcessTerminal {...commonProps} />,
        'Firefox': <FirefoxWindow {...commonProps} />,
        'Thunderbird': <Thunderbird {...commonProps} />,
        'Files': <FilesExplorer {...commonProps} />,
        'Help': <HelpCenter {...commonProps} />,
        'About': <Hero {...commonProps} />
    };

    return contentMap[label] || <div className="p-4 text-cyan-400">Content not found</div>;
};

const getInitialWindowProps = (label, index) => {
    const isTerminal = label === 'Terminal' || label === 'Installer';
    const isHero = label === 'About';

    const size = isTerminal
        ? { width: 650, height: 450 }
        : isHero
            ? { width: 1100, height: 650 }
            : { width: 1000, height: 600 };

    return {
        initialPosition: { x: 50 + (index * 30), y: 50 + (index * 30) },
        initialSize: size
    };
};

export default function Desktop({ activeTabs = [], onRemoveTab, onOpenApp, onToggleMinimize }) {
    const [activeWindow, setActiveWindow] = useState(null);
    const [nextZIndex, setNextZIndex] = useState(100);
    const [zIndices, setZIndices] = useState({});

    // Use ID for focus management
    const handleFocus = useCallback((id) => {
        setActiveWindow(id);
        setNextZIndex(prevMax => {
            const newMax = prevMax + 1;
            setZIndices(prevIndices => ({
                ...prevIndices,
                [id]: newMax
            }));
            return newMax;
        });
    }, []);

    const handleClose = useCallback((id) => {
        if (onRemoveTab) {
            onRemoveTab(id);
        }
    }, [onRemoveTab]);

    const getZIndex = useCallback((id) => {
        return zIndices[id] || 100;
    }, [zIndices]);

    // Auto-focus newly added windows by ID
    const prevActiveTabsRef = useRef([]);
    useEffect(() => {
        const prevTabs = prevActiveTabsRef.current;
        // Find tabs in current list that weren't in previous list (by ID)
        const addedTabs = activeTabs.filter(t => !prevTabs.some(pt => pt.id === t.id));

        addedTabs.forEach(tab => {
            handleFocus(tab.id);
        });

        prevActiveTabsRef.current = activeTabs;
    }, [activeTabs, handleFocus]);

    return (
        <div className="relative w-full h-full overflow-hidden select-none">
            {activeTabs.map((tab, index) => {
                const windowProps = getInitialWindowProps(tab.label, index);
                return (
                    <Window
                        key={tab.id}
                        id={tab.id}
                        title={tab.label}
                        initialPosition={windowProps.initialPosition}
                        initialSize={windowProps.initialSize}
                        onClose={handleClose}
                        onFocus={handleFocus}
                        isActive={activeWindow === tab.id}
                        zIndex={getZIndex(tab.id)}
                        isMinimized={tab.isMinimized}
                        onToggleMinimize={onToggleMinimize}
                    >
                        {getWindowContent(tab, onOpenApp)}
                    </Window>
                );
            })}

            <SystemWarning />
        </div>
    );
}
