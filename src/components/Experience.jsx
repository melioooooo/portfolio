import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
    const { t, language } = useLanguage();

    const events = [
        {
            id: 1,
            name: 'LAN Rocket League AEA 2026',
            roles: language === 'en'
                ? ['Event Planning', 'Stage Management', 'Communication']
                : ['Event Planning', 'Régie', 'Communication'],
        },
        {
            id: 2,
            name: 'LAN Black Ops 7 AEA 2026',
            roles: language === 'en'
                ? ['Event Planning', 'Stage Management']
                : ['Event Planning', 'Régie'],
        },
        {
            id: 3,
            name: language === 'en' ? 'Fortnite LANs — Multiple Editions' : 'LANs Fortnite — Éditions multiples',
            roles: language === 'en'
                ? ['Event Planning', 'Visual Creation', 'Communication']
                : ['Event Planning', 'Création de visuels', 'Communication'],
        },
    ];

    const education = [
        {
            id: 1,
            degree: t.experience.education.mediaschool.degree,
            school: 'Mediaschool Strasbourg',
            period: language === 'en' ? '2025 – Present' : '2025 – Présent',
            details: t.experience.education.mediaschool.details,
        },
        {
            id: 2,
            degree: t.experience.education.u_bourgogne.degree,
            school: 'Université de Bourgogne',
            period: '2022 – 2025',
            details: t.experience.education.u_bourgogne.details,
        },
    ];

    const international = [
        {
            id: 1,
            type: language === 'en' ? 'Erasmus Exchange — 1 Semester' : 'Échange Erasmus — 1 Semestre',
            location: language === 'en' ? 'Valencia, Spain' : 'Valence, Espagne',
            year: '2024',
            flag: '🇪🇸',
        },
        {
            id: 2,
            type: language === 'en' ? 'Linguistic Exchange' : 'Échange Linguistique',
            location: language === 'en' ? 'Asturias, Spain' : 'Asturies, Espagne',
            year: '2019',
            flag: '🇪🇸',
        },
    ];

    return (
        <section id="experience" style={{ padding: '15vh 0', borderTop: '1px solid #222' }}>
            <div className="container">

                {/* AEA Block — Main feature */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '6rem' }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        borderBottom: '1px solid #222',
                        paddingBottom: '2rem',
                        marginBottom: '3rem',
                    }}>
                        <div>
                            <p style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                opacity: 0.4,
                                marginBottom: '0.8rem',
                            }}>
                                {language === 'en' ? 'Event Production & Communication' : 'Production Événementielle & Communication'}
                            </p>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 }}>
                                Alsace Esport Arena
                            </h2>
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            opacity: 0.4,
                            paddingTop: '0.3rem',
                            whiteSpace: 'nowrap',
                        }}>
                            {language === 'en' ? 'Since Sept. 2025' : 'Depuis Sept. 2025'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    padding: '1.5rem 0',
                                    borderBottom: '1px solid #1a1a1a',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.7rem',
                                        opacity: 0.3,
                                        minWidth: '1.5rem',
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 style={{
                                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                        fontWeight: 400,
                                        fontFamily: 'var(--font-sans)',
                                    }}>
                                        {event.name}
                                    </h3>
                                </div>
                                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    {event.roles.map((role, i) => (
                                        <span key={i} style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.08em',
                                            padding: '0.3rem 0.7rem',
                                            border: '1px solid #2a2a2a',
                                            borderRadius: '2px',
                                            opacity: 0.6,
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Education + International — side by side */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                }}>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            opacity: 0.4,
                            marginBottom: '2rem',
                        }}>
                            {t.experience.title_education}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {education.map((edu) => (
                                <div key={edu.id} style={{
                                    padding: '1.5rem',
                                    border: '1px solid #1e1e1e',
                                    borderRadius: '2px',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '0.6rem',
                                        gap: '1rem',
                                    }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 500 }}>{edu.degree}</h3>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            opacity: 0.35,
                                            whiteSpace: 'nowrap',
                                        }}>{edu.period}</span>
                                    </div>
                                    <p style={{ opacity: 0.45, fontSize: '0.82rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>{edu.school}</p>
                                    <p style={{ opacity: 0.6, fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'var(--font-sans)' }}>{edu.details}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* International */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <h2 style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            opacity: 0.4,
                            marginBottom: '2rem',
                        }}>
                            {language === 'en' ? 'International' : 'International'}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {international.map((item) => (
                                <div key={item.id} style={{
                                    padding: '1.5rem',
                                    border: '1px solid #1e1e1e',
                                    borderRadius: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                }}>
                                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>{item.flag}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            marginBottom: '0.4rem',
                                        }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 500 }}>{item.type}</h3>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.7rem',
                                                opacity: 0.35,
                                                whiteSpace: 'nowrap',
                                            }}>{item.year}</span>
                                        </div>
                                        <p style={{
                                            opacity: 0.5,
                                            fontSize: '0.85rem',
                                            fontFamily: 'var(--font-sans)',
                                        }}>{item.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
