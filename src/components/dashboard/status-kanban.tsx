import type { Interview } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type KanbanColumn = {
  status: string;
  items: Interview[];
};

type StatusKanbanProps = {
  columns: KanbanColumn[];
};

export function StatusKanban({ columns }: StatusKanbanProps) {
  return (
    <div className='grid gap-4 md:grid-cols-5'>
      {columns.map((column) => (
        <Card key={column.status} className='glass-panel'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <CardTitle className='text-sm font-medium capitalize'>
              {column.status}
            </CardTitle>
            <Badge variant='secondary'>{column.items.length}</Badge>
          </CardHeader>
          <CardContent className='space-y-3'>
            {column.items.length === 0 && (
              <p className='text-sm text-muted-foreground'>Sin registros</p>
            )}
            {column.items.map((interview) => (
              <div
                key={interview.id}
                className='rounded-lg border border-dashed border-border/70 bg-background/80 p-3 text-sm'
              >
                <p className='font-medium'>{interview.company}</p>
                <p className='text-muted-foreground'>{interview.position}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
