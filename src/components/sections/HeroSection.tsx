import { Accessibility, ClipboardList, Code2, ShieldCheck } from "lucide-react";
import { Trident } from "../ui/Icons";

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
              Навчальний тестовий UI-проєкт для перевірки архітектури, багатокрокової валідації, доступності та адаптивності.
              Увага! Він не є офіційним державним сервісом і не передає введені дані до зовнішніх систем.
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

export default HeroSection;