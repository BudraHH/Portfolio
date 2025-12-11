import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEV_ROUTES } from "../../dev-theme/routes/devRoutes.js";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        navigate(`/normal-theme/${id}`);
    };

    const navItems = [
        { label: 'Home', id: 'hero' },
        { label: 'Info', id: 'info' },
        { label: 'Career', id: 'career' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050a0f]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <div
                    onClick={() => scrollToSection('hero')}
                    className="font-bold text-xl tracking-wider cursor-pointer group"
                >
                    <span className="text-white group-hover:text-cyan-400 transition-colors">BUDRA</span>
                    <span className="text-cyan-400">.</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}

                    <button
                        onClick={() => navigate(DEV_ROUTES.FULL_WELCOME)}
                        className="ml-4 px-4 py-2 text-xs font-bold border border-white/10 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all"
                    >
                        SWITCH THEME
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
