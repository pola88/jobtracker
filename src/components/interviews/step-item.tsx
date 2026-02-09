'use client';

import { Calendar, Clock, FileText, Pencil } from 'lucide-react';
import { useCallback } from 'react';

import { InterviewStep } from '@prisma/client';

import { deleteInterviewStepAction } from '@/actions/interview-steps';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/helpers/date';

import { DeleteButtonWithConfirm } from '../button/delete-btn';
import { Badge, type BadgeProps } from '../ui/badge';

type StepItemProps = {
  step: InterviewStep;
  onEdit: () => void;
  onDelete: (stepId: string) => void;
};

type StatusMap = {
  variant: BadgeProps['variant'];
  text: string;
};

const statusPropsMap: Record<string, StatusMap> = {
  passed: { variant: 'success', text: 'Passed' },
  neutral: { variant: 'info', text: 'Neutral' },
  failed: { variant: 'danger', text: 'Failed' },
  canceled: { variant: 'default', text: 'Canceled' },
  scheduled: { variant: 'secondary', text: 'Scheduled' },
  waiting: { variant: 'warning', text: 'Waiting' },
};

export function StepItem({ step, onEdit, onDelete }: StepItemProps) {
  const handleOnDelete = useCallback(async () => {
    await deleteInterviewStepAction({
      stepId: step.id,
      interviewId: step.interviewId,
    });
    onDelete(step.id);
  }, [step, onDelete]);

  return (
    <article className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs space-y-3 group/interview-note relative'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h4 className='text-base font-semibold text-gray-900 mb-1'>
            {step.title}
          </h4>
          <Badge
            variant={statusPropsMap[step.status!].variant ?? 'default'}
            className={'capitalize w-min flex'}
          >
            {statusPropsMap[step.status!].text || 'No Defined'}
          </Badge>

          {/* <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            {step.type}
          </p> */}
        </div>
        <div className='flex gap-1 group-hover/interview-note:visible invisible absolute right-1 top-1'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={
              () => {
                onEdit();
              }
              // onEdit({
              //   kind: 'step',
              //   id: step.id,
              //   title: step.title,
              //   type: step.type,
              //   scheduledAt: step.scheduledAt?.toISOString() ?? null,
              //   completedAt: step.completedAt?.toISOString() ?? null,
              //   notes: step.notes,
              //   createdAt: step.createdAt?.toISOString() ?? '',
              //   outcome: step.outcome,
              // })
            }
          >
            <Pencil className='h-4 w-4' />
          </Button>
          <DeleteButtonWithConfirm onConfirm={handleOnDelete} />
        </div>
      </div>
      <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
        {step.scheduledAt && (
          <>
            <div className='flex gap-2 items-center'>
              <Calendar className='h-4 w-4 text-gray-400' />
              {formatDate(step.scheduledAt, 'EEE, LLL dd, yyyy')}
            </div>

            <div className='flex gap-2 items-center'>
              <Clock className='h-4 w-4 text-gray-400' />
              {formatDate(step.scheduledAt, 'HH:mm')}
            </div>
          </>
        )}
      </div>
      <hr />
      <div className='flex gap-2'>
        <div className='pt-0.5'>
          <FileText className='h-4 w-4 text-gray-400' />
        </div>
        <p className='text-sm text-muted-foreground whitespace-pre-line '>
          {step.notes || 'No notes'}
        </p>
      </div>
    </article>
  );
}
