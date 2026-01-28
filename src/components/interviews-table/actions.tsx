'use client';

import { Loader, Menu } from 'lucide-react';
import { MouseEvent, useCallback, useTransition } from 'react';

import { Interview, InterviewStatus } from '@prisma/client';
import Link from 'next/link';

import {
  deleteInterviewAction,
  updateInterviewStatus,
} from '@/actions/interviews';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type InterviewActionsProps = {
  interview: Interview;
};

export const InterviewActions = ({ interview }: InterviewActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();
  const onDelete = useCallback(
    (evt: MouseEvent) => {
      evt.preventDefault();
      startTransition(async () => {
        await deleteInterviewAction(interview.id);
      });
    },
    [interview.id, startTransition],
  );

  const onUpdateStatus = useCallback(
    (newStatus: string) => {
      startUpdateTransition(async () => {
        await updateInterviewStatus(interview.id, newStatus as InterviewStatus);
      });
    },
    [interview.id],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-muted-foreground px-1.5 py-1 text-xs font-medium data-[inset]:pl-8'>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={`/interviews/${interview.id}/edit`}
              className={cn('underline-offset-2')}
            >
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <div>{isPending && <Loader className='inline' />} Delete </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className='text-muted-foreground px-1.5 py-1 text-xs font-medium data-[inset]:pl-8'>
            Status
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={interview.status}
            onValueChange={onUpdateStatus}
          >
            {Object.values(InterviewStatus).map((status) => (
              <DropdownMenuRadioItem key={status} value={status}>
                {status}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
