import { FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type CheckboxFieldProps = FieldValues & { label: string };

export function CheckboxField({
  id,
  name,
  label,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div className='flex gap-2'>
      <Checkbox id={id} name={name} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
