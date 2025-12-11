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
                <div className="flex flex-col items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative text-center group"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight relative z-10 mix-blend-overlay">
                            Let's <span className="text-cyan-500">Connect</span>
                        </h2>

                        {/* Glowing Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                        />

                        {/* Huge Background Text */}
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] font-bold text-transparent stroke-cyan-500/10 whitespace-nowrap -z-10 select-none opacity-20 blur-sm">
                            CONTACT
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-white">Got a project in mind?</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg font-light">
                                I'm currently open to new opportunities and collaborations. Whether you have a question, a proposal, or just want to say hi, feel free to reach out.
                            </p>

                            {/* Availability Status */}
                            <div className="flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                </span>
                                <span className="text-cyan-400 text-sm font-mono uppercase tracking-wide">Available for Work</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Socials</h4>
                            <div className="flex gap-4">
                                <SocialLink href="#" icon={<FaGithub size={20} />} label="Github" />
                                <SocialLink href="#" icon={<FaLinkedin size={20} />} label="LinkedIn" />
                                <SocialLink href="#" icon={<FaInstagram size={20} />} label="Twitter" />
                                <SocialLink href="mailto:hello@example.com" icon={<FaEnvelope size={20} />} label="Email" />
                                <SocialLink href="https://wa.me/1234567890" icon={<FaWhatsapp size={20} />} label="WhatsApp" />
                                <SocialLink href="tel:+1234567890" icon={<FaPhone size={20} />} label="Phone" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-zinc-900/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <div className="w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 opacity-50">
                            <div className="w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Name" type="text" placeholder="John Doe" />
                                <InputGroup label="Email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-cyan-500 uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all placeholder:text-zinc-700 resize-none font-light"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 overflow-hidden relative group
                                    ${status === 'success'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                        : 'bg-white text-zinc-950 hover:bg-cyan-50'
                                    }
                                `}
                            >
                                {sending ? (
                                    <FaSpinner className="animate-spin text-lg" />
                                ) : status === 'success' ? (
                                    <>Message Sent <span className="text-xl">✓</span></>
                                ) : (
                                    <>
                                        Send Transmission <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Sub-components for cleaner code
const InputGroup = ({ label, type, placeholder }) => (
    <div className="space-y-2">
        <label className="text-xs font-mono text-cyan-500 uppercase tracking-wider ml-1">{label}</label>
        <input
            type={type}
            required
            className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all placeholder:text-zinc-700 font-light"
            placeholder={placeholder}
        />
    </div>
);

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Contact;
