import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data/cv';

// Floating 3D cassette. Idle: slow turn, reels stopped. When Elio is on Spotify (via Lanyard,
// which reads his Discord presence): reels spin, palette follows the cover, rewinds on track change.
const DISCORD_ID = profile.discord.split('/').pop();
const LANYARD = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;
const POLL_MS = 6000;
const LAST_KEY = 'cassette_last';
const PX_W = 1423, PX_H = 882, W = 10, H = W * PX_H / PX_W, D = W * 12 / 100.4, R = 0.32;
const LABEL = [70, 92, 1284, 540], WINDOW = [262, 262, 888, 328]; // px in the 1423x882 label art: paper, tape window
const IDLE = ['#ff5a1f', '#ffa23a', '#ff3d7f'];

function buildScene(canvas, label) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
    const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9b8ff, 1.2); rim.position.set(-6, 2, -5); scene.add(rim);

    const shape = new THREE.Shape(), x0 = -W / 2, y0 = -H / 2;
    shape.moveTo(x0 + R, y0);
    shape.lineTo(x0 + W - R, y0); shape.quadraticCurveTo(x0 + W, y0, x0 + W, y0 + R);
    shape.lineTo(x0 + W, y0 + H - R); shape.quadraticCurveTo(x0 + W, y0 + H, x0 + W - R, y0 + H);
    shape.lineTo(x0 + R, y0 + H); shape.quadraticCurveTo(x0, y0 + H, x0, y0 + H - R);
    shape.lineTo(x0, y0 + R); shape.quadraticCurveTo(x0, y0, x0 + R, y0);
    const BEV = 0.07;
    const geo = new THREE.ExtrudeGeometry(shape, {
        depth: D - 2 * BEV, bevelEnabled: true, bevelThickness: BEV, bevelSize: BEV, bevelOffset: -BEV, bevelSegments: 4, curveSegments: 24,
    });
    geo.translate(0, 0, -(D - 2 * BEV) / 2);
    const p = geo.attributes.position, uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) {
        let u = p.getX(i) / W + 0.5;
        if (p.getZ(i) < 0) u = 1 - u; // back face shows the label the right way round
        uv.setXY(i, u, p.getY(i) / H + 0.5);
    }
    uv.needsUpdate = true;

    // The label is a canvas: original artwork, plus the current cover and title painted on top.
    const cv = document.createElement('canvas'); cv.width = PX_W; cv.height = PX_H;
    const g = cv.getContext('2d');
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const tmp = document.createElement('canvas'); tmp.width = PX_W; tmp.height = PX_H;
    const base = new Image();
    let info = null;
    let fallback = null; // site-themed cover used until a real one is known
    const paint = (next = info) => {
        info = next;
        const cur = info || (fallback ||= { img: defaultCover(), color: new THREE.Color(IDLE[0]) });
        const cover = cur.img || (fallback ||= { img: defaultCover() }).img;
        const t = tmp.getContext('2d');
        // Shell: original plastic, recolored from a blurred copy of the cover so the whole body carries its colors.
        t.globalCompositeOperation = 'source-over'; t.globalAlpha = 1; t.clearRect(0, 0, PX_W, PX_H); t.drawImage(base, 0, 0, PX_W, PX_H);
        const big = Math.max(PX_W / cover.width, PX_H / cover.height) * 1.4;
        const blurred = () => { t.filter = 'blur(60px) saturate(1.8)'; t.drawImage(cover, (PX_W - cover.width * big) / 2, (PX_H - cover.height * big) / 2, cover.width * big, cover.height * big); t.filter = 'none'; };
        t.globalCompositeOperation = 'color'; blurred();
        t.globalCompositeOperation = 'multiply'; t.globalAlpha = 0.5; blurred(); t.globalAlpha = 1;
        t.globalCompositeOperation = 'destination-in'; t.drawImage(base, 0, 0, PX_W, PX_H);
        g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, PX_W, PX_H); g.drawImage(tmp, 0, 0);
        // Label paper: the cover itself, cover-fit, leaving the tape window (reels, hubs) untouched.
        const [lx, ly, lw, lh] = LABEL, k = Math.max(lw / cover.width, lh / cover.height);
        g.save(); g.beginPath(); g.roundRect(lx, ly, lw, lh, 36); g.roundRect(...WINDOW, 120); g.clip('evenodd');
        g.drawImage(cover, lx + (lw - cover.width * k) / 2, ly + (lh - cover.height * k) / 2, cover.width * k, cover.height * k);
        g.restore();
        tex.needsUpdate = true;
    };
    base.onload = () => paint();
    base.src = label;

    const U = {
        uTime: { value: 0 }, uTilt: { value: 0 }, uAngL: { value: 0 }, uAngR: { value: 0 }, uAngS: { value: 0 },
        uC1: { value: new THREE.Color(IDLE[0]) }, uC2: { value: new THREE.Color(IDLE[1]) }, uC3: { value: new THREE.Color(IDLE[2]) },
        uHolo: { value: 1 },
    };
    const faceMat = new THREE.MeshPhysicalMaterial({
        map: tex, alphaTest: 0.5, alphaToCoverage: true, side: THREE.FrontSide, roughness: 0.3, metalness: 0,
        clearcoat: 1, clearcoatRoughness: 0.05, iridescence: 0.55, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 620],
        envMapIntensity: 1.0, specularIntensity: 0.8,
    });
    faceMat.onBeforeCompile = (s) => {
        Object.assign(s.uniforms, U);
        s.fragmentShader = `
    uniform float uTime, uTilt, uAngL, uAngR, uAngS, uHolo;
    uniform vec3 uC1, uC2, uC3;
    vec2 rotAbout(vec2 p, vec2 c, float a){ vec2 d = p - c; float cs = cos(a), sn = sin(a); return c + mat2(cs, -sn, sn, cs) * d; }
    vec2 reelUV(vec2 uv){
      vec2 px = vec2(uv.x * ${PX_W}.0, (1.0 - uv.y) * ${PX_H}.0);
      vec2 cL = vec2(431.4, 414.9), cR = vec2(985.7, 417.3);
      vec2 sL = vec2(151.0, 779.0), sR = vec2(1276.0, 776.0);
      if (distance(px, cL) < 128.0) px = rotAbout(px, cL, uAngL);
      else if (distance(px, cR) < 128.0) px = rotAbout(px, cR, uAngR);
      else if (distance(px, sL) < 48.0) px = rotAbout(px, sL, uAngS);
      else if (distance(px, sR) < 48.0) px = rotAbout(px, sR, -uAngS);
      return vec2(px.x / ${PX_W}.0, 1.0 - px.y / ${PX_H}.0);
    }
    vec3 holoRamp(float t){
      t = fract(t) * 3.0;
      vec3 a = t < 1.0 ? uC1 : (t < 2.0 ? uC2 : uC3);
      vec3 b = t < 1.0 ? uC2 : (t < 2.0 ? uC3 : uC1);
      return mix(a, b, smoothstep(0.0, 1.0, fract(t)));
    }
  ` + s.fragmentShader
            .replace('#include <map_fragment>', `
      vec2 ruv = reelUV(vMapUv);
      vec4 sampledDiffuseColor = texture2D(map, ruv);
      diffuseColor *= sampledDiffuseColor;
    `)
            .replace('#include <opaque_fragment>', `
      {
        vec3 V = normalize(vViewPosition);
        float ndv = clamp(abs(dot(normal, V)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 2.2);
        vec2 hv = vMapUv;
        float t = hv.x * 0.55 + hv.y * 0.35 + (1.0 - ndv) * 1.6 + uTilt * 0.9 + uTime * 0.02;
        vec3 holo = holoRamp(t);
        float sweep = hv.x * 0.85 + hv.y * 0.45 - (0.65 + uTilt * 1.4);
        float band = exp(-sweep * sweep * 22.0);
        float lum = dot(sampledDiffuseColor.rgb, vec3(0.299, 0.587, 0.114));
        float mask = smoothstep(0.12, 0.55, lum);
        float k = uHolo * mask * (0.24 + 0.85 * band + 0.6 * fres);
        outgoingLight = 1.0 - (1.0 - outgoingLight) * (1.0 - holo * k);
      }
      #include <opaque_fragment>
    `);
    };
    const sideMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#f04bb4'), roughness: 0.1, metalness: 0, transparent: true, opacity: 0.9,
        clearcoat: 1, clearcoatRoughness: 0.04, iridescence: 0.9, iridescenceIOR: 1.4, iridescenceThicknessRange: [250, 700],
        sheen: 0.4, sheenColor: new THREE.Color('#b78cff'), envMapIntensity: 1.3,
    });
    const pivot = new THREE.Group(); pivot.add(new THREE.Mesh(geo, [faceMat, sideMat])); scene.add(pivot);

    const resize = () => {
        const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const vf = THREE.MathUtils.degToRad(camera.fov), t = Math.tan(vf / 2);
        const dist = Math.max((H * 1.55 / 2) / t, (Math.hypot(W, D) * 1.22 / 2) / (t * camera.aspect));
        camera.position.set(0, 0, dist + D); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
    };

    const dispose = () => {
        geo.dispose(); faceMat.dispose(); sideMat.dispose(); tex.dispose(); pmrem.dispose(); scene.environment?.dispose();
        renderer.dispose();
    };
    return { renderer, scene, camera, pivot, U, sideMat, rim, resize, dispose, setLabel: paint };
}

