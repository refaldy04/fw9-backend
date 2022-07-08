const userModel = require('../models/users');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.register = (req, res) => {
  userModel.createUsers(req.body, (err, result) => {
    req.body.pin = null;
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Register Success');
    }
  });
};
