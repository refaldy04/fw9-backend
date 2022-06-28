const db = require('../helpers/db');

exports.confirmPin = (cb) => {
  db.query('SELECT email FROM users', (er, res) => {
    cb(res);
  });
};