// Three vivid hues from the cover art; falls back to hues derived from the title if the image is blocked.
// Cover used when nothing is known yet: the site's own dithered sun, so the cassette is never anyone else's art.
function defaultCover() {
    const N = 80, CELL = 8, c = document.createElement('canvas'); c.width = c.height = N * CELL;
    const g = c.getContext('2d'), B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    g.fillStyle = '#0e0e0e'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = IDLE[0];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const r = Math.min(1, Math.hypot(x / N - 0.68, y / N - 0.38) / 0.62);
        if (Math.pow(1 - r, 1.5) > (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16) g.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
    // Visible paper = the band above the tape window: cover rows ~185..265 once the square is cropped to the label
    g.font = '56px "Geist Pixel", monospace'; g.textBaseline = 'alphabetic';
    g.fillStyle = '#0e0e0e'; g.fillRect(40, 192, 430, 76); g.fillStyle = IDLE[0];
    g.fillText('ELIO BAUMANN', 60, 250);
    return c;
}
function loadCover(url) {
    return new Promise((res) => {
        const img = new Image(); img.crossOrigin = 'anonymous'; // refused CORS = no image at all, so the canvas is never tainted
        img.onload = () => res(img); img.onerror = () => res(null);
        img.src = url;
    });
}
function paletteOf(img) {
    try {
        const c = document.createElement('canvas'); c.width = c.height = 40;
        const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, 40, 40);
        const d = g.getImageData(0, 0, 40, 40).data, hsl = {}, col = new THREE.Color();
        const bins = Array.from({ length: 18 }, () => ({ w: 0, h: 0, s: 0, l: 0 }));
        for (let i = 0; i < d.length; i += 4) {
            col.setRGB(d[i] / 255, d[i + 1] / 255, d[i + 2] / 255, THREE.SRGBColorSpace); col.getHSL(hsl, THREE.SRGBColorSpace);
            const wgt = hsl.s * (1 - Math.abs(hsl.l - 0.5) * 1.6);
            if (wgt <= 0.05) continue;
            const b = bins[Math.floor(hsl.h * 18) % 18]; b.w += wgt; b.h += hsl.h * wgt; b.s += hsl.s * wgt; b.l += hsl.l * wgt;
        }
        const top = bins.filter(b => b.w > 0).sort((a, b) => b.w - a.w).slice(0, 3)
            .map(b => new THREE.Color().setHSL(b.h / b.w, Math.min(1, b.s / b.w * 1.25 + 0.15), THREE.MathUtils.clamp(b.l / b.w, 0.5, 0.68), THREE.SRGBColorSpace));
        return top.length ? top : null;
    } catch { return null; }
}
function hashPalette(str) {
    let h = 0; for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const base = (h % 360) / 360;
    return [0, 0.12, 0.24].map(o => new THREE.Color().setHSL((base + o) % 1, 0.9, 0.62, THREE.SRGBColorSpace));
}

