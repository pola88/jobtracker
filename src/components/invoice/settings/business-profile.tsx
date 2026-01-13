import {
  getBusinessProfile,
  updateOrCreateBusinessProfileAction,
} from '@/actions/invoices-settings';
import BusinessProfileForm from '@/components/forms/business-profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BusinessProfileProps = {
  isOrganization: boolean;
};
const BusinessProfile = async ({ isOrganization }: BusinessProfileProps) => {
  const businessProfile = await getBusinessProfile(isOrganization);

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
          action={async (_, formData) => {
            'use server';
            return updateOrCreateBusinessProfileAction(
              isOrganization,
              formData,
            );
          }}
          isOrganization={isOrganization}
          defaultValues={{
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
