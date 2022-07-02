const transactions = require('express').Router();
const transactionsController = require('../controllers/transactions');
const { body } = require('express-validator');

const transactionsValidation = [body('time').isISO8601().withMessage('Date format invalid (ISO8601)'), body('amount').isCurrency({ symbol: 'Rp' }).withMessage('Input invalid, number only')];

transactions.get('/', transactionsController.getAllTransaction);
transactions.post('/', ...transactionsValidation, transactionsController.createTransaction);
transactions.patch('/:id', ...transactionsValidation, transactionsController.editTransaction);
transactions.delete('/:id', transactionsController.deleteTransaction);

module.exports = transactions;
