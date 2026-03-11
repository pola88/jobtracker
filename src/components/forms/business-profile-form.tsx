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
};

const fields: FieldType<BusinessProfileFormDTO>[] = [
  {
    name: 'isOrganization',
    type: 'checkbox',
    label: 'Organization',
    placeholder: 'Organization',
  },
  {
    name: 'companyName',
    label: 'Nombre de la empresa',
    placeholder: 'Nombre de la empresa',
    type: 'text',
    shouldHide: (values) => !values.isOrganization,
    fullWidth: true,
  },
  {
    name: 'firstName',
    label: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'lastName',
    label: 'Apellido',
    placeholder: 'Apellido',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    fullWidth: true,
  },
  {
    name: 'website',
    label: 'Sitio web',
    placeholder: 'Sitio web',
    type: 'url',
    fullWidth: true,
  },
  {
    name: 'address-row',
    type: 'group',
    columns: 1,
    label: 'Contacto',
    fields: [
      {
        name: 'addressLine1',
        label: 'Dirección 1',
        placeholder: 'Dirección',
        type: 'text',
        fullWidth: true,
      },
      {
        name: 'addressLine2',
        label: 'Dirección 2',
        placeholder: 'Dirección 2',
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
            label: 'Ciudad',
            placeholder: 'Ciudad',
            type: 'text',
          },
          {
            name: 'state',
            label: 'Estado',
            placeholder: 'Estado',
            type: 'text',
          },
          {
            name: 'postalCode',
            label: 'Código postal',
            placeholder: 'Código postal',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'phoneNumber',
    label: 'Teléfono',
    placeholder: 'Teléfono',
    type: 'tel',
  },
  {
    name: 'country',
    label: 'País',
    placeholder: 'Selecciona un país',
    type: 'select',
    options: getCountryDataList().map((country: ICountryData) => ({
      label: country.name,
      value: country.iso2,
    })),
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
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={businessProfileFormSchema}
      fields={fields}
      submitLabel='Save'
      afterSubmit={afterSubmit}
    />
  );
});

BusinessProfileForm.displayName = 'BusinessProfileForm';
