import { FetchQueryOptions } from '@tanstack/react-query';

export type SuspenseWrapperProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  queryOpts: FetchQueryOptions;
};
