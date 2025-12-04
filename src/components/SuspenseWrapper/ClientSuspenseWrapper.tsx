'use client';

import { useQueryClient } from '@tanstack/react-query';
import React, { Suspense, useEffect, useState } from 'react';

import { SuspenseWrapperProps } from './types';

const SuspenseWrapper = ({
  children,
  fallback,
  queryOpts,
}: SuspenseWrapperProps) => {
  const queryClient = useQueryClient();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      queryClient.prefetchQuery(queryOpts);
      setFirstRender(false);
    }
  }, [queryClient, queryOpts, firstRender]);

  return (
    <Suspense fallback={fallback}>
      {!firstRender ? children : fallback}
    </Suspense>
  );
};

export default React.memo(SuspenseWrapper);
