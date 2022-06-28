const response = require('../helpers/standardResponse');

const enterPinModels = require('../models/enterPin');

exports.getEnterPin = (req, res) => {
  enterPinModels.confirmPin((results) => {
    return response(res, 'message from standard response', results);
  });
};
