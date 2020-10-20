/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');

let _id = 0;

const uid = () => _id++;

const getDirection = () => (Math.random() >= 0.5 ? 'INCOMING' : 'OUTCOMING');

const ONE_MINUTE_IN_MS = 60_000;

function makeGetDate() {
  let date = new Date('08/31/2020').getTime();
  return function getDate() {
    date += ONE_MINUTE_IN_MS;
    return date;
  };
}

function generateName() {
  return Math.random() >= 0.5
    ? {
        firstName: faker.name.firstName(),
        middleName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      }
    : {};
}

const getDate = makeGetDate();

module.exports = () => ({
  records: Array(100)
    .fill()
    .map(() => ({
      id: uid(),
      direction: getDirection(),
      collocutor: {
        ...generateName(),
        phone: faker.phone.phoneNumber('+7 ### ###-##-##'),
      },
      record: {
        id: uid(),
        duration: faker.random.number(60 * 120),
        file:
          Math.random() >= 0.5
            ? 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
            : 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
        transcriptions: Array(faker.random.number(30))
          .fill()
          .map(() => ({
            id: uid(),
            text: faker.random.words(),
            createdAt: getDate(),
            direction: getDirection(),
          })),
      },
      createdAt: faker.date.recent().getTime(),
    })),
});
