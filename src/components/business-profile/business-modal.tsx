'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import {
  createBusinessProfile,
  editBusinessProfile,
} from '@/actions/business-profiles';
import { Button } from '@/components/button';
import type { FormRef } from '@/components/form';
import { BusinessProfileForm } from '@/components/forms/business-profile-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { getBusinessProfile } from '@/lib/data/business-profiles';
import {
  BusinessProfileDTO,
  BusinessProfileFormDTO,
} from '@/lib/validators/business-profile';

import { Skeleton } from '../ui/skeleton';

export const MODAL_NAME = 'BusinessModal';

export const BusinessModal = () => {
  const formRef = useRef<FormRef>(null);
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfileDTO | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBusiness, startTransition] = useTransition();
  const { modalStatus, toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  const submitCallback = (success: boolean) => {
    if (success) {
      // touch();
      toggleModal();
    }
    setIsLoading(false);
  };

  const handleOnSubmit = (data: BusinessProfileFormDTO) => {
    if (modalStatus.id) {
      return editBusinessProfile(modalStatus.id, data);
    } else {
      return createBusinessProfile(data);
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    formRef.current?.submit();
  };

  useEffect(() => {
    startTransition(() => {
      const fetchBusinessProfile = async () => {
        if (modalStatus.id) {
          const businessProfile = await getBusinessProfile(modalStatus.id);
          console.log(businessProfile);
          setBusinessProfile(businessProfile);
        }
      };

      if (modalStatus.isOpen) {
        fetchBusinessProfile();
      }
    });
  }, [modalStatus]);

  if (!modalStatus.isOpen) return null;

  return (
    <Dialog open={modalStatus.isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent className='min-w-lvh'>
        <DialogHeader>
          <DialogTitle>New Business profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4 pt-4'>
          {isLoadingBusiness && <Skeleton className='h-[60vh] w-full' />}
          {!isLoadingBusiness && (
            <BusinessProfileForm
              ref={formRef}
              action={handleOnSubmit}
              defaultValues={{
                isOrganization: businessProfile?.isOrganization ?? false,
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
                isClient: businessProfile?.isClient ?? false,
                customFields: businessProfile?.customFields ?? [],
              }}
              afterSubmit={submitCallback}
            />
          )}
        </div>
        <DialogFooter className='mt-6'>
          <Button isLoading={isLoading} onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
