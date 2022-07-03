const transactionsType = require('express').Router();
const transactionsTypeController = require('../controllers/transactionType');

transactionsType.get('/', transactionsTypeController.getAllTransactionType);
transactionsType.post('/', transactionsTypeController.createTransactionType);
transactionsType.patch('/:id', transactionsTypeController.editTransactionType);
transactionsType.delete('/:id', transactionsTypeController.deleteTransactionType);

module.exports = transactionsType;
