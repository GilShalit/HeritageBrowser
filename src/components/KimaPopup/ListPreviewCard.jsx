import React from 'react';
import { TYPE_COLORS } from '../../Colors';

import './ListPreviewCard.css';

const isRTL = str => /^[\u04c7-\u0591\u05D0-\u05EA\u05F0-\u05F4\u0600-\u06FF\u0750-\u077f]/.test(str);

export const ListPreviewCard = props => {

  const { record } = props;

  const { title, thumbnailURI, type } = record;

  return (
    <div 
      className="kima-listpreview-card"
      onClick={props.onClick}>

      <h5 style={isRTL(title) ? { direction: 'rtl' } : null}>{title}</h5>
      
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