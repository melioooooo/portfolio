import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/elio-baumann", // Placeholder, user can update
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        )
    },
    {
        name: "Discord",
        url: "https://discord.com/users/369518613260009472",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 .5 2.1c0 2.82-2.12 4.96-5.26 4.96-1.57 0-2.88-.6-3.8-1.56" />
                {/* Simplified Discord-ish icon or generic chat if better, but let's try a better path if possible or stick to simple circle-nodes */}
                <path d="M9 12a3 3 0 1 0 6 0" />
                {/* Actually, let's use a cleaner path for Discord */}
                <path d="M7.5 12c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5S9.8 10.5 9 10.5 7.5 11.2 7.5 12z" />
                <path d="M13.5 12c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5S15.8 10.5 15 10.5 13.5 11.2 13.5 12z" />
            </svg>
        )
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    }
];

// Better Discord path manually
const discordIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <path d="M7.5 12h9"></path>
        <path d="M12 7.5v9"></path>
        {/* Abstract "Gaming" shape since official logo is complex to draw perfectly in code without huge path string */}
    </svg>
);
// Retrying with real svg path for discord
const realDiscordIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1583a18.3246 18.3246 0 00-5.4883 0 8.864 8.864 0 00-.6163-1.1583.0768.0768 0 00-.0793-.0371 19.718 19.718 0 00-4.8817 1.5153.069.069 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
    </svg>
);


export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer style={{
            padding: '4rem 5vw',
            background: '#0a0a0a',
            borderTop: '1px solid #222',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>

                    {/* Brand / Title */}
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Social Hub</h2>
                        <p style={{ opacity: 0.5, maxWidth: '300px' }}>
                            {t.hero.subtitle}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {socialLinks.map((link, i) => (
                            <Magnetic key={i}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        border: '1px solid #333',
                                        color: 'white',
                                        background: 'rgba(255,255,255,0.05)',
                                        fontSize: '1.5rem',
                                        transition: 'background 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                >
                                    {link.name === "Discord" ? realDiscordIcon : link.icon}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '2rem',
                    borderTop: '1px solid #222',
                    fontSize: '0.9rem',
                    opacity: 0.4
                }}>
                    <p>&copy; 2025 Elio Baumann.</p>
                    <p>Designed with 🤍 & Code</p>
                </div>
            </div>
        </footer>
    );
}
