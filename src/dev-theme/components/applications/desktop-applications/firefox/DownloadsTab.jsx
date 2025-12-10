import { motion } from 'framer-motion';
import { FaDownload, FaFile, FaFolderOpen, FaTrash } from 'react-icons/fa';
import { useMemo, memo, useCallback } from 'react';

// Memoized empty state component
const EmptyState = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center flex-1 min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] px-4"
    >
        <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 rounded-full bg-cyan-500/5 flex items-center justify-center mb-3 xs:mb-4">
            <FaDownload className="text-2xl xs:text-3xl text-cyan-400/40" />
        </div>
        <p className="text-cyan-100/60 text-base xs:text-lg font-light">No downloads</p>
        <p className="text-cyan-500/40 text-xs xs:text-sm mt-1 text-center">Files you download will appear here</p>
    </motion.div>
));

EmptyState.displayName = 'EmptyState';

// Memoized download item component
const DownloadItem = memo(({ download, index, onOpen, onDelete }) => {
    const handleOpen = useCallback(() => onOpen?.(download), [download, onOpen]);
    const handleDelete = useCallback(() => onDelete?.(download), [download, onDelete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="group relative p-3 xs:p-4 rounded-lg
                bg-cyan-500/5 hover:bg-cyan-500/10
                border border-transparent hover:border-cyan-500/20
                transition-all duration-200"
        >
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                {/* File Icon */}
                <div className="flex-shrink-0 w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <FaFile className="text-cyan-400 text-xs xs:text-sm" />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-cyan-100/90 text-xs xs:text-sm font-medium truncate">
                        {download.name}
                    </p>
                    <div className="flex items-center gap-2 xs:gap-3 mt-0.5 xs:mt-1 text-[10px] xs:text-xs">
                        <span className="text-cyan-500/30">·</span>
                        <span className="text-cyan-400/50 truncate">{download.timestamp}</span>
                        <span className="text-white/50 hidden xs:inline">Downloaded</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-0.5 xs:gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                        onClick={handleOpen}
                        className="p-1.5 xs:p-2 rounded-lg hover:bg-cyan-400/10 text-cyan-400/70 hover:text-cyan-400 transition-colors touch-manipulation"
                        title="Open"
                        aria-label={`Open ${download.name}`}
                    >
                        <FaFolderOpen className="text-xs xs:text-sm" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 xs:p-2 rounded-lg hover:bg-red-400/10 text-red-400/50 hover:text-red-400 transition-colors touch-manipulation"
                        title="Delete"
                        aria-label={`Delete ${download.name}`}
                    >
                        <FaTrash className="text-[10px] xs:text-xs" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

DownloadItem.displayName = 'DownloadItem';

export default function DownloadsTab({ downloadsData, onOpenFile, onDeleteFile }) {
    const { downloads } = downloadsData;

    const fileCountText = useMemo(() =>
            `${downloads.length} ${downloads.length === 1 ? 'file' : 'files'}`,
        [downloads.length]
    );

    const isEmpty = useMemo(() => downloads.length === 0, [downloads.length]);

    return (
        <div className="flex flex-col min-h-full
            p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12
            overflow-y-auto">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 xs:mb-10 sm:mb-12"
            >
                <div className="flex items-center gap-2 xs:gap-3 mb-1 xs:mb-2">
                    <FaDownload className="text-xl xs:text-2xl text-cyan-400 flex-shrink-0" />
                    <h2 className="text-2xl xs:text-3xl font-light text-cyan-100 truncate">
                        Downloads
                    </h2>
                </div>
                <p className="text-cyan-400/60 text-xs xs:text-sm ml-8 xs:ml-10 sm:ml-11">
                    {fileCountText}
                </p>
            </motion.div>

            {/* Content */}
            {isEmpty ? (
                <EmptyState />
            ) : (
                <div className="space-y-1.5 xs:space-y-2 w-full">
                    {downloads.map((download, idx) => (
                        <DownloadItem
                            key={download.id}
                            download={download}
                            index={idx}
                            onOpen={onOpenFile}
                            onDelete={onDeleteFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
