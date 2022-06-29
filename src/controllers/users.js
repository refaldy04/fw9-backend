const response = require('../helpers/standardResponse');

const usersModels = require('../models/users');

exports.getAllUsers = (req, res) => {
  usersModels.getAllUsers((result) => {
    return response(res, 'message from standard response', result);
  });
};
