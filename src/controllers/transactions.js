const response = require('../helpers/standardResponse');
const transactionModels = require('../models/transactions');
const { body, validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllTransaction = (req, res) => {
  transactionModels.getAllTransactions((result) => {
    return response(res, 'message from standard response', result);
  });
};

exports.createTransaction = [
  body('time').isDate({ format: 'YYYY-MM-DD' }).withMessage('Date format invalid (YYYY-MM-DD)'),
  (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error occured', validation.array(), 400);
    }
    transactionModels.createTransaction(req.body, (err, result) => {
      if (err) {
        return errorResponse(err, res);
      } else {
        return response(res, 'Transaction created', result);
      }
    });
  },
];
