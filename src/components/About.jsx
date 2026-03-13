import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" style={{ padding: '20vh 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ maxWidth: '800px' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.4, marginBottom: '4rem' }}
                    >
                        {t.about.main_text}
                        <span style={{ opacity: 0.6, display: 'block', marginTop: '2rem', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                            {t.about.sub_text}
                        </span>
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', borderTop: '1px solid #333', paddingTop: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>{t.about.skills_tech}</h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8 }}>
                                <li>Photography & Videography</li>
                                <li>Digital Creation</li>
                                <li>IT Proficiency</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>{t.about.skills_lang}</h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8 }}>
                                <li>French (Native)</li>
                                <li>English (C1+)</li>
                                <li>Spanish (B2+)</li>
                                <li>Polish (A2)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>{t.about.skills_soft}</h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8 }}>
                                {t.about.soft_list.map((skill, i) => <li key={i}>{skill}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
