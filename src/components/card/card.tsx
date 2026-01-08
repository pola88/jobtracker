import { Card as CardUI } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { styles } from './styles';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <CardUI className={cn(styles.card, className)}>{children}</CardUI>;
};
