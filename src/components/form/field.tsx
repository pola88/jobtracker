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
import { Textarea } from '../ui/textarea';
import SelectField from './select-field';
import { FieldProps } from './types';

const Field = <T extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  type,
  options,
  shouldHide,
  checkIfDisabled,
}: FieldProps<T>) => {
  const [hidden, setHidden] = useState(
    shouldHide ? shouldHide(form.getValues()) : false,
  );
  const [disabled, setDisabled] = useState(
    checkIfDisabled ? checkIfDisabled(form.getValues()) : false,
  );

  useEffect(() => {
    if (!shouldHide && !checkIfDisabled) return;

    return form.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        const hide = shouldHide ? shouldHide(values) : false;
        const disabled = checkIfDisabled ? checkIfDisabled(values) : false;
        setDisabled(disabled);
        setHidden(hide);
      },
    });
  }, [form, shouldHide, checkIfDisabled]);

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
              <SelectField
                placeholder={placeholder}
                field={field}
                options={options || []}
                disabled={disabled}
              />
            ) : type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                className='min-h-25'
                {...field}
                disabled={disabled}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                disabled={disabled}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
