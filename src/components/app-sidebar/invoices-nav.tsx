import { FileText, PlusCircle } from 'lucide-react';

import Nav from './nav';
import { NavItem } from './types';

const invoicesNavItems: NavItem[] = [
  { href: '/invoices', label: 'Facturas', icon: FileText },
  { href: '/invoices/new', label: 'Nueva factura', icon: PlusCircle },
];

const InvoicesNav = () => {
  return <Nav title='Invoices' navItems={invoicesNavItems} />;
};

export default InvoicesNav;
