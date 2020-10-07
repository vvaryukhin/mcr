export default function mapRight<T, U>(
  arr: T[],
  mapper: (value: T, index: number, array: T[]) => U
): U[] {
  return arr.reduceRight((acc, c, i, arr) => {
    const val = mapper(c, i, arr);
    acc.push(val);
    return acc;
  }, [] as U[]);
}
