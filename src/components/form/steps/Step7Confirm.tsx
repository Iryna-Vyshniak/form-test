import type { ReactNode } from 'react';
import { CheckCircle, Edit2 } from 'lucide-react';
import { SectionTitle } from '../../ui/Icons';
import { FormField, FIELD_TYPE } from '../FormField';
import { VLK_CATEGORIES } from '../../../utils/validation';
import type { FieldChangeHandler, FieldErrors, FieldValue, RegistrationFormData } from '../../../types/form';

function DataRow({ label, value }: { label: string; value?: FieldValue | null }) {
  if (value === undefined || value === null || value === '') return null;

  const displayValue = typeof value === 'boolean'
    ? value ? 'Так' : 'Ні'
    : Array.isArray(value)
      ? value.join(', ')
      : String(value);

  return (
    <div className="grid min-w-0 gap-1 border-b border-[var(--color-border-subtle)] py-2 last:border-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
      <dt className="field-summary-label">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-[var(--color-text-primary)] sm:text-end">{displayValue}</dd>
    </div>
  );
}

function SummarySection({
  title,
  step,
  children,
  onEdit,
}: {
  title: string;
  step: number;
  children: ReactNode;
  onEdit: (step: number) => void;
}) {
  return (
    <section className="glass-card overflow-hidden rounded-sm" aria-labelledby={`summary-step-${step}`}>
      <header className="flex flex-wrap items-center justify-between gap-2 bg-[var(--color-surface-3)] px-4 py-3">
        <h4 id={`summary-step-${step}`} className="military-heading text-sm text-[var(--color-text-primary)]">{title}</h4>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="interactive-link"
          aria-label={`Редагувати розділ «${title}»`}
        >
          <Edit2 size={14} aria-hidden="true" />
          <span>Редагувати</span>
        </button>
      </header>
      <dl className="px-4 py-3">{children}</dl>
    </section>
  );
}

interface Step7ConfirmProps {
  data: RegistrationFormData;
  onEdit: (step: number) => void;
  onChange: FieldChangeHandler;
  errors: FieldErrors;
  submitting: boolean;
}

