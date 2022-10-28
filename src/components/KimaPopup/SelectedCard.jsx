import React, { useMemo, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { CgArrowsExpandRight, CgSpinner } from 'react-icons/cg';
import { FullscreenImage } from '../FullscreenImage/FullscreenImage';
import { getDescription } from './utils';
import { TYPE_ICONS } from '../../Icons';
import { TYPE_COLORS } from '../../Colors';

import './SelectedCard.css';
import { AudioWaveform } from './AudioWaveform';

export const SelectedCard = props => {

  const { record } = props;

  const { id, presentationURI, thumbnailURI, title, type } = record;

  const description = useMemo(() => getDescription(record), [ record ]);

  const [ showLightbox, setShowLightbox ] = useState(false);

  console.log(record);

  return (
    <div 
      className="kima-selected-card"
      onClick={props.onClick}>
        
      <header >
        {presentationURI || thumbnailURI ? (
          (type.label == 'ORAL' || type.label == 'MUSIC') ? (
            <>
              <div className="kima-selected-preview-loading">
                <CgSpinner />
              </div>

              <AudioWaveform src="https://stream.nli.org.il/operational_storage/derivative_copies/2017/04/04/file_149/V1-FL47577792.mp3?wmsAuthSign=c2VydmVyX3RpbWU9MTAvMjgvMjAyMiA5OjM6NTkgQU0maGFzaF92YWx1ZT1ibU05Zk5kQmE0MDZteDVyazFqd3hRPT0mdmFsaWRtaW51dGVzPTIwJmlkPUZMNDc1Nzc3OTI7&nimblesessionid=56671"/>
            </>
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

        <section className="close" style={{ borderBottomColor: TYPE_COLORS[type.label] }}>
          <button onClick={props.onClose}>Close</button>
        </section>
      </footer>

      {presentationURI && showLightbox && (
        <FullscreenImage image={presentationURI} onClose={() => setShowLightbox(false)} />
      )}
    </div>
  )

}