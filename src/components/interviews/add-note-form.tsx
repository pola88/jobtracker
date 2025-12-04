"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import { addInterviewNoteAction } from "@/actions/interview-notes";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState = {
  success: false,
  message: undefined as string | undefined,
};

type AddNoteFormProps = {
  interviewId: string;
  onSuccess?: () => void;
};

export function AddNoteForm({ interviewId, onSuccess }: AddNoteFormProps) {
  const [state, formAction] = useFormState(addInterviewNoteAction, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="interviewId" value={interviewId} />
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Nueva nota
        </label>
        <Textarea
          name="content"
          placeholder="Seguimiento, próximos pasos, feedback recibido..."
          required
        />
      </div>
      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-emerald-600" : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
      <Button type="submit">Agregar nota</Button>
    </form>
  );
}

