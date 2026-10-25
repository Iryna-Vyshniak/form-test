import { Check, Lock } from 'lucide-react';

const STEP_LABELS = [
  { short: '01', label: 'Особисті дані' },
  { short: '02', label: 'Документи' },
  { short: '03', label: 'Освіта та фах' },
  { short: '04', label: 'Додаткові відомості' },
  { short: '05', label: 'Медичні дані' },
  { short: '06', label: 'Контакти' },
  { short: '07', label: 'Підтвердження' },
] as const;

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
  progress: number;
}

export function StepIndicator({ currentStep, completedSteps, onStepClick, progress }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="tactical-label text-[var(--color-army-muted)]">ПРОГРЕС ФОРМИ</span>
          <span className="tactical-label shrink-0 text-[var(--color-ukraine-yellow)]">{progress}%</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Прогрес заповнення форми"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ol className="step-list" aria-label="Кроки форми">
        {STEP_LABELS.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.has(stepNumber);
          const isActive = stepNumber === currentStep;
          const isClickable = isCompleted || isActive;

          return (
            <li key={step.short} className="step-item">
              <button
                type="button"
                onClick={() => onStepClick(stepNumber)}
                disabled={!isClickable}
                aria-label={`Крок ${stepNumber}: ${step.label}${isCompleted ? ', завершено' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                className={`step-button ${isActive ? 'step-active' : isCompleted ? 'step-completed' : 'step-inactive'}`}
              >
                {isCompleted && !isActive ? (
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                ) : isActive ? (
                  step.short
                ) : (
                  <Lock size={12} aria-hidden="true" />
                )}
              </button>
              <span className={`step-label ${isActive ? 'step-label-active' : isCompleted ? 'step-label-completed' : ''}`}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
