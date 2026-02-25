import { Plus } from 'lucide-react';

import Button from './button';

interface AddButtonProps {
  label?: string;
  onClick: () => void;
  className?: string;
}

export const AddButton = ({ onClick, className, label }: AddButtonProps) => {
  const size = label ? 'sm' : 'icon';
  return (
    <Button type='button' size={size} onClick={onClick} className={className}>
      <Plus className='h-4 w-4' />
      {label}
    </Button>
  );
};
