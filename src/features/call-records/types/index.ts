export interface ICallRecord {
  id: number;
  direction: IDirection;
  collocutor: ICollocutor;
  record: IRecord;
  createdAt: number;
  deletedAt: number | null;
}

export interface ICollocutor {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
}

export interface IRecord {
  id: number;
  file: string;
  duration: number;
  transcriptions: ITranscription[];
}

export interface ITranscription {
  text: string;
  createdAt: number;
}

export type IDirection = 'incoming' | 'outcoming';

export enum CallRecordsSortingTypes {
  DATE_ACS,
  DATE_DES,
  DURATION_ACS,
  DURATION_DES,
  NAME_ALPHABET_ACS,
}
