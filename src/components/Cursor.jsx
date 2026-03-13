import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, []);

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
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
        />
    );
}
