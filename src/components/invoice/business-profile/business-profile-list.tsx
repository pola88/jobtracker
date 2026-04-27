'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { deleteBusinessProfile } from '@/actions/business-profiles';
import { AddBusinessProfileCard } from '@/components/business-profile/add-card';
import { MODAL_NAME } from '@/components/business-profile/business-modal';
import { BusinessProfileCard } from '@/components/business-profile/business-profile-card';
import { BusinessProfileCard as BusinessProfileCardSkeleton } from '@/components/skeletons/business-profile-card';
import { useModal } from '@/hooks/use-modal';
import { getOwnBusinessProfile } from '@/lib/repository/business-profiles';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { useBusinessProfileStore } from '@/stores/business-profile';

export const BusinessProfileList = () => {
  const [isLoading, startTransition] = useTransition();
  const [businessProfiles, setBusinessProfiles] = useState<
    BusinessProfileDTO[]
  >([]);
  const { toggleModal } = useModal({ modalName: MODAL_NAME });
  const updatedAt = useBusinessProfileStore((state) => state.updatedAt);

  useEffect(() => {
    startTransition(() => {
      const fetchBusinessProfiles = async () => {
        const result = await getOwnBusinessProfile();
        setBusinessProfiles(result);
      };
      fetchBusinessProfiles();
    });
  }, [updatedAt]);

  const handleOnCardClick = useCallback(
    (id: string) => {
      toggleModal({ id });
    },
    [toggleModal],
  );

  return (
    <div className='flex gap-4 '>
      <AddBusinessProfileCard isLoading={isLoading} />
      {isLoading && <BusinessProfileCardSkeleton />}
      {!isLoading &&
        businessProfiles.map((businessProfile) => (
          <BusinessProfileCard
            key={businessProfile.id}
            businessProfile={businessProfile}
            onDeleteAction={deleteBusinessProfile}
            onClickAction={handleOnCardClick}
          />
        ))}
    </div>
  );
};
