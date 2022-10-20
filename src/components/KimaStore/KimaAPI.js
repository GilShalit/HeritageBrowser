const POST = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST'
};

export const getPlaces = api => (bounds = null, filters = [], signal) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    return fetch(`${api}/BoxPlaces/${minLon}/${minLat}/${maxLon}/${maxLat}`, { signal })
      .then(res => res.json());
  } else {
    return fetch(`${api}/Places`, { signal }).then(res => res.json());
  }
}

export const getRecords = api => (bounds = null, filters = [], signal) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    if (filters.length > 0) {
      const payload = {};

      filters.forEach(({ name, values }) => payload[name] = values);

      return fetch(`${api}/BoxRecords/${minLon}/${minLat}/${maxLon}/${maxLat}`, {
        signal,
        ...POST,
        body: JSON.stringify(payload)
      }).then(res => res.json());
      
    } else {
      return fetch(`${api}/BoxRecords/${minLon}/${minLat}/${maxLon}/${maxLat}`, { signal })
        .then(res => res.json());
    }
  } else {
    return fetch(`${api}/Records`, { signal }).then(res => res.json());
  }
}
