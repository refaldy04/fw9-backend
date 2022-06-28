const db = require('../helpers/db');

exports.confirmPin = (cb) => {
  db.quary('SELECT * FROM users', (er, res) => {
    cb(res);
  });
};