export default function CassetteWidget() {
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const rootRef = useRef(null);
    const [track, setTrack] = useState(() => {
        try { const m = JSON.parse(localStorage.getItem(LAST_KEY)); return m?.id ? { ...m, url: `https://open.spotify.com/track/${m.id}`, live: false } : null; }
        catch { return null; } // storage blocked or corrupt: start from the site cover
    });
    const [away, setAway] = useState(false); // hidden while the footer (which has its own identity) is on screen
    const live = useRef({ playing: false, progress: 0.5, rewindUntil: 0, palette: null, label: null, labelDirty: false, shownId: null, visible: true });

    useEffect(() => { live.current.visible = !away; }, [away]);

    useEffect(() => {
        const footer = document.querySelector('.footer__scene');
        if (!footer) return;
        const io = new IntersectionObserver(([e]) => setAway(e.isIntersecting), { threshold: 0.15 });
        io.observe(footer);
        return () => io.disconnect();
    }, []);

    // What to show: the live Lanyard track, else the last one this browser saw (Lanyard has no history), else the site cover.
    useEffect(() => {
        const L = live.current;
        let stop = false, timer;
        const meta = (m) => ({ ...m, url: `https://open.spotify.com/track/${m.id}` });
        const show = async (m) => {
            L.shownId = m.id;
            const img = m.art ? await loadCover(m.art) : null;
            if (stop || L.shownId !== m.id) return; // superseded by a newer track
            L.palette = (img && paletteOf(img)) || hashPalette(m.title + m.artist);
            L.label = { img };
            L.labelDirty = true;
        };
        try { const saved = JSON.parse(localStorage.getItem(LAST_KEY)); if (saved?.id) show(saved); } catch { /* see initial state */ }

        const poll = async () => {
            if (document.hidden) return;
            try {
                const r = await fetch(LANYARD);
                const sp = (await r.json())?.data?.spotify;
                if (stop) return;
                if (!sp) { L.playing = false; setTrack(prev => (prev?.live ? { ...prev, live: false } : prev)); return; }
                L.playing = true;
                const { start, end } = sp.timestamps;
                L.progress = Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
                const m = { id: sp.track_id, title: sp.song, artist: sp.artist.replaceAll(';', ','), art: sp.album_art_url };
                setTrack(prev => (prev?.id === m.id && prev.live ? prev : { ...meta(m), live: true }));
                if (m.id !== L.shownId) {
                    if (L.shownId) L.rewindUntil = performance.now() + 1100;
                    try { localStorage.setItem(LAST_KEY, JSON.stringify(m)); } catch { /* ignore */ }
                    show(m);
                }
            } catch { /* offline or Lanyard down: keep the last state */ }
        };
        poll(); timer = setInterval(poll, POLL_MS);
        return () => { stop = true; clearInterval(timer); };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current, L = live.current;
        // Decorative widget: without WebGL it simply stays out, it must never take the page down.
        let S;
        try { S = buildScene(canvas, '/assets/images/cassette-label.webp'); } catch { return; }
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ro = new ResizeObserver(S.resize); ro.observe(canvas); S.resize();
        const target = IDLE.map(c => new THREE.Color(c)), side = new THREE.Color('#f04bb4');
        const clock = new THREE.Clock();
        let raf, rotY = 0, reelSpeed = 0;

        const frame = () => {
            raf = requestAnimationFrame(frame);
            const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
            if (!L.visible) return;
            const { U } = S;
            if (L.labelDirty) { L.labelDirty = false; S.setLabel(L.label && { ...L.label, color: L.palette?.[0] }); }
            U.uTime.value = t;
            rotY += dt * (Math.PI * 2 / 14) * (reduce ? 0.3 : 1);
            const tiltX = Math.sin(t * 0.55) * 0.22;
            S.pivot.rotation.set(tiltX, rotY, Math.sin(t * 0.37) * 0.04);
            S.pivot.position.y = Math.sin(t * 0.8) * 0.08;
            U.uTilt.value = tiltX * 1.6 + Math.sin(rotY) * 0.35;

            // reel angular speed = tape speed / reel radius, like a real cassette
            const rewinding = performance.now() < L.rewindUntil;
            const want = rewinding ? -6 : (L.playing && !reduce ? 1 : 0);
            reelSpeed += (want - reelSpeed) * Math.min(1, dt * (rewinding ? 6 : 2.5));
            const p = L.progress, r0 = 0.45, r1 = 1.0;
            const rL = Math.sqrt(r0 * r0 + (1 - p) * (r1 * r1 - r0 * r0)), rR = Math.sqrt(r0 * r0 + p * (r1 * r1 - r0 * r0));
            const base = 1.6 * reelSpeed * dt;
            U.uAngL.value += base * 0.72 / rL; U.uAngR.value += base * 0.72 / rR; U.uAngS.value += base * 3.2;

            const pal = L.palette || target;
            const k = Math.min(1, dt * 1.5);
            U.uC1.value.lerp(pal[0], k); U.uC2.value.lerp(pal[1] || pal[0], k); U.uC3.value.lerp(pal[2] || pal[0], k);
            S.sideMat.color.lerp(L.palette ? pal[0] : side, k);
            S.sideMat.sheenColor.lerp(pal[1] || pal[0], k);
            S.rim.color.lerp(pal[2] || pal[0], k);
            S.renderer.render(S.scene, S.camera);
        };
        frame();
        return () => { cancelAnimationFrame(raf); ro.disconnect(); S.dispose(); };
    }, []);

    return (
        <aside ref={rootRef} className={`cassette no-print${away ? ' is-away' : ''}`} aria-label={t.cassette.label}>
            {track && (
                <a className="cassette__chip" href={track.url} target="_blank" rel="noopener noreferrer">
                    <i className="status-dot" aria-hidden="true" />
                    <span><b>{track.live ? t.cassette.now : t.cassette.last}</b> {track.title} — {track.artist}</span>
                </a>
            )}
            <canvas ref={canvasRef} className="cassette__canvas" aria-hidden="true" />
        </aside>
    );
}
