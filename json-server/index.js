/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const fakeRecords = require('./generate');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

let records = fakeRecords().records;

const app = express();

app.use(cors());

app.get('/api/v1/records', (req, res) => {
  const { from, to, sorting, q, direction } = req.query;
  console.log({ from, to, sorting, q, direction });
  let result = records;
  if (direction && direction !== 'ALL') {
    result = result.filter(({ direction: d }) => d === direction);
  }
  if (q) {
    result = result.filter(
      ({ collocutor: { phone }, record: { transcriptions } }) => {
        const queryPhoneDigits = q.replace(/\D/g, '');
        if (
          queryPhoneDigits &&
          phone.replace(/\D/g, '').includes(queryPhoneDigits)
        ) {
          return true;
        }
        return transcriptions.some(({ text }) => text.includes(q));
      }
    );
  }
  res.json(result);
});

app.get('/api/v1/records/:id', (req, res) => {
  const record = records.find(({ id }) => id === parseInt(req.params.id, 10));
  res.json(record);
});

app.delete('/api/v1/records/:id', (req, res) => {
  const deletedRecord = records.find(({ id }) => id === parseInt(req.params.id, 10));
  records = records.filter(v => v !== deletedRecord);
  res.json(deletedRecord);
});

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(3001, () => {
  console.log('===============');
});
