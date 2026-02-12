'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { InterviewNotesStepListSkeleton } from '@/components/skeletons/interview-notes-steps-list';
import { getInterviewSteps } from '@/lib/data/interviews';
import { InterviewStepDTO } from '@/lib/validators/interview-step';

import { AddStepForm } from './step-form';
import { StepItem } from './step-item';

interface StepsPanelProps {
  interviewId: string;
}

export const StepsPanel = ({ interviewId }: StepsPanelProps) => {
  const [allSteps, setSteps] = useState<InterviewStepDTO[]>([]);
  const [isLoadingSteps, startStepsTransaction] = useTransition();

  const handleOnDelete = useCallback((stepId: string) => {
    setSteps((prev) => prev.filter((step) => step.id !== stepId));
  }, []);

  const onCreate = useCallback((step: InterviewStepDTO) => {
    setSteps((prev) => [step, ...prev]);
  }, []);

  useEffect(() => {
    startStepsTransaction(() => {
      const loadSteps = async () => {
        const steps = await getInterviewSteps(interviewId);
        setSteps(steps);
      };
      loadSteps();
    });
  }, [interviewId]);

  return (
    <div className='no-scrollbar h-[50vh] overflow-y-auto flex flex-col gap-4'>
      {!isLoadingSteps && (
        <AddStepForm interviewId={interviewId} onCreate={onCreate} />
      )}
      {isLoadingSteps && <InterviewNotesStepListSkeleton />}
      {allSteps?.map((step) => (
        <StepItem key={step.id} step={step} onDelete={handleOnDelete} />
      ))}
    </div>
  );
};
