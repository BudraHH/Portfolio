import React, { useState } from 'react';
import {
    FaArrowLeft, FaArrowRight, FaSearch, FaList, FaThLarge,
    FaTimes, FaMinus, FaRegWindowMaximize, FaBars
} from 'react-icons/fa';
import Sidebar from './Sidebar.jsx';
import MainArea from './MainArea.jsx';

import { fileSystem } from '../../../../lib/fileSystem.js';

const FilesExplorer = ({ onClose, onMinimize, onMaximize, isMaximized, onOpenApp }) => {
    const [history, setHistory] = useState(['/home/dev']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const currentPath = history[currentIndex];



    const navigateTo = (path) => {
        if (path === currentPath) return;

        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleNavigate = (path) => {
        navigateTo(path);
    };

    const handleFileDoubleClick = (file) => {
        if (file.type === 'folder') {
            const newPath = currentPath === '/' ? `/${file.name}` : `${currentPath}/${file.name}`;
            navigateTo(newPath);
            return;
        }

        if (file.name === 'Resume.pdf' && onOpenApp) {
            onOpenApp('Firefox', {
                newTab: {
                    url: '/resume.pdf',
                    title: 'Resume',
                    content: 'resume'
                },
                timestamp: Date.now()
            });
        }
    };

    // Get files for current path, fallback to empty array
    // SORTING LOGIC: Sort alphabetically by name, case-insensitive
    const currentFiles = (fileSystem[currentPath] || []).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );

    return (
        <div className="w-full h-full flex flex-col bg-[#050a0f] rounded-lg overflow-hidden border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Header / Chrome */}
            <div className="window-drag-handle h-12 bg-gradient-to-r from-[#0a1520] to-[#0f1c29] border-b border-cyan-500/20 flex items-center px-4 justify-between shrink-0 select-none">

                {/* Window Controls (Traffic Lights) */}
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

                {/* Navigation & Path */}
                <div className="flex-1 flex items-center gap-4 max-w-2xl no-drag">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleBack}
                            disabled={currentIndex === 0}
                            className="p-1.5 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FaArrowLeft className="text-xs" />
                        </button>
                        <button
                            onClick={handleForward}
                            disabled={currentIndex === history.length - 1}
                            className="p-1.5 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FaArrowRight className="text-xs" />
                        </button>
                    </div>

                    {/* Path Bar */}
                    <div className="flex-1 h-8 bg-[#050a0f] border border-cyan-500/20 rounded flex items-center px-3 hover:border-cyan-500/40 transition-colors">
                        <span className="text-xs text-cyan-200/80 font-mono tracking-wide">{currentPath}</span>
                    </div>

                    {/* Search */}
                    <div className="w-48 h-8 bg-[#050a0f] border border-cyan-500/20 rounded flex items-center px-3 hover:border-cyan-500/40 transition-colors group focus-within:border-cyan-500/60 focus-within:shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        <FaSearch className="text-xs text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-xs text-cyan-100 ml-2 w-full placeholder-cyan-500/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* View Options */}
                <div className="flex items-center gap-2 ml-4 no-drag">
                    <button className="p-1.5 rounded hover:bg-cyan-500/10 text-cyan-400 transition-colors">
                        <FaBars className="text-sm" />
                    </button>
                    <div className="h-4 w-px bg-cyan-500/20 mx-1" />
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-cyan-500/10 text-cyan-500'}`}
                    >
                        <FaList className="text-sm" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-cyan-500/10 text-cyan-500'}`}
                    >
                        <FaThLarge className="text-sm" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar activePath={currentPath} onNavigate={handleNavigate} />
                <MainArea
                    currentPath={currentPath}
                    files={currentFiles}
                    viewMode={viewMode}
                    onFileDoubleClick={handleFileDoubleClick}
                />
            </div>
        </div>
    );
};

export default FilesExplorer;
