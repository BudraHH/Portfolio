import { PROFILE } from '../../constants/profile';

// Profile/Info Me Header Information
export const ABOUT_ME_HEADER = {
    title: PROFILE.NAME,
    subtitle: PROFILE.TAGLINE, // Or use a dev-specific tagline if desired, sticking to unified for now
    bio: PROFILE.BIO.short,
    readme: PROFILE.BIO.paragraphs
};

// Contact Information
import { FaBuilding, FaMapMarkerAlt, FaLink, FaInstagram } from "react-icons/fa";
import { SOCIAL_LINKS } from '../../constants/socials';

export const CONTACTS = [
    { icon: FaBuilding, text: 'Movate Technologies' }, // This seems specific to dev-theme working status?
    { icon: FaMapMarkerAlt, text: PROFILE.CONTACT.location },
    { icon: FaLink, text: 'portfolio.com' },
    { icon: FaInstagram, text: '@budrahh' }, // Could extract handle from URL if needed, hardcoding for now or separate
    // Note: Social links are URLs in constants, here it's display text.
    // Ideally we parse the user from the URL or store handle separately.
];

// Navigation Tabs
export const NAV_TABS = ['Overview', 'Repositories', 'Projects', 'Packages'];

// Follower/Following Stats
export const SOCIAL_STATS = {
    followers: 42,
    following: 15
};
