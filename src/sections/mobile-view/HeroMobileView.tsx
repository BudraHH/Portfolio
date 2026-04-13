import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

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

export const HeroMobileView = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="pt-5 flex flex-col justify-center relative bg-background overflow-hidden">
            {/* Background Engineering Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:20px_20px]" />

            <motion.div
                className="w-full space-y-5 relative z-10 flex flex-col "
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Identity Block */}
                <motion.div variants={itemVariants} className="space-y-4 text-left flex flex-col md:justify-center md:items-center">
                    <div className="flex flex-col space-y-1 md:flex-row md:items-baseline md:gap-2">

                        <p className='text-base md:text-xl'><span className="text-muted-foreground font-bold">Hey there, </span>
                            <span className="text-primary font-bold">He is</span></p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] uppercase group select-none cursor-pointer">
                            Hari Hara Budra<span className="group-hover:text-red-800 group-active:text-red-800 transition-colors duration-300">.</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 ">
                        <div className="h-px w-8 bg-primary/40" />
                        <p className="text-[11px] font-black tracking-widest uppercase text-muted-foreground">
                            Software Engineer <span className="text-primary/50">&</span> Designer
                        </p>
                    </div>
                </motion.div>

                {/* Image: Styled as a "Module" */}
                <motion.div
                    variants={itemVariants}
                    className="w-full flex items-center justify-center aspect-square rounded-xl overflow-hidden relative border border-border/50 group cursor-pointer active:scale-[0.98] transition-all"
                >
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={isImageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img
                            src="/dp_img_clr.png"
                            alt="Hero Portrait"
                            onLoad={() => setIsImageLoaded(true)}
                            loading="eager"
                            className="w-full h-full object-cover contrast-110"
                        />
                    </motion.div>
                    <div
                        className={`absolute z-10 inset-0 backdrop-grayscale group-hover:opacity-0 group-active:opacity-0 group-focus:opacity-0 transition-all duration-300`}
                    />
                </motion.div>

                {/* Narrative: Merging Section One Vision */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-2xl font-black tracking-tighter leading-tight uppercase text-center">
                        Building <span className="text-muted-foreground font-thin italic mx-1">the Vision</span> One Pixel <br className='md:hidden' /> at a Time.
                    </h1>
                    <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-4 font-medium ">
                        Transforming complex problems into elegant, scalable digital solutions. He builds products with a focus on performance and human-centric design.
                    </p>
                </motion.div>

                <motion.div
                    className="ml-2 flex items-center gap-8"
                    variants={itemVariants}
                >


                    {/* Scroll Hint */}
                    <motion.div
                        className="flex items-center gap-3"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                }
                            }
                        }}
                    >
                        <motion.span
                            variants={itemVariants}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/80"
                        >
                            Systems Engineer
                        </motion.span>
                        <motion.span
                            variants={itemVariants}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/80"
                        >
                            @
                        </motion.span>
                        <motion.span
                            variants={itemVariants}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/80"
                        >
                            Tata Consultancy Services
                        </motion.span>
                    </motion.div>

                    {/* <div className="h-px w-8 bg-border/40 hidden xl:block" />

                    <a
                        href={CONTACTS.RESUME.href}
                        download
                        className="hidden xl:flex items-center gap-2 group/res"
                    >
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/40 group-hover/res:text-primary transition-colors">
                            Download_CV
                        </span>
                        <ArrowUpRight size={12} className="text-muted-foreground/20 group-hover/res:text-primary transition-transform group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                    </a> */}
                </motion.div>
            </motion.div>
        </div>
    );
};
