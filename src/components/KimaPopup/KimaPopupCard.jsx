import React from 'react';
import { getDescription } from './utils';

import './KimaPopupCard.css';

export const KimaPopupCard = props => {

  const { expanded, record } = props;

  console.log(record);

  return (
    <div className={expanded ? "kima-popup-card expanded" : "kima-popup-card"}>
      <header></header>
      <div className="kima-popup-card-body">
        {record. title}
      </div>
    </div>
  )

}