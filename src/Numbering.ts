interface numberingable {
  id: number
}

export default function numbering(array: numberingable[]): number {
  return array.reduce(((maxId, element) => maxId < element.id ? element.id : maxId), 0) + 1;
};
