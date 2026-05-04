import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const languages = [
    { name: 'Français', level: 'Natif', cefr: null, dots: 6 },
    { name: 'English',  level: 'C1+',   cefr: 'C1', dots: 5 },
    { name: 'Español',  level: 'B2+',   cefr: 'B2', dots: 4 },
    { name: 'Polski',   level: 'A2',    cefr: 'A2', dots: 2 },
];

function LangBar({ dots }) {
    return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {CEFR_LEVELS.map((_, i) => (
                <div key={i} style={{
                    width: '28px',
                    height: '3px',
                    borderRadius: '2px',
                    backgroundColor: i < dots ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.1)',
                    transition: 'background-color 0.3s',
                }} />
            ))}
        </div>
    );
}

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
                            borderTop: '1px solid #333',
                            paddingTop: '3rem',
                        }}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '2rem',
                            marginBottom: '3rem',
                        }}>
                            {/* Technical Skills */}
                            <div>
                                <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem' }}>
                                    {t.about.skills_tech}
                                </h3>
                                <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 2, fontFamily: 'var(--font-sans)' }}>
                                    {t.about.tech_list.map((skill, i) => <li key={i}>{skill}</li>)}
                                </ul>
                            </div>

                            {/* Soft Skills */}
                            <div>
                                <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem' }}>
                                    {t.about.skills_soft}
                                </h3>
                                <ul style={{ listStyle: 'none', opacity: 0.7, lineHeight: 2, fontFamily: 'var(--font-sans)' }}>
                                    {t.about.soft_list.map((skill, i) => <li key={i}>{skill}</li>)}
                                </ul>
                            </div>
                        </div>

                        {/* Language Proficiency — full width */}
                        <div>
                            <h3 style={{
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                opacity: 0.4,
                                marginBottom: '1.5rem',
                            }}>
                                {t.about.skills_lang}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {languages.map((lang, i) => (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.5rem',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <span style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '0.95rem',
                                            opacity: 0.9,
                                            minWidth: '80px',
                                        }}>
                                            {lang.name}
                                        </span>
                                        <LangBar dots={lang.dots} />
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.72rem',
                                            letterSpacing: '0.1em',
                                            opacity: 0.45,
                                        }}>
                                            {lang.level}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
