import React, { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useViewState } from '@peripleo/peripleo';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

export const KimaStore = props => {

  const { viewState, getMapBounds } = useViewState();

  const [ debounced ] = useDebounce(viewState, 250);

  const bounds = useMemo(() => getMapBounds(), [ debounced ]);

  return (
    <KimaSearchHandler api={props.api} bounds={bounds}>
      <KimaGraphProvider api={props.api} bounds={bounds}>
        {props.children}
      </KimaGraphProvider>
    </KimaSearchHandler>
  )

}