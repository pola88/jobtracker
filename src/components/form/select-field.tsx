import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SelectFieldProps } from './types';

const SelectField = ({
  name,
  value,
  onChange,
  options,
  disabled,
  placeholder = 'Select an option',
  basei18nkey,
}: SelectFieldProps) => {
  const t = useTranslations(basei18nkey);

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label ?? t(`${name}.values.${option.value}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
