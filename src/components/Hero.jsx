import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import DisruptiveText from './DisruptiveText';
import heroBg from '../assets/hero_bg.png'; // Make sure to save the image as src/assets/hero_bg.png

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* Image Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <img
                    src={heroBg}
                    alt="Hero Background"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(14,14,14,0.3)' // Subtle overlay
                }} />
            </div>

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div>
                    <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ duration: 1.2, ease: [0.6, 0.01, 0, 0.95], delay: 0.2 }}
                    >
                        <h1 style={{ fontSize: '4rem', lineHeight: 1, letterSpacing: '-0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--text-main)', paddingRight: '0.5em' }}>
                            <DisruptiveText>
                                {t.hero.title}
                            </DisruptiveText>
                        </h1>
                    </motion.div>
                </div>

                <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 400, fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
