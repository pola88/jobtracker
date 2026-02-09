import { Clock } from 'lucide-react';
import { useCallback, useState } from 'react';

import { InterviewNote } from '@prisma/client';

import {
  deleteInterviewNoteAction,
  updateInterviewNote,
} from '@/actions/interview-notes';
import { InterviewNoteForm } from '@/components/forms/interview-note';
import { daysFromNow } from '@/lib/helpers/date';

import { DeleteButtonWithConfirm } from '../button/delete-btn';
import { EditButton } from '../button/edit-btn';

type NoteItemProps = {
  note: InterviewNote;
  onEdit: () => void;
  onDelete: (noteId: string) => void;
};

export function NoteItem({ note, onDelete }: NoteItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setNote] = useState<InterviewNote>(note);
  const handleOnDelete = useCallback(async () => {
    await deleteInterviewNoteAction({
      noteId: note.id,
      interviewId: note.interviewId,
    });
    onDelete(note.id);
  }, [note.id, onDelete, note.interviewId]);

  const handelOnEditBtn = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleEdit = useCallback(
    async (formData: FormData) => {
      const result = await updateInterviewNote(note.id, formData);
      if (result.success && result.note) {
        setEditMode(false);
        setNote(result.note);
      }
      return result;
    },
    [note.id],
  );

  return (
    <div className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs relative group/interview-note'>
      {editMode && (
        <InterviewNoteForm
          action={handleEdit}
          defaultValues={{
            interviewId: currentNote.interviewId,
            content: currentNote.content,
          }}
          onCancel={() => setEditMode(false)}
        />
      )}
      {!editMode && (
        <>
          <div className='group-hover/interview-note:visible invisible absolute right-1 top-1'>
            <EditButton onClick={handelOnEditBtn} />
            <DeleteButtonWithConfirm onConfirm={handleOnDelete} />
          </div>

          <div className='flex gap-2 items-center'>
            <Clock className='h-3.5 w-3.5 text-gray-500' />
            <span className='text-xs text-gray-500'>
              {daysFromNow(currentNote.createdAt)}
            </span>
          </div>
          <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-2'>
            {currentNote.content}
          </p>
        </>
      )}
    </div>
  );
}
