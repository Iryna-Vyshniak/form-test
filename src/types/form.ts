export type FieldValue = string | boolean | string[] | undefined;

export type SectionData = Record<string, FieldValue>;

export interface RegistrationFormData {
  personal: SectionData;
  documents: SectionData;
  education: SectionData;
  military: SectionData;
  medical: SectionData;
  contact: SectionData;
  consentPersonalData: boolean;
  consentAccuracy: boolean;
  consentMedical: boolean;
  consentNotification: boolean;
}

export type FieldErrors = Record<string, string | undefined>;
export type FieldChangeHandler = (name: string, value: FieldValue) => void;

export interface StepProps {
  data: SectionData;
  onChange: FieldChangeHandler;
  errors: FieldErrors;
}

export interface SubmissionResult {
  regNumber: string;
  formData: RegistrationFormData;
}
