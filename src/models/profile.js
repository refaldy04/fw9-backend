const db = require('../helpers/db');

exports.getAllProfile = (cb) => {
  db.query('SELECT * FROM profile ORDER BY id ASC', (err, res) => {
    cb(res.rows);
  });
};

exports.getProfileById = (id, cb) => {
  db.query('SELECT * FROM profile WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.getProfileByUserId = (id, cb) => {
  db.query('SELECT * FROM profile WHERE user_id=$1', [id], (err, res) => {
    cb(err, res);
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

exports.createProfileAfterRegister = (data, cb) => {
  const query = 'INSERT INTO profile(user_id) VALUES($1) RETURNING *';
  const values = [data];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.editProfile = (id, data, picture, cb) => {
  val = [id];
  const filtered = {};
  const obj = {
    picture,
    fullname: data.fullname,
    balance: data.balance,
    user_id: data.user_id,
    phone_number: data.phone_number,
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
  console.log(finalResult);
  console.log(val);

  const query = `UPDATE profile SET ${finalResult}  WHERE id=$1 or user_id=$1 RETURNING *`;
  db.query(query, val, (err, res) => {
    if (res) {
      // console.log(res);
      cb(err, res.rows);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.increaseBalance = (val, data, cb) => {
  const query = `UPDATE profile SET balance=balance + $1 WHERE user_id=$2 RETURNING *`;
  const values = [val, data];
  db.query(query, values, (err, res) => {
    // console.log(res.rows);
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.decreaseBalance = (val, data, cb) => {
  const query = `UPDATE profile SET balance=balance - $1 WHERE user_id=$2 RETURNING *`;
  const values = [val, data];
  db.query(query, values, (err, res) => {
    // console.log(res.rows);
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.changePhoneNumber = (id, data, cb) => {
  val = [id, data.phonenumber];
  const query = `UPDATE profile SET phone_number=$2 WHERE user_id=$1 RETURNING phone_number`;
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

exports.deleteProfile = (id, cb) => {
  const query = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};
