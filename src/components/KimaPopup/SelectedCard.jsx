import React, { useMemo, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { FullscreenImage } from '../FullscreenImage/FullscreenImage';
import { getDescription } from './utils';
import { TYPE_ICONS } from '../../Icons';
import { POPUP_COLORS } from '../../Colors';

import './SelectedCard.css';

export const SelectedCard = props => {

  const { record } = props;

  const { id, presentationURI, title, type } = record;

  const description = useMemo(() => getDescription(record), [ record ]);

  const [ showLightbox, setShowLightbox ] = useState(false);

  console.log(record);

  // TOD getType, getDescription

  return (
    <div 
      className="kima-selected-card"
      onClick={props.onClick}>
        
      <header 
        style={{ backgroundImage: `url("${presentationURI}")` }}
        onClick={() => setShowLightbox(true)} />

      <main>
        <h1>
          {title}
        </h1>
        <p>{description}</p>
      </main>

      <footer>
        <section className="type" style={{ borderBottomColor: POPUP_COLORS[type.label ]}}>
          {TYPE_ICONS[type.label]}
          <span className="label">{type.label}</span>
        </section>

        <a href={id} target="_blank">
          <section className="details">
            <span>Details</span>
            <span>
              <HiChevronRight />
            </span>
          </section>
        </a>

        <section className="close" style={{ borderBottomColor: POPUP_COLORS[type.label ]}}>
          <button onClick={props.onClose}>Close</button>
        </section>
      </footer>

      {showLightbox && 
        <FullscreenImage image={presentationURI} onClose={() => setShowLightbox(false)} />
      }
    </div>
  )

}