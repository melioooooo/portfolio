import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import DisruptiveText from './DisruptiveText';
import { useEffect, useRef } from 'react';

export default function Hero() {
    const { t } = useLanguage();
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.65; // Slow down the video by 35%
        }
    }, []);

    return (
        <section id="hero" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* SVG Dithering Filter Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    {/* Dithering effect: high-frequency noise + threshold to create dot pattern */}
                    <filter id="dither" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                        {/* Step 1: Generate fine noise grain */}
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="1.8" 
                            numOctaves="1" 
                            seed="2" 
                            result="noise" 
                        />
                        
                        {/* Step 2: Blend noise with the original full-color image */}
                        <feBlend in="SourceGraphic" in2="noise" mode="overlay" result="blended" />
                        
                        {/* Step 3: Posterize to create dither dots — keeps color channels intact */}
                        <feComponentTransfer result="dithered">
                            <feFuncR type="discrete" tableValues="0 0.12 0.25 0.4 0.55 0.7 0.85 1" />
                            <feFuncG type="discrete" tableValues="0 0.12 0.25 0.4 0.55 0.7 0.85 1" />
                            <feFuncB type="discrete" tableValues="0 0.12 0.25 0.4 0.55 0.7 0.85 1" />
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>

            {/* Video Background with Dithering */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'url(#dither)',
                    }}
                >
                    <source src="/assets/hero_bg.webm" type="video/webm" />
                </video>

                {/* Dark overlay to ensure text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(14,14,14,0.4) 0%, rgba(14,14,14,0.2) 40%, rgba(14,14,14,0.5) 100%)',
                }} />
            </div>

            {/* Content */}
            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                {/* Small label above title */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.5,
                        marginBottom: '1.5rem',
                        color: '#ffffff',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    }}
                >
                    Portfolio 2025–2026
                </motion.p>

                <div>
                    <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ duration: 1.2, ease: [0.6, 0.01, 0, 0.95], delay: 0.2 }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 400,
                            color: '#ffffff',
                            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        }}>
                            <DisruptiveText>
                                {t.hero.title}
                            </DisruptiveText>
                        </h1>
                    </motion.div>
                </div>

                <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                            fontWeight: 300,
                            fontFamily: 'var(--font-sans)',
                            letterSpacing: '0.05em',
                            color: '#ffffff',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            opacity: 0.85,
                        }}
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: '-25vh',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            width: '1px',
                            height: '40px',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
