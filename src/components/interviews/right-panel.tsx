'use client';

import { useCallback, useMemo, useState } from 'react';

import { format } from 'date-fns';

import { updateInterviewStepAction } from '@/actions/interview-steps';
import { CreateNoteOrStep } from '@/components/interviews/CreateNoteOrStep';
import { NoteItem } from '@/components/interviews/noteItem';
import { StepForm } from '@/components/interviews/step-form';
import { StepItem } from '@/components/interviews/stepItem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  type InterviewTimelineResponse,
  type TimelineItemDTO,
  mapTimelineResponse,
} from '@/lib/interviews/timeline-dto';

type RightPanelProps = {
  interviewId: string;
  initialTimeline: InterviewTimelineResponse;
};

export default function RightPanel({
  interviewId,
  initialTimeline,
}: RightPanelProps) {
  const [editItem, setEditItem] = useState<TimelineItemDTO | null>(null);
  const data = useMemo(
    () => mapTimelineResponse(initialTimeline),
    [initialTimeline],
  );

  const handleOnEdit = useCallback((timeline: TimelineItemDTO) => {
    setEditItem(timeline);
  }, []);

  const handleOnClose = useCallback((currenState: boolean) => {
    if (!currenState) {
      setEditItem(null);
    }
  }, []);

  const handleOnSuccess = () => {
    setEditItem(null);
  };

  return (
    <>
      <CreateNoteOrStep interviewId={interviewId} />
      <div className='space-y-3 max-h-dvh overflow-y-auto'>
        {data.timeline.map((item) =>
          item.kind === 'step' ? (
            <StepItem
              key={item.id}
              step={item}
              interviewId={interviewId}
              onEdit={handleOnEdit}
            />
          ) : (
            <NoteItem
              key={item.id}
              note={item}
              interviewId={interviewId}
              onEdit={handleOnEdit}
            />
          ),
        )}
      </div>

      <Dialog open={!!editItem} onOpenChange={handleOnClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar step</DialogTitle>
            <DialogDescription>
              {editItem?.kind === 'step' && (
                <StepForm
                  onSuccess={handleOnSuccess}
                  action={updateInterviewStepAction}
                  interviewId={interviewId}
                  submitLabel='Guardar cambios'
                  defaultValues={{
                    stepId: editItem.id,
                    title: editItem.title,
                    type: editItem.type,
                    scheduledAt: editItem.scheduledAt
                      ? format(editItem.scheduledAt, "yyyy-MM-dd'T'HH:mm")
                      : '',
                    completedAt: editItem.completedAt
                      ? format(editItem.completedAt, "yyyy-MM-dd'T'HH:mm")
                      : '',
                    outcome: editItem.outcome ?? '',
                    notes: editItem.notes ?? '',
                  }}
                />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
