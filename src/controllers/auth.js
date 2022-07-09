const userModel = require('../models/users');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
