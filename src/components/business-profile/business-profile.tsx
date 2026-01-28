import { type BusinessProfileProps } from './types';

const BusinessProfile = ({ businessProfile }: BusinessProfileProps) => {
  const name =
    businessProfile.companyName ||
    `${businessProfile.firstName} ${businessProfile.lastName}`.trim();
  const address =
    `${businessProfile.addressLine1} ${businessProfile.addressLine2 || ''}`.trim();
  const city =
    `${businessProfile.city}, ${businessProfile.state || ''} ${businessProfile.postalCode || ''}`.trim();

  return (
    <div>
      <h1>{name}</h1>
      <p>{businessProfile.phoneNumber}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{businessProfile.country}</p>
    </div>
  );
};

export default BusinessProfile;
