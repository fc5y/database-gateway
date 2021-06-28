import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import v2 from './v2';
import { dateToTimestamp } from './utils';

const app = express();
const port = process.env.PORT || 8019;

app.set('json spaces', 2); // optional, format json responses with 2 spaces
app.set('json replacer', function (this: any, key: string, value: any) {
  if (this[key] instanceof Date) {
    return dateToTimestamp(this[key]);
  }
  return value;
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    name: 'database-gateway',
  });
});

app.use('/db/v2', v2);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
