'use server';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { businessProfileIndividualSchema } from '@/lib/validators/business-profile-individual';

export type ActionResponse = {
  success: boolean;
  message?: string;
  businessProfileId?: string;
};

export async function getBusinessProfile(isOrganization: boolean = false) {
  const user = await requireCurrentUser();
  const businessProfile = await prisma.businessProfile.findFirst({
    where: { userId: user.id, isOrganization },
  });

  return businessProfile;
}

export async function updateOrCreateBusinessProfileAction(
  isOrganization: boolean,
  formData: FormData,
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
