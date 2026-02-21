import { motion, type Variants } from 'framer-motion';
import { SECTIONS } from '../utils/constants';
import { contacts } from '../utils/contact';
import { ArrowUpRight } from 'lucide-react';

// ─── Animation Variants ────────────────────────────────────────────────────────
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1],
        },
    },
};

// ─── SectionOne ───────────────────────────────────────────────────────────────
const SectionOne = () => {
    return (
        <div className="h-screen flex items-center border-r border-border bg-background ">
            <motion.div
                className="max-w-2xl space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <h1 className="lg:text-6xl xl:text-7xl 2xl:text-7xl 3xl:text-8xl font-black tracking-tighter leading-[0.9]"
                >
                    <motion.p
                        variants={itemVariants}
                    >
                        Building
                    </motion.p>
                    <motion.p
                        className="lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-black tracking-tighter leading-[0.9]"
                        variants={itemVariants}
                    >
                        <span className="text-muted-foreground font-thin">the Vision</span>
                    </motion.p>
                    <motion.p
                        className="lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-black group tracking-tighter leading-[0.9]"
                        variants={itemVariants}
                    >
                        One Pixel at a <br className='hidden xl:block 2xl:hidden' /><span className=''>Time<span className="group-hover:text-red-800">.</span></span>
                    </motion.p>
                </h1>

                <motion.p
                    className="ml-2 lg:text-sm xl:text-base 3xl:text-xl text-muted-foreground lg:max-w-md 3xl:max-w-xl leading-relaxed lg:border-l-2 3xl:border-l-4 border-primary pl-3 xl:pl-4 3xl:pl-6"
                    variants={itemVariants}
                >
                    Transforming complex problems into elegant, scalable digital solutions. Let's create something extraordinary.
                </motion.p>
                <motion.div
                    className="ml-2 flex items-center gap-8"
                    variants={itemVariants}
                >


                    {/* Scroll Hint */}
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                            Currently looking for opportunities.
                        </span>
                    </div>

                    <div className="h-px w-8 bg-border/40 hidden xl:block" />

                    {/* Minimal Resume Link */}
                    <a
                        href={contacts.RESUME.href}
                        download
                        className="hidden xl:flex items-center gap-2 group/res"
                    >
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/40 group-hover/res:text-primary transition-colors">
                            Download_CV
                        </span>
                        <ArrowUpRight size={12} className="text-muted-foreground/20 group-hover/res:text-primary transition-transform group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                    </a>
                </motion.div>
            </motion.div>
        </div>
    )
}

// ─── SectionTwo ───────────────────────────────────────────────────────────────
// Mouse-parallax on name: "Hari Hara" drifts toward cursor, "Budra" drifts away.
// A live coordinate HUD appears while mouse is over the section.
const SectionTwo = () => {
    return (
        <div className="h-screen flex items-center relative border-r border-border bg-background overflow-hidden group/s2 pb-24 2xl:pb-20">
            {/* Background Decorative Element - Dynamic Scale */}

            <motion.div
                className=" w-full max-w-5/6 3xl:max-w-full relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px", amount: 0.5 }}
            >
                <motion.p
                    className="text-lg xl:text-2xl 3xl:text-3xl font-medium text-muted-foreground tracking-tight flex items-center xl:mb-5"
                    variants={itemVariants}
                >
                    <span className="text-muted-foreground font-bold">Hey there,</span><span className="ml-1 text-primary font-bold">He is</span>
                    <span className="ml-2 h-0.5 flex-1 max-w-[30px] xl:max-w-[35px] bg-primary/30" />
                </motion.p>

                <motion.div
                    className="relative space-y-2 "
                    variants={itemVariants}
                >
                    <h2 className="text-7xl xl:text-8xl 3xl:text-9xl font-black tracking-tighter leading-[0.8] transition-all duration-700">
                        <span className="text-primary inline-block hover:translate-x-4 transition-transform duration-500 cursor-default">Hari Hara</span>{" "}<span className="group inline-block group-hover:translate-x-4 transition-transform duration-500 delay-75 cursor-default">Budra<span className="group-hover:text-red-800">.</span></span>
                    </h2>
                </motion.div>

                <motion.div
                    className="flex items-center lg:gap-4 xl:gap-8 max-w-5/6 mt-5 xl:mt-8"
                    variants={itemVariants}
                >
                    <div className="h-0.5 lg:w-8 bg-primary/50" />
                    <p className="lg:text-xl 3xl:text-4xl font-bold tracking-tight uppercase leading-none ">
                        Software Engineer <span className="text-primary/50">&</span><br /> Designer
                    </p>
                </motion.div>

                <motion.div
                    className="relative mt-5"
                    variants={itemVariants}
                >
                    <p className="text-sm xl:text-xl 3xl:text-2xl text-muted-foreground leading-tight max-w-md 3xl:max-w-2xl font-medium">
                        Welcome to his space. He builds digital products with a focus on{" "}
                        <span className="text-foreground relative group/word  whitespace-nowrap font-bold decoration-primary/40 hover:decoration-primary transition-all">
                            detail
                        </span>,{" "}
                        <span className="text-foreground relative group/word whitespace-nowrap font-bold decoration-primary/40 hover:decoration-primary transition-all">
                            performance
                        </span>, and{" "}
                        <span className="text-foreground relative group/word  whitespace-nowrap font-bold decoration-primary/40 hover:decoration-primary transition-all">
                            human-centric design
                        </span>.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};



// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero({ manualY }: { manualY?: number }) {
    return (
        <section id={SECTIONS.HOME} className={`w-full ${manualY ? 'h-full' : 'md:min-h-screen'}`}>


            {/* Desktop View — Split Layout */}
            <div className={manualY ? "hidden lg:flex flex-row h-full" : "hidden lg:flex flex-row min-h-[200vh]"}>
                {/* Left Side — scrolls naturally or via manualY through SectionOne + SectionTwo */}
                <div className="w-1/2 overflow-hidden h-full">
                    <motion.div
                        style={manualY ? { y: manualY } : {}}
                        className="flex flex-col"
                    >
                        <div id="section-one" className={manualY ? 'h-screen shrink-0' : ''}>
                            <SectionOne />
                        </div>
                        <div id="section-two" className={manualY ? 'h-screen shrink-0' : ''}>
                            <SectionTwo />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Stays Fixed */}
                <div className={`w-1/2 h-full overflow-hidden group ${manualY ? 'relative' : 'sticky top-16 h-[calc(100vh-4rem)]'}`}>
                    <motion.div
                        className="w-full h-full z-0"
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2
                        }}
                    >
                        <img
                            src="/dp_img_clr.png"
                            alt="Hero Portrait"
                            className="w-full h-full object-cover contrast-110"
                        />
                    </motion.div>
                    <div
                        className={`absolute inset-0 z-10 transition-all duration-1000 backdrop-grayscale ${window.location.hash === '#about' ? 'opacity-0 hover:opacity-100' : 'opacity-100 hover:opacity-0'} transition-all duration-300`}
                    />
                </div>
            </div>
        </section>
    );
}
