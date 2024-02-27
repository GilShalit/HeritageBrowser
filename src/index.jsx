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
  Scrollable,
  ZoomControl
} from './peripleo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KimaPopup, KimaStore, KimaTooltip, LoadIndicator } from './components';
import { TYPE_COLORS } from './Colors';
import { API_BASE, MAP_STYLE } from './Config';

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
          api={API_BASE}
          onLoad={() => setLoading(true)}
          onLoadDone={() => setLoading(false)}>
  
          <Map.MapLibre
            mapStyle={MAP_STYLE}
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
              <Scrollable>
                <AggregationsOverlay
                  colors={TYPE_COLORS} 
                  responsive={true} 
                  displayFacets={['RecordTypes', 'RelationshipTypes']} 
                  facetLabels={['Record Types', 'Relationships']} />
              </Scrollable>
            </Desktop>

            <ZoomControl />
            
            <MyLocationControl />
            
            <InfoControl className="kima-welcome">
              <h1>ברוכות וברוכים הבאים לממשק הגילוי והחיפוש הגיאוגרפי של הספרייה הלאומית!</h1>

              <p>הממשק מאפשר לצפות באוצרות הדיגיטליים של הספרייה על גבי מפה אינטראקטיבית. כך תוכלו לאתר רשומות לפי המקום בו הן נוצרו או לפי המקום אותו הן מתארות.
שימו לב: הממשק כולל כרגע רק פריטים שיש להם מיקום גיאוגרפי הזמינים לגישה דיגיטלית מרחוק.
</p>

              <p><strong>איך להשתמש בממשק?</strong></p>

              <ul>
                <li>הזיזו את המפה ובצעו התקרבות והתרחקות באמצעות העכבר.</li>
                <li>לחצו על מקום מסוים על מנת לראות את כל הפריטים שקשורים אליו.</li>
                <li>לחיצה על האייקון  תפתח את דף המקום בויקינתונים.</li>
                <li>ניתן לסנן כרגע את הרשומות לפי סוג החומר או לפי הקשר בין המיקום הגיאוגרפי והרשומה.</li>
              </ul>

              <p>הממשק נוצר על ידי סיני רוסינק, גיל שליט וריינר סימון במסגרת תחרות "tarboot" שאורגנה ע"י יד הנדיב והספרייה הלאומית.</p>
            </InfoControl>

            {loading && 
              <LoadIndicator />
            }

            <div className="kima-nli-logo">
              <a href="https://www.nli.org.il" target="_blank" title="National Library of Israel website">
                <Desktop>
                  <img 
                    className="desktop" 
                    src="/nli-logo-desktop-rtl.svg" 
                    alt="לוגו הספרייה הלאומית של ישראל" 
                    title="לוגו הספרייה הלאומית של ישראל" />
                </Desktop>

                <Mobile>
                  <img 
                    className="mobile"
                    src="/nli-logo-mobile.svg" 
                    alt="לוגו הספרייה הלאומית של ישראל" 
                    title="לוגו הספרייה הלאומית של ישראל" />
                </Mobile>
              </a>
            </div>
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