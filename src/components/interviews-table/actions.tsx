'use client';

import { cn } from '@/lib/utils';
import { InterviewDTO } from '@/lib/validators/interview';

import { DeleteBtn } from './deleteBtn';

type InterviewActionsProps = {
  interview: InterviewDTO;
  className?: string;
};

export const InterviewActions = ({
  interview,
  className,
}: InterviewActionsProps) => {
  return (
    <div className={cn(className)} onClick={(evt) => evt.stopPropagation()}>
      <DeleteBtn interviewId={interview.id} />
    </div>
  );
};
