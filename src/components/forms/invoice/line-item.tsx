import { Trash2 } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { LineItemProps } from './types';

export const LineItem = ({ index, item, removeLineItem }: LineItemProps) => {
  const { control } = useFormContext();
  const quantity = useWatch({
    control,
    name: `lineItems.${index}.quantity`,
    defaultValue: 1,
  });
  const rate = useWatch({
    control,
    name: `lineItems.${index}.rate`,
    defaultValue: 0,
  });

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex-1'>
        <Controller
          name={`lineItems.${index}.description`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={`desc-${item.id}`}
              placeholder='Service or product description'
              required
            />
          )}
        />
      </div>
      <div className='w-24'>
        <Controller
          name={`lineItems.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={`qty-${item.id}`}
              type='number'
              min='1'
              value={field.value || 1}
              onChange={(e) =>
                field.onChange(Number.parseInt(e.target.value) || 1)
              }
            />
          )}
        />
      </div>
      <div className='w-24'>
        <Controller
          name={`lineItems.${index}.rate`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={`rate-${item.id}`}
              type='number'
              min='0'
              step='0.01'
              value={field.value || 0}
              onChange={(e) =>
                field.onChange(Number.parseFloat(e.target.value) || 0)
              }
            />
          )}
        />
      </div>
      <div className='w-24 text-right text-sm font-medium'>
        ${((quantity || 0) * (rate || 0)).toFixed(2)}
      </div>
      {index > 0 ? (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => removeLineItem()}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      ) : (
        <div className='w-10 h-10'></div>
      )}
    </div>
  );
};

export default LineItem;
