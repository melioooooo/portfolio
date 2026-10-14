import { useLanguage } from '../context/LanguageContext';

// Tilted scrolling strip (inspired by vitality.gg). Pauses on hover.
export default function Tape() {
    const { t } = useLanguage();
    // Doubled so the -50% loop is seamless
    const words = [...t.tape, ...t.tape];

    return (
        <div className="tape-wrap" aria-label={t.tape.join(' · ')}>
            <div className="tape">
                <div className="tape__row" aria-hidden="true">
                    {words.map((word, i) => (
                        <span key={i}>{word}<i /></span>
                    ))}
                </div>
            </div>
        </div>
    );
}
