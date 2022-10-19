import React, { useEffect, useState } from 'react';
import { useGraph } from '@peripleo/peripleo';
import { KimaPopupCard } from './KimaPopupCard';

export const KimaPopup = props => {

  const graph = useGraph();

  const { node } = props.selected;

  const [ records, setRecords ] = useState([]);

  const [ expanded, setExpanded ] = useState();

  useEffect(() => {
    console.log('fetching');
    setRecords([]);

    graph.getConnected(node.id, true).then(data => {
      setRecords(data.records);
    });
  }, [ node ]);

  const toggleExpand = id => () => {
    if (expanded === id)
      setExpanded();
    else 
      setExpanded(id);
  }
   
  return (
    <div className="kima-popup-wrapper">
      {records.length === 1 &&
        <KimaPopupCard expanded record={records[0]} />
      }

      {records.length > 1 &&
        records.map(record => (
          <KimaPopupCard 
            expanded={expanded === record.id}
            record={record} 
            onClick={toggleExpand(record.id)}/> ))
      }
    </div>
  )

}