import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/cv';
import DisruptiveText from './DisruptiveText';
import Magnetic from './Magnetic';
import DitherField from './DitherField';

export default function Hero() {
    const { t, language } = useLanguage();

    // The dithered sun drifts against the pointer
    const mx = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
    const my = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
    const bgX = useTransform(mx, v => v * -28);
    const bgY = useTransform(my, v => v * -18);
    const onMove = (e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    return (
        <section id="hero" className="hero" onMouseMove={onMove}>
            <motion.div className="hero__field" style={{ x: bgX, y: bgY }} aria-hidden="true"><DitherField variant="sun" className="hero__dither" /></motion.div>

            <div className="container hero__inner">
                <motion.h1
                    aria-label={profile.name}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 1.1, ease: [0.6, 0.01, 0, 0.95], delay: 0.15 }}
                >
                    <DisruptiveText>Elio</DisruptiveText><br />
                    <DisruptiveText>Baumann</DisruptiveText>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                >
                    <p className="hero__role">{t.hero.role}</p>
                    <p className="hero__sub">{t.hero.subtitle}</p>
                    <div className="hero__cta">
                        <Magnetic>
                            <a className="btn-solid" href={profile.pdf[language]} download>{t.hero.cta_cv}</a>
                        </Magnetic>
                        <Magnetic>
                            <a className="btn-pill" href={`mailto:${profile.email}`}>{t.hero.cta_contact}</a>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>

            <div className="hero__meta">
                <div className="container">
                    <span><i className="status-dot" aria-hidden="true" />{t.hero.status}</span>
                    <span>{t.hero.location}</span>
                    <span>{t.hero.langs}</span>
                </div>
            </div>
        </section>
    );
}
