import { useCallback } from 'react';

import { deleteInterviewAction } from '@/actions/interviews';
import { useInterviewStore } from '@/stores/interview';

import { DeleteButtonWithConfirm } from '../button/delete-btn';

interface DeleteBtnProps {
  interviewId: string;
}

export const DeleteBtn = ({ interviewId }: DeleteBtnProps) => {
  const touch = useInterviewStore((state) => state.touch);

  const handleDelete = useCallback(async () => {
    await deleteInterviewAction(interviewId);
    touch();
  }, [interviewId, touch]);

  return <DeleteButtonWithConfirm onConfirm={handleDelete} />;
};
