export default function timestampToDateString(timestamp?: number) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${toDateNumber(month)}-${toDateNumber(day)}`;
}

function toDateNumber(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}
