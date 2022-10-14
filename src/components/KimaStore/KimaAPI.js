export const getPlaces = api => (bounds = null) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    return fetch(`${api}/BoxPlaces/${minLon}/${minLat}/${maxLon}/${maxLat}`)
      .then(res => res.json());
  } else {
    return fetch(`${api}/Places`).then(res => res.json());
  }
}

export const getRecords = api => (bounds = null) => {
  if (bounds) {
    const [[ minLon, minLat ], [ maxLon, maxLat ]] = bounds;

    return fetch(`${api}/BoxRecords/${minLon}/${minLat}/${maxLon}/${maxLat}`)
      .then(res => res.json());
  } else {
    return fetch(`${api}/Records`).then(res => res.json());
  }
}
