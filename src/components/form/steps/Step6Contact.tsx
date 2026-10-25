import { Phone } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';

import type { StepProps } from '../../../types/form';
export function Step6Contact({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={Phone}
        title="Контактні дані"
        subtitle="Особисті контакти та дані екстреного зв'язку"
        step={6}
        totalSteps={7}
      />

      <FieldGroup title="Основні контакти">
        <FormRow>
          <FormField
            label="Мобільний телефон"
            name="phone"
            type={FIELD_TYPE.PHONE}
            value={data.phone}
            onChange={onChange}
            error={errors.phone}
            required
            placeholder="+380501234567"
            hint="Формат: +38 0XX XXX XXXX"
          />
          <FormField
            label="Додатковий телефон"
            name="phoneAlt"
            type={FIELD_TYPE.PHONE}
            value={data.phoneAlt}
            onChange={onChange}
            placeholder="+380671234567"
            hint="Необов'язково"
          />
        </FormRow>

        <FormField
          label="Адреса електронної пошти (Email)"
          name="email"
          type={FIELD_TYPE.EMAIL}
          value={data.email}
          onChange={onChange}
          error={errors.email}
          required
          placeholder="your.name@example.com"
        />

        <FormField
          label="Найзручніший спосіб зв'язку"
          name="preferredContact"
          type={FIELD_TYPE.RADIO}
          value={data.preferredContact}
          onChange={onChange}
          options={[
            { value: 'phone', label: 'Телефонний дзвінок' },
            { value: 'sms', label: 'SMS-повідомлення' },
            { value: 'email', label: 'Email' },
            { value: 'telegram', label: 'Telegram' },
            { value: 'viber', label: 'Viber' },
          ]}
        />

        {(data.preferredContact === 'telegram' || data.preferredContact === 'viber') && (
          <FormField
            label={`${data.preferredContact === 'telegram' ? 'Telegram' : 'Viber'} нік або номер`}
            name="messengerContact"
            value={data.messengerContact}
            onChange={onChange}
            placeholder={data.preferredContact === 'telegram' ? '@username' : '+380XXXXXXXXX'}
          />
        )}
      </FieldGroup>

      <FieldGroup title="Екстрений контакт (особа для сповіщення)">
        <div className="glass-card p-4 rounded-sm space-y-4">
          <p className="tactical-label text-[var(--color-ukraine-yellow)] text-xs">
            ⚡ Вкажіть особу, яку необхідно сповістити у разі надзвичайних обставин
          </p>
          
          <FormRow>
            <FormField
              label="ПІБ екстреного контакту"
              name="emergencyName"
              value={data.emergencyName}
              onChange={onChange}
              error={errors.emergencyName}
              required
              placeholder="напр. Шевченко Оксана Миколаївна"
            />
            <FormField
              label="Ступінь рідства"
              name="emergencyRelation"
              type={FIELD_TYPE.SELECT}
              value={data.emergencyRelation}
              onChange={onChange}
              error={errors.emergencyRelation}
              required
              options={[
                'Дружина', 'Чоловік', 'Мати', 'Батько', 'Сестра', 'Брат',
                'Дочка', 'Син', 'Бабуся', 'Дідусь', 'Інший родич', 'Друг/подруга',
              ]}
              placeholder="Оберіть..."
            />
          </FormRow>

          <FormRow>
            <FormField
              label="Телефон екстреного контакту"
              name="emergencyPhone"
              type={FIELD_TYPE.PHONE}
              value={data.emergencyPhone}
              onChange={onChange}
              error={errors.emergencyPhone}
              required
              placeholder="+380501234567"
            />
            <FormField
              label="Додатковий телефон"
              name="emergencyPhoneAlt"
              type={FIELD_TYPE.PHONE}
              value={data.emergencyPhoneAlt}
              onChange={onChange}
              placeholder="+380671234567"
              hint="Необов'язково"
            />
          </FormRow>

          <FormField
            label="Адреса екстреного контакту"
            name="emergencyAddress"
            type={FIELD_TYPE.TEXTAREA}
            value={data.emergencyAddress}
            onChange={onChange}
            placeholder="Повна поштова адреса місця проживання"
            hint="Необов'язково"
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Зв'язок через месенджери (необов'язково)">
        <FormRow>
          <FormField
            label="Telegram"
            name="telegram"
            value={data.telegram}
            onChange={onChange}
            placeholder="@username"
          />
          <FormField
            label="Viber"
            name="viber"
            value={data.viber}
            onChange={onChange}
            placeholder="+380501234567"
          />
        </FormRow>
      </FieldGroup>
    </div>
  );
}
