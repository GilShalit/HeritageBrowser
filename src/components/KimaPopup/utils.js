export const getDescription = record => {
  if (!record.descriptions)
    return;

  if (!Array.isArray(record.descriptions))
    return;

  return record.descriptions[0].value;
}