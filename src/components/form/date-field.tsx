'use client';

import { CalendarIcon } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '../ui/button';

interface DateFieldProps {
  field: FieldValues;
}

export function DateField({ field }: DateFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={field.id}
          variant='outline'
          data-empty={!field.value}
          className='data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal'
        >
          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          defaultMonth={field.value}
        />
      </PopoverContent>
    </Popover>
  );
}
