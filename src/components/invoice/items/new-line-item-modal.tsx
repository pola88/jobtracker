'use client';

import { useRef, useState } from 'react';

import { createInvoiceLineItem } from '@/actions/invoice-line-items';
import { Button } from '@/components/button';
import type { FormRef } from '@/components/form';
import { InvoiceLineItemForm } from '@/components/forms/invoice-line-item';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { useInvoiceLineItemStore } from '@/stores/invoice-line-item';

const MODAL_NAME = 'NewInvoiceLineItem';

export const NewInvoiceLineItem = () => {
  const formRef = useRef<FormRef>(null);
  const touch = useInvoiceLineItemStore((state) => state.touch);
  const [isLoading, setIsLoading] = useState(false);
  const { modalStatus, toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  const submitCallback = (success: boolean) => {
    if (success) {
      touch();
      toggleModal();
    }
    setIsLoading(false);
  };

  const onSubmit = () => {
    setIsLoading(true);
    formRef.current?.submit();
  };

  if (!modalStatus.isOpen) return null;

  return (
    <Dialog open={modalStatus.isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4 pt-4'>
          <InvoiceLineItemForm
            ref={formRef}
            action={createInvoiceLineItem}
            afterSubmit={submitCallback}
          />
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
