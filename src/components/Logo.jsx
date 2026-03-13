import { motion } from 'framer-motion';

export default function Logo({ color = "white", size = 40 }) {
    const strokeColor = color;

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* Esport Vibe: Sharp, angular, aggressive but minimal. "Glitch" or "Speed" aesthetic. */}

                {/* The 'E' - Sharp angular bracket style */}
                <motion.path
                    d="M25 10 L 10 10 L 5 20 L 10 30 L 25 30"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                />

                {/* The 'B' element - A disconnected sharp line cutting through or complementing */}
                {/* Making it look like a crosshair or a tech glyph */}
                <motion.path
                    d="M 12 20 H 28 L 32 12"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeLinecap="square"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0, x: -10 }}
                    animate={{ pathLength: 1, opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
                />

                {/* A minimalist "dot" or "accent" typical in esport logos */}
                <motion.rect
                    x="28" y="27" width="4" height="4"
                    fill={strokeColor}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6, type: "spring" }}
                />

            </svg>
        </motion.div>
    );
}
