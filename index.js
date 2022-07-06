const express = require('express');

global.__basepath = __dirname;

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.json({
    succes: true,
    message: 'This is Home Page :)',
  });
});

app.use('/', require('./src/routes'));

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});

app.listen(3333, () => {
  console.log(`App is running on port 3333`);
});
