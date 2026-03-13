import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
};

export default function Resume() {
    const { t, language } = useLanguage();

    const fullExperience = [
        {
            role: t.experience.roles.aea.role,
            company: "Alsace Esport Arena",
            period: language === 'en' ? "Since Sept 2025" : "Depuis Sept 2025",
            description: t.experience.roles.aea.description
        },
        {
            role: t.experience.roles.field_agent_25.role,
            company: "Pays de Montbéliard Agglomération",
            period: language === 'en' ? "July - August 2025" : "Juillet - Août 2025",
            description: t.experience.roles.field_agent_25.description
        },
        {
            role: t.experience.roles.field_agent_24.role,
            company: "Pays de Montbéliard Agglomération",
            period: language === 'en' ? "July - August 2024" : "Juillet - Août 2024",
            description: t.experience.roles.field_agent_24.description
        },
        {
            role: t.experience.roles.intermarche.role,
            company: "Intermarché Saint-Apollinaire",
            period: language === 'en' ? "Sept 2023 - Jan 2024" : "Sept 2023 - Jan 2024",
            description: t.experience.roles.intermarche.description
        },
        {
            role: t.experience.roles.hyper_u.role,
            company: "Hyper U Exincourt",
            period: language === 'en' ? "May - August 2023" : "Mai - Août 2023",
            description: t.experience.roles.hyper_u.description
        },
        {
            role: t.experience.roles.mission_handicap.role,
            company: "Mission Handicap",
            period: language === 'en' ? "Jan - June 2023" : "Jan - Juin 2023",
            description: t.experience.roles.mission_handicap.description
        }
    ];

    return (
        <motion.div
            className="resume-page"
            style={{ paddingTop: '150px', paddingBottom: '100px' }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageVariants.transition}
        >
            <Navbar />

            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <header style={{ marginBottom: '5rem', borderBottom: '1px solid #333', paddingBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h1 style={{ fontSize: '4rem', marginBottom: 0 }}>{t.resume.title}</h1>
                            <a
                                href="/resume.pdf"
                                download
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    background: 'white',
                                    color: 'black',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    marginTop: '1rem',
                                    display: 'inline-block',
                                    cursor: 'pointer'
                                }}>
                                {language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
                            </a>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontFamily: 'var(--font-sans)', opacity: 0.7 }}>
                            <div>
                                <p>elio71b@gmail.com</p>
                                <p>+33 6 79 63 39 71</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p>{t.resume.age}</p>
                                <p>{t.resume.driver_license}</p>
                            </div>
                        </div>
                    </header>

                    <section style={{ marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#d4d4d4' }}>{t.experience.title_experience}</h2>
                        <div style={{ borderLeft: '1px solid #333', paddingLeft: '2rem' }}>
                            {fullExperience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '3rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-2.35rem', top: '0.4rem', width: '0.7rem', height: '0.7rem', background: '#333', borderRadius: '50%' }}></div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{exp.role}</h3>
                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', opacity: 0.5, marginBottom: '0.5rem' }}>
                                        {exp.company} | {exp.period}
                                    </p>
                                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#d4d4d4' }}>{t.experience.title_education}</h2>
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem' }}>Mediaschool Strasbourg | School of Sports</h3>
                                <p style={{ opacity: 0.5, fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>{language === 'en' ? "2025 – Present" : "2025 – Présent"}</p>
                                <p>{t.experience.education.mediaschool.details}</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem' }}>Université de Bourgogne</h3>
                                <p style={{ opacity: 0.5, fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>2022 – 2025</p>
                                <p>{t.experience.education.u_bourgogne.details}</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem' }}>Lycée Louis Aragon</h3>
                                <p style={{ opacity: 0.5, fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>2019 – 2022</p>
                                <p>{t.experience.education.lycee.details}</p>
                            </div>
                        </div>
                    </section>

                </motion.div>
            </div>
        </motion.div>
    );
}
