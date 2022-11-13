import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { CgArrowsExpandRight, CgSpinner } from 'react-icons/cg';
import { useAutoPosition } from './useAutoPosition';
import { FullscreenImage } from '../FullscreenImage/FullscreenImage';
import { getDescription } from './utils';
import { TYPE_ICONS } from '../../Icons';
import { TYPE_COLORS } from '../../Colors';

import './SelectedCard.css';

const isRTL = str => /^[\u04c7-\u0591\u05D0-\u05EA\u05F0-\u05F4\u0600-\u06FF\u0750-\u077f]/.test(str);

export const SelectedCard = props => {

  const el = useRef();

  const { record } = props;

  const { id, presentationURI, thumbnailURI, title, type } = record;

  const description = useMemo(() => getDescription(record), [ record ]);

  const [ showLightbox, setShowLightbox ] = useState(false);

  const [ audioURL, setAudioURL ] = useState();

  const isAudio = type?.label === 'ORAL' || type?.label === 'MUSIC';

  const [ previewFailed, setPreviewFailed ] = useState(false);

  const { top, left } = useAutoPosition(el, 10, -10);

  useEffect(() => {
    if (isAudio && presentationURI) {
      fetch('https://kimanli.azurewebsites.net/api/cors-proxy', {
        method: 'POST',
        body: presentationURI
      }).then(res => res.text()).then(audioURL =>  {
        console.log('proxy response', audioURL);
        window.setTimeout(() => setAudioURL(audioURL), 2000);
      });
    }

    if (presentationURI || thumbnailURI) {
      const img = document.createElement('img');
      img.onerror = () => setPreviewFailed(true);
      img.src = presentationURI || thumbnailURI;
    }
  }, [ presentationURI ]);

  // console.log(record);

  return (
    <div 
      className="kima-selected-card-wrapper">
      <div 
        ref={el}
        className="kima-selected-card"
        style={{ top, left }}
        onClick={props.onClick}>
          
        <header>
          {(presentationURI || thumbnailURI) && !previewFailed ? (
            (isAudio && audioURL) ? (
              <audio controls crossOrigin="anonymous">
                <source src={audioURL} />
              </audio>
            ) : (
              <>
                <div className="kima-selected-preview-loading">
                  <CgSpinner />
                </div>

                <div className="kima-selected-preview" style={{ backgroundImage: `url("${presentationURI || thumbnailURI}")` }} />

                {presentationURI && (
                  <button 
                    className="kima-selected-fullscreen"
                    onClick={() => setShowLightbox(true) }>
                    <CgArrowsExpandRight />
                  </button>
                )}
              </>
            )
          ) : (
            <div className="kima-selected-preview">
              {TYPE_ICONS[type.label]}
            </div>
          )}
        </header>

        <main>
          <div style={isRTL(title) ? { direction: 'rtl' } : null}>
            <h1>
              {title}
            </h1>
            <h2 className="type">
              {TYPE_ICONS[type.label]}
              <span className="label">{type.label}</span>
            </h2>
          </div>
          {description && <p style={isRTL(description) ? { direction: 'rtl' } : null}>{description}</p> }
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

          <section className="close" style={{ borderBottomColor: TYPE_COLORS[type.label] }}>
            <button onClick={props.onClose}>Close</button>
          </section>
        </footer>

        {presentationURI && showLightbox && (
          <FullscreenImage image={presentationURI} onClose={() => setShowLightbox(false)} />
        )}
      </div>
    </div>
  )

}