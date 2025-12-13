import React, { useState, useCallback, useMemo, memo } from 'react';
import {
    FaPaperPlane,
    FaSpinner,
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaWhatsapp,
    FaPhone,
    FaInstagram
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants/socials';
import { PROFILE } from '../../constants/profile';

// --- Constants & Variants ---

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const ITEM_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const SOCIAL_ITEM_VARIANTS = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

// --- Sub-Components ---

const AmbientBackground = memo(() => (
    <div className="absolute inset-0 pointer-events-none -z-10">
        <div
            className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] md:opacity-[0.03]"
            style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        />
        <div
            className="absolute inset-0 opacity-[0.02] sm:opacity-[0.025] md:opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='1'/%3E%3C/svg%3E")` }}
        />
        <div className="hidden md:block absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '10s' }} />
            <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move-down" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        </div>
        <div className="absolute top-0 left-4 sm:left-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[90px] md:blur-[100px]" />
        <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[90px] md:blur-[100px]" />
    </div>
));
AmbientBackground.displayName = 'AmbientBackground';

const InputGroup = memo(({ label, type, placeholder }) => (
    <motion.div variants={ITEM_VARIANTS} className="space-y-1.5 sm:space-y-2">
        <label className="font-mono text-cyan-500 uppercase tracking-wider ml-1" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
            {label}
        </label>
        <motion.input
            whileFocus={{ borderColor: "rgba(34,211,238,0.5)", backgroundColor: "rgba(34,211,238,0.05)" }}
            transition={{ duration: 0.2 }}
            type={type}
            required
            className="w-full bg-zinc-950/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none transition-all placeholder:text-gray-400 font-light min-h-[44px]"
            placeholder={placeholder}
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
        />
    </motion.div>
));
InputGroup.displayName = 'InputGroup';

const MotionTextArea = memo(({ label, placeholder }) => (
    <motion.div variants={ITEM_VARIANTS} className="space-y-1.5 sm:space-y-2">
        <label className="font-mono text-cyan-500 uppercase tracking-wider ml-1" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
            {label}
        </label>
        <motion.textarea
            whileFocus={{ borderColor: "rgba(34,211,238,0.5)", backgroundColor: "rgba(34,211,238,0.05)" }}
            transition={{ duration: 0.2 }}
            required
            rows={5}
            className="w-full bg-zinc-950/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none transition-all placeholder:text-gray-400 resize-none font-light"
            placeholder={placeholder}
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
        />
    </motion.div>
));
MotionTextArea.displayName = 'MotionTextArea';

const SocialLink = memo(({ href, icon, label }) => (
    <motion.a
        variants={SOCIAL_ITEM_VARIANTS}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.4)", color: "#22d3ee" }}
        whileTap={{ scale: 0.9 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 border border-white/5 transition-colors duration-300 min-w-[44px] min-h-[44px] touch-manipulation"
        aria-label={label}
        style={{ willChange: 'transform' }}
    >
        {icon}
    </motion.a>
));
SocialLink.displayName = 'SocialLink';

const ContactHeader = memo(() => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
    >
        <motion.div variants={ITEM_VARIANTS} className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm mb-4 sm:mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                Get in Touch
            </span>
        </motion.div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 md:gap-6">
            <motion.h2 variants={ITEM_VARIANTS} className="font-bold text-white tracking-tighter leading-[0.9]" style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}>
                Let's{" "}
                <span className="relative inline-block mt-1 sm:mt-2">
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400">
                        Connect.
                    </span>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[2px] sm:h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent origin-left"
                        style={{ willChange: 'transform' }}
                    />
                </span>
            </motion.h2>
            <motion.p variants={ITEM_VARIANTS} className="text-zinc-400 max-w-xl leading-relaxed font-light" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>
                Ready to build something extraordinary? Whether it's a potential collaboration or a technical query, <span className="text-cyan-400 font-medium">I'm just a message away</span>.
            </motion.p>
        </div>
    </motion.div>
));
ContactHeader.displayName = 'ContactHeader';

const ContactInfo = memo(({ phoneHref, emailHref }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="space-y-8 sm:space-y-10"
    >
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <motion.h3 variants={ITEM_VARIANTS} className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)' }}>
                Got a project in mind?
            </motion.h3>
            <motion.p variants={ITEM_VARIANTS} className="text-zinc-400 leading-relaxed font-light" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>
                I'm currently open to new opportunities and collaborations. Whether you have a question, a proposal, or just want to say hi, feel free to reach out.
            </motion.p>
            <motion.div variants={ITEM_VARIANTS} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-400 font-mono uppercase tracking-wide" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                    Available for Work
                </span>
            </motion.div>
        </div>

        <div className="space-y-3 sm:space-y-4">
            <motion.h4 variants={ITEM_VARIANTS} className="font-mono text-zinc-500 uppercase tracking-widest" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                Socials
            </motion.h4>
            <motion.div variants={CONTAINER_VARIANTS} className="flex flex-wrap gap-3 sm:gap-4">
                <SocialLink href={SOCIAL_LINKS.GITHUB} icon={<FaGithub size={18} />} label="Github" />
                <SocialLink href={SOCIAL_LINKS.LINKEDIN} icon={<FaLinkedin size={18} />} label="LinkedIn" />
                <SocialLink href={SOCIAL_LINKS.INSTAGRAM} icon={<FaInstagram size={18} />} label="Instagram" />
                <SocialLink href={SOCIAL_LINKS.WHATSAPP} icon={<FaWhatsapp size={18} />} label="WhatsApp" />
                <SocialLink href={emailHref} icon={<FaEnvelope size={18} />} label="Email" />
                <SocialLink href={phoneHref} icon={<FaPhone size={18} />} label="Phone" />
            </motion.div>
        </div>
    </motion.div>
));
ContactInfo.displayName = 'ContactInfo';

const ContactForm = memo(({ onSubmit, sending, status }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={CONTAINER_VARIANTS}
        className="bg-cyan-950/10 backdrop-blur-md p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/5 shadow-2xl relative"
    >
        <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl sm:rounded-tr-2xl" />
        </div>
        <div className="absolute bottom-0 left-0 p-3 sm:p-4 opacity-50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl sm:rounded-bl-2xl" />
        </div>

        <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <InputGroup label="Name" type="text" placeholder="John Doe" />
                <InputGroup label="Email" type="email" placeholder="john@example.com" />
            </div>
            <MotionTextArea label="Message" placeholder="Tell me about your project..." />

            <motion.button
                variants={ITEM_VARIANTS}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className={`w-full py-3 sm:py-3.5 md:py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 sm:gap-3 overflow-hidden relative group border border-transparent min-h-[48px] touch-manipulation ${status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20 cursor-default' : 'bg-white hover:bg-cyan-800 text-zinc-950'}`}
                style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', willChange: 'transform' }}
            >
                {status !== 'success' && (
                    <span className="absolute inset-0 w-0 bg-cyan-950 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                )}

                <span className="relative z-10 flex items-center gap-2 sm:gap-3 group-hover:text-white transition-colors duration-300">
                    {sending ? (
                        <FaSpinner className="animate-spin text-base sm:text-lg" />
                    ) : status === 'success' ? (
                        <>Message Sent <span className="text-lg sm:text-xl">✓</span></>
                    ) : (
                        <>
                            Send Transmission <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-sm sm:text-base" />
                        </>
                    )}
                </span>
            </motion.button>
        </form>
    </motion.div>
));
ContactForm.displayName = 'ContactForm';

const Contact = () => {
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setStatus('success');
            setTimeout(() => setStatus(null), 3000);
        }, 1500);
    }, []);

    const phoneHref = useMemo(() => `tel:${PROFILE.CONTACT.phone.replace(/ /g, '')}`, []);
    const emailHref = useMemo(() => `mailto:${PROFILE.CONTACT.email}`, []);

    return (
        <section id="contact" className="py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 2xl:py-48 bg-[#050a0f] relative overflow-hidden">
            <AmbientBackground />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
                <ContactHeader />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
                    <ContactInfo phoneHref={phoneHref} emailHref={emailHref} />
                    <ContactForm onSubmit={handleSubmit} sending={sending} status={status} />
                </div>
            </div>
        </section>
    );
};

export default Contact;
