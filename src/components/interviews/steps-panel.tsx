import { StepForm } from "@/components/interviews/step-form";
import { StepItem } from "@/components/interviews/stepItem";
import { createInterviewStepAction } from "@/actions/interview-steps";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

type Step = {
  id: string;
  title: string;
  type: string;
  scheduledAt: Date | null;
  completedAt: Date | null;
  outcome?: string | null;
  notes?: string | null;
};

type StepsPanelProps = {
  interviewId: string;
  steps: Step[];
};

export function StepsPanel({ interviewId, steps }: StepsPanelProps) {
  return (
    <CollapsibleSection
      title="Pasos e instancias"
      description="Documenta cada challenge, técnica o entrevista con clientes."
      defaultOpen={false}
    >
      <div className="space-y-6">
        <div className="space-y-3 rounded-xl border border-dashed border-border/70 bg-muted/10 p-4">
          <h4 className="text-sm font-semibold">Nuevo paso</h4>
          <p className="text-xs text-muted-foreground">
            Registra próximos pasos o actualiza instancias ya realizadas.
          </p>
          <StepForm
            action={createInterviewStepAction}
            interviewId={interviewId}
            submitLabel="Agregar paso"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Timeline</h4>
          {steps.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Todavía no registraste instancias para esta entrevista.
            </p>
          )}
          <div className="space-y-3">
            {steps.map((step) => (
              <StepItem key={step.id} step={step} interviewId={interviewId} />
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

