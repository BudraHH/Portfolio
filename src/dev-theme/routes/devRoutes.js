export const DEV_ROUTES = {
    ROOT: '/dev-theme',
    WELCOME: 'welcome',
    DESKTOP: 'desktop',
    // Helper to get full paths
    get FULL_WELCOME() { return `${this.ROOT}/${this.WELCOME}`; },
    get FULL_DESKTOP() { return `${this.ROOT}/${this.DESKTOP}`; }
};
