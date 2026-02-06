'use client';

import { ChevronDown } from 'lucide-react';
import { useCallback, useState, useTransition } from 'react';

import { InterviewStatus } from '@prisma/client';

import { updateInterviewStatus } from '@/actions/interviews';
import { InterviewStatus as InterviewStatusBadge } from '@/components/interview-status';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type StatusProp = {
  interviewId: string;
  status: InterviewStatus;
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

export const Status = ({ interviewId, status }: StatusProp) => {
  const [isLoading, startUpdateTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);

  const onUpdateStatus = useCallback(
    (newStatus: string) => {
      startUpdateTransition(async () => {
        await updateInterviewStatus(interviewId, newStatus as InterviewStatus);
        setCurrentStatus(newStatus as InterviewStatus);
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
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={currentStatus}
            onValueChange={onUpdateStatus}
          >
            {Object.values(InterviewStatus).map((status) => (
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
