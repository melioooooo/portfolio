import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../data/cv';

export default function About() {
    const { t, language } = useLanguage();
    const a = t.about;

    return (
        <section id="about" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section__title">{a.title}</h2>
                    <p className="about__lead">{a.main_text}</p>
                    <p className="about__sub">{a.sub_text}</p>

                    <div className="about__grid">
                        <div>
                            <h3>{a.skills_tech}</h3>
                            <ul className="slide-list">{a.tech_list.map(s => <li key={s} className="hot-on-hover">{s}</li>)}</ul>
                        </div>
                        <div>
                            <h3>{a.skills_lang}</h3>
                            <ul className="slide-list">
                                {languages.map(l => (
                                    <li key={l.en} className="hot-on-hover">{l[language]}<span>{l.level[language]}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>{a.skills_soft}</h3>
                            <ul className="slide-list">{a.soft_list.map(s => <li key={s} className="hot-on-hover">{s}</li>)}</ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
