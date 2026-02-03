import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { DeleteNoteForm } from '@/components/interviews/remove-note-form';
import { type TimelineItemDTO } from '@/lib/interviews/timeline-dto';

type NoteItemProps = {
  note: {
    id: string;
    content: string;
    createdAt: Date;
  };
  interviewId: string;
  onEdit: (timeline: TimelineItemDTO) => void;
};

export function NoteItem({ note, interviewId }: NoteItemProps) {
  return (
    <article
      key={note.id}
      className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs'
    >
      <div className='text-xs font-semibold'>NOTE</div>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-xs uppercase tracking-wide text-muted-foreground'>
          {format(note.createdAt, 'dd MMM yyyy - HH:mm', { locale: es })}
        </p>
        <DeleteNoteForm noteId={note.id} interviewId={interviewId} />
      </div>
      <p className='mt-2 text-sm leading-relaxed text-foreground/90 whitespace-pre-line'>
        {note.content}
      </p>
    </article>
  );
}

export default NoteItem;
