'use client';

import countriesList from 'country-list';

import { ActionResponse } from '@/actions/invoices-settings';
import Form from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  BusinessProfileDTO,
  businessProfileIndividualSchema,
} from '@/lib/validators/business-profile-individual';

type BusinessProfileFormProps = {
  action: (formData: BusinessProfileDTO) => Promise<ActionResponse>;
  defaultValues?: BusinessProfileDTO;
};

const DEFAULT_VALUES: BusinessProfileDTO = {
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
};

const fields: FieldType<BusinessProfileDTO>[] = [
  {
    name: 'contact-row',
    type: 'group',
    columns: 2,
    label: 'Información básica',
    fields: [
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
      },
      {
        name: 'lastName',
        label: 'Apellido',
        placeholder: 'Apellido',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
      },
      {
        name: 'website',
        label: 'Sitio web',
        placeholder: 'Sitio web',
        type: 'url',
      },
    ],
  },
  {
    name: 'address-row',
    type: 'group',
    columns: 2,
    label: 'Contacto',
    fields: [
      {
        name: 'address-info-group',
        type: 'group',
        columns: 1,
        fields: [
          {
            name: 'addressLine1',
            label: 'Dirección 1',
            placeholder: 'Dirección',
            type: 'text',
          },
          {
            name: 'addressLine2',
            label: 'Dirección 2',
            placeholder: 'Dirección 2',
            type: 'text',
          },
        ],
      },
      {
        name: 'country-info-group',
        type: 'group',
        columns: 2,
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
          {
            name: 'country',
            label: 'País',
            placeholder: 'Selecciona un país',
            type: 'select',
            options: countriesList.getNames().map((country: string) => ({
              label: country,
              value: country,
            })),
          },
        ],
      },
      {
        name: 'phoneNumber',
        label: 'Teléfono',
        placeholder: 'Teléfono',
        type: 'tel',
      },
    ],
  },
  {
    name: 'isOrganization',
    type: 'checkbox',
    label: '¿Es una empresa?',
    placeholder: '¿Es una empresa?',
    shouldHide: () => true,
  },
];

const BusinessProfileForm = ({
  action,
  defaultValues = DEFAULT_VALUES,
}: BusinessProfileFormProps) => {
  const onSubmit = async (data: BusinessProfileDTO) => {
    const result = await action(data);
    return result;
  };

  return (
    <Form<BusinessProfileDTO>
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={businessProfileIndividualSchema}
      fields={fields}
      submitLabel='Guardar'
    />
  );
};

export default BusinessProfileForm;
