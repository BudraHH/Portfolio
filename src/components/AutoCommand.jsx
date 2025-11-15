// AutoCommand.jsx
import React, { useState } from "react";
import TypedText from "./TypedText.jsx";

const AutoCommand = ({ username, currentPath, command, onComplete, isActive }) => {
    const [isTyping, setIsTyping] = useState(true);

    const handleTypingComplete = () => {
        setIsTyping(false);
        if (onComplete) {
            onComplete();
        }
    };

    return (
        <div className="break-words">
            <p className="break-words">
                <span className="text-cyan-400 text-10px xs:text-xs sm:text-sm">
                    {username}
                </span>
                <span className="text-white text-10px xs:text-xs sm:text-sm">
                    :{currentPath}$
                </span>
                <span className="text-cyan-300 ml-1 xs:ml-2 break-all text-10px xs:text-xs sm:text-sm">
                    <TypedText
                        strings={[command]}
                        typeSpeed={50}
                        showCursor={false}  // Disable Typed.js cursor
                        onComplete={handleTypingComplete}
                        className="inline"
                    />
                    {/* Custom space cursor with background */}
                    <span
                        className={`inline-block w-2 xs:w-2.5 h-4 bg-cyan-300 ml-0.5 ${
                            isTyping ? 'opacity-100' : 'animate-blink'
                        }`}
                        style={{ verticalAlign: 'text-bottom' }}
                    >
                        &nbsp;
                    </span>
                </span>
            </p>
        </div>
    );
};

export default AutoCommand;
