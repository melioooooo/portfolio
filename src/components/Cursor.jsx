import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--text-main)',
                mixBlendMode: 'difference',
                pointerEvents: 'none',
                zIndex: 10000,
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        />
    );
}
