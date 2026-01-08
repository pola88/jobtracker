import { Button as ButtonComponent } from '@/components/ui/button';

export interface ButtonProps extends React.ComponentProps<
  typeof ButtonComponent
> {
  children: React.ReactNode;
  isLoading?: boolean;
}
