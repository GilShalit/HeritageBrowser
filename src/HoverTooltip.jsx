import React from 'react';
import { useStore } from '@peripleo/peripleo';

const OFFSET = [15, 15];

const HoverTooltip = props => {

  const store = useStore();

  const { node } = props;

  const connected = store.getConnectedNodes(node.id);
  console.log(connected);

  const style = {
    left: props.x + OFFSET[0], 
    top: props.y + OFFSET[1]
  }


  return (
    <div className="kima-hover-tooltip" style={style}>
      {node.properties.title}
    </div>
  )

}

export default HoverTooltip;