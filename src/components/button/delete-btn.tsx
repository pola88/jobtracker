'use client';

import { Trash2 } from 'lucide-react';
import { MouseEvent, useCallback, useTransition } from 'react';

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

interface DeleteButtonProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  className?: string;
}

export const DeleteButtonWithConfirm = ({
  onConfirm,
  className,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete it from our servers.',
}: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = useCallback(
    (evt: MouseEvent) => {
      evt.stopPropagation();
      startTransition(async () => {
        await onConfirm();
      });
    },
    [onConfirm],
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          isLoading={isPending}
          className={className}
        >
          <Trash2 className='text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
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
