'use client';

import { Loader2 } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';
import { useCallback, useState, useTransition } from 'react';

import { InterviewStatus as InterviewStatusEnum } from '@prisma/client';

import { updateInterviewStatus } from '@/actions/interviews';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type InterviewStatusProps = {
  status: string;
  isLoading?: boolean;
  rightIcon?: ReactNode;
  className?: string;
};

type StatusProp = {
  interviewId: string;
  status: InterviewStatusEnum;
  className?: string;
};

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

export const InterviewStatusBadge = ({
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

export const InterviewStatus = ({
  interviewId,
  status,
  className,
}: StatusProp) => {
  const [isLoading, startUpdateTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);

  const onUpdateStatus = useCallback(
    (newStatus: string) => {
      startUpdateTransition(async () => {
        await updateInterviewStatus(
          interviewId,
          newStatus as InterviewStatusEnum,
        );
        setCurrentStatus(newStatus as InterviewStatusEnum);
      });
    },
    [interviewId],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading}>
        <InterviewStatusBadge
          status={currentStatus}
          isLoading={isLoading}
          rightIcon={<ChevronDown className='w-4 h-4 justify-self-end' />}
          className={className}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={currentStatus}
            onValueChange={onUpdateStatus}
          >
            {Object.values(InterviewStatusEnum).map((status) => (
              <DropdownMenuRadioItem
                key={status}
                value={status}
                onClick={(evt) => evt.stopPropagation()}
              >
                {statusPropsMap[status].text}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
