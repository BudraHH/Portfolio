import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaTimes, FaPlus, FaBookmark, FaDownload, FaEllipsisV, FaLock,
    FaStar, FaRegStar, FaHome, FaHistory, FaCog, FaShare, FaSearch,
    FaInfoCircle
} from 'react-icons/fa';
import { BiRefresh, BiX, BiDotsVerticalRounded } from 'react-icons/bi';
import { MdClose, MdRefresh, MdMoreVert, MdLock, MdSearch } from 'react-icons/md';

export default function BrowserWindowMobile({
                                                browserState,
                                                browserActions,
                                                renderTabContent,
                                                onScrollProgressChange // ✅ NEW: Add callback to update global scroll
                                            }) {
    const {
        tabs,
        activeTabId,
        activeTab,
        isLoading,
        urlInput,
        isUrlEditing,
        showMenu,
        downloads,
        isBookmarked,
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
        handleUrlSubmit,
        setUrlInput,
        setIsUrlEditing,
        toggleBookmark,
        handleDownload,
        openDownloadsTab,
    } = browserActions;

    const menuRef = useRef(null);
    const contentRef = useRef(null); // ✅ NEW: Ref for scrollable content
    const [showTabSwitcher, setShowTabSwitcher] = useState(false);

    const handleClickOutside = useCallback((event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    }, [setShowMenu]);

    // ✅ NEW: Handle browser scroll and sync with global scroll
    const handleBrowserScroll = useCallback((e) => {
        if (!contentRef.current || !onScrollProgressChange) return;

        const scrollTop = contentRef.current.scrollTop;
        const scrollHeight = contentRef.current.scrollHeight;
        const clientHeight = contentRef.current.clientHeight;

        // Calculate scroll progress (0 to 1)
        const maxScroll = scrollHeight - clientHeight;
        const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        // Map browser scroll to global scroll range
        // Adjust these values based on where your browser appears in the portfolio
        const browserScrollStart = 0.36;
        const browserScrollEnd = 0.51;
        const globalProgress = browserScrollStart + (scrollProgress * (browserScrollEnd - browserScrollStart));

        onScrollProgressChange(globalProgress);
    }, [onScrollProgressChange]);

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showMenu, handleClickOutside]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#08141b] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            aria-label="Chrome Mobile Browser"
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            {/* Chrome Top Bar - Themed */}
            <header className="bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6] border-b border-cyan-500/20 px-2 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.1)] relative z-30">
                {/* Security Icon */}
                <div className="flex-shrink-0 text-cyan-400">
                    <MdLock size={18} />
                </div>

                {/* Address Bar / Search Box */}
                <div className="flex-1 relative">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUrlSubmit(e);
                        }}
                        className="relative"
                    >
                        <input
                            type="text"
                            value={isUrlEditing ? urlInput : activeTab?.url || ''}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onFocus={() => setIsUrlEditing(true)}
                            onBlur={() => setIsUrlEditing(false)}
                            className="w-full bg-cyan-500/10 rounded-full py-2 pl-3 pr-8 text-sm text-cyan-100 placeholder-cyan-400/50 outline-none focus:bg-cyan-500/20 focus:ring-2 focus:ring-cyan-500 transition-all border border-cyan-500/20"
                            placeholder="Search or type web address"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                        />
                        {isUrlEditing && urlInput.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setUrlInput('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                                aria-label="Clear"
                            >
                                <MdClose size={20} />
                            </button>
                        )}
                    </form>
                </div>

                {/* Refresh/Stop Button */}
                <button
                    onClick={refresh}
                    className="flex-shrink-0 text-cyan-400 hover:text-cyan-300 p-1"
                    aria-label={isLoading ? "Stop loading" : "Refresh page"}
                    type="button"
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    ) : (
                        <MdRefresh size={24} />
                    )}
                </button>

                {/* Tab Count Button */}
                <button
                    onClick={() => setShowTabSwitcher(!showTabSwitcher)}
                    className="flex-shrink-0 relative w-7 h-7 border border-cyan-500/40 rounded flex items-center justify-center text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20"
                    aria-label={`${tabs.length} tab${tabs.length !== 1 ? 's' : ''} open`}
                    type="button"
                >
                    {tabs.length}
                </button>

                {/* Menu Button */}
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex-shrink-0 text-cyan-400 hover:text-cyan-300 p-1"
                    aria-haspopup="true"
                    aria-expanded={showMenu}
                    aria-label="More options"
                    type="button"
                >
                    <MdMoreVert size={24} />
                </button>
            </header>

            {/* Loading Progress Bar - Themed */}
            <div className="relative h-[3px] bg-transparent">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: isLoading ? '100%' : 0 }}
                    transition={{ duration: isLoading ? 2 : 0.3, ease: 'easeInOut' }}
                />
            </div>

            {/* Main Content Area - ✅ ADD SCROLL HANDLER */}
            <main
                ref={contentRef}
                onScroll={handleBrowserScroll}
                className="flex-1 bg-[#08141b] overflow-auto relative"
            >
                {renderTabContent(activeTab?.content || 'profile', activeTab?.url)}
            </main>

            {/* Tab Switcher Overlay - Themed */}
            <AnimatePresence>
                {showTabSwitcher && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#08141b] z-40 flex flex-col"
                        onClick={() => setShowTabSwitcher(false)}
                    >
                        {/* Tab Switcher Header */}
                        <div className="bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6] px-4 py-3 flex items-center justify-between border-b border-cyan-500/20">
                            <div className="text-cyan-300 text-sm font-medium">{tabs.length} tab{tabs.length !== 1 ? 's' : ''}</div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        createNewTab();
                                        setShowTabSwitcher(false);
                                    }}
                                    className="text-cyan-400 hover:text-cyan-300"
                                    aria-label="New tab"
                                    type="button"
                                >
                                    <FaPlus size={20} />
                                </button>
                                <button
                                    onClick={() => setShowTabSwitcher(false)}
                                    className="text-cyan-400 hover:text-cyan-300"
                                    aria-label="Close tab switcher"
                                    type="button"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs Grid */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence>
                                {tabs.map((tab) => (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className={`relative bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-lg overflow-hidden shadow-lg border border-cyan-500/20 ${
                                            activeTabId === tab.id ? 'ring-2 ring-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]' : ''
                                        }`}
                                    >
                                        <button
                                            onClick={() => {
                                                setActiveTabId(tab.id);
                                                setShowTabSwitcher(false);
                                            }}
                                            className="w-full text-left"
                                            type="button"
                                        >
                                            {/* Tab Preview */}
                                            <div className="h-48 bg-[#08141b]/50 flex items-center justify-center text-cyan-400/50">
                                                <div className="text-center">
                                                    <MdSearch size={48} className="mx-auto mb-2 opacity-50" />
                                                    <p className="text-sm">{tab.title}</p>
                                                </div>
                                            </div>
                                            {/* Tab Title Bar */}
                                            <div className="px-3 py-2 bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6] border-t border-cyan-500/20 flex items-center justify-between">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <MdLock size={14} className="text-cyan-400 flex-shrink-0" />
                                                    <span className="text-sm text-cyan-200 truncate">{tab.title}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        closeTab(tab.id, e);
                                                    }}
                                                    className="text-cyan-400 hover:text-cyan-300 p-1"
                                                    aria-label={`Close ${tab.title}`}
                                                    type="button"
                                                >
                                                    <MdClose size={20} />
                                                </button>
                                            </div>
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chrome Menu Dropdown - Themed */}
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-14 right-2 w-64 bg-gradient-to-br from-cyan-500/10 to-[#08141b] rounded-lg shadow-2xl border border-cyan-500/30 overflow-hidden z-50 backdrop-blur-lg"
                        onClick={(e) => e.stopPropagation()}
                        role="menu"
                    >
                        {/* Menu Items */}
                        <div className="py-2">
                            <button
                                onClick={() => {
                                    createNewTab();
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaPlus size={18} className="text-cyan-400" />
                                <span>New tab</span>
                            </button>

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaRegStar size={18} className="text-cyan-400" />
                                <span>New incognito tab</span>
                            </button>

                            <div className="h-px bg-cyan-500/20 my-1" />

                            <button
                                onClick={() => {
                                    toggleBookmark();
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                {isBookmarked ? (
                                    <>
                                        <FaStar size={18} className="text-cyan-400" />
                                        <span>Bookmark added</span>
                                    </>
                                ) : (
                                    <>
                                        <FaRegStar size={18} className="text-cyan-400" />
                                        <span>Add to bookmarks</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    openDownloadsTab();
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaDownload size={18} className="text-cyan-400" />
                                <span>Downloads</span>
                            </button>

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaHistory size={18} className="text-cyan-400" />
                                <span>History</span>
                            </button>

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaShare size={18} className="text-cyan-400" />
                                <span>Share...</span>
                            </button>

                            <div className="h-px bg-cyan-500/20 my-1" />

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <MdSearch size={18} className="text-cyan-400" />
                                <span>Find in page</span>
                            </button>

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaCog size={18} className="text-cyan-400" />
                                <span>Settings</span>
                            </button>

                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 hover:bg-cyan-500/20 text-left flex items-center gap-3 text-cyan-100"
                                role="menuitem"
                                type="button"
                            >
                                <FaInfoCircle size={18} className="text-cyan-400" />
                                <span>Help & feedback</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
