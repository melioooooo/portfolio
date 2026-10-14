import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ponytail: add a project = one object here (+ image in public/assets/images, strings in translations).
const projects = [
    { id: 'hoplan', title: 'HOPLAN', cat: 'event', img: '/assets/images/hoplan.webp', link: 'https://hoplan.gg' },
    { id: 'veille', title: 'VEILLE AEA', cat: 'tool', img: '/assets/images/veille_aea.webp', link: 'https://veille-aea.vercel.app' },
    { id: 'crea', title: 'CHAMPIONS OF THE NEXUS', cat: 'visual', img: '/assets/images/crea_poster_1.webp', pos: 'center 32%', concept: true },
];

export default function Creations() {
    const { t } = useLanguage();
    const c = t.creations;

    return (
        <section id="creations" className="section">
            <div className="container">
                <motion.h2
                    className="section__title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {c.title}
                </motion.h2>

                <div className="work-grid">
                    {projects.map((p, i) => {
                        const Wrapper = p.link ? 'a' : 'div';
                        const linkProps = p.link
                            ? { href: p.link, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': t.cursor.visit, 'aria-label': `${p.title} — ${c.view_site}` }
                            : {};
                        return (
                            <Wrapper key={p.id} className="work-card" {...linkProps}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    <div className="work-card__media">
                                        <img src={p.img} alt="" width="1440" height="900" loading="lazy" decoding="async" style={{ objectPosition: p.pos }} />
                                        {p.concept && <span className="work-card__tag">{c.tag_concept}</span>}
                                    </div>
                                    <h3>
                                        <span className="work-card__no">{String(i + 1).padStart(2, '0')}</span>
                                        {p.title}
                                        {p.link && (
                                            <svg className="work-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                            </svg>
                                        )}
                                    </h3>
                                    <p className="work-card__cat">{c.categories[p.cat]}</p>
                                    <p className="work-card__desc">{c.descriptions[p.id]}</p>
                                </motion.div>
                            </Wrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
