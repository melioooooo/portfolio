import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import NoiseOverlay from './components/NoiseOverlay';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import PortfolioHome from './components/PortfolioHome';
import Resume from './components/Resume';
import ExternalApp from './apps/external-app/App';
import SpotifyWidget from './components/SpotifyWidget';

import { LanguageProvider } from './context/LanguageContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/preview-cexaea/*" element={<ExternalApp />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="App">
      <NoiseOverlay />
      <ScrollProgress />
      <Cursor />
      <SpotifyWidget />
      <AnimatedRoutes />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7, // Lower duration makes it feel lighter and snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2, // Slightly increase multiplier for lighter scroll feel
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
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
