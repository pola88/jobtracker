import { BusinessProfile } from '@prisma/client';

export const getBusinessProfileName = (
  businessProfile: BusinessProfile | null,
): string => {
  if (!businessProfile) {
    return '';
  }

  return (
    businessProfile.companyName ||
    `${businessProfile.firstName} ${businessProfile.lastName}`.trim()
  );
};

export const getBusinessProfileAddress = (
  businessProfile: BusinessProfile | null,
): string => {
  if (!businessProfile) {
    return '';
  }

  return `${businessProfile.addressLine1} ${businessProfile.addressLine2 || ''}`.trim();
};

export const getBusinessProfileCity = (
  businessProfile: BusinessProfile | null,
): string => {
  if (!businessProfile) {
    return '';
  }

  return `${businessProfile.city}, ${businessProfile.state || ''} ${businessProfile.postalCode || ''}`.trim();
};

export const getBusinessProfileFullAddress = (
  businessProfile: BusinessProfile | null,
): string => {
  return `${getBusinessProfileAddress(businessProfile)}, ${getBusinessProfileCity(businessProfile)}`.trim();
};
