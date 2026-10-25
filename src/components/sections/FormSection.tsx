import { ClipboardList } from "lucide-react";
import { RegistrationForm } from "../form/RegistrationForm";
import { SubmissionResult } from "../../types/form";

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

export default FormSection;