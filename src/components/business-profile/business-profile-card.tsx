'use client';

import { UserRound } from 'lucide-react';

import { ActionResponse } from '@/actions/business-profiles';
import { DeleteButtonWithConfirm } from '@/components/button/delete-btn';
import { Card } from '@/components/card';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';

export type BusinessProfileProps = {
  businessProfile: BusinessProfileDTO;
  onClickAction?: (id: string) => void;
  onDeleteAction?: (id: string) => Promise<ActionResponse>;
};

export const BusinessProfileCard = ({
  businessProfile,
  onDeleteAction,
  onClickAction,
}: BusinessProfileProps) => {
  const handleOnConfirm = async () => {
    await onDeleteAction?.(businessProfile.id);
  };

  const name =
    businessProfile.companyName ||
    `${businessProfile.firstName} ${businessProfile.lastName}`.trim();
  const address =
    `${businessProfile.addressLine1} ${businessProfile.addressLine2 || ''}`.trim();
  const city =
    `${businessProfile.city}, ${businessProfile.state || ''} ${businessProfile.postalCode || ''}`.trim();

  return (
    <Card
      className='flex flex-col gap-1 relative group/business-profile hover:bg-gray-100 cursor-pointer min-h-37'
      onClick={() => onClickAction?.(businessProfile.id)}
    >
      {onDeleteAction && (
        <div className='absolute top-1 right-2 group-hover/business-profile:visible invisible'>
          <DeleteButtonWithConfirm onConfirm={handleOnConfirm} />
        </div>
      )}
      <div className='flex gap-4'>
        <UserRound className='h-6 w-6' />
        <div>
          <h1>{name}</h1>
          <p>{businessProfile.phoneNumber}</p>
          <p>{address}</p>
          <p>{city}</p>
          <p>{businessProfile.country}</p>
        </div>
      </div>
    </Card>
  );
};
