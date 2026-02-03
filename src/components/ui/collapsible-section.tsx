'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type CollapsibleSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleSection({
  title,
  description,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className='rounded-2xl border bg-card/80 shadow-xs'>
      <button
        type='button'
        className='flex w-full items-center justify-between gap-4 px-6 py-4 text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>
          <h3 className='text-base font-semibold'>{title}</h3>
          {description && (
            <p className='text-sm text-muted-foreground'>{description}</p>
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>
      {isOpen && <div className='border-t px-6 py-4'>{children}</div>}
    </section>
  );
}
