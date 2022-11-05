import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo, { 
  AggregationsFullscreen,
  AggregationsOverlay,
  Controls,
  Desktop,
  InfoControl,
  Map, 
  Mobile,
  MobileMenu,
  MyLocationControl,
  HeatmapLayer,
  ZoomControl
} from '@peripleo/peripleo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KimaPopup, KimaStore, KimaTooltip, LoadIndicator } from './components';
import { TYPE_COLORS } from './Colors';

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
            defaultBounds={[[32.0, 27.1], [38.2, 35.7]]}
            tooltip={props => <KimaTooltip {...props} />} 
            popup={props => <KimaPopup {...props} />}>

            <HeatmapLayer 
              id="kima-layer-places"
              color="#9d00d1" />
            
          </Map.MapLibre>

          <Controls>
            <Mobile>

              <MobileMenu
                items={[
                  <AggregationsFullscreen 
                    colors={TYPE_COLORS} 
                    responsive={true} 
                    displayFacets={['RecordTypes', 'RelationshipTypes']} 
                    facetLabels={['Record Types', 'Relationships']} />
                  ]} />

            </Mobile>

            <Desktop>
              <AggregationsOverlay
                colors={TYPE_COLORS} 
                responsive={true} 
                displayFacets={['RecordTypes', 'RelationshipTypes']} 
                facetLabels={['Record Types', 'Relationships']} />
            </Desktop>

            <ZoomControl />
            
            <MyLocationControl />
            
            {/* <InfoControl popup={
              <div className="kima-info-modal">
                <h1>Welcome</h1>
                <p>
                  Welcome to the NLI Heritage Browser Prototype.
                </p>
              </div>
            } /> */}

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