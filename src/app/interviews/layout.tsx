import { AddApplicationBtn } from '@/components/interviews/add-aplication-button';
import { NewInterviewModal } from '@/components/interviews/new-interview-modal';
import { AppShell } from '@/components/layout/app-shell';

export default function InterviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      title='Interviews'
      description='Manage your applications and interviews'
      actions={<AddApplicationBtn />}
    >
      <>
        {children}
        <NewInterviewModal />
      </>
    </AppShell>
  );
}
