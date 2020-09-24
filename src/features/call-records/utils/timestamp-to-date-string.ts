interface ITimestampToDateOptions {
  timestamp?: number;
  separator?: string;
}

export default function timestampToDateString({
  timestamp,
  separator = 'T',
}: ITimestampToDateOptions) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${toDateNumber(month)}-${toDateNumber(
    day
  )}${separator}${hours}:${minutes}`;
}

function toDateNumber(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}
