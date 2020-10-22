import { ICallRecord } from 'features/call-records/types';

export default function getCollocutorName(record: ICallRecord) {
  const {
    collocutor: { firstName, lastName, middleName },
  } = record;
  const definedNames = [firstName, lastName, middleName].filter(v => v);
  return definedNames.join(' ');
}
