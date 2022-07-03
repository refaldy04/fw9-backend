const response = require('../helpers/standardResponse');
const usersModels = require('../models/users');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllUsers = (req, res) => {
  usersModels.getAllUsers((result) => {
    return response(res, 'message from standard response: request success', result);
  });
};

exports.creatUsers = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), 400);
  }
  usersModels.createUsers(req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Create user successfully', result[0]);
    }
  });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  usersModels.updateUser(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit user successfully', result[0]);
    }
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersModels.deleteUser(id, (result) => {
    return response(res, 'User deleted', result[0]);
  });
};
