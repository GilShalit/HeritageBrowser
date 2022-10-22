import React, { useEffect, useState } from 'react';
import { useGraph } from '@peripleo/peripleo';
import { ListPreviewCard } from './ListPreviewCard';
import { SelectedCard } from './SelectedCard';

export const KimaPopup = props => {

  const graph = useGraph();

  const { node } = props.selected;

  const [ records, setRecords ] = useState([]);

  const [ expanded, setExpanded ] = useState();

  useEffect(() => {
    setExpanded(null);
    
    setRecords([]);

    const onLazyLoad = data => {
      const preLoadedRecords = new Set(preLoaded.map(r => r.id));
      const fetchedRecords = data.records.filter(r => !preLoadedRecords.has(r.id));
      if (fetchedRecords.length > 0)
        setRecords([ ...preLoaded, ...fetchedRecords.slice(0, 500) ]);
    }

    const preLoaded = graph.getConnected(node.id, true, onLazyLoad);
    setRecords(preLoaded);
  }, [ node ]);
   
  return (
    <div className="kima-popup-wrapper">
      <div className="kima-popup-expanded">
        {records.length === 1 &&
          <SelectedCard 
            record={records[0]} 
            onClose={props.onClose} />
        }

        {expanded &&
          <SelectedCard 
            record={expanded} 
            onClose={() => setExpanded(null)} />
        }
      </div>

      {records.length > 1 &&
        <div className="kima-popup-multilist">
          {records.map(record => (
            <ListPreviewCard 
              key={record.id}
              record={record} 
              onClick={() => setExpanded(record)}/> ))
          }
        </div>
      }
    </div>
  )

}