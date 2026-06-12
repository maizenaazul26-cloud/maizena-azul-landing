import { THEME } from '../constants/theme';

/**
 * SVG icon components for Blue Sky Group landing
 */

export function ProspectIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="9" stroke={THEME.primary} strokeWidth="2.5" />
      <line x1="21" y1="21" x2="28" y2="28" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="4" fill={THEME.primary} opacity="0.15" />
      <path d="M11 14h6M14 11v6" stroke={THEME.primary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CommerceIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="26" height="18" rx="3" stroke={THEME.primary} strokeWidth="2.5" />
      <path d="M3 14h26" stroke={THEME.primary} strokeWidth="2.5" />
      <rect x="7" y="18" width="8" height="4" rx="1" fill={THEME.primary} opacity="0.15" />
      <circle cx="24" cy="20" r="2" fill={THEME.primary} opacity="0.3" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10h12M12 6l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EcosystemConnector({ direction = 'horizontal' }) {
  const isVertical = direction === 'vertical';
  return (
    <svg
      className={`ecosystem-connector ecosystem-connector--${direction}`}
      width={isVertical ? 24 : 42}
      height={isVertical ? 28 : 12}
      viewBox={isVertical ? '0 0 24 28' : '0 0 42 12'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {isVertical ? (
        <path d="M12 2v22m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M2 6h36m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function CheckIcon({ size = 18, color = THEME.primary }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" fill={color} opacity="0.1" />
      <path d="M5.5 9.5l2 2 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlueSkyLogo({ height = 32 }) {
  return (
    <svg height={height} viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill={THEME.primary} />
      <path
        d="M10 18c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke={THEME.white}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="2" fill={THEME.white} opacity="0.5" />
      <circle cx="20" cy="12" r="1.5" fill={THEME.white} opacity="0.3" />
      <text x="40" y="22" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill={THEME.textDark}>
        Blue Sky
      </text>
      <text x="128" y="22" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="18" fill={THEME.textMuted}>
        Group
      </text>
    </svg>
  );
}

/* ── Benefit icons for Prospect section ────── */

export function TargetIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={THEME.primary} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke={THEME.primary} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill={THEME.primary} />
    </svg>
  );
}

export function SegmentIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={THEME.primary} strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={THEME.primary} strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={THEME.primary} strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill={THEME.primary} opacity="0.15" stroke={THEME.primary} strokeWidth="1.5" />
    </svg>
  );
}

export function QualifyIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18l4-5 4 3 4-6 4-3" stroke={THEME.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="7" r="2.5" fill={THEME.primary} opacity="0.2" stroke={THEME.primary} strokeWidth="1.2" />
    </svg>
  );
}

export function MessageIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="14" rx="3" stroke={THEME.primary} strokeWidth="1.5" />
      <path d="M2 7l10 6 10-6" stroke={THEME.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OrganizeIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h18M3 18h12" stroke={THEME.primary} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="18" r="2.5" fill={THEME.primary} opacity="0.2" stroke={THEME.primary} strokeWidth="1.2" />
    </svg>
  );
}

export function FocusIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={THEME.primary} strokeWidth="1.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={THEME.primary} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill={THEME.primary} opacity="0.15" stroke={THEME.primary} strokeWidth="1.5" />
    </svg>
  );
}

const benefitIconMap = {
  target: TargetIcon,
  segment: SegmentIcon,
  qualify: QualifyIcon,
  message: MessageIcon,
  organize: OrganizeIcon,
  focus: FocusIcon,
};

export function BenefitIcon({ type, size = 24 }) {
  const Icon = benefitIconMap[type];
  return Icon ? <Icon size={size} /> : null;
}
