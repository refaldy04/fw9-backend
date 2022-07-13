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

exports.getTransactionUser = (id, limit, offset = 0, cb) => {
  db.query('SELECT * FROM transaction WHERE sender_id=$1 LIMIT $2 OFFSET $3', [id, limit, offset], (err, res) => {
    console.log(res.rows);
    cb(err, res);
  });
};

exports.countAllTransaction = (id, cb) => {
  db.query(`SELECT * FROM transaction WHERE sender_id=${id}`, (err, res) => {
    // console.log(res.rowCount);
    cb(err, res.rowCount);
  });
};

exports.createTransaction = (data, cb) => {
  const query = `INSERT INTO transaction(amount, sender_id, recipient_id, notes, time, type_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const val = [data.amount, data.sender_id, data.recipient_id, data.notes, data.time, data.type_id];
  db.query(query, val, (err, res) => {
    if (err) {
      // console.log(err);
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.transfer = (id, data, cb) => {
  val = [];
  const filtered = {};
  const obj = {
    sender_id: id,
    recipient_id: data.recipient_id,
    notes: data.notes,
    time: data.time,
    type_id: data.type_id,
    amount: parseInt(data.amount),
  };

  for (x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        val.push(obj[x]);
      }
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((val, index) => `$${index + 1}`);
  const query = `INSERT INTO transaction(${key}) VALUES(${finalResult}) RETURNING *`;
  db.query(query, val, (err, res) => {
    // console.log(res);
    if (err) {
      // console.log(err);
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
