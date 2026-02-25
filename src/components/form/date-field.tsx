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

// export interface DateFieldProps {
//   id: string;
//   value: Date;
//   onChange: (value?: Date) => void;
//   required?: undefined;
// }

export function DateField({ id, value, onChange, required }: FieldValues) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant='outline'
          data-empty={!value}
          className='data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal'
        >
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
          required={required}
        />
      </PopoverContent>
    </Popover>
  );
}
