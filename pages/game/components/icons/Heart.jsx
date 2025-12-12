const Heart = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      {/* Gradiente vermelho */}
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#ee5a6f" />
      </linearGradient>

      {/* Sombra */}
      <filter id="heartShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>

      {/* Brilho */}
      <linearGradient id="heartShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Coração principal */}
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#heartGradient)"
      filter="url(#heartShadow)"
    />

    {/* Brilho no topo */}
    <ellipse
      cx="10"
      cy="7"
      rx="4"
      ry="3"
      fill="url(#heartShine)"
      opacity="0.6"
    />
  </svg>
);
export default Heart;
