import React from 'react';

import './ListPreviewCard.css';

export const ListPreviewCard = props => {

  const { record } = props;

  const { title, thumbnailURI } = record;

  return (
    <div 
      className="kima-listpreview-card"
      onClick={props.onClick}>

      {title}
      
      {thumbnailURI && <img src={thumbnailURI} />}
    
    </div>
  )

}