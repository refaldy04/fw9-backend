const userModel = require('../models/users');
const profileModel = require('../models/profile');
const transactionModel = require('../models/transactions');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../helpers/upload').single('picture');

exports.register = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  userModel.createUsers(req.body, (err, result) => {
    req.body.pin = null;
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Register Success');
    }
  });
};

exports.createPin = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { email } = req.body;
  userModel.getUserByEmail(email, (err, result) => {
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // console.log(user);
      if (result.rows[0].pin === null) {
        userModel.updateUser(user.id, { pin: req.body.pin }, (req, resultUpdate) => {
          const userUpdated = resultUpdate;
          if (userUpdated.email == user.email) {
            return response(res, 'Create PIN success');
          }
        });
      } else {
        return response(res, 'Error: PIN already set', null, null, 401);
      }
    } else {
      return response(res, 'Error: Email does not exist', null, null, 401);
    }
  });
};

exports.login = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { email, password } = req.body;
  userModel.getUserByEmail(email, (err, result) => {
    if (result.rows.length < 0) {
      return response(res, 'User not found', null, null, 400);
    }
    const user = result.rows[0];
    bcrypt
      .compare(password, user.password)
      .then((cpRes) => {
        // console.log(cpRes);
        if (cpRes) {
          const token = jwt.sign({ id: user.id }, process.env.APP_SECRET || 'mYF1rStb4ck3nd');
          return response(res, 'Login success', { token });
        }
        console.log(cpRes);
        return response(res, 'Email or password not match', null, null, 404);
      })
      .catch((e) => {
        console.log(e);
        return response(res, 'Email or password not match', null, null, 404);
      });
  });
};

exports.getUserData = (req, res) => {
  const id = req.authUser.id;
  profileModel.getProfileByUserId(id, (err, result) => {
    console.log(result);
    if (result.rows.length > 0) {
      return response(res, 'Detail transaction', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.getUserTransaction = (req, res) => {
  const id = req.authUser.id;
  transactionModel.getTransactionUser(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'List all transaction', result.rows);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.editProfile = (req, res) => {
  const id = req.authUser.id;
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return response(res, `Failed to update profile: ${err.message}`, null, null, 404);
    }

    let filename = null;
    if (req.file) {
      filename = req.file.filename;
    }

    profileModel.editProfile(id, req.body, filename, (err, result) => {
      if (err) {
        console.log(err);
        return errorResponse(err, res);
      } else {
        return response(res, 'Edit profile successfully', result);
      }
    });
  });
};

exports.changePassword = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  userModel.changePassword(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Change Password successfully', result[0]);
    }
  });
};

exports.changePin = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  userModel.changePin(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Change PIN successfully', result.pin);
    }
  });
};

exports.changePhoneNumber = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  profileModel.changePhoneNumber(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Change Phone Number successfully', result);
    }
  });
};

exports.addPhoneNumber = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  profileModel.changePhoneNumber(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Phone number change');
    }
  });
};

exports.transfer = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  // console.log(amount);
  transactionModel.transfer(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      profileModel.increaseBalance(result[0].amount, result[0].recipient_id, (err, result) => {
        if (err) return console.log(err);
      });
      profileModel.decreaseBalance(result[0].amount, id, (err, result) => {
        return response(res, 'Balance decrease', result);
      });
    }
  });
};
