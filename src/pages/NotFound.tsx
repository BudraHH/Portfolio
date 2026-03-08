import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background HUD Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(#00d1ff_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-primary leading-none select-none">
                    404
                </div>
            </div>

            <motion.div
                className="max-w-4xl  w-full relative z-10 space-y-12 pl-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="space-y-6 ">
                    <motion.div variants={itemVariants} className="space-y-2">
                        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic flex flex-wrap gap-x-6 items-baseline">
                            Resource <span className="text-muted-foreground font-thin not-italic">Not</span> <span className="group">Found<span className="group-hover:text-red-800">.</span></span>
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants} className="max-w-2xl">
                        <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-tight">
                            The requested endpoint has been decommissioned or moved to an unauthorized directory.
                            <span className="text-foreground ml-2">Request terminated with Status_Code: 404.</span>
                        </p>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8 ">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center justify-between  gap-4 p-3 border border-primary/20 bg-primary/5 hover:bg-primary/5 hover:text-primary transition-all rounded min-w-[240px] cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono font-black uppercase tracking-widest">Return</span>
                        </div>
                        <ArrowLeft size={16} className="text-primary/40 group-hover:-translate-x-1 group-hover:text-primary transition-transform" />
                    </button>
                </motion.div>

            </motion.div>
        </div>
    );
}
