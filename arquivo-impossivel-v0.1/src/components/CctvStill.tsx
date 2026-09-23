export function CctvStill() {
  return (
    <div className="cctv-frame" role="img" aria-label="Câmera de segurança mostrando Marta saindo pela recepção às 18:35:14">
      <svg viewBox="0 0 900 500" className="cctv-art" aria-hidden="true">
        <defs>
          <linearGradient id="wall" x1="0" x2="1">
            <stop offset="0%" stopColor="#adb7ba" />
            <stop offset="100%" stopColor="#798589" />
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="table" tableValues="0 0.14" /></feComponentTransfer>
          </filter>
        </defs>
        <rect width="900" height="500" fill="#737e81" />
        <rect width="900" height="350" fill="url(#wall)" />
        <polygon points="0,350 900,305 900,500 0,500" fill="#515b5e" />
        <rect x="585" y="72" width="210" height="278" rx="3" fill="#30393c" />
        <rect x="606" y="94" width="168" height="235" fill="#c6d0d1" opacity="0.68" />
        <rect x="70" y="184" width="300" height="135" rx="4" fill="#606d70" />
        <rect x="94" y="160" width="115" height="24" fill="#414b4e" />
        <circle cx="488" cy="235" r="28" fill="#222b2e" />
        <path d="M456 269 Q490 245 523 271 L540 374 L430 374 Z" fill="#263033" />
        <path d="M455 283 L398 344" stroke="#263033" strokeWidth="20" strokeLinecap="round" />
        <path d="M518 286 L577 331" stroke="#263033" strokeWidth="20" strokeLinecap="round" />
        <path d="M459 369 L445 449" stroke="#263033" strokeWidth="22" strokeLinecap="round" />
        <path d="M514 369 L539 446" stroke="#263033" strokeWidth="22" strokeLinecap="round" />
        <rect width="900" height="500" filter="url(#noise)" opacity="0.48" />
        <g opacity="0.14" stroke="#e8f4f5" strokeWidth="1">
          {Array.from({ length: 31 }).map((_, index) => <line key={index} x1="0" y1={index * 16} x2="900" y2={index * 16} />)}
        </g>
      </svg>
      <div className="cctv-overlay cctv-top"><span>CAM 02</span><span>REC</span></div>
      <div className="cctv-overlay cctv-bottom"><span>RECEPÇÃO / SAÍDA PRINCIPAL</span><strong>18:35:14</strong></div>
    </div>
  )
}
