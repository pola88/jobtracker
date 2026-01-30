import { Trash2 } from 'lucide-react';
import { MouseEvent, useCallback, useTransition } from 'react';

import { Interview } from '@prisma/client';

import { deleteInterviewAction } from '@/actions/interviews';
import Button from '@/components/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useInterviewStore } from '@/stores/interview';

interface ConfirmDeleteProps {
  interview: Interview;
}

export const ConfirmDelete = ({ interview }: ConfirmDeleteProps) => {
  const [isPending, startTransition] = useTransition();
  const touch = useInterviewStore((state) => state.touch);

  const handleDelete = useCallback(
    (evt: MouseEvent) => {
      evt.stopPropagation();
      startTransition(async () => {
        await deleteInterviewAction(interview.id);
        touch();
      });
    },
    [interview.id, startTransition, touch],
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-4 ' variant='ghost' isLoading={isPending}>
          <Trash2 className='text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            interview from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} isLoading={isPending}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
