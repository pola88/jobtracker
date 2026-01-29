import { LucideIcon } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavProps = {
  title: string;
  navItems: NavItem[];
  collapsible?: boolean;
};
