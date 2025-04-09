import React, {useEffect, useRef, useState} from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import {useInView, useReducedMotion} from "framer-motion";
import Typed from "typed.js";
import {FaInstagram} from "react-icons/fa6";

const DevContact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState('');
    const [showContactCommand, setShowContactCommand] = useState(false);
    const [showExecution, setShowExecution] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setStatusMessage('Transmitting message...');

        try {
            // Simulate an API call (replace with your actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate success
            setStatus('success');
            setStatusMessage('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus('error');
            setStatusMessage('Failed to send message. Please try again later.');
        }
    };

    const formInputClasses = "w-full px-4 py-2.5 rounded-md border border-gray-600/80 bg-gray-800/70 text-gray-200 text-sm font-sans placeholder:text-gray-500 caret-cyan-400 focus:outline-none focus:border-cyan-600/80 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 focus:bg-gray-800/90 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
    const devButtonBaseClasses = "inline-flex items-center gap-1.5 text-gray-400 border border-gray-600/80 px-2.5 py-1 rounded text-xs md:text-sm font-mono bg-gray-800/50 hover:text-cyan-300 hover:border-cyan-600/70 hover:bg-gray-700/60 active:bg-gray-600/50 active:scale-[0.98] active:shadow-inner transition-all duration-150 ease-in-out shadow-sm hover:shadow-md";
    const submitButtonDisabledClasses = "opacity-60 cursor-wait animate-pulse";
    const submitButtonHoverClasses = "hover:bg-cyan-700/80 hover:border-cyan-500/80 hover:text-white";
    const submitButtonBase = devButtonBaseClasses
        .split(' ')
        .filter(cls => !cls.startsWith('px-') && !cls.startsWith('py-') && !cls.startsWith('text-') && !cls.startsWith('md:text-') && !cls.startsWith('hover:'))
        .join(' ');
    const submitButtonClasses = `${submitButtonBase} w-full justify-center px-6 py-2.5 text-base ${submitButtonHoverClasses}`;



    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef(null);
    // Animate only once when it comes into view
    const isInView = useInView(containerRef, { once: true, amount: 0.8 });

    // --- Typed.js ---
    const typedContactRef = useRef(null);
    const typedMeRef = useRef(null);
    useEffect(() => {
        let typedContactInstance;
        let typedMeInstance;

        // Only run Typed.js when the component is in view
        if (isInView && typedContactRef.current && typedMeRef.current) {
            // Ensure text content is cleared before initializing
            typedContactRef.current.textContent = '';
            typedMeRef.current.textContent = '';

            typedContactInstance = new Typed(typedContactRef.current, {
                strings: ["DevContact"], // Changed first word
                typeSpeed: 70,
                startDelay: 400,
                showCursor: true,
                cursorChar: '_', // Underscore cursor for dev feel
                loop: false,
                onComplete: (self) => {
                    setTimeout(() => { if (self.cursor) self.cursor.style.opacity = '0'; }, 50);
                    // Chain the second Typed instance
                    typedMeInstance = new Typed(typedMeRef.current, {
                        strings: ["Me"],
                        typeSpeed: 70,
                        startDelay: 100,
                        showCursor: true,
                        cursorChar: '_',
                        loop: false,
                        onComplete: (self2) => {
                            // Keep cursor blinking at the end
                            setTimeout(() => { if (self2.cursor) self2.cursor.style.animation = 'blink 1s infinite'; }, 500);
                        },
                    });
                },
            });
        }

        // Cleanup function to destroy Typed instances on unmount or when isInView becomes false
        return () => {
            if (typedContactInstance) typedContactInstance.destroy();
            if (typedMeInstance) typedMeInstance.destroy();
        };
        // Rerun effect if isInView changes (specifically to true)
    }, [isInView]);





    const typedCdCommandRef = useRef(null);
    const typedContactCommandRef = useRef(null);

    const cdInstanceRef = useRef(null);
    const contactInstanceRef = useRef(null);

    useEffect(() => {
        if (isInView && typedCdCommandRef.current) {
            typedCdCommandRef.current.textContent = '';
            if (cdInstanceRef.current) cdInstanceRef.current.destroy();
            try {
                cdInstanceRef.current = new Typed(typedCdCommandRef.current, {
                    strings: ["cd ./DevContact"],
                    typeSpeed: 70,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '█',
                    loop: false,
                    onComplete: (self) => {
                        if (self.cursor) self.cursor.style.opacity = '0';
                        setTimeout(() => { setShowContactCommand(true); }, 100);
                    },
                });
            } catch (error) {
                console.error("Typed.js (cd command) error:", error);
                if (typedCdCommandRef.current) typedCdCommandRef.current.textContent = "cd ./DevContact";
                setTimeout(() => { setShowContactCommand(true); }, 100);
            }
        }
        return () => {
            if (cdInstanceRef.current) cdInstanceRef.current.destroy();
        };
    }, [isInView]);

    useEffect(() => {


        if (showContactCommand && isInView && typedContactCommandRef.current) {
            typedContactCommandRef.current.textContent = '';
            if (contactInstanceRef.current) contactInstanceRef.current.destroy();
            try {
                contactInstanceRef.current = new Typed(typedContactCommandRef.current, {
                    strings: ["contact --initiate --protocol=smtp --recipient=self"],
                    typeSpeed: 30,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '█',
                    loop: false,
                    onComplete: (self) => {
                        if (self.cursor) self.cursor.style.opacity = '0';
                        setShowExecution(true);
                        setTimeout(() => { setShowContent(true); }, 150);
                        // setTimeout(() => setShowExecutionComplete(true), 100);
                    },
                });
            } catch (error) {
                console.error("Typed.js (ls command) error:", error);
                if (typedContactCommandRef.current) typedContactCommandRef.current.textContent = "contact --initiate --protocol=smtp --recipient=self";
                setShowExecution(true);
                setTimeout(() => { setShowContent(true); }, 150);
                // setTimeout(() => setShowExecutionComplete(true), 100);
            }
        }
        return () => {
            if (contactInstanceRef.current) contactInstanceRef.current.destroy();

        };
    }, [showContactCommand, isInView]);


    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-24 md:py-32 bg-black text-gray-200 px-4 md:px-8 lg:px-16 relative overflow-hidden isolate"
        >

            {/* Content */}
            <div className="container mx-auto relative z-10">
                <h2 className={`container mx-auto relative mb-5 lg:text-xl font-mono`}>
                    [ <span ref={typedContactRef}></span><span ref={typedMeRef} className={`text-cyan-500`}></span> ]
                </h2>

                <div className={`container   mx-auto relative border border-white/10 border-b-transparent rounded-2xl`}>
                    <div className={`container mx-auto relative z-10 flex justify-start items-center  px-8 py-3  rounded-t-2xl border-b border-white/10 bg-slate-900`}>
                        <p className="font-mono text-sm lg:text-lg text-white mb-1">
                            <span className="">budrahh@portfolio</span><span className={`text-white`}>:~</span>
                        </p>
                    </div>

                    {/* Framed Content Area */}
                    <div className="relative min-h-[60vh]  bg-gray-800/50 backdrop-blur-md  rounded-b-2xl shadow-xl shadow-black/30 p-6 sm:p-8 md:p-10">
                        <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-700/20 via-purple-700/20 to-gray-800/10 blur-lg opacity-50"></div>

                        <div className="text-left mb-6 md:mb-10">
                            <p className="font-mono text-sm lg:text-lg text-white mb-1">
                                <span className="text-cyan-400">budrahh@portfolio</span><span className={`text-white`}>:</span><span className="text-green-400">~$</span> <span ref={typedCdCommandRef} className={`text-white`}></span></p>
                            {showContactCommand && (
                                <p className="font-mono text-sm lg:text-lg text-whitemb-1">
                                    <span className="text-cyan-400">budrahh@portfolio</span>:<span className="text-green-400">~/Contact$</span> <span ref={typedContactCommandRef} className={`text-white`}></span></p>

                            )}
                            {showExecution && (
                                <p className="text-sm md:text-lg font-bold font-mono tracking-tight text-white flex items-center justify-start gap-2">
                                    <span className="text-cyan-400">// Executing:</span>-------------------------
                                </p>
                            )}
                        </div>
                        {showContent && (
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">

                        {/* Column 1 & 2: DevContact Info & Socials */}
                        <div className="md:col-span-2 flex flex-col space-y-8">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold text-cyan-300 font-mono mb-4">// config.sys</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                                    System contact parameters loaded. Ready for connection. Use the provided channels or the direct message interface.
                                </p>
                                <div className="space-y-3 font-mono text-xs sm:text-sm">
                                    <div className="flex items-start gap-2 group hover:bg-gray-700/30 rounded px-2 py-1 -mx-2 transition-colors duration-200">
                                        <FaEnvelope className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                            <span className="text-gray-500">email:</span>
                                            <a href="mailto:hariharabudra@gmail.com" className="text-gray-300 hover:text-cyan-300 transition-colors break-all">hariharabudra@gmail.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 group hover:bg-gray-700/30 rounded px-2 py-1 -mx-2 transition-colors duration-200">
                                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                            <span className="text-gray-500">location:</span>
                                            <span className="text-gray-300">Tiruppur, Tamil Nadu, India</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold text-cyan-300 font-mono mb-4">// network.links</h3>
                                <div className="flex flex-wrap gap-3">
                                    <a href="https://github.com/BudraHH" target="_blank" rel="noopener noreferrer" className={`${devButtonBaseClasses} group`} aria-label="GitHub Profile">
                                        <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span>GitHub</span>
                                    </a>
                                    <a href="https://www.linkedin.com/in/hari-hara-budra/" target="_blank" rel="noopener noreferrer" className={`${devButtonBaseClasses} group`} aria-label="LinkedIn Profile">
                                        <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://www.instagram.com/your_instagram_username/" target="_blank" rel="noopener noreferrer" className={`${devButtonBaseClasses} group`} aria-label="Instagram Profile">
                                        <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span>Instagram</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Divider */}
                        <div className="hidden md:flex md:col-span-1 items-center justify-center">
                            <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-600/70 to-transparent"></div>
                        </div>

                        {/* Column 4 & 5: DevContact Form */}
                        <div className="md:col-span-2">
                            <h3 className="text-xl lg:text-2xl font-semibold text-cyan-300 font-mono mb-4">// message.send()</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-1.5">payload.<span className="text-cyan-400">name</span>:</label>
                                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} disabled={status === 'submitting'} className={formInputClasses} placeholder="'Your Name'" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-1.5">payload.<span className="text-cyan-400">email</span>:</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} disabled={status === 'submitting'} className={formInputClasses} placeholder="'your.address@provider.com'" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-mono text-gray-400 mb-1.5">payload.<span className="text-cyan-400">subject</span>:</label>
                                    <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} disabled={status === 'submitting'} className={formInputClasses} placeholder="'Project Inquiry'" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-1.5">payload.<span className="text-cyan-400">body</span>:</label>
                                    <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} disabled={status === 'submitting'} className={`${formInputClasses} scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent`} placeholder="`Type your message here...\nSupports multi-line input.`"></textarea>
                                </div>

                                <div className="pt-2 space-y-3">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className={`${submitButtonClasses} ${status === 'submitting' ? submitButtonDisabledClasses : ''}`}
                                    >
                                        {status === 'submitting' ? (
                                            <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                        Transmitting...
                                                    </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                        <FaPaperPlane className="w-4 h-4" />
                                                        Execute Send()
                                                    </span>
                                        )}
                                    </button>

                                    {status !== 'idle' && status !== 'submitting' && (
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono ${status === 'success' ? 'bg-green-900/40 border-green-700/50 text-green-300' : 'bg-red-900/40 border-red-700/50 text-red-300'}`}>
                                            {status === 'success' ? <FaCheckCircle className="w-3 h-3 shrink-0" /> : <FaExclamationTriangle className="w-3 h-3 shrink-0" />}
                                            <span>{statusMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevContact;