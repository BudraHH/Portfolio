import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = ({
    strings,
    typeSpeed = 50,
    backSpeed = 50,
    loop = false,
    showCursor = true,
    cursorChar = '|',
    onComplete,
    startDelay = 0
}) => {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        const options = {
            strings: strings,
            typeSpeed: typeSpeed,
            backSpeed: backSpeed,
            loop: loop,
            showCursor: showCursor,
            cursorChar: cursorChar,
            startDelay: startDelay,
            onComplete: (self) => {
                if (onComplete) onComplete(self);
            },
        };

        // typeSpeed delay
        typed.current = new Typed(el.current, options);

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            if (typed.current) {
                typed.current.destroy();
            }
        };
    }, [strings, typeSpeed, backSpeed, loop, showCursor, cursorChar, startDelay, onComplete]);

    return (
        <span className="typed-text-wrapper">
            <span ref={el} />
        </span>
    );
};

export default TypedText;
