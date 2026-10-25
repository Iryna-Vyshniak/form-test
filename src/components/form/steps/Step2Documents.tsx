import { FileText } from 'lucide-react';
import { FormField, FormRow, FieldGroup, FIELD_TYPE } from '../FormField';
import { SectionTitle } from '../../ui/Icons';
import { DOCUMENT_TYPES, OBLASTS } from '../../../utils/validation';

import type { StepProps } from '../../../types/form';
export function Step2Documents({ data, onChange, errors }: StepProps) {
  return (
    <div className="form-section space-y-6">
      <SectionTitle
        icon={FileText}
        title="Паспортні дані та адреса"
        subtitle="Дані документа, що посвідчує особу, та адреси реєстрації і проживання"
        step={2}
        totalSteps={7}
      />

      <FieldGroup title="Ідентифікаційні дані">
        <FormRow>
          <FormField
            label="РНОКПП (Ідентифікаційний код)"
            name="taxId"
            value={data.taxId}
            onChange={onChange}
            error={errors.taxId}
            required
            placeholder="0000000000"
            hint="10-значний цифровий ідентифікаційний код платника податків"
          />
          <div />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Документ, що посвідчує особу">
        <FormField
          label="Тип документа"
          name="documentType"
          type={FIELD_TYPE.SELECT}
          value={data.documentType}
          onChange={onChange}
          error={errors.documentType}
          required
          options={DOCUMENT_TYPES}
          placeholder="Оберіть тип документа..."
        />

        {data.documentType === 'ID-картка громадянина України' ? (
          <FormRow cols={3}>
            <FormField
              label="Номер ID-картки"
              name="documentNumber"
              value={data.documentNumber}
              onChange={onChange}
              error={errors.documentNumber}
              required
              placeholder="123456789"
            />
            <FormField
              label="Дата видачі"
              name="documentIssueDate"
              type={FIELD_TYPE.DATE}
              value={data.documentIssueDate}
              onChange={onChange}
              error={errors.documentIssueDate}
              required
            />
            <FormField
              label="Термін дії (до)"
              name="documentExpiry"
              type={FIELD_TYPE.DATE}
              value={data.documentExpiry}
              onChange={onChange}
              error={errors.documentExpiry}
              required
            />
          </FormRow>
        ) : data.documentType ? (
          <FormRow>
            <FormField
              label="Серія та номер"
              name="documentNumber"
              value={data.documentNumber}
              onChange={onChange}
              error={errors.documentNumber}
              required
              placeholder="АА 000000"
            />
            <FormField
              label="Дата видачі"
              name="documentIssueDate"
              type={FIELD_TYPE.DATE}
              value={data.documentIssueDate}
              onChange={onChange}
              error={errors.documentIssueDate}
              required
            />
          </FormRow>
        ) : null}

        {data.documentType && (
          <FormField
            label="Ким виданий"
            name="documentIssuedBy"
            value={data.documentIssuedBy}
            onChange={onChange}
            error={errors.documentIssuedBy}
            required
            placeholder="напр. 1234 ДМС УКРАЇНИ"
            hint="Орган, що видав документ"
          />
        )}
      </FieldGroup>

      <FieldGroup title="Адреса реєстрації (прописки)">
        <FormRow>
          <FormField
            label="Область"
            name="regOblast"
            type={FIELD_TYPE.SELECT}
            value={data.regOblast}
            onChange={onChange}
            error={errors.regOblast}
            required
            options={OBLASTS}
            placeholder="Оберіть область..."
          />
          <FormField
            label="Місто / Населений пункт"
            name="regCity"
            value={data.regCity}
            onChange={onChange}
            error={errors.regCity}
            required
            placeholder="напр. Київ"
          />
        </FormRow>
        <FormField
          label="Вулиця"
          name="regStreet"
          value={data.regStreet}
          onChange={onChange}
          error={errors.regStreet}
          required
          placeholder="напр. вул. Хрещатик"
        />
        <FormRow cols={3}>
          <FormField
            label="Будинок"
            name="regHouse"
            value={data.regHouse}
            onChange={onChange}
            error={errors.regHouse}
            required
            placeholder="1"
          />
          <FormField
            label="Квартира"
            name="regApartment"
            value={data.regApartment}
            onChange={onChange}
            placeholder="кв. 1"
          />
          <FormField
            label="Поштовий індекс"
            name="regPostalCode"
            value={data.regPostalCode}
            onChange={onChange}
            placeholder="01001"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Фактична адреса проживання">
        <FormField
          name="sameAddress"
          type={FIELD_TYPE.CHECKBOX}
          value={data.sameAddress}
          onChange={onChange}
          placeholder="Фактична адреса збігається з адресою реєстрації"
        />

        {!data.sameAddress && (
          <>
            <FormRow>
              <FormField
                label="Область"
                name="actualOblast"
                type={FIELD_TYPE.SELECT}
                value={data.actualOblast}
                onChange={onChange}
                error={errors.actualOblast}
                required
                options={OBLASTS}
                placeholder="Оберіть область..."
              />
              <FormField
                label="Місто / Населений пункт"
                name="actualCity"
                value={data.actualCity}
                onChange={onChange}
                error={errors.actualCity}
                required
                placeholder="напр. Львів"
              />
            </FormRow>
            <FormField
              label="Повна адреса"
              name="actualAddress"
              type={FIELD_TYPE.TEXTAREA}
              value={data.actualAddress}
              onChange={onChange}
              error={errors.actualAddress}
              required
              placeholder="вул. Назва, буд. 1, кв. 2"
            />
          </>
        )}
      </FieldGroup>
    </div>
  );
}
