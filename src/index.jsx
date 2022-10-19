import React from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo, { 
  AggregationsControl,
  Controls,
  Map, 
  MyLocationControl,
  PointLayer,
  ZoomControl
} from '@peripleo/peripleo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KimaPopup, KimaStore, KimaTooltip } from './components';

import './index.css';

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Peripleo>    
        <KimaStore api="https://kimanli.azurewebsites.net/api">
  
          <Map.MapLibre
            mapStyle="https://api.maptiler.com/maps/voyager/style.json?key=RFavxpVJ82EHyrN2kxsF" 
            defaultBounds={[[-15.764914, 33.847608], [35.240991, 58.156214]]}
            tooltip={props => <KimaTooltip {...props} />} 
            popup={props => <KimaPopup {...props} />}>

            <PointLayer 
              id="kima-layer-places"
              color="#9d00d1" 
              sizes={[
                0, 4,
                1400, 18
              ]} />
            
          </Map.MapLibre>

          <Controls>
            <AggregationsControl />
            <ZoomControl />
            <MyLocationControl />
          </Controls>
        </KimaStore>
      </Peripleo>
    </QueryClientProvider>
  )

}

window.onload = function() {

  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
    
}