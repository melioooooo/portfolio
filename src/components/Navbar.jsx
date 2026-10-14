import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Navbar() {
    const { toggleLanguage, language, t } = useLanguage();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isHome = pathname === '/';

    // Section links: scroll when already home, otherwise go home and let PortfolioHome scroll.
    const goTo = (id) => (e) => {
        e.preventDefault();
        if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        else navigate('/', { state: { scrollTo: id } });
    };

    return (
        <motion.nav
            className="nav no-print"
            aria-label="Navigation"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0, 0.95] }}
        >
            <Link to="/" aria-label={t.navbar.home} onClick={() => window.scrollTo(0, 0)}>
                <Logo size={36} />
            </Link>

            <div className="nav__links">
                <a href="/#creations" className="nav-link" onClick={goTo('creations')}>{t.navbar.work}</a>
                <a href="/#experience" className="nav-link" onClick={goTo('experience')}>{t.navbar.journey}</a>
                <Link to="/resume" className="nav-link" aria-current={pathname === '/resume' ? 'page' : undefined}>{t.navbar.resume}</Link>
                <a href="/#contact" className="nav-link" onClick={goTo('contact')}>{t.navbar.contact}</a>
                <button className="nav__lang" onClick={toggleLanguage} aria-label={t.a11y.language} lang={language === 'en' ? 'fr' : 'en'}>
                    {language === 'en' ? 'FR' : 'EN'}
                </button>
            </div>
        </motion.nav>
    );
}
