import React, { useMemo, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { CgArrowsExpandRight, CgSpinner } from 'react-icons/cg';
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

  const [ imgLoading, setImgLoading ] = useState(true);

  console.log(record);

  // TOD getType, getDescription

  return (
    <div 
      className="kima-selected-card"
      onClick={props.onClick}>
        
      <header >
        <div className="kima-selected-img-loading">
          <CgSpinner />
        </div>

        <div className="kima-selected-img" style={{ backgroundImage: `url("${presentationURI}")` }} />

        <button 
          className="kima-selected-fullscreen"
          onClick={() => setShowLightbox(true) }>
          
          <CgArrowsExpandRight />
        
        </button>
      </header>

      <main>
        <h1>
          {title}
        </h1>
        <h2 className="type">
          {TYPE_ICONS[type.label]}
          <span className="label">{type.label}</span>
        </h2>
        {description && <p>{description}</p> }
      </main>

      <footer>
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