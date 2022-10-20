import { useEffect } from 'react';
import { SearchStatus, useSearch } from '@peripleo/peripleo';
import { getPlaces, getRecords } from './KimaAPI';

export const KimaSearchHandler = props => {

  const { search, setSearchState } = useSearch();

  const places = getPlaces(props.api);

  const records = getRecords(props.api);

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      console.log('Running search');
      
      Promise.all([
        places(props.bounds), 
        records(props.bounds)  
      ]).then(([ placesResult, recordsResult ]) => {
        // Debug log
        console.log('Places', placesResult);
        console.log('Records', recordsResult);

        // Convert to Peripleo conventions
        const total = placesResult.features.reduce((total, f) => 
          total + (f.properties.total_records || 1), 0);

        const items = placesResult.features.map(feature => ({
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

        props.onSearchResult({ places: placesResult, records: recordsResult });
      }).catch(error => {

        setSearchState({
          args: { ...search.args }, 
          status: SearchStatus.FAILED
        });

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