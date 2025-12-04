import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React, { Suspense } from 'react';

import { getQueryClient } from '@/providers/ReactQueryClient/getQueryClient';

import { SuspenseWrapperProps } from './types';

const SuspenseWrapper = ({
  children,
  fallback,
  queryOpts,
}: SuspenseWrapperProps) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryOpts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </HydrationBoundary>
  );
};

export default React.memo(SuspenseWrapper);
