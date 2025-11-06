import { motion } from "framer-motion";
import TypedText from "../components/TypedText.jsx";
import { skills } from "../utils/constants.js";

export default function Info() {
    return (
        <div className="w-10/12 max-w-5xl p-16 min-h-[90vh] flex flex-col justify-center items-start relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full"
            >
                {/* ✨ Glassmorphic main container */}
                <div
                    className="w-full border border-cyan-400/30 backdrop-blur-2xl bg-gradient-to-b from-white/10 via-cyan-400/5 to-transparent
                     rounded-2xl p-8 md:p-12 relative overflow-hidden
                     shadow-[0_0_40px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.1)]
                     transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,255,255,0.25),inset_0_0_30px_rgba(0,255,255,0.2)]"
                >
                    {/* 🌌 Decorative glow background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.15)_0%,transparent_80%)] pointer-events-none"></div>

                    {/* Top Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-600 to-cyan-400 mb-10 rounded-full shadow-cyan-500/30"
                    />

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-8 select-text"
                    >
                        About Me
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl whitespace-pre-line select-text"
                    >
                        <TypedText
                            strings={[
                                `I'm a passionate full-stack developer specializing in React, Node.js, and modern web technologies. 
I focus on crafting smooth, performant, and delightful digital experiences — solving real problems through code and creativity.`,
                            ]}
                            showCursor={false}
                            typeSpeed={35}
                            delaySpeed={900}
                        />
                    </motion.p>

                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full max-w-2xl"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent
                           hover:from-cyan-400/20 hover:to-cyan-400/5
                           shadow-[0_0_10px_rgba(0,255,255,0.1)]
                           hover:shadow-[0_0_20px_rgba(0,255,255,0.25)]
                           transition-all duration-300 cursor-default select-none"
                            >
                <span className="text-3xl text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
                  {skill.icon}
                </span>
                                <p className="text-gray-200 text-md md:text-base font-medium">{skill.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full shadow-cyan-500/30"
                    />
                </div>
            </motion.div>
        </div>
    );
}
