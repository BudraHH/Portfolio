import React from 'react';
// Added more icons
import { FaReact, FaGithub, FaLinkedin } from 'react-icons/fa';
// Assuming you might use Vite and Tailwind - add relevant icons
import { SiVite, SiTailwindcss } from 'react-icons/si';
import {FaInstagram} from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    // Example timestamp - could be dynamic if needed, but static is fine for footer
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return (
        <footer className="bg-black border-t border-gray-700/50 text-gray-500 relative overflow-hidden">
            {/* Optional: Subtle background noise/grid consistent with other sections */}
            <div className="absolute inset-0 opacity-[0.015] bg-[url('/images/noise.png')] bg-repeat pointer-events-none"></div>
            {/* Optional: Faint top edge gradient */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 relative z-10"> {/* Increased padding */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">

                    {/* Left Side: Copyright & Socials */}
                    <div className="flex flex-col items-center md:items-start gap-3 order-2 md:order-1 text-center md:text-left">
                        {/* Log-style Copyright */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 select-none">[{timestamp}]</span> {/* Timestamp */}
                            <span className="text-gray-400">status:</span>
                            <span className="text-green-500/80">ONLINE</span> {/* Status indicator */}
                            <span className="text-gray-600">::</span> {/* Separator */}
                            <span className="text-gray-400">© {currentYear} BudraHH</span>
                        </div>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/BudraHH" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200" title="GitHub">
                                <FaGithub className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200" title="LinkedIn"> {/* Replace link */}
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200" title="LinkedIn"> {/* Replace link */}
                                <FaInstagram className="w-4 h-4" />
                            </a>

                        </div>
                    </div>

                    {/* Right Side: Built With / Credits */}
                    <div className="flex flex-col items-center md:items-end gap-2 order-1 md:order-2">
                        <span className="text-gray-500">// Dependencies:</span>
                        <div className="flex items-center gap-3">
                            {/* Vite */}
                            <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors duration-200 px-1.5 py-0.5 rounded hover:bg-gray-800/50" title="Vite">
                                <SiVite className="w-3 h-3" />
                                <span className="text-xs">Vite</span>
                            </a>
                            {/* React */}
                            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors duration-200 px-1.5 py-0.5 rounded hover:bg-gray-800/50" title="React">
                                <FaReact className="w-3.5 h-3.5" />
                                <span className="text-xs">React</span>
                            </a>
                            {/* Tailwind */}
                            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-teal-400 transition-colors duration-200 px-1.5 py-0.5 rounded hover:bg-gray-800/50" title="Tailwind CSS">
                                <SiTailwindcss className="w-3.5 h-3.5" />
                                <span className="text-xs">Tailwind</span>
                            </a>
                            {/* Add other key tech if desired */}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;