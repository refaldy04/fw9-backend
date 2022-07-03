const response = require('../helpers/standardResponse');
const profileModels = require('../models/profile');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllProfile = (req, res) => {
  profileModels.getAllProfile((result) => {
    return response(res, 'message from standard response: request success', result);
  });
};

exports.createProfile = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'Error occured', validation.array(), 400);
  }
  profileModels.createProfile(req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Profile created', result);
    }
  });
};

exports.editProfile = (req, res) => {
  const { id } = req.params;
  profileModels.editProfile(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit profile successfully', result[0]);
    }
  });
};

exports.deleteProfile = (req, res) => {
  const { id } = req.params;
  profileModels.deleteProfile(id, (result) => {
    return response(res, 'Profile deleted', result[0]);
  });
};
