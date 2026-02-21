export const SECTIONS = {
    HOME: 'home',
    ABOUT: 'about',
    STACK: 'stack',
    CAREER: 'career',
    BUILDS: 'builds',
    CONTACT: 'contact',
} as const;

export const NAV_LINKS = [
    { label: 'Home', id: SECTIONS.HOME },
    { label: 'About', id: SECTIONS.ABOUT },
    { label: 'Stack', id: SECTIONS.STACK },
    { label: 'Career', id: SECTIONS.CAREER },
    { label: 'Builds', id: SECTIONS.BUILDS },
    { label: 'Contact', id: SECTIONS.CONTACT },
];

export const ROUTES = {
    HOME: '/',
} as const;

