// Chamomile SVG
export function Chamomile({ size = 120, style = {}, className = '' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      {/* Petals — 12 around center */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + Math.cos(rad) * 30;
        const cy = 60 + Math.sin(rad) * 30;
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="7" ry="14"
            fill="rgba(255,250,235,0.88)"
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
          />
        );
      })}
      {/* Center disk */}
      <circle cx="60" cy="60" r="16" fill="#e9c349" />
      <circle cx="60" cy="60" r="11" fill="#d4a520" />
      {/* Center texture dots */}
      {Array.from({ length: 7 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + Math.cos((i / 7) * Math.PI * 2) * 5}
          cy={60 + Math.sin((i / 7) * Math.PI * 2) * 5}
          r="1.5"
          fill="rgba(233,195,73,0.5)"
        />
      ))}
      {/* Stem */}
      <line x1="60" y1="76" x2="58" y2="108" stroke="rgba(100,150,80,0.7)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="52" cy="96" rx="8" ry="5" fill="rgba(100,150,80,0.5)" transform="rotate(-30 52 96)" />
    </svg>
  );
}

// Peony SVG
export function Peony({ size = 130, style = {}, className = '' }) {
  const layers = [
    { count: 8, r: 28, rx: 10, ry: 18, fill: 'rgba(255,179,177,0.9)' },
    { count: 8, r: 20, rx: 8, ry: 14, fill: 'rgba(255,140,145,0.92)' },
    { count: 6, r: 13, rx: 7, ry: 11, fill: 'rgba(230,80,100,0.88)' },
    { count: 5, r: 7,  rx: 5, ry: 8,  fill: 'rgba(200,40,70,0.9)' },
  ];
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      {/* Leaves */}
      <ellipse cx="35" cy="100" rx="18" ry="8" fill="rgba(80,140,70,0.45)" transform="rotate(-40 35 100)" />
      <ellipse cx="95" cy="100" rx="16" ry="7" fill="rgba(80,140,70,0.4)" transform="rotate(40 95 100)" />
      {/* Stem */}
      <line x1="65" y1="95" x2="63" y2="122" stroke="rgba(100,150,80,0.6)" strokeWidth="3" strokeLinecap="round" />

      {/* Petal layers rendered outward → inward */}
      {layers.map((layer, li) =>
        Array.from({ length: layer.count }).map((_, i) => {
          const angle = (i / layer.count) * 360 + li * 22.5;
          const rad = (angle * Math.PI) / 180;
          const cx = 65 + Math.cos(rad) * layer.r;
          const cy = 65 + Math.sin(rad) * layer.r;
          return (
            <ellipse
              key={`${li}-${i}`}
              cx={cx} cy={cy}
              rx={layer.rx} ry={layer.ry}
              fill={layer.fill}
              transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
            />
          );
        })
      )}
      {/* Center */}
      <circle cx="65" cy="65" r="9" fill="rgba(255,220,200,0.95)" />
      <circle cx="65" cy="65" r="5" fill="rgba(255,200,180,1)" />
      {/* Stamens */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <circle key={i}
            cx={65 + Math.cos(a) * 4}
            cy={65 + Math.sin(a) * 4}
            r="1.2"
            fill="rgba(220,180,50,0.9)"
          />
        );
      })}
    </svg>
  );
}

// Small floating petal
export function FloatingPetal({ color = '#ffb3b1', size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
      <ellipse cx="10" cy="10" rx="4" ry="9" fill={color} transform="rotate(-20 10 10)" opacity="0.8" />
    </svg>
  );
}
