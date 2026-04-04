import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/elio-baumann",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1583a18.3246 18.3246 0 00-5.4883 0 8.864 8.864 0 00-.6163-1.1583.0768.0768 0 00-.0793-.0371 19.718 19.718 0 00-4.8817 1.5153.069.069 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
            </svg>
        )
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    }
];

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section id="contact" style={{
            padding: '15vh 0 8vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Subtle gradient accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(60, 100, 200, 0.05) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        marginBottom: '1.5rem',
                    }}>
                        {t.contact.title}
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                    }}>
                        {t.contact.subtitle}
                    </p>

                    {/* Email CTA */}
                    <Magnetic>
                        <motion.a
                            href="mailto:elio71b@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50px',
                                color: 'white',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                letterSpacing: '0.05em',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255,255,255,0.03)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                        >
                            elio71b@gmail.com
                        </motion.a>
                    </Magnetic>

                    {/* Social Links */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginTop: '3rem',
                    }}>
                        {socialLinks.map((link, i) => (
                            <Magnetic key={i}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '52px',
                                        height: '52px',
                                        borderRadius: '50%',
                                        border: '1px solid #262626',
                                        color: 'white',
                                        background: 'rgba(255,255,255,0.03)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.borderColor = '#444';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        e.currentTarget.style.borderColor = '#262626';
                                    }}
                                >
                                    {link.icon}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
