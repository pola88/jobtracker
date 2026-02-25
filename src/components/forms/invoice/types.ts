import { UseFormReturn } from 'react-hook-form';

import { ActionResponseBase } from '@/lib/types';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { InvoiceDTO, LineItemDTO } from '@/lib/validators/invoice';

export interface ItemsProps {
  form: UseFormReturn<InvoiceDTO>;
}

export interface LineItemProps {
  index: number;
  item: LineItemDTO;
  removeLineItem: () => void;
}

export interface InvoiceFormProps {
  businessProfile: BusinessProfileDTO | null;
  onPreview: (data: InvoiceDTO) => Promise<ActionResponseBase>;
}
