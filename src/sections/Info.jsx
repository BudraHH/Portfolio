import {motion, useTransform} from "framer-motion";
import TypedText from "../components/TypedText.jsx";
import { skills } from "../utils/constants.js";
import {useEffect, useState, useCallback} from "react";

export default function Info({ scrollProgress }) {
    const [startTitleTyping, setStartTitleTyping] = useState(false);
    const [titleTypingComplete, setTitleTypingComplete] = useState(false);
    const [startDescriptionTyping, setStartDescriptionTyping] = useState(false);
    const [descriptionTypingComplete, setDescriptionTypingComplete] = useState(false);
    const [showCards, setShowCards] = useState(false);
    
    // Use scrollProgress to detect when Info section becomes visible (around 0.43-0.44)
    useEffect(() => {
        if (scrollProgress) {
            // Check current value first
            const currentValue = scrollProgress.get();
            if (currentValue >= 0.43 && !startTitleTyping) {
                setStartTitleTyping(true);
            }
            
            // Subscribe to changes
            const unsubscribe = scrollProgress.on("change", (latest) => {
                // Start title typing when scrollProgress reaches the visibility threshold
                if (latest >= 0.43 && !startTitleTyping) {
                    setStartTitleTyping(true);
                }
            });
            return () => unsubscribe();
        } else {
            // Fallback: start immediately if no scrollProgress
            if (!startTitleTyping) {
                setStartTitleTyping(true);
            }
        }
    }, [scrollProgress, startTitleTyping]);

    useEffect(() => {
        if (titleTypingComplete && !startDescriptionTyping) {
            // Start description typing after title is complete
            setStartDescriptionTyping(true);
        }
    }, [titleTypingComplete, startDescriptionTyping]);

    useEffect(() => {
        if (descriptionTypingComplete && !showCards) {
            // Show cards after description is complete
            setShowCards(true);
        }
    }, [descriptionTypingComplete, showCards]);

    // Stable callbacks for TypedText onComplete
    const handleTitleComplete = useCallback(() => {
        setTitleTypingComplete(true);
    }, []);

    const handleDescriptionComplete = useCallback(() => {
        setDescriptionTypingComplete(true);
    }, []);

    const visibility = scrollProgress
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useTransform(scrollProgress, [0.43, 0.44], ["hidden", "visible"])
        : "visible";

    return (
        <div className="w-full max-w-[79rem] p-16 min-h-[90vh] flex flex-col justify-center items-start relative">
            <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full"
            >
                <div
                    className="w-full border border-cyan-400/30 backdrop-blur-2xl bg-gradient-to-b from-white/10 via-cyan-400/5 to-transparent rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.1)] transition-all duration-500"
                >
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.15)_0%,transparent_80%)] pointer-events-none"></div>

                    {/* Top Accent Line */}
                    <motion.div
                        style={{
                            visibility: visibility,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-600 to-cyan-400 mb-10 rounded-full shadow-cyan-500/30"
                    />

                    {/* Heading - only render when startTitleTyping is true */}
                    {startTitleTyping && (
                        <motion.code
                            style={{
                                visibility: visibility,
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-8 select-text"
                        >
                            {"<"}
                            <TypedText
                                key="info-title-typed"
                                strings={["Info"]}
                                showCursor={false}
                                typeSpeed={30}
                                startDelay={300}
                                onComplete={handleTitleComplete}
                            />
                            {"/>"}
                        </motion.code>
                    )}

                    {/* Description - only render after title typing is complete */}
                    {titleTypingComplete && startDescriptionTyping && (
                        <motion.p
                            style={{
                                visibility: visibility,
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl whitespace-pre-line select-text"
                        >
                            <TypedText
                                key="info-description-typed"
                                strings={[
                                    `I'm a passionate full-stack developer specializing in React, Node.js, and modern web technologies.\nI focus on crafting smooth, performant, and delightful digital experiences — solving real problems through code and creativity.`,
                                ]}
                                showCursor={false}
                                typeSpeed={0}
                                onComplete={handleDescriptionComplete}
                            />
                        </motion.p>
                    )}

                    {/* Cards - only render after description typing is complete */}
                    {descriptionTypingComplete && showCards && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full"
                        >
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="w-full  flex items-center gap-4 p-4 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent hover:from-cyan-400/20 hover:to-cyan-400/5 shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all duration-300 cursor-default select-none"
                                >
                                    <span className="text-3xl text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
                                        {skill.icon}
                                    </span>
                                    <p className="text-gray-200 text-md md:text-base font-medium">{skill.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Bottom Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full shadow-cyan-500/30"
                    />
                </div>
            </motion.div>
        </div>
    );
}
