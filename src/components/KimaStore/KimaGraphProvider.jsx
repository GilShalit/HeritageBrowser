
import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query'
import { searchState, GraphContext, SearchStatus } from '@peripleo/peripleo';

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

const fetchRecords = api => () => {
  console.log('Fetching initial Records dataset');
  return fetch(`${api}/Records`)
    .then(res => res.json());
}

export const KimaGraphProvider = props => {

  const { data } = useQuery(['records'], fetchRecords(props.api));

  const cache = useMemo(() => data ? buildCache(data) : null, [ data ])

  const [ search, setSearch ] = useRecoilState(searchState);

  const graphProvider = {

    getNodeById: id => {
      return search.result?.items.find(i => i.id === id)
    },
  
    getConnected: (uri, fetchAll) => {
      const id = uriToId(uri);

      if (fetchAll) {
        return fetch('https://kimanli.azurewebsites.net/api/Records/' + id)
          .then(res => res.json());
      } else {
        return new Promise(resolve => resolve(data ? cache[id] : []));
      }
    }

  };

  useEffect(() => {
    if (data && search.status === SearchStatus.OK) {
      setSearch({
        args: search.args,
        status: SearchStatus.OK,
        result: {
          ...search.result,
          aggregations: {
            ...data.facetsInfo
          }
        }
      });
    }
  }, [ data ]);

  return (
    <GraphContext.Provider value={graphProvider}>
      {props.children}
    </GraphContext.Provider>
  )
  
}