import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { TbCurrentLocation } from 'react-icons/tb';
import { FiMenu } from 'react-icons/fi';
import Peripleo, { 
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

  const [ loading, setLoading ] = useState(true);

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
                  <AggregationsOverlay 
                    colors={TYPE_COLORS} 
                    fullscreen={true} 
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
            
            <InfoControl className="kima-welcome">
              <h1>Welcome to the Heritage Browser!</h1>

              <p>
                Discover the digitally available treasures of the National Library of Israel 
                displayed on a map according to where they were created or locations they describe.
              </p>

              <ul>
                <li>
                  Move the map around by dragging it and use the buttons on the right or your mouse to zoom in and out.
                </li>
                <li>
                  Click on a place to see the number of items related to it, as well as links to wikidata 
                  and the Kima Gazetteer. Another click will open a list of related items. 
                </li>
                <li>
                  After opening an item, use the <CgArrowsExpandRight /> icon to enlarge the image. Click Details to view the 
                  item's details at the library's website.
                </li>
                <Desktop>
                  <li>
                    Use the left bar to filter the types of items that interest you, or change the bar 
                    from Record Types to Relationship Types to filter items according to their relation to the place.
                  </li>
                </Desktop>
                <Mobile>
                  <li> 
                    Click the <FiMenu /> icon to filter the types of items that interest you, or change the bar 
                    from Record Types to Relationship Types to filter items according to their relation to the place.
                  </li>
                </Mobile>
                <li>
                  The <TbCurrentLocation /> button on the right of the screen will focus the map on your current location. 
                </li>
              </ul>

              <p>
                Created by <a href="mailto:sinai.rusinek@mail.huji.ac.il">Sinai 
                Rusinek</a>, <a href="mailto:gil.shalit@gmail.com">Gil Shalit</a> and <a href="mailto:hello@rainersimon.io">Rainer 
                Simon</a> and was a finalist in the <a href="https://tarboot.org/" target="_blank">tarboot</a> 
                competition's general track.
              </p>
            </InfoControl>

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