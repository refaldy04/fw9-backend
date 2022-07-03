const db = require('../helpers/db');

exports.getAllProfile = (cb) => {
  db.query('SELECT * FROM profile ORDER BY id ASC', (err, res) => {
    cb(res.rows);
  });
};

exports.createProfile = (data, cb) => {
  const query = 'INSERT INTO profile(fullname, balance, picture, user_id, phone_number) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [data.fullname, data.balance, data.picture, data.user_id, data.phone_number];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.editProfile = (id, data, cb) => {
  const query = 'UPDATE profile SET fullname=$1, balance=$2, picture=$3, user_id=$4, phone_number=$5 WHERE id=$6 RETURNING *';
  const value = [data.fullname, data.balance, data.picture, data.user_id, data.phone_number, id];
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

exports.deleteProfile = (id, cb) => {
  const query = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};
