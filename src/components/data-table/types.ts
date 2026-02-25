import { ColumnDef, SortingState, Table } from '@tanstack/react-table';
import React from 'react';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | null;
  onRowClick?: (row: TData) => void;
  setCursor?: (cursor: string | null) => void;
  sorting?: SortingState;
  onSortingChange?: (sort: SortingState) => void;
  pagination?: {
    prevCursor?: string | null;
    nextCursor?: string | null;
    pageSize?: number;
    countElement: number;
  };
  onPageSizeChange?: (pageSize: number) => void;
  isLoading?: boolean;
  topRight?: React.ReactNode;
}

export interface DataTableSkeletonProps<TData> {
  table: Table<TData>;
}
