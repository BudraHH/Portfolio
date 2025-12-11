import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCopy } from 'react-icons/fa';
import { PROFILE } from '../../constants/profile';

const Info = () => {


    // Animation Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="info" className="relative py-32 lg:py-40 bg-cyan-950/5 overflow-hidden">
            {/* === Background Ambient Layers === */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Cinematic Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Refined Grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Multi-Layer Breathing Ambient Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[150px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen"
                />


                {/* Radial Gradient Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050a0f_100%)] opacity-60" />

            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-6 hover:border-cyan-500/40 transition-colors duration-300"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Info about me</span>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* === Left Column: Text Content === */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">

                        {/* Floating Decorative Element */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-2xl"
                        />

                        {/* Main Heading with Description */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={staggerContainer}
                            className="mb-16 relative"
                        >
                            <motion.h2 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-[0.9]">
                                Beyond the {" "}
                                <span className="relative inline-block mt-2">
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                        Code.
                                    </span>
                                    {/* Underline Accent */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.25 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                                    />
                                </span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-zinc-400 max-w-xl leading-relaxed font-light">
                                Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 font-medium">logic dances with creativity</span>—building digital experiences that don't just function, but <span className="text-zinc-200 font-normal">resonate</span>.
                            </motion.p>
                        </motion.div>

                        {/* Who am I Section */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={staggerContainer}
                            className="mb-12 relative"
                        >
                            <motion.h3 variants={slideInLeft} className="text-3xl lg:text-4xl font-bold mb-8 tracking-tight relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-400">
                                    Who am I?
                                </span>
                                {/* Subtle Glow Behind Text */}
                                <span className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-500/10 to-transparent -z-10" />
                            </motion.h3>

                            {/* Enhanced Gradient Border Line with Dots */}
                            <motion.div variants={fadeInUp} className="relative pl-8">
                                {/* Main Vertical Line */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-cyan-500/60 via-cyan-500/20 to-transparent rounded-full"
                                />

                                {/* Decorative Dots */}
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute left-[-2px] top-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                />
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute left-[-2px] top-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                />

                                <div className="space-y-5 text-zinc-300 text-lg leading-relaxed max-w-2xl">
                                    <p className="font-light relative pl-4">
                                        <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                                        A curious mind at the intersection of design and development, I thrive on transforming abstract ideas into <span className="text-cyan-100/90 font-medium">intuitive, pixel-perfect realities</span>. Every challenge is an opportunity to learn, iterate, and craft something exceptional.
                                    </p>
                                    <p className="font-light relative pl-4">
                                        <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                                        I believe great products are born from <span className="text-cyan-100/90 font-medium">empathy and experimentation</span>—understanding users deeply, then fearlessly exploring solutions until the complex becomes elegantly simple.
                                    </p>
                                    <p className="font-light relative pl-4">
                                        <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-cyan-400/40" />
                                        Collaboration fuels my process. Whether bridging the gap between designers and engineers or diving into uncharted technologies, I bring <span className="text-cyan-100/90 font-medium">passion, precision</span>, and a relentless drive to create meaningful impact.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>


                    </div>

                    {/* === Right Column: Details Cards === */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={staggerContainer}
                        className="lg:col-span-5 flex flex-col gap-6 relative"
                    >

                        {/* Decorative Floating Element */}
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                                rotate: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-16 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl pointer-events-none"
                        />

                        {/* Location Card */}
                        <motion.div variants={fadeInUp}>
                            <DetailCard
                                icon={<FaMapMarkerAlt />}
                                label="Location"
                                value="Chennai, Tamil Nadu"
                            />
                        </motion.div>

                        {/* Languages Card */}
                        <motion.div variants={fadeInUp}>
                            <DetailCard
                                icon={<FaGlobe />}
                                label="Languages"
                                value={PROFILE.LANGUAGES_SPOKEN.join(", ")}
                            />
                        </motion.div>

                        {/* Email Card */}
                        <motion.div variants={fadeInUp}>
                            <DetailCard
                                icon={<FaEnvelope />}
                                label="Email"
                                value={PROFILE.CONTACT.email}
                                isLink
                                href={`mailto:${PROFILE.CONTACT.email}`}
                            />
                        </motion.div>

                        {/* Phone Card */}
                        <motion.div variants={fadeInUp}>
                            <DetailCard
                                icon={<FaPhone />}
                                label="Phone"
                                value={PROFILE.CONTACT.phone}
                                isLink
                                href={`tel:${PROFILE.CONTACT.phone.replace(/ /g, '')}`}
                            />
                        </motion.div>

                        {/* Reusme Button */}
                        <motion.div variants={fadeInUp} className="mt-4">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="block p-4 rounded-xl text-center border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 text-cyan-400 font-medium tracking-wide transition-all duration-300 group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    View Full Resume <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Reusable Detail Card Component
import { FaArrowRight } from "react-icons/fa"; // Importing locally for simple usage

const DetailCard = ({ icon, label, value, isLink, href }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = (e) => {
        if (isLink) {
            e.preventDefault(); // Prevent link navigation
            e.stopPropagation(); // Stop event bubbling
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const content = (
        <div
            className="relative group h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Premium Gradient Border Effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-cyan-500/5 to-transparent opacity-100 group-hover:from-cyan-500/40 group-hover:via-cyan-500/10 group-hover:to-transparent transition-all duration-700" />

            {/* Glass Card */}
            <div className="relative h-full p-6 rounded-2xl bg-[#050a0f]/90 backdrop-blur-xl border-t border-white/5 shadow-2xl group-hover:bg-[#050a0f]/70 transition-all duration-500">

                {/* Radial Glow on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08) 0%, transparent 70%)'
                    }}
                />

                <div className="relative z-10 flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover:text-cyan-400/70 transition-colors duration-300">
                        {label}
                    </span>
                    <div className="flex items-center gap-3">
                        {isLink && (
                            <motion.button
                                onClick={handleCopy}
                                whileTap={{ scale: 0.9 }}
                                className="text-[10px] uppercase tracking-wider font-mono transition-all duration-300 px-2 py-1 rounded-md hover:bg-cyan-500/10"
                            >
                                <span className={`transition-all duration-300 ${copied ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-cyan-500'}`}>
                                    {copied ? 'COPIED' : <FaCopy className="text-xs" />}
                                </span>
                            </motion.button>
                        )}
                        <motion.div
                            transition={{ duration: 0.3 }}
                            className={`text-lg transition-colors duration-300 ${copied ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-cyan-400'}`}
                        >
                            {icon}
                        </motion.div>
                    </div>
                </div>

                <div className="relative z-10 text-zinc-300 font-light group-hover:text-white transition-colors duration-300 leading-relaxed break-words">
                    {value}
                </div>

                {/* Subtle Bottom Accent */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent origin-center"
                />
            </div>
        </div>
    );

    if (isLink && href) {
        return <a href={href} className="block">{content}</a>;
    }

    return content;
};

export default Info;