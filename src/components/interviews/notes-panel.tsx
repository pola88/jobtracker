import { useCallback, useEffect, useState, useTransition } from 'react';

import { getInterviewNotes } from '@/lib/data/interviews';
import { InterviewNoteDTO } from '@/lib/validators/interview-note';

import { InterviewNotesStepListSkeleton } from '../skeletons/interview-notes-steps-list';
import { AddNoteForm } from './add-note-form';
import { NoteItem } from './note-item';

type NotesPanelProps = {
  interviewId: string;
};

export function NotesPanel({ interviewId }: NotesPanelProps) {
  const [allNotes, setNotes] = useState<InterviewNoteDTO[]>([]);
  const [isLoadingNotes, startNotesTransaction] = useTransition();

  const onCreate = useCallback((note: InterviewNoteDTO) => {
    setNotes((prev) => [note, ...prev]);
  }, []);

  const handleOnDelete = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  }, []);

  useEffect(() => {
    startNotesTransaction(() => {
      const loadNotes = async () => {
        const notes = await getInterviewNotes(interviewId);
        setNotes(notes);
      };
      loadNotes();
    });
  }, [interviewId]);

  return (
    <div className='no-scrollbar h-[50vh] overflow-y-auto flex flex-col gap-4'>
      {!isLoadingNotes && (
        <AddNoteForm interviewId={interviewId} onCreate={onCreate} />
      )}
      {isLoadingNotes && <InterviewNotesStepListSkeleton />}

      {allNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={() => {}}
          onDelete={handleOnDelete}
        />
      ))}
    </div>
  );
}
