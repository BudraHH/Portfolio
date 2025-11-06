import { useState, useEffect } from "react";

export default function Welcome({ onComplete }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isExiting, setIsExiting] = useState(false);
    const fullText = "<Welcome to My Digital Canvas/>";
    const typingSpeed = 50;

    useEffect(() => {
        let index = 0;
        setTimeout(() => {
            const interval = setInterval(() => {
                if (index <= fullText.length) {
                    setDisplayedText(fullText.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, typingSpeed);
            return () => clearInterval(interval);
        }, 600);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                onComplete?.();
            }, 600);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 p-10 flex items-center justify-center bg-black pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-black to-black " />

            <div
                className={
                    "relative z-10 flex flex-col items-center justify-center w-full h-full rounded-2xl border border-cyan-500/20 backdrop-blur-lg bg-cyan-500/10 shadow-2xl hover:bg-cyan-500/20 transition-colors duration-300 animate-appear-scale " +
                    (isExiting ? "animate-welcome-exit" : "")
                }
            >
                {/* Main heading with typing effect */}
                <div className="space-y-4 text-center w-full max-w-lg">
                    <code className="text-cyan-400 text-6xl md:text-4xl font-mono tracking-tighter whitespace-pre-wrap">
                        {displayedText}
                        {displayedText.length < fullText.length && (
                            <span className="ml-1 text-cyan-400 animate-blink">|</span>
                        )}
                    </code>
                </div>

                {/* Loading indicator */}
                <div className="mt-12 flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full bg-cyan-600 animate-pulse-custom delay-[${i * 100}ms]`}
                        />
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes welcomeExit {
                    to { opacity: 0; transform: scale(5); }
                }
                .animate-welcome-exit {
                    animation: welcomeExit 0.2s cubic-bezier(.4,0,.2,1) forwards;
                }
            `}</style>
        </div>
    );
}
