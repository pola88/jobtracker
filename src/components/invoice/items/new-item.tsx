'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/button';
import { useModal } from '@/hooks/use-modal';

const MODAL_NAME = 'NewInvoiceLineItem';

export const NewInvoiceLineItemBtn = () => {
  const t = useTranslations('invoice-line-item.page');
  const { toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  return <Button onClick={() => toggleModal()}>{t('new-btn')}</Button>;
};
