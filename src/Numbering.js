export default function numbering(array, key='id') {
  return array.reduce(((maxId, element) => maxId < element[key] ? element[key] : maxId), 0) + 1;
};
