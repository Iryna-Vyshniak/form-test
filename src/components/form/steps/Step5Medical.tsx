import { Heart } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';
import { BLOOD_TYPES, RH_FACTORS, VLK_CATEGORIES } from '../../../utils/validation';

import type { StepProps } from '../../../types/form';
const CHRONIC_CONDITIONS = [
  'Серцево-судинні захворювання',
  'Захворювання органів дихання',
  'Захворювання шлунково-кишкового тракту',
  'Захворювання опорно-рухового апарату',
  'Неврологічні захворювання',
  'Психічні розлади',
  'Ендокринні захворювання (цукровий діабет тощо)',
  'Захворювання нирок та сечовивідних шляхів',
  'Захворювання зору',
  'Захворювання слуху',
  'Шкірні захворювання',
  'Онкологічні захворювання',
];

export function Step5Medical({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={Heart}
        title="Медичний стан (ВЛК)"
        subtitle="Відомості про стан здоров'я для Військово-Лікарської Комісії (ВЛК)"
        step={5}
        totalSteps={7}
      />

      {/* Alert */}
      <div className="glass-card blue-top p-4 rounded-sm">
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <span className="text-[var(--color-ukraine-blue-light)] font-semibold">ℹ Важливо:</span>{' '}
          Ця форма є попередньою анкетою. Остаточний висновок про придатність до військової служби виноситься 
          виключно за результатами медичного огляду Військово-Лікарської Комісії (ВЛК) згідно з Наказом МОУ № 402.
        </p>
      </div>

      <FieldGroup title="Антропометричні дані">
        <FormRow cols={3}>
          <FormField
            label="Зріст (см)"
            name="height"
            type={FIELD_TYPE.NUMBER}
            value={data.height}
            onChange={onChange}
            error={errors.height}
            placeholder="175"
            min="140"
            max="230"
          />
          <FormField
            label="Вага (кг)"
            name="weight"
            type={FIELD_TYPE.NUMBER}
            value={data.weight}
            onChange={onChange}
            error={errors.weight}
            placeholder="75"
            min="40"
            max="200"
          />
          <FormField
            label="Об'єм грудної клітки (см)"
            name="chestCircumference"
            type={FIELD_TYPE.NUMBER}
            value={data.chestCircumference}
            onChange={onChange}
            placeholder="90"
            min="60"
            max="160"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Група крові та резус-фактор">
        <FormRow>
          <FormField
            label="Група крові"
            name="bloodType"
            type={FIELD_TYPE.SELECT}
            value={data.bloodType}
            onChange={onChange}
            error={errors.bloodType}
            required
            options={BLOOD_TYPES}
            placeholder="Оберіть групу..."
          />
          <FormField
            label="Резус-фактор"
            name="rhFactor"
            type={FIELD_TYPE.RADIO}
            value={data.rhFactor}
            onChange={onChange}
            error={errors.rhFactor}
            required
            options={[
              { value: 'positive', label: 'Rh+ (позитивний)' },
              { value: 'negative', label: 'Rh- (негативний)' },
            ]}
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Загальний стан здоров'я">
        <FormField
          label="Загальна оцінка стану здоров'я"
          name="healthStatus"
          type={FIELD_TYPE.RADIO}
          value={data.healthStatus}
          onChange={onChange}
          options={[
            { value: 'excellent', label: 'Відмінний' },
            { value: 'good', label: 'Хороший' },
            { value: 'satisfactory', label: 'Задовільний' },
            { value: 'poor', label: 'Незадовільний' },
          ]}
        />

        <FormField
          name="hasChronicConditions"
          type={FIELD_TYPE.CHECKBOX}
          value={data.hasChronicConditions}
          onChange={onChange}
          placeholder="Маю хронічні захворювання"
        />

        {data.hasChronicConditions && (
          <>
            <div>
              <label className="tactical-label mb-2 block text-[var(--color-army-muted)]">
                Оберіть наявні захворювання
              </label>
              <FormField
                name="chronicConditions"
                type={FIELD_TYPE.MULTI_SELECT}
                value={data.chronicConditions || []}
                onChange={onChange}
                options={CHRONIC_CONDITIONS}
              />
            </div>
            <FormField
              label="Уточнення діагнозів"
              name="chronicDetails"
              type={FIELD_TYPE.TEXTAREA}
              value={data.chronicDetails}
              onChange={onChange}
              placeholder="Вкажіть конкретні діагнози, дати встановлення, стадію..."
              hint="Будуть вивчені комісією під час огляду"
            />
          </>
        )}

        <FormField
          label="Алергії"
          name="allergies"
          type={FIELD_TYPE.TEXTAREA}
          value={data.allergies}
          onChange={onChange}
          placeholder="напр. Алергія на пеніцилін, пилок, горіхи... Або вкажіть 'Відсутні'"
          hint="Вкажіть алергії на медикаменти, продукти харчування тощо"
        />

        <FormField
          name="hasDisability"
          type={FIELD_TYPE.CHECKBOX}
          value={data.hasDisability}
          onChange={onChange}
          placeholder="Маю посвідчення особи з інвалідністю"
        />

        {data.hasDisability && (
          <FormRow>
            <FormField
              label="Група інвалідності"
              name="disabilityGroup"
              type={FIELD_TYPE.SELECT}
              value={data.disabilityGroup}
              onChange={onChange}
              options={['I група', 'II група', 'III група', 'Дитина з інвалідністю']}
              placeholder="Оберіть групу..."
            />
            <FormField
              label="Причина інвалідності"
              name="disabilityCause"
              value={data.disabilityCause}
              onChange={onChange}
              placeholder="напр. Бойове поранення"
            />
          </FormRow>
        )}
      </FieldGroup>

      <FieldGroup title="Висновок ВЛК (якщо проходили раніше)">
        <FormField
          label="Категорія придатності за попереднім оглядом"
          name="vlkCategory"
          type={FIELD_TYPE.SELECT}
          value={data.vlkCategory}
          onChange={onChange}
          options={VLK_CATEGORIES}
          placeholder="Оберіть категорію..."
        />
        <FormField
          label="Останні медичні обстеження"
          name="recentTests"
          type={FIELD_TYPE.TEXTAREA}
          value={data.recentTests}
          onChange={onChange}
          placeholder="напр. Загальний аналіз крові — 10.2024, ЕКГ — 09.2024, Флюорографія — 01.2024..."
          hint="Вкажіть результати аналізів та обстежень за останній рік"
        />
      </FieldGroup>
    </div>
  );
}
