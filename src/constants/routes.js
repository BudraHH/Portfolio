// Global application routes - Single source of truth for all routing
// All route paths should be imported from here to avoid hardcoding

// ============================================
// GLOBAL ROUTES
// ============================================
export const GLOBAL_ROUTES = {
    ROOT: '/',
    WELCOME: '/welcome',
    NOT_FOUND: '*'
};

// ============================================
// DEV THEME ROUTES
// ============================================
export const DEV_ROUTES = {
    ROOT: '/dev-theme',
    WELCOME: 'welcome',
    DESKTOP: 'desktop',

    // Full paths (computed)
    get FULL_ROOT() { return this.ROOT; },
    get FULL_WELCOME() { return `${this.ROOT}/${this.WELCOME}`; },
    get FULL_DESKTOP() { return `${this.ROOT}/${this.DESKTOP}`; }
};

// ============================================
// NORMAL THEME ROUTES
// ============================================
export const NORMAL_ROUTES = {
    ROOT: '/normal-theme',

    // Section anchors (for scrolling)
    SECTIONS: {
        HERO: '',
        INFO: 'info',
        SKILLS: 'skills',
        CAREER: 'career',
        PROJECTS: 'projects',
        CONTACT: 'contact'
    },

    // Full paths (computed)
    get FULL_ROOT() { return this.ROOT; },

    // Helper to get section with hash
    getSection(section) {
        return `${this.ROOT}#${section}`;
    }
};

// ============================================
// NAVIGATION ITEMS (for menus)
// ============================================
export const NAVIGATION_ITEMS = [
    { id: 'home', label: 'Home', path: NORMAL_ROUTES.SECTIONS.HERO },
    { id: 'info', label: 'Info', path: NORMAL_ROUTES.SECTIONS.INFO },
    { id: 'career', label: 'Career', path: NORMAL_ROUTES.SECTIONS.CAREER },
    { id: 'skills', label: 'Skills', path: NORMAL_ROUTES.SECTIONS.SKILLS },
    { id: 'projects', label: 'Projects', path: NORMAL_ROUTES.SECTIONS.PROJECTS },
    { id: 'contact', label: 'Contact', path: NORMAL_ROUTES.SECTIONS.CONTACT }
];

// ============================================
// ROUTE HELPERS
// ============================================
export const RouteHelpers = {
    // Check if current path matches a route
    isActive(currentPath, route) {
        return currentPath === route || currentPath.startsWith(route);
    },

    // Get theme from path
    getThemeFromPath(path) {
        if (path.startsWith(DEV_ROUTES.ROOT)) return 'dev';
        if (path.startsWith(NORMAL_ROUTES.ROOT)) return 'normal';
        return null;
    },

    // Build full URL with hash
    buildHashUrl(base, hash) {
        return hash ? `${base}#${hash}` : base;
    }
};
