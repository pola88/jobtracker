import { BusinessProfile } from '@prisma/client';
import { z } from 'zod';

const customFieldsSchema = z.object({
  order: z.number(),
  name: z.string(),
  value: z.string(),
});

const baseSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  isOrganization: z.boolean(),
});

const extendedSchema = baseSchema.extend({
  id: z.string(),
  email: z
    .email()
    .or(z.literal(''))
    .transform((val) => (val === '' ? null : val))
    .optional()
    .nullable(),
  website: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  addressLine1: z.string().min(2, 'La dirección es obligatoria'),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(2, 'La ciudad es obligatoria'),
  state: z.string().min(2, 'El estado es obligatorio'),
  postalCode: z.string().min(2, 'El código postal es obligatorio'),
  country: z.string().min(2, 'El país es obligatorio'),
  isClient: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  customFields: customFieldsSchema
    .array()
    .optional()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
});

const conditionalRefinements = <TSchema extends typeof baseSchema>(
  schema: TSchema,
) =>
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

export const businessProfileSchema = conditionalRefinements(extendedSchema);

export type BusinessProfileDTO = z.infer<typeof businessProfileSchema>;

export const businessProfileFormSchema = conditionalRefinements(
  extendedSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
);
export type BusinessProfileFormDTO = z.infer<typeof businessProfileFormSchema>;

export function mapBusinessProfileToDTO(
  businessProfile: BusinessProfile,
): BusinessProfileDTO {
  const parsedCustomFields = customFieldsSchema
    .array()
    .optional()
    .nullable()
    .safeParse(businessProfile.customFields);

  return {
    ...businessProfile,
    createdAt: new Date(businessProfile.createdAt),
    updatedAt: new Date(businessProfile.updatedAt),
    customFields: parsedCustomFields.success
      ? (parsedCustomFields.data ?? undefined)
      : undefined,
  };
}
