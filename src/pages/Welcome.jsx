import React, { useState, useEffect } from 'react';
import { FaTerminal, FaLaptopCode, FaArrowRight } from 'react-icons/fa';

const Welcome = ({ onSelectTheme }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#050a0f] overflow-hidden flex flex-col items-center justify-center font-sans antialiased selection:bg-cyan-500/30">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
                style={{
                    background: `
                        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6,182,212,0.15) 0%, transparent 50%),
                        radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(59,130,246,0.1) 0%, transparent 50%)
                    `
                }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">

                {/* Header / Greeting */}
                <div className="text-center mb-16 space-y-4 animate-fadeInUp">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        System Ready
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-200 tracking-tight">
                        Hello, I'm <span className="text-cyan-400">Budra</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        I craft digital experiences. Choose your preferred interface to explore my portfolio.
                    </p>
                </div>

                {/* Theme Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                    {/* Developer OS Card */}
                    <button
                        onClick={() => onSelectTheme('dev')}
                        onMouseEnter={() => setIsHovered('dev')}
                        onMouseLeave={() => setIsHovered(null)}
                        className={`group relative p-8 rounded-3xl text-left transition-all duration-500 border
                            ${isHovered === 'dev'
                                ? 'bg-[#0a1520] border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] scale-[1.02]'
                                : 'bg-[#0a1520]/60 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                                <FaTerminal className="text-2xl text-cyan-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">Developer OS</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                                An immersive, terminal-inspired desktop environment. Experience my work through key commands, file systems, and window management.
                            </p>

                            <div className="flex items-center text-cyan-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                Enter System <FaArrowRight className="ml-2" />
                            </div>
                        </div>
                    </button>

                    {/* Standard Portfolio Card */}
                    <button
                        onClick={() => onSelectTheme('normal')}
                        onMouseEnter={() => setIsHovered('normal')}
                        onMouseLeave={() => setIsHovered(null)}
                        className={`group relative p-8 rounded-3xl text-left transition-all duration-500 border
                            ${isHovered === 'normal'
                                ? 'bg-[#0a1520] border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02]'
                                : 'bg-[#0a1520]/60 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <FaLaptopCode className="text-2xl text-blue-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">Standard View</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                                A clean, modern single-page portfolio layout. Straightforward and content-focused for a classic browsing experience.
                            </p>

                            <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                Browse Standard <FaArrowRight className="ml-2" />
                            </div>
                        </div>
                    </button>

                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-zinc-600 text-xs font-medium tracking-wide">
                DESIGNED & DEVELOPED BY HARI HARA BUDRA
            </div>
        </div>
    );
};

export default Welcome;
