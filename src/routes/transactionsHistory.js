const transactionsHistory = require('express').Router();

const transactionsHistoryController = require('../controllers/transactionsHistory');

transactionsHistory.get('/', transactionsHistoryController.getAllTransactionHistory);

module.exports = transactionsHistory;
