const Brain = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>

      <filter id="brainGlow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path
      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
      fill="url(#brainGradient)"
      filter="url(#brainGlow)"
    />
    <path
      d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
      fill="url(#brainGradient)"
      filter="url(#brainGlow)"
    />

    {/* Detalhes em branco */}
    <path
      d="M10 8c.5-.5 1-.8 1.5-.8M10 11c.5-.3 1-.5 1.5-.5M10 14c.5-.2 1-.3 1.5-.3"
      stroke="#ffffff"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);
export default Brain;
