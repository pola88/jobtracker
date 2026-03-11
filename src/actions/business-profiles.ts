'use server';

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

    const businessProfile = await prisma.businessProfile.create({
      data: {
        ...parsed.data,
        userId: user.id,
      },
    });

    updateTag(
      `business-profile-${businessProfileData.isClient ? 'clients' : 'own'}`,
    );

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

    const businessProfile = await prisma.businessProfile.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        ...parsed.data,
      },
    });

    if (!businessProfile) {
      return { success: false, message: 'Invalid business profile' };
    }

    updateTag(
      `business-profile-${businessProfileData.isClient ? 'clients' : 'own'}`,
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

  return {
    success: true,
  };
};
