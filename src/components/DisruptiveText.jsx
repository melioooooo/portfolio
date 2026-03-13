import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const fonts = [
    'font-display',        // Geist Pixel (base)
    'font-pixel-grid',     // Geist Pixel Grid
    'font-pixel-line',     // Geist Pixel Line
    'font-pixel-circle',   // Geist Pixel Circle
    'font-pixel-triangle', // Geist Pixel Triangle
];

export default function DisruptiveText({ children, className = "" }) {
    const characters = Array.from(children);

    // State to hold current font for each character
    const [charFonts, setCharFonts] = useState(() =>
        characters.map(() => fonts[Math.floor(Math.random() * fonts.length)])
    );

    // Function to randomize a single character's font
    const randomizeChar = useCallback((index) => {
        setCharFonts(prev => {
            const newFonts = [...prev];
            newFonts[index] = fonts[Math.floor(Math.random() * fonts.length)];
            return newFonts;
        });
    }, []);

    // Set up staggered intervals for each character
    useEffect(() => {
        const intervals = characters.map((_, index) => {
            // Each letter gets a random interval between 150ms and 600ms
            const randomInterval = 150 + Math.random() * 450;
            // Add initial delay based on position for staggered start
            const initialDelay = index * 50;

            const timeoutId = setTimeout(() => {
                // Start the continuous randomization
                const intervalId = setInterval(() => {
                    randomizeChar(index);
                }, randomInterval);

                // Store interval ID for cleanup
                intervals[index] = intervalId;
            }, initialDelay);

            return timeoutId;
        });

        // Cleanup all intervals on unmount
        return () => {
            intervals.forEach(id => {
                clearTimeout(id);
                clearInterval(id);
            });
        };
    }, [characters.length, randomizeChar]);

    return (
        <span className={className} style={{ display: 'inline-block' }}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    className={charFonts[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: "backOut"
                    }}
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'pre',
                        transition: 'font-family 0.1s ease-out'
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}
