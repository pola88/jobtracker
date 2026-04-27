'use client';

import Link from 'next/link';

import { BusinessProfileCard } from '@/components/business-profile/business-profile-card';
import Form from '@/components/form';
import * as businessProfileHelpers from '@/lib/helpers/business-profile';
import { InvoiceDTO, invoiceSchema } from '@/lib/validators/invoice';

import Field from '../../form/field';
import Items from './items';
import { type InvoiceFormProps } from './types';

const InvoiceForm = ({ businessProfile, onPreview }: InvoiceFormProps) => {
  const defaultValues: InvoiceDTO = {
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    fromName: businessProfileHelpers.getBusinessProfileName(businessProfile),
    fromEmail: businessProfile?.email || '',
    fromAddress:
      businessProfileHelpers.getBusinessProfileAddress(businessProfile),
    fromCity: businessProfileHelpers.getBusinessProfileCity(businessProfile),
    fromCountry: businessProfile?.country || '',
    toName: '',
    toEmail: '',
    toAddress: '',
    lineItems: [
      {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        rate: 0,
      },
    ],
  };

  return (
    <Form<InvoiceDTO>
      defaultValues={defaultValues}
      isLoading={false}
      onSubmit={onPreview}
      schema={invoiceSchema}
      render={(form) => (
        <>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Field
                name='invoiceNumber'
                label='Invoice Number'
                placeholder='INV-001'
                type='text'
                form={form}
              />
            </div>
            <div className='space-y-2'>
              <Field
                name='invoiceDate'
                label='Invoice Date'
                placeholder='Invoice Date'
                type='date'
                form={form}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Field
              name='dueDate'
              label='Due Date'
              placeholder='Due Date'
              type='date'
              form={form}
            />
          </div>

          <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
            <h3 className='font-semibold text-foreground'>From</h3>
            {!businessProfile && (
              <div>
                Business profile not found{' '}
                <Link href='/invoices/settings' className='text-blue-500'>
                  Set up your business profile
                </Link>
              </div>
            )}
            {businessProfile && (
              <BusinessProfileCard businessProfile={businessProfile} />
            )}
            {/* <div className='space-y-3'>
              <div className='space-y-2'>
                <Field
                  name='fromName'
                  label='Name / Company'
                  placeholder='Your Company Name'
                  type='text'
                  form={form}
                />
              </div>
              <div className='space-y-2'>
                <Field
                  name='fromEmail'
                  label='Email'
                  placeholder='your@email.com'
                  type='email'
                  form={form}
                />
              </div>
              <div className='space-y-2'>
                <Field
                  name='fromAddress'
                  label='Address'
                  placeholder='Your address'
                  type='textarea'
                  form={form}
                />
              </div>
            </div> */}
          </div>

          <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
            <h3 className='font-semibold text-foreground'>Bill To</h3>
            <div className='space-y-3'>
              <div className='space-y-2'>
                <Field
                  name='toName'
                  label='Client Name'
                  placeholder='Client Company Name'
                  type='text'
                  form={form}
                />
              </div>
              <div className='space-y-2'>
                <Field
                  name='toEmail'
                  label='Email'
                  placeholder='client@email.com'
                  type='email'
                  form={form}
                />
              </div>
              <div className='space-y-2'>
                <Field
                  name='toAddress'
                  label='Address'
                  placeholder='Client address'
                  type='textarea'
                  form={form}
                />
              </div>
            </div>
          </div>
          <div className='space-y-4 md:col-span-2 col-span-1'>
            <Items form={form} />
          </div>
        </>
      )}
    />
  );
};

export default InvoiceForm;
