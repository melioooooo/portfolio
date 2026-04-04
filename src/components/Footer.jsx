import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer style={{
            padding: '2rem 5vw',
            borderTop: '1px solid #1a1a1a',
            position: 'relative',
            zIndex: 10,
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                opacity: 0.35,
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <p>&copy; {new Date().getFullYear()} Elio Baumann.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    Designed with 🤍 & Code
                </p>
            </div>
        </footer>
    );
}
