import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const contentData = {
    welcome: {
        title: "Welcome to OS_Simulation",
        content: (
            <div className="space-y-6">
                <p className="text-cyan-100/90 leading-relaxed">
                    Welcome to my interactive portfolio! This interface is designed to resemble a modern desktop environment, allowing you to explore my skills, projects, and experience in a unique way.
                </p>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 flex gap-4">
                    <FaLightbulb className="text-yellow-400 text-xl flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-cyan-300 font-bold mb-1">Quick Tip</h4>
                        <p className="text-cyan-200/80 text-sm">
                            You can drag windows, resize them, and open multiple applications at once. Try opening the Terminal and Files Explorer together!
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    desktop: {
        title: "Desktop Features",
        content: (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg text-cyan-300 font-bold mb-2">Window Management</h3>
                    <p className="text-cyan-100/80">
                        Applications run in their own windows. You can:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-cyan-200/70 ml-2">
                        <li>Drag windows using the title bar</li>
                        <li>Resize windows from the corners</li>
                        <li>Minimize, Maximize, and Close using the controls</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg text-cyan-300 font-bold mb-2">The Dock</h3>
                    <p className="text-cyan-100/80">
                        The dock at the bottom provides quick access to all installed applications. Active apps have a glowing indicator.
                    </p>
                </div>
            </div>
        )
    },
    apps: {
        title: "Included Applications",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0f1c29] p-4 rounded-lg border border-cyan-500/10">
                        <h4 className="text-cyan-400 font-bold mb-2">Firefox</h4>
                        <p className="text-sm text-cyan-200/60">A full-featured browser simulation to view my web projects and resume.</p>
                    </div>
                    <div className="bg-[#0f1c29] p-4 rounded-lg border border-cyan-500/10">
                        <h4 className="text-cyan-400 font-bold mb-2">Terminal</h4>
                        <p className="text-sm text-cyan-200/60">A powerful command-line interface. Type 'help' to get started.</p>
                    </div>
                    <div className="bg-[#0f1c29] p-4 rounded-lg border border-cyan-500/10">
                        <h4 className="text-cyan-400 font-bold mb-2">Files</h4>
                        <p className="text-sm text-cyan-200/60">Explore the virtual file system, including my resume and project files.</p>
                    </div>
                </div>
            </div>
        )
    },
    about: {
        title: "Info This Project",
        content: (
            <div className="space-y-4">
                <p className="text-cyan-100/80">
                    This portfolio was built using React, Tailwind CSS, and Framer Motion. It demonstrates advanced frontend concepts like state management, component composition, and mimics a real operating system environment.
                </p>
                <div className="mt-4">
                    <h4 className="text-cyan-300 font-bold mb-2">Credits</h4>
                    <p className="text-sm text-cyan-200/60">Designed and Developed by Hari Hara Budra.</p>
                </div>
            </div>
        )
    }
};

const MainArea = ({ activeCategory }) => {
    const data = contentData[activeCategory] || contentData.welcome;

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#050a0f] scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-6 font-mono">
                    {data.title}
                </h1>
                <div className="prose prose-invert prose-cyan max-w-none">
                    {data.content}
                </div>
            </div>
        </div>
    );
};

export default MainArea;
