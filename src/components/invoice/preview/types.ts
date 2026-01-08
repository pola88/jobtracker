import { Invoice } from '@/components/forms/invoice/types';

export interface PreviewProps {
  data: Invoice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
