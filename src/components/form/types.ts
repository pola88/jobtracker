import type { HTMLInputTypeAttribute } from 'react';
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';

import { ZodSchema } from 'zod';

import { ActionResponseBase } from '@/lib/types';

import { ButtonProps } from '../ui/button';

export type SelectFieldOption = {
  label: string;
  value: string;
};

type BaseFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  options?: SelectFieldOption[];
  shouldHide?: (values: T) => boolean;
  checkIfDisabled?: (values: T) => boolean;
};

type TextFieldProps<T extends FieldValues> = BaseFieldProps<T> & {
  type: HTMLInputTypeAttribute;
};

type TextareaFieldProps<T extends FieldValues> = BaseFieldProps<T> & {
  type: 'textarea';
};

type SelectFieldVariant<T extends FieldValues> = BaseFieldProps<T> & {
  type: 'select';
  options: SelectFieldOption[];
};

export type FieldProps<T extends FieldValues> =
  | TextFieldProps<T>
  | TextareaFieldProps<T>
  | SelectFieldVariant<T>;

export type SpacerField<T extends FieldValues> = {
  name: string;
  type: 'spacer';
  fullWidth?: boolean;
  shouldHide?: (values: T) => boolean;
};

export type GroupField<T extends FieldValues> = {
  name: string;
  type: 'group';
  fields: Array<Omit<FieldProps<T>, 'form'> | GroupField<T>>;
  columns?: 1 | 2 | 3 | 4;
  fullWidth?: boolean;
  label?: string;
  shouldHide?: (values: T) => boolean;
};

export type Field<T extends FieldValues> =
  | Omit<FieldProps<T>, 'form'>
  | SpacerField<T>
  | GroupField<T>;

export type FormProps<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<ActionResponseBase>;
  schema: ZodSchema<T>;
  fields?: Field<T>[];
  render?: (form: UseFormReturn<T>) => React.ReactNode;
  isLoading?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  btnSize?: ButtonProps['size'];
  toastMsg?: string;
  skipToast?: boolean;
  afterSubmit?: (success: boolean, errors?: FieldErrors<T>) => void;
};

export type SelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  disabled?: boolean;
  placeholder?: string;
};
