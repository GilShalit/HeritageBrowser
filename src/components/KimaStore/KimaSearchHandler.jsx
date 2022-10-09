import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { searchState, SearchStatus } from '@peripleo/peripleo';

export const KimaSearchHandler = props => {

  const [search, setSearchState] = useRecoilState(searchState);

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      fetch(`${props.url}/Places`)
        .then(res => res.json())
        .then(result => {
          // Debug log
          console.log(result);

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
    setSearchState({ args: {}, status: SearchStatus.PENDING });
  }, []);

  return props.children;

}