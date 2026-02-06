'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import Button from '@/components/button';
import { DataTableSkeleton } from '@/components/skeletons/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { styles } from './styles';
import { DataTableProps } from './types';

const DataTable = <TData, TValue>({
  columns,
  data,
  onRowClick,
  setCursor,
  pagination,
  isLoading,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination && {
      manualPagination: true,
      rowCount: pagination.countElement,
    }),
  });

  const fetchingData = isLoading || data === null;

  return (
    <div className={styles.container}>
      {pagination?.pageSize && (
        <Select
          defaultValue={`${pagination?.pageSize}`}
          onValueChange={(newPageSize) =>
            onPageSizeChange?.(Number(newPageSize))
          }
        >
          <SelectTrigger className='w-26 m-4 flex gap-2'>
            Show
            <SelectValue placeholder='Show' />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {fetchingData && <DataTableSkeleton table={table} />}
      {!fetchingData && (
        <Table>
          <TableHeader className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(styles.row, onRowClick && 'cursor-pointer')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={styles.noResults}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <div className='flex justify-between p-4 border-t'>
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='p-2'
            onClick={() => setCursor?.(pagination?.prevCursor || null)}
            disabled={pagination?.prevCursor === undefined}
          >
            {'<'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='p-2'
            onClick={() => setCursor?.(pagination?.nextCursor || null)}
            disabled={pagination?.nextCursor === undefined}
          >
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
