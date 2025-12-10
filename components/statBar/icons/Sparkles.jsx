const Sparkles = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="sparkleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>

      <linearGradient id="sparkleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#facc15" />
      </linearGradient>

      <filter id="sparkleGlow">
        <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Estrela grande */}
    <path
      d="M12 3l1.545 4.635L18.18 9.18l-4.635 1.545L12 15.36l-1.545-4.635L5.82 9.18l4.635-1.545L12 3z"
      fill="url(#sparkleGradient1)"
      filter="url(#sparkleGlow)"
    />

    {/* Estrela pequena 1 */}
    <path
      d="M6 3l.771 2.316L9.087 6.087 6.77 6.858 6 9.174 5.229 6.858 2.913 6.087l2.316-.771L6 3z"
      fill="url(#sparkleGradient2)"
      filter="url(#sparkleGlow)"
    />

    {/* Estrela pequena 2 */}
    <path
      d="M18 15l.771 2.316 2.316.771-2.316.771L18 21.174l-.771-2.316-2.316-.771 2.316-.771L18 15z"
      fill="url(#sparkleGradient2)"
      filter="url(#sparkleGlow)"
    />
  </svg>
);
export default Sparkles;
