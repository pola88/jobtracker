'use client';

import { Interview } from '@prisma/client';

import { cn } from '@/lib/utils';

import { DeleteBtn } from './deleteBtn';

type InterviewActionsProps = {
  interview: Interview;
  className?: string;
};

export const InterviewActions = ({
  interview,
  className,
}: InterviewActionsProps) => {
  return (
    <div className={cn(className)} onClick={(evt) => evt.stopPropagation()}>
      <DeleteBtn interview={interview} />
    </div>
  );
};
