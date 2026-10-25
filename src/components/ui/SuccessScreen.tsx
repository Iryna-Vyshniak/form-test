import { useMemo, useState } from 'react';
import { CheckCircle, Copy, Printer, RotateCcw } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Trident } from './Icons';
import type { RegistrationFormData } from '../../types/form';

interface SuccessScreenProps {
  regNumber: string;
  formData: RegistrationFormData;
  onReset: () => void;
}

export function SuccessScreen({ regNumber, formData, onReset }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(regNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const fullName = [formData.personal.lastName, formData.personal.firstName, formData.personal.patronymic]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ');

  const qrPayload = useMemo(() => JSON.stringify({
    regNumber,
    fullName,
    email: formData.contact.email,
    phone: formData.contact.phone,
    issuedAt: new Date().toISOString(),
  }), [regNumber, fullName, formData.contact.email, formData.contact.phone]);

  return (
    <main className="success-page camo-bg tactical-grid">
      <a href="#success-content" className="skip-link">Перейти до підтвердження</a>
      <section id="success-content" className="w-full max-w-lg text-center" aria-labelledby="success-title">
        <div className="success-mark" aria-hidden="true">
          <CheckCircle size={48} />
          <span className="success-trident"><Trident size={18} /></span>
        </div>

        <h1 id="success-title" className="military-heading text-balance text-3xl text-[var(--color-text-primary)]">Демо завершено</h1>
        <div className="section-divider mx-auto my-5 max-w-xs" aria-hidden="true" />

        <p className="mb-6 text-pretty leading-relaxed text-[var(--color-text-secondary)]">
          {fullName ? `${fullName}, ` : ''}форма пройшла локальну перевірку. Жодні введені дані не були надіслані до зовнішнього сервера або державної системи.
        </p>

        <div className="glass-card gold-top mb-6 rounded-sm p-5 sm:p-6">
          <p className="tactical-label mb-2 text-[var(--color-text-muted)]">Демонстраційний ідентифікатор</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <code className="registration-code">{regNumber}</code>
            <button type="button" onClick={handleCopy} className="icon-button" aria-label="Копіювати демонстраційний ідентифікатор">
              {copied ? <CheckCircle size={18} className="text-[var(--color-success-light)]" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-dim)]" aria-live="polite">
            {copied ? 'Ідентифікатор скопійовано.' : 'Ідентифікатор існує лише для демонстрації UI.'}
          </p>
        </div>

        <div className="glass-card blue-top mb-6 rounded-sm p-5 sm:p-6">
          <p className="tactical-label mb-4 text-[var(--color-text-muted)]">QR-код з даними реєстрації</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="rounded-md bg-white p-3 shadow-lg">
              <QRCode value={qrPayload} size={120} bgColor="#ffffff" fgColor="#0d1008" />
            </div>
            <div className="max-w-xs text-sm leading-relaxed text-[var(--color-text-secondary)]">
              У QR-коді міститься демо-реєстраційний номер, ПІБ, контактний телефон і email. Це зберігається лише в браузерному UI для демонстрації.
            </div>
          </div>
        </div>

        <div className="demo-notice mb-8 text-start" role="note">
          <strong>Важливо:</strong> це навчальний фронтенд. Для реального сервісу потрібні автентифікація, захищений бекенд, серверна валідація, контроль доступу, журналювання та юридично коректний процес обробки персональних даних.
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onReset} className="btn-ghost inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm">
            <RotateCcw size={17} aria-hidden="true" />
            Нова демо-сесія
          </button>
          <button type="button" onClick={() => window.print()} className="btn-secondary inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm">
            <Printer size={17} aria-hidden="true" />
            Друкувати
          </button>
        </div>
      </section>
    </main>
  );
}
