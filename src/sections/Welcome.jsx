import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Welcome({ onComplete }) {
    const [displayedText, setDisplayedText] = useState("");
    const fullText = "<Welcome/>";
    const typingSpeed = 100; // ms per character

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 5 }}
            transition={{
                duration: 1.4,
                delay: 2.5, // Increased to allow typing to complete
                ease: "easeInOut"
            }}
            onAnimationComplete={onComplete}
            className="p-10 fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none overflow-hidden"
        >
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-black to-black" />

            {/* Animated orbs background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.8 }}
                className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl -top-20 -right-20"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1 }}
                className="absolute w-72 h-72 bg-cyan-600 rounded-full blur-3xl -bottom-20 -left-20"
            />

            {/* Main content */}
            <motion.div
                className="text-center w-full h-full rounded-2xl flex flex-col justify-center items-center relative z-10 border border-cyan-500/30 backdrop-blur-lg bg-cyan-500/10 shadow-2xl hover:bg-cyan-500/20 transition-colors duration-300"
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut"
                }}
            >
                {/* Top accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 w-16 bg-gradient-to-r from-cyan-600 to-cyan-400 mx-auto mb-8"
                />

                {/* Main heading with typing effect */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl md:text-7xl font-black text-white tracking-tighter font-mono"
                    >
                        {/* Typing text */}
                        <span className="text-cyan-400">{displayedText}</span>
                        {/* Blinking cursor */}
                        {displayedText.length < fullText.length && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="ml-1 text-cyan-400"
                            >
                                |
                            </motion.span>
                        )}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }} // Starts after typing
                        className="text-5xl md:text-6xl font-bold"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-cyan-600">
                            to My Digital Canvas
                        </span>
                    </motion.p>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="text-lg md:text-xl text-gray-400 mt-8 font-light tracking-wide"
                >
                    <span className="text-cyan-500">Where Code Becomes Art</span>
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mt-8"
                />

                {/* Loading indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mt-12 flex justify-center gap-2"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-cyan-600"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                        className="w-2 h-2 rounded-full bg-cyan-600"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-cyan-600"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
