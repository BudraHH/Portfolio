import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

const spinnerFrames = ["|", "/", "-", "\\"];

// Memoized status display components
const StatusDisplay = memo(({ status, spinnerFrame, downloadProgress }) => {
    const baseCommand = "$ ./download-resume.sh --file=resume.pdf";
    const fileName = "Hari_Hara_Budra_Resume.pdf";

    switch (status) {
        case 'preparing':
            return (
                <>
                    <div className="text-cyan-300 mb-1">{baseCommand}</div>
                    <div className="text-cyan-400 flex items-center gap-2 mb-1">
                        <span className="animate-pulse">{spinnerFrame}</span>
                        Preparing file for download...
                    </div>
                    <div className="text-cyan-200/70">Initializing download process...</div>
                </>
            );

        case 'downloading':
            return (
                <>
                    <div className="text-cyan-300 mb-2">{baseCommand}</div>
                    <div className="text-cyan-200/70 mb-2">Downloading: {fileName}</div>
                    <div className="mb-2">
                        <div className="flex justify-between text-cyan-300/80 mb-1 text-[10px]">
                            <span>{Math.round(downloadProgress)}% complete</span>
                            <span>2.4 MB / 2.4 MB</span>
                        </div>
                        <div className="h-2 bg-cyan-950/50 rounded overflow-hidden border border-cyan-500/20">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${downloadProgress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>
                    </div>
                    <div className="text-cyan-400 flex items-center gap-2">
                        <span className="animate-pulse">{spinnerFrame}</span>
                        Transferring data...
                    </div>
                </>
            );

        case 'waiting':
            return (
                <>
                    <div className="text-cyan-300 mb-2">{baseCommand}</div>
                    <div className="text-green-400 mb-1">✓ File prepared successfully</div>
                    <div className="text-cyan-200/70 mb-2">Size: 2.4 MB • Format: PDF</div>
                    <div className="text-yellow-400 flex items-center gap-2 animate-pulse mb-1">
                        <span>{spinnerFrame}</span>
                        Waiting for user to save file...
                    </div>
                    <div className="text-cyan-400/60 text-[10px]">Please choose a location and click Save or Cancel</div>
                </>
            );

        case 'complete':
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-cyan-300 mb-2">{baseCommand}</div>
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                        <FaCheckCircle />
                        Download completed successfully!
                    </div>
                    <div className="text-cyan-200/70 mb-1">File: {fileName}</div>
                    <div className="text-cyan-400/70 text-[10px]">Child process will terminate in 2 seconds...</div>
                </motion.div>
            );

        case 'cancelled':
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-cyan-300 mb-2">{baseCommand}</div>
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <FaTimes />
                        Download cancelled by user
                    </div>
                    <div className="text-cyan-200/70 mb-2">File: {fileName}</div>
                    <div className="text-cyan-400/70 text-xs">User cancelled the save dialog</div>
                    <div className="text-cyan-400/70 text-[10px] mt-2">Child process will terminate in 2 seconds...</div>
                </motion.div>
            );

        default:
            return null;
    }
});

StatusDisplay.displayName = 'StatusDisplay';

