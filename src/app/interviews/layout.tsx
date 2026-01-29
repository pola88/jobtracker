import Link from 'next/link';

import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';

export default function InterviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const action = (
    <Button asChild>
      <Link href='/interviews/new'>Add Application</Link>
    </Button>
  );

  return (
    <AppShell
      title='Interviews'
      description='Manage your applications and interviews'
      actions={action}
    >
      {children}
    </AppShell>
  );
}
