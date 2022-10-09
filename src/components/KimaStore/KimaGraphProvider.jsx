
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query'
import { searchState, GraphContext } from '@peripleo/peripleo';

const uriToId = uri =>
  uri.substring(uri.lastIndexOf('=') + 1);

// The cache is simply a map of place IDs -> records
const buildCache = records => {
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
    .then(res => res.json()) 
    .then(data => {
      console.log('Records', data);
      return buildCache(data.records);
    });
}

export const KimaGraphProvider = props => {

  const { data } = useQuery(['records'], fetchRecords(props.api));

  const search = useRecoilValue(searchState);

  const graphProvider = {

    getNodeById: id => {
      return search.result?.items.find(i => i.id === id)
    },
  
    getConnected: (uri, fetchAll) => {
      const id = uriToId(uri);

      if (fetchAll) {
        return fetch('https://kimanli.azurewebsites.net/api/Records/' + id)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            return [];
          })
      } else {
        return new Promise(resolve => resolve(data ? data[id] : []));
      }
    }

  };

  return (
    <GraphContext.Provider value={graphProvider}>
      {props.children}
    </GraphContext.Provider>
  )
  
}