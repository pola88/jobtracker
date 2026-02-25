import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SelectFieldProps } from './types';

const SelectField = ({
  value,
  onChange,
  options,
  disabled,
  placeholder = 'Select an option',
}: SelectFieldProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
