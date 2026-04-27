import { UseFormReturn } from 'react-hook-form';

import { ActionResponseBase } from '@/lib/types';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { InvoiceDTO } from '@/lib/validators/invoice';
import { InvoiceLineItemDTO } from '@/lib/validators/invoice-line-item';

export interface ItemsProps {
  form: UseFormReturn<InvoiceDTO>;
}

export interface LineItemProps {
  index: number;
  item: Omit<InvoiceLineItemDTO, 'createdAt' | 'updatedAt'>;
  removeLineItem: () => void;
}

export interface InvoiceFormProps {
  businessProfile: BusinessProfileDTO | null;
  onPreview: (data: InvoiceDTO) => Promise<ActionResponseBase>;
}
