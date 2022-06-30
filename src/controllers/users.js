const response = require('../helpers/standardResponse');
const usersModels = require('../models/users');
const { validationResult } = require('express-validator');

exports.getAllUsers = (req, res) => {
  usersModels.getAllUsers((result) => {
    return response(res, 'message from standard response', result);
  });
};

exports.creatUsers = (req, res) => {
  // if (req.body.username.length < 4) {
  //   return response(res, 'username length must be greater than 4 character', null, 400);
  // }
  const validation = validationResult(req);
  if (!validation.isEmpty) {
    // is empty menandakan tidak ada error
    return response(res, 'Error occured', validation.array);
  }
  usersModels.createUsers(req.body, (result) => {
    return response(res, 'Create user successfully', result[0]);
  });
};

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
