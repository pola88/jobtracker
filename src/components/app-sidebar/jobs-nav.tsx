import { ListChecks } from 'lucide-react';

import Nav from './nav';
import { NavItem } from './types';

const jobsNavItems: NavItem[] = [
  { href: '/interviews', label: 'Entrevistas', icon: ListChecks },
];

const JobsNav = () => {
  return <Nav title='Jobs' navItems={jobsNavItems} />;
};

export default JobsNav;
