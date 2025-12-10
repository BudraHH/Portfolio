import React from 'react';
import { FaHome, FaDesktop, FaDownload, FaFileAlt, FaMusic, FaImage, FaVideo, FaTrash } from 'react-icons/fa';

const Sidebar = ({ activePath, onNavigate }) => {
    const sidebarItems = [
        { icon: FaHome, label: 'Home', path: '/home/dev' },
        { icon: FaDesktop, label: 'Desktop', path: '/home/dev/Desktop' },
        { icon: FaDownload, label: 'Downloads', path: '/home/dev/Downloads' },
        { icon: FaFileAlt, label: 'Documents', path: '/home/dev/Documents' },
        { icon: FaMusic, label: 'Music', path: '/home/dev/Music' },
        { icon: FaImage, label: 'Pictures', path: '/home/dev/Pictures' },
        { icon: FaVideo, label: 'Videos', path: '/home/dev/Videos' },
        { icon: FaTrash, label: 'Trash', path: '/trash' },
    ];

    return (
        <div className="w-48 flex-shrink-0 bg-[#0a1520]/50 border-r border-cyan-500/20 backdrop-blur-md flex flex-col py-4">
            <div className="px-4 mb-4">
                <span className="text-xs font-bold text-cyan-500/50 uppercase tracking-wider">Places</span>
            </div>
            <nav className="flex-1 overflow-y-auto space-y-1 px-2">
                {sidebarItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => onNavigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${activePath === item.path
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'text-cyan-100/70 hover:bg-cyan-500/10 hover:text-cyan-200'
                            }`}
                    >
                        <item.icon className={`text-sm ${activePath === item.path ? 'text-cyan-400' : 'text-cyan-500/60 group-hover:text-cyan-400'
                            }`} />
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
