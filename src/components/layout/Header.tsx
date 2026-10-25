import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Trident } from '../ui/Icons';

const NAV_ITEMS = [
  { label: 'Форма', href: '#registration-form' },
  { label: 'Лікарі ВЛК', href: '#doctors' },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="ua-stripe w-full" aria-hidden="true" />

      <div className="page-container">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <a href="#top" className="brand-link" aria-label="На початок сторінки">
            <span className="brand-mark" aria-hidden="true">
              <Trident size={24} />
            </span>
            <span className="min-w-0">
              <span className="military-heading block text-base leading-none text-[var(--color-text-primary)]">FORM TEST</span>
              <span className="tactical-label block text-[0.625rem] leading-tight text-[var(--color-army-muted)]">DEMO UI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Головна навігація">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#registration-form" className="btn-primary hidden min-h-11 items-center px-4 py-2 text-xs md:inline-flex">
              Перейти до форми
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="icon-button md:hidden"
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden">
          <nav className="page-container flex flex-col py-3" aria-label="Мобільна навігація">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
