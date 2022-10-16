import React from 'react';
import { getDescription } from './utils';

import './KimaPopupCard.css';

export const KimaPopupCard = props => {

  const { expanded, record } = props;

  const { title, thumbnailURI, presentationURI } = record;

  // TOD getType, getDescription

  console.log(record);

  return (
    <div className={expanded ? "kima-popup-card expanded" : "kima-popup-card"}>
      <header></header>
      <div className="kima-popup-card-body">
        {record. title}
        {thumbnailURI && <img src={thumbnailURI} />}
      </div>
    </div>
  )

}