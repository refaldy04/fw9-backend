const db = require('../helpers/db');

exports.getAllTransactions = (cb) => {
  db.query('SELECT * FROM transaction ORDER BY id ASC', (err, res) => {
    cb(res.rows);
  });
};

exports.getTransactionById = (id, cb) => {
  db.query('SELECT * FROM transaction WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.getTransactionUser = (id, cb) => {
  db.query('SELECT * FROM transaction WHERE sender_id=$1 OR recipient_id=$1', [id], (err, res) => {
    console.log(res.rows);
    cb(err, res);
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

exports.editTransaction = (id, data, cb) => {
  const query = 'UPDATE transaction SET amount=$1, recipient_id=$2, sender_id=$3, notes=$4, time=$5, type_id=$6 WHERE id=$7 RETURNING *';
  const value = [data.amount, data.recipient_id, data.sender_id, data.notes, data.time, data.type_id, id];
  db.query(query, value, (err, res) => {
    if (res) {
      // console.log(res);
      cb(err, res.rows);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.deleteTransaction = (id, cb) => {
  const query = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};
