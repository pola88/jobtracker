'use client';

import { Pencil } from 'lucide-react';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { DeleteStepForm } from '@/components/interviews/delete-step-form';
import { Button } from '@/components/ui/button';
import { type TimelineItemDTO } from '@/lib/interviews/timeline-dto';

type StepItemProps = {
  step: {
    id: string;
    title: string;
    type: string;
    scheduledAt: Date | null;
    completedAt: Date | null;
    outcome?: string | null;
    notes?: string | null;
    createdAt: Date;
  };
  interviewId: string;
  onEdit: (timeline: TimelineItemDTO) => void;
};

export function StepItem({ step, interviewId, onEdit }: StepItemProps) {
  const formattedScheduled = step.scheduledAt
    ? format(step.scheduledAt, 'dd MMM yyyy - HH:mm', { locale: es })
    : 'Sin definir';
  const formattedCompleted = step.completedAt
    ? format(step.completedAt, 'dd MMM yyyy - HH:mm', { locale: es })
    : 'Pendiente';

  return (
    <article className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm space-y-3'>
      <div className='text-xs font-semibold'>STEP</div>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold'>{step.title}</p>
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            {step.type}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='h-8 px-2 text-muted-foreground'
            onClick={() =>
              onEdit({
                kind: 'step',
                id: step.id,
                title: step.title,
                type: step.type,
                scheduledAt: step.scheduledAt?.toISOString() ?? null,
                completedAt: step.completedAt?.toISOString() ?? null,
                notes: step.notes,
                createdAt: step.createdAt?.toISOString() ?? '',
                outcome: step.outcome,
              })
            }
          >
            <Pencil className='h-4 w-4' />
          </Button>
          <DeleteStepForm stepId={step.id} interviewId={interviewId} />
        </div>
      </div>
      <div className='row gap-2 text-sm text-muted-foreground'>
        <p>
          <span className='font-medium text-foreground'>Agendado:</span>{' '}
          {formattedScheduled}
        </p>
        <p>
          <span className='font-medium text-foreground'>Completado:</span>{' '}
          {formattedCompleted}
        </p>
      </div>
      {step.outcome && (
        <p className='text-sm'>
          <span className='font-medium'>Resultado:</span> {step.outcome}
        </p>
      )}
      {step.notes && (
        <p className='text-sm text-muted-foreground whitespace-pre-line'>
          {step.notes}
        </p>
      )}
    </article>
  );
}
