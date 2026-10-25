import { useActionState, useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

import { useMultiStep } from '../../hooks/useMultiStep';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { validateRegistrationStep } from '../../utils/validation';
import type { FieldErrors, FieldValue, RegistrationFormData } from '../../types/form';
import { StepIndicator } from './StepIndicator';
import { Step1Personal } from './steps/Step1Personal';
import { Step2Documents } from './steps/Step2Documents';
import { Step3Education } from './steps/Step3Education';
import { Step4Military } from './steps/Step4Military';
import { Step5Medical } from './steps/Step5Medical';
import { Step6Contact } from './steps/Step6Contact';
import { Step7Confirm } from './steps/Step7Confirm';

const TOTAL_STEPS = 7;
const DRAFT_KEY = 'form_test_demo_draft_v3';

export const INITIAL_FORM_DATA: RegistrationFormData = {
  personal: {},
  documents: {},
  education: {},
  military: {},
  medical: {},
  contact: {},
  consentPersonalData: false,
  consentAccuracy: false,
  consentMedical: false,
  consentNotification: false,
};

interface RegistrationFormProps {
  onSubmitSuccess: (regNumber: string, formData: RegistrationFormData) => void;
}

type SubmitState = { status: 'idle' | 'submitted' };

const focusFirstInvalid = (form: HTMLFormElement | null) => {
  requestAnimationFrame(() => {
    const invalid = form?.querySelector<HTMLElement>('[aria-invalid="true"]');
    const target = invalid?.matches('fieldset')
      ? invalid.querySelector<HTMLElement>('input, select, textarea, button')
      : invalid;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

export function RegistrationForm({ onSubmitSuccess }: RegistrationFormProps) {
  const [savedData, setSavedData, clearDraft] = useSessionStorage<RegistrationFormData>(DRAFT_KEY, INITIAL_FORM_DATA);
  const {
    currentStep,
    completedSteps,
    markCompleted,
    invalidateFrom,
    goToNext,
    goToPrev,
    goToStep,
    isFirst,
    isLast,
    progress,
  } = useMultiStep(TOTAL_STEPS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [, submitAction, isSubmitting] = useActionState<SubmitState, FormData>(
    async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      const snapshot: RegistrationFormData = {
        ...savedData,
        personal: { ...savedData.personal },
        documents: { ...savedData.documents },
        education: { ...savedData.education },
        military: { ...savedData.military },
        medical: { ...savedData.medical },
        contact: { ...savedData.contact },
      };
      const randomId = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10);
      const regNumber = `DEMO-${new Date().getFullYear()}-${randomId.toUpperCase()}`;
      clearDraft();
      onSubmitSuccess(regNumber, snapshot);
      return { status: 'submitted' };
    },
    { status: 'idle' },
  );

  const scrollToForm = useCallback(() => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const validateCurrentStep = useCallback(() => {
    const nextErrors = validateRegistrationStep(currentStep, savedData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(formRef.current);
      return false;
    }
    return true;
  }, [currentStep, savedData, setErrors]);

  const handleSectionChange = useCallback(
    (section: keyof Pick<RegistrationFormData, 'personal' | 'documents' | 'education' | 'military' | 'medical' | 'contact'>) =>
      (name: string, value: FieldValue) => {
        setSavedData((previous) => ({
          ...previous,
          [section]: { ...previous[section], [name]: value },
        }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
        invalidateFrom(currentStep);
      },
    [currentStep, invalidateFrom, setErrors, setSavedData],
  );

  const handleTopChange = useCallback(
    (name: string, value: FieldValue) => {
      if (typeof value !== 'boolean') return;
      setSavedData((previous) => ({ ...previous, [name]: value }));
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    },
    [setErrors, setSavedData],
  );

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    markCompleted(currentStep);
    goToNext();
    scrollToForm();
  };

  const handlePrev = () => {
    setErrors({});
    goToPrev();
    scrollToForm();
  };

  const handleStepClick = (step: number) => {
    if (step === currentStep || completedSteps.has(step)) {
      setErrors({});
      goToStep(step);
      scrollToForm();
    }
  };

  const handleEditStep = (step: number) => {
    setErrors({});
    goToStep(step);
    scrollToForm();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateCurrentStep()) event.preventDefault();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Personal data={savedData.personal} onChange={handleSectionChange('personal')} errors={errors} />;
      case 2:
        return <Step2Documents data={savedData.documents} onChange={handleSectionChange('documents')} errors={errors} />;
      case 3:
        return <Step3Education data={savedData.education} onChange={handleSectionChange('education')} errors={errors} />;
      case 4:
        return <Step4Military data={savedData.military} onChange={handleSectionChange('military')} errors={errors} />;
      case 5:
        return <Step5Medical data={savedData.medical} onChange={handleSectionChange('medical')} errors={errors} />;
      case 6:
        return <Step6Contact data={savedData.contact} onChange={handleSectionChange('contact')} errors={errors} />;
      case 7:
        return (
          <Step7Confirm
            data={savedData}
            onEdit={handleEditStep}
            onChange={handleTopChange}
            errors={errors}
            submitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section id="registration-form" className="scroll-mt-20" aria-labelledby="registration-form-title">
      <div className="glass-card mb-6 rounded-sm p-4 sm:p-5">
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
          progress={progress}
        />
      </div>

      <form ref={formRef} action={submitAction} onSubmit={handleSubmit} noValidate>
        <div className="glass-card mb-6 min-h-96 rounded-sm p-4 sm:p-6 md:p-8">
          {renderStep()}
        </div>

        <div className="form-navigation">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst || isSubmitting}
            className="btn-ghost form-nav-button"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            <span>Назад</span>
          </button>

          <span className="form-step-count" aria-live="polite">
            Крок {currentStep} із {TOTAL_STEPS}
          </span>

          {isLast ? (
            <button type="submit" disabled={isSubmitting} className="btn-primary form-nav-button justify-self-end">
              {isSubmitting ? (
                <>
                  <span className="loading-spinner" aria-hidden="true" />
                  <span>Обробка…</span>
                </>
              ) : (
                <>
                  <Send size={17} aria-hidden="true" />
                  <span>Завершити демо</span>
                </>
              )}
            </button>
          ) : (
            <button type="button" onClick={handleNext} disabled={isSubmitting} className="btn-primary form-nav-button justify-self-end">
              <span>Далі</span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-[var(--color-text-dim)]">
          Чернетка зберігається лише в sessionStorage цієї вкладки та видаляється після її закриття або завершення демо.
        </p>
      </form>
    </section>
  );
}
