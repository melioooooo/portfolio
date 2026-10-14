# Portfolio / CV en ligne — Elio Baumann

Vite + React. Site bilingue FR/EN, page `/resume` imprimable, PDF téléchargeables.

```
npm run dev       # développement
npm run build     # production (dist/)
npm run lint
```

## Modifier le contenu

| Quoi | Où |
|---|---|
| Email, liens, Instagram, chemins des PDF, expériences, formations, langues | `src/data/cv.js` |
| Textes (FR + EN) | `src/data/translations.js` |
| Projets (une ligne par projet) | `src/components/Creations.jsx` |
| Couleur d'accent, tokens | `:root` dans `src/index.css` (`--hot`) |

## Régénérer les PDF

Le CV PDF est imprimé depuis `/resume` (styles `@media print`). Avec le site lancé (`npm run preview`) :

```
google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=public/cv-elio-baumann-fr.pdf "http://localhost:4173/resume?lang=fr"
google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=public/cv-elio-baumann-en.pdf "http://localhost:4173/resume?lang=en"
```

Pour utiliser ton propre PDF, remplace simplement ces deux fichiers dans `public/`.
