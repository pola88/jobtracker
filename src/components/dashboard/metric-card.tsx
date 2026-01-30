import { ReactNode } from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type MetricCardProps = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
};

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className='glass-panel flex-1'>
      <CardHeader>
        <div className='flex gap-4 items-center'>
          <div>{icon}</div>
          <div>
            <CardTitle className='text-sm font-medium text-gray-500 truncate'>
              {title}
            </CardTitle>
            <CardDescription className='text-3xl font-semibold text-gray-900'>
              {value}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
