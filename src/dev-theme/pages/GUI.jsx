import React, { useState } from 'react';
import Dock from "../features/Dock.jsx";
import Desktop from "../features/Desktop.jsx";
import { FaTerminal, FaFirefox, FaFolder, FaQuestionCircle, FaUserAstronaut, FaCogs } from 'react-icons/fa';
import { SiThunderbird } from 'react-icons/si';
import { FaFileCircleQuestion } from "react-icons/fa6";

export default function GUI() {
    // Define available apps here to be shared between Dock and other functionality
    const availableApps = [
        { icon: FaUserAstronaut, label: 'Info', href: '#about', color: 'text-purple-400' },
        { icon: FaFirefox, label: 'Firefox', href: '#home', color: 'text-orange-500' },
        { icon: SiThunderbird, label: 'Thunderbird', href: '#contact', color: 'text-blue-500' },
        { icon: FaFolder, label: 'Files', href: '#files', color: 'text-yellow-400' },
        { icon: FaTerminal, label: 'Terminal', href: '#terminal', color: 'text-cyan-500' },
        { icon: FaFileCircleQuestion, label: 'Help', href: '#help', color: 'text-rose-400' },
        { icon: FaCogs, label: 'Installer', href: '#installer', color: 'text-gray-400' }, // Hidden/System app
        { icon: FaUserAstronaut, label: 'CareerJourney', href: '#career', color: 'text-emerald-400' }, // Career timeline app
    ];

    const [activeTabs, setActiveTabs] = useState([
        { id: 'init-terminal', icon: FaTerminal, label: 'Terminal', href: '#projects', color: 'text-cyan-500', isMinimized: false }
    ]);

    const handleToggleMinimize = (id, shouldMinimize) => {
        setActiveTabs(prev => prev.map(tab => {
            if (tab.id === id) {
                return { ...tab, isMinimized: typeof shouldMinimize === 'boolean' ? shouldMinimize : !tab.isMinimized };
            }
            return tab;
        }));
    };

    const handleDockItemClick = (item) => {
        // Check if item is already in activeTabs
        // For Dock interactions, we target the *last* instance if multiple exist (or just the first found)
        const existingTab = activeTabs.find(tab => tab.label === item.label);

        if (existingTab) {
            // If already open, toggle minimize state (or restore if minimized)
            if (existingTab.isMinimized) {
                handleToggleMinimize(existingTab.id, false);
            } else {
                handleToggleMinimize(existingTab.id, true);
            }
        } else {
            // Add new tab to activeTabs
            const newId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            setActiveTabs([...activeTabs, { ...item, id: newId, isMinimized: false }]);
        }
    };

    // Function to open an app by name, optionally with parameters (e.g., URL to open)
    const handleOpenApp = (appName, params = {}) => {
        const app = availableApps.find(a => a.label === appName);
        if (!app) {
            console.error(`App ${appName} not found`);
            return;
        }

        // Allow multiple instances for 'Installer', 'Terminal', and 'Firefox'
        const allowMultiple = ['Installer', 'Terminal', 'Firefox'].includes(appName);

        const existingTab = activeTabs.find(tab => tab.label === appName);

        if (existingTab && !allowMultiple) {
            // App is already open and doesn't allow multiples
            // WARN USER
            import('../components/system/SystemWarning.jsx').then(({ systemEvents }) => {
                systemEvents.emit({
                    type: 'warning',
                    message: `Instance of ${appName} is already running`
                });
            });

            // Restore if minimized
            if (existingTab.isMinimized) {
                handleToggleMinimize(existingTab.id, false);
            }
        } else {
            // Open new app with params
            const newId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            setActiveTabs([...activeTabs, { ...app, id: newId, launchParams: params, isMinimized: false }]);
        }
    };

    const handleRemoveTab = (id) => {
        setActiveTabs(prev => prev.filter(tab => tab.id !== id));
    };

    return (
        <div className="relative w-full h-screen overflow-hidden z-0">
            {/*<DesktopBackground />*/}
            <Desktop
                activeTabs={activeTabs}
                onRemoveTab={handleRemoveTab}
                onOpenApp={handleOpenApp}
                onToggleMinimize={handleToggleMinimize}
            />
            <div className="absolute bottom-0 z-[9999]">
                <Dock
                    items={availableApps}
                    activeTabs={activeTabs}
                    onItemClick={handleDockItemClick}
                />
            </div>
        </div>
    )
}
