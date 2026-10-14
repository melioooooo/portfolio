import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Hero from './Hero';
import Tape from './Tape';
import About from './About';
import Creations from './Creations';
import Experience from './Experience';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PortfolioHome() {
    const { state } = useLocation();

    // Arriving from /resume via a nav link: scroll to the requested section
    useEffect(() => {
        if (!state?.scrollTo) return;
        const id = setTimeout(() => document.getElementById(state.scrollTo)?.scrollIntoView(), 100);
        return () => clearTimeout(id);
    }, [state]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Navbar />
            <main id="main">
                <Hero />
                <Tape />
                <About />
                <Creations />
                <Experience />
                <Contact />
            </main>
            <Footer />
        </motion.div>
    );
}
