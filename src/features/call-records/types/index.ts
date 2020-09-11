export interface ICallRecord {
  id: number;
  direction: IDirection;
  collocutor: ICollocutor;
  record: IRecord;
  createdAt: number;
  deletedAt: number | null;
}

export interface ICollocutor {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone: string;
}

export interface IRecord {
  id: number;
  file: string;
  duration: number;
  transcriptions: ITranscription[];
}

export interface ITranscription {
  id: number;
  text: string;
  createdAt: number;
  direction: IDirection;
}

export type IDirection = 'incoming' | 'outcoming';

export enum CallRecordsSortingTypes {
  DATE_ACS = 'DATE_ACS',
  DATE_DES = 'DATE_DES',
  DURATION_ACS = 'DURATION_ACS',
  DURATION_DES = 'DURATION_DES',
  NAME_ALPHABET_ACS = 'NAME_ALPHABET_ACS',
}

export enum CallDirectionTypes {
  ALL = 'ALL',
  INCOMING = 'INCOMING',
  OUTCOMING = 'OUTCOMING',
}

export interface IDateInterval {
  from?: number;
  to?: number;
}
