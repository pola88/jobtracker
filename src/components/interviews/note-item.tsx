import { Clock } from 'lucide-react';

import { InterviewNote } from '@prisma/client';

import { daysFromNow } from '@/lib/helpers/date';

type NoteItemProps = {
  note: InterviewNote;
  onEdit: () => void;
};

export function NoteItem({ note }: NoteItemProps) {
  return (
    <div
      key={note.id}
      className='rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs'
    >
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
