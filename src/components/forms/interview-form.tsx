"use client";

import { useState } from "react";
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
    compensationType?: string;
    compensationValue?: string;
    compensationUpper?: string;
    compensationNotes?: string;
    currency?: string;
    experienceRating?: string;
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
  const [type, setType] = useState(defaultValues?.compensationType ?? "fixed");

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
      <div className="space-y-3 rounded-xl border border-dashed border-border/60 p-4">
        <label className="text-sm font-semibold text-muted-foreground">
          Compensación
        </label>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Tipo</span>
            <select
              name="compensationType"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="fixed">Fijo</option>
              <option value="hourly">Por hora</option>
              <option value="range">Rango</option>
              <option value="contract">Contrato</option>
            </select>
          </div>
          <Field
            label={type === "hourly" ? "Monto por hora" : "Monto"}
            name="compensationValue"
            type="number"
            step="0.01"
            defaultValue={defaultValues?.compensationValue ?? ""}
            required={type !== "range"}
          />
          <Field
            label="Moneda"
            name="currency"
            placeholder="USD"
            defaultValue={defaultValues?.currency ?? "USD"}
          />
        </div>
        {type === "range" && (
          <Field
            label="Monto máximo (rango)"
            name="compensationUpper"
            type="number"
            step="0.01"
            defaultValue={defaultValues?.compensationUpper ?? ""}
          />
        )}
        <Field
          label="Notas de compensación"
          name="compensationNotes"
          placeholder="Ej. base + bonus anual, stock, etc."
          defaultValue={defaultValues?.compensationNotes ?? ""}
        />
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
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Sensación general
        </label>
        <select
          name="experienceRating"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          defaultValue={defaultValues?.experienceRating ?? "neutral"}
        >
          <option value="very_negative">Muy negativa</option>
          <option value="negative">Negativa</option>
          <option value="neutral">Neutral</option>
          <option value="positive">Positiva</option>
          <option value="very_positive">Muy positiva</option>
        </select>
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

