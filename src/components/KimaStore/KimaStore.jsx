import React, { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useViewState } from '@peripleo/peripleo';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

export const KimaStore = props => {

  const { viewState, getMapBounds } = useViewState();

  const [ debounced ] = useDebounce(viewState, 250);

  const bounds = useMemo(() => getMapBounds(), [ debounced ]);

  const [ results, setResults ] = useState();

  return (
    <KimaSearchHandler 
      api={props.api} 
      bounds={bounds}
      onLoad={props.onLoad}
      onLoadDone={props.onLoadDone}
      onSearchResult={results => setResults(results)}>

      <KimaGraphProvider 
        api={props.api} 
        bounds={bounds}
        results={results}>

        {props.children}

      </KimaGraphProvider>

    </KimaSearchHandler>
  )

}