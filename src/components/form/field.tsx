'use client';

import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { CheckboxField } from './checkbox-field';
import { DateField } from './date-field';
import SelectField from './select-field';
import { FieldProps } from './types';

type FieldType = 'select' | 'textarea' | 'date' | 'input' | 'checkbox';

const fieldComponentMap = {
  select: SelectField,
  textarea: Textarea,
  date: DateField,
  input: Input,
  checkbox: CheckboxField,
} as const;

const Field = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type,
  options,
  shouldHide,
  checkIfDisabled,
  basei18nkey,
}: FieldProps<T>) => {
  const t = useTranslations(basei18nkey);
  const labelText = label ?? t(`${String(name)}.label`);
  const placeholderText = placeholder ?? t(`${String(name)}.placeholder`);
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
  const Component = fieldComponentMap[type as FieldType] ?? Input;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {type != 'checkbox' && <FormLabel>{labelText}</FormLabel>}
          <FormControl>
            <Component
              {...field}
              basei18nkey={basei18nkey}
              type={type}
              label={labelText}
              disabled={disabled}
              placeholder={placeholderText}
              options={options ?? []}
              className='focus-visible:ring-offset-0 focus-visible:ring'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
