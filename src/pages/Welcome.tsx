import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};
const spanItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.1,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};


interface WelcomeProps {
    setWelcomeRendered: (val: boolean) => void;
}

export default function Welcome({ setWelcomeRendered }: WelcomeProps) {
    const handleContinue = () => {
        setTimeout(() => {
            setWelcomeRendered(true);
        }, 10000000);
    };

    return (
        <main
            onClick={handleContinue}
            className="h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary selection:text-white cursor-pointer group"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-2xl px-6 mb-32"
            >
                {/* The "Voice" of System-Zero */}
                <div className="space-y-4">
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none "
                    >
                        Hi.
                    </motion.h1>
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic"
                    >
                        I am  Budra's
                    </motion.h1>
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic"
                    >
                        Portfolio
                    </motion.h1>

                    <p className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto "
                    >
                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto"
                        >
                            I am here {" "}
                        </motion.span>
                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto"
                        >
                            to  narrate {" "}
                        </motion.span>
                        <br />
                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto"
                        >
                            about him
                        </motion.span>
                        <motion.span
                            variants={spanItemVariants}
                            onAnimationComplete={window.innerWidth >= 1024 ? handleContinue : undefined}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto"
                        >
                            .
                        </motion.span>

                    </p>

                    <div className='lg:hidden pt-20'>
                        <motion.p
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto">
                            Note:

                        </motion.p>

                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto">
                            I am best experienced on a<br />
                        </motion.span>
                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-bold text-primary tracking-widest uppercase leading-relaxed max-w-md mx-auto">
                            desktop device.<br />
                        </motion.span>
                        <motion.span
                            variants={spanItemVariants}
                            className="text-sm md:text-base font-mono font-medium text-muted-foreground/80 tracking-widest uppercase leading-relaxed max-w-md mx-auto">

                            Some UI elements have been adjusted for this mobile environment.
                        </motion.span>
                    </div>
                </div>


            </motion.div>
        </main>
    );
}
