'use server';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import {
  BusinessProfileDTO,
  businessProfileIndividualSchema,
} from '@/lib/validators/business-profile-individual';

export type ActionResponse = ActionResponseBase & {
  businessProfileId?: string;
};

export async function getBusinessProfile(
  isOrganization: boolean = false,
): Promise<BusinessProfileDTO> {
  const user = await requireCurrentUser();
  const businessProfile = await prisma.businessProfile.findFirst({
    where: { userId: user.id, isOrganization },
  });

  return businessProfile as BusinessProfileDTO;
}

export async function updateOrCreateBusinessProfileAction(
  isOrganization: boolean,
  formData: BusinessProfileDTO,
): Promise<ActionResponse> {
  const user = await requireCurrentUser();
  const parsed = businessProfileIndividualSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: 'Datos inválidos' };
  }

  const businessProfile = await prisma.businessProfile.upsert({
    where: { userId: user.id, isOrganization },
    update: parsed.data,
    create: { ...parsed.data, userId: user.id, isOrganization },
  });

  return { success: true, businessProfileId: businessProfile.id };
}
