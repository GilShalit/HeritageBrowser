
import React, { useEffect, useMemo, useState } from 'react';
import { GraphContext } from '@peripleo/peripleo';

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

  const { results } = props;

  const places = results?.places.features;

  const records = results?.records;

  const cache = useMemo(() => records ? buildCache(records) : null, [ props.results ]);

  useEffect(() => {
    const getNodeById = id =>
      places?.find(i => i.id === id);
    
    const getConnected = (uri, fetchAll, fetchAllCallback) => {
      const id = uriToId(uri);
  
      // fetchAll is a Kima-specific quirk
      if (fetchAll) {
        fetch('https://kimanli.azurewebsites.net/api/Records/' + id)
          .then(res => res.json())
          .then(data => fetchAllCallback(data));
        
        return cache ? cache[id] || [] : [];
      } else {
        return new Promise(resolve => resolve(cache ? cache[id] || [] : []));
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