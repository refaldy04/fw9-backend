const transactions = require('express').Router();
const transactionsController = require('../controllers/transactions');

transactions.get('/', transactionsController.getAllTransaction);
transactions.post('/', ...transactionsController.createTransaction);

module.exports = transactions;
