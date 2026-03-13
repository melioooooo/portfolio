import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
    const { t, language } = useLanguage();

    const experiences = [
        {
            id: 1,
            role: t.experience.roles.aea.role,
            company: "Alsace Esport Arena",
            period: language === 'en' ? "Since Sept 2025" : "Depuis Sept 2025",
            description: t.experience.roles.aea.description
        },
        {
            id: 2,
            role: t.experience.roles.field_agent_25.role,
            company: "Pays de Montbéliard Agglomération",
            period: language === 'en' ? "Summers 2024 & 2025" : "Étés 2024 & 2025",
            description: t.experience.roles.field_agent_25.description
        }
    ];

    const education = [
        {
            id: 1,
            degree: t.experience.education.mediaschool.degree,
            school: "Mediaschool Strasbourg",
            period: language === 'en' ? "2025 - Present" : "2025 - Présent",
            details: t.experience.education.mediaschool.details
        },
        {
            id: 2,
            degree: t.experience.education.u_bourgogne.degree,
            school: "Université de Bourgogne",
            period: "2022 - 2025",
            details: t.experience.education.u_bourgogne.details
        }
    ];

    const Item = ({ data }) => (
        <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{data.role || data.degree}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{data.company || data.school}</span>
                <span>{data.period}</span>
            </div>
            <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '1rem' }}>{data.description || data.details}</p>
        </div>
    );

    return (
        <section id="experience" style={{ padding: '15vh 0', borderTop: '1px solid #222' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Experience Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '1rem', display: 'inline-block' }}>{t.experience.title_experience}</h2>
                    {experiences.map(exp => <Item key={exp.id} data={exp} />)}
                </motion.div>

                {/* Education Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '1rem', display: 'inline-block' }}>{t.experience.title_education}</h2>
                    {education.map(edu => <Item key={edu.id} data={edu} />)}
                </motion.div>

            </div>
        </section>
    );
}
