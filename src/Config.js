// Original base URLs: https://kimanli.azurewebsites.net/api 
// and later: https://kimanli7.azurewebsites.net/api
// 
// For local testing and CORS proxying, use /api (also used as default)
const metaApiBase = document.querySelector('meta[name="api.base"]')?.getAttribute('content');

export const API_BASE = metaApiBase ? (
    metaApiBase.endsWith('/') ? metaApiBase.slice(0, -1) : metaApiBase
  ) :
  // DEFAULT
  '/api';

const metaMapKey = document.querySelector('meta[name="maptiler.key"]')?.getAttribute('content');

export const MAP_STYLE = metaMapKey ? 
  `https://api.maptiler.com/maps/voyager/style.json?key=${metaMapKey}` : 
  'https://api.maptiler.com/maps/voyager/style.json?key=RFavxpVJ82EHyrN2kxsF';