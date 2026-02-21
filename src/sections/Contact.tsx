import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { SendHorizonalIcon, ArrowUpRight, Copy } from 'lucide-react';
import { SECTIONS } from '../utils/constants';
import { SOCIALS, contacts } from '../utils/contact';
import { Button } from '../components/shared/Button';

export function Contact() {
    const [emailCopied, setEmailCopied] = useState(false);
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [sendState, setSendState] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setSendState('sending');

        setTimeout(() => {
            setSendState('success');
            setTimeout(() => setSendState('idle'), 2000);
        }, 1500);
    };

    const handleCopy = async (text: string, type: 'email' | 'phone') => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            if (type === 'email') {
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
            } else {
                setPhoneCopied(true);
                setTimeout(() => setPhoneCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <section id={SECTIONS.CONTACT} className="relative bg-background border-y py-20 lg:py-28">
            <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-0 ">

                {/* ─── LEFT SIDE: Sticky Hub ─────────────────────────── */}
                <div className="lg:w-1/3  flex flex-col justify-start overflow-hidden ">
                    <motion.div
                        className="space-y-10 relative z-10  flex flex-col justify-start"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={leftPanelVariants}
                    >
                        <motion.h2
                            variants={headerVariants}
                            className="text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase tracking-tighter leading-none italic"
                        >
                            <span className="text-muted-foreground font-regular not-italic">His </span>Connection <span className="group">Points<span className="group-hover:text-red-800">.</span></span>   </motion.h2>

                        <div className="space-y-6 lg:space-y-10">
                            <motion.div variants={fadeInUp} className="flex flex-row w-full items-center justify-between lg:justify-start lg:flex-col lg:items-start group cursor-default">
                                <p className="text-xs md:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Email_Address</p>
                                <div className="flex items-center justify-between text-sm xl:text-xl font-black tracking-tight group/email gap-4 lg:w-full lg:pt-1">
                                    <a href={contacts.EMAIL.href} className="hover:text-primary transition-colors truncate">
                                        {contacts.EMAIL.value}
                                    </a>
                                    <button
                                        onClick={() => handleCopy(contacts.EMAIL.value, 'email')}
                                        className={`hidden lg:flex items-center gap-1.5 px-2 py-1.5 border transition-all rounded cursor-pointer active:scale-95 ${emailCopied
                                            ? 'bg-primary/20 border-primary/40 opacity-100'
                                            : 'bg-accent/30 border-border/20 opacity-0 group-hover/email:opacity-100 hover:border-primary/40'
                                            }`}
                                    >
                                        <Copy size={10} className={emailCopied ? 'text-primary/80' : 'text-primary/40'} />
                                        <span className={`font-mono font-black text-[8px] 2xl:text-xs uppercase tracking-widest ${emailCopied ? 'text-primary/80' : 'text-muted-foreground'}`}>
                                            {emailCopied ? 'Copied' : 'Copy'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-row w-full items-center justify-between lg:justify-start lg:flex-col lg:items-start group cursor-default">
                                <p className="text-xs md:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Voice_Line</p>
                                <div className="flex items-center justify-between text-sm xl:text-xl font-black tracking-tight group/phone gap-4 lg:w-full lg:pt-1">
                                    <a href={contacts.PHONE_NUMBER.href} className="hover:text-primary transition-colors truncate">
                                        {contacts.PHONE_NUMBER.value}
                                    </a>
                                    <button
                                        onClick={() => handleCopy(contacts.PHONE_NUMBER.value, 'phone')}
                                        className={`hidden lg:flex items-center gap-1.5 px-2 py-1.5 border transition-all rounded cursor-pointer active:scale-95 ${phoneCopied
                                            ? 'bg-primary/20 border-primary/40 opacity-100'
                                            : 'bg-accent/30 border-border/20 opacity-0 group-hover/phone:opacity-100 hover:border-primary/40'
                                            }`}
                                    >
                                        <Copy size={10} className={phoneCopied ? 'text-primary/80' : 'text-primary/40'} />
                                        <span className={`font-mono font-black text-[8px] 2xl:text-xs uppercase tracking-widest ${phoneCopied ? 'text-primary/80' : 'text-muted-foreground'}`}>
                                            {phoneCopied ? 'Copied' : 'Copy'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className=" flex flex-row justify-between items-center space-x-4 lg:flex-col lg:items-start lg:space-y-4">
                                <p className="text-xs md:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Network<span className="hidden md:inline">_Nodes</span></p>
                                <div className="flex flex-row lg:flex-col ">
                                    {Object.values(SOCIALS).map((social, index) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center lg:gap-3 text-sm 2xl:text-xl font-black  tracking-tight group/phone  ">
                                            <ArrowUpRight size={14} className="hidden lg:block text-primary/20 group-hover:text-primary transition-colors" />
                                            <span className="lg:text-primary/50 group-hover:text-primary transition-colors">{social.label}</span>
                                            {index !== Object.values(SOCIALS).length - 1 && <span className={`lg:hidden block text-primary/50 px-2`}>|</span>}

                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>


                        {/* System Status */}
                        <motion.div variants={fadeInUp} className='border-y py-4'>
                            <div className="flex items-center gap-2.5">
                                <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Looking for new opportunities.</p>

                            </div>
                            <div className=" flex items-center gap-2.5">
                                <p className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Open to connect | Listening for signals.</p>

                            </div>
                        </motion.div>
                    </motion.div>


                </div>

                {/* ─── RIGHT SIDE: Scrolling Connection ─────────────────────── */}
                <div className="lg:w-2/3 flex flex-col justify-center items-stretch  lg:pl-12 2xl:pl-20 3xl:pl-32 relative lg:border-l lg:border-primary/10">
                    <motion.div
                        className="relative z-10 w-full h-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%", amount: 0.45 }}
                        variants={entryVariants}
                    >

                        {/* Transmission Form */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black uppercase tracking-tighter italic">Connect & <span className="text-primary">Discuss</span></h3>
                                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                                    Drop a message to start the conversation. <br /> He&apos;ll get back to you shortly.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSend}
                                className="space-y-4 lg:space-y-8 bg-muted/50 p-4 lg:p-8 xl:p-6 2xl:p-8 border border-primary/10 rounded relative overflow-hidden group/form ">

                                <motion.div variants={itemVariants} className="space-y-3 group/input">
                                    <label htmlFor="name" className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-secondary border border-accent focus:border-accent focus:bg-background px-3 lg:px-6 xl:px-4 2xl:px-6 py-2 lg:py-4 xl:py-2 2xl:py-4 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground rounded mt-2"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants} className="space-y-3 group/input">
                                    <label htmlFor="email" className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-secondary border border-accent focus:border-accent focus:bg-background px-3 lg:px-6 xl:px-4 2xl:px-6 py-2 lg:py-4 xl:py-2 2xl:py-4  text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground rounded mt-2"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants} className="space-y-3 group/input">
                                    <label htmlFor="message" className="text-xs xl:text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Start typing your message..."
                                        className="w-full bg-secondary border border-accent focus:border-accent focus:bg-background px-3 lg:px-6 xl:px-4 2xl:px-6 py-2 lg:py-4 xl:py-2 2xl:py-4 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground  focus:placeholder:text-muted-foreground/20 rounded mt-2"
                                    />
                                </motion.div>
                                <hr className="border-primary/10 my-5" />
                                <div className="">
                                    <Button
                                        type="submit"
                                        disabled={sendState !== 'idle'}
                                        className="group/btn relative w-full 2xl:h-12 h-10 bg-primary/5 border border-primary/10 shadow-none text-foreground rounded overflow-hidden transition-all hover:bg-accent active:scale-[0.99] flex items-center justify-center"
                                    >
                                        {/* Background Scanline Pulse during sending */}
                                        <AnimatePresence>
                                            {sendState === 'sending' && (
                                                <motion.div
                                                    initial={{ left: '-40%' }}
                                                    animate={{ left: '100%' }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-y-0 w-32  -skew-x-12 z-0 flex items-center justify-center"
                                                >
                                                    <SendHorizonalIcon size={16} className="text-primary/80" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <AnimatePresence mode="wait">
                                            {sendState === 'success' ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    className="relative z-10 flex items-center justify-center gap-3"
                                                >
                                                    <span className="font-mono font-black uppercase tracking-[0.3em] text-[11px] text-primary space-x-2">
                                                        <span>[</span>
                                                        <span>Sent</span>
                                                        <span>Successfully</span>
                                                        <span>]</span>
                                                    </span>
                                                </motion.div>
                                            ) : sendState === 'sending' ? (
                                                <motion.div
                                                    key="sending"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="relative z-10 flex items-center justify-center gap-3"
                                                >
                                                    <span className="font-mono font-black uppercase tracking-[0.3em] text-[11px] text-primary space-x-2">
                                                        <span>[</span>
                                                        <span>Sending Transmission...</span>
                                                        <span>]</span>
                                                    </span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{
                                                        x: 150,
                                                        opacity: 0,
                                                        skewX: -20,
                                                        transition: { duration: 0.3, ease: "anticipate" }
                                                    }}
                                                    className="relative z-10 flex items-center justify-center gap-3"
                                                >
                                                    <span className="font-mono font-black uppercase tracking-[0.3em] text-[11px]">Reach Out To Him</span>
                                                    <SendHorizonalIcon size={16} className="text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>

                                </div>
                            </form>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Shared Variants (Sync with Experience.tsx) ───────────────────────────
const leftPanelVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4
        }
    }
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};


const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const entryVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2,
            duration: 0.6,
            ease: "easeOut",
            delay: 0.4
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};