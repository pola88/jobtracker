'use client';

import { ReactNode } from 'react';

import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type AppShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  title,
  description,
  actions,
  children,
  className,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='border-b bg-background px-6 py-6'>
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-2'>
              <div>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  {title}
                </h1>
                {description && (
                  <p className='text-sm text-muted-foreground'>{description}</p>
                )}
              </div>
            </div>
            {actions}
          </div>
        </header>
        <main className={cn('flex-1 px-6 py-8', className)}>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
