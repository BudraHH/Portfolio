import React, { useState } from 'react';
import { FaTimes, FaMinus, FaRegWindowMaximize, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from './Sidebar.jsx';
import MainArea from './MainArea.jsx';

const HelpCenter = ({ onClose, onMinimize, onMaximize, isMaximized }) => {
    const [activeCategory, setActiveCategory] = useState('welcome');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full h-full flex flex-col bg-[#050a0f] rounded-lg overflow-hidden border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="window-drag-handle h-12 bg-[#0a1520] border-b border-cyan-500/20 flex items-center px-4 justify-between shrink-0 select-none">

                {/* Window Controls */}
                <div className="flex items-center gap-2 mr-4 no-drag">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose && onClose(); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 shadow-[0_0_8px_rgba(255,0,0,0.6)] transition-colors flex items-center justify-center group"
                    >
                        <FaTimes className="text-[6px] text-red-900 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize && onMinimize(); }}
                        className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 shadow-[0_0_8px_rgba(255,255,0,0.6)] transition-colors flex items-center justify-center group"
                    >
                        <FaMinus className="text-[6px] text-yellow-900 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize && onMaximize(); }}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 shadow-[0_0_8px_rgba(0,255,0,0.6)] transition-colors flex items-center justify-center group"
                    >
                        <FaRegWindowMaximize className="text-[6px] text-green-900 opacity-0 group-hover:opacity-100" />
                    </button>
                </div>

                {/* Title & Search */}
                <div className="flex-1 flex items-center justify-center max-w-lg mx-4 gap-4">
                    <div className="flex items-center gap-2 text-cyan-400/80">
                        <FaQuestionCircle />
                        <span className="font-bold tracking-wide text-sm hidden sm:block">Help Center</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xs h-8 bg-[#050a0f] border border-cyan-500/20 rounded-md flex items-center px-3 hover:border-cyan-500/40 transition-colors focus-within:border-cyan-500/60 focus-within:shadow-[0_0_10px_rgba(6,182,212,0.1)] no-drag">
                        <FaSearch className="text-xs text-cyan-500/50" />
                        <input
                            type="text"
                            placeholder="Search help topics..."
                            className="bg-transparent border-none outline-none text-xs text-cyan-100 ml-2 w-full placeholder-cyan-500/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Spacer for balance */}
                <div className="w-16" />
            </div>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
                <MainArea activeCategory={activeCategory} />
            </div>
        </div>
    );
};

export default HelpCenter;