export function Step7Confirm({ data, onEdit, onChange, errors, submitting }: Step7ConfirmProps) {
  const vlkLabel = VLK_CATEGORIES.find((category) => category.value === data.medical.vlkCategory)?.label;
  const driverCategories = Array.isArray(data.education.driverCategories) ? data.education.driverCategories : [];

  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={CheckCircle}
        title="Підтвердження та огляд"
        subtitle="Перевірте введені дані. У цій демонстраційній версії вони нікуди не надсилаються."
        step={7}
        totalSteps={7}
      />

      <SummarySection title="Особисті дані" step={1} onEdit={onEdit}>
        <DataRow label="Прізвище" value={data.personal.lastName} />
        <DataRow label="Ім’я" value={data.personal.firstName} />
        <DataRow label="По батькові" value={data.personal.patronymic} />
        <DataRow label="Дата народження" value={data.personal.birthDate} />
        <DataRow label="Стать" value={data.personal.gender === 'male' ? 'Чоловіча' : data.personal.gender === 'female' ? 'Жіноча' : undefined} />
        <DataRow label="Сімейний стан" value={data.personal.maritalStatus} />
        <DataRow label="Місце народження" value={[data.personal.birthOblast, data.personal.birthCity].filter(Boolean).join(', ')} />
        <DataRow label="Дітей" value={data.personal.childrenCount} />
      </SummarySection>

      <SummarySection title="Паспортні дані" step={2} onEdit={onEdit}>
        <DataRow label="РНОКПП" value={data.documents.taxId} />
        <DataRow label="Тип документа" value={data.documents.documentType} />
        <DataRow label="Номер" value={data.documents.documentNumber} />
        <DataRow label="Дата видачі" value={data.documents.documentIssueDate} />
        <DataRow label="Ким виданий" value={data.documents.documentIssuedBy} />
        <DataRow label="Адреса реєстрації" value={[data.documents.regOblast, data.documents.regCity, data.documents.regStreet].filter(Boolean).join(', ')} />
      </SummarySection>

      <SummarySection title="Освіта та фах" step={3} onEdit={onEdit}>
        <DataRow label="Рівень освіти" value={data.education.educationLevel} />
        <DataRow label="Навчальний заклад" value={data.education.educationInstitution} />
        <DataRow label="Спеціальність" value={data.education.educationSpecialty} />
        <DataRow label="Зайнятість" value={data.education.employed} />
        <DataRow label="Іноземні мови" value={data.education.languages} />
        <DataRow label="Водійські права" value={data.education.hasDriverLicense ? driverCategories.join(', ') || 'Так' : 'Ні'} />
      </SummarySection>

      <SummarySection title="Додаткові відомості" step={4} onEdit={onEdit}>
        <DataRow label="Категорія" value={data.military.militaryCategory} />
        <DataRow label="Звання" value={data.military.militaryRank} />
        <DataRow label="ВОС" value={data.military.militaryVOS} />
        <DataRow label="Попередній досвід" value={data.military.combatExperience} />
        <DataRow label="Бажаний напрям" value={data.military.preferredBranch} />
      </SummarySection>

      <SummarySection title="Медичні дані" step={5} onEdit={onEdit}>
        <DataRow label="Зріст / вага" value={data.medical.height && data.medical.weight ? `${data.medical.height} см / ${data.medical.weight} кг` : undefined} />
        <DataRow label="Група крові" value={data.medical.bloodType} />
        <DataRow label="Резус-фактор" value={data.medical.rhFactor === 'positive' ? 'Rh+' : data.medical.rhFactor === 'negative' ? 'Rh-' : undefined} />
        <DataRow label="Стан здоров’я" value={data.medical.healthStatus} />
        <DataRow label="Хронічні захворювання" value={data.medical.hasChronicConditions ? 'Так' : 'Ні'} />
        <DataRow label="Категорія ВЛК" value={vlkLabel} />
      </SummarySection>

      <SummarySection title="Контактні дані" step={6} onEdit={onEdit}>
        <DataRow label="Телефон" value={data.contact.phone} />
        <DataRow label="Email" value={data.contact.email} />
        <DataRow label="Екстрений контакт" value={data.contact.emergencyName} />
        <DataRow label="Телефон контакту" value={data.contact.emergencyPhone} />
      </SummarySection>

      <section className="glass-card gold-top space-y-4 rounded-sm p-5" aria-labelledby="consent-title">
        <h4 id="consent-title" className="military-heading text-sm text-[var(--color-ukraine-yellow)]">ЗГОДА ТА ПІДТВЕРДЖЕННЯ</h4>

        <FormField
          name="consentPersonalData"
          type={FIELD_TYPE.CHECKBOX}
          value={data.consentPersonalData}
          onChange={onChange}
          error={errors.consentPersonalData}
          required
          placeholder="Я розумію, що це демонстраційний інтерфейс, і погоджуюсь на локальну обробку введених даних у межах поточної вкладки браузера."
        />
        <FormField
          name="consentAccuracy"
          type={FIELD_TYPE.CHECKBOX}
          value={data.consentAccuracy}
          onChange={onChange}
          error={errors.consentAccuracy}
          required
          placeholder="Я підтверджую правильність введених даних для демонстрації роботи форми."
        />
        <FormField
          name="consentMedical"
          type={FIELD_TYPE.CHECKBOX}
          value={data.consentMedical}
          onChange={onChange}
          error={errors.consentMedical}
          required
          placeholder="Я розумію, що медичні дані в цій демонстрації не надсилаються до медичних або державних систем."
        />
        <FormField
          name="consentNotification"
          type={FIELD_TYPE.CHECKBOX}
          value={data.consentNotification}
          onChange={onChange}
          placeholder="Показувати демонстраційні повідомлення про стан заявки."
        />
      </section>

      <div className="demo-notice" role="note">
        <strong>Демонстраційний режим:</strong> форма не підключена до державних систем або бекенду. Після натискання кнопки дані лише використовуються для локального екрана підтвердження.
      </div>

      {submitting && (
        <div className="py-4 text-center" role="status" aria-live="polite">
          <div className="inline-flex items-center gap-3 text-[var(--color-ukraine-yellow)]">
            <span className="loading-spinner" aria-hidden="true" />
            <span className="tactical-label">Формування демонстраційної заявки…</span>
          </div>
        </div>
      )}
    </div>
  );
}
