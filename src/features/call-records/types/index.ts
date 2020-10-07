export interface ICallRecord {
  id: number;
  direction: CallDirections;
  collocutor: ICollocutor;
  record: IRecord;
  createdAt: number;
  deletedAt: number | null;
  isDeleting: boolean;
  isFailed: boolean;
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
  direction: CallDirections;
}

export enum CallDirections {
  INCOMING = 'INCOMING',
  OUTCOMING = 'OUTCOMING',
}

export enum CallRecordsSortingTypes {
  DATE_ACS = 'DATE_ACS',
  DATE_DES = 'DATE_DES',
  DURATION_ACS = 'DURATION_ACS',
  DURATION_DES = 'DURATION_DES',
  NAME_ALPHABET_ACS = 'NAME_ALPHABET_ACS',
}

export enum CallDirectionFilters {
  ALL = 'ALL',
  INCOMING = 'INCOMING',
  OUTCOMING = 'OUTCOMING',
}

export interface IDateInterval {
  from?: number;
  to?: number;
}
