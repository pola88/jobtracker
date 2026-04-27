'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { deleteBusinessProfile } from '@/actions/business-profiles';
import { AddBusinessProfileCard } from '@/components/business-profile/add-card';
import { MODAL_NAME } from '@/components/business-profile/business-modal';
import { BusinessProfileCard } from '@/components/business-profile/business-profile-card';
import { BusinessProfileCard as BusinessProfileCardSkeleton } from '@/components/skeletons/business-profile-card';
import { useModal } from '@/hooks/use-modal';
import { countClients, getClients } from '@/lib/repository/business-profiles';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { useBusinessProfileStore } from '@/stores/business-profile';

export function ClientList() {
  const [isLoading, startTransition] = useTransition();
  const updatedAt = useBusinessProfileStore((state) => state.updatedAt);
  const { toggleModal } = useModal({ modalName: MODAL_NAME });

  const [fetchResult, setFetchResult] = useState<{
    clients: BusinessProfileDTO[] | null;
    totalClients: number;
  }>({ clients: null, totalClients: 0 });

  useEffect(() => {
    startTransition(() => {
      const fetchClients = async () => {
        const [result, totalClients] = await Promise.all([
          getClients({
            cursor: null,
          }),
          countClients(),
        ]);
        setFetchResult({
          clients: result.clients,
          totalClients,
        });
      };
      fetchClients();
    });
  }, [updatedAt]);

  const handleOnCardClick = useCallback(
    (id: string) => {
      toggleModal({ id });
    },
    [toggleModal],
  );

  return (
    <div className='flex gap-4'>
      <AddBusinessProfileCard isClient isLoading={isLoading} />
      {isLoading && <BusinessProfileCardSkeleton />}
      {!isLoading &&
        fetchResult.clients?.map((businessProfile) => (
          <BusinessProfileCard
            key={businessProfile.id}
            businessProfile={businessProfile}
            onClickAction={handleOnCardClick}
            onDeleteAction={deleteBusinessProfile}
          />
        ))}
    </div>
  );
}
