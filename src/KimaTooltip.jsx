import React from 'react';

const HoverTooltip = props => {

  const { node } = props;

  const description = node.descriptions?.length > 0 ? node.descriptions[0].value : null;

  const totalConnected = node.properties.total_records;
  const firstConnected = null; // = store.getConnectedNodes(node.id)[0];
  
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
      {totalConnected === 1 && firstConnected &&
        <div className="kima-tooltip-footer kima-first-connected">
          {firstConnected.properties.title} {firstConnected.type?.label && 
            <span>({firstConnected.type.label})</span> 
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

export default HoverTooltip;