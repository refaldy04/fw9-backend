const response = require('../helpers/standardResponse');

const usersModels = require('../models/users');

exports.getAllUsers = (req, res) => {
  usersModels.getAllUsers((result) => {
    return response(res, 'message from standard response', result);
  });
};

exports.creatUsers = (req, res) => {
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
