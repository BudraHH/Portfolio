import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    FaTimes, FaMinus, FaRegWindowMaximize, FaFirefoxBrowser,
    FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt,
    FaExternalLinkAlt, FaStar, FaLock, FaEllipsisV, FaHome,
    FaDownload, FaPlus, FaRegStar, FaHistory, FaCog, FaBookmark
} from "react-icons/fa";
import { BiLeftArrow, BiRightArrow, BiRefresh } from "react-icons/bi";

import PortfolioAbout from "../components/PortfolioAbout.jsx";
import BrowserWindowPc from "../components/BrowserWindowPc.jsx";
import BrowserWindowMobile from "../components/BrowserWindowMobile.jsx";
import NewTabPc from "../components/NewTabPc.jsx";
import NewTabMobile from "../components/NewTabMobile.jsx";
import DownloadsTab from "../components/DownloadsTab.jsx";

export default function Info({ onClose, scrollProgress, sectionScrollRange }) {
    // State variables
    const [tabs, setTabs] = useState([
        {
            id: 1,
            title: "Budra Portfolio ",
            url: "https://portfoliobudra.com/info",
            content: "profile",
            history: ["https://portfoliobudra.com/info"],
            historyIndex: 0
        }
    ]);
    const [activeTabId, setActiveTabId] = useState(1);
    const [nextTabId, setNextTabId] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarks, setBookmarks] = useState([
        { title: "Portfolio", url: "https://portfoliobudra.com/info" }
    ]);
    const [showMenu, setShowMenu] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [downloads, setDownloads] = useState([]);
    const [urlInput, setUrlInput] = useState("");
    const [isUrlEditing, setIsUrlEditing] = useState(false);

    const iframeRef = useRef(null);
    const navigationTimeoutRef = useRef(null);

    // Responsive width state
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768;

    // Memoized active tab lookup
    const activeTab = useMemo(() => tabs.find(tab => tab.id === activeTabId), [tabs, activeTabId]);

    // Update urlInput when activeTab changes
    useEffect(() => {
        if (activeTab && !isUrlEditing && urlInput !== activeTab.url) {
            setUrlInput(activeTab.url);
        }
    }, [activeTab, isUrlEditing, urlInput]);

    // Helper functions
    const isInternalUrl = useCallback((url) =>
        url.includes('https://portfoliobudra.com/info') || url.includes('about:'), []);

    const getInternalContent = useCallback((url) => {
        if (url.includes('/info')) return 'profile';
        if (url.includes('newtab')) return 'newtab';
        if (url.includes('github')) return 'github';
        if (url.includes('linkedin')) return 'linkedin';
        return 'newtab';
    }, []);

    // Navigate function
    const navigateToUrl = useCallback((newUrl, tabId = activeTabId) => {
        if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
        setIsLoading(true);

        navigationTimeoutRef.current = setTimeout(() => {
            setTabs(prevTabs => prevTabs.map(tab => {
                if (tab.id === tabId) {
                    if (tab.url === newUrl) {
                        setIsLoading(false);
                        return tab;
                    }
                    const newHistory = [...tab.history.slice(0, tab.historyIndex + 1), newUrl];
                    return {
                        ...tab,
                        url: newUrl,
                        title: (() => {
                            try { return new URL(newUrl).hostname || "New Tab"; } catch { return "New Tab"; }
                        })(),
                        content: isInternalUrl(newUrl) ? getInternalContent(newUrl) : "iframe",
                        history: newHistory,
                        historyIndex: newHistory.length - 1
                    };
                }
                return tab;
            }));
            setIsLoading(false);
        }, 250);
    }, [activeTabId, getInternalContent, isInternalUrl]);

    // Navigation controls
    const goBack = useCallback(() => {
        if (!activeTab || activeTab.historyIndex <= 0) return;

        setTabs(prevTabs => prevTabs.map(tab => {
            if (tab.id === activeTabId) {
                const newIndex = tab.historyIndex - 1;
                const newUrl = tab.history[newIndex];
                return {
                    ...tab,
                    url: newUrl,
                    historyIndex: newIndex,
                    content: isInternalUrl(newUrl) ? getInternalContent(newUrl) : "iframe"
                };
            }
            return tab;
        }));
    }, [activeTab, activeTabId, getInternalContent, isInternalUrl]);

    const goForward = useCallback(() => {
        if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;

        setTabs(prevTabs => prevTabs.map(tab => {
            if (tab.id === activeTabId) {
                const newIndex = tab.historyIndex + 1;
                const newUrl = tab.history[newIndex];
                return {
                    ...tab,
                    url: newUrl,
                    historyIndex: newIndex,
                    content: isInternalUrl(newUrl) ? getInternalContent(newUrl) : "iframe"
                };
            }
            return tab;
        }));
    }, [activeTab, activeTabId, getInternalContent, isInternalUrl]);

    const refresh = useCallback(() => {
        if (!iframeRef.current) return;
        setIsLoading(true);
        iframeRef.current.src = iframeRef.current.src;
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const goHome = useCallback(() => {
        navigateToUrl("https://portfoliobudra.com/info");
    }, [navigateToUrl]);

    // URL submit handler
    const handleUrlSubmit = useCallback((e) => {
        e.preventDefault();
        let finalUrl = urlInput.trim();

        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            if (finalUrl.includes('.') || finalUrl.includes('portfoliobudra.com')) {
                finalUrl = 'https://' + finalUrl;
            } else {
                finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
            }
        }

        navigateToUrl(finalUrl);
        setIsUrlEditing(false);
    }, [navigateToUrl, urlInput]);

    // Bookmark toggle
    const toggleBookmark = useCallback(() => {
        if (!activeTab) return;
        const isBookmarked = bookmarks.some(b => b.url === activeTab.url);
        setBookmarks(prev =>
            isBookmarked ? prev.filter(b => b.url !== activeTab.url) : [...prev, { title: activeTab.title, url: activeTab.url }]
        );
    }, [activeTab, bookmarks]);

    const isBookmarked = useMemo(() => activeTab ? bookmarks.some(b => b.url === activeTab.url) : false, [activeTab, bookmarks]);

    // Download handler
    const handleDownload = useCallback(() => {
        if (!activeTab) return;

        const download = {
            id: Date.now(),
            name: `${activeTab.title || 'download'}.pdf`,
            url: activeTab.url,
            timestamp: new Date().toLocaleTimeString()
        };

        setDownloads(prev => [download, ...prev]);
        alert(`Download started: ${download.name}`);
    }, [activeTab]);

    // Tab management
    const createNewTab = useCallback(() => {
        const newTab = {
            id: nextTabId,
            title: "New Tab",
            url: "about:newtab",
            content: "newtab",
            history: ["about:newtab"],
            historyIndex: 0
        };
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(nextTabId);
        setNextTabId(prev => prev + 1);
    }, [nextTabId]);

    const openDownloadsTab = useCallback(() => {
        const newTab = {
            id: nextTabId,
            title: "Downloads",
            url: "about:downloads",
            content: "downloads",
            history: ["about:downloads"],
            historyIndex: 0,
            favicon: "https://cdn-icons-png.flaticon.com/512/724/724933.png"
        };
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(nextTabId);
        setNextTabId(prev => prev + 1);
        setShowMenu(false);
    }, [nextTabId]);

    const closeTab = useCallback((tabId, e) => {
        e.stopPropagation();
        if (tabs.length === 1) {
            onClose();
            return;
        }
        setTabs(prevTabs => {
            const newTabs = prevTabs.filter(tab => tab.id !== tabId);
            if (activeTabId === tabId && newTabs.length > 0) {
                setActiveTabId(newTabs[newTabs.length - 1].id);
            }
            return newTabs;
        });
    }, [activeTabId, onClose, tabs.length]);

    // Tab content renderer with mobile/desktop split
    const renderTabContent = useCallback((content, url) => {
        switch(content) {
            case "iframe":
                return (
                    <iframe
                        ref={iframeRef}
                        src={url}
                        className="w-full h-full border-0"
                        title="Browser Content"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                    />
                );
            case "downloads":
                return <DownloadsTab downloadsData={{ downloads }} />;
            case "newtab":
                // Render different NewTab based on device
                return isMobile ? (
                    <NewTabMobile newTabData={{ bookmarks }} newTabActions={{ navigateToUrl }} />
                ) : (
                    <NewTabPc newTabData={{ bookmarks }} newTabActions={{ navigateToUrl }} />
                );
            case "profile":
            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mx-auto"
                    >
                        <PortfolioAbout />
                    </motion.div>
                );
        }
    }, [bookmarks, downloads, navigateToUrl, isMobile]);

    // Common props
    const browserProps = {
        scrollProgress,
        sectionScrollRange,
        browserState: {
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
        },
        browserActions: {
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
            openDownloadsTab,
        },
        renderTabContent
    };

    return (
        <div className="">
            {isMobile ? (
                <BrowserWindowMobile {...browserProps} />
            ) : (
                <BrowserWindowPc {...browserProps} />
            )}
        </div>
    );
}
