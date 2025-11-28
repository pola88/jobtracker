import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Clock3 } from "lucide-react";

type Step = {
  id: string;
  title: string;
  type: string;
  scheduledAt: Date | null;
  completedAt: Date | null;
  outcome: string | null;
  interview: {
    id: string;
    company: string;
    position: string;
  };
};

type StepsTimelineProps = {
  steps: Step[];
};

export function StepsTimeline({ steps }: StepsTimelineProps) {
  if (steps.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Aún no registraste pasos en tus entrevistas.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const referenceDate = step.completedAt ?? step.scheduledAt ?? null;
        const relativeTime = referenceDate
          ? formatDistanceToNow(referenceDate, { locale: es, addSuffix: true })
          : "Sin fecha";
        return (
          <div
            key={step.id}
            className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              <span>{relativeTime}</span>
            </div>
            <p className="mt-2 text-base font-semibold">{step.title}</p>
            <p className="text-sm text-muted-foreground">{step.type}</p>
            <p className="mt-3 text-sm">
              {step.interview.company} · {step.interview.position}
            </p>
            {step.outcome && (
              <p className="text-sm text-foreground/90">{step.outcome}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

