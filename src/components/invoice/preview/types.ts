import { InvoiceDTO } from '@/lib/validators/invoice';

export interface PreviewProps {
  data: InvoiceDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
