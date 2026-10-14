import { useEffect, useRef } from 'react';

// 8x8 Bayer matrix, normalised to 0..1
const B = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21].map(v => (v + 0.5) / 64);

const CELL = 4; // CSS px per dither dot
const HOT = [255, 90, 31];
const BG = [14, 14, 14];

const TONE = [1, 0.7, 0.5, 0.32];

// variant 'ridges': layered landscape rising from the bottom (footer). 'sun': one breathing orb (hero).
export default function DitherField({ className, variant = 'ridges' }) {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w, h, img, R, G, raf = 0, mx = 0.5, tx = 0.5, last = 0, seen = false, enter = -1;

        const resize = () => {
            const nw = Math.max(1, Math.ceil(canvas.clientWidth / CELL));
            const nh = Math.max(1, Math.ceil(canvas.clientHeight / CELL));
            if (nw === w && nh === h) return;
            w = nw; h = nh; canvas.width = w; canvas.height = h;
            img = ctx.createImageData(w, h); R = new Float64Array(w * 4); G = new Float64Array(w);
            if (still) draw(4000);
        };

        // Ridge heights and pointer glow only depend on x: compute once per column, not per pixel.
        function draw(ms) {
            const t = ms / 1000;
            const dt = last ? Math.min(3, (ms - last) / 16.67) : 1; last = ms;
            mx += (tx - mx) * (1 - Math.pow(0.94, dt));
            if (seen && enter < 0) enter = t;
            const k = still ? 1 : enter < 0 ? 0 : Math.min(1, (t - enter) / 1.2);
            const reveal = k * k * (3 - 2 * k);
            const sun = variant === 'sun';
            if (!sun) for (let x = 0; x < w; x++) {
                const nx = x / w, gx = nx - mx;
                for (let i = 0; i < 4; i++) {
                    const j = i + 1;
                    R[x * 4 + i] = 0.34 - i * 0.1 + 0.07 * Math.sin(nx * (2.1 + j * 1.3) + t * (0.25 + i * 0.1) + i * 2) + 0.04 * Math.sin(nx * 9 + t * 0.4 + j);
                }
                G[x] = 0.35 * Math.exp(-gx * gx * 14);
            }
            const aspect = w / h, cx = (aspect < 1 ? 0.7 : 0.76) + (mx - 0.5) * 0.08, cy = aspect < 1 ? 0.3 : 0.4;
            const breathe = 0.88 + 0.12 * Math.sin(t * 0.6);
            const d = img.data;
            for (let y = 0; y < h; y++) {
                const ny = y / h, fade = (sun ? 1 : Math.min(1, ny * 3)) * reveal;
                for (let x = 0; x < w; x++) {
                    let v;
                    if (sun) {
                        const dx = (x / w - cx) * Math.max(aspect, 1), dy = (ny - cy) * Math.max(1 / aspect, 1);
                        const r = Math.min(1, Math.hypot(dx, dy) / 0.55);
                        v = Math.pow(1 - r, 1.7) * 0.85 * breathe * fade;
                    } else {
                        let hgt = 0;
                        for (let i = 0; i < 4; i++) {
                            const dd = ny - R[x * 4 + i];
                            if (dd > 0) hgt = Math.max(hgt, TONE[i] * Math.min(1, dd * 60));
                        }
                        v = Math.min(1, hgt + G[x] * ny) * fade;
                    }
                    const c = v > B[(y & 7) * 8 + (x & 7)] ? HOT : BG;
                    const o = (y * w + x) * 4;
                    d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
                }
            }
            ctx.putImageData(img, 0, 0);
        }

        const loop = (ms) => { draw(ms); raf = requestAnimationFrame(loop); };
        const onMove = (e) => { tx = e.clientX / innerWidth; };
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { seen = true; if (!still && !raf) raf = requestAnimationFrame(loop); }
            else { cancelAnimationFrame(raf); raf = 0; }
        });
        io.observe(canvas);
        resize();
        addEventListener('resize', resize);
        if (!still) addEventListener('pointermove', onMove);

        return () => {
            cancelAnimationFrame(raf); io.disconnect();
            removeEventListener('resize', resize); removeEventListener('pointermove', onMove);
        };
    }, [variant]);

    return <canvas ref={ref} className={className} aria-hidden="true" />;
}
