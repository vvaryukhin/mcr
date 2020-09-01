export interface ICallRecord {
  id: number;
  direction: TCallDirection;
  collocutor: ICollocutor;
  record: IRecord;
  created_at: number;
  deleted_at: number | null;
}

export interface ICollocutor {
  firstname: string;
  lastname: string;
  middlename: string;
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
  created_at: number;
}

export type TCallDirection = 'incoming' | 'outcoming';
