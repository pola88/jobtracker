import { Trash2 } from 'lucide-react';
import { MouseEvent, useCallback, useTransition } from 'react';

import { Interview } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

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

interface ConfirmDeleteProps {
  interview: Interview;
}

export const ConfirmDelete = ({ interview }: ConfirmDeleteProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = useCallback(
    (evt: MouseEvent) => {
      evt.stopPropagation();
      startTransition(async () => {
        await deleteInterviewAction(interview.id);
        const params = new URLSearchParams(searchParams.toString());
        params.set('_refresh', Date.now().toString());
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [interview.id, startTransition, searchParams, router],
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
