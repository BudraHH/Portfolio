import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function TypedText({
                                      strings = ['Default text...'],
                                      typeSpeed = 50,
                                      backSpeed = 30,
                                      backDelay = 1000,
                                      startDelay = 0,
                                      loop = false,
                                      showCursor = true,
                                      showCursorBeforeStart = false,
                                      showCursorAfterEnd = false,
                                      cursorChar = '|',
                                      autoInsertCss = true,
                                      fadeOut = false,
                                      fadeOutDelay = 500,
                                      smartBackspace = true,
                                      shuffle = false,
                                      onComplete = null,
                                      onBegin = null,
                                      className = ''
                                  }) {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        if (!el.current) return;

        const options = {
            strings: strings,
            typeSpeed: typeSpeed,
            backSpeed: backSpeed,
            backDelay: backDelay,
            startDelay: startDelay,
            loop: loop,
            showCursor: showCursor,
            cursorChar: cursorChar,
            autoInsertCss: autoInsertCss,
            fadeOut: fadeOut,
            fadeOutDelay: fadeOutDelay,
            smartBackspace: smartBackspace,
            shuffle: shuffle
        };

        // Only add callbacks if they are functions
        if (typeof onComplete === 'function') {
            options.onComplete = onComplete;
        }

        if (typeof onBegin === 'function') {
            options.onBegin = onBegin;
        }

        // Handle cursor visibility after typing ends
        const originalOnComplete = options.onComplete;
        options.onComplete = (self) => {
            // Add a small delay to ensure cursor element is rendered
            setTimeout(() => {
                if (!showCursorAfterEnd && el.current) {
                    const cursor = el.current.querySelector('.typed-cursor');
                    if (cursor) {
                        cursor.style.opacity = '0';
                        cursor.style.pointerEvents = 'none';
                    }
                }
            }, 50);

            if (typeof originalOnComplete === 'function') {
                originalOnComplete(self);
            }
        };

        typed.current = new Typed(el.current, options);

        return () => {
            if (typed.current) {
                typed.current.destroy();
                typed.current = null;
            }
        };
    }, []);

    return <span ref={el} className={className}></span>;
}
