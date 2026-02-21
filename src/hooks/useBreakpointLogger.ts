import { useEffect } from 'react';

/**
 * Hook to log the current breakpoint to the console for debugging responsive design.
 * Breakpoints correspond to Tailwind CSS defaults:
 * - xs: <640px
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1400px
 * - 3xl: 1600px
 * - 4xl: 1920px
 */
export function useBreakpointLogger() {
    useEffect(() => {
        if (import.meta.env.PROD) return;

        const breakpoints = {
            '4xl': 1920,
            '3xl': 1600,
            '2xl': 1536,
            'xl': 1280,
            'lg': 1024,
            'md': 768,
            'sm': 640,
            'xs': 0,
        };

        const getBreakpoint = (width: number) => {
            if (width >= breakpoints['4xl']) return '4xl';
            if (width >= breakpoints['3xl']) return '3xl';
            if (width >= breakpoints['2xl']) return '2xl';
            if (width >= breakpoints['xl']) return 'xl';
            if (width >= breakpoints['lg']) return 'lg';
            if (width >= breakpoints['md']) return 'md';
            if (width >= breakpoints['sm']) return 'sm';
            return 'xs';
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const current = getBreakpoint(width);
            console.log(`Viewport: ${width}px | Breakpoint: ${current}`);
        };

        // Log initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
}
