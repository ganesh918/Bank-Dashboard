function StatIcon({ type, color }) {
  const common = { stroke: color, fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round' };
  switch (type) {
    case 'chart-up':
      return (
        <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
          <path {...common} d="M4 18 L10 10 L14 14 L20 6" />
          <path {...common} d="M16 6 H20 V10" />
        </svg>
      );
    case 'medical':
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <path fill={color} d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" />
        </svg>
      );
    case 'piggy':
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <ellipse cx="12" cy="13" rx="8" ry="6" stroke={color} fill="none" strokeWidth="1.8" />
          <circle cx="16" cy="10" r="1.2" fill={color} />
        </svg>
      );
    case 'pie':
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <path fill={color} d="M12 3a9 9 0 109 9h-9V3z" opacity="0.85" />
          <circle cx="12" cy="12" r="9" stroke={color} fill="none" strokeWidth="1.5" />
        </svg>
      );
    case 'repeat':
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <path {...common} d="M7 7h10v4M17 17H7v-4M17 7l3 3-3 3M7 17l-3-3 3-3" />
        </svg>
      );
    case 'money-bag':
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <path {...common} d="M8 8c0-2 2-3 4-3s4 1 4 3v2H8V8z" />
          <path {...common} d="M6 10h12c1 0 2 1 2 3v5c0 2-2 3-4 3h-4c-2 0-4-1-4-3v-5c0-2 1-3 2-3z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="2" stroke={color} fill="none" strokeWidth="1.8" />
          <path stroke={color} strokeWidth="1.8" d="M8 10h8" />
        </svg>
      );
  }
}

export default function StatCard({ label, value, iconBg, iconColor, icon, iconSrc }) {
  return (
    <article className="stat-card">
      <div className="stat-card__icon" style={{ backgroundColor: iconBg }}>
        {iconSrc ? (
          <img className="stat-card__glyph" src={iconSrc} alt="" width={30} height={30} />
        ) : (
          <StatIcon type={icon} color={iconColor} />
        )}
      </div>
      <div className="stat-card__copy">
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
    </article>
  );
}
