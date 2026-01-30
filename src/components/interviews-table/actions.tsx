'use client';

import { Interview } from '@prisma/client';

import { cn } from '@/lib/utils';

import { ConfirmDelete } from './deleteBtn';

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
      <ConfirmDelete interview={interview} />
    </div>
  );
};
