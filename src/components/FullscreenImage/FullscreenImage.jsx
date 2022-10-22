import React from 'react';
import Lightbox from 'react-18-image-lightbox';

import 'react-18-image-lightbox/style.css'; 

export const FullscreenImage = props => {

  const { image } = props;

  return (
    <Lightbox 
      mainSrc={image}
      onCloseRequest={props.onClose} />
  )

}