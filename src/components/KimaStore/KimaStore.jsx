import React from 'react';
import { KimaSearchHandler } from './KimaSearchHandler';
import { KimaGraphProvider } from './KimaGraphProvider';

export const KimaStore = props => {

  return (
    <KimaSearchHandler api={props.api}>
      <KimaGraphProvider api={props.api}>
        {props.children}
      </KimaGraphProvider>
    </KimaSearchHandler>
  )

}