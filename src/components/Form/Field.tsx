import { useEffect, useState } from 'react';
import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import SelectField from './SelectField';
import { FieldProps } from './types';
import { Textarea } from '../ui/textarea';


const Field = <T extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  type,
  options,
  shouldHide,
}: FieldProps<T>) => {
  const [hidden, setHidden] = useState(shouldHide ? shouldHide(form.getValues()) : false);

  useEffect(() => {
    if (!shouldHide) return;

    return form.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        const hide = shouldHide(values);
        setHidden(hide);
      },
    });
  }, [form, shouldHide]);

  if (hidden) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'select' ? (
              <SelectField field={field} options={options || []} />
            ) : type === 'textarea' ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} type={type} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
