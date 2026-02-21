import { motion, type Variants } from 'framer-motion';
import { Button } from '../../components/shared/Button';
import { contacts } from '../../utils/contact';
import { Download } from 'lucide-react';

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
    return (
        <div className="pt-5 flex flex-col justify-center relative border-b border-border bg-background overflow-hidden">
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
                    onTouchStart={() => { }}
                >
                    <img
                        src="/dp_img_clr.png"
                        alt="Hero Portrait"
                        className="w-full h-full object-cover contrast-110"
                    />
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

                {/* High-Impact Actions */}
                <motion.div
                    className="grid grid-cols-2 gap-3"
                    variants={itemVariants}
                >
                    <a href={contacts.RESUME.href} download className="w-full">
                        <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest gap-2 px-2">
                            <Download size={14} />
                            Resume
                        </Button>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};
