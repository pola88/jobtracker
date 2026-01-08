import { createInterviewAction } from '@/actions/interviews';
import { Card } from '@/components/card';
import { InterviewForm } from '@/components/forms/interview-form';
import { AppShell } from '@/components/layout/app-shell';
import { requireCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewInterviewPage() {
  await requireCurrentUser();

  return (
    <AppShell
      title='Nueva entrevista'
      description='Documenta los detalles clave para tu próxima conversación'
    >
      <Card className='max-w-3xl mx-auto'>
        <InterviewForm
          action={createInterviewAction}
          submitLabel='Crear entrevista'
          showInitialNoteField
        />
      </Card>
    </AppShell>
  );
}
