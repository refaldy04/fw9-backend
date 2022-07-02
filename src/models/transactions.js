const db = require('../helpers/db');

exports.getAllTransactions = (cb) => {
  db.query('SELECT * FROM transaction ORDER BY id ASC', (err, res) => {
    cb(res.rows);
  });
};

exports.createTransaction = (data, cb) => {
  const query = 'INSERT INTO transaction(amount, recipient_id, sender_id, notes, time, type_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [data.amount, data.recipient_id, data.sender_id, data.notes, data.time, data.type_id];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};
