import { Stethoscope } from 'lucide-react';
import { DoctorCard } from './DoctorCard';
import doctorsData from '../../data/doctors.json';
import type { Doctor } from '../../types/doctors';

const doctors = doctorsData as Doctor[];
const availableCount = doctors.filter((doctor) => doctor.available).length;

export function DoctorsSection() {
  return (
    <section id="doctors" className="content-section scroll-mt-20" aria-labelledby="doctors-title">
      <div className="page-container">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="demo-badge mb-4">
            <Stethoscope size={14} aria-hidden="true" />
            <span>ДЕМО-КАРТКИ СПЕЦІАЛІСТІВ</span>
          </div>
          <h2 id="doctors-title" className="section-title">Картки лікарів ВЛК</h2>
          <div className="section-divider mx-auto my-4 max-w-xs" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
            Цей блок демонструє адаптивну карткову сітку, lazy-loading зображень і доступні стани інтерактивних елементів. Дані в картках є демонстраційними.
          </p>
        </header>

        <dl className="stats-grid mb-10">
          <div className="glass-card rounded-sm p-4 text-center">
            <dt className="tactical-label text-[var(--color-text-muted)]">Карток</dt>
            <dd className="military-heading mt-1 text-2xl text-[var(--color-ukraine-yellow)]">{doctors.length}</dd>
          </div>
          <div className="glass-card rounded-sm p-4 text-center">
            <dt className="tactical-label text-[var(--color-text-muted)]">Доступні в демо</dt>
            <dd className="military-heading mt-1 text-2xl text-[var(--color-ukraine-yellow)]">{availableCount}</dd>
          </div>
          <div className="glass-card rounded-sm p-4 text-center">
            <dt className="tactical-label text-[var(--color-text-muted)]">Зображення</dt>
            <dd className="military-heading mt-1 text-2xl text-[var(--color-ukraine-yellow)]">WebP</dd>
          </div>
        </dl>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3" style={{ alignItems: 'stretch' }}>
          {doctors.map((doctor) => (
            <li key={doctor.id} className="min-w-0 h-full">
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>

        <div className="demo-notice mt-8 text-center" role="note">
          Фото, контакти та графіки в цьому навчальному проєкті не слід використовувати як реальну довідкову інформацію.
        </div>
      </div>
    </section>
  );
}
