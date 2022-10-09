import React, { useEffect, useState } from 'react';
import { useGraph } from '@peripleo/peripleo';

export const KimaTooltip = props => {
  
  const graph = useGraph();

  const [ connected, setConnected ] = useState([]);

  const { node } = props;

  useEffect(() => {
    graph.getConnected(node.id).then(setConnected);
  }, []);

  const description = node.descriptions?.length > 0 ? node.descriptions[0].value : null;

  const totalConnected = node.properties.total_records;
  
  return (
    <div dir="rtl" className="kima-tooltip">
      <main>
        <h1>
          {node.properties.title}
        </h1>
        <p className="kima-description">
          {description}
        </p>
      </main>
      {totalConnected === 1 && connected.length > 0 &&
        <div className="kima-tooltip-footer kima-first-connected">
          {connected[0].title} {connected[0].type?.label && 
            <span>({connected[0].type.label})</span> 
          }
        </div>
      }
      {totalConnected > 1 && 
        <div className="kima-tooltip-footer kima-connected-count" dir="ltr">
          {totalConnected.toLocaleString()} Objects
        </div>
      }
    </div>
  )

}