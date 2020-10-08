export default function makeSet<T>(original: T[] | Set<T>) {
  const result = new Set<T>();
  original.forEach(result.add, result);
  return result;
}
