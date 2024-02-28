import { SESSION_ID } from '../../session';

const POST = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Kima-Session-Key': SESSION_ID
  },
  method: 'POST'
};

class APIError extends Error {

  constructor(message, status) {
    super(message);

    this.status = status;
  }

}

// HTTP API response handler - delivers JSON
// or throws exception in case of HTTP errors
const onResponse = res => {
  if (res.status === 200)
    return res.json();
  else 
    throw new APIError('API Error', res.status);
}

export const toFilterBody = filters => {
  const payload = {};

  filters.forEach(({ name, values }) => payload[name] = values);

  return Object.keys(payload.length > 0) ?
    payload : null;
}

export const getInitialPlaces = api => () => {
  // Send wakeup ping
  fetch(`${api}/BoxPlaces/35.21/31.76/35.25/31.79`, {
    headers: {
      'X-Kima-Session-Key': SESSION_ID
    }
  });

  return fetch('start-places.json').then(onResponse);
}

export const getPlaces = api => (bounds = null, filters = [], signal) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    if (filters.length > 0) {
      return fetch(`${api}/BoxPlaces/${minLon}/${minLat}/${maxLon}/${maxLat}`, {
        signal,
        ...POST,
        body: JSON.stringify(toFilterBody(filters))
      }).then(onResponse);
    } else {
      return new Promise(resolve => setTimeout(resolve, 50))
        .then(() => fetch(`${api}/BoxPlaces/${minLon}/${minLat}/${maxLon}/${maxLat}`, { 
          headers: {
            'X-Kima-Session-Key': SESSION_ID
          },
          signal 
        })).then(onResponse);
    }
  } else {
    return fetch(`${api}/Places`, { 
      headers: {
        'X-Kima-Session-Key': SESSION_ID
      },
      signal
    }).then(onResponse);
  }
}

export const getInitialRecords = () => () => fetch('/start-records.json').then(onResponse);

export const getRecords = api => (bounds = null, filters = [], signal) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    if (filters.length > 0) {
      return fetch(`${api}/BoxRecords/${minLon}/${minLat}/${maxLon}/${maxLat}`, {
        signal,
        ...POST,
        body: JSON.stringify(toFilterBody(filters))
      }).then(onResponse);
      
    } else {
      return fetch(`${api}/BoxRecords/${minLon}/${minLat}/${maxLon}/${maxLat}`, { 
        headers: {
          'X-Kima-Session-Key': SESSION_ID
        },
        signal
      }).then(onResponse);
    }
  } else {
    return fetch(`${api}/Records`, { 
      headers: {
        'X-Kima-Session-Key': SESSION_ID
      },
      signal
    }).then(onResponse);
  }
}
