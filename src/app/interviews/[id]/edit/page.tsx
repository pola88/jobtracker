import { notFound } from 'next/navigation';

import { updateInterviewAction } from '@/actions/interviews';
import { Card } from '@/components/card';
import { InterviewForm } from '@/components/forms/interview-form';
import RightPanel from '@/components/interviews/right-panel';
import { AppShell } from '@/components/layout/app-shell';
import { requireCurrentUser } from '@/lib/auth';
import { getInterviewById } from '@/lib/data/interviews';
import { getInterviewTimelineDTO } from '@/lib/interviews/timeline-data';
import { CURRENCIES } from '@/lib/validators/interview';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type EditInterviewPageProps = {
  params: {
    id: string;
  };
};

export default async function EditInterviewPage({
  params,
}: EditInterviewPageProps) {
  const user = await requireCurrentUser();
  const interview = await getInterviewById(params.id, user.id);

  if (!interview) {
    notFound();
  }

  const updateInterview = updateInterviewAction.bind(null, interview.id);
  const timeline = await getInterviewTimelineDTO(interview.id);

  return (
    <AppShell
      title={`Editar entrevista (${interview.company})`}
      description='Actualiza el estado y notas para mantener tu pipeline al día'
    >
      <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
        <Card>
          <InterviewForm
            action={updateInterview}
            submitLabel='Actualizar entrevista'
            defaultValues={{
              company: interview.company,
              position: interview.position,
              recruiter: interview.recruiter ?? '',
              date: new Date(interview.date),
              benefits: interview.benefits ?? '',
              status: interview.status,
              compensationType: interview.compensationType,
              compensationLower: interview.compensationLower?.toNumber() ?? 0,
              compensationUpper: interview.compensationUpper?.toNumber() ?? 0,
              compensationNotes: interview.compensationNotes ?? '',
              currency: interview.currency as (typeof CURRENCIES)[number],
              experienceRating: interview.experienceRating,
            }}
          />
        </Card>
        <div className='space-y-6'>
          <RightPanel interviewId={interview.id} initialTimeline={timeline} />
        </div>
      </div>
    </AppShell>
  );
}
