import React from 'react';
import { TYPE_COLORS } from '../../Colors';

import './ListPreviewCard.css';

export const ListPreviewCard = props => {

  const { record } = props;

  const { title, thumbnailURI, type } = record;

  return (
    <div 
      className="kima-listpreview-card"
      onClick={props.onClick}>

      {title}
      
      {thumbnailURI && 
        <div 
          className="kima-listpreview-image-wrapper"
          style={{
            backgroundImage: `url(${thumbnailURI})`,
            borderColor: TYPE_COLORS[type.label] 
          }} />
      }
    
    </div>
  )

}