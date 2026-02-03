import { Clock, TrendingUp } from 'lucide-react';

import { MetricCard } from '@/components/dashboard/metric-card';
import { getMetric } from '@/lib/data/interviews';

interface MetricsProps {
  userId: string;
}

export const Metrics = async ({ userId }: MetricsProps) => {
  const stats = await getMetric(userId);

  return (
    <div className='flex gap-4 mb-10'>
      <MetricCard
        title='Total Applications'
        value={stats.total}
        icon={
          <div className='shrink-0 bg-indigo-50 rounded-lg p-3 '>
            <TrendingUp className='w-6 h-6 text-indigo-600' />
          </div>
        }
      />
      <MetricCard
        title='Active'
        value={stats.active}
        icon={
          <div className='shrink-0 bg-blue-50 rounded-lg p-3 '>
            <Clock className='w-6 h-6 text-blue-600' />
          </div>
        }
      />
      <MetricCard
        title='Stand by'
        value={stats.stand_by}
        icon={
          <div className='shrink-0 bg-yellow-50 rounded-lg p-3 '>
            <TrendingUp className='w-6 h-6 text-yellow-600' />
          </div>
        }
      />
      <MetricCard
        title='Rejected'
        value={stats.rejected}
        icon={
          <div className='shrink-0 bg-red-50 rounded-lg p-3 '>
            <TrendingUp className='w-6 h-6 text-red-600' />
          </div>
        }
      />
    </div>
  );
};
