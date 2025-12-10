import React from 'react';
import { FaUserCircle, FaReply, FaReplyAll, FaForward, FaStar } from 'react-icons/fa';

const MailView = ({ email }) => {
    if (!email) {
        return (
            <div className="flex-1 bg-[#050a0f] flex items-center justify-center text-cyan-500/30 flex-col gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center">
                    <FaUserCircle className="text-4xl" />
                </div>
                <p>Select an email to read</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-[#050a0f] flex flex-col overflow-hidden min-w-0">
            {/* Header */}
            <div className="p-6 border-b border-cyan-500/20 bg-[#0a1520]/50">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-cyan-100">{email.subject}</h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-cyan-500/10 rounded text-cyan-500 hover:text-cyan-400 transition-colors" title="Reply">
                            <FaReply />
                        </button>
                        <button className="p-2 hover:bg-cyan-500/10 rounded text-cyan-500 hover:text-cyan-400 transition-colors" title="Reply All">
                            <FaReplyAll />
                        </button>
                        <button className="p-2 hover:bg-cyan-500/10 rounded text-cyan-500 hover:text-cyan-400 transition-colors" title="Forward">
                            <FaForward />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className="text-cyan-400 font-bold">{email.sender[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-cyan-200">{email.sender}</span>
                            <span className="text-xs text-cyan-500/60">&lt;{email.sender.toLowerCase().replace(' ', '.')}@example.com&gt;</span>
                        </div>
                        <div className="text-xs text-cyan-500/60">
                            To: Me &lt;guest@portfolio&gt;
                        </div>
                    </div>
                    <div className="text-xs text-cyan-500/60">{email.date}</div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 text-cyan-100/90 leading-relaxed whitespace-pre-line tracking-wide">
                {email.body}
            </div>
        </div>
    );
};

export default MailView;
