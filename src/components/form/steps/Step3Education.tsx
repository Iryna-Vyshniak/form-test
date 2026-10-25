import { GraduationCap } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';
import { EDUCATION_LEVELS, LANGUAGES, DRIVER_CATEGORIES } from '../../../utils/validation';

import type { StepProps } from '../../../types/form';
export function Step3Education({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={GraduationCap}
        title="Освіта та фах"
        subtitle="Відомості про освіту, цивільну спеціальність та додаткові навички"
        step={3}
        totalSteps={7}
      />

      <FieldGroup title="Рівень освіти">
        <FormRow>
          <FormField
            label="Рівень освіти"
            name="educationLevel"
            type={FIELD_TYPE.SELECT}
            value={data.educationLevel}
            onChange={onChange}
            error={errors.educationLevel}
            required
            options={EDUCATION_LEVELS}
            placeholder="Оберіть рівень..."
          />
          <FormField
            label="Рік закінчення"
            name="educationYear"
            type={FIELD_TYPE.NUMBER}
            value={data.educationYear}
            onChange={onChange}
            error={errors.educationYear}
            placeholder="2010"
            min="1950"
            max={new Date().getFullYear()}
          />
        </FormRow>

        {data.educationLevel && data.educationLevel !== 'Базова загальна середня' && (
          <>
            <FormField
              label="Назва навчального закладу"
              name="educationInstitution"
              value={data.educationInstitution}
              onChange={onChange}
              error={errors.educationInstitution}
              required
              placeholder="напр. Київський політехнічний університет"
            />
            <FormRow>
              <FormField
                label="Спеціальність за дипломом"
                name="educationSpecialty"
                value={data.educationSpecialty}
                onChange={onChange}
                error={errors.educationSpecialty}
                placeholder="напр. Програмна інженерія"
              />
              <FormField
                label="Серія і номер диплому / свідоцтва"
                name="diplomaNumber"
                value={data.diplomaNumber}
                onChange={onChange}
                placeholder="напр. ДВ 12345678"
                hint="Необов'язково"
              />
            </FormRow>
          </>
        )}
      </FieldGroup>

      <FieldGroup title="Місце роботи (на момент подачі заявки)">
        <FormField
          name="employed"
          type={FIELD_TYPE.RADIO}
          value={data.employed}
          onChange={onChange}
          label="Зайнятість"
          options={[
            { value: 'employed', label: 'Працевлаштований' },
            { value: 'unemployed', label: 'Незайнятий' },
            { value: 'student', label: 'Студент' },
            { value: 'fop', label: 'ФОП / Підприємець' },
          ]}
        />

        {data.employed === 'employed' && (
          <FormRow>
            <FormField
              label="Назва організації"
              name="workOrganization"
              value={data.workOrganization}
              onChange={onChange}
              error={errors.workOrganization}
              placeholder="напр. ТОВ 'Укртехнології'"
            />
            <FormField
              label="Посада"
              name="workPosition"
              value={data.workPosition}
              onChange={onChange}
              error={errors.workPosition}
              placeholder="напр. Інженер-програміст"
            />
          </FormRow>
        )}
      </FieldGroup>

      <FieldGroup title="Додаткові навички">
        <div>
          <label className="tactical-label mb-2 block text-[var(--color-army-muted)]">
            Знання іноземних мов
          </label>
          <FormField
            name="languages"
            type={FIELD_TYPE.MULTI_SELECT}
            value={data.languages || []}
            onChange={onChange}
            options={LANGUAGES}
          />
        </div>

        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <FormField
            label="Рівень знання мов"
            name="languageLevels"
            type={FIELD_TYPE.TEXTAREA}
            value={data.languageLevels}
            onChange={onChange}
            placeholder="напр. Англійська — B2 (Intermediate); Польська — A1"
            hint="Вкажіть рівень для кожної мови (A1, A2, B1, B2, C1, C2)"
          />
        )}

        <FormField
          name="hasDriverLicense"
          type={FIELD_TYPE.CHECKBOX}
          value={data.hasDriverLicense}
          onChange={onChange}
          placeholder="Маю посвідчення водія"
        />

        {data.hasDriverLicense && (
          <div>
            <label className="tactical-label mb-2 block text-[var(--color-army-muted)]">
              Категорії водійського посвідчення
            </label>
            <FormField
              name="driverCategories"
              type={FIELD_TYPE.MULTI_SELECT}
              value={data.driverCategories || []}
              onChange={onChange}
              options={DRIVER_CATEGORIES}
            />
          </div>
        )}

        <FormField
          label="Інші спеціальні навички"
          name="otherSkills"
          type={FIELD_TYPE.TEXTAREA}
          value={data.otherSkills}
          onChange={onChange}
          placeholder="напр. Досвід роботи з безпілотниками, зварювання, медична підготовка, знання програмування..."
          hint="Необов'язково, але може бути корисним при розподілі"
        />
      </FieldGroup>
    </div>
  );
}
