import type { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { z } from 'zod';

export type SelectFieldOption = {
  label: string;
  value: string;
};

type BaseFieldProps<T extends z.ZodTypeAny> = {
  form: UseFormReturn<z.infer<T>>;
  name: Path<z.infer<T>>;
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  options?: SelectFieldOption[];
  shouldHide?: (values: z.infer<T>) => boolean;
  checkIfDisabled?: (values: z.infer<T>) => boolean;
};

type TextFieldProps<T extends z.ZodTypeAny> = BaseFieldProps<T> & {
  type: HTMLInputTypeAttribute;
};

type TextareaFieldProps<T extends z.ZodTypeAny> = BaseFieldProps<T> & {
  type: 'textarea';
};

type SelectFieldVariant<T extends z.ZodTypeAny> = BaseFieldProps<T> & {
  type: 'select';
  options: SelectFieldOption[];
};

export type FieldProps<T extends z.ZodTypeAny> =
  | TextFieldProps<T>
  | TextareaFieldProps<T>
  | SelectFieldVariant<T>;

export type SpacerField<T extends z.ZodTypeAny> = {
  name: string;
  type: 'spacer';
  fullWidth?: boolean;
  shouldHide?: (values: z.infer<T>) => boolean;
};

export type GroupField<T extends z.ZodTypeAny> = {
  name: string;
  type: 'group';
  fields: Array<Omit<FieldProps<T>, 'form'>>;
  columns?: 1 | 2 | 3 | 4;
  fullWidth?: boolean;
  shouldHide?: (values: z.infer<T>) => boolean;
};

export type Field<T extends z.ZodTypeAny> =
  | Omit<FieldProps<T>, 'form'>
  | SpacerField<T>
  | GroupField<T>;

export type FormProps<T extends z.ZodTypeAny> = {
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => void;
  schema: T;
  fields?: Field<T>[];
  render?: (form: UseFormReturn<z.infer<T>>) => React.ReactNode;
  isLoading: boolean;
  submitLabel?: string;
  error?: string | null;
};

export type SelectFieldProps = {
  field: FieldValues;
  options: SelectFieldOption[];
  disabled?: boolean;
};
