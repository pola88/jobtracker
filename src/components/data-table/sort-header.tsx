import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '../button';

type SortHeaderProps<TData> = {
  text: string;
  column: Column<TData>;
};

export const SortHeader = <TData,>({
  column,
  text,
}: SortHeaderProps<TData>) => {
  const sort = column.getIsSorted();

  return (
    <Button
      variant='ghost'
      onClick={column.getToggleSortingHandler()}
      className='group'
    >
      {text}
      {sort === 'asc' && <ArrowUp className='ml-2 h-4 w-4' />}
      {sort === 'desc' && <ArrowDown className='ml-2 h-4 w-4' />}
      <span className='opacity-0 group-hover:opacity-100 transition-opacity'>
        {!sort && <ArrowUpDown className='h-4 w-4' />}
      </span>
    </Button>
  );
};
