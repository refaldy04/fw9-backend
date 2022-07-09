const express = require('express');
const authMiddleware = require('./src/middleware/auth');

global.__basepath = __dirname;

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('assets'));

app.get('/', (req, res) => {
  return res.json({
    succes: true,
    message: 'This is Home Page :)',
  });
});

app.get('/authenticatedUser', authMiddleware, (req, res) => {
  const userModel = require('./src/models/users');
  userModel.getUserById(req.authUser.id, (err, result) => {
    const user = result.rows[0];
    return res.status(200).json({
      succes: true,
      message: `Hello ${user.email}`,
    });
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
