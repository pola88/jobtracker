import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { deleteInterviewAction } from "@/actions/interviews";
import { requireCurrentUser } from "@/lib/auth";
import { getInterviews } from "@/lib/data/interviews";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteInterviewButton } from "@/components/interviews/delete-button";
import { formatCompensation, formatExperience } from "@/lib/rich-text";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();
  const interviews = await getInterviews(user.id);

  const action = (
    <Button asChild>
      <Link href="/interviews/new">Registrar entrevista</Link>
    </Button>
  );

  return (
    <AppShell
      title="Entrevistas"
      description="Gestiona todas las oportunidades en un solo lugar"
      actions={action}
      className="space-y-6"
    >
      <div className="overflow-hidden rounded-xl border glass-panel">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Empresa</th>
              <th className="px-4 py-3 text-left font-medium">Puesto</th>
              <th className="px-4 py-3 text-left font-medium">Fecha</th>
              <th className="px-4 py-3 text-left font-medium">Estado</th>
              <th className="px-4 py-3 text-left font-medium">Compensación</th>
              <th className="px-4 py-3 text-left font-medium">Feeling</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-t">
                <td className="px-4 py-3 font-medium">{interview.company}</td>
                <td className="px-4 py-3">{interview.position}</td>
                <td className="px-4 py-3">
                  {format(new Date(interview.date), "dd MMM yyyy", { locale: es })}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="capitalize">
                    {interview.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{formatCompensation(interview)}</td>
                <td className="px-4 py-3 text-sm">{formatExperience(interview)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/interviews/${interview.id}/edit`}>Editar</Link>
                    </Button>
                    <form action={deleteInterviewAction}>
                      <input type="hidden" name="id" value={interview.id} />
                      <DeleteInterviewButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {interviews.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  No hay entrevistas registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

