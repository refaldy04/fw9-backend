const response = require('../helpers/standardResponse');
const transactionModels = require('../models/transactions');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllTransaction = (req, res) => {
  transactionModels.getAllTransactions((result) => {
    return response(res, 'message from standard response', result);
  });
};

exports.createTransaction = (req, res) => {
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
};

exports.editTransaction = (req, res) => {
  const { id } = req.params;
  transactionModels.editTransaction(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit transaction successfully', result[0]);
    }
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  transactionModels.deleteTransaction(id, (result) => {
    return response(res, 'Transaction deleted', result[0]);
  });
};
