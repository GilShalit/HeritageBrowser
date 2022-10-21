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
    
    console.log('fetching');
    setRecords([]);

    graph.getConnected(node.id, true).then(data => {
      setRecords(data.records);
    });
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