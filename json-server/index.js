/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const fakeRecords = require('./generate');

let records = fakeRecords().records;

const app = express();

app.use(cors());

app.get('/records', (req, res) => {
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

app.get('/records/:id', (req, res) => {
  const record = records.find(({ id }) => id === parseInt(req.params.id, 10));
  res.json(record);
});

app.delete('/records/:id', (req, res) => {
  records = records.filter(({ id }) => id !== parseInt(req.params.id, 10));
  res.json(records);
});

app.listen(3001, () => {
  console.log('===============');
});
