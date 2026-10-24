import { useState } from 'react';
import { Accessibility, ClipboardList, Code2, ShieldCheck } from 'lucide-react';
import { Header } from './components/layout/Header';
import { RegistrationForm } from './components/form/RegistrationForm';
import { DoctorsSection } from './components/doctors/DoctorsSection';
import { SuccessScreen } from './components/ui/SuccessScreen';
import { Trident } from './components/ui/Icons';
import type { SubmissionResult } from './types/form';

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="absolute inset-0 camo-bg" aria-hidden="true" />
      <div className="absolute inset-0 tactical-grid opacity-50" aria-hidden="true" />
      <div className="hero-accent hero-accent-right" aria-hidden="true" />
      <div className="hero-accent hero-accent-left" aria-hidden="true" />

      <div className="page-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <div className="min-w-0 text-center lg:text-start">
            <div className="demo-badge mb-6">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>ДЕМОНСТРАЦІЙНИЙ REACT-ІНТЕРФЕЙС</span>
            </div>

            <h1 id="hero-title" className="hero-title">
              Багатокрокова
              <span className="block text-[var(--color-ukraine-yellow)]">реєстраційна форма</span>
              <span className="block text-[var(--color-ukraine-blue-light)]">React 19 + Tailwind CSS 4</span>
            </h1>

            <div className="section-divider my-6 max-w-xl lg:me-auto" aria-hidden="true" />

            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-text-secondary)] lg:mx-0">
              Навчальний UI-проєкт для перевірки архітектури, багатокрокової валідації, доступності та адаптивності.
              Він не є офіційним державним сервісом і не передає введені дані до зовнішніх систем.
            </p>

            <dl className="hero-stats">
              <div className="hero-stat">
                <Code2 size={16} aria-hidden="true" />
                <dt>Стек</dt>
                <dd>React 19</dd>
              </div>
              <div className="hero-stat">
                <ClipboardList size={16} aria-hidden="true" />
                <dt>Форма</dt>
                <dd>7 кроків</dd>
              </div>
              <div className="hero-stat">
                <Accessibility size={16} aria-hidden="true" />
                <dt>Доступність</dt>
                <dd>WCAG 2.2</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="#registration-form" className="btn-primary min-h-12 px-7 py-3 text-center text-sm">
                Відкрити демо-форму
              </a>
              <a href="#doctors" className="btn-secondary min-h-12 px-7 py-3 text-center text-sm">
                Переглянути картки
              </a>
            </div>
          </div>

          <div className="hero-emblem hidden lg:flex" aria-hidden="true">
            <div className="hero-emblem-outer">
              <div className="hero-emblem-inner">
                <Trident size={108} className="hero-trident" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBanner() {
  const items = [
    '7 послідовних кроків',
    'Чернетка тільки в sessionStorage',
    'Клавіатурна навігація',
    'Адаптивний layout',
  ];

  return (
    <aside className="info-banner" aria-label="Особливості демонстрації">
      <div className="page-container">
        <ul className="info-banner-list">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </aside>
  );
}

function FormSection({ onSubmitSuccess }: { onSubmitSuccess: (regNumber: string, formData: SubmissionResult['formData']) => void }) {
  return (
    <section className="form-page-section camo-bg tactical-grid" aria-labelledby="registration-form-title">
      <div className="page-container max-w-3xl">
        <header className="mb-8 text-center sm:mb-10">
          <div className="demo-badge demo-badge-gold mb-4">
            <ClipboardList size={14} aria-hidden="true" />
            <span>ДЕМОНСТРАЦІЯ БАГАТОКРОКОВОЇ ФОРМИ</span>
          </div>
          <h2 id="registration-form-title" className="section-title">Облікова форма — UI demo</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
            Поля використовуються лише для демонстрації поведінки інтерфейсу. Не вводьте реальні чутливі персональні або медичні дані.
          </p>
        </header>

        <RegistrationForm onSubmitSuccess={onSubmitSuccess} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="flex items-center gap-3">
          <Trident size={22} />
          <div>
            <div className="military-heading text-sm text-[var(--color-text-primary)]">FORM TEST</div>
            <div className="tactical-label text-[0.625rem] text-[var(--color-text-muted)]">REACT UI DEMO</div>
          </div>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-[var(--color-text-dim)]">
          © {new Date().getFullYear()} Демонстраційний навчальний інтерфейс. Не є офіційним сервісом ЗСУ, МОУ або іншого державного органу.
        </p>
        <div className="ua-stripe h-1 w-12 rounded-sm sm:h-4 sm:w-8" aria-hidden="true" />
      </div>
    </footer>
  );
}

function App() {
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);

  if (submission) {
    return (
      <SuccessScreen
        regNumber={submission.regNumber}
        formData={submission.formData}
        onReset={() => setSubmission(null)}
      />
    );
  }

  return (
    <div id="top" className="min-h-screen bg-[var(--color-army-black)]">
      <a href="#main-content" className="skip-link">Перейти до основного вмісту</a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <InfoBanner />
        <FormSection onSubmitSuccess={(regNumber, formData) => setSubmission({ regNumber, formData })} />
        <DoctorsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
