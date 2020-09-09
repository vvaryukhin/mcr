import { ICallRecord } from 'features/call-records/types';

const fakeRecords: ICallRecord[] = [
  {
    id: 1,
    direction: 'incoming',
    collocutor: {
      firstName: 'Константин',
      lastName: 'Константинович',
      middleName: 'Константинопольский',
      phone: '+7 (926) 000-00-00',
    },
    record: {
      id: 1,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      duration: 10000,
      transcriptions: [
        { text: 'Привет', createdAt: 1598821260000 },
        { text: 'Привет!', createdAt: 1598821320000 },
        { text: 'Как дела?', createdAt: 1598821380000 },
        { text: 'Нормально.', createdAt: 1598821440000 },
      ],
    },
    createdAt: 1598821500000,
    deletedAt: null,
  },
  {
    id: 2,
    direction: 'incoming',
    collocutor: {
      firstName: 'Александр',
      lastName: 'Александров',
      middleName: 'Александрович',
      phone: '+7 (228) 228-14-88',
    },
    record: {
      id: 2,
      file: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
      duration: 10000,
      transcriptions: [
        { text: 'Здарова', createdAt: 1598821560000 },
        { text: 'Привет!', createdAt: 1598821620000 },
        { text: 'Как сам?', createdAt: 1598821680000 },
        { text: 'Как джип нисан.', createdAt: 1598821740000 },
      ],
    },
    createdAt: 1598821800000,
    deletedAt: null,
  },
];

export default fakeRecords;
