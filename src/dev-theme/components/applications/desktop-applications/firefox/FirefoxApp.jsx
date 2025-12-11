import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    FaTimes, FaMinus, FaRegWindowMaximize, FaFirefoxBrowser,
    FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt,
    FaExternalLinkAlt, FaStar, FaLock, FaEllipsisV, FaHome,
    FaDownload, FaPlus, FaRegStar, FaHistory, FaCog, FaBookmark
} from "react-icons/fa";
import { BiLeftArrow, BiRightArrow, BiRefresh } from "react-icons/bi";

import BrowserWindowPc from "./FireFoxBrowser.jsx";
import NewTabPc from "./NewTab.jsx";
import DownloadsTab from "./DownloadsTab.jsx";
import ResumeTab from "./ResumeTab.jsx";
import Info from "../../../../sections/Info.jsx";
import Projects from "../../../../sections/projects/Projects.jsx";
import ProjectDetail from "../../../../sections/projects/ProjectDetail.jsx";

export default function FirefoxApp({ onClose, onMinimize, onMaximize, isMaximized, scrollProgress, sectionScrollRange, pid, launchParams }) {
    // Helper to resolve title from URL synchronously
    const resolveTitle = (url) => {
        if (!url) return "New Tab";
        if (url === 'https://portfolio.com/projects') return "Projects";
        if (url === 'https://portfolio.com/info') return "Info";

        // Fallbacks
        if (url.includes('projects')) return "Projects";
        if (url.includes('info')) return "Info";
        if (url.includes('resume')) return "Resume";
        try { return new URL(url).hostname || "New Tab"; } catch { return "New Tab"; }
    };

    // State variables
    const [tabs, setTabs] = useState(() => {
        // If launchParams exists on mount, start with that tab instead of New Tab
        if (launchParams && (launchParams.url || launchParams.newTab?.url)) {
            const url = launchParams.newTab?.url || launchParams.url;
            // Determine content type immediately if possible for better UX
            let initialContent = "iframe";
            if (url.includes('portfolio.com') || url.includes('about:') || url.includes('/public/')) {
                // Inline logic or simplified check since helper functions aren't hoisted to here yet inside component
                if (url.includes('/info')) initialContent = 'profile';
                else if (url.includes('/projects')) initialContent = 'projects';
                else if (url.includes('resume')) initialContent = 'resume';
                else if (url.includes('newtab')) initialContent = 'newtab';
            }

            return [{
                id: 1,
                title: launchParams.newTab?.title || resolveTitle(url),
                url: url,
                content: initialContent,
                history: [url],
                historyIndex: 0
            }];
        }
        return [{
            id: 1,
            title: "New Tab",
            url: "",
            content: "newtab",
            history: [""],
            historyIndex: 0
        }];
    });
    const [activeTabId, setActiveTabId] = useState(1);
    const [nextTabId, setNextTabId] = useState(2);
    const [isLoading, setIsLoading] = useState(false); // Default to false for new tab
    const [bookmarks, setBookmarks] = useState([
        { title: "Info Me", url: "https://portfolio.com/info" },
        { title: "Projects", url: "https://portfolio.com/projects" },
        { title: "Resume", url: "/public/budra-resume" }
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
    const isInternalUrl = useCallback((url) => {
        return url.includes('portfolio.com') ||
            url.includes('about:') ||
            url.includes('/public/budra-resume') ||
            url.includes('portfolio/'); // Keep support for terminal legacy
    }, []);

    const getInternalContent = useCallback((url) => {
        if (url.includes('/about') || url.includes('/info')) return 'profile';
        if (url.includes('/projects/')) return 'project-detail';
        if (url.includes('/projects') || url.includes('portfolio/projects')) return 'projects';
        if (url.includes('budra-resume')) return 'resume';
        if (url.includes('newtab')) return 'newtab';
        if (url.includes('downloads')) return 'downloads';
        return 'newtab';
    }, []);

    const isBookmarked = useCallback((url) => bookmarks.some(b => b.url === url), [bookmarks]);

    // Tab management functions
    const createNewTab = useCallback((url = "about:newtab", title = "New Tab", content = "newtab") => {
        const newTabId = nextTabId;
        const newTab = {
            id: newTabId,
            title: title === "New Tab" ? resolveTitle(url) : title,
            url: url,
            content: content,
            history: [url],
            historyIndex: 0
        };
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTabId);
        setNextTabId(prev => prev + 1);
    }, [nextTabId]);

    const closeTab = useCallback((idToClose) => {
        setTabs(prevTabs => {
            const filteredTabs = prevTabs.filter(tab => tab.id !== idToClose);
            if (filteredTabs.length === 0) {
                onClose(); // Close the browser if no tabs left
                return [];
            }
            if (activeTabId === idToClose) {
                const indexToClose = prevTabs.findIndex(tab => tab.id === idToClose);
                const newActiveTab = filteredTabs[Math.max(0, indexToClose - 1)] || filteredTabs[0];
                setActiveTabId(newActiveTab.id);
            }
            return filteredTabs;
        });
    }, [activeTabId, onClose]);

    // Navigation functions
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

                    // Determine content type based on improved logic
                    let contentType = "iframe";
                    if (isInternalUrl(newUrl)) {
                        contentType = getInternalContent(newUrl);
                    } else if (newUrl === "about:newtab") {
                        contentType = "newtab";
                    }

                    return {
                        ...tab,
                        url: newUrl,
                        title: resolveTitle(newUrl),
                        content: contentType,
                        history: newHistory,
                        historyIndex: newHistory.length - 1
                    };
                }
                return tab;
            }));
            setIsLoading(false);
        }, 250);
    }, [activeTabId, getInternalContent, isInternalUrl]);

    const goBack = useCallback(() => {
        setTabs(prevTabs => prevTabs.map(tab => {
            if (tab.id === activeTabId && tab.historyIndex > 0) {
                const newIndex = tab.historyIndex - 1;
                const newUrl = tab.history[newIndex];
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setTabs(currentTabs => currentTabs.map(t => t.id === activeTabId ? {
                        ...t,
                        url: newUrl,
                        content: isInternalUrl(newUrl) ? getInternalContent(newUrl) : "iframe",
                        historyIndex: newIndex
                    } : t));
                }, 250);
                return { ...tab, historyIndex: newIndex }; // Optimistic update for UI
            }
            return tab;
        }));
    }, [activeTabId, isInternalUrl, getInternalContent]);

    const goForward = useCallback(() => {
        setTabs(prevTabs => prevTabs.map(tab => {
            if (tab.id === activeTabId && tab.historyIndex < tab.history.length - 1) {
                const newIndex = tab.historyIndex + 1;
                const newUrl = tab.history[newIndex];
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setTabs(currentTabs => currentTabs.map(t => t.id === activeTabId ? {
                        ...t,
                        url: newUrl,
                        content: isInternalUrl(newUrl) ? getInternalContent(newUrl) : "iframe",
                        historyIndex: newIndex
                    } : t));
                }, 250);
                return { ...tab, historyIndex: newIndex }; // Optimistic update for UI
            }
            return tab;
        }));
    }, [activeTabId, isInternalUrl, getInternalContent]);

    const refresh = useCallback(() => {
        if (activeTab) {
            setIsLoading(true);
            // Simulate refresh by re-navigating to the current URL
            navigateToUrl(activeTab.url);
        }
    }, [activeTab, navigateToUrl]);

    const goHome = useCallback(() => {
        navigateToUrl("about:newtab");
    }, [navigateToUrl]);

    // URL submit handler
    const handleUrlSubmit = useCallback((e) => {
        e.preventDefault();
        let finalUrl = urlInput.trim();

        // Handle shorthand for our internal portfolio domains
        if (finalUrl === 'about' || finalUrl === 'portfolio') finalUrl = 'https://portfolio.com/info';
        if (finalUrl === 'projects') finalUrl = 'https://portfolio.com/projects';
        if (finalUrl === 'resume') finalUrl = '/public/budra-resume';

        if (!finalUrl.startsWith('http') && !finalUrl.startsWith('about:') && !finalUrl.startsWith('/')) {
            if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
                finalUrl = 'https://' + finalUrl;
            } else {
                finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
            }
        }

        navigateToUrl(finalUrl);
        setIsUrlEditing(false);
    }, [navigateToUrl, urlInput]);

    // Bookmark functions
    const toggleBookmark = useCallback(() => {
        if (!activeTab) return;
        setBookmarks(prevBookmarks => {
            if (isBookmarked(activeTab.url)) {
                return prevBookmarks.filter(b => b.url !== activeTab.url);
            } else {
                return [...prevBookmarks, { title: activeTab.title, url: activeTab.url }];
            }
        });
    }, [activeTab, isBookmarked]);

    // Download functions
    const handleDownload = useCallback((fileName, fileUrl) => {
        const newDownload = {
            id: Date.now(),
            name: fileName,
            url: fileUrl,
            status: 'downloading',
            progress: 0
        };
        setDownloads(prev => [...prev, newDownload]);

        // Simulate download progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress > 100) {
                clearInterval(interval);
                setDownloads(prev => prev.map(d => d.id === newDownload.id ? { ...d, status: 'completed', progress: 100 } : d));
            } else {
                setDownloads(prev => prev.map(d => d.id === newDownload.id ? { ...d, progress: progress } : d));
            }
        }, 200);
    }, []);

    const openDownloadsTab = useCallback(() => {
        const downloadsTab = tabs.find(tab => tab.content === 'downloads');
        if (downloadsTab) {
            setActiveTabId(downloadsTab.id);
        } else {
            createNewTab("about:downloads", "Downloads", "downloads");
        }
    }, [tabs, createNewTab]);

    const handleProjectNavigate = useCallback((repoNameOrUrl) => {
        // If it's a full URL, navigate directly
        if (repoNameOrUrl.startsWith('http')) {
            navigateToUrl(repoNameOrUrl);
        } else {
            // Otherwise treat it as a repo name
            const targetUrl = `https://portfolio.com/projects/${repoNameOrUrl}`;
            navigateToUrl(targetUrl);
        }
    }, [navigateToUrl]);

    // Tab content renderer with mobile/desktop split
    const renderTabContent = useCallback((content, url) => {
        switch (content) {
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
            case "resume":
                return <ResumeTab pdfUrl={url} />;
            case "newtab":
                // Using NewTabPc for both mobile and desktop to treat undefined NewTabMobile issue
                return (
                    <NewTabPc newTabData={{ bookmarks }} newTabActions={{ navigateToUrl }} />
                );
            case "projects":
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full h-full overflow-y-auto"
                    >
                        <Projects onNavigate={handleProjectNavigate} />
                    </motion.div>
                );
            case "project-detail":
                // Extract repo name from URL
                const repoName = url.split('/').pop();
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full h-full overflow-y-auto"
                    >
                        <ProjectDetail repoName={repoName} />
                    </motion.div>
                );
            case "profile":
            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mx-auto"
                    >
                        <Info onNavigate={handleProjectNavigate} />
                    </motion.div>
                );
        }
    }, [bookmarks, downloads, navigateToUrl, isMobile, handleProjectNavigate]);

    // Handle launch parameters (e.g., opening a file from desktop)
    const lastProcessedLaunchRef = useRef(0);

    // Handle launch parameters (e.g., opening a file from desktop)
    useEffect(() => {
        if (launchParams) {
            const url = launchParams.newTab?.url || launchParams.url;
            const title = launchParams.newTab?.title;
            const content = launchParams.newTab?.content;

            if (url) {
                // Check if the requested URL is already the active tab or the ONLY tab (initial load)
                const lastTab = tabs[tabs.length - 1];
                const isInitialLoad = tabs.length === 1 && tabs[0].url === url;

                if (!isInitialLoad && lastTab.url !== url) {
                    const newTabId = Date.now();
                    const newTab = {
                        id: newTabId,
                        title: title || resolveTitle(url),
                        url: url,
                        content: content || (isInternalUrl(url) ? getInternalContent(url) : "iframe"),
                        history: [url],
                        historyIndex: 0
                    };

                    setTabs(prev => [...prev, newTab]);
                    setActiveTabId(newTabId);
                } else if (isInitialLoad) {
                    // Start up correction: ensure content type and title are correct
                    // If we initialized blindly or with 'Loading...', fix it now
                    const realContent = content || (isInternalUrl(url) ? getInternalContent(url) : "iframe");
                    const realTitle = title || resolveTitle(url);

                    if (tabs[0].content !== realContent || tabs[0].title === 'Loading...' || tabs[0].title !== realTitle) {
                        setTabs(prev => [{
                            ...prev[0],
                            content: realContent,
                            title: realTitle
                        }]);
                    }
                } else {
                    setActiveTabId(lastTab.id);
                }
            }
        }
    }, [launchParams, isInternalUrl, getInternalContent]);

    // Common props
    const browserProps = {
        scrollProgress,
        sectionScrollRange,
        pid,
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
            onMinimize,
            onMaximize,
            isMaximized,
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
            setIsLoading,
            setUrlInput,
            setIsUrlEditing,
            toggleBookmark,
            handleDownload,
            openDownloadsTab,
        },
        renderTabContent
    };

    return (
        <BrowserWindowPc {...browserProps} />
    );
}
