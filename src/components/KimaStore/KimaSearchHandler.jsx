import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { searchState, SearchStatus } from '@peripleo/peripleo';
import { getPlaces } from './KimaAPI';

export const KimaSearchHandler = props => {

  const [search, setSearchState] = useRecoilState(searchState);

  const places = getPlaces(props.api);

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      console.log('Running Place search');
      
      places(props.bounds).then(result => {
        // Debug log
        console.log('Places', result);

        // Convert to Peripleo conventions
        const total = result.features.reduce((total, f) => 
          total + (f.properties.total_records || 1), 0);

        const items = result.features.map(feature => ({
          ...feature,
          properties: {
            id: feature.id,
            count: feature.properties.total_records,
            ...feature.properties
          }
        }));

        setSearchState({ 
          args: { ...search.args }, 
          status: SearchStatus.OK, 
          result: { total, items }
        });

      }).catch(error => {

        setSearchState({
          args: { ...search.args }, 
          status: SearchStatus.FAILED
        });

      })
    }
  }, [search]);

  useEffect(() => {
    if (props.bounds) {
      setSearchState({ args: {}, status: SearchStatus.PENDING });
    }
  }, [ props.bounds ]);

  return props.children;

}