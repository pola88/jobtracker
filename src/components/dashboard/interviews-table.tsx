import type { Interview } from '@prisma/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCompensation, formatExperience } from '@/lib/rich-text';
import { cn } from '@/lib/utils';

type InterviewsTableProps = {
  interviews: Interview[];
};

const statusVariantMap: Record<
  string,
  'success' | 'info' | 'warning' | 'default' | 'danger'
> = {
  active: 'info',
  stand_by: 'warning',
  not_interested: 'default',
  rejected: 'danger',
};

export function InterviewsTable({ interviews }: InterviewsTableProps) {
  return (
    <div className='glass-panel rounded-xl border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Puesto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Compensación</TableHead>
            <TableHead>Feeling</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell className='font-medium'>{interview.company}</TableCell>
              <TableCell>{interview.position}</TableCell>
              <TableCell>
                {format(new Date(interview.date), 'dd MMM yyyy', {
                  locale: es,
                })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={statusVariantMap[interview.status] ?? 'outline'}
                  className='capitalize'
                >
                  {interview.status}
                </Badge>
              </TableCell>
              <TableCell className='tabular-nums'>
                {formatCompensation(interview)}
              </TableCell>
              <TableCell className='text-sm'>
                {formatExperience(interview)}
              </TableCell>
              <TableCell className='text-right'>
                <Link
                  href={`/interviews/${interview.id}/edit`}
                  className={cn(
                    'text-sm font-medium text-primary underline-offset-2 hover:underline',
                  )}
                >
                  Editar
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {interviews.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className='text-center text-sm text-muted-foreground'
              >
                Aún no registraste entrevistas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
