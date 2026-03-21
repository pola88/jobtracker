'use server';

import { Prisma } from '@prisma/client';
import { updateTag } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import {
  BusinessProfileDTO,
  BusinessProfileFormDTO,
  businessProfileFormSchema,
  mapBusinessProfileToDTO,
} from '@/lib/validators/business-profile';

export type ActionResponse = ActionResponseBase & {
  businessProfileId?: string;
  businessProfile?: BusinessProfileDTO;
};

export const createBusinessProfile = async (
  businessProfileData: BusinessProfileFormDTO,
): Promise<ActionResponse> => {
  try {
    const user = await requireCurrentUser();
    const parsed = businessProfileFormSchema.safeParse(businessProfileData);
    if (!parsed.success) {
      return { success: false, message: 'Invalid business profile' };
    }

    const data: Prisma.BusinessProfileUncheckedCreateInput = {
      ...(parsed.data as unknown as Prisma.BusinessProfileUncheckedCreateInput),
      userId: user.id,
    };

    const businessProfile = await prisma.businessProfile.create({
      data: {
        ...data,
      },
    });

    updateTag(
      `business-profiles-${businessProfileData.isClient ? 'clients' : 'own'}`,
    );

    if (businessProfile.isClient) {
      updateTag('client-size');
    }

    return { success: true, businessProfileId: businessProfile.id };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Invalid business profile' };
  }
};

export const editBusinessProfile = async (
  id: string,
  businessProfileData: BusinessProfileFormDTO,
): Promise<ActionResponse> => {
  try {
    const user = await requireCurrentUser();
    const parsed = businessProfileFormSchema.safeParse(businessProfileData);
    if (!parsed.success) {
      return { success: false, message: 'Invalid business profile' };
    }

    const data: Prisma.BusinessProfileUncheckedUpdateInput = {
      ...(parsed.data as unknown as Prisma.BusinessProfileUncheckedUpdateInput),
    };

    const businessProfile = await prisma.businessProfile.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        ...data,
      },
    });

    if (!businessProfile) {
      return { success: false, message: 'Invalid business profile' };
    }

    updateTag(`business-profile-${businessProfile.id}`);
    updateTag(
      `business-profiles-${businessProfileData.isClient ? 'clients' : 'own'}`,
    );

    return {
      success: true,
      businessProfile: mapBusinessProfileToDTO(businessProfile),
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Invalid business profile' };
  }
};

export const deleteBusinessProfile = async (
  id: string,
): Promise<ActionResponse> => {
  const user = await requireCurrentUser();
  const businessProfile = await prisma.businessProfile.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!businessProfile) {
    return { success: false, message: 'Invalid business profile' };
  }

  updateTag(
    `business-profiles-${businessProfile.isClient ? 'clients' : 'own'}`,
  );

  if (businessProfile.isClient) {
    updateTag('client-size');
  }

  return {
    success: true,
  };
};
