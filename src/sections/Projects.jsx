import { motion } from "framer-motion";
import {projects} from "../utils/constants.js";
export default function Projects() {


    return (
        <section className="p-16 w-full max-w-[78rem]  h-full flex flex-col justify-center items-start relative z-10 rounded-2xl bg-transparent">
            {/* Background */}
            {/*<div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-black to-black pointer-events-none" />*/}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full border border-cyan-500/30 backdrop-blur-2xl bg-white/5 rounded-3xl p-12 shadow-2xl hover:bg-white/5 transition-colors duration-300"
            >
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
                    Projects
                </motion.h2>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 * index }}
                            className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors duration-300 shadow-md"
                        >
                            <h3 className="text-2xl font-semibold text-white mb-2">{project.name}</h3>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-cyan-400 bg-cyan-900 px-3 py-1 rounded font-mono text-sm font-bold"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-cyan-600 mt-8"
                />
            </motion.div>
        </section>
    );
}


