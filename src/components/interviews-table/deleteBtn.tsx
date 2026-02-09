import { useCallback } from 'react';

import { Interview } from '@prisma/client';

import { deleteInterviewAction } from '@/actions/interviews';
import { useInterviewStore } from '@/stores/interview';

import { DeleteButtonWithConfirm } from '../button/delete-btn';

interface DeleteBtnProps {
  interview: Interview;
}

export const DeleteBtn = ({ interview }: DeleteBtnProps) => {
  const touch = useInterviewStore((state) => state.touch);

  const handleDelete = useCallback(async () => {
    await deleteInterviewAction(interview.id);
    touch();
  }, [interview.id, touch]);

  return <DeleteButtonWithConfirm onConfirm={handleDelete} />;
};
