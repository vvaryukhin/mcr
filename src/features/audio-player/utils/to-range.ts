type Range = [number, number];

export default function toRange(number: number, range: Range) {
  const [min, max] = range;
  return Math.max(min, Math.min(number, max));
}
