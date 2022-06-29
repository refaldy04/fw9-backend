const db = require('../helpers/db');

exports.getAllUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
    cb(res.rows);
  });
};

exports.createUsers = (data, cb) => {
  const query = 'INSERT INTO users(email, password, username, pin) VALUES($1, $2, $3, $4) RETURNING *';
  const value = [data.email, data.password, data.username, data.pin];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};
