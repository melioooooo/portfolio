import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Hero from './Hero';
import Experience from './Experience';
import Creations from './Creations';
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
};

export default function PortfolioHome() {
    const navigate = useNavigate();

    useEffect(() => {
        // Lenis is now handled globally in App.jsx
    }, []);

    return (
        <motion.div
            className="portfolio-home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageVariants.transition}
        >
            <Navbar />
            <main>
                <Hero />
                <Experience />
                <Creations />
                <About />

                <Footer />
            </main>
        </motion.div>
    );
}
