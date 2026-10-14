import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getCv, profile } from '../data/cv';

function Entry({ title, org, period, text }) {
    return (
        <div className="entry">
            <h4 className="hot-on-hover">{title}</h4>
            <div className="entry__meta"><span>{org}</span><span>{period}</span></div>
            <p>{text}</p>
        </div>
    );
}

export default function Experience() {
    const { t, language } = useLanguage();
    const { experience, education } = getCv(t, language);
    const main = experience.filter(e => e.featured);
    const other = experience.filter(e => !e.featured);

    return (
        <section id="experience" className="section" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="container">
                <h2 className="section__title">{t.navbar.journey}</h2>
                <motion.div
                    className="journey"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h3 className="col-title">{t.experience.title_experience}</h3>
                        <div className="slide-list">
                            {main.map(e => <Entry key={e.id} title={e.role} org={e.company} period={e.period} text={e.description} />)}
                        </div>
                        <details>
                            <summary>{t.journey.other_jobs}</summary>
                            <div className="slide-list">
                                {other.map(e => <Entry key={e.id} title={e.role} org={e.company} period={e.period} text={e.description} />)}
                            </div>
                        </details>
                    </div>
                    <div>
                        <h3 className="col-title">{t.experience.title_education}</h3>
                        <div className="slide-list">
                            {education.map(e => <Entry key={e.id} title={e.degree} org={e.school} period={e.period} text={e.details} />)}
                        </div>
                    </div>
                </motion.div>

                <div className="journey__cta">
                    <a className="btn-solid" href={profile.pdf[language]} download>{t.journey.download}</a>
                    <Link className="btn-pill" to="/resume">{t.journey.full} →</Link>
                </div>
            </div>
        </section>
    );
}
