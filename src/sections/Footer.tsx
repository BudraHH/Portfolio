import { ArrowUp } from 'lucide-react';
import { SOCIALS, CONTACTS } from '../utils/contact';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-background border-t border-primary/5 py-12 overflow-hidden">
            {/* Ambient System Grid - Kept extremely subtle */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="max-w-[1800px]relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* ─── LEFT SIDE: Identity ─────────────────────────── */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-6 w-1/4 md:w-1/6">
                                <div
                                    onClick={() => scrollToTop()}
                                    className="group flex items-baseline gap-0.5 font-bold tracking-tight text-lg cursor-pointer"
                                >
                                    Budra
                                    <div className="h-2 w-2 rounded-full bg-primary transition-all group-hover:bg-red-800" />
                                </div>
                            </div>
                            <p className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-widest leading-relaxed max-w-sm">
                                Designing and building digital experiences with a focus on simplicity and quality.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">Handcrafted_With</span>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                <span>React</span>
                                <span>TypeScript</span>
                                <span>Framer Motion</span>
                                <span>Tailwind</span>
                            </div>
                        </div>
                    </div>

                    {/* ─── RIGHT SIDE: Connect ─────────────────────── */}
                    <div className="flex flex-col items-start lg:items-end justify-between gap-10">
                        <div className="space-y-4 w-full flex flex-col items-start lg:items-end">
                            <p className="text-xs font-mono font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">Connection_Links</p>
                            <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-4 justify-start lg:justify-end">
                                {Object.values(SOCIALS).map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-all flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                        {social.label}
                                    </a>
                                ))}
                                <a
                                    href={CONTACTS.RESUME.href}
                                    download
                                    className="group text-xs font-black uppercase tracking-widest text-primary hover:text-foreground transition-all flex items-center gap-2"
                                >
                                    <span className="h-[1px] w-3 bg-primary/40 group-hover:w-5 transition-all" />
                                    Resume
                                </a>
                            </div>
                        </div>

                      
                    </div>
                </div>

                {/* ─── BOTTOM BAR ───────────────────────── */}
                <div className=" pt-4 mt-4   border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] order-2 md:order-1">
                        © {currentYear} HARI HARA BUDRA. ALL RIGHTS RESERVED.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 transition-all order-1 md:order-2 cursor-pointer"
                    >
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/40 group-hover:text-primary transition-colors">Return_to_Top</span>
                        <div className="w-8 h-8 flex items-center justify-center border border-primary/5 rounded-full group-hover:border-primary/20 transition-all">
                            <ArrowUp size={14} className="text-muted-foreground/40 group-hover:text-primary transition-transform group-hover:-translate-y-0.5" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}
