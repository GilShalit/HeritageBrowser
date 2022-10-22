import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo, { 
  AggregationsControl,
  Controls,
  Map, 
  MyLocationControl,
  HeatmapLayer,
  ZoomControl
} from '@peripleo/peripleo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KimaPopup, KimaStore, KimaTooltip, LoadIndicator } from './components';

import './index.css';

// Needed for lightbox: https://stackoverflow.com/questions/72114775/vite-global-is-not-defined
window.global ||= window;

const queryClient = new QueryClient();

const App = () => {

  const [ loading, setLoading ] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Peripleo>    
        <KimaStore 
          api="https://kimanli.azurewebsites.net/api"
          onLoad={() => setLoading(true)}
          onLoadDone={() => setLoading(false)}>
  
          <Map.MapLibre
            mapStyle="https://api.maptiler.com/maps/voyager/style.json?key=RFavxpVJ82EHyrN2kxsF" 
            defaultBounds={[[34.0, 29.1], [36.2, 33.7]]}
            tooltip={props => <KimaTooltip {...props} />} 
            popup={props => <KimaPopup {...props} />}>

            <HeatmapLayer 
              id="kima-layer-places"
              color="#9d00d1" />
            
          </Map.MapLibre>

          <Controls>
            <AggregationsControl />
            <ZoomControl />
            <MyLocationControl />

            {loading && 
              <LoadIndicator />
            }
          </Controls>
        </KimaStore>
      </Peripleo>
    </QueryClientProvider>
  )

}

window.onload = function() {

  ReactDOM.createRoot(document.getElementById('app')).render(
    <App />
  )
    
}