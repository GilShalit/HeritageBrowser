
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { searchState, GraphContext, Graph, Node } from '@peripleo/peripleo';

export const KimaGraphProvider = props => {

  const search = useRecoilValue(searchState);

  const graphProvider = useMemo(() => ({

    getNodeById: id => {
      return search.result?.items.find(i => i.id === id)
    },
  
    getConnected: uri => {
      const id = uri.substring(uri.lastIndexOf('=') + 1);
      return fetch('https://kimanli.azurewebsites.net/api/Records/' + id)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          return [];
        })
    }

  }), [ search ]);

  return (
    <GraphContext.Provider value={graphProvider}>
      {props.children}
    </GraphContext.Provider>
  )
  
}