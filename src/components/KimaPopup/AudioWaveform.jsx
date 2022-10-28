import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { IoPlayCircle, IoPauseCircle } from 'react-icons/io5';

export const AudioWaveform = props => {

  const el = useRef();

  const [ wavesurfer, setWavesurfer ] = useState();

  const [ playing, setPlaying ] = useState(false);

  useEffect(() => {
    if (el.current) {
      const wavesurfer = WaveSurfer.create({
        container: el.current.querySelector('.kima-audio-waveform'),
        height: 180
      });
    
      wavesurfer.load(props.src);

      setWavesurfer(wavesurfer);
    }
  }, []);

  useEffect(() => {
    if (wavesurfer) {
      if (playing)
        wavesurfer.play();
      else
        wavesurfer.pause();
    }
  }, [ playing ]);

  const togglePlayback = () =>
    setPlaying(!playing);
  
  return (
    <div className="kima-selected-preview kima-selected-audio" ref={el}>
      <div className="kima-audio-waveform" />

      <div className="kima-audio-controls">
        <button onClick={togglePlayback}>
          {playing ?
            <IoPauseCircle /> : <IoPlayCircle />
          }
        </button>
      </div>
    </div>
  )
  
}