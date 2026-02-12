'use client';

import React, { useImperativeHandle } from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Form as FormComponent } from '@/components/ui/form';

import Button from '../button';
import Field from './field';
import styles, { groupColumnsClass } from './styles';
import { FieldProps, FormProps, GroupField, SpacerField } from './types';

type RegularFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldConfig: Omit<FieldProps<T>, 'form'>;
};

type GroupFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldConfig: GroupField<T>;
  isNested?: boolean;
};

export type FormRef =
  | {
      submit: () => void;
    }
  | undefined;

const Spacer = <T extends FieldValues>({
  name,
  fullWidth,
}: Pick<SpacerField<T>, 'name' | 'fullWidth'>) => {
  const spacerClass = fullWidth ? styles.fieldFullWidth : styles.field;

  return <div key={name} className={spacerClass} aria-hidden='true' />;
};

const RegularField = <T extends FieldValues>({
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

const Group = <T extends FieldValues>({
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

const FormInner = <T extends FieldValues>(
  {
    defaultValues,
    onSubmit,
    schema,
    fields,
    render,
    isLoading,
    submitLabel = 'Submit',
    onCancel,
    btnSize = 'default',
    toastMsg,
    skipToast = false,
    afterSubmit,
  }: FormProps<T>,
  ref: React.ForwardedRef<FormRef | undefined>,
) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const submitHandler = form.handleSubmit(
    async (data) => {
      const result = await onSubmit(data);
      if (!result.success) {
        form.setError('root', {
          type: 'server',
          message: result.message || 'Something got wrong, try again!',
        });
      } else if (!skipToast) {
        toast.success(toastMsg || 'Saved correctly', {
          position: 'top-right',
          classNames: {
            toast: '!bg-emerald-500/90 !text-black',
          },
        });
      }

      afterSubmit?.(result.success);
    },
    (errors) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Form validation errors:', errors);
      }
      afterSubmit?.(false, errors);
    },
  );

  useImperativeHandle(ref, () => ({
    submit: submitHandler,
  }));

  const loadingState = isLoading || form.formState.isSubmitting;

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
        {form.formState.errors.root?.message && (
          <p className='text-sm text-destructive'>
            {form.formState.errors.root.message}
          </p>
        )}
        {!ref && (
          <div className={styles.footer}>
            {onCancel && (
              <Button
                size={btnSize}
                variant='outline'
                disabled={loadingState}
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              size={btnSize}
              variant='default'
              isLoading={loadingState}
              type='submit'
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </form>
    </FormComponent>
  );
};

export const Form = React.forwardRef(FormInner) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef> },
) => React.ReactElement;

export default Form;
