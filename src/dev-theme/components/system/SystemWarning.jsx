import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

// Simple event bus for system notifications
export const systemEvents = {
    listeners: new Set(),
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    },
    emit(event) {
        this.listeners.forEach(listener => listener(event));
    }
};

const SystemWarning = () => {
    const [notifications, setNotifications] = useState([]);

    // Listen to external events
    useEffect(() => {
        // Subscribe to external events
        const unsubscribe = systemEvents.subscribe((event) => {
            const newNotification = {
                id: Date.now(),
                ...event
            };

            setNotifications(prev => {
                const updated = [...prev, newNotification];
                if (updated.length > 5) return updated.slice(updated.length - 5);
                return updated;
            });

            // Auto-dismiss
            setTimeout(() => {
                setNotifications(current => current.filter(n => n.id !== newNotification.id));
            }, 5000);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'error': return <FaTimesCircle className="text-red-500" />;
            case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
            default: return <FaInfoCircle className="text-blue-500" />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'error': return 'border-red-500/50 bg-red-900/20 text-red-200';
            case 'warning': return 'border-yellow-500/50 bg-yellow-900/20 text-yellow-200';
            default: return 'border-blue-500/50 bg-blue-900/20 text-blue-200';
        }
    };

    return (
        <div className="fixed bottom-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none w-80 font-mono text-xs">
            <AnimatePresence mode='popLayout'>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
                        layout
                        className={`
                            pointer-events-auto
                            flex items-center gap-3 p-3 rounded
                            border backdrop-blur-md shadow-lg
                            ${getColor(notification.type)}
                        `}
                    >
                        <div className="shrink-0 text-base">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold uppercase opacity-80 text-[10px] tracking-wider mb-0.5">
                                SYSTEM_{notification.type}
                            </div>
                            <div className="truncate">
                                {notification.message}
                            </div>
                        </div>
                        {/* Scanline decoration */}
                        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default SystemWarning;
