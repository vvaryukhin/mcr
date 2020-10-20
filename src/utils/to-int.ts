import { isNaN } from 'utils';

export default function toInt(val: any, defaultVal = -1) {
  const parsedVal = parseInt(val, 10);
  return isNaN(parsedVal) ? defaultVal : parsedVal;
}
