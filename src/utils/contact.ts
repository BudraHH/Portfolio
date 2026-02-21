export interface SocialLink {
    label: string;
    value: string;
    href: string;
}

export const contacts = {
    PHONE_NUMBER: {
        label: "Phone Number",
        value: "+91 73975 09844",
        href: "tel:+917397509844"
    },
    EMAIL: {
        label: "Email",
        value: "hariharabudra@gmail.com",
        href: "mailto:hariharabudra@gmail.com"
    },
    RESUME: {
        label: "Resume",
        value: "Download PDF",
        href: "/HariHaraBudra_Resume.pdf"
    },
}

export const SOCIALS: Record<string, SocialLink> = {
    GITHUB: {
        label: "Github",
        value: "BudraHH",
        href: "https://github.com/BudraHH"
    },
    LINKEDIN: {
        label: "Linkedin",
        value: "hari-hara-budra",
        href: "https://linkedin.com/in/hari-hara-budra"
    },
    INSTAGRAM: {
        label: "Instagram",
        value: "hariharabudra",
        href: "https://instagram.com/hariharabudra"
    },
    WHATSAPP: {
        label: "WhatsApp",
        value: "+91 73975 09844",
        href: "https://wa.me/917397509844"
    },
}