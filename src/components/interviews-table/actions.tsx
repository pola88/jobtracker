'use client';

import { Trash2 } from 'lucide-react';
import { MouseEvent, useCallback, useTransition } from 'react';

import { Interview } from '@prisma/client';

import { deleteInterviewAction } from '@/actions/interviews';
import { cn } from '@/lib/utils';

import Button from '../button';

type InterviewActionsProps = {
  interview: Interview;
  className?: string;
};

export const InterviewActions = ({
  interview,
  className,
}: InterviewActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const onDelete = useCallback(
    (evt: MouseEvent) => {
      evt.stopPropagation();
      startTransition(async () => {
        await deleteInterviewAction(interview.id);
      });
    },
    [interview.id, startTransition],
  );

  return (
    <div className={cn(className, isPending && 'visible')}>
      <Button
        className='w-4 '
        variant='ghost'
        isLoading={isPending}
        onClick={onDelete}
      >
        <Trash2 className='text-destructive' />
      </Button>
    </div>
  );
};
