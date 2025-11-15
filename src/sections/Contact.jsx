import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp, FaSms } from 'react-icons/fa';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';

const spinnerFrames = ["|", "/", "-", "\\"];

const CONTACT_INFO = {
    email: 'hariharabudra@gmail.com',
    phone: '+91 7397 509 844',
    phoneRaw: '+917397509844',
    location: 'Chennai, Tamil Nadu, India',
    social: [
        { icon: FaGithub, label: 'GitHub', url: 'https://github.com/BudraHH', username: '@BudraHH'},
        { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/hari-hara-budra/', username: 'Hari Hara Budra'},
    ]
};

// Memoized terminal line component
const TerminalLine = memo(({ line, spinnerFrame }) => {
    if (!line || typeof line !== "string") return null;

    if (line.startsWith("$")) return <div className="text-cyan-300 mb-1">{line}</div>;
    if (line.startsWith("✓")) return <div className="text-green-400 mb-1">{line}</div>;
    if (line.startsWith("[")) {
        return (
            <div className="text-cyan-400 flex items-center gap-2 mb-1">
                <span>{spinnerFrame}</span>
                {line}
            </div>
        );
    }
    return <div className="text-cyan-200 mb-1">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

// Memoized contact method component
const ContactMethod = memo(({ icon: Icon, title, subtitle, value, linkHref, onCopy, copied, type }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="group"
    >
        <div className="flex items-center gap-2 xs:gap-3 mb-2">
            <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform flex-shrink-0">
                <Icon className="text-cyan-300 text-xs xs:text-sm" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-cyan-100 font-semibold text-xs xs:text-sm truncate">{title}</h3>
                <p className="text-cyan-400/60 text-[9px] xs:text-[10px] truncate">{subtitle}</p>
            </div>
        </div>
        <div className=" flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-1.5 xs:p-2 group-hover:border-cyan-500/30 transition-colors">
            <a href={linkHref} className="text-cyan-300 hover:text-cyan-200 text-[10px] xs:text-xs font-mono truncate flex-1 min-w-0">
                {value}
            </a>
            {onCopy && (
                <button
                    onClick={() => onCopy(value, type)}
                    className="ml-2 px-1.5 xs:px-2 py-0.5 xs:py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded text-[9px] xs:text-[10px] text-cyan-300 transition-all flex-shrink-0"
                >
                    {copied === type ? '✓' : 'Copy'}
                </button>
            )}
        </div>
    </motion.div>
));

ContactMethod.displayName = 'ContactMethod';

export default function Contact({pid}) {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [copied, setCopied] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [emailError, setEmailError] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const spinnerFrame = useMemo(() => spinnerFrames[spinnerStep], [spinnerStep]);

    const terminalLines = useMemo(() => [
        "$ bash get-in-touch.sh --initialize",
        "Loading contact information...",
        `PID: ${pid}`,
        "[1/3] Fetching contact methods...",
        "[2/3] Validating social links...",
        "[3/3] Preparing contact form...",
        "✓ Contact module loaded successfully",
        "",
    ], []);

    // Spinner effect
    useEffect(() => {
        if (!isLoading) return;
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % 4), 70);
        return () => clearInterval(spinner);
    }, [isLoading]);

    // Terminal output animation
    useEffect(() => {
        let idx = 0;
        setOutput([]);
        setIsLoading(true);
        setShowContent(false);

        const interval = setInterval(() => {
            setOutput(prev => [...prev, terminalLines[idx]]);
            idx++;
            if (idx === terminalLines.length) {
                setTimeout(() => {
                    setIsLoading(false);
                    setShowContent(true);
                }, 400);
                clearInterval(interval);
            }
        }, 250);

        return () => clearInterval(interval);
    }, [terminalLines]);

    const handleCopy = useCallback((text, type) => {
        const copyText = type === 'phone' ? CONTACT_INFO.phoneRaw : text;
        navigator.clipboard.writeText(copyText);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    }, []);

    const validateEmail = useCallback((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const handleEmailChange = useCallback((e) => {
        const email = e.target.value;
        setFormData(prev => ({ ...prev, email }));
        setEmailError(email && !validateEmail(email) ? 'Please enter a valid email address' : '');
    }, [validateEmail]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setShowOptions(true);
    }, [formData.email, validateEmail]);

    const resetForm = useCallback(() => {
        setFormData({ name: '', email: '', message: '' });
        setEmailError('');
    }, []);

    const sendViaWhatsApp = useCallback(() => {
        const message = `Hi! I'm ${formData.name}\n\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.open(`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`, '_blank');
        setShowOptions(false);
        resetForm();
    }, [formData, resetForm]);

    const sendViaSMS = useCallback(() => {
        const message = `Hi! I'm ${formData.name} (${formData.email}). ${formData.message}`;
        window.location.href = `sms:${CONTACT_INFO.phoneRaw}?body=${encodeURIComponent(message)}`;
        setShowOptions(false);
        resetForm();
    }, [formData, resetForm]);

    const sendViaEmail = useCallback(() => {
        const subject = `Message from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setShowOptions(false);
        resetForm();
    }, [formData, resetForm]);

    return (
        <section className="w-full h-full flex flex-col justify-center items-start
            relative ">

            <div className="relative w-full h-full
                rounded-lg xs:rounded-xl sm:rounded-2xl
                overflow-hidden font-mono text-white
                bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                backdrop-blur-[24px] backdrop-brightness-75
                border border-cyan-500/20
                transition-transform duration-500">

                {/* Header */}
                <div className="flex items-center gap-1.5 xs:gap-2
                    px-2 xs:px-3 sm:px-4
                    py-2 xs:py-2.5 sm:py-3
                    bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                    border-b border-cyan-500/20">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                    <span className="ml-2 xs:ml-3 text-[10px] xs:text-xs sm:text-sm text-cyan-400/70 select-none tracking-wide truncate">
                        get-in-touch.sh - Get in Touch [PID: {pid}]
                    </span>
                </div>

                {/* Content Area */}
                <div className="relative z-10 h-[calc(100%-2.5rem)] xs:h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)] flex flex-col">
                    {/* Loading Terminal */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: showContent ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`${showContent ? 'hidden' : 'flex flex-col h-full'}`}
                    >
                        <div className="flex-1 overflow-y-auto px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-xs xs:text-sm leading-relaxed text-cyan-100/75">
                            {output.map((line, idx) => (
                                <TerminalLine key={idx} line={line} spinnerFrame={spinnerFrame} />
                            ))}
                        </div>
                        {!isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="border-t border-cyan-500/20 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 bg-[#08141b]/50 backdrop-blur-sm"
                            >
                                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between text-[10px] xs:text-xs gap-1 xs:gap-0">
                                    <span className="text-green-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-400 animate-pulse" />
                                        Contact module ready (exit code 0)
                                    </span>
                                    <span className="text-cyan-300/80">Elapsed time: 0.9s</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Split View */}
                    {showContent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col md:flex-row h-full"
                        >
                            {/* Left Panel - Contact Info */}
                            <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-cyan-500/20 bg-gradient-to-br from-cyan-800/10 to-cyan-950/10 flex flex-col ">
                                {/* Header */}
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-cyan-500/20">
                                    <motion.code
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 xs:mb-2 block"
                                    >
                                        Let's Connect
                                    </motion.code>
                                    <p className="text-cyan-400/70 text-[10px] xs:text-xs">Feel free to reach out for collaborations or opportunities</p>
                                </div>

                                {/* Contact Methods */}
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 space-y-3 xs:space-y-4">
                                    <ContactMethod
                                        icon={FaEnvelope}
                                        title="Email"
                                        subtitle="Drop me a message"
                                        value={CONTACT_INFO.email}
                                        linkHref={`mailto:${CONTACT_INFO.email}`}
                                        onCopy={handleCopy}
                                        copied={copied}
                                        type="email"
                                    />

                                    <ContactMethod
                                        icon={FaPhone}
                                        title="Phone"
                                        subtitle="Call or text"
                                        value={CONTACT_INFO.phone}
                                        linkHref={`tel:${CONTACT_INFO.phoneRaw}`}
                                        onCopy={handleCopy}
                                        copied={copied}
                                        type="phone"
                                    />

                                    {/* Location */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="group"
                                    >
                                        <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg group-hover:border-cyan-500/30 transition-colors">
                                            <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform flex-shrink-0">
                                                <FaMapMarkerAlt className="text-cyan-300 text-xs xs:text-sm" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-cyan-100 font-semibold text-xs xs:text-sm">Location</h3>
                                                <p className="text-cyan-300/80 text-[10px] xs:text-xs font-mono truncate">{CONTACT_INFO.location}</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-4 xs:my-5 sm:my-6" />

                                    {/* Social Links */}
                                    <div>
                                        <h3 className="text-cyan-300 font-semibold mb-2 xs:mb-3 text-[10px] xs:text-xs uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1 h-3 xs:h-4 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" />
                                            Social Links
                                        </h3>
                                        <div className="space-y-1.5 xs:space-y-2">
                                            {CONTACT_INFO.social.map((social, idx) => {
                                                const Icon = social.icon;
                                                return (
                                                    <motion.a
                                                        key={idx}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.6 + idx * 0.1 }}
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="group flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/30 rounded-lg transition-all touch-manipulation"
                                                    >
                                                        <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-900/5 backdrop-blur-2xl border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                                            <Icon className="text-cyan-300 text-base xs:text-lg sm:text-xl" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-cyan-100 font-semibold text-xs xs:text-sm truncate">{social.label}</h4>
                                                            <p className="text-cyan-400/60 text-[9px] xs:text-[10px] font-mono truncate">{social.username}</p>
                                                        </div>
                                                    </motion.a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Contact Form */}
                            <div className="w-full flex justify-center items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="w-full p-4 xs:p-5 sm:p-6 md:p-8"
                                >
                                    <div className="max-w-xl mx-auto">
                                        <h3 className="text-xl xs:text-2xl font-bold text-cyan-100 mb-1 xs:mb-2">Send a Message</h3>
                                        <p className="text-cyan-400/70 text-xs xs:text-sm mb-6 xs:mb-8">I'll get back to you as soon as possible</p>

                                        <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
                                            {/* Name */}
                                            <div>
                                                <label className="block text-cyan-300 text-xs xs:text-sm font-semibold mb-1.5 xs:mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full px-3 xs:px-4 py-2 xs:py-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg
                                                        text-cyan-100 placeholder-cyan-400/30 text-xs xs:text-sm
                                                        focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/10 transition-all"
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-cyan-300 text-xs xs:text-sm font-semibold mb-1.5 xs:mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleEmailChange}
                                                    className={`w-full px-3 xs:px-4 py-2 xs:py-3 bg-cyan-500/5 border rounded-lg
                                                        text-cyan-100 placeholder-cyan-400/30 text-xs xs:text-sm
                                                        focus:outline-none focus:bg-cyan-500/10 transition-all ${
                                                        emailError
                                                            ? 'border-red-500/50 focus:border-red-400/50'
                                                            : 'border-cyan-500/20 focus:border-cyan-400/50'
                                                    }`}
                                                    placeholder="your.email@example.com"
                                                    required
                                                />
                                                {emailError && <p className="text-red-400 text-[10px] xs:text-xs mt-1">{emailError}</p>}
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label className="block text-cyan-300 text-xs xs:text-sm font-semibold mb-1.5 xs:mb-2">Message</label>
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                    rows="5"
                                                    className="w-full px-3 xs:px-4 py-2 xs:py-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg
                                                        text-cyan-100 placeholder-cyan-400/30 text-xs xs:text-sm
                                                        focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/10 transition-all resize-none"
                                                    placeholder="Your message..."
                                                    required
                                                />
                                            </div>

                                            {/* Submit */}
                                            <motion.button
                                                type="submit"
                                                whileTap={{ scale: 0.98 }}
                                                disabled={!!emailError}
                                                className={`w-full py-2.5 xs:py-3 px-4 xs:px-6 rounded-lg
                                                    text-cyan-100 font-semibold text-xs xs:text-sm
                                                    transition-all flex items-center justify-center gap-2
                                                    touch-manipulation ${emailError
                                                    ? 'bg-gray-500/20 border border-gray-500/30 cursor-not-allowed opacity-50'
                                                    : 'bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/50 hover:from-cyan-500/30 hover:to-cyan-600/30 hover:border-cyan-400/70'
                                                }`}
                                            >
                                                <FaPaperPlane className="text-[10px] xs:text-xs" />
                                                Send Message
                                            </motion.button>
                                        </form>

                                        {/* Send Options Modal */}
                                        <AnimatePresence>
                                            {showOptions && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                                    onClick={() => setShowOptions(false)}
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.9, opacity: 0 }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="bg-[#0d202c] border border-cyan-500/30 rounded-xl xs:rounded-2xl p-5 xs:p-6 sm:p-8 max-w-md w-full shadow-2xl"
                                                    >
                                                        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-cyan-100 mb-2 xs:mb-3 sm:mb-4">Choose Send Method</h3>
                                                        <p className="text-cyan-400/70 text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6">Select how you'd like to send your message</p>

                                                        <div className="space-y-2 xs:space-y-3">
                                                            <button
                                                                onClick={sendViaWhatsApp}
                                                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-green-500/10 border border-green-500/30 hover:border-green-400/50 rounded-lg xs:rounded-xl transition-all group touch-manipulation"
                                                            >
                                                                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                                                    <FaWhatsapp className="text-green-300 text-xl xs:text-2xl" />
                                                                </div>
                                                                <div className="text-left flex-1 min-w-0">
                                                                    <h4 className="text-cyan-100 font-semibold text-sm xs:text-base truncate">WhatsApp</h4>
                                                                    <p className="text-cyan-400/60 text-xs truncate">Send via WhatsApp</p>
                                                                </div>
                                                            </button>

                                                            <button
                                                                onClick={sendViaSMS}
                                                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-blue-500/10 border border-blue-500/30 hover:border-blue-400/50 rounded-lg xs:rounded-xl transition-all group touch-manipulation"
                                                            >
                                                                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                                                    <FaSms className="text-blue-300 text-xl xs:text-2xl" />
                                                                </div>
                                                                <div className="text-left flex-1 min-w-0">
                                                                    <h4 className="text-cyan-100 font-semibold text-sm xs:text-base truncate">SMS</h4>
                                                                    <p className="text-cyan-400/60 text-xs truncate">Send via text message</p>
                                                                </div>
                                                            </button>

                                                            <button
                                                                onClick={sendViaEmail}
                                                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg xs:rounded-xl transition-all group touch-manipulation"
                                                            >
                                                                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                                                    <FaEnvelope className="text-cyan-300 text-xl xs:text-2xl" />
                                                                </div>
                                                                <div className="text-left flex-1 min-w-0">
                                                                    <h4 className="text-cyan-100 font-semibold text-sm xs:text-base truncate">Email</h4>
                                                                    <p className="text-cyan-400/60 text-xs truncate">Send via email client</p>
                                                                </div>
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => setShowOptions(false)}
                                                            className="w-full mt-3 xs:mt-4 py-2 text-cyan-400 hover:text-cyan-300 text-xs xs:text-sm transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Visual overlays - Combined */}
                <div className="absolute inset-0 pointer-events-none
                    bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_2px)]
                    ring-1 ring-cyan-400/10 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]
                    rounded-lg xs:rounded-xl sm:rounded-2xl mix-blend-overlay opacity-30" />
                <div className="absolute -inset-1 rounded-lg xs:rounded-xl sm:rounded-2xl bg-cyan-400/10 blur-2xl animate-pulse-slow pointer-events-none" />
            </div>
        </section>
    );
}
