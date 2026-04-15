import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Creations() {
    const { t } = useLanguage();
    const [activeModal, setActiveModal] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'HOPLAN',
            category: t.creations.categories.dev,
            image: '/assets/images/hero_bg.png', // Temporary placeholder
            ready: true,
            isExternal: false,
            isModal: true,
            modalType: 'hoplan',
        },
        {
            id: 2,
            title: 'VEILLE AEA',
            category: t.creations.categories.dev,
            link: 'https://veille-aea.vercel.app',
            image: null,
            ready: true,
            isExternal: true,
        },
        {
            id: 3,
            title: 'CRÉA',
            category: 'Design & Graphics', // Custom category for the folder
            ready: true,
            isModal: true,
            modalType: 'crea',
        },
        {
            id: 4,
            title: 'PHOTOGRAPHIE',
            category: 'Shots & Retouches',
            ready: true,
            isModal: true,
            modalType: 'photo',
        },
    ];

    return (
        <section id="creations" style={{ padding: '10vh 0', minHeight: '100vh', position: 'relative' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}
                >
                    {t.creations.title}
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                    gap: '3rem'
                }}>
                    {projects.map((project, index) => {
                        const isLink = project.ready && !project.isModal;
                        const Wrapper = project.isExternal ? 'a' : (isLink ? Link : 'div');
                        
                        let wrapperProps = { style: { display: 'block', textDecoration: 'none', color: 'inherit' } };
                        
                        if (project.isExternal) {
                            wrapperProps.href = project.link;
                            wrapperProps.target = "_blank";
                            wrapperProps.rel = "noopener noreferrer";
                        } else if (isLink) {
                            wrapperProps.to = project.link;
                        } 
                        
                        if (project.isModal) {
                            wrapperProps.onClick = () => setActiveModal(project.modalType);
                            wrapperProps.style.cursor = 'pointer'; // Visual cue that it's clickable
                        }

                        return (
                            <Wrapper {...wrapperProps} key={project.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={project.ready ? { scale: 1.02 } : {}}
                                    style={{ cursor: project.ready && !project.isModal ? 'none' : (project.isModal ? 'pointer' : 'default') }}
                                >
                                    <div style={{
                                        height: '400px',
                                        backgroundColor: '#1a1a1a',
                                        marginBottom: '1.5rem',
                                        border: '1px solid #262626',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '2px',
                                    }}>
                                        {project.image ? (
                                            <motion.img
                                                src={project.image}
                                                alt={project.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                whileHover={{ scale: 1.1, filter: 'contrast(120%) brightness(110%)' }}
                                                transition={{ duration: 0.4 }}
                                            />
                                        ) : project.isModal ? (
                                            /* Folder Icon State for "Créa" & "Photo" */
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {project.modalType === 'photo' ? (
                                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                      <circle cx="12" cy="13" r="4"></circle>
                                                    </svg>
                                                ) : (
                                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                )}
                                                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>OPEN FOLDER</div>
                                            </div>
                                        ) : (
                                            /* Default Missing Image / Coming Soon fallback */
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 50%, #111 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                                                    backgroundSize: '40px 40px',
                                                }} />
                                                <span style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase',
                                                    color: 'var(--text-muted)',
                                                    opacity: 0.5,
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '2px',
                                                }}>
                                                    {project.ready ? 'No Preview' : 'Coming Soon'}
                                                </span>
                                            </div>
                                        )}
                                        {/* Glitch overlay for ready external links */}
                                        {project.ready && !project.isModal && (
                                            <motion.div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    opacity: 0,
                                                    pointerEvents: 'none'
                                                }}
                                                whileHover={{
                                                    opacity: [0, 0.2, 0.1, 0.3, 0.1, 0.2, 0],
                                                    x: [0, 5, -5, 5, -5, 0],
                                                    y: [0, 3, -3, 3, -3, 0],
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: "easeInOut",
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1]
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {project.title}
                                        {project.isExternal && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        )}
                                    </h3>
                                    <p style={{
                                        opacity: 0.5,
                                        marginTop: '0.5rem',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '0.9rem',
                                    }}>
                                        {project.category}
                                    </p>
                                </motion.div>
                            </Wrapper>
                        );
                    })}
                </div>
            </div>

            {/* Modals for Folders */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                        }}
                        onClick={() => setActiveModal(null)} // Close when clicking backdrop
                    >
                        <motion.div
                            initial={{ y: 100, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                height: '80vh',
                                backgroundColor: '#111',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
                        >
                            {/* Modal Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '1rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {activeModal === 'photo' ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                            <circle cx="12" cy="13" r="4"></circle>
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    )}
                                    {activeModal === 'photo' ? "Dossier: Galerie Photo" : activeModal === 'hoplan' ? "Dossier: Développement (Hoplan)" : "Dossier: Créations Graphiques"}
                                </h3>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    style={{
                                        background: 'none',
                                        border: '1px solid #333',
                                        color: '#fff',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#333'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content - Workspace for user */}
                            <div style={{
                                flex: 1,
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: activeModal === 'photo' ? 'row' : 'column',
                                alignItems: activeModal === 'photo' ? 'flex-start' : 'center',
                                justifyContent: activeModal === 'photo' ? 'flex-start' : 'center',
                                gap: '1rem',
                                color: '#555',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                border: activeModal === 'crea' ? '1px dashed #333' : 'none',
                                padding: activeModal === 'photo' ? '1rem 0' : '0'
                            }}>
                                {activeModal === 'photo' ? (
                                    /* MASONRY GALLERY PLACEHOLDER FOR PHOTO */
                                    <div style={{
                                        columnCount: 3,
                                        columnGap: '1rem',
                                        width: '100%',
                                    }}>
                                        {/* Demo photos - you can replace these URLs with your actual photo URLs in /assets/ */}
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((img, i) => (
                                            <div key={i} style={{ marginBottom: '1rem', breakInside: 'avoid', overflow: 'hidden', borderRadius: '4px' }}>
                                                <motion.img 
                                                    src={`https://picsum.photos/seed/${img + 40}/800/${Math.floor(Math.random() * 400) + 600}`} 
                                                    alt="Photo" 
                                                    style={{ width: '100%', display: 'block', borderRadius: '4px', filter: 'grayscale(30%)' }}
                                                    whileHover={{ filter: 'grayscale(0%)', scale: 1.02 }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : activeModal === 'hoplan' ? (
                                    /* HOPLAN CASE STUDY */
                                    <div style={{ padding: '0 2rem', width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                                        <h4 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Conçu de fond en comble</h4>
                                        <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                                            Création complète du site web <strong>Hoplan</strong> (Plateforme Esport globale). J'ai piloté ce projet de la phase de réflexion ergonomique jusqu'au déploiement final, en assurant une qualité professionnelle digne des standards de l'Esport moderne.
                                        </p>
                                        <div style={{ display: 'flex', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                                            <div style={{ flex: '1 1 200px' }}>
                                                <strong style={{ color: '#1DB954', display: 'block', marginBottom: '0.8rem', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>[UI / UX Design]</strong>
                                                <ul style={{ opacity: 0.7, paddingLeft: '1.2rem', lineHeight: 1.8 }}>
                                                    <li>Wireframing complet</li>
                                                    <li>Système de design Brutaliste</li>
                                                    <li>Parcours utilisateur gaming</li>
                                                </ul>
                                            </div>
                                            <div style={{ flex: '1 1 200px' }}>
                                                <strong style={{ color: '#1DB954', display: 'block', marginBottom: '0.8rem', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>[Développement]</strong>
                                                <ul style={{ opacity: 0.7, paddingLeft: '1.2rem', lineHeight: 1.8 }}>
                                                    <li>Stack: React 19 & Vite</li>
                                                    <li>Animations complexes (Framer Motion)</li>
                                                    <li>Optimisation des performances</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                           <a href="https://hoplan.gg" target="_blank" rel="noopener noreferrer" style={{
                                               display: 'inline-flex',
                                               alignItems: 'center',
                                               gap: '0.5rem',
                                               padding: '1rem 2rem',
                                               backgroundColor: '#f2f2f2',
                                               color: '#0e0e0e',
                                               fontWeight: 'bold',
                                               textDecoration: 'none',
                                               borderRadius: '4px',
                                               transition: 'transform 0.2s',
                                               boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
                                           }}
                                           onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                                           onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                           >
                                               Visiter hoplan.gg
                                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                                    <polyline points="7 7 17 7 17 17"></polyline>
                                               </svg>
                                           </a>
                                        </div>
                                    </div>
                                ) : (
                                    /* ORIGINAL CREA CONTENT */
                                    <>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>// Emplacement pour tes futures créations graphiques</p>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Tu pourras ajouter une grille d'images ici.</p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
