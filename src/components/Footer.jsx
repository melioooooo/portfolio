import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/cv';
import DitherField from './DitherField';

const behavior = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

export default function Footer() {
    const { t, language } = useLanguage();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const f = t.footer;

    const goTo = (id) => (e) => {
        e.preventDefault();
        if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: behavior() });
        else navigate('/', { state: { scrollTo: id } });
    };

    const social = [
        ['LinkedIn', profile.linkedin],
        ['Discord', profile.discord],
        profile.instagram && ['Instagram', profile.instagram],
    ].filter(Boolean);

    return (
        <footer className="footer no-print">
            <div className="container footer__top">
                <p className="footer__pitch">{t.hero.status}<br />{t.hero.location}</p>

                <nav className="footer__col" aria-label={f.explore}>
                    <h3>{f.explore}</h3>
                    <a href="/#creations" onClick={goTo('creations')}>{t.navbar.work}</a>
                    <a href="/#experience" onClick={goTo('experience')}>{t.navbar.journey}</a>
                    <Link to="/resume">{t.navbar.resume}</Link>
                    <a href="/#contact" onClick={goTo('contact')}>{t.navbar.contact}</a>
                </nav>

                <div className="footer__col">
                    <h3>{f.reach}</h3>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    {social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n} <span aria-hidden="true">↗</span><span className="sr-only">{f.newTab}</span></a>)}
                    <a href={profile.pdf[language]} download>{t.hero.cta_cv}</a>
                </div>
            </div>

            <div className="footer__scene">
                <DitherField className="footer__dither" />
                <p className="footer__mark" aria-hidden="true">ELIO<br />BAUMANN</p>
                <div className="footer__legal">
                    <div className="container footer__legal-inner">
                        <p>© {new Date().getFullYear()} {profile.name}. {f.rights}</p>
                        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: behavior() })}>{f.top} <span aria-hidden="true">↑</span></button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
