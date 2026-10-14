import { useState } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/cv';

const icon = (children, fill) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const socials = [
    { name: 'LinkedIn', url: profile.linkedin, svg: icon(<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>) },
    { name: 'Discord', url: profile.discord, svg: icon(<path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.079.009c.12.1.246.199.373.293a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />, true) },
    { name: 'Instagram', url: profile.instagram, svg: icon(<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>) },
].filter(s => s.url);

export default function Contact() {
    const { t, language } = useLanguage();
    const [copied, setCopied] = useState(false);

    // mailto still opens; the copy is a fallback for people without a mail client
    const copyEmail = () => {
        navigator.clipboard?.writeText(profile.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }).catch(() => {});
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.div
                    className="contact__inner"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>{t.contact.title}</h2>
                    <p className="lead">{t.contact.subtitle}</p>

                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.9rem' }}>
                        <Magnetic>
                            <a href={`mailto:${profile.email}`} onClick={copyEmail} className="btn-solid">{profile.email}</a>
                        </Magnetic>
                        <Magnetic>
                            <a href={profile.pdf[language]} download className="btn-pill">{t.hero.cta_cv}</a>
                        </Magnetic>
                    </div>
                    <p className="contact__copied" role="status">{copied ? `✓ ${t.contact.copied}` : ''}</p>

                    <div className="contact__socials">
                        {socials.map(s => (
                            <Magnetic key={s.name}>
                                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="btn-pill">{s.svg}</a>
                            </Magnetic>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
