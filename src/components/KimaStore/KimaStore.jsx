import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

const queryClient = new QueryClient();

export const KimaStore = props => {

  return (
    <QueryClientProvider client={queryClient}>
      <KimaSearchHandler api={props.api}>
        <KimaGraphProvider api={props.api}>
          {props.children}
        </KimaGraphProvider>
      </KimaSearchHandler>
    </QueryClientProvider>
  )

}