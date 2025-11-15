// ADD THIS COMPONENT
const BlinkingCursor = () => (
    <motion.div
        className="w-2 h-4 bg-gray-300 inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1, 1] }}
    />
);
