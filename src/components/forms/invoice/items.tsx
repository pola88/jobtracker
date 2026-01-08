import { Plus } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import LineItemComponent from './line-item';
import { ItemsProps, LineItem } from './types';

const Items = ({ form }: ItemsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lineItems',
    shouldUnregister: false,
  });

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-foreground'>Line Items</h3>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              description: '',
              quantity: 1,
              rate: 0,
            })
          }
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Item
        </Button>
      </div>

      <div className='space-y-3'>
        <div className='flex gap-4'>
          <div className='flex-1 font-medium text-sm text-muted-foreground'>
            Description
          </div>
          <div className='w-24 font-medium text-sm text-muted-foreground'>
            Quantity
          </div>
          <div className='w-24 font-medium text-sm text-muted-foreground'>
            Rate
          </div>
          <div className='w-24 text-right font-medium text-sm text-muted-foreground'>
            Amount
          </div>
          <div className='w-10 h-10'></div>
        </div>

        {fields.map((item, index) => (
          <LineItemComponent
            key={item.id as string}
            index={index}
            item={item as LineItem}
            removeLineItem={() => remove(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Items;
