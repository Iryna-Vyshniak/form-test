import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import type { FieldErrors, FieldValue, RegistrationFormData, SectionData } from '../types/form';

const NAME_PATTERN = /^[А-ЯҐЄІЇа-яґєії'’ʼ\-\s]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneSchema = z.string().trim().refine((value) => (!value ? true : isValidPhoneNumber(value)), {
  message: 'Введіть коректний український номер телефону',
});

const isEmpty = (value: FieldValue) =>
  value === undefined ||
  value === false ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0);

const requireFields = (data: SectionData, fields: string[], errors: FieldErrors) => {
  for (const field of fields) {
    if (isEmpty(data[field])) errors[field] = 'Це поле є обов’язковим';
  }
};

const getAge = (isoDate: string) => {
  const birthDate = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return Number.NaN;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
};

const validateName = (name: string | undefined, field: string, errors: FieldErrors) => {
  if (!name) return;
  const trimmed = name.trim();
  if (trimmed.length < 2) errors[field] = 'Мінімум 2 символи';
  else if (trimmed.length > 50) errors[field] = 'Максимум 50 символів';
  else if (!NAME_PATTERN.test(trimmed)) errors[field] = 'Використовуйте українські літери, апостроф або дефіс';
};

const validatePhoneField = (value: string | undefined, field: string, errors: FieldErrors) => {
  if (!value) return;

  const result = phoneSchema.safeParse(value);
  if (!result.success) {
    errors[field] = result.error.issues[0]?.message ?? 'Введіть коректний український номер телефону';
  }
};

export function validateRegistrationStep(step: number, formData: RegistrationFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 1) {
    const data = formData.personal;
    requireFields(
      data,
      ['lastName', 'firstName', 'birthDate', 'gender', 'citizenship', 'maritalStatus', 'birthOblast', 'birthCity'],
      errors,
    );

    validateName(data.lastName as string | undefined, 'lastName', errors);
    validateName(data.firstName as string | undefined, 'firstName', errors);
    validateName(data.patronymic as string | undefined, 'patronymic', errors);

    const birthDate = data.birthDate as string | undefined;
    if (birthDate) {
      const age = getAge(birthDate);
      if (Number.isNaN(age)) errors.birthDate = 'Введіть коректну дату';
      else if (age < 18) errors.birthDate = 'Для цієї демонстраційної форми вік має бути 18+';
      else if (age > 65) errors.birthDate = 'Вік не може перевищувати 65 років';
    }
  }

  if (step === 2) {
    const data = formData.documents;
    requireFields(
      data,
      ['taxId', 'documentType', 'documentNumber', 'documentIssueDate', 'documentIssuedBy', 'regOblast', 'regCity', 'regStreet', 'regHouse'],
      errors,
    );

    const taxId = data.taxId as string | undefined;
    if (taxId && !/^\d{10}$/.test(taxId)) errors.taxId = 'РНОКПП має містити рівно 10 цифр';

    const documentNumber = data.documentNumber as string | undefined;
    if (documentNumber && (documentNumber.trim().length < 6 || documentNumber.trim().length > 20)) {
      errors.documentNumber = 'Номер документа має містити від 6 до 20 символів';
    }

    if (data.documentType === 'ID-картка громадянина України') {
      requireFields(data, ['documentExpiry'], errors);
    }

    if (!data.sameAddress) {
      requireFields(data, ['actualOblast', 'actualCity', 'actualAddress'], errors);
    }
  }

  if (step === 3) {
    const data = formData.education;
    requireFields(data, ['educationLevel'], errors);
    if (data.educationLevel && data.educationLevel !== 'Базова загальна середня') {
      requireFields(data, ['educationInstitution'], errors);
    }
  }

  if (step === 5) {
    requireFields(formData.medical, ['bloodType', 'rhFactor'], errors);
  }

  if (step === 6) {
    const data = formData.contact;
    requireFields(data, ['phone', 'email', 'emergencyName', 'emergencyRelation', 'emergencyPhone'], errors);

    for (const field of ['phone', 'phoneAlt', 'emergencyPhone', 'emergencyPhoneAlt'] as const) {
      validatePhoneField(data[field] as string | undefined, field, errors);
    }

    const email = data.email as string | undefined;
    if (email && !EMAIL_PATTERN.test(email.trim())) errors.email = 'Введіть коректну email-адресу';
  }

  if (step === 7) {
    if (!formData.consentPersonalData) errors.consentPersonalData = 'Потрібна згода для продовження';
    if (!formData.consentAccuracy) errors.consentAccuracy = 'Потрібне підтвердження для продовження';
    if (!formData.consentMedical) errors.consentMedical = 'Потрібна згода для продовження';
  }

  return errors;
}

