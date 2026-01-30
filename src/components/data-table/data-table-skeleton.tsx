'use client';

import { flexRender } from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTableSkeletonProps } from './types';

export function DataTableSkeleton<TData>({
  table,
}: DataTableSkeletonProps<TData>) {
  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
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
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: table.getAllColumns().length }).map(
                  (_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className='h-6 w-full' />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className='flex items-center justify-end space-x-2 py-4'>
        <Skeleton className='h-8 w-20' />
        <Skeleton className='h-8 w-20' />
      </div> */}
    </div>
  );
}
