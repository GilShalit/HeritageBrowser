import React from 'react';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

export const KimaStore = props => {

  return (
    <KimaSearchHandler url={props.url}>
      <KimaGraphProvider>
        {props.children}
      </KimaGraphProvider>
    </KimaSearchHandler>
  )

}

export default KimaStore;
