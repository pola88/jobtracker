import { notFound } from "next/navigation";

import { updateInterviewAction } from "@/actions/interviews";
import { requireCurrentUser } from "@/lib/auth";
import { getInterviewById } from "@/lib/data/interviews";
import { AppShell } from "@/components/layout/app-shell";
import { InterviewForm } from "@/components/forms/interview-form";
import { NotesPanel } from "@/components/interviews/notes-panel";
import { StepsPanel } from "@/components/interviews/steps-panel";
import { CURRENCIES } from "@/lib/validators/interview";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type EditInterviewPageProps = {
  params: {
    id: string;
  };
};

export default async function EditInterviewPage({ params }: EditInterviewPageProps) {
  const user = await requireCurrentUser();
  const interview = await getInterviewById(params.id, user.id);

  if (!interview) {
    notFound();
  }

  const updateInterview = updateInterviewAction.bind(null, interview.id);

  return (
    <AppShell
      title={`Editar entrevista (${interview.company})`}
      description="Actualiza el estado y notas para mantener tu pipeline al día"
    >
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border bg-card/80 p-6">
          <InterviewForm
            action={updateInterview}
            submitLabel="Actualizar entrevista"
            defaultValues={{
              company: interview.company,
              position: interview.position,
              recruiter: interview.recruiter ?? "",
              date: new Date(interview.date),
              benefits: interview.benefits ?? "",
              status: interview.status,
              compensationType: interview.compensationType,
              compensationLower: interview.compensationLower?.toNumber() ?? 0,
              compensationUpper: interview.compensationUpper?.toNumber() ?? 0,
              compensationNotes: interview.compensationNotes ?? "",
              currency: interview.currency as (typeof CURRENCIES)[number],
              experienceRating: interview.experienceRating,
            }}
          />
        </div>
        <div className="space-y-6">
          <StepsPanel interviewId={interview.id} steps={interview.steps ?? []} />
          <NotesPanel interviewId={interview.id} notes={interview.notes ?? []} />
        </div>
      </div>
    </AppShell>
  );
}

