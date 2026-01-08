import { LayoutDashboard, ListChecks, PlusCircle } from 'lucide-react';

import Nav from './nav';
import { NavItem } from './types';

const jobsNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/interviews', label: 'Entrevistas', icon: ListChecks },
  { href: '/interviews/new', label: 'Nueva entrevista', icon: PlusCircle },
];

const JobsNav = () => {
  return <Nav title='Jobs' navItems={jobsNavItems} />;
};

export default JobsNav;
