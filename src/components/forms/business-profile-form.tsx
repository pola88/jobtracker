'use client';

import { forwardRef } from 'react';

import { ICountryData, getCountryDataList } from 'countries-list';

import { ActionResponse } from '@/actions/business-profiles';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  BusinessProfileFormDTO,
  businessProfileFormSchema,
} from '@/lib/validators/business-profile';

type BusinessProfileFormProps = {
  action: (formData: BusinessProfileFormDTO) => Promise<ActionResponse>;
  defaultValues?: BusinessProfileFormDTO;
  afterSubmit?: (success: boolean) => void;
};

const DEFAULT_VALUES: BusinessProfileFormDTO = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  website: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  isOrganization: false,
  isClient: false,
  customFields: [],
};

const fields: FieldType<BusinessProfileFormDTO>[] = [
  {
    name: 'isOrganization',
    type: 'checkbox',
  },
  {
    name: 'companyName',
    type: 'text',
    shouldHide: (values) => !values.isOrganization,
    fullWidth: true,
  },
  {
    name: 'firstName',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'lastName',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'email',
    type: 'email',
    fullWidth: true,
  },
  {
    name: 'website',
    type: 'url',
    fullWidth: true,
  },
  {
    name: 'address-row',
    type: 'group',
    columns: 1,
    fields: [
      {
        name: 'addressLine1',
        type: 'text',
        fullWidth: true,
      },
      {
        name: 'addressLine2',
        type: 'text',
        fullWidth: true,
      },
      {
        name: 'country-info-group',
        type: 'group',
        columns: 3,
        fields: [
          {
            name: 'city',
            type: 'text',
          },
          {
            name: 'state',
            type: 'text',
          },
          {
            name: 'postalCode',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'phoneNumber',
    type: 'tel',
  },
  {
    name: 'country',
    type: 'select',
    options: getCountryDataList().map((country: ICountryData) => ({
      label: country.name,
      value: country.iso2,
    })),
  },
  {
    type: 'objectArray',
    name: 'customFields',
    fullWidth: true,
    orderKey: 'order',
    newItem: () => ({ order: 0, name: '', value: '' }),
    itemColumns: 2,
    itemFields: [
      {
        name: 'name',
        label: '',
        placeholder: 'Custom field title',
        type: 'text',
      },
      {
        name: 'value',
        label: '',
        placeholder: 'Custom field value',
        type: 'text',
      },
    ],
  },
];

export const BusinessProfileForm = forwardRef<
  FormRef,
  BusinessProfileFormProps
>(({ action, defaultValues = DEFAULT_VALUES, afterSubmit }, ref) => {
  const onSubmit = async (data: BusinessProfileFormDTO) => {
    const result = await action(data);
    return result;
  };

  return (
    <Form<BusinessProfileFormDTO>
      ref={ref}
      basei18nkey='business-profile.form'
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={businessProfileFormSchema}
      fields={fields}
      afterSubmit={afterSubmit}
    />
  );
});

BusinessProfileForm.displayName = 'BusinessProfileForm';
