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
  userModel.createUsers(req.body, (err, userResult) => {
    req.body.pin = null;
    if (err) {
      return errorResponse(err, res);
    }
    // console.log(userResult[0].id);
    profileModel.createProfileAfterRegister(userResult[0].id, (err, result) => {
      return response(res, 'Good Job', userResult);
    });
  });
};

exports.createPin = (req, res) => {
  console.log(req);
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
            return response(res, 'Create PIN success', resultUpdate.pin);
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
  // console.log(req.body);
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { email, password } = req.body;
  userModel.getUserByEmail(email, (err, result) => {
    if (result.rows.length < 0) {
      return response(res, 'User not found', null, null, 400);
    }
    const user = result.rows[0];
    console.log(user);
    bcrypt
      .compare(password, user.password)
      .then((cpRes) => {
        // console.log(cpRes);
        if (cpRes) {
          const token = jwt.sign({ id: user.id }, process.env.APP_SECRET || 'mYF1rStb4ck3nd');
          return response(res, 'Login success', { token, pin: user.pin, email: user.email });
        }
        // console.log(cpRes);
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
  console.log('ini dari auth', id);
  profileModel.getProfileByUserId(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail user', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

const { LIMIT_DATA } = process.env;
exports.getUserTransaction = (req, res) => {
  const id = req.authUser.id;
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1, sortBy = 'id', sort = 0 } = req.query;
  const offset = (page - 1) * limit;
  transactionModel.getTransactionUser(id, limit, offset, (err, result) => {
    if (result.rows.length > 0) {
      const pageInfo = {};
      transactionModel.countAllTransaction(id, (err, totalData) => {
        pageInfo.totalData = totalData;
        pageInfo.totalPage = Math.ceil(totalData / limit);
        pageInfo.currentPage = parseInt(page);
        pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
        pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
        return response(res, 'List all transaction', result.rows, pageInfo);
      });
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
  const { password } = req.body;
  userModel.getUserById(id, (err, result) => {
    console.log(result.rows[0]);
    const user = result.rows[0];
    bcrypt.compare(password, user.password).then((cpRes) => {
      // console.log(cpRes);
      if (cpRes) {
        userModel.changePassword(id, req.body.newpassword, (err, result) => {
          console.log(result);
          if (err) {
            return errorResponse(err, res);
          } else {
            return response(res, 'Change Password successfully', result[0]);
          }
        });
      } else {
        console.log(cpRes);
        return response(res, 'Email or password not match', null, null, 404);
      }
    });
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
  const pin = req.body.pin;
  const newPin = req.body.newpin;
  userModel.getUserById(id, (err, user) => {
    // console.log(user.rows[0]);
    if (pin === user.rows[0].pin) {
      userModel.changePin(id, newPin, (err, result) => {
        console.log(newPin);
        console.log(result);
        if (err) {
          return errorResponse(err, res);
        } else {
          return response(res, 'Change PIN successfully', result.pin);
        }
      });
    } else {
      return response(res, 'Pliese input old PIN correctly');
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
  console.log('ini req body', req.body);
  req.body.type_id = parseInt(req.body.type_id);
  req.body.recipient_id = parseInt(req.body.recipient_id);
  req.body.amount = parseInt(req.body.amount);
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  const { id } = req.authUser;
  console.log('ini id', id);
  const { pin } = req.body;
  userModel.getUserById(id, (err, user) => {
    console.log(user.rows[0].pin);
    if (pin == user.rows[0].pin) {
      transactionModel.transfer(id, req.body, (err, result) => {
        if (err) {
          return errorResponse(err, res);
        } else {
          // console.log(result);
          profileModel.increaseBalance(result[0].amount, result[0].recipient_id, (err, result) => {
            if (err) return console.log(err);
          });
          profileModel.decreaseBalance(result[0].amount, result[0].sender_id, (err, result) => {
            return response(res, 'Balance decrease', result, null, 200);
          });
        }
      });
    } else {
      return response(res, 'PIN does not valid', null, null, 400);
    }
  });
};

exports.topup = (req, res) => {
  const { id } = req.authUser;
  userModel.topup(id, req.body, (err, result) => {
    return response(res, 'Top Up successfully', result);
  });
};

exports.checkPin = (req, res) => {
  const { id } = req.authUser;
  console.log(id);
  const { pin } = req.body;
  userModel.getUserById(id, (err, user) => {
    console.log(user.rows[0].pin);
    if (pin == user.rows[0].pin) {
      return response(res, 'PIN valid');
    } else {
      return response(res, 'PIN does not valid', null, null, 400);
    }
  });
};
