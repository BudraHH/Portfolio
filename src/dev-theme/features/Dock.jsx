import React, { useState } from 'react';
import { FaFirefox, FaFolder, FaTerminal, FaQuestionCircle, FaQuestion } from 'react-icons/fa';
import { SiThunderbird } from 'react-icons/si';
import { GiHelp } from "react-icons/gi";
import { FaFileCircleQuestion } from "react-icons/fa6";

const Dock = ({ items, activeTabs = [], onItemClick }) => {
    // Removed local activeIndex state as we now derive active state from activeTabs prop

    const dockDefaultItems = items || [];

    const handleClick = (item) => {
        // Call the parent's onItemClick to update activeTabs
        if (onItemClick) {
            onItemClick(item);
        }

        // Keep the scroll behavior
        const element = document.querySelector(item.href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black/90 backdrop-blur-lg border border-cyan-500/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-3 py-2">
                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-cyan-900">
                    {dockDefaultItems.map((item, index) => {
                        const Icon = item.icon;
                        // Check if this app is currently open (in activeTabs)
                        const isActive = activeTabs.some(tab => tab.label === item.label);

                        return (
                            <button
                                key={index}
                                onClick={() => handleClick(item)}
                                className={`relative group flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-200 ${isActive ? 'bg-cyan-500/20' : 'hover:bg-cyan-500/10'
                                    }`}
                                title={item.label}
                            >
                                <Icon className={`w-7 h-7 transition-colors duration-200 ${item.color}`} />

                                {isActive && (
                                    <>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.8)]"></div>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-cyan-400 rounded-r-full"></div>
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dock;
