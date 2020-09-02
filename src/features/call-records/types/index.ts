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
