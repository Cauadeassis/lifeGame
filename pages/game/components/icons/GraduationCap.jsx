const GraduationCap = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Capelo (parte superior) */}
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />

    {/* Base do capelo */}
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
export default GraduationCap;
