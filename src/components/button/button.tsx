'use client';

import { Loader2 } from 'lucide-react';
import { forwardRef, useCallback } from 'react';

import { Button as ButtonComponent } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { styles } from './styles';
import { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { isLoading, onClick, className, disabled, ...rest } = props;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading) return;
        onClick?.(e);
      },
      [isLoading, onClick],
    );

    return (
      <ButtonComponent
        {...rest}
        ref={ref}
        disabled={isLoading || disabled}
        onClick={handleClick}
        className={cn(styles.button, className)}
      >
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.loadingIcon} />
          </div>
        )}
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';

export default Button;
