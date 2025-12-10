import React from 'react';
import { FaSearch, FaStar, FaRegStar } from 'react-icons/fa';

const MailList = ({ emails, selectedEmailId, onSelectEmail, searchQuery, onSearchChange }) => {
    return (
        <div className="w-64 sm:w-80 bg-[#0a1520]/95 border-r border-cyan-500/20 flex flex-col shrink-0">
            {/* Search Bar */}
            <div className="p-4 border-b border-cyan-500/20">
                <div className="relative h-8 bg-[#050a0f] border border-cyan-500/20 rounded flex items-center px-3 hover:border-cyan-500/40 transition-colors focus-within:border-cyan-500/60 focus-within:shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                    <FaSearch className="text-xs text-cyan-500/50" />
                    <input
                        type="text"
                        placeholder="Search mail..."
                        className="bg-transparent border-none outline-none text-xs text-cyan-100 ml-2 w-full placeholder-cyan-500/30"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
                {emails.length === 0 ? (
                    <div className="p-8 text-center text-cyan-500/40 text-sm">
                        No messages found
                    </div>
                ) : (
                    emails.map((email) => (
                        <button
                            key={email.id}
                            onClick={() => onSelectEmail(email.id)}
                            className={`w-full p-4 border-b border-cyan-500/10 text-left transition-colors hover:bg-cyan-500/5
                                ${selectedEmailId === email.id ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400' : 'border-l-2 border-l-transparent'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-sm truncate pr-2 ${!email.read ? 'font-bold text-cyan-100' : 'text-cyan-100/70'}`}>
                                    {email.sender}
                                </span>
                                <span className="text-[10px] text-cyan-500/60 whitespace-nowrap">{email.date}</span>
                            </div>
                            <div className={`text-xs mb-1 truncate ${!email.read ? 'text-cyan-200' : 'text-cyan-200/60'}`}>
                                {email.subject}
                            </div>
                            <div className="text-[10px] text-cyan-500/50 truncate line-clamp-2">
                                {email.snippet}
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default MailList;
