import { Clock } from 'lucide-react';
import { useCallback } from 'react';

import { InterviewNote } from '@prisma/client';

import { deleteInterviewNoteAction } from '@/actions/interview-notes';
import { daysFromNow } from '@/lib/helpers/date';

import { DeleteButtonWithConfirm } from '../button/delete-btn';

type NoteItemProps = {
  note: InterviewNote;
  onEdit: () => void;
  onDelete: (noteId: string) => void;
};

export function NoteItem({ note, onDelete }: NoteItemProps) {
  const handleOnDelete = useCallback(async () => {
    await deleteInterviewNoteAction({
      noteId: note.id,
      interviewId: note.interviewId,
    });
    onDelete(note.id);
  }, [note.id, onDelete, note.interviewId]);

  return (
    <div
      key={note.id}
      className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs relative group/interview-note'
    >
      <div className='group-hover/interview-note:visible invisible absolute right-1 top-1'>
        <DeleteButtonWithConfirm onConfirm={handleOnDelete} />
      </div>

      <div className='flex gap-2 items-center'>
        <Clock className='h-3.5 w-3.5 text-gray-500' />
        <span className='text-xs text-gray-500'>
          {daysFromNow(note.createdAt)}
        </span>
      </div>
      <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-2'>
        {note.content}
      </p>
    </div>
  );
}
