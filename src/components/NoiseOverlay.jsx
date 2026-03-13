export default function NoiseOverlay() {
  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0.05, // Very subtle opacity
          mixBlendMode: 'overlay',
          filter: 'url(#noiseFilter)',
        }}
      />
      <svg style={{ display: 'none' }}>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </>
  );
}
