import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Vitality-style cursor: a dot that sticks to the pointer + a lagging ring.
// The ring grows over links/buttons and fills with a label over [data-cursor="..."] elements.
export default function Cursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
    const [hover, setHover] = useState(false);
    const [label, setLabel] = useState('');
    const [down, setDown] = useState(false);
    const [onHot, setOnHot] = useState(false);

    useEffect(() => {
        const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
        const over = (e) => {
            const el = e.target.closest('a, button, [data-cursor]');
            setHover(!!el);
            setLabel(el?.dataset.cursor || '');
            // Over accent-coloured surfaces, switch the cursor to dark so it stays visible
            setOnHot(!!e.target.closest('.btn-pill, .tape'));
        };
        const press = () => setDown(true);
        const release = () => setDown(false);

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseover', over);
        window.addEventListener('mousedown', press);
        window.addEventListener('mouseup', release);
        return () => {
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseover', over);
            window.removeEventListener('mousedown', press);
            window.removeEventListener('mouseup', release);
        };
    }, [x, y]);

    const cls = ['cursor', hover && 'is-hover', label && 'has-label', down && 'is-down', onHot && 'on-hot'].filter(Boolean).join(' ');

    return (
        <div className={cls} aria-hidden="true">
            <motion.div className="cursor__pos" style={{ x: ringX, y: ringY }}>
                <div className="cursor__ring">
                    <span className="cursor__label">{label}</span>
                </div>
            </motion.div>
            <motion.div className="cursor__pos" style={{ x, y }}>
                <div className="cursor__dot" />
            </motion.div>
        </div>
    );
}
