import { useEffect, useState } from 'react';
import { SearchStatus, useSearch } from '@peripleo/peripleo';
import { getPlaces, getRecords } from './KimaAPI';

const getDistinctPlaces = records => records.reduce((distinct, next) => {
  const places = next.places.map(p => p.id);
  places.forEach(place => distinct.add(place));
  return distinct;
}, new Set());

const filterByRecords = (features, records) => {  
  const ids = getDistinctPlaces(records);
  return features.filter(f => ids.has(f.id));
}

export const KimaSearchHandler = props => {

  const { search, setSearchState } = useSearch();

  const [ pending, setPending] = useState();

  const places = getPlaces(props.api);

  const records = getRecords(props.api);

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      props.onLoad();

      if (pending) {
        console.log('aborting previous request');
        pending.abort();
      }

      console.log('Running search');

      const controller = new AbortController();
      setPending(controller);

      const { signal } = controller;
      
      Promise.all([
        places(props.bounds, search.args.filters, signal), 
        records(props.bounds, search.args.filters, signal)  
      ]).then(([ placesResult, recordsResult ]) => {
        // Clear pending abort controller
        setPending(null);

        // Debug log
        console.log('Places', placesResult);
        console.log('Records', recordsResult);

        // Convert to Peripleo conventions
        const total = placesResult.features.reduce((total, f) => 
          total + (f.properties.total_records || 1), 0);

        const items = filterByRecords(placesResult.features, recordsResult.records).map(feature => ({
          ...feature,
          properties: {
            id: feature.id,
            count: feature.properties.total_records,
            ...feature.properties
          }
        }));

        setSearchState({ 
          args: { 
            ...search.args
          }, 
          status: SearchStatus.OK, 
          result: { 
            total, 
            items,
            aggregations: Object.entries(recordsResult.facetsInfo).reduce((obj, [key, buckets]) => {
              obj[key] = { buckets: buckets.map(b => ({ label: b.label, count: b.countFull })) };
              return obj; 
            }, {})
          }
        });

        props.onLoadDone();
        props.onSearchResult({ places: placesResult, records: recordsResult });
      })
    }
  }, [ search ]);

  useEffect(() => {
    if (props.bounds) {
      setSearchState({ args: search.args, status: SearchStatus.PENDING, result: search.result });
    }
  }, [ props.bounds ]);

  return props.children;

}