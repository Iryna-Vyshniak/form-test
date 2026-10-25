import type { ComponentType, CSSProperties } from 'react';
import trident from '../../assets/trident.png';

interface TridentProps {
  size?: number;
  className?: string;
  decorative?: boolean;
  alt?: string;
}

export function Trident({ size = 24, className = '', decorative = true, alt = 'Тризуб' }: TridentProps) {
  return (
    <img
      src={trident}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
      width={size}
      height={size}
      className={className}
      decoding="async"
    />
  );
}

export function ShieldIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2 3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4Z" />
    </svg>
  );
}

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Рейтинг: ${rating} з ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <svg
          key={index}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className={index < Math.floor(rating) ? 'text-[var(--color-ukraine-yellow)]' : 'text-[var(--color-army-medium)]'}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span className={`availability-badge ${available ? 'availability-badge-available' : 'availability-badge-busy'}`}>
      <span className="availability-dot" aria-hidden="true" />
      {available ? 'ДОСТУПНИЙ' : 'ЗАЙНЯТИЙ'}
    </span>
  );
}

interface SectionTitleProps {
  icon?: ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
}

export function SectionTitle({ icon: Icon, title, subtitle, step, totalSteps }: SectionTitleProps) {
  return (
    <header className="mb-8">
      {step && totalSteps && (
        <div className="tactical-label mb-2 flex items-center gap-2" aria-hidden="true">
          <span className="text-[var(--color-ukraine-yellow)]">КРОК {step} / {totalSteps}</span>
          <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
        </div>
      )}
      <div className="flex min-w-0 items-center gap-3">
        {Icon && <Icon size={28} className="shrink-0 text-[var(--color-ukraine-yellow)]" />}
        <h3 className="military-heading min-w-0 text-balance text-xl text-[var(--color-text-primary)] sm:text-2xl">{title}</h3>
      </div>
      {subtitle && <p className="mt-2 max-w-prose text-sm leading-relaxed text-[var(--color-text-muted)] sm:ms-10">{subtitle}</p>}
      <div className="section-divider mt-4" aria-hidden="true" />
    </header>
  );
}
