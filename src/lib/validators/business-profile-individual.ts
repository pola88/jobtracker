import { z } from 'zod';

const baseSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.email('Email inválido'),
  website: z.string().optional(),
  phoneNumber: z.string().optional(),
  addressLine1: z.string().min(2, 'La dirección es obligatoria'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'La ciudad es obligatoria'),
  state: z.string().min(2, 'El estado es obligatorio'),
  postalCode: z.string().min(2, 'El código postal es obligatorio'),
  country: z.string().min(2, 'El país es obligatorio'),
  isOrganization: z.boolean(),
});

type ConditionalRefinementsOpts = typeof baseSchema;

const conditionalRefinements = (schema: ConditionalRefinementsOpts) =>
  schema
    .refine(
      (data) => {
        if (data.isOrganization) {
          return (
            data.companyName !== undefined &&
            data.companyName !== null &&
            data.companyName.trim().length >= 2
          );
        }
        return true;
      },
      {
        message: 'El nombre de la empresa es obligatorio',
        path: ['companyName'],
      },
    )
    .refine(
      (data) => {
        if (!data.isOrganization) {
          return (
            data.firstName !== undefined &&
            data.firstName !== null &&
            data.firstName.trim().length >= 2
          );
        }
        return true;
      },
      {
        message: 'El nombre es obligatorio',
        path: ['firstName'],
      },
    )
    .refine(
      (data) => {
        if (!data.isOrganization) {
          return (
            data.lastName !== undefined &&
            data.lastName !== null &&
            data.lastName.trim().length >= 2
          );
        }
        return true;
      },
      {
        message: 'El apellido es obligatorio',
        path: ['lastName'],
      },
    );

export const businessProfileIndividualSchema =
  conditionalRefinements(baseSchema);

export type BusinessProfileDTO = z.infer<
  typeof businessProfileIndividualSchema
>;

export const updateBusinessProfileIndividualSchema =
  conditionalRefinements(baseSchema);
