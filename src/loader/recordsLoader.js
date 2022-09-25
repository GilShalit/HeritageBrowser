export const recordToNode = record => ({
  ...record,
  properties: { title: record.title }
});

export const getEdges = records => records.reduce((all, record) => ([
  ...all,
  ...record.places.map(({id, relation}) => {
    if (record.id) {
      const source = record.id;
      const target = id;
      return { source, target, relation };
    } else {
      console.error('Record without ID', record);
    }
  }).filter(e => e)
]), []);