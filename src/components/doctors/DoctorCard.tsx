import { Calendar, Phone, Star } from 'lucide-react';
import { AvailabilityBadge, StarRating } from '../ui/Icons';
import type { Doctor } from '../../types/doctors';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doctor-card glass-card flex h-full flex-col overflow-hidden rounded-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-3)]">
        <img
          src={doctor.photo}
          alt={`Фото: ${doctor.name}, ${doctor.specialty}`}
          width="640"
          height="640"
          className="doctor-img h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
        <div className="doctor-photo-overlay" aria-hidden="true" />

        <div className="absolute start-3 top-3 max-w-[70%] sm:max-w-[65%]">
          <div className="rank-badge rounded-sm">{doctor.rank}</div>
        </div>
        <div className="absolute end-3 top-3">
          <AvailabilityBadge available={doctor.available} />
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <h3 className="military-heading text-balance text-lg leading-tight text-white drop-shadow-lg">{doctor.specialty}</h3>
        </div>
      </div>

      <div className="doctor-card-body flex flex-1 flex-col p-4">
        <div>
          <p className="text-sm font-semibold leading-snug text-[var(--color-text-primary)]">{doctor.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={doctor.rating} />
            <span className="text-xs text-[var(--color-text-muted)]">{doctor.rating.toFixed(1)}</span>
          </div>
        </div>

        <ul className="mt-3 flex flex-wrap gap-1" aria-label="Спеціалізації">
          {doctor.specializations.slice(0, 2).map((specialization) => (
            <li key={specialization} className="specialization-chip">{specialization}</li>
          ))}
        </ul>

        <dl className="mt-3 flex flex-1 flex-col gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex min-w-0 items-start gap-2">
            <Star size={13} className="mt-0.5 shrink-0 text-[var(--color-ukraine-yellow)]" aria-hidden="true" />
            <dt className="sr-only">Досвід</dt>
            <dd className="min-w-0 break-words">Досвід: <span className="text-[var(--color-text-secondary)]">{doctor.experience}</span></dd>
          </div>
          <div className="flex min-w-0 items-start gap-2">
            <Calendar size={13} className="mt-0.5 shrink-0 text-[var(--color-ukraine-blue-light)]" aria-hidden="true" />
            <dt className="sr-only">Графік</dt>
            <dd className="min-w-0 break-words text-[var(--color-text-secondary)]">{doctor.schedule}</dd>
          </div>
          <div className="flex min-w-0 items-start gap-2">
            <Phone size={13} className="mt-0.5 shrink-0 text-[var(--color-army-muted)]" aria-hidden="true" />
            <dt className="sr-only">Демонстраційний телефон</dt>
            <dd className="min-w-0 break-words">{doctor.phone}</dd>
          </div>
        </dl>

        <div className="mt-4">
          {doctor.available ? (
            <a href="#registration-form" className="btn-primary flex min-h-11 w-full items-center justify-center px-3 py-2 text-center text-xs">
              Відкрити демо-форму
            </a>
          ) : (
            <span className="unavailable-control" aria-disabled="true">НЕДОСТУПНИЙ У ДЕМО</span>
          )}
        </div>
      </div>

      <div className={`h-0.5 ${doctor.available ? 'bg-[var(--color-ukraine-yellow)]' : 'bg-[var(--color-surface-3)]'}`} aria-hidden="true" />
    </article>
  );
}
