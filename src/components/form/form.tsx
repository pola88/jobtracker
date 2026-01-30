'use client';

import React, { useImperativeHandle } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form as FormComponent } from '@/components/ui/form';

import Button from '../button';
import Field from './field';
import styles, { groupColumnsClass } from './styles';
import { FieldProps, FormProps, GroupField, SpacerField } from './types';

type RegularFieldProps<T extends z.ZodTypeAny> = {
  form: UseFormReturn<z.infer<T>>;
  fieldConfig: Omit<FieldProps<T>, 'form'>;
};

type GroupFieldProps<T extends z.ZodTypeAny> = {
  form: UseFormReturn<z.infer<T>>;
  fieldConfig: GroupField<T>;
  isNested?: boolean;
};

type SubmitCallback = (isLoading: boolean, success: boolean) => void;

export type FormRef =
  | {
      submit: (callback?: SubmitCallback) => void;
    }
  | undefined;

const Spacer = <T extends z.ZodTypeAny>({
  name,
  fullWidth,
}: Pick<SpacerField<T>, 'name' | 'fullWidth'>) => {
  const spacerClass = fullWidth ? styles.fieldFullWidth : styles.field;

  return <div key={name} className={spacerClass} aria-hidden='true' />;
};

const RegularField = <T extends z.ZodTypeAny>({
  form,
  fieldConfig,
}: RegularFieldProps<T>) => {
  const { fullWidth = false, ...field } = fieldConfig;
  const containerClass = fullWidth ? styles.fieldFullWidth : styles.field;

  if (!('name' in field) || !('label' in field) || !('placeholder' in field)) {
    return null;
  }

  return (
    <div key={fieldConfig.name} className={containerClass}>
      <Field form={form} {...fieldConfig} />
    </div>
  );
};

const Group = <T extends z.ZodTypeAny>({
  form,
  fieldConfig,
  isNested = false,
}: GroupFieldProps<T>) => {
  const groupColumns =
    groupColumnsClass[fieldConfig.columns ?? 2] ?? groupColumnsClass[2];

  const wrapperClass = fieldConfig.fullWidth
    ? styles.fieldFullWidth
    : styles.groupWrapper;

  return (
    <div
      key={fieldConfig.name}
      className={!isNested ? wrapperClass : undefined}
    >
      {fieldConfig.label && (
        <div className={styles.groupLabel}>{fieldConfig.label}</div>
      )}
      <div className={`${styles.groupGrid} ${groupColumns}`}>
        {fieldConfig.fields.map((groupField) => {
          return groupField.type === 'group' ? (
            <Group
              key={groupField.name}
              form={form}
              fieldConfig={groupField as unknown as GroupField<T>}
              isNested={true}
            />
          ) : (
            <RegularField
              key={groupField.name}
              form={form}
              fieldConfig={groupField as FieldProps<T>}
            />
          );
        })}
      </div>
    </div>
  );
};

const FormInner = <T extends z.ZodTypeAny>(
  {
    defaultValues,
    onSubmit,
    schema,
    fields,
    render,
    isLoading,
    submitLabel = 'Submit',
    error,
  }: FormProps<T>,
  ref: React.ForwardedRef<FormRef | undefined>,
) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema as T),
    defaultValues,
  });
  const submitHandler = form.handleSubmit(onSubmit, (errors) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Form validation errors:', errors);
    }
  });

  useImperativeHandle(ref, () => ({
    submit: (callback) => {
      callback?.(true, false);
      submitHandler()
        .then(() => callback?.(false, true))
        .catch(() => callback?.(false, false));
    },
  }));

  return (
    <FormComponent {...form}>
      <form onSubmit={submitHandler} className={styles.form}>
        {render?.(form)}
        {fields?.map((fieldConfig) => {
          if (fieldConfig.type === 'spacer') {
            return (
              <Spacer
                key={fieldConfig.name}
                name={fieldConfig.name}
                fullWidth={fieldConfig.fullWidth}
              />
            );
          }

          if (fieldConfig.type === 'group') {
            return (
              <Group
                key={fieldConfig.name}
                form={form}
                fieldConfig={fieldConfig as GroupField<T>}
              />
            );
          }

          return (
            <RegularField
              key={fieldConfig.name}
              form={form}
              fieldConfig={fieldConfig as FieldProps<T>}
            />
          );
        })}
        {error && <p className='text-sm text-destructive'>{error}</p>}
        {!ref && (
          <div className={styles.footer}>
            <Button variant='destructive' isLoading={isLoading} type='submit'>
              {submitLabel}
            </Button>
          </div>
        )}
      </form>
    </FormComponent>
  );
};

export const Form = React.forwardRef(FormInner) as <T extends z.ZodTypeAny>(
  props: FormProps<T> & { ref?: React.Ref<FormRef> },
) => React.ReactElement;

export default Form;
