import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Remplace ceci par ton propre ID Discord
const DISCORD_ID = '369518613260009472'; // L'ID d'un développeur Lanyard pour l'exemple

export default function SpotifyWidget() {
    const [spotifyData, setSpotifyData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchLanyard = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const { data } = await res.json();

                if (data && data.spotify) {
                    setSpotifyData(data.spotify);
                } else {
                    setSpotifyData(null);
                }
            } catch (error) {
                console.error("Erreur API Lanyard:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchLanyard();
        // Mise à jour toutes les 10 secondes
        const interval = setInterval(fetchLanyard, 10000);

        return () => clearInterval(interval);
    }, []);

    if (!isLoaded || !isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                zIndex: 9999,
                width: '320px',
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'grab',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
            }}
            whileTap={{ cursor: 'grabbing' }}
        >
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    opacity: 0.5
                }}
            >
                ✕
            </button>

            {spotifyData ? (
                <>
                    {/* Cover Album */}
                    <a href={`https://open.spotify.com/track/${spotifyData.track_id}`} target="_blank" rel="noopener noreferrer">
                        <motion.div
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                position: 'relative'
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src={spotifyData.album_art_url}
                                alt={spotifyData.album}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    </a>

                    {/* Infos Musique Active */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                            <span style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                color: '#1DB954',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Listening to
                            </span>
                            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '8px' }}>
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: ['2px', '8px', '2px'] }}
                                        transition={{
                                            duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut"
                                        }}
                                        style={{ width: '2px', backgroundColor: '#1DB954' }}
                                    />
                                ))}
                            </div>
                        </div>

                        <a href={`https://open.spotify.com/track/${spotifyData.track_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <h4 style={{
                                fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-main)',
                                margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500
                            }}>
                                {spotifyData.song}
                            </h4>
                        </a>
                        <p style={{
                            fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)',
                            margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                            {spotifyData.artist}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    {/* Etat "Hors ligne / Not playing" */}
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '8px', flexShrink: 0,
                        background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="9" y1="18" x2="15" y2="18"></line>
                            <line x1="10" y1="22" x2="14" y2="22"></line>
                            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                        </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                        <span style={{
                            fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
                            textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}>
                            Spotify
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                            Not playing
                        </h4>
                    </div>
                </>
            )}
        </motion.div>
    );
}
