// Single source of truth for the facts shown on the site, the /resume page and the PDF.
// Edit here; the copy that is language-specific lives in translations.js.

export const profile = {
    name: 'Elio Baumann',
    email: 'elio71b@gmail.com',
    linkedin: 'https://www.linkedin.com/in/elio-baumann/',
    discord: 'https://discord.com/users/369518613260009472',
    // TODO: add the real profile URL; the Instagram button stays hidden while this is empty.
    instagram: '',
    pdf: { fr: '/cv-elio-baumann-fr.pdf', en: '/cv-elio-baumann-en.pdf' },
};

export const languages = [
    { fr: 'Français', en: 'French', level: { fr: 'Natif', en: 'Native' } },
    { fr: 'Anglais', en: 'English', level: { fr: 'C1+', en: 'C1+' } },
    { fr: 'Espagnol', en: 'Spanish', level: { fr: 'B2+', en: 'B2+' } },
    { fr: 'Polonais', en: 'Polish', level: { fr: 'A2', en: 'A2' } },
];

// `featured` entries open the home page list; the rest fold under "other jobs".
const experienceRows = [
    { key: 'aea', company: 'Alsace Esport Arena', fr: 'Depuis sept. 2025', en: 'Since Sept 2025', featured: true },
    { key: 'field_agent_25', company: 'Pays de Montbéliard Agglomération', fr: 'Juil. – août 2025', en: 'July – Aug 2025', featured: true },
    { key: 'field_agent_24', company: 'Pays de Montbéliard Agglomération', fr: 'Juil. – août 2024', en: 'July – Aug 2024', featured: true },
    { key: 'intermarche', company: 'Intermarché Saint-Apollinaire', fr: 'Sept. 2023 – janv. 2024', en: 'Sept 2023 – Jan 2024' },
    { key: 'hyper_u', company: 'Hyper U Exincourt', fr: 'Mai – août 2023', en: 'May – Aug 2023' },
    { key: 'mission_handicap', company: 'Mission Handicap', fr: 'Janv. – juin 2023', en: 'Jan – June 2023' },
];

const educationRows = [
    { key: 'mediaschool', school: 'Mediaschool Strasbourg', fr: '2025 – présent', en: '2025 – present' },
    { key: 'u_bourgogne', school: 'Université de Bourgogne', fr: '2022 – 2025', en: '2022 – 2025' },
    { key: 'lycee', school: 'Lycée Louis Aragon', fr: '2019 – 2022', en: '2019 – 2022' },
];

// Dated facts from the AEA events and exchanges (no figures, no claims beyond the role).
const eventRows = [
    { name: 'LAN Rocket League AEA 2026', roles: { fr: ['Event planning', 'Régie', 'Communication'], en: ['Event planning', 'Stage management', 'Communication'] } },
    { name: 'LAN Black Ops 7 AEA 2026', roles: { fr: ['Event planning', 'Régie'], en: ['Event planning', 'Stage management'] } },
    { name: { fr: 'LANs Fortnite — éditions multiples', en: 'Fortnite LANs — multiple editions' }, roles: { fr: ['Event planning', 'Création de visuels', 'Communication'], en: ['Event planning', 'Visual creation', 'Communication'] } },
];

const internationalRows = [
    { type: { fr: 'Échange Erasmus — 1 semestre', en: 'Erasmus exchange — 1 semester' }, place: { fr: 'Valence, Espagne', en: 'Valencia, Spain' }, year: '2024' },
    { type: { fr: 'Échange linguistique', en: 'Linguistic exchange' }, place: { fr: 'Asturies, Espagne', en: 'Asturias, Spain' }, year: '2019' },
];

const pick = (v, language) => (typeof v === 'string' ? v : v[language]);

export function getCv(t, language) {
    return {
        events: eventRows.map((r) => ({ name: pick(r.name, language), roles: r.roles[language] })),
        international: internationalRows.map((r) => ({ type: r.type[language], place: r.place[language], year: r.year })),
        experience: experienceRows.map((r) => ({
            id: r.key,
            company: r.company,
            featured: !!r.featured,
            period: r[language],
            role: t.experience.roles[r.key].role,
            description: t.experience.roles[r.key].description,
        })),
        education: educationRows.map((r) => ({
            id: r.key,
            school: r.school,
            period: r[language],
            degree: t.experience.education[r.key].degree,
            details: t.experience.education[r.key].details,
        })),
    };
}
