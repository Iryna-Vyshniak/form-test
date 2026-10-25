import { useId, type ReactNode } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import type { FieldChangeHandler, FieldValue } from '../../types/form';

export const FIELD_TYPE = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'tel',
  PHONE: 'phone',
  NUMBER: 'number',
  DATE: 'date',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  MULTI_SELECT: 'multi_select',
} as const;

export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE];

type FieldOption = string | { value?: string; code?: string; label: string };

interface FormFieldProps {
  label?: string;
  name: string;
  type?: FieldType;
  value?: FieldValue;
  onChange: FieldChangeHandler;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  hint?: string;
  disabled?: boolean;
  className?: string;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

const getOptionValue = (option: FieldOption) =>
  typeof option === 'string' ? option : option.value ?? option.code ?? option.label;

const getOptionLabel = (option: FieldOption) =>
  typeof option === 'string' ? option : option.code ? `${option.code} — ${option.label}` : option.label;

export function FormField({
  label,
  name,
  type = FIELD_TYPE.TEXT,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  hint,
  disabled = false,
  className = '',
  min,
  max,
  autoComplete,
  inputMode,
}: FormFieldProps) {
  const reactId = useId();
  const inputId = `field-${name}-${reactId.replace(/:/g, '')}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const baseInputClass = `mil-input min-w-0 w-full px-3 py-2.5 rounded-sm text-sm ${error ? 'error' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const renderInput = () => {
    switch (type) {
      case FIELD_TYPE.PHONE:
        return (
          <PhoneInput
            international
            defaultCountry="UA"
            countryCallingCodeEditable={false}
            value={typeof value === 'string' ? value : ''}
            onChange={(nextValue) => onChange(name, nextValue ?? '')}
            name={name}
            id={inputId}
            className={error ? 'PhoneInput PhoneInput--error' : 'PhoneInput'}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete ?? 'tel'}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            aria-required={required}
            numberInputProps={{
              id: inputId,
              placeholder,
              required,
              disabled,
              autoComplete: autoComplete ?? 'tel',
              'aria-describedby': describedBy,
              'aria-invalid': Boolean(error),
              'aria-required': required,
            }}
            countrySelectProps={{
              'aria-label': `Вибрати країну для ${label ?? name}`,
            }}
          />
        );

      case FIELD_TYPE.SELECT:
        return (
          <select
            id={inputId}
            name={name}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(name, event.target.value)}
            className={baseInputClass}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            aria-required={required}
            disabled={disabled}
            required={required}
          >
            <option value="" disabled>{placeholder ?? 'Оберіть варіант...'}</option>
            {options.map((option) => {
              const optionValue = getOptionValue(option);
              return (
                <option key={optionValue} value={optionValue}>
                  {getOptionLabel(option)}
                </option>
              );
            })}
          </select>
        );

      case FIELD_TYPE.TEXTAREA:
        return (
          <textarea
            id={inputId}
            name={name}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(name, event.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`${baseInputClass} resize-y`}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            aria-required={required}
            disabled={disabled}
            required={required}
          />
        );

      case FIELD_TYPE.RADIO:
        return (
          <fieldset
            className="m-0 min-w-0 border-0 p-0"
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
          >
            <legend className="sr-only">{label ?? name}</legend>
            <div className="flex flex-wrap gap-2 pt-1">
              {options.map((option) => {
                const optionValue = getOptionValue(option);
                const radioId = `${inputId}-${optionValue.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <label key={optionValue} htmlFor={radioId} className="choice-target group">
                    <input
                      type="radio"
                      id={radioId}
                      name={name}
                      value={optionValue}
                      checked={value === optionValue}
                      onChange={() => onChange(name, optionValue)}
                      className="mil-radio"
                      disabled={disabled}
                      required={required}
                    />
                    <span className="text-sm text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)]">
                      {getOptionLabel(option)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      case FIELD_TYPE.CHECKBOX:
        return (
          <label htmlFor={inputId} className="choice-target group items-start">
            <input
              type="checkbox"
              id={inputId}
              name={name}
              checked={Boolean(value)}
              onChange={(event) => onChange(name, event.target.checked)}
              className="mil-checkbox mt-0.5"
              disabled={disabled}
              required={required}
              aria-describedby={describedBy}
              aria-invalid={Boolean(error)}
            />
            <span className="text-sm leading-relaxed text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)]">
              {placeholder ?? label}
            </span>
          </label>
        );

      case FIELD_TYPE.MULTI_SELECT:
        return (
          <fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby={describedBy}>
            <legend className="sr-only">{label ?? name}</legend>
            <div className="flex flex-wrap gap-2 pt-1">
              {options.map((option) => {
                const optionValue = getOptionValue(option);
                const selectedValues = Array.isArray(value) ? value : [];
                const selected = selectedValues.includes(optionValue);
                const checkId = `${inputId}-${optionValue.replace(/\s+/g, '-').toLowerCase()}`;

                return (
                  <label
                    key={optionValue}
                    htmlFor={checkId}
                    className={`choice-chip ${selected ? 'choice-chip-selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      id={checkId}
                      value={optionValue}
                      checked={selected}
                      onChange={(event) => {
                        const next = event.target.checked
                          ? [...selectedValues, optionValue]
                          : selectedValues.filter((item) => item !== optionValue);
                        onChange(name, next);
                      }}
                      className="sr-only"
                      disabled={disabled}
                    />
                    <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                    <span>{getOptionLabel(option)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      default:
        return (
          <input
            id={inputId}
            type={type}
            name={name}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(name, event.target.value)}
            placeholder={placeholder}
            className={baseInputClass}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            aria-required={required}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            autoComplete={autoComplete ?? (type === FIELD_TYPE.EMAIL ? 'email' : type === FIELD_TYPE.TEL ? 'tel' : undefined)}
            inputMode={inputMode}
          />
        );
    }
  };

  if (type === FIELD_TYPE.CHECKBOX) {
    return (
      <div className={`min-w-0 ${className}`}>
        {renderInput()}
        <FieldFeedback error={error} errorId={errorId} hint={hint} hintId={hintId} />
      </div>
    );
  }

  const groupedControl = type === FIELD_TYPE.RADIO || type === FIELD_TYPE.MULTI_SELECT;

  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {label && (
        groupedControl ? (
          <span className={`field-label ${required ? 'required' : ''}`}>{label}</span>
        ) : (
          <label htmlFor={inputId} className={`field-label ${required ? 'required' : ''}`}>
            {label}
          </label>
        )
      )}
      {renderInput()}
      <FieldFeedback error={error} errorId={errorId} hint={hint} hintId={hintId} />
    </div>
  );
}

function FieldFeedback({ error, errorId, hint, hintId }: { error?: string; errorId: string; hint?: string; hintId: string }) {
  if (error) {
    return (
      <p id={errorId} className="error-msg" role="alert">
        <AlertCircle size={14} aria-hidden="true" />
        <span>{error}</span>
      </p>
    );
  }

  if (hint) {
    return (
      <p id={hintId} className="field-hint">
        <Info size={13} aria-hidden="true" />
        <span>{hint}</span>
      </p>
    );
  }

  return null;
}

export function FormRow({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const gridClass = cols === 3 ? 'sm:grid-cols-3' : cols === 2 ? 'sm:grid-cols-2' : '';
  return <div className={`grid min-w-0 grid-cols-1 gap-4 ${gridClass}`}>{children}</div>;
}

export function FieldGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 space-y-4 border-0 p-0">
      {title && <legend className="field-group-title w-full">{title}</legend>}
      {children}
    </fieldset>
  );
}
