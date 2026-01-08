'use client';

import { LogOut } from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import InvoicesNav from './invoices-nav';
import JobsNav from './jobs-nav';

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            JobTrack
          </p>
          <p className='text-2xl font-semibold'>Panel</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <InvoicesNav />
          <JobsNav />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip='Cerrar sesión'>
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
