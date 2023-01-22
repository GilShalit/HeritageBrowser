
import React, { useEffect, useMemo, useState } from 'react';
import { GraphContext, useSearch } from '@peripleo/peripleo';
import { toFilterBody } from './KimaAPI';
import { SESSION_ID } from '../../session';

const uriToId = uri =>
  uri.substring(uri.lastIndexOf('=') + 1);

// The cache is simply a map of place IDs -> records
const buildCache = data => {
  const { records } = data;

  const cache = {};

  records.forEach(record => {
    const { places } = record;

    places.forEach(place => {
      const placeId = uriToId(place.id);

      if (cache[placeId]) {
        cache[placeId].push(record);
      } else {
        cache[placeId] = [ record ];
      }
    });

  });

  return cache;
}

export const KimaGraphProvider = props => {

  const [ graph, setGraph ] = useState();

  const { search } = useSearch();

  const { results } = props;

  const places = results?.places.features;

  const records = results?.records;

  const cache = useMemo(() => records ? buildCache(records) : null, [ props.results ]);

  // Shorthand
  const getConnectedFromCache = id => cache ? cache[id] || [] : [];

  useEffect(() => {
    const getNodeById = id =>
      places?.find(i => i.id === id);
    
    const getConnected = (uri, fetchAll, fetchAllCallback) => {
      const id = uriToId(uri);

      // fetchAll is a Kima-specific quirk
      if (fetchAll) {
        const f = search.args.filters?.length > 0 ?
          fetch('https://kimanli.azurewebsites.net/api/Records/' + id, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Kima-Session-Key': SESSION_ID
            },
            method: 'POST',
            body: JSON.stringify(toFilterBody(search.args.filters))
          }) :

          fetch('https://kimanli.azurewebsites.net/api/Records/' + id, {
            headers: {
              'X-Kima-Session-Key': SESSION_ID
            }
          });

        f.then(res => res.json()).then(data => fetchAllCallback(data));
        
        return getConnectedFromCache(id);
      } else {
        return new Promise(resolve => resolve(getConnectedFromCache(id)));
      }
    };
  
    setGraph({ getNodeById, getConnected }); 
  }, [ props.results ]);

  return (
    <GraphContext.Provider value={graph}>
      {props.children}
    </GraphContext.Provider>
  )
  
}