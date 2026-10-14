/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

// ?lang=en wins (used to print the EN PDF), then the saved choice, then French.
function initialLanguage() {
    try {
        const q = new URLSearchParams(window.location.search).get('lang');
        if (q in translations) return q;
        const saved = localStorage.getItem('lang');
        if (saved in translations) return saved;
    } catch { /* storage blocked: fall through */ }
    return 'fr';
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(initialLanguage);
    const t = translations[language];

    const toggleLanguage = () => {
        const next = language === 'fr' ? 'en' : 'fr';
        setLanguage(next);
        try { localStorage.setItem('lang', next); } catch { /* ignore */ }
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
