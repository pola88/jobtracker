import { BusinessProfileDTO } from '@/lib/validators/business-profile';

export const getBusinessProfileName = (
  businessProfile: BusinessProfileDTO | null,
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
  businessProfile: BusinessProfileDTO | null,
): string => {
  if (!businessProfile) {
    return '';
  }

  return `${businessProfile.addressLine1} ${businessProfile.addressLine2 || ''}`.trim();
};

export const getBusinessProfileCity = (
  businessProfile: BusinessProfileDTO | null,
): string => {
  if (!businessProfile) {
    return '';
  }

  return `${businessProfile.city}, ${businessProfile.state || ''} ${businessProfile.postalCode || ''}`.trim();
};

export const getBusinessProfileFullAddress = (
  businessProfile: BusinessProfileDTO | null,
): string => {
  return `${getBusinessProfileAddress(businessProfile)}, ${getBusinessProfileCity(businessProfile)}`.trim();
};
