import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo from '@peripleo/peripleo';
import { 
  BrowserStoreProvider, 
  Map,
  HUD,
  SearchInput,
  PointLayer
} from '@peripleo/peripleo';

import './index.css';

const App = () => {

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetch('places-2022-09-14.json')
      .then(res => res.json())
      .then(({ features }) => {
        const nodes = features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            weight: f.properties.total_records
          }
        }));

        setNodes(nodes)
      });
  }, []);

  return (
    <BrowserStoreProvider 
      nodes={nodes}
      index={['properties.title','names.toponym','descriptions.value']}>

      <Peripleo>      
        <Map.MapLibreGL
          mapStyle="https://api.maptiler.com/maps/outdoor/style.json?key=cqqmcLw28krG9Fl7V3kg" 
          defaultBounds={[-15.764914, 33.847608, 35.240991, 58.156214]}>

          <PointLayer 
            id="kima-places"
            color="#9d00d1" 
            sizes={[
              0, 4,
              200, 18
            ]} />
            
        </Map.MapLibreGL>

        <HUD>
          <SearchInput />
        </HUD> 
      </Peripleo>
    </BrowserStoreProvider>
  )

}

window.onload = function() {

  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
    
}