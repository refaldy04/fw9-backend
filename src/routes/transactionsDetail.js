const transactionsDetail = require('express').Router();

const transactionsDetailController = require('../controllers/transactionsDetail');

transactionsDetail.get('/', transactionsDetailController.getAllTransactionDetail);

module.exports = transactionsDetail;
