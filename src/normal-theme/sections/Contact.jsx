import React, { useState } from 'react';
import {
    FaPaperPlane,
    FaSpinner,
    FaEnvelope,
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaWhatsapp,
    FaPhone,
    FaInstagram
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants/socials';
import { PROFILE } from '../../constants/profile';

const Contact = () => {
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        setTimeout(() => {
            setSending(false);
            setStatus('success');
            setTimeout(() => setStatus(null), 3000);
        }, 1500);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="contact" className="py-32 md:py-48 bg-[#050a0f] relative overflow-hidden">
            {/* Background & Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Cinematic Noise Overlay specific to section */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='1'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Subtle Moving Lines */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '10s' }} />
                    <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '15s', animationDelay: '2s' }} />
                </div>

                {/* Blob Glows */}
                <div className="absolute top-0 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={containerVariants}
                    className="mb-20 "
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Get in Touch</span>
                    </motion.div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                        <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-[0.9]">
                            Let's {" "}
                            <span className="relative inline-block mt-2">
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                                    Connect.
                                </span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                                />
                            </span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-zinc-400 max-w-xl leading-relaxed font-light">
                            Ready to build something extraordinary? Whether it's a potential collaboration or a technical query, <span className="text-cyan-400 font-medium">I'm just a message away</span>.
                        </motion.p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={containerVariants}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <motion.h3 variants={itemVariants} className="text-3xl font-bold text-white">Got a project in mind?</motion.h3>
                            <motion.p variants={itemVariants} className="text-zinc-400 leading-relaxed text-lg font-light">
                                I'm currently open to new opportunities and collaborations. Whether you have a question, a proposal, or just want to say hi, feel free to reach out.
                            </motion.p>

                            {/* Availability Status */}
                            <motion.div variants={itemVariants} className="flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                </span>
                                <span className="text-cyan-400 text-sm font-mono uppercase tracking-wide">Available for Work</span>
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <motion.h4 variants={itemVariants} className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Socials</motion.h4>
                            <motion.div variants={containerVariants} className="flex gap-4">
                                <SocialLink href={SOCIAL_LINKS.GITHUB} icon={<FaGithub size={20} />} label="Github" />
                                <SocialLink href={SOCIAL_LINKS.LINKEDIN} icon={<FaLinkedin size={20} />} label="LinkedIn" />
                                <SocialLink href={SOCIAL_LINKS.INSTAGRAM} icon={<FaInstagram size={20} />} label="Instagram" />
                                <SocialLink href={SOCIAL_LINKS.WHATSAPP} icon={<FaWhatsapp size={20} />} label="WhatsApp" />
                                <SocialLink href={`mailto:${PROFILE.CONTACT.email}`} icon={<FaEnvelope size={20} />} label="Email" />
                                <SocialLink href={`tel:${PROFILE.CONTACT.phone.replace(/ /g, '')}`} icon={<FaPhone size={20} />} label="Phone" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={containerVariants}
                        className="bg-cyan-950/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <div className="w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 opacity-50">
                            <div className="w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup variants={itemVariants} label="Name" type="text" placeholder="John Doe" />
                                <InputGroup variants={itemVariants} label="Email" type="email" placeholder="john@example.com" />
                            </div>
                            <MotionTextArea variants={itemVariants} label="Message" placeholder="Tell me about your project..." />

                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={sending}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 overflow-hidden relative group border border-transparent
        ${status === 'success'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20 cursor-default'
                                        : 'bg-white hover:bg-cyan-800  text-zinc-950'
                                    }
    `}
                            >
                                {/* Hover Fill Effect Layer */}
                                {status !== 'success' && (
                                    <span className="absolute inset-0 w-0 bg-cyan-950  transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                                )}

                                {/* Content Layer (z-10 to stay on top of fill) */}
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                    {sending ? (
                                        <FaSpinner className="animate-spin text-lg" />
                                    ) : status === 'success' ? (
                                        <>Message Sent <span className="text-xl">✓</span></>
                                    ) : (
                                        <>
                                            Send Transmission <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </motion.button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Sub-components for cleaner code
const InputGroup = ({ label, type, placeholder, variants }) => (
    <motion.div variants={variants} className="space-y-2">
        <label className="text-xs font-mono text-cyan-500 uppercase tracking-wider ml-1">{label}</label>
        <motion.input
            whileFocus={{ borderColor: "rgba(34,211,238,0.5)", backgroundColor: "rgba(34,211,238,0.05)" }}
            transition={{ duration: 0.2 }}
            type={type}
            required
            className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder:text-gray-400 font-light"
            placeholder={placeholder}
        />
    </motion.div>
);

const MotionTextArea = ({ label, placeholder, variants }) => (
    <motion.div variants={variants} className="space-y-2">
        <label className="text-xs font-mono text-cyan-500 uppercase tracking-wider ml-1">{label}</label>
        <motion.textarea
            whileFocus={{ borderColor: "rgba(34,211,238,0.5)", backgroundColor: "rgba(34,211,238,0.05)" }}
            transition={{ duration: 0.2 }}
            required
            rows={5}
            className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder:text-gray-400 resize-none font-light"
            placeholder={placeholder}
        />
    </motion.div>
);

const SocialLink = ({ href, icon, label }) => {
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.4)", color: "#22d3ee" }}
            whileTap={{ scale: 0.9 }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 border border-white/5 transition-colors duration-300"
            aria-label={label}
        >
            {icon}
        </motion.a>
    );
};

export default Contact;
