import React from 'react';
import { FaBook, FaDesktop, FaRocket, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';

const categories = [
    { id: 'welcome', label: 'Welcome', icon: FaRocket },
    { id: 'desktop', label: 'Desktop', icon: FaDesktop },
    { id: 'apps', label: 'Applications', icon: FaBook },
    { id: 'about', label: 'About', icon: FaInfoCircle },
];

const Sidebar = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="w-16 xs:w-20 sm:w-48 bg-[#0a1520]/50 border-r border-cyan-500/20 flex flex-col pt-4">
            <div className="px-4 mb-4 hidden sm:block">
                <h3 className="text-cyan-500/50 text-xs font-bold uppercase tracking-wider">Topics</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 p-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group
                            ${activeCategory === cat.id
                                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                                : 'text-cyan-500/70 hover:bg-cyan-500/10 hover:text-cyan-400'
                            }`}
                    >
                        <cat.icon className={`text-lg ${activeCategory === cat.id ? 'text-cyan-400' : 'text-cyan-500/70'}`} />
                        <span className="hidden sm:block text-sm font-medium">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
