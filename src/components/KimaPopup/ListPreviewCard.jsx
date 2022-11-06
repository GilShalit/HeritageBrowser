import React from 'react';
import { TYPE_COLORS } from '../../Colors';

import './ListPreviewCard.css';

const isASCII = str => /^[\x00-\x7F]+$/.test(str);

export const ListPreviewCard = props => {

  const { record } = props;

  const { title, thumbnailURI, type } = record;

  return (
    <div 
      className="kima-listpreview-card"
      onClick={props.onClick}>

      <h5 style={isASCII(title) ? null : { direction: 'rtl' }}>{title}</h5>
      
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