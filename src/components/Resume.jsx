import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';
import { getCv, languages, profile } from '../data/cv';

export default function Resume() {
    const { t, language } = useLanguage();
    const { experience, education } = getCv(t, language);
    const a = t.about;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Navbar />
            <main id="main" className="resume">
                <div className="resume__sheet">
                    <header className="resume__head">
                        <div>
                            <h1>{profile.name}</h1>
                            <p className="role">{t.hero.role}</p>
                            <div className="resume__contact">
                                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                <a href={profile.linkedin}>linkedin.com/in/elio-baumann</a>
                                <span>{t.hero.location}</span>
                                <span>{t.resume.age} · {t.resume.driver_license}</span>
                            </div>
                        </div>
                        <div className="resume__actions no-print">
                            <a className="btn-solid" href={profile.pdf[language]} download>{t.resume.download}</a>
                            <button className="btn-pill" onClick={() => window.print()}>{t.resume.print}</button>
                        </div>
                    </header>

                    <section>
                        <h2>{t.resume.profile}</h2>
                        <p className="resume__profile" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.6, color: 'var(--text-dim)' }}>{a.main_text} {a.sub_text}</p>
                    </section>

                    <section>
                        <h2>{t.experience.title_experience}</h2>
                        {experience.map(e => (
                            <div className="entry" key={e.id}>
                                <h4>{e.role}</h4>
                                <div className="entry__meta"><span>{e.company}</span><span>{e.period}</span></div>
                                <p>{e.description}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2>{t.experience.title_education}</h2>
                        {education.map(e => (
                            <div className="entry" key={e.id}>
                                <h4>{e.degree}</h4>
                                <div className="entry__meta"><span>{e.school}</span><span>{e.period}</span></div>
                                <p>{e.details}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2>{t.resume.skills}</h2>
                        <div className="resume__skills">
                            <div><h3>{a.skills_tech}</h3><ul>{a.tech_list.map(s => <li key={s}>{s}</li>)}</ul></div>
                            <div><h3>{a.skills_lang}</h3><ul>{languages.map(l => <li key={l.en}>{l[language]} · {l.level[language]}</li>)}</ul></div>
                            <div><h3>{a.skills_soft}</h3><ul>{a.soft_list.map(s => <li key={s}>{s}</li>)}</ul></div>
                        </div>
                    </section>
                </div>
            </main>
        </motion.div>
    );
}
