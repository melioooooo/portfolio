import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" style={{ padding: '15vh 0', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ maxWidth: '900px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                            marginBottom: '1.5rem',
                        }}>
                            {t.about.title}
                        </h2>

                        <p style={{
                            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 300,
                            color: 'var(--text-main)',
                            marginBottom: '1.5rem',
                        }}>
                            {t.about.main_text}
                        </p>

                        <p style={{
                            fontSize: '1.1rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 300,
                            opacity: 0.5,
                            marginBottom: '4rem',
                        }}>
                            {t.about.sub_text}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '2rem',
                            borderTop: '1px solid #333',
                            paddingTop: '3rem',
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>
                                {t.about.skills_tech}
                            </h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
                                {t.about.tech_list.map((skill, i) => <li key={i}>{skill}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>
                                {t.about.skills_lang}
                            </h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
                                <li>French (Native)</li>
                                <li>English (C1+)</li>
                                <li>Spanish (B2+)</li>
                                <li>Polish (A2)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4d4d4' }}>
                                {t.about.skills_soft}
                            </h3>
                            <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
                                {t.about.soft_list.map((skill, i) => <li key={i}>{skill}</li>)}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
