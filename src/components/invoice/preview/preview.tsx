'use client';

import { pdf } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { useRef, useState } from 'react';

import { LineItem } from '@/components/forms/invoice/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PdfDownload } from '../pdf';
import { PreviewProps } from './types';

const Preview = ({ data, open, onOpenChange }: PreviewProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!data) return null;

  const lineItems = data.lineItems || [];
  const subtotal = lineItems.reduce(
    (sum: number, item: LineItem) => sum + item.quantity * item.rate,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleDownload = async () => {
    setIsGeneratingPDF(true);

    try {
      const blob = await pdf(<PdfDownload data={data} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${data.invoiceNumber || 'draft'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(
        `Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <span>Invoice Preview</span>
            <div className='flex gap-2'>
              <Button
                onClick={handleDownload}
                size='sm'
                disabled={isGeneratingPDF}
              >
                <Download className='mr-2 h-4 w-4' />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div ref={invoiceRef} className='bg-white p-8 rounded-lg shadow-xs'>
          <div className='space-y-8'>
            <div className='flex items-start justify-between border-b pb-6'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight text-[#1e293b]'>
                  INVOICE
                </h1>
                <p className='mt-2 text-sm text-[#64748b]'>
                  {data.invoiceNumber || 'INV-000'}
                </p>
              </div>
              <div className='text-right'>
                <div className='text-sm text-[#64748b]'>Date</div>
                <div className='font-medium text-[#1e293b]'>
                  {data.invoiceDate}
                </div>
                <div className='mt-2 text-sm text-[#64748b]'>Due Date</div>
                <div className='font-medium text-[#1e293b]'>{data.dueDate}</div>
              </div>
            </div>

            <div className='grid gap-8 sm:grid-cols-2'>
              <div>
                <div className='mb-2 text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                  From
                </div>
                <div className='space-y-1 text-sm'>
                  <div className='font-semibold text-[#1e293b]'>
                    {data.fromName}
                  </div>
                  <div className='text-[#64748b]'>{data.fromEmail}</div>
                  {data.fromAddress && (
                    <div className='text-[#64748b] whitespace-pre-line'>
                      {data.fromAddress}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className='mb-2 text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                  Bill To
                </div>
                <div className='space-y-1 text-sm'>
                  <div className='font-semibold text-[#1e293b]'>
                    {data.toName}
                  </div>
                  <div className='text-[#64748b]'>{data.toEmail}</div>
                  {data.toAddress && (
                    <div className='text-[#64748b] whitespace-pre-line'>
                      {data.toAddress}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <table className='w-full'>
                <thead>
                  <tr className='border-b'>
                    <th className='pb-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                      Description
                    </th>
                    <th className='pb-3 text-right text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                      Qty
                    </th>
                    <th className='pb-3 text-right text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                      Rate
                    </th>
                    <th className='pb-3 text-right text-xs font-semibold uppercase tracking-wide text-[#64748b]'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {lineItems.map((item: LineItem) => (
                    <tr key={item.id}>
                      <td className='py-4 text-sm text-[#1e293b]'>
                        {item.description}
                      </td>
                      <td className='py-4 text-right text-sm text-[#1e293b]'>
                        {item.quantity}
                      </td>
                      <td className='py-4 text-right text-sm text-[#1e293b]'>
                        ${item.rate.toFixed(2)}
                      </td>
                      <td className='py-4 text-right text-sm font-medium text-[#1e293b]'>
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex justify-end'>
              <div className='w-full max-w-xs space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-[#64748b]'>Subtotal</span>
                  <span className='font-medium text-[#1e293b]'>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-[#64748b]'>Tax (10%)</span>
                  <span className='font-medium text-[#1e293b]'>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between border-t pt-2'>
                  <span className='font-semibold text-[#1e293b]'>Total</span>
                  <span className='text-xl font-bold text-[#1e293b]'>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className='border-t pt-6 text-center text-sm text-muted-foreground'>
              Thank you for your business!
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
