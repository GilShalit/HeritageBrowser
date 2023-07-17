import React, { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useMap, useViewState } from '@peripleo/peripleo';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

export const isValidViewState = (viewState) => {
  const { longitude, latitude, zoom } = viewState;
  return !!(longitude && latitude && zoom);
}

export const KimaStore = props => {

  const { viewState, getMapBounds } = useViewState();

  const [ debounced ] = useDebounce(viewState, 250);

  // The viewstate is always defined, but only valid after 
  // the map is loaded. Make sure we handle slow connections,
  // where the app loads faster than the map!
  const map = useMap();

  const bounds = useMemo(() => { 
    if (isValidViewState(debounced))
      return getMapBounds();
  }, [ map, debounced ]);

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