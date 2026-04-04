import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import Magnetic from './Magnetic';

export default function Navbar() {
    const { toggleLanguage, language, t } = useLanguage();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const handleScrollTo = (e, id) => {
        if (isHome) {
            e.preventDefault();
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0, 0.95] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1.5rem 5vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                mixBlendMode: 'difference',
                color: 'white',
            }}
        >
            <Magnetic>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'white' }}>
                    <Logo size={40} />
                </Link>
            </Magnetic>

            <div style={{
                display: 'flex',
                gap: '1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                alignItems: 'center',
            }}>
                <Magnetic>
                    <Link
                        to="/"
                        onClick={(e) => handleScrollTo(e, 'creations')}
                        style={{
                            opacity: isHome ? 1 : 0.6,
                            padding: '0.8rem',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {t.navbar.work}
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link
                        to="/resume"
                        style={{
                            opacity: location.pathname === '/resume' ? 1 : 0.6,
                            padding: '0.8rem',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {t.navbar.resume}
                    </Link>
                </Magnetic>
                <Magnetic>
                    <a
                        href={isHome ? '#contact' : '/#contact'}
                        onClick={(e) => handleScrollTo(e, 'contact')}
                        style={{
                            opacity: 0.6,
                            padding: '0.8rem',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {t.navbar.contact}
                    </a>
                </Magnetic>

                <Magnetic>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'none',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            padding: '0.4rem 0.9rem',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            marginLeft: '0.5rem',
                            opacity: 0.7,
                            transition: 'all 0.3s',
                        }}
                    >
                        {language === 'en' ? 'FR' : 'EN'}
                    </button>
                </Magnetic>
            </div>
        </motion.nav>
    );
}
