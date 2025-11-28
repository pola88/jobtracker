import { createInterviewAction } from "@/actions/interviews";
import { requireCurrentUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { InterviewForm } from "@/components/forms/interview-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewInterviewPage() {
  await requireCurrentUser();

  return (
    <AppShell
      title="Nueva entrevista"
      description="Documenta los detalles clave para tu próxima conversación"
    >
      <div className="max-w-3xl rounded-2xl border bg-card/80 p-6">
        <InterviewForm
          action={createInterviewAction}
          submitLabel="Crear entrevista"
          showInitialNoteField
        />
      </div>
    </AppShell>
  );
}

