import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card as CardUI,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { styles } from './styles';
import { type CardProps } from './types';

export const Card = ({
  title,
  description,
  children,
  className,
  noBorder,
  onClick,
}: CardProps) => {
  const header =
    title || description ? (
      <CardHeader className={styles.header}>
        {title && <CardTitle className={styles.title}>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    ) : null;
  return (
    <CardUI
      className={cn(styles.card, noBorder && styles.noBorder, className)}
      onClick={onClick}
    >
      {header}
      {children}
    </CardUI>
  );
};
