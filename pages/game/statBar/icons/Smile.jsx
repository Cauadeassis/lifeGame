const Smile = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="smileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>

      <filter id="smileGlow">
        <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Círculo do rosto */}
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="url(#smileGradient)"
      filter="url(#smileGlow)"
    />

    {/* Sorriso */}
    <path
      d="M8 14s1.5 2 4 2 4-2 4-2"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Olhos */}
    <circle cx="9" cy="9.5" r="1.5" fill="#ffffff" />
    <circle cx="15" cy="9.5" r="1.5" fill="#ffffff" />
  </svg>
);
export default Smile;
