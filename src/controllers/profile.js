const response = require('../helpers/standardResponse');
const profileModels = require('../models/profile');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const upload = require('../helpers/upload').single('picture');

exports.getAllProfile = (req, res) => {
  profileModels.getAllProfile((result) => {
    return response(res, 'message from standard response: request success', result);
  });
};

exports.getProfileById = (req, res) => {
  const { id } = req.params;
  profileModels.getProfileById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail transaction', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
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
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return response(res, `Failed to update profile: ${err.message}`, null, null, 404);
    }

    let filename = null;
    if (req.file) {
      console.log(req.file);
      filename = req.file.filename;
    }

    profileModels.editProfile(id, req.body, filename, (err, result) => {
      if (err) {
        console.log(err);
        return errorResponse(err, res);
      } else {
        return response(res, 'Edit profile successfully', result);
      }
    });
  });
};

exports.deleteProfile = (req, res) => {
  const { id } = req.params;
  profileModels.deleteProfile(id, (result) => {
    return response(res, 'Profile deleted', result[0]);
  });
};
