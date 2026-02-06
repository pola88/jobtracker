import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusMap = {
  variant: 'success' | 'info' | 'warning' | 'default' | 'danger';
  text: string;
};

const statusPropsMap: Record<string, StatusMap> = {
  applied: { variant: 'info', text: 'Applied' },
  accepted: { variant: 'success', text: 'Accepted' },
  ghosted: { variant: 'default', text: 'Ghosted' },
  active: { variant: 'info', text: 'Active' },
  stand_by: { variant: 'warning', text: 'Stand By' },
  not_interested: { variant: 'default', text: 'Not interested' },
  rejected: { variant: 'danger', text: 'Rejected' },
};

type InterviewStatusProps = {
  status: string;
  isLoading?: boolean;
  rightIcon?: ReactNode;
  className?: string;
};

export const InterviewStatus = ({
  status,
  isLoading,
  rightIcon,
  className,
}: InterviewStatusProps) => (
  <Badge
    variant={statusPropsMap[status].variant ?? 'outline-solid'}
    className={cn(
      'capitalize w-32 flex justify-end gap-0',
      isLoading && 'text-gray-300',
      className,
    )}
  >
    <div className='flex-1 flex gap-2 justify-center'>
      {isLoading && (
        <Loader2 className='w-4 h-4 animate-spin absolute m-auto' />
      )}
      {statusPropsMap[status].text}
    </div>
    {rightIcon}
  </Badge>
);
