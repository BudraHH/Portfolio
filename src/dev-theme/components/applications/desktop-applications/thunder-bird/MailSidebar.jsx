import React from 'react';
import { FaInbox, FaPaperPlane, FaTrash, FaStar, FaExclamationCircle, FaEnvelope } from 'react-icons/fa';

const folders = [
    { id: 'inbox', label: 'Inbox', icon: FaInbox, count: 2 },
    { id: 'sent', label: 'Sent', icon: FaPaperPlane, count: 0 },
    { id: 'starred', label: 'Starred', icon: FaStar, count: 0 },
    { id: 'spam', label: 'Spam', icon: FaExclamationCircle, count: 1 },
    { id: 'trash', label: 'Trash', icon: FaTrash, count: 5 },
];

const MailSidebar = ({ activeFolder, onSelectFolder }) => {
    return (
        <div className="w-16 sm:w-48 bg-[#0f1c29]/90 border-r border-cyan-500/20 flex flex-col pt-4 shrink-0">
            <div className="px-4 mb-6 hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <FaEnvelope className="text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-cyan-100 font-bold text-sm">Thunderbird</h2>
                    <p className="text-cyan-500/60 text-xs">guest@portfolio</p>
                </div>
            </div>

            <div className="px-4 mb-2 hidden sm:block">
                <h3 className="text-cyan-500/50 text-xs font-bold uppercase tracking-wider">Folders</h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 p-2">
                {folders.map((folder) => (
                    <button
                        key={folder.id}
                        onClick={() => onSelectFolder(folder.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative
                            ${activeFolder === folder.id
                                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                                : 'text-cyan-500/70 hover:bg-cyan-500/10 hover:text-cyan-400'
                            }`}
                    >
                        <folder.icon className={`text-lg ${activeFolder === folder.id ? 'text-cyan-400' : 'text-cyan-500/70'}`} />
                        <span className="hidden sm:block text-sm font-medium flex-1 text-left">{folder.label}</span>
                        {folder.count > 0 && (
                            <span className="hidden sm:flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                                {folder.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MailSidebar;
