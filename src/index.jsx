import React from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo, { Map, PointLayer } from '@peripleo/peripleo';
import { KimaPopup, KimaStore, KimaTooltip } from './components';

import './index.css';

const App = () => {

  return (
    <Peripleo>    
      <KimaStore api="https://kimanli.azurewebsites.net/api">
 
        <Map.MapLibre
          mapStyle="https://api.maptiler.com/maps/voyager/style.json?key=cqqmcLw28krG9Fl7V3kg" 
          defaultBounds={[[-15.764914, 33.847608], [35.240991, 58.156214]]}
          tooltip={props => <KimaTooltip {...props} />} 
          popup={props => <KimaPopup />}>

          <PointLayer 
            id="kima-layer-places"
            color="#9d00d1" 
            sizes={[
              0, 4,
              1400, 18
            ]} />
          
        </Map.MapLibre>

      </KimaStore>
    </Peripleo>
  )

}

window.onload = function() {

  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
    
}