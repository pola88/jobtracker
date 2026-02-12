import {
  getBusinessProfile,
  updateOrCreateBusinessProfileAction,
} from '@/actions/invoices-settings';
import BusinessProfileForm from '@/components/forms/business-profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessProfileDTO } from '@/lib/validators/business-profile-individual';

type BusinessProfileProps = {
  isOrganization: boolean;
};
const BusinessProfile = async ({ isOrganization }: BusinessProfileProps) => {
  const businessProfile = await getBusinessProfile(isOrganization);

  const handleOnSubmit = async (data: BusinessProfileDTO) => {
    return updateOrCreateBusinessProfileAction(isOrganization, data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isOrganization
            ? 'Información de la empresa'
            : 'Información personal'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BusinessProfileForm
          action={handleOnSubmit}
          defaultValues={{
            isOrganization,
            firstName: businessProfile?.firstName || '',
            lastName: businessProfile?.lastName || '',
            companyName: businessProfile?.companyName || '',
            email: businessProfile?.email || '',
            addressLine1: businessProfile?.addressLine1 || '',
            city: businessProfile?.city || '',
            state: businessProfile?.state || '',
            postalCode: businessProfile?.postalCode || '',
            country: businessProfile?.country || '',
            website: businessProfile?.website || '',
            phoneNumber: businessProfile?.phoneNumber || '',
            addressLine2: businessProfile?.addressLine2 || '',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BusinessProfile;
