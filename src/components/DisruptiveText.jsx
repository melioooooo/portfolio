import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fonts = ['font-display', 'font-pixel-grid', 'font-pixel-line', 'font-pixel-circle', 'font-pixel-triangle'];
const SETTLE_MS = 2600; // glitch on arrival, then rest on the readable pixel face
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function DisruptiveText({ children }) {
    const chars = Array.from(children);
    const [charFonts, setCharFonts] = useState(() => chars.map(() => 'font-display'));

    useEffect(() => {
        if (reduced()) return;
        const timers = chars.map((_, i) => setInterval(() => {
            setCharFonts(prev => {
                const next = [...prev];
                next[i] = fonts[Math.floor(Math.random() * fonts.length)];
                return next;
            });
        }, 150 + Math.random() * 300));
        const settle = setTimeout(() => {
            timers.forEach(clearInterval);
            setCharFonts(chars.map(() => 'font-display'));
        }, SETTLE_MS);
        return () => { timers.forEach(clearInterval); clearTimeout(settle); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chars.length]);

    return (
        <span aria-hidden="true" style={{ display: 'inline-block' }}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className={charFonts[i]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: 'backOut' }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}
