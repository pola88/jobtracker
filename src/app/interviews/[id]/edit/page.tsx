import { notFound } from "next/navigation";
import { format } from "date-fns";

import { updateInterviewAction } from "@/actions/interviews";
import { requireCurrentUser } from "@/lib/auth";
import { getInterviewById } from "@/lib/data/interviews";
import { AppShell } from "@/components/layout/app-shell";
import { InterviewForm } from "@/components/forms/interview-form";

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

  return (
    <AppShell
      title={`Editar entrevista (${interview.company})`}
      description="Actualiza el estado y notas para mantener tu pipeline al día"
    >
      <div className="max-w-3xl rounded-2xl border bg-card/80 p-6">
        <InterviewForm
          action={updateInterviewAction}
          submitLabel="Actualizar entrevista"
          defaultValues={{
            id: interview.id,
            company: interview.company,
            position: interview.position,
            recruiter: interview.recruiter ?? "",
            date: format(new Date(interview.date), "yyyy-MM-dd"),
            salary: interview.salary?.toString() ?? "",
            benefits: interview.benefits ?? "",
            notes: interview.notes ?? "",
            status: interview.status,
            tags: interview.tags,
          }}
        />
      </div>
    </AppShell>
  );
}

