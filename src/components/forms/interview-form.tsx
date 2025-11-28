"use client";

import { useFormState, useFormStatus } from "react-dom";
import { INTERVIEW_STATUSES } from "@/lib/data/interviews";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ActionResponse } from "@/actions/interviews";

type InterviewFormProps = {
  action: (
    state: ActionResponse,
    formData: FormData
  ) => Promise<ActionResponse>;
  defaultValues?: {
    id?: string;
    company?: string;
    position?: string;
    recruiter?: string | null;
    date?: string;
    salary?: string;
    benefits?: string | null;
    status?: string;
    tags?: string[];
    initialNote?: string | null;
  };
  submitLabel?: string;
  showInitialNoteField?: boolean;
};

const initialState: ActionResponse = {
  success: false,
};

export function InterviewForm({
  action,
  defaultValues,
  submitLabel = "Guardar",
  showInitialNoteField = false,
}: InterviewFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          label="Empresa"
          name="company"
          placeholder="Acme Inc."
          defaultValue={defaultValues?.company ?? ""}
          required
        />
        <Field
          label="Puesto"
          name="position"
          placeholder="Senior Frontend"
          defaultValue={defaultValues?.position ?? ""}
          required
        />
        <Field
          label="Recruiter"
          name="recruiter"
          placeholder="Jane Doe"
          defaultValue={defaultValues?.recruiter ?? ""}
        />
        <Field
          label="Fecha"
          type="date"
          name="date"
          defaultValue={defaultValues?.date ?? ""}
          required
        />
        <Field
          label="Salario esperado"
          name="salary"
          type="number"
          step="0.01"
          placeholder="85000"
          defaultValue={defaultValues?.salary ?? ""}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Estado
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            name="status"
            defaultValue={defaultValues?.status ?? INTERVIEW_STATUSES[0]}
          >
            {INTERVIEW_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextareaField
          label="Beneficios"
          name="benefits"
          placeholder="Seguro médico, stock, etc."
          defaultValue={defaultValues?.benefits ?? ""}
        />
        {showInitialNoteField && (
          <TextareaField
            label="Nota inicial"
            name="initialNote"
            placeholder="Seguimiento semanal, feedback pendiente..."
            defaultValue={defaultValues?.initialNote ?? ""}
          />
        )}
      </div>
      <Field
        label="Tags (separados por coma)"
        name="tags"
        placeholder="frontend, remoto, fintech"
        defaultValue={defaultValues?.tags?.join(", ") ?? ""}
      />
      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-emerald-600" : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
      <SubmitButton label={submitLabel} />
    </form>
  );
}

type FieldProps = React.ComponentProps<typeof Input> & {
  label: string;
};

function Field({ label, ...props }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Input {...props} />
    </div>
  );
}

type TextareaFieldProps = React.ComponentProps<typeof Textarea> & {
  label: string;
};

function TextareaField({ label, ...props }: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Textarea {...props} />
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? "Guardando..." : label}
    </Button>
  );
}

