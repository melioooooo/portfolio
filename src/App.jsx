import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import NoiseOverlay from './components/NoiseOverlay';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import PortfolioHome from './components/PortfolioHome';
import Resume from './components/Resume';

import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<PortfolioHome />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { pathname, state } = useLocation();
  const { t } = useLanguage();
  useEffect(() => { if (!state?.scrollTo) window.scrollTo(0, 0); }, [pathname, state]);

  return (
    <div className="App">
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <NoiseOverlay />
      <ScrollProgress />
      <Cursor />
      <AnimatedRoutes />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Smooth scroll is decoration: skip it for people who ask for less motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