export const BLOOD_TYPES = ['O (I)', 'A (II)', 'B (III)', 'AB (IV)'];
export const RH_FACTORS = ['Rh+ (позитивний)', 'Rh- (негативний)'];

export const VLK_CATEGORIES = [
  { value: 'fit', label: 'Придатний до військової служби' },
  { value: 'fit_support', label: 'Придатний до служби у частинах забезпечення' },
  { value: 'temp_unfit', label: 'Тимчасово непридатний' },
  { value: 'unfit', label: 'Непридатний до військової служби' },
  { value: 'unknown', label: 'Не проходив медогляд' },
];

export const VOS_SPECIALTIES = [
  { code: '100', label: 'Піхота' },
  { code: '200', label: 'Бронетанкові та механізовані підрозділи' },
  { code: '300', label: 'Артилерія та ракетні війська' },
  { code: '400', label: 'Протиповітряна оборона' },
  { code: '500', label: 'Зв’язок та радіоелектронна боротьба' },
  { code: '600', label: 'Інженерні та РХБЗ війська' },
  { code: '700', label: 'Логістика та транспорт' },
  { code: '800', label: 'Медична служба' },
  { value: 'none', label: 'Відсутня' },
];

export const MILITARY_BRANCHES = [
  'Сухопутні війська',
  'Військово-Морські Сили',
  'Повітряні Сили',
  'Десантно-штурмові війська',
  'Сили спеціальних операцій',
  'Сили підтримки',
  'Тероборона',
];

export const EDUCATION_LEVELS = [
  'Повна загальна середня',
  'Базова загальна середня',
  'Професійно-технічна',
  'Фахова передвища',
  'Вища (бакалавр)',
  'Вища (магістр)',
  'Вища (PhD/доктор наук)',
];

export const MARITAL_STATUS = [
  'Неодружений / Незаміжня',
  'Одружений / Заміжня',
  'Розлучений / Розлучена',
  'Вдівець / Вдова',
];

export const OBLASTS = [
  'Вінницька', 'Волинська', 'Дніпропетровська', 'Донецька',
  'Житомирська', 'Закарпатська', 'Запорізька', 'Івано-Франківська',
  'Київська', 'Кіровоградська', 'Луганська', 'Львівська',
  'Миколаївська', 'Одеська', 'Полтавська', 'Рівненська',
  'Сумська', 'Тернопільська', 'Харківська', 'Херсонська',
  'Хмельницька', 'Черкаська', 'Чернівецька', 'Чернігівська',
  'м. Київ',
];

export const LANGUAGES = [
  'Англійська', 'Німецька', 'Французька', 'Польська',
  'Румунська', 'Угорська', 'Іспанська', 'Арабська',
  'Турецька', 'Китайська', 'Японська', 'Інша',
];

export const DOCUMENT_TYPES = [
  'ID-картка громадянина України',
  'Паспорт громадянина України (книжечка)',
  'Закордонний паспорт',
];

export const DRIVER_CATEGORIES = ['A', 'A1', 'B', 'B1', 'C', 'C1', 'D', 'D1', 'BE', 'CE', 'DE'];

export const COMBAT_EXPERIENCES = [
  'АТО (2014–2018)',
  'ООС (2018–2022)',
  'Повномасштабне вторгнення (лютий 2022 — сьогодні)',
  'Інший бойовий досвід',
  'Без бойового досвіду',
];
