import { User } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';
import { MARITAL_STATUS, OBLASTS } from '../../../utils/validation';

import type { StepProps } from '../../../types/form';
export function Step1Personal({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle 
        icon={User} 
        title="Особисті дані" 
        subtitle="Заповніть усі особисті відомості відповідно до документів, що посвідчують особу"
        step={1}
        totalSteps={7}
      />

      <FieldGroup title="ПІБ — Прізвище, Власне Ім'я, По батькові">
        <FormRow cols={3}>
          <FormField
            label="Прізвище"
            name="lastName"
            value={data.lastName}
            onChange={onChange}
            error={errors.lastName}
            required
            placeholder="напр. Шевченко"
          />
          <FormField
            label="Власне ім'я"
            name="firstName"
            value={data.firstName}
            onChange={onChange}
            error={errors.firstName}
            required
            placeholder="напр. Тарас"
          />
          <FormField
            label="По батькові"
            name="patronymic"
            value={data.patronymic}
            onChange={onChange}
            error={errors.patronymic}
            placeholder="напр. Григорович"
            hint="Вказати за наявності"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Основні відомості">
        <FormRow>
          <FormField
            label="Дата народження"
            name="birthDate"
            type={FIELD_TYPE.DATE}
            value={data.birthDate}
            onChange={onChange}
            error={errors.birthDate}
            required
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          />
          <FormField
            label="Стать"
            name="gender"
            type={FIELD_TYPE.RADIO}
            value={data.gender}
            onChange={onChange}
            error={errors.gender}
            required
            options={[
              { value: 'male', label: 'Чоловіча' },
              { value: 'female', label: 'Жіноча' },
            ]}
          />
        </FormRow>

        <FormRow>
          <FormField
            label="Громадянство"
            name="citizenship"
            value={data.citizenship}
            onChange={onChange}
            error={errors.citizenship}
            required
            placeholder="напр. Україна"
          />
          <FormField
            label="Сімейний стан"
            name="maritalStatus"
            type={FIELD_TYPE.SELECT}
            value={data.maritalStatus}
            onChange={onChange}
            error={errors.maritalStatus}
            required
            options={MARITAL_STATUS}
            placeholder="Оберіть..."
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Місце народження">
        <FormRow>
          <FormField
            label="Область народження"
            name="birthOblast"
            type={FIELD_TYPE.SELECT}
            value={data.birthOblast}
            onChange={onChange}
            error={errors.birthOblast}
            required
            options={OBLASTS}
            placeholder="Оберіть область..."
          />
          <FormField
            label="Місто / Населений пункт"
            name="birthCity"
            value={data.birthCity}
            onChange={onChange}
            error={errors.birthCity}
            required
            placeholder="напр. Київ"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Склад сім'ї">
        <FormRow>
          <FormField
            label="Кількість дітей"
            name="childrenCount"
            type={FIELD_TYPE.NUMBER}
            value={data.childrenCount}
            onChange={onChange}
            error={errors.childrenCount}
            min="0"
            max="20"
            placeholder="0"
          />
          <FormField
            label="Кількість утриманців"
            name="dependentsCount"
            type={FIELD_TYPE.NUMBER}
            value={data.dependentsCount}
            onChange={onChange}
            error={errors.dependentsCount}
            min="0"
            max="20"
            placeholder="0"
            hint="Особи на вашому утриманні (крім дітей)"
          />
        </FormRow>

        {Number(data.childrenCount) > 0 && (
          <FormField
            label="Дані про дітей (ПІБ та дата народження)"
            name="childrenInfo"
            type={FIELD_TYPE.TEXTAREA}
            value={data.childrenInfo}
            onChange={onChange}
            error={errors.childrenInfo}
            placeholder="напр. Шевченко Оксана Тарасівна, 12.03.2018; Шевченко Іван Тарасович, 05.07.2020"
            hint="Вкажіть кожну дитину з нового рядка"
          />
        )}
      </FieldGroup>

      {/* Alert box */}
      <div className="stripe-pattern border border-[var(--color-ukraine-yellow)]/30 rounded-sm p-4">
        <p className="text-xs text-[var(--color-ukraine-yellow)]/80 flex gap-2">
          <span className="text-[var(--color-ukraine-yellow)] font-bold shrink-0">⚠</span>
          Усі дані мають відповідати документам, що посвідчують особу. Надання недостовірних відомостей 
          тягне за собою відповідальність згідно з чинним законодавством України.
        </p>
      </div>
    </div>
  );
}
