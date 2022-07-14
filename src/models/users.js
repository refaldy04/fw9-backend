const db = require('../helpers/db');

const { LIMIT_DATA } = process.env;

exports.getAllUsers = (keyword, limit = parseInt(LIMIT_DATA), offset = 0, sortBy, sort, cb) => {
  // console.log(sortBy);
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%' ORDER BY ${sortBy} ${sort} LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    // console.log(res);
    cb(err, res.rows);
  });
};

exports.getUserById = (id, cb) => {
  db.query('SELECT * FROM users WHERE id=$1', [id], (err, res) => {
    // console.log(res);
    cb(err, res);
  });
};

exports.getUserByEmail = (email, cb) => {
  db.query('SELECT * FROM users WHERE email=$1', [email], (err, res) => {
    cb(err, res);
  });
};

exports.countAllUsers = (keyword, cb) => {
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.createUsers = (data, cb) => {
  const query = 'INSERT INTO users(email, password, username, pin) VALUES($1, $2, $3, $4) RETURNING *';
  const value = [data.email, data.password, data.username, data.pin];
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

exports.updateUser = (id, data, cb) => {
  val = [id];
  const filtered = {};
  const obj = {
    email: data.email,
    password: data.password,
    username: data.username,
    pin: data.pin,
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
  const finalResult = key.map((val, index) => `${val}=$${index + 2}`);
  const query = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(query, val, (err, res) => {
    if (res) {
      // console.log(res);
      cb(err, res.rows[0]);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.changePassword = (id, data, cb) => {
  val = [id, data];

  const query = `UPDATE users SET password=$2 WHERE id=$1 RETURNING *`;
  db.query(query, val, (err, res) => {
    if (res) {
      console.log(res);
      cb(err, res.rows[0]);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.changePin = (id, data, cb) => {
  val = [id, data];

  const query = `UPDATE users SET pin=$2 WHERE id=$1 RETURNING *`;
  db.query(query, val, (err, res) => {
    if (res) {
      // console.log(res.rows);
      cb(err, res.rows[0]);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.deleteUser = (id, cb) => {
  const query = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};
