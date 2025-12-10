import React, { memo } from "react";

const TerminalLine = memo(({ item }) => {
    if (!item) return null;

    // Handle string (legacy support) or structured object
    const line = typeof item === 'string' ? item : item.content;
    const type = typeof item === 'object' ? item.type : 'output';
    const path = typeof item === 'object' ? item.path : null;

    if (type === 'command') {
        // Command line echo with stored path
        return (
            <div className="flex flex-wrap gap-2 text-sm leading-relaxed mt-1">
                <div className="flex shrink-0 pt-[2px]">
                    <span className="text-emerald-400 font-bold">dev@portfolio</span>
                    <span className="text-gray-400">:</span>
                    <span className="text-blue-400">{path || '~'}</span>
                    <span className="text-gray-400">$</span>
                </div>
                <span className="text-gray-200">{line}</span>
            </div>
        )
    }

    if (type === 'error' || (typeof line === 'string' && (line.startsWith("Error:") || line.includes(": No such file")))) {
        return <div className="text-red-400 text-sm whitespace-pre-wrap">{line}</div>;
    }

    // Default output
    return <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{line}</div>;
});

TerminalLine.displayName = 'TerminalLine';

export default TerminalLine;
