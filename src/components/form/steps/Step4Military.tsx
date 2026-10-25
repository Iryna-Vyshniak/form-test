import { Shield } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';
import { VOS_SPECIALTIES, MILITARY_BRANCHES, COMBAT_EXPERIENCES } from '../../../utils/validation';

import type { StepProps } from '../../../types/form';
const MILITARY_RANKS = [
  'Рядовий', 'Молодший сержант', 'Сержант', 'Старший сержант', 'Головний сержант',
  'Штаб-сержант', 'Майстер-сержант', 'Старший майстер-сержант', 'Головний майстер-сержант',
  'Молодший лейтенант', 'Лейтенант', 'Старший лейтенант', 'Капітан',
  'Майор', 'Підполковник', 'Полковник',
  'Бригадний генерал', 'Генерал-майор', 'Генерал-лейтенант', 'Генерал',
];

const AWARDS = [
  'Медаль "За військову службу України"',
  'Медаль "Захисник Вітчизни"',
  'Медаль "За сумлінну службу" I/II/III ступеня',
  'Орден Богдана Хмельницького',
  'Орден "За мужність"',
  'Хрест бойових заслуг',
  'Орден Данила Галицького',
  'Зірка за доблесть',
  'Відзнака Президента України',
  'Інше державне нагородження',
];

export function Step4Military({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={Shield}
        title="Військовий досвід"
        subtitle="Відомості про попередню військову службу, спеціальність та бажаний напрям"
        step={4}
        totalSteps={7}
      />

      <FieldGroup title="Статус військового обліку">
        <FormField
          label="Категорія військового обліку"
          name="militaryCategory"
          type={FIELD_TYPE.RADIO}
          value={data.militaryCategory}
          onChange={onChange}
          error={errors.militaryCategory}
          options={[
            { value: 'conscript', label: 'Призовник (не проходив службу)' },
            { value: 'veteran', label: 'Військовозобов\'язаний (запас)' },
            { value: 'reservist', label: 'Резервіст (за контрактом)' },
          ]}
        />
      </FieldGroup>

      {(data.militaryCategory === 'veteran' || data.militaryCategory === 'reservist') && (
        <>
          <FieldGroup title="Відомості про попередню службу">
            <FormRow>
              <FormField
                label="Військове звання"
                name="militaryRank"
                type={FIELD_TYPE.SELECT}
                value={data.militaryRank}
                onChange={onChange}
                options={MILITARY_RANKS}
                placeholder="Оберіть звання..."
              />
              <FormField
                label="Військово-облікова спеціальність (ВОС)"
                name="militaryVOS"
                type={FIELD_TYPE.SELECT}
                value={data.militaryVOS}
                onChange={onChange}
                options={VOS_SPECIALTIES}
                placeholder="Оберіть ВОС..."
              />
            </FormRow>

            <FormRow>
              <FormField
                label="Номер посвідчення / Військового квитка"
                name="militaryDocNumber"
                value={data.militaryDocNumber}
                onChange={onChange}
                placeholder="напр. АА 000000"
              />
              <FormField
                label="Серія та номер посвідчення про приписку"
                name="conscriptionDocNumber"
                value={data.conscriptionDocNumber}
                onChange={onChange}
                placeholder="напр. ПВ 123456"
              />
            </FormRow>

            <FormField
              label="Попередні місця служби (в/ч)"
              name="previousUnits"
              type={FIELD_TYPE.TEXTAREA}
              value={data.previousUnits}
              onChange={onChange}
              placeholder="напр. в/ч А1234, 80-та ОДШБр, Миколаїв (2022-2023)"
              hint="Перерахуйте всі місця служби"
            />
          </FieldGroup>

          <FieldGroup title="Бойовий досвід">
            <div>
              <label className="tactical-label mb-2 block text-[var(--color-army-muted)]">
                Участь у бойових діях
              </label>
              <FormField
                name="combatExperience"
                type={FIELD_TYPE.MULTI_SELECT}
                value={data.combatExperience || []}
                onChange={onChange}
                options={COMBAT_EXPERIENCES}
              />
            </div>
          </FieldGroup>

          <FieldGroup title="Державні нагороди">
            <FormField
              name="hasAwards"
              type={FIELD_TYPE.CHECKBOX}
              value={data.hasAwards}
              onChange={onChange}
              placeholder="Маю державні нагороди або відзнаки"
            />
            {data.hasAwards && (
              <div>
                <label className="tactical-label mb-2 block text-[var(--color-army-muted)]">
                  Перелік нагород
                </label>
                <FormField
                  name="awards"
                  type={FIELD_TYPE.MULTI_SELECT}
                  value={data.awards || []}
                  onChange={onChange}
                  options={AWARDS}
                />
              </div>
            )}
          </FieldGroup>
        </>
      )}

      <FieldGroup title="Бажаний напрям служби">
        <FormField
          label="Бажаний рід військ"
          name="preferredBranch"
          type={FIELD_TYPE.SELECT}
          value={data.preferredBranch}
          onChange={onChange}
          options={MILITARY_BRANCHES}
          placeholder="Оберіть рід військ..."
          hint="За бажанням. Фактичне призначення визначається комісією"
        />

        <FormField
          label="Бажана бойова спеціальність / посада"
          name="preferredRole"
          type={FIELD_TYPE.TEXTAREA}
          value={data.preferredRole}
          onChange={onChange}
          placeholder="напр. Оператор БПЛА, медик, зв'язківець, механік-водій..."
          hint="Опишіть, в якому підрозділі або на якій посаді хотіли б служити"
        />

        <FormField
          name="hasWeaponSkills"
          type={FIELD_TYPE.CHECKBOX}
          value={data.hasWeaponSkills}
          onChange={onChange}
          placeholder="Маю досвід поводження зі зброєю"
        />

        <FormField
          name="hasMilitaryEquipmentSkills"
          type={FIELD_TYPE.CHECKBOX}
          value={data.hasMilitaryEquipmentSkills}
          onChange={onChange}
          placeholder="Маю навички роботи з військовою технікою або спецобладнанням"
        />
      </FieldGroup>
    </div>
  );
}
