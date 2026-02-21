import { useRef, useEffect } from 'react';

/**
 * Hook to update the document title.
 * @param title The title to set for the document.
 * @param prevailOnUnmount If true, the title will not revert to the previous title on unmount.
 */
export function useDocumentTitle(title: string, prevailOnUnmount: boolean = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount]);
}
