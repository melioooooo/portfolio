import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Creations() {
    const { t } = useLanguage();

    const projects = [
        { id: 1, title: 'CExAEA Preview', category: t.creations.categories.plugin, link: '/preview-cexaea/', image: '/assets/images/hero_bg.png' },
        { id: 2, title: 'Project Beta', category: t.creations.categories.dev, link: '#' },
        { id: 3, title: 'Project Gamma', category: t.creations.categories.concept, link: '#' },
    ];

    return (
        <section id="creations" style={{ padding: '10vh 0', minHeight: '100vh' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '4rem', marginBottom: '4rem' }}
                >
                    {t.creations.title}
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem'
                }}>
                    {projects.map((project, index) => (
                        <Link to={project.link} key={project.id} style={{ display: 'block' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                style={{ cursor: 'none' }}
                            >
                                <div style={{
                                    height: '400px',
                                    backgroundColor: '#1a1a1a',
                                    marginBottom: '1.5rem',
                                    border: '1px solid #333',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {project.image ? (
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            whileHover={{ scale: 1.1, filter: 'contrast(120%) brightness(110%)' }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(45deg, #1a1a1a, #222)',
                                        }} />
                                    )}
                                    {/* Overlay for Glitch/Scanline effect */}
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
                                </div>
                                <h3 style={{ fontSize: '2rem' }}>{project.title}</h3>
                                <p style={{ opacity: 0.5, marginTop: '0.5rem' }}>{project.category}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
