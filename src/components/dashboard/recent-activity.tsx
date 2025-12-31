import type { Interview } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import { Badge } from '@/components/ui/badge';

type RecentActivityProps = {
  interviews: Interview[];
};

export function RecentActivity({ interviews }: RecentActivityProps) {
  return (
    <div className='space-y-4'>
      {interviews.length === 0 && (
        <p className='text-sm text-muted-foreground'>
          No hay actividad reciente todavía.
        </p>
      )}
      {interviews.map((interview) => (
        <div
          key={interview.id}
          className='flex items-center justify-between rounded-xl border bg-card/80 px-4 py-3'
        >
          <div>
            <p className='font-medium'>{interview.company}</p>
            <p className='text-sm text-muted-foreground'>
              {interview.position}
            </p>
          </div>
          <div className='text-right'>
            <Badge variant='secondary' className='capitalize'>
              {interview.status}
            </Badge>
            <p className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(interview.date), {
                locale: es,
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
