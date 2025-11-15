import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaRegWindowMaximize, FaFirefoxBrowser, FaPlus,
    FaEllipsisV, FaBookmark, FaDownload, FaHistory, FaCog, FaLock,
    FaStar, FaRegStar, FaHome } from 'react-icons/fa';
import {
    BiSolidLeftArrow,
    BiSolidRightArrow,
    BiRefresh
} from 'react-icons/bi';
import { useEffect, useRef, useCallback } from "react";

export default function BrowserWindowPc({
                                            browserState,
                                            browserActions,
                                            renderTabContent,
                                            scrollProgress,
                                            sectionScrollRange, pid
                                        }) {
    const {
        tabs,
        activeTabId,
        activeTab,
        isLoading,
        urlInput,
        isUrlEditing,
        showMenu,
        showBookmarks,
        downloads,
        isBookmarked
    } = browserState;

    const {
        onClose,
        setActiveTabId,
        createNewTab,
        closeTab,
        goBack,
        goForward,
        refresh,
        goHome,
        setShowMenu,
        setShowBookmarks,
        handleUrlSubmit,
        setUrlInput,
        setIsUrlEditing,
        toggleBookmark,
        handleDownload,
        openDownloadsTab
    } = browserActions;

    const menuRef = useRef(null);
    const contentRef = useRef(null); // ✅ NEW: Ref for scrollable content
    
    // Sync browser scroll with global scroll progress
    useEffect(() => {
        if (!scrollProgress || !sectionScrollRange || !contentRef.current) return;

        const unsubscribe = scrollProgress.on("change", (latest) => {
            const [sectionStart, sectionEnd] = sectionScrollRange;
            if (latest >= sectionStart && latest <= sectionEnd) {
                const localProgress = (latest - sectionStart) / (sectionEnd - sectionStart);
                const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
                
                if (maxScroll > 0) {
                    // Mark as syncing to prevent scroll event from triggering
                    contentRef.current.dataset.syncing = 'true';
                    contentRef.current.scrollTop = localProgress * maxScroll;
                    // Remove syncing flag after a short delay
                    setTimeout(() => {
                        if (contentRef.current) {
                            contentRef.current.dataset.syncing = 'false';
                        }
                    }, 50);
                }
            }
        });

        return () => unsubscribe();
    }, [scrollProgress, sectionScrollRange]);

    const handleClickOutside = useCallback((event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    }, [setShowMenu]);

    // ✅ NEW: Handle browser scroll and sync with global scroll
    const handleBrowserScroll = useCallback((e) => {
        // Don't update global scroll when syncing from global scroll
        // This prevents infinite loops
        if (contentRef.current?.dataset.syncing === 'true') {
            return;
        }
    }, []);

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showMenu, handleClickOutside]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-start p-3 xs:p-4 sm:p-6 md:p-16 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-label="Browser Overlay"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-[75rem]
                    h-[90vh] xs:h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[40rem]
                    rounded-lg xs:rounded-xl sm:rounded-2xl
                    overflow-hidden
                    shadow-[0_0_8px_rgba(0,255,255,0.25)]
                    bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.97)_100%)]
                    border border-cyan-500/20
                    backdrop-blur-[24px] flex flex-col"
                role="application"
            >
                {/* Title Bar */}
                <div className="bg-gradient-to-r from-cyan-950/20 to-[#1a1a1aE6]
                    px-2 xs:px-3 sm:px-4
                    py-2 xs:py-2.5 sm:py-3
                    border-b border-cyan-500/20 flex items-center justify-between select-none">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                        <button
                            onClick={onClose}
                            className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-red-500 hover:bg-red-600
                                shadow-[0_0_8px_rgba(255,0,0,0.8)] flex items-center justify-center group transition-colors"
                            aria-label="Close Window"
                            type="button"
                        >
                            <FaTimes className="text-[6px] xs:text-[8px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                            className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-yellow-400 hover:bg-yellow-500
                                shadow-[0_0_8px_rgba(255,255,0,0.8)] flex items-center justify-center group transition-colors"
                            aria-label="Minimize Window"
                            type="button"
                        >
                            <FaMinus className="text-[6px] xs:text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                            className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-green-500 hover:bg-green-600
                                shadow-[0_0_8px_rgba(0,255,0,0.8)] flex items-center justify-center group transition-colors"
                            aria-label="Maximize Window"
                            type="button"
                        >
                            <FaRegWindowMaximize className="text-[5px] xs:text-[6px] text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        {pid}
                    </div>

                    <div className="flex-1 flex items-center gap-1 mx-2 xs:mx-3 sm:mx-4 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                        <AnimatePresence initial={false}>
                            {tabs.map((tab) => (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`flex items-center justify-between gap-1.5 xs:gap-2 
                                        px-1.5 xs:px-2 py-1 xs:py-1.5 
                                        rounded-md xs:rounded-lg 
                                        border cursor-pointer 
                                        min-w-[100px] xs:min-w-[120px] sm:min-w-[140px] 
                                        max-w-[180px] xs:max-w-[200px] sm:max-w-[250px] 
                                        transition-all flex-shrink-0
                                        ${activeTabId === tab.id
                                        ? 'bg-[#08141b] border-cyan-500/50 shadow-[0_-2px_10px_rgba(0,255,255,0.1)]'
                                        : 'bg-transparent border-cyan-500/30 hover:bg-[#0a1520] hover:border-cyan-500/10'
                                    }`}
                                    role="tab"
                                    aria-selected={activeTabId === tab.id}
                                    tabIndex={activeTabId === tab.id ? 0 : -1}
                                >
                                    <div className="flex items-center gap-1.5 xs:gap-2 truncate">
                                        <FaFirefoxBrowser className="text-cyan-400 text-xs xs:text-sm flex-shrink-0" />
                                        <span className="text-cyan-100 text-[10px] xs:text-xs font-medium truncate">{tab.title}</span>
                                    </div>
                                    <button
                                        onClick={(e) => closeTab(tab.id, e)}
                                        className="opacity-100 group-hover:opacity-100 hover:bg-cyan-500/20 p-0.5 xs:p-1 rounded transition-all flex-shrink-0"
                                        aria-label={`Close tab ${tab.title}`}
                                        type="button"
                                    >
                                        <FaTimes className="text-cyan-400 text-[8px] xs:text-[10px]" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button
                            onClick={createNewTab}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors flex-shrink-0"
                            title="New Tab (Ctrl+T)"
                            aria-label="Create New Tab"
                            type="button"
                        >
                            <FaPlus className="text-cyan-400 text-[10px] xs:text-xs" />
                        </button>
                    </div>
                </div>

                {/* Navigation Bar */}
                <nav
                    className="bg-[#0a1520]
                        px-2 xs:px-3
                        py-1.5 xs:py-2
                        border-b border-cyan-500/20 flex items-center gap-1.5 xs:gap-2 flex-wrap sm:flex-nowrap"
                    aria-label="Browser Navigation"
                >
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-0.5 xs:gap-1 flex-shrink-0">
                        <button
                            onClick={goBack}
                            disabled={!activeTab || activeTab.historyIndex <= 0}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors text-cyan-400 hover:text-cyan-300 disabled:opacity-30"
                            title="Back (Alt+Left)"
                            aria-label="Back"
                            type="button"
                        >
                            <BiSolidLeftArrow className="text-sm xs:text-base" />
                        </button>
                        <button
                            onClick={goForward}
                            disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors text-cyan-400 hover:text-cyan-300 disabled:opacity-30"
                            title="Forward (Alt+Right)"
                            aria-label="Forward"
                            type="button"
                        >
                            <BiSolidRightArrow className="text-sm xs:text-base" />
                        </button>
                        <button
                            onClick={refresh}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors text-cyan-400 hover:text-cyan-300 relative"
                            title="Refresh (F5)"
                            aria-label="Refresh"
                            type="button"
                        >
                            <BiRefresh className={`text-sm xs:text-base ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={goHome}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors text-cyan-400 hover:text-cyan-300"
                            title="Home"
                            aria-label="Home"
                            type="button"
                        >
                            <FaHome className="text-xs xs:text-sm" />
                        </button>
                    </div>

                    {/* URL Bar */}
                    <form
                        onSubmit={handleUrlSubmit}
                        className="flex-1 flex items-center gap-1.5 xs:gap-2
                            px-2 xs:px-3
                            py-1.5 xs:py-2
                            rounded-md xs:rounded-lg
                            bg-[#08141b] border border-cyan-500/30 hover:border-cyan-500/50
                            focus-within:border-cyan-500 focus-within:shadow-[0_0_15px_rgba(0,255,255,0.2)]
                            transition-all"
                        role="search"
                        aria-label="URL bar and search"
                    >
                        <FaLock className="text-cyan-400 text-[10px] xs:text-xs flex-shrink-0" />
                        <input
                            type="text"
                            value={isUrlEditing ? urlInput : activeTab?.url || ""}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onFocus={() => setIsUrlEditing(true)}
                            onBlur={() => setIsUrlEditing(false)}
                            className="flex-1 bg-transparent text-cyan-100 text-xs xs:text-sm outline-none font-mono
                              placeholder-cyan-500/30 truncate"
                            placeholder="Search or enter address"
                            aria-label="URL or Search"
                        />
                        {isLoading && (
                            <div className="w-3 h-3 xs:w-4 xs:h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" aria-live="polite" aria-label="Loading" />
                        )}
                        <button
                            type="button"
                            onClick={toggleBookmark}
                            className="hover:scale-110 transition-transform"
                            aria-pressed={isBookmarked}
                            aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                        >
                            {isBookmarked ? (
                                <FaStar className="text-cyan-400 text-xs xs:text-sm" />
                            ) : (
                                <FaRegStar className="text-cyan-500/50 hover:text-cyan-400 text-xs xs:text-sm" />
                            )}
                        </button>
                    </form>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5 xs:gap-1 flex-shrink-0">
                        <button
                            onClick={handleDownload}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors text-cyan-400 hover:text-cyan-300"
                            title="Download (Ctrl+S)"
                            aria-label="Download"
                            type="button"
                        >
                            <FaDownload className="text-xs xs:text-sm" />
                        </button>
                    </div>

                    {/* Menu Button */}
                    <div className="relative flex-shrink-0" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1.5 xs:p-2 hover:bg-cyan-500/10 rounded transition-colors"
                            aria-haspopup="true"
                            aria-expanded={showMenu}
                            aria-label="More options menu"
                            type="button"
                        >
                            <FaEllipsisV className="text-cyan-400 text-xs xs:text-sm" />
                        </button>

                        {showMenu && (
                            <div
                                className="absolute right-0 top-full mt-2 w-48 xs:w-56 sm:w-64
                                    bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.95)_100%)]
                                    rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500/30 py-2 z-50"
                                onClick={e => e.stopPropagation()}
                                role="menu"
                            >
                                <button
                                    onClick={() => setShowBookmarks(!showBookmarks)}
                                    className="w-full px-3 xs:px-4 py-1.5 xs:py-2 hover:bg-cyan-500/10 text-left text-cyan-100 text-xs xs:text-sm flex items-center gap-2 xs:gap-3 transition-colors"
                                    role="menuitem"
                                    type="button"
                                >
                                    <FaBookmark className="text-cyan-400" /> Bookmarks
                                </button>
                                <button
                                    onClick={openDownloadsTab}
                                    className="w-full px-3 xs:px-4 py-1.5 xs:py-2 hover:bg-cyan-500/10 text-left text-cyan-100 text-xs xs:text-sm flex items-center gap-2 xs:gap-3 transition-colors"
                                    role="menuitem"
                                    type="button"
                                >
                                    <FaDownload className="text-cyan-400" /> Downloads ({downloads.length})
                                </button>
                                <div className="h-px bg-cyan-500/20 my-2" />
                                <button
                                    className="w-full px-3 xs:px-4 py-1.5 xs:py-2 hover:bg-cyan-500/10 text-left text-cyan-100 text-xs xs:text-sm flex items-center gap-2 xs:gap-3 transition-colors"
                                    role="menuitem"
                                    type="button"
                                >
                                    <FaHistory className="text-cyan-400" /> History
                                </button>
                                <button
                                    className="w-full px-3 xs:px-4 py-1.5 xs:py-2 hover:bg-cyan-500/10 text-left text-cyan-100 text-xs xs:text-sm flex items-center gap-2 xs:gap-3 transition-colors"
                                    role="menuitem"
                                    type="button"
                                >
                                    <FaCog className="text-cyan-400" /> Settings
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Content Area - ✅ ADD SCROLL HANDLER */}
                <main
                    ref={contentRef}
                    data-browser-content
                    onScroll={handleBrowserScroll}
                    className="flex-1 relative bg-[#08141b] overflow-y-auto
                        rounded-b-lg xs:rounded-b-xl sm:rounded-b-2xl
                        flex flex-col
                        scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
                    tabIndex={-1}
                    aria-live="polite"
                    aria-busy={isLoading}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,255,0.03)_0%,rgba(0,255,255,0)_60%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.02)_0px,rgba(0,255,255,0.02)_1px,transparent_1px,transparent_2px)] mix-blend-overlay opacity-30 pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.08)] pointer-events-none rounded-b-lg xs:rounded-b-xl sm:rounded-b-2xl" />

                    {isLoading && activeTab?.content !== "iframe" ? (
                        <div className="flex items-center justify-center h-full relative z-10 text-cyan-300 font-sans text-center px-4 select-none">
                            <div className="relative w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 xs:mb-6">
                                <FaFirefoxBrowser className="text-4xl xs:text-5xl sm:text-6xl text-cyan-400 animate-pulse" aria-hidden="true" />
                            </div>
                            <p className="text-xs xs:text-sm sm:text-base">Loading page...</p>
                            <p className="text-cyan-400/70 font-mono text-[10px] xs:text-xs mt-1 truncate max-w-full px-4">{activeTab?.url}</p>
                        </div>
                    ) : (
                        <div className="relative z-10 flex-1">
                            {renderTabContent(activeTab?.content || "profile", activeTab?.url)}
                        </div>
                    )}
                </main>

                {/* Decorative Glow */}
                <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl -z-10 opacity-50 pointer-events-none animate-pulse-slow" />
            </motion.div>
        </motion.div>
    );
}
