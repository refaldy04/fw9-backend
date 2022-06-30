const response = require('../helpers/standardResponse');
const usersModels = require('../models/users');
const { validationResult, body } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllUsers = (req, res) => {
  usersModels.getAllUsers((result) => {
    return response(res, 'message from standard response', result);
  });
};

exports.creatUsers = [
  body('email')
    // .isEmpty().withMessage('email can not be empty')
    .isEmail()
    .withMessage('Email format invalid'),
  body('username').isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
  (req, res) => {
    // if (req.body.username.length < 4) {
    //   return response(res, 'username length must be greater than 4 character', null, 400);
    // }
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      // is empty menandakan tidak ada error
      return response(res, 'Error occured', validation.array(), 400);
    }
    usersModels.createUsers(req.body, (err, result) => {
      if (err) {
        if (err.code === '23505' && err.detail.includes('email')) {
          const errRes = errorResponse('Email already exist', 'email');
          return response(res, 'Error', errRes, 400);
        } else if (err.code === '23505' && err.detail.includes('username')) {
          const errRes = errorResponse('Username already exist', 'username');
          return response(res, 'Error', errRes, 400);
        }
      } else {
        return response(res, 'Create user successfully', result[0]);
      }
    });
  },
];

exports.editUser = (req, res) => {
  const { id } = req.params;
  usersModels.updateUser(id, req.body, (result) => {
    return response(res, 'Update data success', result[0]);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersModels.deleteUser(id, (result) => {
    return response(res, 'User deleted', result[0]);
  });
};
