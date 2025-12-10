import React, { useState, useMemo } from 'react';
import { FaTimes, FaMinus, FaRegWindowMaximize, FaBars } from 'react-icons/fa';
import MailSidebar from './MailSidebar.jsx';
import MailList from './MailList.jsx';
import MailView from './MailView.jsx';

const MOCK_EMAILS = [
    {
        id: 1,
        sender: "Google",
        subject: "Security Alert",
        date: "10:30 AM",
        snippet: "New sign-in detected on your account via Windows PC...",
        folder: "inbox",
        read: false,
        body: "We detected a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything. If not, please secure your account immediately.\n\nDetails:\nDevice: Windows 11\nLocation: Chennai, India\nTime: Just now"
    },
    {
        id: 2,
        sender: "GitHub",
        subject: "Welcome to GitHub!",
        date: "Yesterday",
        snippet: "Thanks for joining GitHub! We're glad you're here.",
        folder: "inbox",
        read: true,
        body: "Welcome to GitHub!\n\nWe're thrilled to have you here. GitHub is where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world."
    },
    {
        id: 3,
        sender: "LinkedIn",
        subject: "You appeared in 5 searches this week",
        date: "Dec 8",
        snippet: "See who's looking for you on LinkedIn.",
        folder: "inbox",
        read: true,
        body: "You appeared in 5 searches this week.\n\nPeople are looking for you. See who's viewing your profile and connect with them to grow your network."
    },
    {
        id: 4,
        sender: "AWS Billing",
        subject: "Invoice Available",
        date: "Dec 1",
        snippet: "Your AWS invoice for the period of November is now available.",
        folder: "inbox",
        read: true,
        body: "Hello,\n\nYour AWS invoice for the period of November 1 - November 30 is now available. Total amount due: $0.00 (Free Tier).\n\nLog in to the AWS console to view details."
    },
    {
        id: 5,
        sender: "HR Manager",
        subject: "Re: Application Status",
        date: "Nov 25",
        snippet: "Thank you for your interest. We are reviewing your application.",
        folder: "sent",
        read: true,
        body: "Hi Team,\n\nJust checking in on the status of my application for the Frontend Developer role.\n\nBest,\nHari"
    },
    {
        id: 6,
        sender: "Lottery Winner",
        subject: "YOU WON $1,000,000!!!",
        date: "Oct 31",
        snippet: "Click here to claim your prize immediately!!!",
        folder: "spam",
        read: false,
        body: "CONGRATULATIONS!!!!\n\nYou have been selected as the grand prize winner. Please send your bank details to claim the money."
    },
    {
        id: 7,
        sender: "Old Project",
        subject: "Ideas draft",
        date: "Sep 15",
        snippet: "Maybe we should try to use React...",
        folder: "trash",
        read: true,
        body: "Just some rough thoughts on the new architecture."
    }
];

const Thunderbird = ({ onClose, onMinimize, onMaximize, isMaximized }) => {
    const [activeFolder, setActiveFolder] = useState('inbox');
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmails = useMemo(() => {
        return MOCK_EMAILS
            .filter(email => email.folder === activeFolder)
            .filter(email => {
                const query = searchQuery.toLowerCase();
                return email.subject.toLowerCase().includes(query) ||
                    email.sender.toLowerCase().includes(query) ||
                    email.snippet.toLowerCase().includes(query);
            });
    }, [activeFolder, searchQuery]);

    const selectedEmail = useMemo(() => {
        return MOCK_EMAILS.find(e => e.id === selectedEmailId);
    }, [selectedEmailId]);

    const handleSelectFolder = (folderId) => {
        setActiveFolder(folderId);
        setSelectedEmailId(null);
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#050a0f] rounded-lg overflow-hidden border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Header / Chrome */}
            <div className="window-drag-handle h-10 bg-[#0f1c29] border-b border-cyan-500/20 flex items-center px-4 justify-between shrink-0 select-none">
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

                <div className="text-cyan-500/50 text-xs font-bold tracking-widest uppercase">
                    Mozilla Thunderbird
                </div>

                <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Main Application Area */}
            <div className="flex-1 flex overflow-hidden">
                <MailSidebar activeFolder={activeFolder} onSelectFolder={handleSelectFolder} />
                <MailList
                    emails={filteredEmails}
                    selectedEmailId={selectedEmailId}
                    onSelectEmail={setSelectedEmailId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <MailView email={selectedEmail} />
            </div>
        </div>
    );
};

export default Thunderbird;
