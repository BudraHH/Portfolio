import React from 'react';
import { motion } from 'framer-motion';

const ResumeTab = ({ pdfUrl = "/public/resume.pdf" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col bg-[#1c1b22]"
        >
            <div className="flex-1 w-full h-full overflow-hidden relative">
                <iframe 
                    src={pdfUrl}
                    className="w-full h-full border-none"
                    title="Resume"
                    type="application/pdf"

                />
            </div>
        </motion.div>
    );
};

export default ResumeTab;
