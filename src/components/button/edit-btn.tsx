import { Pencil } from 'lucide-react';

import Button from './button';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}
export const EditButton = ({ onClick, className }: EditButtonProps) => {
  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      onClick={onClick}
      className={className}
    >
      <Pencil className='h-4 w-4' />
    </Button>
  );
};
