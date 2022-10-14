import React, { useEffect, useState } from 'react';
import { useGraph } from '@peripleo/peripleo';
import { KimaPopupCard } from './KimaPopupCard';

export const KimaPopup = props => {

  const graph = useGraph();

  const { node } = props.selected;

  const [ records, setRecords ] = useState([]);

  useEffect(() => {
    setRecords([]);

    graph.getConnected(node.id, true).then(data => {
      setRecords(data.records);
    });
  }, [ node ]);

  return (
    <div className="kima-popup-wrapper">
      {records.length === 1 &&
        <KimaPopupCard expanded record={records[0]} />
      }

      {records.length <= 3 &&
        records.map(record => (
          <KimaPopupCard record={record} /> ))
      }

      {records.length > 3 &&
        records.slice(0, 3).map(record => (
          <KimaPopupCard record={record} /> ))
      }
    </div>
  )

}