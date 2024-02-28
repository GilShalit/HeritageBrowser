import { useEffect, useState } from 'react';
import { SearchStatus, useSearch } from '../../peripleo';
import { getInitialPlaces, getInitialRecords, getPlaces, getRecords } from './KimaAPI';

export const KimaSearchHandler = props => {

  const { search, setSearchState } = useSearch();

  const [ pending, setPending] = useState();

  const places = getPlaces(props.api);

  const records = getRecords(props.api);

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      props.onLoad();
      
      if (pending)
        pending.abort();

      const controller = new AbortController();
      setPending(controller);

      const { signal } = controller;

      // Bit of a hack for now...
      const isInitialRequest = !search.result && Object.keys(search.args || {}).length === 0;

      const a = isInitialRequest ? getInitialPlaces(props.api)() : places(props.bounds, search.args.filters, signal);
      const b = isInitialRequest ? getInitialRecords(props.api)() : records(props.bounds, search.args.filters, signal);
      
      Promise.all([a, b]).then(([ placesResult, recordsResult ]) => {
        // Clear pending abort controller
        setPending(null);

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
              obj[key] = { buckets: buckets.map(b => ({ label: b.label, count: b.countFaceted })) };
              return obj; 
            }, {})
          }
        });

        props.onLoadDone();

        props.onSearchResult({ places: placesResult, records: recordsResult });
      }).catch(error => {
        console.log(error);

        if (error.status === 500)
          setSearchState({ 
            ...search,
            status: SearchStatus.FAILED
          });
      });
    }
  }, [search]);

  useEffect(() => {
    if (props.bounds) {
      setSearchState({ args: search.args, status: SearchStatus.PENDING, result: search.result });
    }
  }, [props.bounds]);

  return props.children;

}