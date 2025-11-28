"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil } from "lucide-react";

import { StepForm } from "@/components/interviews/step-form";
import { Button } from "@/components/ui/button";
import { DeleteStepForm } from "@/components/interviews/delete-step-form";
import { updateInterviewStepAction } from "@/actions/interview-steps";

type StepItemProps = {
  step: {
    id: string;
    title: string;
    type: string;
    scheduledAt: Date | null;
    completedAt: Date | null;
    outcome?: string | null;
    notes?: string | null;
  };
  interviewId: string;
};

export function StepItem({ step, interviewId }: StepItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const formattedScheduled = step.scheduledAt
    ? format(step.scheduledAt, "dd MMM yyyy - HH:mm", { locale: es })
    : "Sin definir";
  const formattedCompleted = step.completedAt
    ? format(step.completedAt, "dd MMM yyyy - HH:mm", { locale: es })
    : "Pendiente";

  return (
    <article className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{step.title}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {step.type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <DeleteStepForm stepId={step.id} interviewId={interviewId} />
        </div>
      </div>
      <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
        <p>
          <span className="font-medium text-foreground">Agendado:</span>{" "}
          {formattedScheduled}
        </p>
        <p>
          <span className="font-medium text-foreground">Completado:</span>{" "}
          {formattedCompleted}
        </p>
      </div>
      {step.outcome && (
        <p className="text-sm">
          <span className="font-medium">Resultado:</span> {step.outcome}
        </p>
      )}
      {step.notes && (
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {step.notes}
        </p>
      )}
      {isEditing && (
        <div className="border-t border-dashed pt-4">
          <StepForm
            action={updateInterviewStepAction}
            interviewId={interviewId}
            submitLabel="Guardar cambios"
            defaultValues={{
              stepId: step.id,
              title: step.title,
              type: step.type,
              scheduledAt: step.scheduledAt
                ? format(step.scheduledAt, "yyyy-MM-dd'T'HH:mm")
                : "",
              completedAt: step.completedAt
                ? format(step.completedAt, "yyyy-MM-dd'T'HH:mm")
                : "",
              outcome: step.outcome ?? "",
              notes: step.notes ?? "",
            }}
          />
        </div>
      )}
    </article>
  );
}

