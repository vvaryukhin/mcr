import { id } from 'utils';
import { ICallRecord } from '../types';

export default function getCollocutor(record: ICallRecord) {
  const {
    collocutor: { phone, firstName, lastName, middleName },
  } = record;
  const definedNames = [firstName, lastName, middleName].filter(id);
  if (definedNames.length === 0) {
    return phone;
  }

  return definedNames.join(' ');
}
