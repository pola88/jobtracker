import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { AddNoteForm } from "@/components/interviews/add-note-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteNoteForm } from "@/components/interviews/remove-note-form";

type Note = {
  id: string;
  content: string;
  createdAt: Date;
};

type NotesPanelProps = {
  interviewId: string;
  notes: Note[];
};

export function NotesPanel({ interviewId, notes }: NotesPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Notas internas</CardTitle>
        </CardHeader>
        <CardContent>
          <AddNoteForm interviewId={interviewId} />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notes.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aún no registraste notas para esta entrevista.
          </p>
        )}
        {notes.map((note) => (
          <article
            key={note.id}
            className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {formatDistanceToNow(note.createdAt, { locale: es, addSuffix: true })}
              </p>
              <DeleteNoteForm noteId={note.id} interviewId={interviewId} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {note.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

