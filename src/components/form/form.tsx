'use client';

import React, { useImperativeHandle } from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Form as FormComponent } from '@/components/ui/form';
import { resolveValue } from '@/i18n/resolveValue';
import { TranslationKey } from '@/i18n/type';

import Button from '../button';
import Field from './field';
import { ObjectArrayField } from './object-array-field';
import styles, { groupColumnsClass } from './styles';
import {
  FieldProps,
  FormProps,
  GroupField,
  ObjectArrayField as ObjectArrayFieldConfig,
  SpacerField,
} from './types';

type RegularFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldConfig: Omit<FieldProps<T>, 'form'>;
};

type GroupFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldConfig: GroupField<T>;
  isNested?: boolean;
};

type FormTranslationKey = Extract<TranslationKey, `${string}.form`>;
type FormFieldsTranslationKey = Extract<
  TranslationKey,
  `${FormTranslationKey}.fields`
>;

const isFormTranslationKey = (
  key?: TranslationKey,
): key is FormTranslationKey => Boolean(key?.endsWith('.form'));

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

  if (!('name' in field)) {
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
  const t = useTranslations(fieldConfig.basei18nkey);
  const groupColumns =
    groupColumnsClass[fieldConfig.columns ?? 2] ?? groupColumnsClass[2];

  const wrapperClass = fieldConfig.fullWidth
    ? styles.fieldFullWidth
    : styles.groupWrapper;

  const translateLabelKey = `${fieldConfig.name}.label`;
  const label = resolveValue({
    basei18nkey: fieldConfig.basei18nkey,
    name: translateLabelKey,
    t,
  });

  return (
    <div
      key={fieldConfig.name}
      className={!isNested ? wrapperClass : undefined}
    >
      {label && <div className={styles.groupLabel}>{label}</div>}
      <div className={`${styles.groupGrid} ${groupColumns}`}>
        {fieldConfig.fields.map((groupField) => {
          groupField.basei18nkey = fieldConfig.basei18nkey;
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

const ObjectArray = <T extends FieldValues>({
  form,
  fieldConfig,
}: {
  form: UseFormReturn<T>;
  fieldConfig: ObjectArrayFieldConfig<T>;
}) => {
  const containerClass = fieldConfig.fullWidth
    ? styles.fieldFullWidth
    : styles.field;

  return (
    <div key={String(fieldConfig.name)} className={containerClass}>
      <ObjectArrayField form={form} {...fieldConfig} />
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
    basei18nkey,
    afterSubmit,
  }: FormProps<T>,
  ref: React.ForwardedRef<FormRef | undefined>,
) => {
  const t = useTranslations(basei18nkey);
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
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
          if (isFormTranslationKey(basei18nkey)) {
            fieldConfig.basei18nkey =
              `${basei18nkey}.fields` as FormFieldsTranslationKey;
          }

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

          if (fieldConfig.type === 'objectArray') {
            return (
              <ObjectArray
                key={String(fieldConfig.name)}
                form={form}
                fieldConfig={fieldConfig as ObjectArrayFieldConfig<T>}
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
              {t('submit') ?? submitLabel}
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
