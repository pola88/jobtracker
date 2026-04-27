'use client';

import { SortingState } from '@tanstack/react-table';
import { useEffect, useMemo, useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';

import {
  countInvoiceLineItemsAction,
  getInvoiceLineItemsAction,
} from '@/actions/invoice-line-items';
import { InvoiceLineItemDTO } from '@/lib/validators/invoice-line-item';
import { useInvoiceLineItemStore } from '@/stores/invoice-line-item';

import DataTable from '../../data-table';
import { getColumns } from './columns';
import { NewInvoiceLineItemBtn } from './new-item';
import { NewInvoiceLineItem } from './new-line-item-modal';

export function InvoiceLineItemsTable() {
  const t = useTranslations('invoice-line-item.columns');
  const tTable = useTranslations('table.headers');

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'updatedAt', desc: true },
  ]);
  const [isLoading, startTransition] = useTransition();
  const updatedAt = useInvoiceLineItemStore((state) => state.updatedAt);

  const [fetchResult, setFetchResult] = useState<{
    nextCursor?: string;
    invoiceLineItems: InvoiceLineItemDTO[] | null;
    totalItems: number;
  }>({ invoiceLineItems: null, totalItems: 0 });

  const [currentCursor, setCurrentCursor] = useState<string | null | undefined>(
    null,
  );
  const [prevCursor, setPrevCursor] = useState<string | null | undefined>(
    undefined,
  );
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    startTransition(() => {
      const fetchInvoiceItems = async () => {
        const sortBy = {
          [sorting[0].id]: sorting[0].desc ? 'desc' : 'asc',
        };
        const [result, totalItems] = await Promise.all([
          getInvoiceLineItemsAction({
            cursor: currentCursor,
            pageSize,
            sortBy,
          }),
          countInvoiceLineItemsAction(),
        ]);
        setFetchResult({
          nextCursor: result.nextCursor,
          invoiceLineItems: result.invoiceLineItems,
          totalItems,
        });
      };
      fetchInvoiceItems();
    });
  }, [currentCursor, pageSize, updatedAt, sorting]);

  // const handleOnRowClick = useCallback(
  //   (row: InvoiceLineItemDTO) => {
  //     toggleModal({ id: row.id });
  //   },
  //   [toggleModal],
  // );
  const columns = useMemo(() => getColumns(t, tTable), [t, tTable]);

  return (
    <div className='glass-panel rounded-xl border'>
      <NewInvoiceLineItem />
      <DataTable
        columns={columns}
        data={fetchResult.invoiceLineItems}
        // onRowClick={handleOnRowClick}
        isLoading={isLoading}
        onPageSizeChange={setPageSize}
        setCursor={(cursor) => {
          setPrevCursor(currentCursor);
          setCurrentCursor(cursor);
        }}
        topRight={<NewInvoiceLineItemBtn />}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={{
          prevCursor: prevCursor,
          nextCursor: fetchResult.nextCursor,
          pageSize,
          countElement: fetchResult.totalItems,
        }}
      />
    </div>
  );
}
