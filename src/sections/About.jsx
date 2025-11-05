import { motion } from "framer-motion";
import TypedText from "../components/TypedText.jsx";

export default function About() {
    const skills = [
        { icon: "🚀", text: "Building scalable web applications" },
        { icon: "🎨", text: "Crafting beautiful UX with animations" },
        { icon: "💻", text: "Full-stack development with React & Node.js" },
        { icon: "⚡", text: "Performance optimization & best practices" },
    ];

    return (
        <section className="w-screen h-screen p-16 flex items-center justify-center">
            {/* Gradient background effect */}
            {/*<div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-black to-black pointer-events-none" />*/}

            {/* Animated orbs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1 }}
                className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.2 }}
                className="absolute w-72 h-72 bg-cyan-600 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"
            />

            {/* Main container */}
            <div className="w-full h-full flex flex-col justify-center items-start relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-4xl"
                >
                    {/* Glassmorphic card */}
                    <div className="border border-cyan-500/30 backdrop-blur-2xl bg-white/5 rounded-3xl p-12 shadow-2xl hover:bg-white/5 transition-colors duration-300">
                        {/* Top accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 w-20 bg-gradient-to-r from-cyan-600 to-cyan-400 mb-8"
                        />

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl font-bold text-white mb-6 tracking-tight"
                        >
                            About Me
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl"
                        >
                            <TypedText strings={[`I'm a passionate full-stack developer with expertise in building modern web applications.
                            Specialized in React, Node.js, and creating beautiful user experiences with smooth animations
                            and cutting-edge technologies.`]} showCursor={false} typeSpeed={1} />
                        </motion.p>

                        {/* Skills grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                        >
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors duration-300"
                                >
                                    <span className="text-2xl">{skill.icon}</span>
                                    <p className="text-gray-300 text-sm md:text-base">{skill.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Bottom accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-cyan-600"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
