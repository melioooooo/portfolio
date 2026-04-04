import { useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from './Hero';
import About from './About';
import Creations from './Creations';
import Experience from './Experience';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
};

export default function PortfolioHome() {
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
                <About />
                <Creations />
                <Experience />
                <Contact />
                <Footer />
            </main>
        </motion.div>
    );
}
