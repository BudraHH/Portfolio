import React from 'react';
import { FaFolder, FaFileAlt, FaFileImage, FaFileCode, FaFilePdf } from 'react-icons/fa';

const FileIcon = ({ type }) => {
    switch (type) {
        case 'folder': return <FaFolder className="text-4xl text-cyan-600 group-hover:text-cyan-500 transition-colors" />;
        case 'image': return <FaFileImage className="text-4xl text-purple-400 group-hover:text-purple-300 transition-colors" />;
        case 'code': return <FaFileCode className="text-4xl text-yellow-400 group-hover:text-yellow-300 transition-colors" />;
        case 'pdf': return <FaFilePdf className="text-4xl text-red-400 group-hover:text-red-300 transition-colors" />;
        default: return <FaFileAlt className="text-4xl text-gray-400 group-hover:text-gray-300 transition-colors" />;
    }
};

const MainArea = ({ currentPath, files, onViewFile, viewMode, onFileDoubleClick }) => {
    // Generate some dummy content if empty? Or assume parent passes it. 
    // For now, let's just render what is passed.

    // Default dummy data if nothing passed (for testing visual)
    const displayFiles = files || [
        { name: 'Projects', type: 'folder', size: '4 items' },
        { name: 'Resume.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'profile_pic.png', type: 'image', size: '1.2 MB' },
        { name: 'main.py', type: 'code', size: '4 KB' },
        { name: 'notes.txt', type: 'text', size: '12 KB' },
    ];

    return (
        <div className="flex-1 bg-[#050a0f] relative overflow-hidden flex flex-col">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,transparent_100%)] pointer-events-none" />

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                {displayFiles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-cyan-500/30">
                        <FaFolder className="text-6xl mb-4" />
                        <span className="text-sm">Folder is empty</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                        {displayFiles.map((file, index) => (
                            <button
                                key={index}
                                className="group flex flex-col items-center p-3 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-default"
                                onDoubleClick={() => onFileDoubleClick && onFileDoubleClick(file)}
                            >
                                <div className="mb-3 relative">
                                    <FileIcon type={file.type} />
                                    <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-xs text-cyan-100/80 group-hover:text-white text-center truncate w-full px-1 select-none">
                                    {file.name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-8 bg-[#0a1520] border-t border-cyan-500/20 flex items-center px-4 text-[10px] text-cyan-500/60 select-none">
                <span>{displayFiles.length} items</span>
                <span className="mx-2">•</span>
                <span>Free space: 14.2 GB</span>
            </div>
        </div>
    );
};

export default MainArea;
