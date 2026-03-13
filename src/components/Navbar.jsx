import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import Magnetic from './Magnetic';

export default function Navbar() {
    const { toggleLanguage, language, t } = useLanguage();
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
                padding: '2rem 5vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                mixBlendMode: 'difference',
                color: 'white',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
            }}
        >
            <Magnetic>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'white' }}>
                    <Logo size={50} />
                </Link>
            </Magnetic>

            <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', alignItems: 'center' }}>
                <Magnetic>
                    <Link to="/" style={{ opacity: 0.8, padding: '1rem' }}>{t.navbar.work}</Link>
                </Magnetic>
                <Magnetic>
                    <Link to="/resume" style={{ opacity: 0.8, padding: '1rem' }}>{t.navbar.resume}</Link>
                </Magnetic>
                <Magnetic>
                    <a href="mailto:elio71b@gmail.com" style={{ opacity: 0.8, padding: '1rem' }}>{t.navbar.contact}</a>
                </Magnetic>

                <Magnetic>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'none',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '20px',
                            padding: '0.5rem 1rem', // Increased padding for better hit area
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-sans)',
                            marginLeft: '1rem',
                            opacity: 0.9
                        }}
                    >
                        {language === 'en' ? 'FR' : 'EN'}
                    </button>
                </Magnetic>
            </div>
        </motion.nav>
    );
}
