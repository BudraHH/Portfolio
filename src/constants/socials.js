import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Social media URLs (for backward compatibility)
export const SOCIAL_LINKS = {
    GITHUB: "https://github.com/BudraHH",
    LINKEDIN: "https://www.linkedin.com/in/hari-hara-budra/",
    INSTAGRAM: "https://www.instagram.com/budra_hh/",
    WHATSAPP: "https://wa.me/917397509844"
};

// Complete social links data with icons, labels, and colors
export const SOCIAL_LINKS_DATA = [
    {
        id: 'github',
        name: 'GitHub',
        label: 'GitHub',
        url: SOCIAL_LINKS.GITHUB,
        icon: FaGithub,
        color: '#333',
        hoverColor: '#6e5494'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        label: 'LinkedIn',
        url: SOCIAL_LINKS.LINKEDIN,
        icon: FaLinkedin,
        color: '#0077b5',
        hoverColor: '#00a0dc'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        label: 'Instagram',
        url: SOCIAL_LINKS.INSTAGRAM,
        icon: FaInstagram,
        color: '#E4405F',
        hoverColor: '#F56040'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        label: 'WhatsApp',
        url: SOCIAL_LINKS.WHATSAPP,
        icon: FaWhatsapp,
        color: '#25D366',
        hoverColor: '#128C7E'
    }
];
