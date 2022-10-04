import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Peripleo, { 
  BrowserStoreProvider, 
  Controls,
  HeatmapLayer,
  Map,
  SearchBox,
  ZoomControl
} from '@peripleo/peripleo';

import KimaTooltip from './KimaTooltip';
import KimaPopup from './KimaPopup';
import { recordToNode, getEdges } from './loader/recordsLoader';

import './index.css';

const App = () => {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('places-2022-09-22.json'),
      fetch('records-2022-09-14.json')
    ].map(promise => promise.then(res => res.json())))
      .then(([ { features }, { records }]) => {
        const placeNodes = features.map(f => ({
          ...f,
          properties: {
            ...f.properties,
            count: f.properties.total_records
          }
        }));

        const recordNodes = records.map(recordToNode);

        setNodes([...placeNodes, ...recordNodes ]);
        setEdges(getEdges(recordNodes));
      });    
  }, []);

  /*

          <PointLayer 
            id="kima-layer-places"
            color="#9d00d1" 
            sizes={[
              0, 4,
              1400, 18
            ]} />
  */

  return (
    <BrowserStoreProvider 
      nodes={nodes}
      edges={edges}
      index={['properties.title','names.toponym','descriptions.value']}>

      <Peripleo>      

        <Map.MapLibreGL
          mapStyle="https://api.maptiler.com/maps/voyager/style.json?key=cqqmcLw28krG9Fl7V3kg" 
          defaultBounds={[-15.764914, 33.847608, 35.240991, 58.156214]}
          tooltip={props => <KimaTooltip {...props} />}
          popup={props => <KimaPopup {...props} /> }>

          <HeatmapLayer id="kima-layer-places" />
          
        </Map.MapLibreGL>

        <Controls>
          <SearchBox />
          <ZoomControl />
        </Controls>

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