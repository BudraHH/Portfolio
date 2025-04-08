import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navigation links array
    const navLinks = [
        { name: "About", ref: "/about" },
        { name: "Education", path: "/education" },
        { name: "Skills", path: "/skills" },
        { name: "Works", path: "/works" }
    ];

    return (
        <nav className="fixed top-0 z-20 w-full h-20  text-white px-6 md:px-12 lg:px-20 flex items-center justify-between  ">
            {/* Name (Left) */}
            <div className="text-xl md:text-2xl font-bold text-white cursor-pointer">
                <Link to="/">Budra HH</Link>
            </div>

            {/* Navigation Links (Center) */}
            <div className="hidden md:flex gap-8 text-lg">
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        className="hover:text-cyan-300 transition duration-300"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Download Resume Button (Right) */}
            <a
                href="/resume.pdf"
                download
                className="hidden md:block bg-cyan-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-cyan-300 transition duration-300"
            >
                Download Resume
            </a>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white text-2xl"
                onClick={toggleMenu}
            >
                ☰
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-black/80 text-white flex flex-col items-center py-6 space-y-4 md:hidden">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            onClick={toggleMenu}
                            className="hover:text-cyan-300 transition duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        download
                        className="bg-cyan-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-cyan-300 transition duration-300"
                    >
                        Download Resume
                    </a>
                </div>
            )}
        </nav>
    );
};