export default function ResumeDownloadTerminal({ isVisible, onClose }) {
    const [downloadStatus, setDownloadStatus] = useState('preparing');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [spinnerStep, setSpinnerStep] = useState(0);
    const [position, setPosition] = useState({ top: '50%', left: '50%' });

    const downloadTriggeredRef = useRef(false);
    const hasStartedRef = useRef(false);

    const spinnerFrame = useMemo(() => spinnerFrames[spinnerStep], [spinnerStep]);

    // Calculate random position within safe bounds when becoming visible
    useEffect(() => {
        if (isVisible) {
            // Terminal dimensions (approximate)
            const terminalWidth = 448; // 28rem = 448px
            const terminalHeight = 240; // approximate height

            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate safe bounds with padding
            const padding = 32; // 2rem
            const maxLeft = viewportWidth - terminalWidth - padding;
            const maxTop = viewportHeight - terminalHeight - padding;

            // Generate random position within safe bounds
            const randomLeft = Math.max(padding, Math.random() * maxLeft);
            const randomTop = Math.max(padding, Math.random() * maxTop);

            setPosition({
                top: `${randomTop}px`,
                left: `${randomLeft}px`
            });
        }
    }, [isVisible]);

    // Resolve dialog with status
    const resolveDialog = useCallback((wasCancelled, reason = '') => {
        console.log(`Resolving: ${wasCancelled ? 'CANCELLED' : 'COMPLETED'} - ${reason}`);
        setDownloadStatus(wasCancelled ? 'cancelled' : 'complete');
        setTimeout(onClose, 2000);
    }, [onClose]);

    // Spinner effect
    useEffect(() => {
        const spinner = setInterval(() => setSpinnerStep(s => (s + 1) % 4), 70);
        return () => clearInterval(spinner);
    }, []);

    // Download process
    useEffect(() => {
        if (!isVisible || hasStartedRef.current) {
            if (!isVisible) hasStartedRef.current = false;
            return;
        }

        hasStartedRef.current = true;
        setDownloadStatus('preparing');
        setDownloadProgress(0);
        downloadTriggeredRef.current = false;

        const startTimer = setTimeout(() => {
            setDownloadStatus('downloading');

            const progressInterval = setInterval(() => {
                setDownloadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setDownloadStatus('waiting');

                        if (!downloadTriggeredRef.current) {
                            downloadTriggeredRef.current = true;
                            setTimeout(() => {
                                const link = document.createElement('a');
                                link.href = '/resume.pdf';
                                link.download = 'Hari_Hara_Budra_Resume.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }, 100);
                        }
                        return 100;
                    }
                    return prev + Math.random() * 15 + 5;
                });
            }, 200);

            return () => clearInterval(progressInterval);
        }, 800);

        return () => clearTimeout(startTimer);
    }, [isVisible]);

    // Monitor download dialog
    useEffect(() => {
        if (downloadStatus !== 'waiting' || !downloadTriggeredRef.current) return;

        let hasBlurred = false;
        let dialogResolved = false;
        let blurTime = 0;
        const timers = {};

        const clearAllTimers = () => {
            Object.values(timers).forEach(clearTimeout);
        };

        const handleResolve = (wasCancelled, reason) => {
            if (dialogResolved) return;
            dialogResolved = true;
            clearAllTimers();
            resolveDialog(wasCancelled, reason);
        };

        const handleBlur = () => {
            if (!hasBlurred && !dialogResolved) {
                hasBlurred = true;
                blurTime = Date.now();
                console.log('Dialog opened (blur)');
            }
        };

        const handleFocus = () => {
            if (!hasBlurred || dialogResolved) return;

            const duration = Date.now() - blurTime;
            console.log(`Dialog closed after ${duration}ms`);

            timers.resolve = setTimeout(() => {
                if (dialogResolved) return;

                let wasCancelled = true;
                let reason = '';

                if (duration < 500) {
                    wasCancelled = true;
                    reason = `Very quick (${duration}ms)`;
                } else if (duration < 1800) {
                    wasCancelled = true;
                    reason = `Quick (${duration}ms)`;
                } else if (duration < 3500) {
                    wasCancelled = duration < 2500;
                    reason = `Medium (${duration}ms)`;
                } else {
                    wasCancelled = false;
                    reason = `Long (${duration}ms)`;
                }

                timers.confirm = setTimeout(() => handleResolve(wasCancelled, reason), 600);
            }, 500);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (!hasBlurred && !dialogResolved) {
                    hasBlurred = true;
                    blurTime = Date.now();
                    console.log('Dialog opened (hidden)');
                }
            } else if (hasBlurred && !dialogResolved) {
                timers.focusCheck = setTimeout(() => {
                    if (document.hasFocus()) handleFocus();
                }, 200);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && hasBlurred && !dialogResolved) {
                handleResolve(true, 'Escape key');
            }
        };

        // Setup listeners
        window.addEventListener('blur', handleBlur, true);
        window.addEventListener('focus', handleFocus, true);
        document.addEventListener('visibilitychange', handleVisibilityChange, true);
        document.addEventListener('keydown', handleKeyDown, true);

        // Check initial blur state
        timers.initial = setTimeout(() => {
            if (!hasBlurred && !document.hasFocus() && !dialogResolved) {
                hasBlurred = true;
                blurTime = Date.now();
                console.log('Dialog already opened');
            }
        }, 100);

        // Fallback timeout
        timers.fallback = setTimeout(() => {
            if (!dialogResolved) handleResolve(true, 'Timeout (30s)');
        }, 30000);

        return () => {
            window.removeEventListener('blur', handleBlur, true);
            window.removeEventListener('focus', handleFocus, true);
            document.removeEventListener('visibilitychange', handleVisibilityChange, true);
            document.removeEventListener('keydown', handleKeyDown, true);
            clearAllTimers();
        };
    }, [downloadStatus, resolveDialog]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        top: position.top,
                        left: position.left,
                        transform: 'translate(0, 0)'
                    }}
                    className="fixed
                        w-[calc(100%-2rem)] xs:w-[26rem] sm:w-[28rem]
                        rounded-lg xs:rounded-xl
                        overflow-hidden font-mono text-white
                        bg-[radial-gradient(circle_at_10%_20%,rgba(0,255,255,0.08)_0%,rgba(0,0,0,0.91)_100%)]
                        backdrop-blur-[24px] border border-cyan-500/30
                        shadow-[0_0_40px_rgba(0,255,255,0.3)] z-50"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between
                        px-3 xs:px-4
                        py-1.5 xs:py-2
                        bg-gradient-to-r from-[#0f0f0fE6] to-[#1a1a1aE6]
                        border-b border-cyan-500/20">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(255,0,0,0.8)]" />
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(255,255,0,0.8)]" />
                            <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(0,255,0,0.8)]" />
                            <span className="ml-1.5 xs:ml-2 text-[10px] xs:text-xs text-cyan-400/70 select-none truncate">
                                download-resume.sh [Child PID: 4521]
                            </span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-3 xs:p-4 text-[11px] xs:text-xs leading-relaxed">
                        <StatusDisplay
                            status={downloadStatus}
                            spinnerFrame={spinnerFrame}
                            downloadProgress={downloadProgress}
                        />
                    </div>

                    {/* Visual effects - Combined */}
                    <div className="absolute inset-0 pointer-events-none
                        bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_60%)]
                        ring-1 ring-cyan-400/10 rounded-lg xs:rounded-xl" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
